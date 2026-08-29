import assert from "node:assert/strict";
import test from "node:test";
import { tsImport } from "tsx/esm/api";

const hanCharacter = /\p{Script=Han}/u;
const validTopics = new Set([
  "市场",
  "制度",
  "增长",
  "货币",
  "行为",
  "分配",
  "投资",
]);
const bilingualFields = [
  "name",
  "englishName",
  "life",
  "englishLife",
  "school",
  "englishSchool",
  "text",
  "english",
  "work",
  "englishWork",
  "reflection",
  "englishReflection",
  "question",
  "englishQuestion",
];
const englishFields = [
  "englishName",
  "englishLife",
  "englishSchool",
  "english",
  "englishWork",
  "englishReflection",
  "englishQuestion",
];

function normalizeCopy(value) {
  return value.toLocaleLowerCase("en").replace(/[\p{P}\p{S}\s]+/gu, "");
}

function assertUniqueCopy(thoughts, field) {
  const seen = new Map();
  for (const thought of thoughts) {
    const normalized = normalizeCopy(thought[field]);
    const priorId = seen.get(normalized);
    assert.equal(priorId, undefined, `${thought.id}.${field} duplicates ${priorId}`);
    seen.set(normalized, thought.id);
  }
}

test("the economic-thought library is a substantial sourced bilingual corpus", async () => {
  const {
    economicsCollectionForThought,
    economicsCollectionOptions,
    economicsThoughtGroups,
    economicsThoughts,
    economicsThoughtConnections,
    economicsTopicOptions,
    loadCompleteEconomicsCatalog,
  } = await tsImport("../content/economics.ts", import.meta.url);
  const {
    allThoughts,
    contentLibraries,
    contentLibraryForThought,
  } = await tsImport("../content/libraries.ts", import.meta.url);
  const { resolveThoughtPresentation } = await tsImport(
    "../content/thoughtPresentation.ts",
    import.meta.url,
  );
  const { retiredEconomicsThoughtIds } = await tsImport(
    "../content/economicsCuration2026.ts",
    import.meta.url,
  );

  assert.ok(
    economicsThoughts.length >= 80 && economicsThoughts.length < 100,
    "the synchronous economics entry must remain a lightweight but substantial core",
  );
  assert.equal(economicsCollectionOptions.length, 3);
  assert.deepEqual(
    economicsCollectionOptions.map(({ id }) => id),
    ["principles", "modern", "investment"],
    "economics study ranges must retain their intentional order",
  );
  assert.deepEqual(
    economicsCollectionOptions.flatMap(({ id }) => economicsThoughtGroups[id]),
    economicsThoughts,
    "ordered synchronous study ranges must flatten into the lightweight core",
  );
  for (const { id } of economicsCollectionOptions) {
    for (const thought of economicsThoughtGroups[id]) {
      assert.equal(
        economicsCollectionForThought(thought.id),
        id,
        `${thought.id} must map back to its economics study range`,
      );
    }
  }

  const completeCatalog = await loadCompleteEconomicsCatalog();
  const completeThoughts = completeCatalog.thoughts;

  assert.ok(
    completeThoughts.length >= 280,
    "semantic compression must retain a substantial on-demand economics catalog",
  );
  for (const { id } of economicsCollectionOptions) {
    assert.ok(
      completeCatalog.thoughtGroups[id].length >= 90,
      `${id} must remain a substantial study range after semantic compression`,
    );
  }
  assert.deepEqual(
    economicsCollectionOptions.flatMap(({ id }) => completeCatalog.thoughtGroups[id]),
    completeThoughts,
    "ordered complete study ranges must flatten into the complete library",
  );
  for (const { id } of economicsCollectionOptions) {
    for (const thought of completeCatalog.thoughtGroups[id]) {
      assert.equal(
        completeCatalog.collectionForThought(thought.id),
        id,
        `${thought.id} must map back to its complete economics study range`,
      );
    }
  }
  assert.equal(
    new Set(completeThoughts.map((thought) => thought.id)).size,
    completeThoughts.length,
    "economics ids must be unique",
  );
  for (const retiredId of retiredEconomicsThoughtIds) {
    assert.equal(
      completeThoughts.some((thought) => thought.id === retiredId),
      false,
      `${retiredId} must remain retired rather than re-entering through a lazy expansion`,
    );
  }

  const observedTopics = new Set();
  for (const thought of completeThoughts) {
    assert.match(
      thought.id,
      /^economics-/,
      `${thought.id} must use the economics- namespace`,
    );
    assert.ok(thought.authorId?.trim(), `${thought.id}.authorId must be present`);
    observedTopics.add(thought.topic);

    for (const field of bilingualFields) {
      assert.ok(thought[field]?.trim(), `${thought.id}.${field} must be present`);
    }
    for (const field of englishFields) {
      assert.doesNotMatch(
        thought[field],
        hanCharacter,
        `${thought.id}.${field} must not fall back to Chinese`,
      );
    }

    assert.ok(validTopics.has(thought.topic), `${thought.id}.topic must be an economics axis`);
    const presentation = resolveThoughtPresentation(thought);
    assert.equal(
      thought.rendering,
      presentation.useQuotationMarks ? "short-quote" : "paraphrase",
      `${thought.id}.rendering must follow its resolved presentation nature`,
    );
    assert.equal(
      thought.sourceLocator?.length,
      2,
      `${thought.id}.sourceLocator must be bilingual`,
    );
    assert.ok(
      thought.sourceLocator.every((part) => part.trim()),
      `${thought.id}.sourceLocator must not contain empty values`,
    );
    assert.doesNotMatch(
      thought.sourceLocator[1],
      hanCharacter,
      `${thought.id}.sourceLocator English value must not contain Chinese`,
    );
  }

  const configuredTopics = new Set(
    economicsTopicOptions
      .filter((topic) => topic.id !== "all")
      .map((topic) => topic.id),
  );
  assert.deepEqual(configuredTopics, validTopics);
  assert.deepEqual(
    observedTopics,
    validTopics,
    "every configured economics topic must have content",
  );
  assertUniqueCopy(completeThoughts, "text");
  assertUniqueCopy(completeThoughts, "english");

  // The shared synchronous library must stay light, while prefix routing still
  // recognizes cards that arrive later from the on-demand economics catalog.
  assert.equal(contentLibraries.economics.thoughts.length, economicsThoughts.length);
  const allThoughtIds = new Set(allThoughts.map((thought) => thought.id));
  const synchronousEconomicsIds = allThoughts
    .filter((thought) => thought.id.startsWith("economics-"))
    .map((thought) => thought.id);
  assert.deepEqual(
    synchronousEconomicsIds,
    economicsThoughts.map((thought) => thought.id),
    "allThoughts must include the lightweight economics core without eagerly loading expansions",
  );
  for (const thought of economicsThoughts) {
    assert.equal(contentLibraryForThought(thought.id), "economics");
    assert.ok(allThoughtIds.has(thought.id), `${thought.id} must be included in allThoughts`);
  }
  const coreThoughtIds = new Set(economicsThoughts.map((thought) => thought.id));
  const expansionThoughts = completeThoughts.filter(
    (thought) => !coreThoughtIds.has(thought.id),
  );
  assert.equal(
    expansionThoughts.length,
    completeThoughts.length - economicsThoughts.length,
    "the lazy expansion must contain exactly the complete catalog beyond its synchronous core",
  );
  for (const thought of expansionThoughts) {
    assert.equal(
      contentLibraryForThought(thought.id),
      "economics",
      `${thought.id} must route to economics before it is present in allThoughts`,
    );
    assert.equal(
      allThoughtIds.has(thought.id),
      false,
      `${thought.id} must remain outside the synchronous allThoughts entry`,
    );
  }

  assert.ok(
    economicsThoughtConnections.length >= validTopics.size,
    "economics must include an idea network spanning its main axes",
  );
  const validKinds = new Set([
    "inherits",
    "reframes",
    "challenges",
    "dialogues",
    "resonates",
    "contrasts",
  ]);
  for (const connection of economicsThoughtConnections) {
    const relation = `${connection.source}->${connection.target}`;
    assert.ok(allThoughtIds.has(connection.source), `${relation}.source must resolve`);
    assert.ok(allThoughtIds.has(connection.target), `${relation}.target must resolve`);
    assert.ok(validKinds.has(connection.kind), `${relation}.kind must be supported`);
    assert.ok(connection.summary?.trim(), `${relation}.summary must be present`);
    assert.ok(connection.englishSummary?.trim(), `${relation}.englishSummary must be present`);
    assert.doesNotMatch(
      connection.englishSummary,
      hanCharacter,
      `${relation}.englishSummary must be English`,
    );
  }
});
