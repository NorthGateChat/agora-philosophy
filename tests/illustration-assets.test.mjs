import assert from "node:assert/strict";
import test from "node:test";
import { validateIllustrationAssets } from "../scripts/validate-illustrations.mjs";

test("illustration assets and the non-runtime batch plan satisfy the production contract", async () => {
  const result = await validateIllustrationAssets();
  assert.deepEqual(result.errors, [], result.errors.join("\n"));
  assert.ok(result.stats.registered >= 1);
  assert.ok(result.stats.planned >= 30);
  assert.ok(result.stats.batches >= 1);
  assert.ok(result.stats.runtimeBytes > 10_000);
});
