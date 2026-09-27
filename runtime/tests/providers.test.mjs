import test from "node:test";
import assert from "node:assert/strict";
import { OpenAIProvider } from "../providers/openai.mjs";
import { AnthropicProvider } from "../providers/anthropic.mjs";
import { FixtureProvider } from "../providers/fixture.mjs";
import { ProviderRegistry, PraxiosOrchestrator } from "../core/orchestrator.mjs";
import { PraxiosRuntime } from "../core/praxios-runtime.mjs";

test("OpenAI adapter parses Responses API text output", async () => {
  const provider = new OpenAIProvider({
    apiKey: "test",
    defaultModel: "test-model",
    fetchImpl: async () => ({
      ok: true,
      json: async () => ({
        output: [{
          type: "message",
          content: [{ type: "output_text", text: "hello" }]
        }]
      })
    })
  });
  assert.equal(await provider.generate({ input: "x" }), "hello");
});

test("Anthropic adapter parses Messages API text output", async () => {
  const provider = new AnthropicProvider({
    apiKey: "test",
    defaultModel: "test-model",
    fetchImpl: async () => ({
      ok: true,
      json: async () => ({
        content: [{ type: "text", text: "hello" }]
      })
    })
  });
  assert.equal(await provider.generate({ input: "x" }), "hello");
});

test("orchestrator delegates planner work and routes independent verification", async () => {
  const registry = new ProviderRegistry();
  registry.register("planner-fixture", new FixtureProvider(JSON.stringify({
    tasks: [{
      id: "T1",
      title: "Research",
      role: "researcher",
      input: "Collect evidence",
      dependsOn: [],
      workerSlot: "research"
    }]
  })));
  registry.register("worker-fixture", new FixtureProvider("Worker evidence output."));
  registry.register("verifier-fixture", new FixtureProvider(JSON.stringify({
    summary: "Review complete.",
    evidence: [{
      id: "E1",
      kind: "published",
      summary: "Published constraint",
      peerReviewed: true,
      source: { title: "Paper", uri: "https://example.test/paper" }
    }],
    claims: [{
      id: "C1",
      text: "A bounded hypothesis.",
      epistemic: "HYPOTHESIS",
      evidenceIds: ["E1"],
      method: "inverse analysis",
      uncertainty: "Alternatives remain.",
      identifiability: "I1",
      requiredIdentifiability: "I2",
      contradictions: [],
      requestedUse: "decision",
      proposerId: "researcher"
    }],
    proposedActions: []
  })));

  const runtime = new PraxiosRuntime({
    sessionId: "orchestration-test",
    clock: () => "2026-09-27T00:00:00.000Z"
  });
  const orchestrator = new PraxiosOrchestrator({ runtime, providers: registry });
  const result = await orchestrator.runGoal({
    goal: "Test goal",
    planner: { provider: "planner-fixture", model: "planner" },
    workers: {
      research: { provider: "worker-fixture", model: "worker" }
    },
    verifier: { provider: "verifier-fixture", model: "verifier" }
  });

  assert.equal(result.plan.tasks.length, 1);
  assert.equal(runtime.scheduler.get("T1").status, "COMPLETED");
  assert.equal(runtime.state.claims.length, 1);
  assert.equal(runtime.state.claims[0].verifierId, "verifier");
  assert.notEqual(runtime.state.claims[0].proposerId, runtime.state.claims[0].verifierId);
});
