import assert from "node:assert/strict";
import test from "node:test";
import { tsImport } from "tsx/esm/api";

const hanCharacter = /\p{Script=Han}/u;
const validTopics = new Set([
  "方法",
  "证据",
  "模型",
  "不确定",
  "生命",
  "宇宙",
  "责任",
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

test("the scientific-thought library is a sourced bilingual editorial corpus", async () => {
  const {
    scienceThoughts,
    scienceThoughtConnections,
    scienceTopicOptions,
  } = await tsImport("../content/science.ts", import.meta.url);
  const { allThoughts } = await tsImport("../content/libraries.ts", import.meta.url);
  const { sourceMetadataForThought } = await tsImport(
    "../content/sourceMetadata.ts",
    import.meta.url,
  );
  const { resolveThoughtPresentation } = await tsImport(
    "../content/thoughtPresentation.ts",
    import.meta.url,
  );

  assert.ok(scienceThoughts.length >= 80, "science must launch as a substantial corpus");
  assert.equal(
    new Set(scienceThoughts.map((thought) => thought.id)).size,
    scienceThoughts.length,
    "science ids must be unique",
  );

  const authorCounts = new Map();
  const observedTopics = new Set();
  for (const thought of scienceThoughts) {
    assert.match(thought.id, /^science-/, `${thought.id} must use the science- namespace`);
    assert.ok(thought.authorId?.trim(), `${thought.id}.authorId must be present`);
    authorCounts.set(thought.authorId, (authorCounts.get(thought.authorId) ?? 0) + 1);
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

    assert.ok(validTopics.has(thought.topic), `${thought.id}.topic must be a science axis`);
    const presentation = resolveThoughtPresentation(thought);
    assert.equal(
      thought.rendering,
      presentation.useQuotationMarks ? "short-quote" : "paraphrase",
      `${thought.id}.rendering must follow its resolved presentation nature`,
    );
    assert.equal(thought.sourceLocator?.length, 2, `${thought.id}.sourceLocator must be bilingual`);
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

  assert.ok(authorCounts.size >= 20, "science must span the early-modern, life, and modern sciences");
  assert.ok(
    new Set(authorCounts.values()).size > 1,
    "author inventories must reflect editorial importance instead of an equal quota",
  );

  const configuredTopics = new Set(
    scienceTopicOptions
      .filter((topic) => topic.id !== "all")
      .map((topic) => topic.id),
  );
  assert.deepEqual(configuredTopics, validTopics);
  assert.deepEqual(observedTopics, validTopics, "every configured science topic must have content");
  assertUniqueCopy(scienceThoughts, "text");
  assertUniqueCopy(scienceThoughts, "english");

  const representativeByAuthor = new Map();
  for (const thought of scienceThoughts) {
    if (!representativeByAuthor.has(thought.authorId)) {
      representativeByAuthor.set(thought.authorId, thought);
    }
  }
  for (const [authorId, representative] of representativeByAuthor) {
    const metadata = sourceMetadataForThought(representative);
    const presentation = resolveThoughtPresentation(representative);
    if (presentation.useQuotationMarks) {
      assert.match(metadata.provenanceNote, /逐字节选/);
      assert.match(metadata.englishProvenanceNote, /verbatim excerpt/i);
      assert.doesNotMatch(metadata.provenanceNote, /不是作者逐字引文/);
    } else {
      assert.match(metadata.provenanceNote, /编辑性转述/);
      assert.match(metadata.englishProvenanceNote, /editorial restatement/i);
    }
    assert.equal(metadata.locatorLevel, "passage", `${authorId} must expose a passage locator`);
    assert.ok(
      metadata.referenceLinks?.some((link) => /^https:\/\//.test(link.href)),
      `${authorId} must expose a primary or institutional reference link`,
    );
  }

  const shannonMetadata = sourceMetadataForThought(
    scienceThoughts.find((thought) => thought.authorId === "shannon"),
  );
  assert.equal(
    shannonMetadata.referenceLinks?.[0]?.href,
    "https://doi.org/10.1002/j.1538-7305.1948.tb01338.x",
    "Shannon references must use the stable journal DOI rather than a course mirror",
  );

  assert.ok(scienceThoughtConnections.length >= 15, "science must include an idea network");
  const allThoughtIds = new Set(allThoughts.map((thought) => thought.id));
  const validKinds = new Set([
    "inherits",
    "reframes",
    "challenges",
    "dialogues",
    "resonates",
    "contrasts",
  ]);
  for (const connection of scienceThoughtConnections) {
    const relation = `${connection.source}->${connection.target}`;
    assert.ok(allThoughtIds.has(connection.source), `${relation}.source must resolve`);
    assert.ok(allThoughtIds.has(connection.target), `${relation}.target must resolve`);
    assert.ok(validKinds.has(connection.kind), `${relation}.kind must be supported`);
    assert.ok(connection.summary?.trim(), `${relation}.summary must be present`);
    assert.ok(connection.englishSummary?.trim(), `${relation}.englishSummary must be present`);
    assert.doesNotMatch(connection.englishSummary, hanCharacter, `${relation}.englishSummary must be English`);
  }
});
