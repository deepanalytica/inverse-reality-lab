import http from "node:http";
import { URL } from "node:url";
import { PraxiosRuntime } from "./core/praxios-runtime.mjs";
import { PraxiosOrchestrator, ProviderRegistry } from "./core/orchestrator.mjs";
import { OpenAIProvider } from "./providers/openai.mjs";
import { AnthropicProvider } from "./providers/anthropic.mjs";
import { FileSessionStore } from "./storage/file-store.mjs";

const PORT = Number(process.env.PORT || 8787);
const HOST = process.env.HOST || "127.0.0.1";
const SERVER_TOKEN = process.env.PRAXIOS_SERVER_TOKEN || "";
const CORS_ORIGIN = process.env.PRAXIOS_CORS_ORIGIN || "http://127.0.0.1:8000";

if (!["127.0.0.1", "localhost", "::1"].includes(HOST) && !SERVER_TOKEN) {
  throw new Error("PRAXIOS_SERVER_TOKEN is required when binding outside localhost.");
}

const providers = new ProviderRegistry();

if (process.env.OPENAI_API_KEY) {
  providers.register("openai", new OpenAIProvider({
    apiKey: process.env.OPENAI_API_KEY,
    defaultModel: process.env.PRAXIOS_OPENAI_MODEL || null
  }));
}

if (process.env.ANTHROPIC_API_KEY) {
  providers.register("anthropic", new AnthropicProvider({
    apiKey: process.env.ANTHROPIC_API_KEY,
    defaultModel: process.env.PRAXIOS_ANTHROPIC_MODEL || null
  }));
}

const sessions = new Map();
const store = new FileSessionStore();

function json(res, status, body) {
  const payload = JSON.stringify(body);
  res.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "content-length": Buffer.byteLength(payload),
    "access-control-allow-origin": CORS_ORIGIN,
    "access-control-allow-headers": "content-type, authorization",
    "access-control-allow-methods": "GET,POST,OPTIONS"
  });
  res.end(payload);
}

async function readJson(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  if (!chunks.length) return {};
  const raw = Buffer.concat(chunks).toString("utf8");
  return JSON.parse(raw);
}

function attachBuiltins(runtime) {
  runtime.registerExecutor("echo", async action => ({ echoed: action.payload ?? null }));
  runtime.registerExecutor("measurement-design", async action => ({
    artifactId: "artifact-" + Date.now(),
    type: "measurement-design",
    payload: action.payload ?? null
  }));
  return runtime;
}

async function persist(runtime) {
  await store.save(runtime.snapshot());
}

async function getRuntime(id) {
  if (sessions.has(id)) return sessions.get(id);
  if (await store.has(id)) {
    const snapshot = await store.load(id);
    const runtime = attachBuiltins(await PraxiosRuntime.fromSnapshot(snapshot));
    sessions.set(id, runtime);
    return runtime;
  }
  const error = new Error("Unknown session: " + id);
  error.statusCode = 404;
  throw error;
}

function configuredProviders() {
  return providers.list();
}

function authorized(req) {
  if (!SERVER_TOKEN) return true;
  const header = req.headers.authorization || "";
  return header === "Bearer " + SERVER_TOKEN;
}

async function handle(req, res) {
  if (req.method === "OPTIONS") return json(res, 204, {});
  const url = new URL(req.url, "http://" + (req.headers.host || "localhost"));
  const path = url.pathname;

  if (req.method === "GET" && path === "/api/health") {
    return json(res, 200, {
      ok: true,
      service: "praxios-runtime",
      version: "0.1.0",
      providers: configuredProviders(),
      authRequired: Boolean(SERVER_TOKEN)
    });
  }

  if (!authorized(req)) return json(res, 401, { error: "unauthorized" });

  if (req.method === "POST" && path === "/api/sessions") {
    const body = await readJson(req);
    const runtime = attachBuiltins(new PraxiosRuntime({ sessionId: body.sessionId }));
    await runtime.start(body.goal, body.actor || "human");
    sessions.set(runtime.sessionId, runtime);
    await persist(runtime);
    return json(res, 201, runtime.snapshot());
  }

  const sessionMatch = path.match(/^\/api\/sessions\/([^/]+)$/);
  if (req.method === "GET" && sessionMatch) {
    return json(res, 200, (await getRuntime(sessionMatch[1])).snapshot());
  }

  const evidenceMatch = path.match(/^\/api\/sessions\/([^/]+)\/evidence$/);
  if (req.method === "POST" && evidenceMatch) {
    const runtime = await getRuntime(evidenceMatch[1]);
    const body = await readJson(req);
    const evidence = await runtime.addEvidence(body.evidence, body.actor || "human");
    await persist(runtime);
    return json(res, 201, { evidence, snapshot: runtime.snapshot() });
  }

  const claimMatch = path.match(/^\/api\/sessions\/([^/]+)\/claims$/);
  if (req.method === "POST" && claimMatch) {
    const runtime = await getRuntime(claimMatch[1]);
    const body = await readJson(req);
    const claim = await runtime.proposeClaim(body.claim, body.actor || "proposer");
    await persist(runtime);
    return json(res, 201, { claim, snapshot: runtime.snapshot() });
  }

  const verifyMatch = path.match(/^\/api\/sessions\/([^/]+)\/claims\/([^/]+)\/verify$/);
  if (req.method === "POST" && verifyMatch) {
    const runtime = await getRuntime(verifyMatch[1]);
    const body = await readJson(req);
    const evaluation = await runtime.verifyClaim(verifyMatch[2], {
      verifierId: body.verifierId || "verifier",
      actor: body.actor || body.verifierId || "verifier"
    });
    await persist(runtime);
    return json(res, 200, { evaluation, snapshot: runtime.snapshot() });
  }

  const authorizationRequestMatch = path.match(/^\/api\/sessions\/([^/]+)\/authorizations$/);
  if (req.method === "POST" && authorizationRequestMatch) {
    const runtime = await getRuntime(authorizationRequestMatch[1]);
    const body = await readJson(req);
    const request = await runtime.requestAuthorization(body.action, body.actor || "proposer");
    await persist(runtime);
    return json(res, 201, { request, snapshot: runtime.snapshot() });
  }

  const authorizationDecisionMatch = path.match(/^\/api\/sessions\/([^/]+)\/authorizations\/([^/]+)$/);
  if (req.method === "POST" && authorizationDecisionMatch) {
    const runtime = await getRuntime(authorizationDecisionMatch[1]);
    const body = await readJson(req);
    const authorization = await runtime.authorize(authorizationDecisionMatch[2], {
      approved: Boolean(body.approved),
      actor: body.actor || "human",
      reason: body.reason || ""
    });
    await persist(runtime);
    return json(res, 200, { authorization, snapshot: runtime.snapshot() });
  }

  const executeMatch = path.match(/^\/api\/sessions\/([^/]+)\/actions\/execute$/);
  if (req.method === "POST" && executeMatch) {
    const runtime = await getRuntime(executeMatch[1]);
    const body = await readJson(req);
    const result = await runtime.executeAction(body.action, {
      authorizationId: body.authorizationId || null,
      actor: body.actor || "praxios"
    });
    await persist(runtime);
    return json(res, 200, { result, snapshot: runtime.snapshot() });
  }

  const auditMatch = path.match(/^\/api\/sessions\/([^/]+)\/audit$/);
  if (req.method === "GET" && auditMatch) {
    const runtime = await getRuntime(auditMatch[1]);
    return json(res, 200, await runtime.audit());
  }

  if (req.method === "POST" && path === "/api/orchestrate") {
    const body = await readJson(req);
    if (!body.goal) return json(res, 400, { error: "goal is required" });
    const runtime = attachBuiltins(new PraxiosRuntime({ sessionId: body.sessionId }));
    sessions.set(runtime.sessionId, runtime);
    const orchestrator = new PraxiosOrchestrator({ runtime, providers });
    const result = await orchestrator.runGoal({
      goal: body.goal,
      planner: body.planner,
      workers: body.workers || {},
      verifier: body.verifier,
      actor: body.actor || "human"
    });
    await persist(runtime);
    return json(res, 200, result);
  }

  return json(res, 404, { error: "not_found" });
}

const server = http.createServer((req, res) => {
  handle(req, res).catch(error => {
    const status = Number(error.statusCode || 500);
    json(res, status, {
      error: error.name || "Error",
      message: error.message || String(error)
    });
  });
});

server.listen(PORT, HOST, () => {
  console.log("PRAXIOS runtime listening on http://" + HOST + ":" + PORT);
  console.log("Configured providers: " + (configuredProviders().join(", ") || "none"));
});
