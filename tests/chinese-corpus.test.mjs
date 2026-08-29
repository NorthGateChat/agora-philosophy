import assert from "node:assert/strict";
import test from "node:test";
import { tsImport } from "tsx/esm/api";

const hanCharacter = /\p{Script=Han}/u;
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

test("the Chinese philosophy library is a sourced bilingual corpus with deliberate coverage", async () => {
  const {
    chineseThoughts,
    chineseThoughtConnections,
    chineseTopicOptions,
  } = await tsImport("../content/chinese.ts", import.meta.url);
  const { allThoughts } = await tsImport("../content/libraries.ts", import.meta.url);
  const { sourceMetadataForThought } = await tsImport(
    "../content/sourceMetadata.ts",
    import.meta.url,
  );

  assert.ok(chineseThoughts.length >= 101, "the expanded Chinese philosophy library must contain at least 101 cards");
  assert.equal(
    new Set(chineseThoughts.map((thought) => thought.id)).size,
    chineseThoughts.length,
    "Chinese philosophy ids must be unique",
  );

  const authorCounts = new Map();
  const observedTopics = new Set();
  for (const thought of chineseThoughts) {
    assert.match(thought.id, /^chinese-/, `${thought.id} must use the chinese- namespace`);
    assert.ok(thought.authorId?.trim(), `${thought.id}.authorId must be present`);
    authorCounts.set(thought.authorId, (authorCounts.get(thought.authorId) ?? 0) + 1);
    observedTopics.add(thought.topic);

    for (const field of bilingualFields) {
      assert.ok(thought[field]?.trim(), `${thought.id}.${field} must be present`);
    }
    assert.ok(thought.plainText?.trim(), `${thought.id}.plainText must be present`);
    for (const field of englishFields) {
      assert.doesNotMatch(
        thought[field],
        hanCharacter,
        `${thought.id}.${field} must not fall back to Chinese`,
      );
    }

    assert.equal(thought.rendering, "short-quote", `${thought.id} must declare a source passage`);
    assert.notEqual(
      normalizeCopy(thought.text),
      normalizeCopy(thought.plainText),
      `${thought.id}.text must remain distinct from its plain-language reading`,
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

  assert.equal(authorCounts.size, 27, "the expanded library must cover 27 Chinese thinkers");
  assert.ok(
    new Set(authorCounts.values()).size > 1,
    "author inventories must reflect editorial importance instead of an equal quota",
  );

  const requiredExpansionAuthors = new Set([
    "dong_zhongshu",
    "wang_chong",
    "sengzhao",
    "fazang",
    "huineng",
    "zhou_dunyi",
    "zhang_zai",
    "cheng_hao",
    "cheng_yi",
    "li_zhi",
    "wang_fuzhi",
    "huang_zongxi",
    "gu_yanwu",
    "dai_zhen",
  ]);
  for (const authorId of requiredExpansionAuthors) {
    assert.ok(authorCounts.has(authorId), `the expansion must include ${authorId}`);

    const representative = chineseThoughts.find((thought) => thought.authorId === authorId);
    const metadata = sourceMetadataForThought(representative);
    assert.ok(
      metadata.referenceLinks?.some((link) => !link.href.endsWith("/introduction")),
      `${authorId} must expose a primary-text reference link`,
    );
  }

  const configuredTopics = new Set(
    chineseTopicOptions
      .filter((topic) => topic.id !== "all")
      .map((topic) => topic.id),
  );
  assert.equal(configuredTopics.size, 8, "the Chinese library must expose eight topic axes");
  assert.deepEqual(observedTopics, configuredTopics, "every configured Chinese topic must have content");

  assertUniqueCopy(chineseThoughts, "text");
  assertUniqueCopy(chineseThoughts, "plainText");
  assertUniqueCopy(chineseThoughts, "english");

  const thoughtById = new Map(chineseThoughts.map((thought) => [thought.id, thought]));
  assert.equal(thoughtById.get("chinese-confucius-learning-practice")?.text, "学而时习之，不亦说乎？");
  assert.equal(thoughtById.get("chinese-mencius-critical-reading")?.text, "尽信《书》，则不如无《书》。");
  assert.match(thoughtById.get("chinese-laozi-water")?.text ?? "", /^上善若水。/);
  assert.equal(
    thoughtById.get("chinese-han-feizi-changing-methods")?.text,
    "是以圣人不期修古，不法常可，论世之事，因为之备。",
  );
  assert.match(
    thoughtById.get("chinese-wang-yangming-knowledge-action")?.text ?? "",
    /知是行之始，行是知之成。$/,
  );
  assert.equal(
    thoughtById.get("chinese-dong-zhongshu-ren-yi-directions")?.text,
    "仁之法在爱人，不在爱我。义之法在正我，不在正人。我不自正，虽能正人，弗予为义。",
  );
  assert.equal(
    thoughtById.get("chinese-wang-chong-facts-and-evidence")?.text,
    "凡论事者，违实不引效验，则虽甘义繁说，众不见信。",
  );
  assert.equal(
    thoughtById.get("chinese-sengzhao-dependent-and-empty")?.text,
    "夫有若真有，有自常有，岂待缘而后有哉？……若有不自有，待缘而后有者，故知有非真有。",
  );
  assert.equal(
    thoughtById.get("chinese-fazang-golden-lion-dependent-arising")?.text,
    "谓金无自性，随工巧匠缘，……遂有师子相起。……起但是缘，故名缘起。",
  );
  assert.equal(
    thoughtById.get("chinese-huineng-meditation-and-stability")?.text,
    "定慧一体，不是二；定是慧体，慧是定用，即慧之时定在慧，即定之时慧在定。",
  );

  const dongMetadata = sourceMetadataForThought(
    thoughtById.get("chinese-dong-zhongshu-ren-yi-directions"),
  );
  assert.match(dongMetadata.provenanceNote, /传统归于董仲舒.*归属.*争议/);
  assert.match(dongMetadata.englishProvenanceNote, /traditionally attributed.*disputed/i);

  const fazangMetadata = sourceMetadataForThought(
    thoughtById.get("chinese-fazang-golden-lion-dependent-arising"),
  );
  assert.match(fazangMetadata.provenanceNote, /T1881.*法藏.*宋代净源注释/);
  assert.match(fazangMetadata.englishProvenanceNote, /T1881.*Fazang.*Jingyuan/i);

  const huinengMetadata = sourceMetadataForThought(
    thoughtById.get("chinese-huineng-meditation-and-stability"),
  );
  assert.match(huinengMetadata.provenanceNote, /敦煌写本.*后世通行本/);
  assert.match(huinengMetadata.englishProvenanceNote, /Dunhuang.*received recensions/i);

  assert.ok(chineseThoughtConnections.length > 0, "the Chinese library must include an idea network");
  const allThoughtIds = new Set(allThoughts.map((thought) => thought.id));
  const validKinds = new Set([
    "inherits",
    "reframes",
    "challenges",
    "dialogues",
    "resonates",
    "contrasts",
  ]);
  for (const connection of chineseThoughtConnections) {
    const relation = `${connection.source}->${connection.target}`;
    assert.ok(allThoughtIds.has(connection.source), `${relation}.source must resolve to a public thought`);
    assert.ok(allThoughtIds.has(connection.target), `${relation}.target must resolve to a public thought`);
    assert.ok(validKinds.has(connection.kind), `${relation}.kind must be supported`);
    assert.ok(connection.summary?.trim(), `${relation}.summary must be present`);
    assert.ok(connection.englishSummary?.trim(), `${relation}.englishSummary must be present`);
    assert.doesNotMatch(
      connection.englishSummary,
      hanCharacter,
      `${relation}.englishSummary must not fall back to Chinese`,
    );
  }
});

test("the public catalog registers every library without reintroducing a fixed total", async () => {
  const {
    allThoughts,
    contentLibraries,
    contentLibraryForThought,
    contentLibraryIds,
  } = await tsImport("../content/libraries.ts", import.meta.url);

  assert.deepEqual([...contentLibraryIds], Object.keys(contentLibraries));
  assert.ok(contentLibraryIds.includes("economics"), "the economics library must be public");
  assert.ok(contentLibraries.western.thoughts.length >= 581);
  assert.ok(contentLibraries.chinese.thoughts.length >= 101);
  assert.ok(contentLibraries.mao.thoughts.length >= 128);
  assert.ok(contentLibraries.science.thoughts.length >= 80);
  assert.ok(contentLibraries.indian.thoughts.length >= 100);
  for (const libraryId of contentLibraryIds) {
    assert.ok(
      contentLibraries[libraryId].thoughts.length > 0,
      `${libraryId} must contribute thoughts to the public catalog`,
    );
  }
  assert.equal(
    allThoughts.length,
    contentLibraryIds.reduce(
      (total, libraryId) => total + contentLibraries[libraryId].thoughts.length,
      0,
    ),
    "the public catalog must be assembled from all registered libraries",
  );
  assert.equal(
    new Set(allThoughts.map((thought) => thought.id)).size,
    allThoughts.length,
    "thought ids must be globally unique across all registered libraries",
  );

  for (const libraryId of contentLibraryIds) {
    for (const thought of contentLibraries[libraryId].thoughts) {
      assert.equal(
        contentLibraryForThought(thought.id),
        libraryId,
        `${thought.id} must resolve to the ${libraryId} library`,
      );
    }
  }
});
