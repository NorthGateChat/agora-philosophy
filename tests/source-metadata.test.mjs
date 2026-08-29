import assert from "node:assert/strict";
import test from "node:test";
import { tsImport } from "tsx/esm/api";

const reviewStatuses = new Set([
  "passage-located",
  "work-located",
  "under-review",
]);
const textNatures = new Set([
  "source-excerpt",
  "editorial-restatement",
]);
const translationNatures = new Set([
  "agora-study-translation",
  "reference-informed-agora-rendering",
  "agora-bilingual-restatement",
]);

async function loadCompletePublicThoughts() {
  const { allThoughts } = await tsImport("../content/libraries.ts", import.meta.url);
  const { loadCompleteEconomicsCatalog } = await tsImport(
    "../content/economics.ts",
    import.meta.url,
  );
  const completeEconomics = await loadCompleteEconomicsCatalog();
  return [
    ...allThoughts.filter((thought) => !thought.id.startsWith("economics-")),
    ...completeEconomics.thoughts,
  ];
}

function idsFromVerifiedSourceRegistry(registry) {
  if (registry instanceof Map || registry instanceof Set) {
    return [...registry.keys()];
  }
  if (Array.isArray(registry)) {
    return registry.map((entry) => typeof entry === "string" ? entry : entry.id);
  }
  return Object.keys(registry);
}

test("every public thought receives conservative source-credibility metadata and bilingual labels", async () => {
  const completeThoughts = await loadCompletePublicThoughts();
  const {
    sourceCredibilityLabelsFor,
    sourceMetadataForThought,
    sourceReviewStatusLabels,
    sourceTextNatureLabels,
    sourceTranslationNatureLabels,
    sourceVerificationStatusLabels,
    verifiedSourcePassages,
  } = await tsImport("../content/sourceMetadata.ts", import.meta.url);
  const { resolveThoughtPresentationNature } = await tsImport(
    "../content/thoughtPresentation.ts",
    import.meta.url,
  );

  assert.equal(completeThoughts.length, 1441, "the curated public catalog must stay fully covered");
  assert.equal(
    new Set(completeThoughts.map((thought) => thought.id)).size,
    completeThoughts.length,
    "the complete public catalog must not contain duplicate ids",
  );
  const verifiedSourceIds = new Set(
    idsFromVerifiedSourceRegistry(verifiedSourcePassages),
  );
  assert.ok(
    verifiedSourceIds.size > 0,
    "the primary-text verification registry must retain checked passages",
  );

  for (const thought of completeThoughts) {
    const metadata = sourceMetadataForThought(thought);
    const presentationNature = resolveThoughtPresentationNature(thought);
    const isPrimaryTextChecked = verifiedSourceIds.has(thought.id);
    assert.ok(reviewStatuses.has(metadata.reviewStatus), `${thought.id}.reviewStatus must be supported`);
    assert.ok(textNatures.has(metadata.textNature), `${thought.id}.textNature must be supported`);
    assert.ok(
      translationNatures.has(metadata.translationNature),
      `${thought.id}.translationNature must be supported`,
    );
    assert.equal(
      metadata.verificationStatus,
      isPrimaryTextChecked ? "primary-text-checked" : "editorial-trace-only",
      `${thought.id}.verificationStatus must be governed by the verified-source registry`,
    );
    assert.equal(
      metadata.presentationNature,
      presentationNature,
      `${thought.id} metadata must preserve the shared presentation resolver result`,
    );

    assert.equal(
      metadata.textNature,
      presentationNature === "source-excerpt"
        ? "source-excerpt"
        : "editorial-restatement",
      `${thought.id} must not present an editorial restatement as a source excerpt`,
    );
    assert.equal(
      presentationNature === "source-excerpt",
      isPrimaryTextChecked,
      `${thought.id} must not present a built-in source excerpt without verified-source evidence`,
    );
    if (isPrimaryTextChecked) {
      assert.equal(
        presentationNature,
        "source-excerpt",
        `${thought.id} cannot be primary-text checked while presented as editorial synthesis`,
      );
      assert.ok(
        metadata.referenceLinks?.some(({ href }) => /^https:\/\//.test(href)),
        `${thought.id} must expose an HTTPS route to the checked primary text`,
      );
      assert.ok(metadata.useBasis?.trim(), `${thought.id} must expose a Chinese use basis`);
      assert.ok(metadata.englishUseBasis?.trim(), `${thought.id} must expose an English use basis`);
    }
    if (metadata.reviewStatus === "passage-located") {
      assert.equal(metadata.locatorLevel, "passage", `${thought.id} must have a passage locator`);
    }
    if (metadata.reviewStatus === "work-located") {
      assert.equal(metadata.locatorLevel, "work", `${thought.id} must only claim work-level location`);
    }

    const labels = sourceCredibilityLabelsFor(metadata);
    assert.equal(labels.reviewStatus, sourceReviewStatusLabels[metadata.reviewStatus]);
    assert.equal(labels.textNature, sourceTextNatureLabels[metadata.textNature]);
    assert.equal(labels.translationNature, sourceTranslationNatureLabels[metadata.translationNature]);
    assert.equal(labels.verificationStatus, sourceVerificationStatusLabels[metadata.verificationStatus]);
    for (const label of [
      labels.reviewStatus,
      labels.textNature,
      labels.translationNature,
      labels.verificationStatus,
      labels.scopeNote,
    ]) {
      assert.ok(label.zh.trim(), `${thought.id} must expose a Chinese credibility label`);
      assert.ok(label.en.trim(), `${thought.id} must expose an English credibility label`);
    }
  }
});

test("the verified source registry, lookup, and complete public catalog stay in sync", async () => {
  const completeThoughts = await loadCompletePublicThoughts();
  const { verifiedSourcePassages, verifiedSourcePassagesById } = await tsImport(
    "../content/sourceMetadata.ts",
    import.meta.url,
  );
  const registryIds = idsFromVerifiedSourceRegistry(verifiedSourcePassages);
  const lookupIds = Object.keys(verifiedSourcePassagesById);
  const catalogIdCounts = new Map();

  for (const thought of completeThoughts) {
    catalogIdCounts.set(thought.id, (catalogIdCounts.get(thought.id) ?? 0) + 1);
  }

  assert.ok(registryIds.length > 0, "the verified source registry must not be empty");
  assert.equal(
    new Set(registryIds).size,
    registryIds.length,
    "the verified source registry must not contain duplicate ids",
  );
  assert.deepEqual(
    [...lookupIds].sort(),
    [...registryIds].sort(),
    "the verified source lookup must be derived from the complete registry",
  );
  const supportedUseBasisKinds = new Set([
    "public-domain",
    "open-license",
    "quotation-exception",
  ]);
  for (const passage of verifiedSourcePassages) {
    assert.ok(
      supportedUseBasisKinds.has(passage.useBasis?.kind),
      `${passage.id} must declare a supported use basis`,
    );
    assert.ok(passage.useBasis.zh.trim(), `${passage.id} needs a Chinese use-basis note`);
    assert.ok(passage.useBasis.en.trim(), `${passage.id} needs an English use-basis note`);
  }
  for (const id of registryIds) {
    assert.equal(
      catalogIdCounts.get(id),
      1,
      `${id} must identify exactly one thought in the complete public catalog`,
    );
  }
});

test("verified excerpts declare marked omissions in their passage locators", async () => {
  const completeThoughts = await loadCompletePublicThoughts();
  const { verifiedSourcePassages } = await tsImport(
    "../content/sourceMetadata.ts",
    import.meta.url,
  );
  const thoughtById = new Map(completeThoughts.map((thought) => [thought.id, thought]));
  const knownUnnotedOmissions = new Set();
  const observedUnnotedOmissions = new Set();

  for (const evidence of verifiedSourcePassages) {
    const thought = thoughtById.get(evidence.id);
    assert.ok(thought, `${evidence.id} must resolve to a public thought`);
    const originalField = thought[evidence.originalField];
    const hasEllipsis = /(?:…|\.{3})/u.test(originalField);
    const locatorNotesOmission = /(?:省略|删节|ellipsis|omission)/iu.test(
      (thought.sourceLocator ?? []).join(" "),
    );

    if (locatorNotesOmission) {
      assert.ok(
        hasEllipsis,
        `${evidence.id} locator declares an omission but ${evidence.originalField} has no ellipsis`,
      );
    } else if (hasEllipsis) {
      observedUnnotedOmissions.add(evidence.id);
    }
  }

  assert.deepEqual(
    [...observedUnnotedOmissions].sort(),
    [...knownUnnotedOmissions].sort(),
    "new source excerpts with marked omissions must declare them in the passage locator",
  );
});

test("representative cards distinguish excerpts, restatements, and locator precision", async () => {
  const { allThoughts } = await tsImport("../content/libraries.ts", import.meta.url);
  const { sourceMetadataForThought } = await tsImport(
    "../content/sourceMetadata.ts",
    import.meta.url,
  );
  const thoughtById = new Map(allThoughts.map((thought) => [thought.id, thought]));

  const expected = {
    "chinese-confucius-learning-practice": [
      "passage-located",
      "source-excerpt",
      "agora-study-translation",
    ],
    "mao-investigation": [
      "passage-located",
      "source-excerpt",
      "reference-informed-agora-rendering",
    ],
    "mao-mass-line": [
      "passage-located",
      "source-excerpt",
      "reference-informed-agora-rendering",
    ],
    "mao-practice": [
      "passage-located",
      "source-excerpt",
      "reference-informed-agora-rendering",
    ],
    "science-shannon-entropy": [
      "passage-located",
      "source-excerpt",
      "agora-study-translation",
    ],
    "indian-buddha-dependent-arising": [
      "passage-located",
      "source-excerpt",
      "agora-study-translation",
    ],
    socrates: [
      "passage-located",
      "source-excerpt",
      "agora-study-translation",
    ],
    locke: [
      "passage-located",
      "source-excerpt",
      "agora-study-translation",
    ],
    "psychology-foundations-allport-odbert-lexical-traits": [
      "under-review",
      "editorial-restatement",
      "agora-bilingual-restatement",
    ],
  };

  for (const [id, [reviewStatus, textNature, translationNature]] of Object.entries(expected)) {
    const thought = thoughtById.get(id);
    assert.ok(thought, `${id} must remain in the public catalog`);
    const metadata = sourceMetadataForThought(thought);
    assert.deepEqual(
      [metadata.reviewStatus, metadata.textNature, metadata.translationNature],
      [reviewStatus, textNature, translationNature],
      `${id} credibility metadata changed unexpectedly`,
    );
  }

  const aschMetadata = sourceMetadataForThought(
    thoughtById.get("psychology-social-asch-order"),
  );
  assert.match(aschMetadata.useBasis, /美国.*公共领域/);
  assert.match(aschMetadata.englishUseBasis, /public domain in the United States/i);
});

test("a locator or reference route never upgrades unknown source information to verified", async () => {
  const { allThoughts } = await tsImport("../content/libraries.ts", import.meta.url);
  const {
    sourceCredibilityLabelsFor,
    sourceLocationScopeNote,
    sourceMetadataForThought,
  } = await tsImport("../content/sourceMetadata.ts", import.meta.url);

  const syntheticThought = {
    ...allThoughts[0],
    id: "unknown-source-test",
    authorId: "unknown-source-author",
    work: "待考著作",
    englishWork: "Work under review",
    sourceLocator: ["第一章", "Chapter 1"],
    rendering: "short-quote",
  };
  const metadata = sourceMetadataForThought(syntheticThought);
  assert.equal(metadata.locatorLevel, "passage");
  assert.equal(metadata.reviewStatus, "under-review");
  assert.equal(metadata.textNature, "source-excerpt");

  const labels = sourceCredibilityLabelsFor(metadata);
  assert.match(labels.reviewStatus.zh, /待复核/);
  assert.match(labels.reviewStatus.en, /under review/i);
  assert.match(sourceLocationScopeNote.zh, /不代表.*权威/);
  assert.match(sourceLocationScopeNote.en, /does not claim.*authoritative/i);

  const displayedCopy = [
    metadata.referenceEdition,
    metadata.englishReferenceEdition,
    metadata.provenanceNote,
    metadata.englishProvenanceNote,
    labels.reviewStatus.zh,
    labels.reviewStatus.en,
    labels.textNature.zh,
    labels.textNature.en,
    labels.translationNature.zh,
    labels.translationNature.en,
    labels.verificationStatus.zh,
    labels.verificationStatus.en,
  ].filter(Boolean).join(" ");
  assert.doesNotMatch(displayedCopy, /已核验|已经核验|verified source|authoritatively verified/i);
});

test("work-specific science cards route to the work actually under review", async () => {
  const completeThoughts = await loadCompletePublicThoughts();
  const thoughtById = new Map(completeThoughts.map((thought) => [thought.id, thought]));
  const { sourceMetadataForThought } = await tsImport(
    "../content/sourceMetadata.ts",
    import.meta.url,
  );
  const expectedRoutes = {
    "science-feynman-scientific-integrity": /CargoCult\.htm$/,
    "science-feynman-value-of-doubt": /calteches\.library\.caltech\.edu\/1575\/$/,
    "science-einstein-light-quanta": /10\.1002\/andp\.19053220607$/,
    "science-schrodinger-entangled-whole": /10\.1007\/BF01491987$/,
    "science-schrodinger-cat-boundary": /10\.1007\/BF01491891$/,
  };

  for (const [id, routePattern] of Object.entries(expectedRoutes)) {
    const thought = thoughtById.get(id);
    assert.ok(thought, `${id} must remain in the public catalog`);
    const hrefs = sourceMetadataForThought(thought).referenceLinks.map(({ href }) => href);
    assert.ok(
      hrefs.some((href) => routePattern.test(href)),
      `${id} must link to its own cited work instead of an author-level fallback`,
    );
  }
});
