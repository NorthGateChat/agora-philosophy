import assert from "node:assert/strict";
import test from "node:test";
import { tsImport } from "tsx/esm/api";

const entry = (id, view) => ({
  key: `${view}:${id}`,
  view,
  related: { id },
  connection: {
    id: `${view}:${id}`,
    source: "center",
    target: id,
    kind: view === "dialogue" ? "dialogues" : "inherits",
    scope: "thought",
    basis: "editorial",
    summary: id,
    englishSummary: id,
  },
});

test("the thought neighborhood is deterministic, balanced, capped, and de-duplicated", async () => {
  const { buildThoughtNeighborhood, thoughtNeighborhoodLimit } = await tsImport(
    "../lib/thoughtNeighborhood.ts",
    import.meta.url,
  );
  const lineage = {
    upstream: [entry("a", "upstream"), entry("b", "upstream"), entry("c", "upstream")],
    dialogue: [entry("d", "dialogue"), entry("a", "dialogue")],
    downstream: [
      entry("e", "downstream"),
      entry("f", "downstream"),
      entry("g", "downstream"),
      entry("h", "downstream"),
    ],
  };

  const first = buildThoughtNeighborhood(lineage);
  const second = buildThoughtNeighborhood(lineage);

  assert.deepEqual(first, second, "layout must never depend on random or time-based input");
  assert.equal(first.nodes.length, thoughtNeighborhoodLimit);
  assert.equal(first.total, 8, "duplicate related thoughts count as one visual node");
  assert.deepEqual(
    first.nodes.slice(0, 3).map((node) => node.entry.view),
    ["upstream", "dialogue", "downstream"],
    "the first pass must represent every available relationship family",
  );
  assert.equal(new Set(first.nodes.map((node) => node.entry.related.id)).size, first.nodes.length);
  assert.equal(new Set(first.nodes.map((node) => node.slot)).size, first.nodes.length);
});

test("a dense single relationship family can fill every graph position", async () => {
  const { buildThoughtNeighborhood, thoughtNeighborhoodLimit } = await tsImport(
    "../lib/thoughtNeighborhood.ts",
    import.meta.url,
  );
  const lineage = {
    upstream: [],
    dialogue: [],
    downstream: Array.from({ length: 8 }, (_, index) => entry(`d-${index}`, "downstream")),
  };

  const model = buildThoughtNeighborhood(lineage);
  assert.equal(model.nodes.length, thoughtNeighborhoodLimit);
  assert.equal(model.total, 8);
  assert.equal(new Set(model.nodes.map((node) => node.slot)).size, thoughtNeighborhoodLimit);
});

test("dense neighborhoods expose every de-duplicated thought across graph pages", async () => {
  const {
    buildThoughtNeighborhood,
    findThoughtNeighborhoodPage,
    thoughtNeighborhoodLimit,
  } = await tsImport(
    "../lib/thoughtNeighborhood.ts",
    import.meta.url,
  );
  const lineage = {
    upstream: Array.from({ length: 5 }, (_, index) => entry(`u-${index}`, "upstream")),
    dialogue: Array.from({ length: 4 }, (_, index) => entry(`x-${index}`, "dialogue")),
    downstream: Array.from({ length: 5 }, (_, index) => entry(`d-${index}`, "downstream")),
  };

  const first = buildThoughtNeighborhood(lineage);
  const second = buildThoughtNeighborhood(lineage, thoughtNeighborhoodLimit, 1);
  const third = buildThoughtNeighborhood(lineage, thoughtNeighborhoodLimit, 2);
  const visibleIds = [...first.nodes, ...second.nodes, ...third.nodes]
    .map((node) => node.entry.related.id);

  assert.equal(first.total, 14);
  assert.equal(new Set(visibleIds).size, 14, "cycling graph pages must make every thought reachable");
  assert.equal(second.nodes.length, thoughtNeighborhoodLimit);
  assert.equal(third.nodes.length, 2);
  assert.equal(findThoughtNeighborhoodPage(lineage, third.nodes[1].entry.key), 2);
  assert.equal(findThoughtNeighborhoodPage(lineage, "missing"), -1);
});

test("graph pages wrap deterministically", async () => {
  const { buildThoughtNeighborhood, thoughtNeighborhoodLimit } = await tsImport(
    "../lib/thoughtNeighborhood.ts",
    import.meta.url,
  );
  const lineage = {
    upstream: [],
    dialogue: [],
    downstream: Array.from({ length: 8 }, (_, index) => entry(`d-${index}`, "downstream")),
  };

  assert.deepEqual(
    buildThoughtNeighborhood(lineage, thoughtNeighborhoodLimit, 2),
    buildThoughtNeighborhood(lineage, thoughtNeighborhoodLimit, 0),
  );
  assert.deepEqual(
    buildThoughtNeighborhood(lineage, thoughtNeighborhoodLimit, -1),
    buildThoughtNeighborhood(lineage, thoughtNeighborhoodLimit, 1),
  );
});

test("an empty lineage produces no orphan graph nodes", async () => {
  const { buildThoughtNeighborhood } = await tsImport(
    "../lib/thoughtNeighborhood.ts",
    import.meta.url,
  );

  assert.deepEqual(
    buildThoughtNeighborhood({ upstream: [], dialogue: [], downstream: [] }),
    { nodes: [], total: 0 },
  );
});
