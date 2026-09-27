import { EventLedger, canonicalJson, sha256Hex } from "./ledger.mjs";
import { PolicyEngine, DEFAULT_POLICY, STATUS } from "./policy.mjs";
import { MetaHarness } from "./meta-harness.mjs";
import { TaskScheduler } from "./scheduler.mjs";

export const PHASES = Object.freeze([
  "OBSERVE",
  "REASON",
  "PROPOSE",
  "VERIFY",
  "AUTHORIZE",
  "EXECUTE",
  "OBSERVE"
]);

function clone(value) {
  return structuredClone(value);
}

function uid(prefix = "id") {
  const rand = globalThis.crypto?.randomUUID ? globalThis.crypto.randomUUID() : Math.random().toString(36).slice(2);
  return prefix + "-" + rand;
}

export class PraxiosRuntime {
  constructor({
    sessionId = uid("session"),
    actor = "praxios",
    clock,
    policy = DEFAULT_POLICY,
    onEvent = null
  } = {}) {
    this.sessionId = sessionId;
    this.actor = actor;
    this.onEvent = onEvent;
    this.ledger = new EventLedger({ clock });
    this.policyEngine = new PolicyEngine(policy);
    this.metaHarness = new MetaHarness({ policyEngine: this.policyEngine, ledger: this.ledger });
    this.scheduler = new TaskScheduler();
    this.providers = new Map();
    this.executors = new Map();
    this.state = {
      sessionId,
      revision: 0,
      status: "CREATED",
      phase: "OBSERVE",
      goal: null,
      evidence: [],
      claims: [],
      tasks: [],
      authorizations: [],
      actions: [],
      decisions: [],
      artifacts: [],
      createdAt: null,
      updatedAt: null
    };
  }

  static async fromSnapshot(snapshot, options = {}) {
    if (!snapshot?.state?.sessionId) throw new Error("Snapshot is missing session state.");
    const runtime = new PraxiosRuntime({
      ...options,
      sessionId: snapshot.state.sessionId
    });
    runtime.state = structuredClone(snapshot.state);
    runtime.scheduler = new TaskScheduler();
    for (const task of snapshot.tasks || []) {
      runtime.scheduler.add(task);
      Object.assign(runtime.scheduler.get(task.id), structuredClone(task));
    }
    await runtime.ledger.import(snapshot.ledger || []);
    return runtime;
  }

  async stateDigest() {
    const state = clone(this.state);
    delete state.revision;
    delete state.createdAt;
    delete state.updatedAt;
    return sha256Hex(canonicalJson(state));
  }

  async audit() {
    const ledger = await this.ledger.verify();
    const currentStateHash = await this.stateDigest();
    const last = this.ledger.events[this.ledger.events.length - 1] || null;
    const recordedStateHash = last?.payload?._checkpoint?.stateHash || null;
    return {
      ok: ledger.ok && (!recordedStateHash || recordedStateHash === currentStateHash),
      ledger,
      currentStateHash,
      recordedStateHash,
      stateMatchesLedger: !recordedStateHash || recordedStateHash === currentStateHash
    };
  }

  async emit(type, payload = {}, actor = this.actor) {
    const checkpoint = { stateHash: await this.stateDigest() };
    const event = await this.ledger.append(type, { ...clone(payload), _checkpoint: checkpoint }, { actor, sessionId: this.sessionId });
    this.state.revision = event.seq;
    this.state.updatedAt = event.timestamp;
    if (!this.state.createdAt) this.state.createdAt = event.timestamp;
    if (this.onEvent) await this.onEvent(event, this.snapshot());
    return event;
  }

  snapshot() {
    return clone({
      state: this.state,
      tasks: this.scheduler.list(),
      ledger: this.ledger.snapshot()
    });
  }

  registerProvider(name, provider) {
    if (!name || !provider || typeof provider.generate !== "function") {
      throw new Error("Provider must expose generate(request).");
    }
    this.providers.set(name, provider);
    return this;
  }

  registerExecutor(name, executor, policy = {}) {
    if (!name || typeof executor !== "function") throw new Error("Executor must be a function.");
    this.executors.set(name, {
      execute: executor,
      effect: policy.effect || null,
      tags: Array.from(new Set(policy.tags || [])),
      enabled: policy.enabled !== false
    });
    return this;
  }

  normalizeAction(action) {
    const normalized = clone(action || {});
    if (!normalized.id) normalized.id = uid("action");
    const registration = normalized.executor ? this.executors.get(normalized.executor) : null;
    if (registration) {
      if (!registration.enabled) {
        normalized.tags = Array.from(new Set([...(normalized.tags || []), "executor_disabled"]));
      }
      if (registration.effect) normalized.effect = registration.effect;
      normalized.tags = Array.from(new Set([...(normalized.tags || []), ...(registration.tags || [])]));
    }
    normalized.effect = normalized.effect || "none";
    return normalized;
  }

  async start(goal, actor = "human") {
    if (this.state.status !== "CREATED") throw new Error("Session already started.");
    this.state.goal = String(goal || "").trim();
    if (!this.state.goal) throw new Error("Session goal is required.");
    this.state.status = "RUNNING";
    this.state.phase = "OBSERVE";
    await this.emit("SESSION_STARTED", { goal: this.state.goal }, actor);
    return this.snapshot();
  }

  async setPhase(phase, reason = "") {
    if (!PHASES.includes(phase)) throw new Error("Invalid PRAXIOS phase: " + phase);
    const previous = this.state.phase;
    this.state.phase = phase;
    await this.emit("PHASE_CHANGED", { from: previous, to: phase, reason });
    return phase;
  }

  async addEvidence(evidence, actor = this.actor) {
    if (!evidence?.id) throw new Error("Evidence requires id.");
    if (this.state.evidence.some(item => item.id === evidence.id)) throw new Error("Duplicate evidence id: " + evidence.id);
    const normalized = {
      id: evidence.id,
      kind: evidence.kind || "reported",
      summary: evidence.summary || "",
      source: evidence.source || null,
      peerReviewed: Boolean(evidence.peerReviewed),
      uncertainty: evidence.uncertainty || null,
      capturedAt: evidence.capturedAt || null,
      metadata: evidence.metadata || {}
    };
    this.state.evidence.push(normalized);
    await this.emit("EVIDENCE_REGISTERED", normalized, actor);
    return clone(normalized);
  }

  async proposeClaim(claim, actor = this.actor) {
    if (!claim?.id) throw new Error("Claim requires id.");
    if (this.state.claims.some(item => item.id === claim.id)) throw new Error("Duplicate claim id: " + claim.id);
    const normalized = {
      id: claim.id,
      text: claim.text || "",
      epistemic: claim.epistemic || "UNKNOWN",
      evidenceIds: claim.evidenceIds || [],
      method: claim.method || null,
      confidence: claim.confidence,
      uncertainty: claim.uncertainty || null,
      identifiability: claim.identifiability || "I0",
      requiredIdentifiability: claim.requiredIdentifiability || null,
      contradictions: claim.contradictions || [],
      requestedUse: claim.requestedUse || "internal",
      proposerId: claim.proposerId || actor,
      verifierId: claim.verifierId || null,
      status: "PROPOSED",
      verdict: null,
      gates: []
    };
    this.state.claims.push(normalized);
    await this.emit("CLAIM_PROPOSED", normalized, actor);
    return clone(normalized);
  }

  async verifyClaim(claimId, { verifierId, actor = verifierId || this.actor } = {}) {
    const claim = this.state.claims.find(item => item.id === claimId);
    if (!claim) throw new Error("Unknown claim: " + claimId);
    claim.verifierId = verifierId || claim.verifierId;
    const evaluation = await this.metaHarness.evaluateClaim(claim, {
      evidence: this.state.evidence,
      proposerId: claim.proposerId,
      verifierId: claim.verifierId
    });
    claim.gates = evaluation.gates;
    claim.verdict = evaluation.verdict;
    claim.status = evaluation.verdict === STATUS.PASS ? "VERIFIED" : evaluation.verdict;
    await this.emit("CLAIM_VERIFIED", {
      claimId,
      verdict: evaluation.verdict,
      gates: evaluation.gates,
      verifierId: claim.verifierId
    }, actor);
    return clone(evaluation);
  }

  async delegateTask(task, actor = this.actor) {
    const added = this.scheduler.add(task);
    this.state.tasks = this.scheduler.list();
    await this.emit("TASK_DELEGATED", added, actor);
    return clone(added);
  }

  async runTasks() {
    await this.setPhase("EXECUTE", "Execute queued delegated tasks.");
    const final = await this.scheduler.run(async task => {
      const provider = this.providers.get(task.provider);
      if (!provider) throw new Error("Provider not registered: " + task.provider);
      return provider.generate({
        role: task.role,
        model: task.model,
        input: task.input,
        metadata: task.metadata,
        session: this.snapshot()
      });
    }, {
      onTask: async ({ type, task }) => {
        this.state.tasks = this.scheduler.list();
        await this.emit("TASK_" + type.toUpperCase(), task, task.role);
      }
    });
    this.state.tasks = final;
    return clone(final);
  }

  async requestAuthorization(action, actor = this.actor) {
    action = this.normalizeAction(action);
    const request = {
      id: uid("auth"),
      actionId: action.id,
      action: clone(action),
      status: "PENDING",
      requestedBy: actor,
      decidedBy: null,
      reason: null,
      consumed: false,
      consumedBy: null
    };
    this.state.actions.push({ ...action, status: "AWAITING_AUTHORIZATION" });
    this.state.authorizations.push(request);
    await this.setPhase("AUTHORIZE", "Effectful action requires authorization.");
    await this.emit("AUTHORIZATION_REQUESTED", request, actor);
    return clone(request);
  }

  async authorize(requestId, { approved, actor = "human", reason = "" } = {}) {
    const request = this.state.authorizations.find(item => item.id === requestId);
    if (!request) throw new Error("Unknown authorization request: " + requestId);
    if (request.status !== "PENDING") throw new Error("Authorization already decided.");
    request.status = approved ? "APPROVED" : "REJECTED";
    request.decidedBy = actor;
    request.reason = reason;
    await this.emit("AUTHORIZATION_DECIDED", {
      requestId,
      actionId: request.actionId,
      status: request.status,
      reason
    }, actor);
    return clone(request);
  }

  async executeAction(action, { authorizationId = null, executor = null, actor = this.actor } = {}) {
    action = this.normalizeAction(action);
    const authorization = authorizationId
      ? this.state.authorizations.find(item => item.id === authorizationId)
      : null;
    const evaluation = await this.metaHarness.evaluateAction(action, { authorization });
    await this.emit("ACTION_GATE_EVALUATED", { actionId: action.id, ...evaluation }, actor);
    if (evaluation.verdict === STATUS.BLOCK) {
      const existing = this.state.actions.find(item => item.id === action.id);
      if (existing) existing.status = "BLOCKED";
      throw new Error("Meta-Harness blocked action " + action.id);
    }

    if (authorization) {
      authorization.consumed = true;
      authorization.consumedBy = actor;
      await this.emit("AUTHORIZATION_CONSUMED", {
        authorizationId: authorization.id,
        actionId: action.id
      }, actor);
    }

    const registration = action.executor ? this.executors.get(action.executor) : null;
    if (registration && !registration.enabled) throw new Error("Executor is disabled: " + action.executor);
    const exec = executor || registration?.execute;
    if (typeof exec !== "function") throw new Error("No executor registered for action: " + (action.executor || action.id));
    await this.setPhase("EXECUTE", "Authorized action execution.");
    const output = await exec(clone(action), this.snapshot());
    const existing = this.state.actions.find(item => item.id === action.id);
    if (existing) {
      existing.status = "COMPLETED";
      existing.output = output;
    } else {
      this.state.actions.push({ ...action, status: "COMPLETED", output });
    }
    await this.emit("ACTION_EXECUTED", { actionId: action.id, output }, actor);
    await this.setPhase("OBSERVE", "Observe action outcome.");
    return clone({ output, evaluation });
  }

  async recordDecision(decision, actor = "human") {
    const normalized = {
      id: decision.id || uid("decision"),
      title: decision.title || "Decision",
      options: decision.options || [],
      selected: decision.selected || null,
      rationale: decision.rationale || "",
      actor,
      status: decision.status || "RECORDED"
    };
    this.state.decisions.push(normalized);
    await this.emit("DECISION_RECORDED", normalized, actor);
    return clone(normalized);
  }

  async close(actor = "human") {
    const audit = await this.ledger.verify();
    if (!audit.ok) throw new Error("Cannot close session with invalid ledger.");
    this.state.status = "COMPLETED";
    await this.emit("SESSION_CLOSED", { audit }, actor);
    return this.snapshot();
  }
}
