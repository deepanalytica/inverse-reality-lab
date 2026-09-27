import { PraxiosRuntime } from "../runtime/core/praxios-runtime.mjs";
import { FixtureProvider } from "../runtime/providers/fixture.mjs";
import { PraxiosApiClient } from "./praxios-api.mjs";

const $ = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const modes = {
  operate: { eyebrow: "PRAXIOS · runtime", title: "Orquestación de sesión" },
  assure: { eyebrow: "META-HARNESS · assurance", title: "Evidencia, claims y gates" },
  decide: { eyebrow: "DECISION ROOM · human authority", title: "Opciones, autorización y resultado" }
};

let runtime = null;
let apiClient = null;
let remoteConfig = null;
let remoteSessionId = null;
let activeAction = null;
let activeAuthorization = null;
let activeDecisionPackage = null;
let latestActionEvaluation = null;

const nodeDescriptions = {
  planner: ["PRAXIOS · orchestration", "Planner", "Convierte el objetivo en trabajo gobernado por estado, contratos, presupuesto y políticas."],
  researcher: ["WORKER · evidence", "Researcher", "Trabajo delegado de evidencia ejecutado por el scheduler."],
  simulator: ["WORKER · computation", "Simulator", "Trabajo delegado de cálculo y producción de artefactos."],
  reviewer: ["WORKER · verification", "Reviewer", "Actor independiente que revisa claims y contradicciones."],
  harness: ["META-HARNESS · assurance", "Meta-Harness", "Aplica gates antes de promover claims o ejecutar acciones."],
  human: ["AUTHORITY · checkpoint", "Human authority", "Aprueba o rechaza acciones con efectos."],
  decision: ["DECISION ROOM", "Decision Room", "Concentra situación, evidencia, opciones, autorización y outcome."],
  ledger: ["CANONICAL STATE", "The Ledger", "Cadena SHA-256 append-only para auditar la sesión y sus transiciones."]
};

function esc(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function badge(status) {
  const raw = String(status || "ready");
  const s = raw.toLowerCase();
  const cls =
    ["pass","verified","completed","approved","decided"].includes(s) ? "pass" :
    ["block","blocked","rejected","failed"].includes(s) ? "block" :
    ["review","pending","awaiting_authorization","awaiting_human"].includes(s) ? "review" :
    "running";
  return '<span class="px-badge ' + cls + '">' + esc(raw) + '</span>';
}

function gateRows(gates) {
  if (!gates || !gates.length) return "<p>Los gates aparecerán cuando exista una evaluación.</p>";
  return '<div class="px-gate-list">' + gates.map(g =>
    '<div class="px-gate"><div><b>' + esc(g.id) + '</b><small>' + esc(g.reason) +
    '</small></div>' + badge(g.status) + '</div>'
  ).join("") + "</div>";
}

function currentClaim() {
  return runtime?.state?.claims?.[runtime.state.claims.length - 1] || null;
}

function currentDecision() {
  return runtime?.state?.decisions?.[runtime.state.decisions.length - 1] || null;
}

function findTask(kind) {
  if (!runtime) return null;
  const patterns = {
    researcher: /research|evidence/i,
    simulator: /sim|math|compute|model/i,
    reviewer: /review|verify|adversarial/i
  };
  return runtime.scheduler.list().find(t => patterns[kind]?.test(t.role || "") || patterns[kind]?.test(t.title || "")) || null;
}

function inspectorHtml(id) {
  const desc = nodeDescriptions[id];
  if (!runtime) {
    return '<div class="px-panel"><h3>Estado</h3><p>' + esc(desc[2]) +
      '</p><p>Ejecuta una sesión local o conecta el backend.</p></div>';
  }

  if (id === "harness") {
    const claim = currentClaim();
    if (!claim) return '<div class="px-panel"><h3>Meta-Harness</h3><p>Esperando claims.</p></div>';
    const reviews = claim.reviews?.length
      ? '<p>Reviews registrados: <strong>' + claim.reviews.length + '</strong></p>'
      : '<p>Sin review registrado.</p>';
    return '<div class="px-panel"><h3>' + esc(claim.id) + '</h3><p><strong>' + esc(claim.text) + '</strong></p>' +
      '<p>Clase: ' + badge(claim.epistemic) + ' · Verdict: ' + badge(claim.verdict || "PENDING") + '</p>' +
      reviews + '</div><div class="px-panel"><h3>Claim gates</h3>' + gateRows(claim.gates) + '</div>' +
      (latestActionEvaluation ? '<div class="px-panel"><h3>Action gates</h3>' + gateRows(latestActionEvaluation.gates) + '</div>' : '');
  }

  if (id === "human") {
    const auth = activeAuthorization;
    if (!auth) return '<div class="px-panel"><h3>Checkpoint</h3><p>No existe una autorización pendiente.</p></div>';
    const buttons = auth.status === "PENDING"
      ? '<button class="px-btn primary" id="approve-action">Approve</button> <button class="px-btn danger" id="reject-action">Reject</button>'
      : badge(auth.status);
    return '<div class="px-panel"><h3>Authorization request</h3><p><strong>' + esc(auth.action?.title) + '</strong></p>' +
      '<dl class="px-kv"><dt>Effect</dt><dd>' + esc(auth.action?.effect) +
      '</dd><dt>Requested by</dt><dd>' + esc(auth.requestedBy) +
      '</dd><dt>Status</dt><dd>' + esc(auth.status) +
      '</dd><dt>Single use</dt><dd>' + (auth.consumed ? "consumed" : "available") +
      '</dd></dl></div><div class="px-panel">' + buttons + '</div>';
  }

  if (id === "decision") {
    const d = currentDecision();
    if (!d) return '<div class="px-panel"><h3>Decision Room</h3><p>Esperando paquete de decisión.</p></div>';
    const options = (d.options || []).map(o => {
      const label = typeof o === "string" ? o : (o.label || o.id);
      return '<div class="px-card"><strong>' + esc(label) + '</strong></div>';
    }).join("");
    return '<div class="px-panel"><h3>Situation</h3><p>' + esc(d.situation || "Sesión bajo control de evidencia y políticas.") + '</p></div>' +
      '<div class="px-panel"><h3>Options</h3>' + options + '</div>' +
      '<div class="px-panel"><h3>Decision state</h3><p>' +
      (d.selected ? '<strong>' + esc(d.selected) + '</strong>' : badge(d.status || "AWAITING_HUMAN")) +
      '</p><p>' + esc(d.rationale || "") + '</p></div>';
  }

  if (id === "ledger") {
    return '<div class="px-panel"><h3>Canonical state</h3><dl class="px-kv"><dt>Revision</dt><dd>' +
      esc(runtime.state.revision) + '</dd><dt>Events</dt><dd>' + esc(runtime.ledger.events.length) +
      '</dd><dt>Head</dt><dd style="word-break:break-all">' + esc((runtime.ledger.lastHash || "").slice(0, 24)) +
      '…</dd></dl></div><div class="px-panel"><button class="px-btn" id="verify-ledger">Run audit</button></div>';
  }

  const taskMap = { researcher: "researcher", simulator: "simulator", reviewer: "reviewer" };
  if (taskMap[id]) {
    const task = findTask(taskMap[id]);
    return '<div class="px-panel"><h3>Task</h3><p>' + esc(desc[2]) + '</p>' +
      (task ? '<dl class="px-kv"><dt>ID</dt><dd>' + esc(task.id) +
      '</dd><dt>Status</dt><dd>' + esc(task.status) +
      '</dd><dt>Provider slot</dt><dd>' + esc(task.provider) +
      '</dd><dt>Attempts</dt><dd>' + esc(task.attempts) + '/' + esc(task.maxAttempts) +
      '</dd></dl>' : '<p>Sin task todavía.</p>') + '</div>';
  }

  return '<div class="px-panel"><h3>Responsabilidad</h3><p>' + esc(desc[2]) + '</p></div>' +
    '<div class="px-panel"><h3>Session</h3><dl class="px-kv"><dt>Mode</dt><dd>' + (apiClient ? "REMOTE" : "LOCAL") +
    '</dd><dt>Phase</dt><dd>' + esc(runtime.state.phase) +
    '</dd><dt>Status</dt><dd>' + esc(runtime.state.status) +
    '</dd><dt>Revision</dt><dd>' + esc(runtime.state.revision) + '</dd></dl></div>';
}

function wireInspectorActions(id) {
  if (id === "human") {
    const approve = $("#approve-action");
    const reject = $("#reject-action");
    if (approve) approve.onclick = () => decideAuthorization(true);
    if (reject) reject.onclick = () => decideAuthorization(false);
  }
  if (id === "ledger") {
    const verify = $("#verify-ledger");
    if (verify) verify.onclick = async () => {
      try {
        const check = apiClient && remoteSessionId
          ? await apiClient.audit(remoteSessionId)
          : await runtime.audit();
        toast(check.ok ? "Audit PASS · state and ledger verified." : "Audit BLOCK · integrity mismatch.");
      } catch (error) {
        toast("Audit error: " + error.message);
      }
    };
  }
}

function selectNode(id) {
  $$(".node").forEach(n => n.classList.toggle("selected", n.dataset.node === id));
  const desc = nodeDescriptions[id];
  $("#inspector-kind").textContent = desc[0];
  $("#inspector-title").textContent = desc[1];
  $("#inspector-status").outerHTML = badge(nodeStatus(id)).replace("<span", '<span id="inspector-status"');
  $("#inspector-content").innerHTML = inspectorHtml(id);
  wireInspectorActions(id);
}

function nodeStatus(id) {
  if (!runtime) return "ready";
  if (id === "planner") return runtime.state.phase === "REASON" ? "RUNNING" : "PASS";
  if (id === "researcher") return findTask("researcher")?.status || "QUEUED";
  if (id === "simulator") return findTask("simulator")?.status || "QUEUED";
  if (id === "reviewer") return findTask("reviewer")?.status || (currentClaim()?.verdict || "QUEUED");
  if (id === "harness") return currentClaim()?.verdict || "QUEUED";
  if (id === "human") return activeAuthorization?.status || "IDLE";
  if (id === "decision") return currentDecision()?.selected ? "PASS" : (currentDecision()?.status || "REVIEW");
  if (id === "ledger") return "PASS";
  return "ready";
}

function renderLedger() {
  const events = runtime ? runtime.ledger.snapshot() : [];
  $("#ledger").innerHTML = events.slice(-12).map(e => {
    const time = String(e.timestamp).slice(11, 19);
    const verdict = e.payload?.verdict;
    const status = verdict === "BLOCK" ? "review" :
      verdict === "PASS" || e.type.includes("APPROVED") || e.type === "ACTION_EXECUTED" ? "pass" : "";
    return '<div class="px-ledger-row ' + status + '"><span>' + esc(time) +
      '</span><span class="kind">' + esc(e.type.replaceAll("_", " ").slice(0, 20)) +
      '</span><span>' + esc(e.actor) + ' · #' + esc(e.seq) + '</span></div>';
  }).join("");
}

function refreshStats() {
  if (!runtime) return;
  $("#stat-agents").textContent = runtime.scheduler.list().length;
  $("#stat-claims").textContent = runtime.state.claims.length;
  const claim = currentClaim();
  const gates = claim?.gates || [];
  $("#stat-gates").textContent = gates.length ? gates.filter(g => g.status === "PASS").length + "/" + gates.length : "0/0";
  renderLedger();
}

function markNode(id, cls) {
  const n = $('[data-node="' + id + '"]');
  if (!n) return;
  n.classList.remove("running", "pass", "review", "block");
  n.classList.add(cls);
}

function markEdge(id, cls) {
  const e = $("#" + id);
  if (!e) return;
  e.classList.remove("active", "pass", "review", "block");
  e.classList.add("active", cls);
}

function resetVisuals() {
  $$(".node").forEach(n => n.classList.remove("running", "pass", "review", "block"));
  $$(".edge").forEach(e => e.classList.remove("active", "pass", "review", "block"));
  $("#progress").style.width = "0%";
}

function syncVisualState() {
  if (!runtime) return;
  const claim = currentClaim();
  markNode("planner", "pass");
  if (findTask("researcher")) markNode("researcher", findTask("researcher").status === "COMPLETED" ? "pass" : "review");
  if (findTask("simulator")) markNode("simulator", findTask("simulator").status === "COMPLETED" ? "pass" : "review");
  markNode("reviewer", claim?.reviews?.length ? "pass" : "review");
  const verdictClass = claim?.verdict === "PASS" ? "pass" : claim?.verdict === "BLOCK" ? "block" : "review";
  markNode("harness", verdictClass);
  ["e1","e2","e3"].forEach(id => markEdge(id, "pass"));
  ["e4","e5","e6"].forEach(id => markEdge(id, verdictClass === "block" ? "review" : verdictClass));
  if (activeAuthorization) {
    const authClass = activeAuthorization.status === "APPROVED" ? "pass" :
      activeAuthorization.status === "REJECTED" ? "block" : "review";
    markNode("human", authClass);
    markEdge("e7", authClass);
  }
  if (currentDecision()?.selected) {
    markNode("decision", "pass");
    markEdge("e8", "pass");
  } else {
    markNode("decision", "review");
  }
  markNode("ledger", "pass");
  refreshStats();
}

function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 2400);
}

function setMode(mode) {
  $$(".px-mode-switch button").forEach(b => b.classList.toggle("active", b.dataset.mode === mode));
  $("#mode-eyebrow").textContent = modes[mode].eyebrow;
  $("#mode-title").textContent = modes[mode].title;
  selectNode(mode === "operate" ? "planner" : mode === "assure" ? "harness" : "decision");
}

function buildLocalRuntime() {
  const r = new PraxiosRuntime({
    sessionId: "IRL-LOCAL-" + Date.now(),
    onEvent: async () => refreshStats()
  });

  r.registerProvider("fixture", new FixtureProvider(request => {
    if (/research/i.test(request.role)) return "Evidence constraint recovered with source provenance.";
    if (/sim|math/i.test(request.role)) return "Counterfactual geometry evaluated; alternatives remain.";
    return "Task completed.";
  }));

  r.registerExecutor("measurement-design", async action => ({
    artifactId: "MEASUREMENT-DESIGN-001",
    status: "CREATED",
    proposal: action.payload
  }), {
    effect: "write",
    tags: ["artifact_write"],
    riskClass: "standard",
    description: "Creates a measurement-design artifact."
  });
  return r;
}

async function runLocalSession() {
  resetVisuals();
  runtime = buildLocalRuntime();
  remoteSessionId = null;
  activeAction = null;
  activeAuthorization = null;
  activeDecisionPackage = null;
  latestActionEvaluation = null;
  const goal = $("#command").value.trim() || "Validate NFC continuation hypothesis.";

  markNode("planner", "running");
  await runtime.start(goal, "human");
  await runtime.setPhase("REASON", "Planner decomposes governed work.");
  $("#progress").style.width = "10%";
  await sleep(120);

  await runtime.setPhase("PROPOSE", "Register task DAG.");
  await runtime.delegateTask({ id: "T-RESEARCH", title: "Evidence review", role: "researcher", provider: "fixture", input: goal });
  await runtime.delegateTask({ id: "T-SIM", title: "Model evaluation", role: "simulator", provider: "fixture", input: goal, dependsOn: ["T-RESEARCH"] });
  markEdge("e1", "running"); markEdge("e2", "running");
  await runtime.runTasks();
  $("#progress").style.width = "48%";

  await runtime.addEvidence({
    id: "S2",
    kind: "published",
    summary: "Published measurement constrains the North Face Corridor geometry.",
    peerReviewed: true,
    source: {
      title: "North Face Corridor muography study",
      uri: "https://www.nature.com/articles/s41467-023-36351-0"
    },
    uncertainty: "Continuation beyond the measured region remains incompletely constrained."
  }, "worker:research");

  await runtime.proposeClaim({
    id: "C-0142",
    text: "The NFC may continue south through a smaller section.",
    epistemic: "HYPOTHESIS",
    evidenceIds: ["S2"],
    method: "inverse constraint analysis",
    uncertainty: "Alternative geometries remain compatible with current data.",
    identifiability: "I1",
    requiredIdentifiability: "I2",
    requestedUse: "decision",
    proposerId: "worker:research",
    proposerModel: { provider: "fixture", model: "worker-a" },
    requireIndependentReview: true,
    contradictions: []
  }, "worker:research");

  await runtime.setPhase("VERIFY", "Independent reviewer evaluates claim.");
  await runtime.applyClaimReview("C-0142", {
    summary: "Current evidence is compatible with multiple geometries.",
    uncertainty: "Alternative terminations remain possible.",
    identifiability: "I1",
    contradictions: [{
      id: "ALT-1",
      text: "The signal may remain compatible with a termination or geometry change.",
      resolved: false,
      status: "OPEN"
    }]
  }, {
    verifierId: "reviewer:fixture",
    verifierModel: { provider: "fixture", model: "reviewer-b" },
    actor: "reviewer:fixture"
  });

  const evaluation = await runtime.verifyClaim("C-0142", {
    verifierId: "reviewer:fixture",
    verifierModel: { provider: "fixture", model: "reviewer-b" },
    actor: "reviewer:fixture"
  });
  $("#progress").style.width = "72%";

  activeAction = {
    id: "ACT-001",
    title: "Create next-measurement design artifact",
    executor: "measurement-design",
    payload: {
      objective: "Maximize discrimination between NFC continuation alternatives.",
      method: "Expected information gain study"
    }
  };

  latestActionEvaluation = await runtime.metaHarness.evaluateAction(activeAction, {
    authorization: null,
    claims: runtime.state.claims
  });
  activeAuthorization = await runtime.requestAuthorization(activeAction, "praxios");

  activeDecisionPackage = await runtime.createDecisionPackage({
    id: "DR-001",
    title: "NFC next measurement",
    situation: goal,
    risks: ["Current geometry is not uniquely identified."],
    options: [
      {
        id: "authorize:" + activeAction.id,
        label: "Authorize measurement-design artifact",
        actionId: activeAction.id
      },
      { id: "hold", label: "Hold and request more evidence" }
    ]
  }, "praxios");

  $("#progress").style.width = "86%";
  syncVisualState();
  selectNode("human");
  toast("Local governed session reached human checkpoint · " + evaluation.verdict);
}

function remoteModelConfig() {
  const values = {
    planner: {
      provider: $("#planner-provider").value.trim(),
      model: $("#planner-model").value.trim()
    },
    research: {
      provider: $("#research-provider").value.trim(),
      model: $("#research-model").value.trim()
    },
    math: {
      provider: $("#math-provider").value.trim(),
      model: $("#math-model").value.trim()
    },
    verifier: {
      provider: $("#verifier-provider").value.trim(),
      model: $("#verifier-model").value.trim()
    }
  };
  for (const [name, slot] of Object.entries(values)) {
    if (!slot.provider || !slot.model) throw new Error("Complete " + name + " provider/model.");
  }
  return values;
}

async function connectRemote() {
  const baseUrl = $("#api-base").value.trim();
  const token = $("#api-token").value;
  if (!baseUrl) throw new Error("API base URL is required.");
  const candidate = new PraxiosApiClient({ baseUrl, token });
  const health = await candidate.health();
  const providerResult = await candidate.providers();
  const models = remoteModelConfig();
  const configuredNames = new Set((providerResult.providers || []).map(p => p.name));
  for (const slot of Object.values(models)) {
    if (!configuredNames.has(slot.provider)) {
      throw new Error("Provider not configured on backend: " + slot.provider);
    }
  }
  apiClient = candidate;
  remoteConfig = { baseUrl, token, models };
  $("#runtime-mode-label").textContent = "REMOTE RUNTIME · " + baseUrl.replace(/^https?:\/\//, "");
  $(".px-session-chip").classList.add("remote");
  $("#provider-status").innerHTML = "<b>Remote providers</b>" + esc((providerResult.providers || []).map(p => p.name).join(" · "));
  $("#runtime-connect-status").textContent =
    "Connected · runtime " + esc(health.version) + " · encrypted persistence: " + Boolean(health.encryptedPersistence);
  toast("Remote PRAXIOS runtime connected.");
}

function disconnectRemote() {
  apiClient = null;
  remoteConfig = null;
  remoteSessionId = null;
  $("#runtime-mode-label").textContent = "LOCAL CORE · FIXTURE PROVIDER";
  $(".px-session-chip").classList.remove("remote");
  $("#provider-status").innerHTML = "<b>Server adapters</b>disconnected";
  $("#runtime-connect-status").textContent = "Not connected.";
  toast("Using local governed core.");
}

async function runRemoteSession() {
  if (!apiClient || !remoteConfig) throw new Error("Connect a PRAXIOS backend first.");
  resetVisuals();
  runtime = null;
  activeAction = null;
  activeAuthorization = null;
  activeDecisionPackage = null;
  latestActionEvaluation = null;

  const goal = $("#command").value.trim();
  const { planner, research, math, verifier } = remoteConfig.models;
  markNode("planner", "running");
  $("#progress").style.width = "12%";

  const result = await apiClient.orchestrate({
    goal,
    actor: "human",
    planner,
    workers: {
      research,
      math
    },
    verifier,
    budget: {
      maxProviderCalls: 24,
      maxTasks: 12,
      maxInputChars: 200000,
      maxOutputChars: 300000,
      maxWallClockMs: 180000
    },
    providerTimeoutMs: 60000,
    decision: {
      title: "Governed decision package",
      situation: goal,
      risks: ["Model outputs require evidence-aware review before effectful execution."]
    }
  });

  runtime = await PraxiosRuntime.fromSnapshot(result.snapshot);
  remoteSessionId = runtime.state.sessionId;
  activeAuthorization = (result.authorizationRequests || []).find(a => a.status === "PENDING") || null;
  activeAction = activeAuthorization?.action || null;
  activeDecisionPackage = result.decisionPackage || currentDecision();

  const preflight = [...runtime.ledger.snapshot()].reverse()
    .find(e => e.type === "ACTION_PREFLIGHT_EVALUATED");
  latestActionEvaluation = preflight ? { gates: preflight.payload.gates || [] } : null;

  $("#progress").style.width = activeAuthorization ? "86%" : "100%";
  syncVisualState();
  selectNode(activeAuthorization ? "human" : "decision");
  toast("Remote orchestration complete · session " + remoteSessionId);
}

async function refreshRemoteFromSnapshot(snapshot) {
  runtime = await PraxiosRuntime.fromSnapshot(snapshot);
  activeAuthorization = runtime.state.authorizations.find(a => a.id === activeAuthorization?.id) || activeAuthorization;
  activeDecisionPackage = runtime.state.decisions.find(d => d.id === activeDecisionPackage?.id) || activeDecisionPackage;
  syncVisualState();
}

async function decideAuthorization(approved) {
  if (!runtime || !activeAuthorization || activeAuthorization.status !== "PENDING") return;

  if (apiClient && remoteSessionId) {
    const authResponse = await apiClient.authorize(remoteSessionId, activeAuthorization.id, {
      approved,
      actor: "human",
      reason: approved ? "Approved in Control Room." : "Rejected in Control Room."
    });
    activeAuthorization = authResponse.authorization;
    await refreshRemoteFromSnapshot(authResponse.snapshot);

    if (approved) {
      const executed = await apiClient.execute(remoteSessionId, {
        action: activeAction,
        authorizationId: activeAuthorization.id,
        actor: "praxios"
      });
      latestActionEvaluation = executed.result.evaluation;
      await refreshRemoteFromSnapshot(executed.snapshot);

      if (activeDecisionPackage) {
        const optionId = "authorize:" + activeAction.id;
        const selected = await apiClient.selectDecision(remoteSessionId, activeDecisionPackage.id, {
          selectedOptionId: optionId,
          actor: "human",
          rationale: "Human authority approved the exact gated action."
        });
        await refreshRemoteFromSnapshot(selected.snapshot);
      }
      $("#progress").style.width = "100%";
      markEdge("e8", "pass"); markEdge("e9", "pass");
      toast("Remote action executed and recorded.");
    } else {
      if (activeDecisionPackage) {
        const selected = await apiClient.selectDecision(remoteSessionId, activeDecisionPackage.id, {
          selectedOptionId: "hold",
          actor: "human",
          rationale: "Human authority rejected the proposed effect."
        });
        await refreshRemoteFromSnapshot(selected.snapshot);
      }
      $("#progress").style.width = "100%";
      toast("Remote action remains blocked.");
    }

    selectNode("decision");
    return;
  }

  activeAuthorization = await runtime.authorize(activeAuthorization.id, {
    approved,
    actor: "human",
    authorityType: "human",
    reason: approved ? "Measurement design authorized." : "Measurement design rejected."
  });

  if (approved) {
    latestActionEvaluation = (await runtime.executeAction(activeAction, {
      authorizationId: activeAuthorization.id,
      actor: "praxios"
    })).evaluation;
    await runtime.selectDecision(activeDecisionPackage.id, "authorize:" + activeAction.id, {
      actor: "human",
      authorityType: "human",
      rationale: "Human authority approved the exact gated action."
    });
    $("#progress").style.width = "100%";
    toast("Authorized action executed through Meta-Harness.");
  } else {
    await runtime.selectDecision(activeDecisionPackage.id, "hold", {
      actor: "human",
      authorityType: "human",
      rationale: "Human authority rejected the effectful action."
    });
    $("#progress").style.width = "100%";
    toast("Action remains blocked.");
  }

  syncVisualState();
  selectNode("decision");
}

async function runSession() {
  if (apiClient) return runRemoteSession();
  return runLocalSession();
}

function resetSession() {
  runtime = null;
  remoteSessionId = null;
  activeAction = null;
  activeAuthorization = null;
  activeDecisionPackage = null;
  latestActionEvaluation = null;
  resetVisuals();
  $("#ledger").innerHTML = "";
  $("#stat-agents").textContent = "0";
  $("#stat-claims").textContent = "0";
  $("#stat-gates").textContent = "0/0";
  selectNode("planner");
  toast("Session state reset.");
}

$$(".node").forEach(n => n.addEventListener("click", () => selectNode(n.dataset.node)));
$$(".px-mode-switch button").forEach(b => b.addEventListener("click", () => setMode(b.dataset.mode)));
$("#run-demo").textContent = "Run governed session";
$("#run-demo").addEventListener("click", () => runSession().catch(error => toast(error.message)));
$("#reset-demo").addEventListener("click", resetSession);
$("#send-command").addEventListener("click", () => runSession().catch(error => toast(error.message)));
$("#connect-runtime").addEventListener("click", () => $("#runtime-dialog").showModal());
$("#save-runtime").addEventListener("click", () => connectRemote().catch(error => {
  $("#runtime-connect-status").textContent = "Connection failed · " + error.message;
  toast(error.message);
}));
$("#disconnect-runtime").addEventListener("click", disconnectRemote);

selectNode("planner");
