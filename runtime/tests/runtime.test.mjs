import test from "node:test";
import assert from "node:assert/strict";
import { EventLedger } from "../core/ledger.mjs";
import { PraxiosRuntime } from "../core/praxios-runtime.mjs";
import { TaskScheduler } from "../core/scheduler.mjs";

test("ledger detects tampering", async () => {
  const ledger = new EventLedger({ clock: () => "2026-09-27T00:00:00.000Z" });
  await ledger.append("A", { value: 1 });
  await ledger.append("B", { value: 2 });
  assert.equal((await ledger.verify()).ok, true);

  const tampered = ledger.snapshot();
  tampered[0].payload.value = 99;
  const check = await ledger.verify(tampered);
  assert.equal(check.ok, false);
  assert.equal(check.reason, "hash_mismatch");
});

test("Meta-Harness blocks proposer acting as verifier", async () => {
  const runtime = new PraxiosRuntime({
    sessionId: "role-test",
    clock: () => "2026-09-27T00:00:00.000Z"
  });
  await runtime.start("Test role separation.");
  await runtime.addEvidence({
    id: "E1",
    kind: "published",
    summary: "Evidence",
    peerReviewed: true,
    source: { title: "Source", uri: "https://example.test/source" }
  });
  await runtime.proposeClaim({
    id: "C1",
    text: "A bounded claim.",
    epistemic: "PUBLISHED",
    evidenceIds: ["E1"],
    confidence: 0.9,
    identifiability: "I2",
    requiredIdentifiability: "I1",
    proposerId: "agent-a"
  }, "agent-a");

  const evaluation = await runtime.verifyClaim("C1", { verifierId: "agent-a", actor: "agent-a" });
  assert.equal(evaluation.verdict, "BLOCK");
  assert.equal(evaluation.gates.find(g => g.id === "ROLE_SEPARATION").status, "BLOCK");
});

test("effectful action is structurally blocked until human authorization", async () => {
  const runtime = new PraxiosRuntime({
    sessionId: "auth-test",
    clock: () => "2026-09-27T00:00:00.000Z"
  });
  await runtime.start("Test authorization.");
  runtime.registerExecutor("write-artifact", async action => ({ artifactId: "A1", value: action.payload }));

  const action = {
    id: "ACT-1",
    title: "Write approved artifact",
    effect: "write",
    executor: "write-artifact",
    payload: { ok: true }
  };

  await assert.rejects(runtime.executeAction(action), /Meta-Harness blocked action/);

  const request = await runtime.requestAuthorization(action, "planner");
  const authorization = await runtime.authorize(request.id, {
    approved: true,
    actor: "human",
    reason: "Approved in test."
  });
  assert.equal(authorization.status, "APPROVED");

  const result = await runtime.executeAction(action, {
    authorizationId: request.id,
    actor: "praxios"
  });
  assert.deepEqual(result.output, { artifactId: "A1", value: { ok: true } });
});

test("scheduler respects dependencies", async () => {
  const scheduler = new TaskScheduler();
  scheduler.add({ id: "A", input: "a" });
  scheduler.add({ id: "B", input: "b", dependsOn: ["A"] });

  const order = [];
  const result = await scheduler.run(async task => {
    order.push(task.id);
    return task.id.toLowerCase();
  });

  assert.deepEqual(order, ["A", "B"]);
  assert.equal(result.find(t => t.id === "B").status, "COMPLETED");
});

test("publication claim is blocked when identifiability is too low", async () => {
  const runtime = new PraxiosRuntime({
    sessionId: "publish-test",
    clock: () => "2026-09-27T00:00:00.000Z"
  });
  await runtime.start("Test publication gate.");
  await runtime.addEvidence({
    id: "E1",
    kind: "published",
    summary: "Constraint",
    source: { title: "Paper", uri: "https://example.test/paper" },
    peerReviewed: true
  });
  await runtime.proposeClaim({
    id: "C2",
    text: "Specific mechanism caused the observed state.",
    epistemic: "HYPOTHESIS",
    evidenceIds: ["E1"],
    method: "inverse inference",
    uncertainty: "Several alternative mechanisms remain.",
    identifiability: "I1",
    requiredIdentifiability: "I2",
    requestedUse: "publish",
    proposerId: "proposer"
  }, "proposer");

  const evaluation = await runtime.verifyClaim("C2", {
    verifierId: "independent-verifier"
  });
  assert.equal(evaluation.verdict, "BLOCK");
  assert.equal(evaluation.gates.find(g => g.id === "IDENTIFIABILITY").status, "BLOCK");
});
