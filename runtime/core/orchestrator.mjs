function stripCodeFence(text) {
  const s = String(text || "").trim();
  const fence = "\x60\x60\x60";
  if (!s.startsWith(fence)) return s;
  return s.replace(/^\x60\x60\x60(?:json)?\s*/i, "").replace(/\s*\x60\x60\x60$/, "");
}

export function parseJsonOutput(text) {
  const raw = stripCodeFence(text);
  try {
    return JSON.parse(raw);
  } catch (error) {
    const start = raw.indexOf("{");
    const end = raw.lastIndexOf("}");
    if (start >= 0 && end > start) return JSON.parse(raw.slice(start, end + 1));
    throw new Error("Provider did not return valid JSON.");
  }
}

export class ProviderRegistry {
  constructor() {
    this.providers = new Map();
  }

  register(name, provider) {
    if (!name || !provider || typeof provider.generate !== "function") {
      throw new Error("Provider must implement generate().");
    }
    this.providers.set(name, provider);
    return this;
  }

  get(name) {
    const provider = this.providers.get(name);
    if (!provider) throw new Error("Unknown provider: " + name);
    return provider;
  }

  list() {
    return Array.from(this.providers.keys());
  }
}

export class PraxiosOrchestrator {
  constructor({ runtime, providers }) {
    this.runtime = runtime;
    this.providers = providers || new ProviderRegistry();
  }

  async callProvider(slot, request) {
    const provider = this.providers.get(slot.provider);
    const text = await provider.generate({
      model: slot.model,
      system: request.system,
      input: request.input,
      metadata: request.metadata || {}
    });
    return request.expectJson ? parseJsonOutput(text) : text;
  }

  async runGoal({ goal, planner, workers = {}, verifier, actor = "human" }) {
    await this.runtime.start(goal, actor);
    await this.runtime.setPhase("REASON", "Planner decomposes the goal.");

    const plan = await this.callProvider(planner, {
      expectJson: true,
      system:
        "You are the PRAXIOS planner. Return JSON only. " +
        "Create a minimal task DAG. Each task requires id, title, role, input, dependsOn, and workerSlot. " +
        "Do not claim results; only decompose work.",
      input: goal
    });

    const tasks = Array.isArray(plan.tasks) ? plan.tasks : [];
    await this.runtime.setPhase("PROPOSE", "Register delegated work.");

    for (const task of tasks) {
      const workerSlot = workers[task.workerSlot];
      if (!workerSlot) throw new Error("Planner requested unknown worker slot: " + task.workerSlot);
      this.runtime.registerProvider(task.workerSlot, {
        generate: request =>
          this.callProvider(workerSlot, {
            expectJson: false,
            system:
              "You are a PRAXIOS worker. Complete only the delegated task. " +
              "Separate evidence from inference and identify uncertainties.",
            input: request.input
          })
      });
      await this.runtime.delegateTask({
        id: task.id,
        title: task.title,
        role: task.role || task.workerSlot,
        provider: task.workerSlot,
        model: workerSlot.model,
        input: task.input,
        dependsOn: task.dependsOn || [],
        metadata: { workerSlot: task.workerSlot }
      });
    }

    const taskResults = await this.runtime.runTasks();
    await this.runtime.setPhase("VERIFY", "Independent verifier evaluates worker outputs.");

    const verifierResult = await this.callProvider(verifier, {
      expectJson: true,
      system:
        "You are the independent Meta-Harness verifier. Return JSON only with keys " +
        "summary, evidence, claims, proposedActions. " +
        "Evidence items require id, kind, summary, source{title,uri}, peerReviewed when known. " +
        "Claims require id, text, epistemic, evidenceIds, method, uncertainty, identifiability, " +
        "requiredIdentifiability, contradictions, requestedUse, proposerId. " +
        "Do not promote hypotheses to facts.",
      input: JSON.stringify({
        goal,
        tasks: taskResults.map(task => ({
          id: task.id,
          title: task.title,
          role: task.role,
          status: task.status,
          output: task.output
        }))
      })
    });

    for (const evidence of verifierResult.evidence || []) {
      if (!this.runtime.state.evidence.some(item => item.id === evidence.id)) {
        await this.runtime.addEvidence(evidence, verifier.model || "verifier");
      }
    }

    const claimEvaluations = [];
    for (const claim of verifierResult.claims || []) {
      const normalized = {
        ...claim,
        proposerId: claim.proposerId || "worker",
        verifierId: verifier.model || "verifier"
      };
      if (!this.runtime.state.claims.some(item => item.id === normalized.id)) {
        await this.runtime.proposeClaim(normalized, normalized.proposerId);
      }
      const evaluation = await this.runtime.verifyClaim(normalized.id, {
        verifierId: verifier.model || "verifier",
        actor: verifier.model || "verifier"
      });
      claimEvaluations.push({ claimId: normalized.id, ...evaluation });
    }

    const authorizationRequests = [];
    for (const action of verifierResult.proposedActions || []) {
      const request = await this.runtime.requestAuthorization(action, verifier.model || "verifier");
      authorizationRequests.push(request);
    }

    return {
      goal,
      plan,
      verifier: verifierResult,
      claimEvaluations,
      authorizationRequests,
      snapshot: this.runtime.snapshot()
    };
  }
}
