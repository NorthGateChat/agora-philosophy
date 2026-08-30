import assert from "node:assert/strict";
import test from "node:test";
import { tsImport } from "tsx/esm/api";

test("retired-card migrations preserve order, unknown IDs, and only one surviving copy", async () => {
  const { migrateRetiredThoughtIds, migrateRetiredThoughtState } = await tsImport(
    "../content/retiredThoughtReplacements.ts",
    import.meta.url,
  );

  assert.deepEqual(
    migrateRetiredThoughtIds([
      "custom-reader-card",
      "marx-commodity-fetishism",
      "economics-marx-commodity-fetish",
      "francis-bacon-idols",
      "custom-reader-card",
    ]),
    [
      "custom-reader-card",
      "economics-marx-commodity-fetish",
      "science-bacon-idols",
    ],
  );

  const fillers = Array.from({ length: 100 }, (_, index) => `recent-${index}`);
  const migratedRecent = migrateRetiredThoughtIds([
    "marx-commodity-fetishism",
    ...fillers,
    "economics-marx-commodity-fetish",
  ], "last").slice(-100);
  assert.equal(migratedRecent.length, 100);
  assert.equal(migratedRecent.at(-1), "economics-marx-commodity-fetish");
  assert.ok(!migratedRecent.includes("marx-commodity-fetishism"));

  assert.deepEqual(
    migrateRetiredThoughtState({
      saved: ["marx-commodity-fetishism", "custom-reader-card"],
      blocked: ["economics-marx-commodity-fetish"],
      recent: ["marx-commodity-fetishism", "economics-marx-commodity-fetish"],
    }),
    {
      saved: ["custom-reader-card"],
      blocked: ["economics-marx-commodity-fetish"],
      recent: ["economics-marx-commodity-fetish"],
    },
  );
});

test("every documented migration starts retired and lands on a live card", async () => {
  const [
    { migrateRetiredThoughtIds, retiredThoughtReplacements },
    { curation2026RetiredThoughtIds },
    { allThoughts },
    { loadCompleteEconomicsCatalog },
  ] = await Promise.all([
    tsImport("../content/retiredThoughtReplacements.ts", import.meta.url),
    tsImport("../content/curation2026Registry.ts", import.meta.url),
    tsImport("../content/libraries.ts", import.meta.url),
    tsImport("../content/economics.ts", import.meta.url),
  ]);
  const completeEconomicsCatalog = await loadCompleteEconomicsCatalog();
  const canonicalThoughts = [
    ...allThoughts.filter((thought) => !thought.id.startsWith("economics-")),
    ...completeEconomicsCatalog.thoughts,
  ];
  const liveIdCounts = new Map();
  for (const thought of canonicalThoughts) {
    liveIdCounts.set(thought.id, (liveIdCounts.get(thought.id) ?? 0) + 1);
  }

  assert.deepEqual(
    [...curation2026RetiredThoughtIds]
      .filter((id) => !Object.hasOwn(retiredThoughtReplacements, id))
      .sort(),
    [
      "arendt",
      "averroes-audiences",
      "camus",
      "derrida",
      "foucault",
      "heidegger",
      "nussbaum",
      "rawls",
      "sartre",
    ],
    "only retirements without an editorially equivalent survivor may remain unmapped",
  );

  const migratedSources = migrateRetiredThoughtIds(Object.keys(retiredThoughtReplacements));
  assert.deepEqual(
    migrateRetiredThoughtIds(migratedSources),
    migratedSources,
    "running the migration twice must be idempotent",
  );

  for (const retiredId of Object.keys(retiredThoughtReplacements)) {
    assert.equal(
      liveIdCounts.get(retiredId) ?? 0,
      0,
      `${retiredId} must be absent from the live catalog`,
    );
  }

  assert.equal(
    canonicalThoughts.length,
    1_441,
    "migration targets must be checked against the complete canonical catalog",
  );

  const liveIds = new Set([
    ...canonicalThoughts.map((thought) => thought.id),
  ]);

  for (const [retiredId, survivingId] of Object.entries(retiredThoughtReplacements)) {
    assert.ok(curation2026RetiredThoughtIds.has(retiredId), `${retiredId} must be retired`);
    assert.notEqual(retiredId, survivingId, `${retiredId} must not migrate to itself`);
    assert.ok(liveIds.has(survivingId), `${survivingId} must remain in a live catalog`);
    assert.equal(liveIdCounts.get(survivingId), 1, `${survivingId} must be unique in the live catalog`);
    assert.ok(
      !curation2026RetiredThoughtIds.has(survivingId),
      `${survivingId} must not itself be retired`,
    );
    assert.ok(
      !(survivingId in retiredThoughtReplacements),
      `${survivingId} must not require a second migration hop`,
    );
  }
});
