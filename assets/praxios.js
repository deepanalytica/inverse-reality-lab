import { PraxiosRuntime } from "../runtime/core/praxios-runtime.mjs";
import { FixtureProvider } from "../runtime/providers/fixture.mjs";

const $ = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const modes = {
  operate: { eyebrow: "PRAXIOS · runtime real", title: "Orquestación de sesión" },
  assure: { eyebrow: "META-HARNESS · gates reales", title: "Evidencia, claims y control" },
  decide: { eyebrow: "DECISION ROOM · human authority", title: "Opciones, autorización y resultado" }
};

let runtime = null;
let activeAction = null;
let activeAuthorization = null;
let latestActionEvaluation = null;

const nodeDescriptions = {
  planner: ["PRAXIOS · orchestration", "Planner", "Convierte el objetivo en trabajo gobernado por estado, dependencias y políticas."],
  researcher: ["WORKER · evidence", "Researcher", "Trabajo delegado de evidencia ejecutado por el scheduler."],
  simulator: ["WORKER · computation", "Simulator", "Trabajo delegado de cálculo y producción de artefactos."],
  reviewer: ["WORKER · verification", "Reviewer", "Actor distinto del proposer. Verifica claims y busca contradicciones."],
  harness: ["META-HARNESS · assurance", "Meta-Harness", "Aplica gates sobre claims y acciones antes de promover o ejecutar."],
  human: ["AUTHORITY · checkpoint", "Human authority", "Aprueba o rechaza acciones con efectos."],
  decision: ["DECISION ROOM", "Decision Room", "Concentra situación, opciones, autorización y outcome."],
  ledger: ["CANONICAL STATE", "The Ledger", "Cadena SHA-256 append-only que permite auditar y verificar la sesión."]
};

function badge(status) {
  const s = String(status || "ready").toLowerCase();
  const cls = s === "pass" || s === "verified" || s === "completed" || s === "approved" ? "pass"
    : s === "block" || s === "blocked" || s === "rejected" || s === "failed" ? "block"
    : s === "review" || s === "pending" || s === "awaiting_authorization" ? "review"
    : "running";
  return '<span class="px-badge ' + cls + '">' + String(status || "ready") + '</span>';
}

function gateRows(gates) {
  if (!gates || !gates.length) return '<p>Los gates aparecerán cuando exista un claim verificable.</p>';
  return '<div class="px-gate-list">' + gates.map(g =>
    '<div class="px-gate"><div><b>' + g.id + '</b><small>' + g.reason + '</small></div>' + badge(g.status) + '</div>'
  ).join("") + '</div>';
}

function currentClaim() {
  if (!runtime) return null;
  return runtime.state.claims[runtime.state.claims.length - 1] || null;
}

function currentDecision() {
  if (!runtime) return null;
  return runtime.state.decisions[runtime.state.decisions.length - 1] || null;
}

function currentTask(role) {
  if (!runtime) return null;
  return runtime.scheduler.list().find(t => t.role === role) || null;
}

function inspectorHtml(id) {
  const desc = nodeDescriptions[id];
  if (!runtime) {
    return '<div class="px-panel"><h3>Estado</h3><p>' + desc[2] + '</p><p>Ejecuta una sesión para observar el runtime.</p></div>';
  }

  if (id === "harness") {
    const claim = currentClaim();
    if (!claim) return '<div class="px-panel"><h3>Meta-Harness</h3><p>Esperando un claim.</p></div>';
    return '<div class="px-panel"><h3>' + claim.id + '</h3><p><strong>' + claim.text + '</strong></p>' +
      '<p>Clase: ' + badge(claim.epistemic) + ' · Verdict: ' + badge(claim.verdict || "PENDING") + '</p></div>' +
      '<div class="px-panel"><h3>Gates</h3>' + gateRows(claim.gates) + '</div>' +
      (latestActionEvaluation ? '<div class="px-panel"><h3>Action gates</h3>' + gateRows(latestActionEvaluation.gates) + '</div>' : '');
  }

  if (id === "human") {
    const auth = activeAuthorization;
    if (!auth) return '<div class="px-panel"><h3>Checkpoint</h3><p>No existe una autorización pendiente.</p></div>';
    const buttons = auth.status === "PENDING"
      ? '<button class="px-btn primary" id="approve-action">Approve</button> <button class="px-btn danger" id="reject-action">Reject</button>'
      : badge(auth.status);
    return '<div class="px-panel"><h3>Authorization request</h3><p><strong>' + auth.action.title + '</strong></p>' +
      '<dl class="px-kv"><dt>Effect</dt><dd>' + auth.action.effect + '</dd><dt>Requested by</dt><dd>' + auth.requestedBy + '</dd><dt>Status</dt><dd>' + auth.status + '</dd></dl></div>' +
      '<div class="px-panel">' + buttons + '</div>';
  }

  if (id === "decision") {
    const d = currentDecision();
    return '<div class="px-panel"><h3>Situation</h3><p>La evidencia deja abiertas alternativas. El claim permanece gobernado por sus gates.</p></div>' +
      '<div class="px-panel"><h3>Decision</h3>' +
      (d ? '<p><strong>' + (d.selected || "Pendiente") + '</strong></p><p>' + (d.rationale || "Esperando autoridad humana.") + '</p>' : '<p>Esperando checkpoint humano.</p>') +
      '</div>';
  }

  if (id === "ledger") {
    return '<div class="px-panel"><h3>Canonical state</h3><dl class="px-kv"><dt>Revision</dt><dd>' + runtime.state.revision +
      '</dd><dt>Events</dt><dd>' + runtime.ledger.events.length + '</dd><dt>Head</dt><dd style="word-break:break-all">' +
      (runtime.ledger.lastHash || "").slice(0, 24) + '…</dd></dl></div><div class="px-panel"><button class="px-btn" id="verify-ledger">Verify hash chain</button></div>';
  }

  const roleMap = { researcher: "researcher", simulator: "simulator", reviewer: "reviewer" };
  if (roleMap[id]) {
    const task = currentTask(roleMap[id]);
    return '<div class="px-panel"><h3>Task</h3><p>' + desc[2] + '</p>' +
      (task ? '<dl class="px-kv"><dt>ID</dt><dd>' + task.id + '</dd><dt>Status</dt><dd>' + task.status +
      '</dd><dt>Provider</dt><dd>' + task.provider + '</dd></dl>' : '<p>Sin task todavía.</p>') + '</div>';
  }

  return '<div class="px-panel"><h3>Responsabilidad</h3><p>' + desc[2] + '</p></div>' +
    '<div class="px-panel"><h3>Session</h3><dl class="px-kv"><dt>Phase</dt><dd>' + runtime.state.phase +
    '</dd><dt>Status</dt><dd>' + runtime.state.status + '</dd><dt>Revision</dt><dd>' + runtime.state.revision + '</dd></dl></div>';
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
      const check = await runtime.ledger.verify();
      toast(check.ok ? "Ledger verified · " + check.count + " events." : "Ledger verification failed.");
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
  if (id === "researcher") return currentTask("researcher")?.status || "QUEUED";
  if (id === "simulator") return currentTask("simulator")?.status || "QUEUED";
  if (id === "reviewer") return currentTask("reviewer")?.status || (currentClaim()?.verdict || "QUEUED");
  if (id === "harness") return currentClaim()?.verdict || "QUEUED";
  if (id === "human") return activeAuthorization?.status || "IDLE";
  if (id === "decision") return currentDecision()?.selected ? "PASS" : "REVIEW";
  if (id === "ledger") return "PASS";
  return "ready";
}

function renderLedger() {
  const events = runtime ? runtime.ledger.snapshot() : [];
  $("#ledger").innerHTML = events.slice(-10).map(e => {
    const time = String(e.timestamp).slice(11, 19);
    const status = e.type.includes("BLOCK") || e.payload?.verdict === "BLOCK" ? "review"
      : e.payload?.verdict === "PASS" || e.type.includes("APPROVED") || e.type === "ACTION_EXECUTED" ? "pass"
      : "";
    return '<div class="px-ledger-row ' + status + '"><span>' + time + '</span><span class="kind">' +
      e.type.replaceAll("_", " ").slice(0, 18) + '</span><span>' + e.actor + ' · #' + e.seq + '</span></div>';
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

function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 1900);
}

function setMode(mode) {
  $$(".px-mode-switch button").forEach(b => b.classList.toggle("active", b.dataset.mode === mode));
  $("#mode-eyebrow").textContent = modes[mode].eyebrow;
  $("#mode-title").textContent = modes[mode].title;
  selectNode(mode === "operate" ? "planner" : mode === "assure" ? "harness" : "decision");
}

function buildRuntime() {
  const r = new PraxiosRuntime({
    sessionId: "IRL-042",
    onEvent: async () => {
      refreshStats();
    }
  });

  r.registerProvider("fixture", new FixtureProvider(request => {
    if (request.role === "researcher") return "Evidence constraint recovered with source provenance.";
    if (request.role === "simulator") return "Counterfactual geometry evaluated; alternatives remain.";
    if (request.role === "reviewer") return "Independent review: claim is compatible but not uniquely identified.";
    return "Task completed.";
  }));

  r.registerExecutor("measurement-design", async action => ({
    artifactId: "MEASUREMENT-DESIGN-001",
    status: "CREATED",
    proposal: action.payload
  }), { effect: "write", tags: ["artifact_write"] });
  return r;
}

async function runSession() {
  resetVisuals();
  runtime = buildRuntime();
  activeAction = null;
  activeAuthorization = null;
  latestActionEvaluation = null;
  const goal = $("#command").value.trim() || "Validate NFC continuation hypothesis.";

  markNode("planner", "running");
  await runtime.start(goal, "human");
  await runtime.setPhase("REASON", "Planner decomposes governed work.");
  selectNode("planner");
  $("#progress").style.width = "10%";
  await sleep(280);

  await runtime.setPhase("PROPOSE", "Register task DAG.");
  await runtime.delegateTask({ id: "T-RESEARCH", title: "Evidence review", role: "researcher", provider: "fixture", input: goal });
  await runtime.delegateTask({ id: "T-SIM", title: "Model evaluation", role: "simulator", provider: "fixture", input: goal, dependsOn: ["T-RESEARCH"] });
  await runtime.delegateTask({ id: "T-REVIEW", title: "Adversarial review", role: "reviewer", provider: "fixture", input: goal, dependsOn: ["T-SIM"] });
  markEdge("e1", "running"); markEdge("e2", "running"); markEdge("e3", "running");
  $("#progress").style.width = "28%";
  await runtime.runTasks();
  markNode("researcher", "pass"); markNode("simulator", "pass"); markNode("reviewer", "pass");
  markEdge("e1", "pass"); markEdge("e2", "pass"); markEdge("e3", "pass");
  $("#progress").style.width = "50%";

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
  }, "researcher");

  await runtime.setPhase("VERIFY", "Meta-Harness evaluates claim.");
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
    proposerId: "researcher",
    contradictions: [{
      id: "ALT-1",
      text: "The signal can remain compatible with a termination or geometry change.",
      resolved: false,
      status: "OPEN"
    }]
  }, "researcher");

  const evaluation = await runtime.verifyClaim("C-0142", { verifierId: "reviewer", actor: "reviewer" });
  markNode("harness", evaluation.verdict === "PASS" ? "pass" : evaluation.verdict === "BLOCK" ? "block" : "review");
  ["e4","e5","e6"].forEach(id => markEdge(id, evaluation.verdict === "PASS" ? "pass" : "review"));
  $("#progress").style.width = "72%";
  selectNode("harness");
  await sleep(300);

  activeAction = {
    id: "ACT-001",
    title: "Create next-measurement design artifact",
    effect: "write",
    executor: "measurement-design",
    payload: {
      objective: "Maximize discrimination between NFC continuation alternatives.",
      method: "Expected information gain study"
    }
  };

  latestActionEvaluation = await runtime.metaHarness.evaluateAction(activeAction, { authorization: null });
  activeAuthorization = await runtime.requestAuthorization(activeAction, "praxios");
  markNode("human", "review");
  markEdge("e7", "review");
  await runtime.recordDecision({
    id: "D-001",
    title: "NFC next measurement",
    options: ["Approve measurement design", "Reject and hold"],
    selected: null,
    rationale: "Awaiting human authority.",
    status: "PENDING"
  }, "praxios");
  $("#progress").style.width = "86%";
  selectNode("human");
  refreshStats();
}

async function decideAuthorization(approved) {
  if (!runtime || !activeAuthorization || activeAuthorization.status !== "PENDING") return;
  activeAuthorization = await runtime.authorize(activeAuthorization.id, {
    approved,
    actor: "human",
    reason: approved ? "Measurement design authorized." : "Measurement design rejected."
  });

  if (approved) {
    latestActionEvaluation = (await runtime.executeAction(activeAction, {
      authorizationId: activeAuthorization.id,
      actor: "praxios"
    })).evaluation;
    runtime.state.decisions = runtime.state.decisions.filter(d => d.id !== "D-001");
    await runtime.recordDecision({
      id: "D-001-FINAL",
      title: "NFC next measurement",
      options: ["Approve measurement design", "Reject and hold"],
      selected: "Approve measurement design",
      rationale: "Human authority approved the gated action.",
      status: "RECORDED"
    }, "human");
    markNode("human", "pass"); markEdge("e7", "pass");
    markNode("decision", "pass"); markEdge("e8", "pass");
    markNode("ledger", "pass"); markEdge("e9", "pass");
    $("#progress").style.width = "100%";
    toast("Authorized action executed through Meta-Harness.");
  } else {
    runtime.state.decisions = runtime.state.decisions.filter(d => d.id !== "D-001");
    await runtime.recordDecision({
      id: "D-001-FINAL",
      title: "NFC next measurement",
      options: ["Approve measurement design", "Reject and hold"],
      selected: "Reject and hold",
      rationale: "Human authority rejected the effectful action.",
      status: "RECORDED"
    }, "human");
    markNode("human", "block"); markEdge("e7", "block");
    markNode("decision", "review");
    $("#progress").style.width = "100%";
    toast("Action remains blocked.");
  }

  selectNode("decision");
  refreshStats();
}

function resetSession() {
  runtime = null;
  activeAction = null;
  activeAuthorization = null;
  latestActionEvaluation = null;
  resetVisuals();
  $("#ledger").innerHTML = "";
  $("#stat-agents").textContent = "0";
  $("#stat-claims").textContent = "0";
  $("#stat-gates").textContent = "0/0";
  selectNode("planner");
  toast("Runtime reset.");
}

$$(".node").forEach(n => n.addEventListener("click", () => selectNode(n.dataset.node)));
$$(".px-mode-switch button").forEach(b => b.addEventListener("click", () => setMode(b.dataset.mode)));
$("#run-demo").textContent = "Run governed session";
$("#run-demo").addEventListener("click", () => runSession().catch(error => toast(error.message)));
$("#reset-demo").addEventListener("click", resetSession);
$("#send-command").addEventListener("click", () => runSession().catch(error => toast(error.message)));
selectNode("planner");
