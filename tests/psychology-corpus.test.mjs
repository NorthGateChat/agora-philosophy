import assert from "node:assert/strict";
import test from "node:test";
import { tsImport } from "tsx/esm/api";

const hanCharacter = /\p{Script=Han}/u;
const validTopics = new Set([
  "感知",
  "记忆",
  "学习",
  "决策",
  "情绪",
  "动机",
  "人格",
  "自我",
  "关系",
  "群体",
  "发展",
  "行为",
]);

const requiredFields = [
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

test("the psychology library is a sourced bilingual 120-card corpus", async () => {
  const {
    psychologyCollectionForThought,
    psychologyCollectionOptions,
    psychologyThoughtGroups,
    psychologyThoughts,
  } = await tsImport("../content/psychology.ts", import.meta.url);
  const {
    allThoughts,
    contentLibraries,
    contentLibraryForThought,
    contentLibraryIds,
  } = await tsImport("../content/libraries.ts", import.meta.url);
  const { resolveThoughtPresentation } = await tsImport(
    "../content/thoughtPresentation.ts",
    import.meta.url,
  );

  assert.equal(psychologyThoughts.length, 120);
  assert.deepEqual(
    psychologyCollectionOptions.map(({ id }) => id),
    ["foundations", "cognition", "social"],
  );
  for (const { id } of psychologyCollectionOptions) {
    assert.equal(psychologyThoughtGroups[id].length, 40, `${id} must contain 40 cards`);
    for (const thought of psychologyThoughtGroups[id]) {
      assert.equal(psychologyCollectionForThought(thought.id), id);
    }
  }
  assert.deepEqual(
    psychologyCollectionOptions.flatMap(({ id }) => psychologyThoughtGroups[id]),
    psychologyThoughts,
  );

  assert.equal(new Set(psychologyThoughts.map(({ id }) => id)).size, 120);
  const observedTopics = new Set();
  for (const thought of psychologyThoughts) {
    assert.match(thought.id, /^psychology-/);
    assert.ok(thought.authorId?.trim(), `${thought.id}.authorId must be present`);
    assert.ok(validTopics.has(thought.topic), `${thought.id}.topic must be a psychology axis`);
    observedTopics.add(thought.topic);
    const presentation = resolveThoughtPresentation(thought);
    assert.equal(
      thought.rendering,
      presentation.useQuotationMarks ? "short-quote" : "paraphrase",
      `${thought.id}.rendering must follow its resolved presentation nature`,
    );

    for (const field of requiredFields) {
      assert.ok(thought[field]?.trim(), `${thought.id}.${field} must be present`);
    }
    for (const field of englishFields) {
      assert.doesNotMatch(thought[field], hanCharacter, `${thought.id}.${field} contains Chinese`);
    }

    assert.equal(thought.sourceLocator?.length, 2, `${thought.id}.sourceLocator must be bilingual`);
    assert.ok(thought.sourceLocator.every((part) => part.trim()));
    assert.doesNotMatch(thought.sourceLocator[1], hanCharacter);
    assert.equal(contentLibraryForThought(thought.id), "psychology");
  }

  assert.deepEqual(observedTopics, validTopics);
  assertUniqueCopy(psychologyThoughts, "text");
  assertUniqueCopy(psychologyThoughts, "english");

  assert.ok(contentLibraryIds.includes("psychology"));
  assert.deepEqual(contentLibraries.psychology.thoughts, psychologyThoughts);
  const sharedIds = new Set(allThoughts.map(({ id }) => id));
  for (const thought of psychologyThoughts) {
    assert.ok(sharedIds.has(thought.id), `${thought.id} must be included in allThoughts`);
  }
});
