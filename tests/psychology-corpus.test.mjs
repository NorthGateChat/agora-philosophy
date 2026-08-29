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
  const expectedGroupSizes = {
    foundations: 46,
    cognition: 36,
    social: 38,
  };
  for (const { id } of psychologyCollectionOptions) {
    assert.equal(
      psychologyThoughtGroups[id].length,
      expectedGroupSizes[id],
      `${id} must reflect the source-led curation instead of a fixed quota`,
    );
    for (const thought of psychologyThoughtGroups[id]) {
      assert.equal(psychologyCollectionForThought(thought.id), id);
    }
  }
  assert.deepEqual(
    psychologyCollectionOptions.flatMap(({ id }) => psychologyThoughtGroups[id]),
    psychologyThoughts,
  );

  assert.equal(new Set(psychologyThoughts.map(({ id }) => id)).size, 120);
  const authorCounts = new Map();
  for (const thought of psychologyThoughts) {
    authorCounts.set(thought.authorId, (authorCounts.get(thought.authorId) ?? 0) + 1);
  }
  assert.equal(authorCounts.size, 34);
  assert.ok(
    new Set(authorCounts.values()).size > 1,
    "author inventories must reflect source importance instead of five-card quotas",
  );

  const thoughtIds = new Set(psychologyThoughts.map(({ id }) => id));
  for (const removedId of [
    "psychology-cognition-neisser-memory-reconstruction",
    "psychology-cognition-neisser-constructive-activity",
    "psychology-cognition-baddeley-hitch-unitary-store",
    "psychology-cognition-tulving-mental-time-travel",
    "psychology-cognition-tulving-systems-evidence",
    "psychology-social-lewin-unfreeze-change",
    "psychology-social-tajfel-positive-distinctiveness",
    "psychology-social-ainsworth-cultural-observation",
    "psychology-social-piaget-assimilation-accommodation",
    "psychology-social-vygotsky-tools-signs",
  ]) {
    assert.ok(!thoughtIds.has(removedId), `${removedId} must stay merged into its survivor card`);
  }
  for (const addedId of [
    "psychology-foundations-allport-odbert-lexical-traits",
    "psychology-foundations-tupes-christal-recurrent-factors",
    "psychology-foundations-fiske-rating-structure",
    "psychology-foundations-spearman-general-factor",
    "psychology-foundations-cronbach-meehl-construct-network",
    "psychology-foundations-calkins-self-relational",
    "psychology-cognition-beck-cognitive-distortions",
    "psychology-social-harlow-contact-comfort",
    "psychology-social-hazan-shaver-adult-attachment",
    "psychology-social-clark-mills-communal-exchange",
  ]) {
    assert.ok(thoughtIds.has(addedId), `${addedId} must be included in the curated corpus`);
  }

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
