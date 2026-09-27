import test from "node:test";
import assert from "node:assert/strict";
import os from "node:os";
import path from "node:path";
import fs from "node:fs/promises";
import { PraxiosRuntime } from "../core/praxios-runtime.mjs";
import { FileSessionStore } from "../storage/file-store.mjs";

test("session snapshot persists and restores with ledger/state audit", async () => {
  const directory = await fs.mkdtemp(path.join(os.tmpdir(), "praxios-store-"));
  try {
    const runtime = new PraxiosRuntime({
      sessionId: "persist-test",
      clock: () => "2026-09-27T00:00:00.000Z"
    });
    await runtime.start("Persist a governed session.");
    await runtime.addEvidence({
      id: "E1",
      kind: "direct",
      summary: "Direct evidence",
      source: { title: "Local test", uri: "urn:test:e1" }
    });

    const store = new FileSessionStore({ directory });
    await store.save(runtime.snapshot());
    const loaded = await store.load("persist-test");
    const restored = await PraxiosRuntime.fromSnapshot(loaded);
    const audit = await restored.audit();

    assert.equal(audit.ok, true);
    assert.equal(restored.state.goal, "Persist a governed session.");
    assert.equal(restored.state.evidence.length, 1);
  } finally {
    await fs.rm(directory, { recursive: true, force: true });
  }
});
