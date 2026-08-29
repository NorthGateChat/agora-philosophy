import assert from "node:assert/strict";
import test from "node:test";
import { tsImport } from "tsx/esm/api";

const connectionKey = (connection) =>
  `${connection.source}:${connection.kind}:${connection.target}`;

const lineageCount = (lineage) =>
  lineage.upstream.length + lineage.dialogue.length + lineage.downstream.length;

test("thought-level connections contain only explicit, resolvable card endpoints", async () => {
  const {
    allThoughtConnections,
    allThoughts,
    thoughtLevelConnections,
  } = await tsImport("../content/libraries.ts", import.meta.url);
  const { maoThoughts } = await tsImport("../content/mao.ts", import.meta.url);
  const { thoughtConnections } = await tsImport("../content/philosophy.ts", import.meta.url);

  assert.ok(thoughtLevelConnections.length > 0, "the thought-level graph must not be empty");
  assert.equal(
    allThoughtConnections,
    thoughtLevelConnections,
    "the compatibility export must not restore author-level relationships",
  );

  const thoughtIds = new Set(allThoughts.map((thought) => thought.id));
  const maoThoughtIds = new Set(maoThoughts.map((thought) => thought.id));
  const westernAuthorConnectionKeys = new Set(thoughtConnections.map(connectionKey));
  const ids = new Set();

  for (const connection of thoughtLevelConnections) {
    const relation = `${connection.source} -> ${connection.target}`;
    assert.equal(connection.scope, "thought", `${relation} must be thought-scoped`);
    assert.ok(connection.id?.trim(), `${relation} must have a stable id`);
    assert.ok(!ids.has(connection.id), `${connection.id} must be unique`);
    ids.add(connection.id);

    assert.ok(thoughtIds.has(connection.source), `${relation}.source must resolve exactly`);
    assert.ok(thoughtIds.has(connection.target), `${relation}.target must resolve exactly`);
    assert.notEqual(connection.source, connection.target, `${relation} must not be a self-link`);
    assert.ok(
      !westernAuthorConnectionKeys.has(connectionKey(connection)),
      `${relation} must not leak from the Western author-level graph`,
    );

    const touchesMao = maoThoughtIds.has(connection.source) || maoThoughtIds.has(connection.target);
    if (touchesMao) {
      assert.ok(
        maoThoughtIds.has(connection.source) && maoThoughtIds.has(connection.target),
        `${relation} must remain Mao-card to Mao-card`,
      );
    }
  }

  for (const excluded of [
    "marx:reframes:mao-practice",
    "descartes:contrasts:mao-practice",
    "hegel:reframes:mao-contradiction",
    "mao-art:contrasts:arendt",
  ]) {
    assert.ok(!ids.has(excluded), `${excluded} is not a card-level Mao relationship`);
  }
});

test("Western thought-level lineage has visible, card-specific editorial coverage", async () => {
  const { contentLibraries, thoughtLevelConnections } = await tsImport(
    "../content/libraries.ts",
    import.meta.url,
  );
  const { westernThoughtConnections } = await tsImport(
    "../content/westernThoughtConnections.ts",
    import.meta.url,
  );

  const westernIds = new Set(contentLibraries.western.thoughts.map((thought) => thought.id));
  const westernRelations = thoughtLevelConnections.filter(
    (connection) => westernIds.has(connection.source) && westernIds.has(connection.target),
  );
  const coveredCards = new Set(
    westernRelations.flatMap((connection) => [connection.source, connection.target]),
  );

  assert.equal(
    westernRelations.length,
    westernThoughtConnections.length,
    "every Western curated relation must enter the shared thought graph",
  );
  assert.ok(westernRelations.length >= 40, "Western lineage needs meaningful visible density");
  assert.ok(coveredCards.size >= 30, "Western lineage must cover at least 30 exact cards");

  for (const connection of westernRelations) {
    assert.equal(connection.basis, "editorial", `${connection.id} must state its editorial basis`);
    assert.ok(connection.summary.length >= 25, `${connection.id} needs a specific Chinese summary`);
    assert.ok(
      connection.englishSummary.length >= 60,
      `${connection.id} needs a specific English summary`,
    );
  }
});

test("the resolver preserves direction, dialogue, and blocked-card filtering", async () => {
  const { allThoughts, thoughtLevelConnections } = await tsImport(
    "../content/libraries.ts",
    import.meta.url,
  );
  const { resolveThoughtLineage } = await tsImport(
    "../lib/thoughtLineage.ts",
    import.meta.url,
  );

  const thoughtById = new Map(allThoughts.map((thought) => [thought.id, thought]));
  const dialogueKinds = new Set(["dialogues", "resonates", "contrasts"]);
  const directional = thoughtLevelConnections.find(
    (connection) => !dialogueKinds.has(connection.kind),
  );
  const dialogue = thoughtLevelConnections.find((connection) =>
    dialogueKinds.has(connection.kind));

  assert.ok(directional, "the fixture must include a directional relationship");
  assert.ok(dialogue, "the fixture must include a dialogue relationship");

  const sourceLineage = resolveThoughtLineage(
    directional.source,
    thoughtLevelConnections,
    thoughtById,
  );
  assert.ok(
    sourceLineage.downstream.some((entry) => entry.connection.id === directional.id),
    "a directional source must resolve its target downstream",
  );

  const targetLineage = resolveThoughtLineage(
    directional.target,
    thoughtLevelConnections,
    thoughtById,
  );
  assert.ok(
    targetLineage.upstream.some((entry) => entry.connection.id === directional.id),
    "a directional target must resolve its source upstream",
  );

  const dialogueLineage = resolveThoughtLineage(
    dialogue.target,
    thoughtLevelConnections,
    thoughtById,
  );
  assert.ok(
    dialogueLineage.dialogue.some((entry) => entry.connection.id === dialogue.id),
    "a symmetric relationship must resolve in the dialogue group",
  );

  const blockedLineage = resolveThoughtLineage(
    directional.source,
    [directional],
    thoughtById,
    new Set([directional.target]),
  );
  assert.equal(lineageCount(blockedLineage), 0, "blocked related cards must be omitted");
});

test("a non-endpoint card never inherits another card's author relationship", async () => {
  const { allThoughts } = await tsImport("../content/libraries.ts", import.meta.url);
  const { resolveThoughtLineage } = await tsImport(
    "../lib/thoughtLineage.ts",
    import.meta.url,
  );

  const thoughtById = new Map(allThoughts.map((thought) => [thought.id, thought]));
  const endpoint = thoughtById.get("science-galileo-moon");
  const sibling = thoughtById.get("science-galileo-jupiter");
  const target = thoughtById.get("science-newton-rules-causes");

  assert.ok(endpoint && sibling && target, "the regression fixtures must exist");
  assert.equal(endpoint.authorId, sibling.authorId, "fixtures must share one author");

  const connection = {
    id: "regression:exact-card-endpoints",
    source: endpoint.id,
    target: target.id,
    kind: "reframes",
    scope: "thought",
    basis: "editorial",
    summary: "仅用于验证精确端点解析。",
    englishSummary: "Used only to verify exact endpoint resolution.",
  };

  assert.equal(
    resolveThoughtLineage(endpoint.id, [connection], thoughtById).downstream.length,
    1,
    "the explicit endpoint must receive its relationship",
  );
  assert.equal(
    lineageCount(resolveThoughtLineage(sibling.id, [connection], thoughtById)),
    0,
    "another card by the same author must not inherit the relationship",
  );

  const authorScopedConnection = { ...connection, scope: "author" };
  assert.equal(
    lineageCount(resolveThoughtLineage(endpoint.id, [authorScopedConnection], thoughtById)),
    0,
    "the card resolver must reject author-scoped relationships at runtime",
  );
});
