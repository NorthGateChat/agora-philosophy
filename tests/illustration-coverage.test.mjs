import assert from "node:assert/strict";
import test from "node:test";
import { tsImport } from "tsx/esm/api";

test("every complete built-in quote has exactly one registered illustration", async () => {
  const [
    philosophy,
    chinese,
    mao,
    science,
    economics,
    indian,
    psychology,
    illustrations,
  ] = await Promise.all([
    tsImport("../content/philosophy.ts", import.meta.url),
    tsImport("../content/chinese.ts", import.meta.url),
    tsImport("../content/mao.ts", import.meta.url),
    tsImport("../content/science.ts", import.meta.url),
    tsImport("../content/economics.ts", import.meta.url),
    tsImport("../content/indian.ts", import.meta.url),
    tsImport("../content/psychology.ts", import.meta.url),
    tsImport("../content/illustrations.ts", import.meta.url),
  ]);

  const completeEconomics = await economics.loadCompleteEconomicsCatalog();
  const completeThoughts = [
    ...philosophy.thoughts,
    ...chinese.chineseThoughts,
    ...mao.maoThoughts,
    ...science.scienceThoughts,
    ...completeEconomics.thoughts,
    ...indian.indianThoughts,
    ...psychology.psychologyThoughts,
  ];
  const thoughtIds = completeThoughts.map(({ id }) => id);
  const illustratedIds = illustrations.thoughtIllustrations.map(({ thoughtId }) => thoughtId);

  assert.equal(new Set(thoughtIds).size, thoughtIds.length, "built-in quote ids must be unique");
  assert.equal(
    new Set(illustratedIds).size,
    illustratedIds.length,
    "illustration registry must contain one entry per quote",
  );

  const thoughtIdSet = new Set(thoughtIds);
  const illustratedIdSet = new Set(illustratedIds);
  const missing = thoughtIds.filter((id) => !illustratedIdSet.has(id));
  const orphaned = illustratedIds.filter((id) => !thoughtIdSet.has(id));

  assert.deepEqual(missing, [], `quotes without illustrations:\n${missing.join("\n")}`);
  assert.deepEqual(orphaned, [], `illustrations without quotes:\n${orphaned.join("\n")}`);
  assert.equal(illustratedIds.length, thoughtIds.length);
});
