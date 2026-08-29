import assert from "node:assert/strict";
import test from "node:test";
import { tsImport } from "tsx/esm/api";

const hanCharacter = /\p{Script=Han}/u;
const validTopics = new Set([
  "自我",
  "认识",
  "因果",
  "解脱",
  "伦理",
  "辩证",
  "政治",
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

test("the Indian-philosophy library distinguishes verified excerpts from editorial study cards", async () => {
  const {
    indianThoughts,
    indianThoughtConnections,
    indianTopicOptions,
  } = await tsImport("../content/indian.ts", import.meta.url);
  const { allThoughts } = await tsImport("../content/libraries.ts", import.meta.url);
  const { sourceMetadataForThought, verifiedSourcePassages } = await tsImport(
    "../content/sourceMetadata.ts",
    import.meta.url,
  );
  const { resolveThoughtPresentationNature } = await tsImport(
    "../content/thoughtPresentation.ts",
    import.meta.url,
  );

  assert.equal(indianThoughts.length, 109, "India curation must preserve the catalog size");
  assert.equal(
    new Set(indianThoughts.map((thought) => thought.id)).size,
    indianThoughts.length,
    "India ids must be unique",
  );

  const authorCounts = new Map();
  const observedTopics = new Set();
  for (const thought of indianThoughts) {
    assert.match(thought.id, /^indian-/, `${thought.id} must use the indian- namespace`);
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

    assert.ok(validTopics.has(thought.topic), `${thought.id}.topic must be an India axis`);
    const presentationNature = resolveThoughtPresentationNature(thought);
    assert.equal(
      thought.rendering,
      presentationNature === "source-excerpt" ? "short-quote" : "paraphrase",
      `${thought.id} must align its legacy rendering with its presentation nature`,
    );
    if (presentationNature === "source-excerpt") {
      assert.ok(thought.editorialSummary?.trim(), `${thought.id} needs a Chinese reading aid`);
      assert.ok(thought.englishEditorialSummary?.trim(), `${thought.id} needs an English reading aid`);
    }
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

  assert.ok(authorCounts.size >= 20, "India must span early, classical, and modern traditions");
  assert.ok(
    new Set(authorCounts.values()).size > 1,
    "author inventories must reflect source importance instead of an equal quota",
  );

  const configuredTopics = new Set(
    indianTopicOptions
      .filter((topic) => topic.id !== "all")
      .map((topic) => topic.id),
  );
  assert.deepEqual(configuredTopics, validTopics);
  assert.deepEqual(observedTopics, validTopics, "every configured India topic must have content");
  assertUniqueCopy(indianThoughts, "text");
  assertUniqueCopy(indianThoughts, "english");

  const representativeByAuthor = new Map();
  for (const thought of indianThoughts) {
    if (!representativeByAuthor.has(thought.authorId)) {
      representativeByAuthor.set(thought.authorId, thought);
    }
  }
  for (const [authorId, representative] of representativeByAuthor) {
    const metadata = sourceMetadataForThought(representative);
    if (resolveThoughtPresentationNature(representative) === "source-excerpt") {
      assert.match(metadata.provenanceNote, /逐字节选/);
      assert.match(metadata.englishProvenanceNote, /verbatim excerpt/i);
      assert.equal(metadata.verificationStatus, "primary-text-checked");
    } else {
      assert.match(metadata.provenanceNote, /研读性转述/);
      assert.match(metadata.englishProvenanceNote, /editorial study rendering/i);
    }
    assert.equal(metadata.locatorLevel, "passage", `${authorId} must expose a passage locator`);
    assert.ok(
      metadata.referenceLinks?.some((link) => /^https:\/\//.test(link.href)),
      `${authorId} must expose a primary or institutional reference link`,
    );
  }

  const byId = new Map(indianThoughts.map((thought) => [thought.id, thought]));
  for (const removedId of [
    "indian-nagarjuna-motion-relational",
    "indian-aryadeva-attachment-object",
    "indian-aryadeva-emptiness-medicine",
    "indian-candrakirti-consequence-method",
    "indian-asanga-transform-basis",
    "indian-asanga-ethics-training",
    "indian-vasubandhu-nonconceptual-turn",
    "indian-dignaga-two-sources",
    "indian-shankara-that-thou-art",
    "indian-ramanuja-devotion-knowledge",
    "indian-madhva-text-hierarchy",
    "indian-kabir-inner-ritual",
    "indian-kabir-lived-search",
  ]) {
    assert.ok(!byId.has(removedId), `${removedId} must stay merged into its survivor card`);
  }
  for (const addedId of [
    "indian-carvaka-indirect-perception",
    "indian-carvaka-indirect-practical-inference",
    "indian-kautilya-anvikshiki-inquiry",
    "indian-kautilya-subject-welfare",
    "indian-kautilya-counsel-secrecy",
    "indian-guru-nanak-hukam",
    "indian-guru-nanak-truthful-living",
    "indian-guru-nanak-air-water-earth",
    "indian-abhinavagupta-rasa-shared-savor",
    "indian-abhinavagupta-aesthetic-distance",
    "indian-abhinavagupta-recognition-agency",
    "indian-gargi-woven-in-what",
    "indian-gargi-imperishable-boundary",
  ]) {
    assert.ok(byId.has(addedId), `${addedId} must be included in the curated corpus`);
  }

  for (const carvakaId of [
    "indian-carvaka-indirect-perception",
    "indian-carvaka-indirect-practical-inference",
  ]) {
    const thought = byId.get(carvakaId);
    assert.equal(resolveThoughtPresentationNature(thought), "editorial-synthesis");
    assert.match(
      [thought.context, thought.englishContext, ...thought.sourceLocator].join(" "),
      /间接传承|对手|非直接可靠引文|indirect-transmission|opponent|not a directly reliable quotation/i,
      `${carvakaId} must expose its indirect and hostile transmission`,
    );
  }

  const sourceExcerptIds = indianThoughts
    .filter((thought) => resolveThoughtPresentationNature(thought) === "source-excerpt")
    .map((thought) => thought.id)
    .sort();
  const verifiedIndianIds = verifiedSourcePassages
    .filter((passage) => passage.id.startsWith("indian-"))
    .map((passage) => passage.id)
    .sort();
  assert.deepEqual(
    sourceExcerptIds,
    verifiedIndianIds,
    "every reviewed Indian excerpt must stay synchronized with source evidence",
  );
  assert.ok(
    sourceExcerptIds.length >= 12,
    "the accumulated reviewed batches must remain explicitly source-backed",
  );
  assert.equal(byId.get("indian-buddha-kalama")?.work, "《迦罗摩经》");
  assert.equal(
    byId.get("indian-buddha-dependent-arising")?.englishWork,
    "Upon Awakening (3rd) (Udāna 1.3)",
  );
  assert.match(byId.get("indian-aryadeva-senses-not-final")?.sourceLocator?.[0] ?? "", /第十三品/);

  assert.ok(indianThoughtConnections.length >= 20, "India must include an idea network");
  const allThoughtIds = new Set(allThoughts.map((thought) => thought.id));
  const validKinds = new Set([
    "inherits",
    "reframes",
    "challenges",
    "dialogues",
    "resonates",
    "contrasts",
  ]);
  for (const connection of indianThoughtConnections) {
    const relation = `${connection.source}->${connection.target}`;
    assert.ok(allThoughtIds.has(connection.source), `${relation}.source must resolve`);
    assert.ok(allThoughtIds.has(connection.target), `${relation}.target must resolve`);
    assert.ok(validKinds.has(connection.kind), `${relation}.kind must be supported`);
    assert.ok(connection.summary?.trim(), `${relation}.summary must be present`);
    assert.ok(connection.englishSummary?.trim(), `${relation}.englishSummary must be present`);
    assert.doesNotMatch(connection.englishSummary, hanCharacter, `${relation}.englishSummary must be English`);
  }
});
