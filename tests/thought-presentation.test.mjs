import assert from "node:assert/strict";
import test from "node:test";
import { tsImport } from "tsx/esm/api";

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

test("all 1441 public thoughts resolve to one consistent presentation contract", async () => {
  const completeThoughts = await loadCompletePublicThoughts();
  const {
    attributionMode,
    resolveThoughtPresentation,
    resolveThoughtPresentationNature,
    thoughtPresentationNatureLabels,
    useQuotationMarks,
  } = await tsImport("../content/thoughtPresentation.ts", import.meta.url);

  assert.equal(completeThoughts.length, 1441, "the curated economics library must replace its synchronous subset");
  assert.equal(
    new Set(completeThoughts.map((thought) => thought.id)).size,
    completeThoughts.length,
    "every public thought id must be unique",
  );

  for (const thought of completeThoughts) {
    const expectedNature = thought.presentationNature
      ?? (thought.customKnowledge
        ? thought.customKnowledge.cardType !== "quote"
          ? "editorial-synthesis"
          : thought.customKnowledge.sourceStatus === "verified"
            ? "source-excerpt"
            : "unverified-excerpt"
        : thought.rendering === "short-quote"
          ? "source-excerpt"
          : "editorial-synthesis");
    const presentation = resolveThoughtPresentation(thought);

    assert.equal(
      resolveThoughtPresentationNature(thought),
      expectedNature,
      `${thought.id} must preserve its declared or conservative fallback nature`,
    );
    assert.equal(presentation.nature, expectedNature, `${thought.id} must expose one presentation nature`);
    assert.equal(
      presentation.useQuotationMarks,
      useQuotationMarks[expectedNature],
      `${thought.id} quotation marks must follow the shared presentation map`,
    );
    assert.equal(
      presentation.attributionMode,
      attributionMode[expectedNature],
      `${thought.id} attribution must follow the shared presentation map`,
    );
    assert.deepEqual(
      presentation.label,
      thoughtPresentationNatureLabels[expectedNature],
      `${thought.id} must use the shared bilingual nature label`,
    );
    assert.ok(presentation.label.zh.trim(), `${thought.id} must expose a Chinese nature label`);
    assert.ok(presentation.label.en.trim(), `${thought.id} must expose an English nature label`);

    if (expectedNature === "editorial-synthesis") {
      assert.equal(presentation.useQuotationMarks, false, `${thought.id} synthesis must not look like a quotation`);
      assert.equal(presentation.attributionMode, "based-on", `${thought.id} synthesis must use based-on attribution`);
    }
  }
});

test("synthetic source, synthesis, and unverified cards keep distinct visual promises", async () => {
  const { allThoughts } = await tsImport("../content/libraries.ts", import.meta.url);
  const { resolveThoughtPresentation } = await tsImport(
    "../content/thoughtPresentation.ts",
    import.meta.url,
  );
  const base = allThoughts[0];
  assert.ok(base, "the fixture catalog must contain a base thought");

  const cases = [
    {
      thought: {
        ...base,
        id: "presentation-source-excerpt",
        presentationNature: "source-excerpt",
        rendering: "paraphrase",
        customKnowledge: undefined,
      },
      expected: {
        nature: "source-excerpt",
        useQuotationMarks: true,
        attributionMode: "direct",
        label: { zh: "原文节选", en: "Source excerpt" },
      },
    },
    {
      thought: {
        ...base,
        id: "presentation-editorial-synthesis",
        presentationNature: "editorial-synthesis",
        rendering: "short-quote",
        customKnowledge: undefined,
      },
      expected: {
        nature: "editorial-synthesis",
        useQuotationMarks: false,
        attributionMode: "based-on",
        label: { zh: "命题整理", en: "Editorial synthesis" },
      },
    },
    {
      thought: {
        ...base,
        id: "presentation-unverified-excerpt",
        presentationNature: undefined,
        rendering: "short-quote",
        customKnowledge: {
          collectionId: "presentation-test",
          collectionTitle: "Presentation test",
          cardType: "quote",
          provenance: "material",
          sourceStatus: "needs-review",
        },
      },
      expected: {
        nature: "unverified-excerpt",
        useQuotationMarks: false,
        attributionMode: "unverified",
        label: { zh: "待核摘录", en: "Unverified excerpt" },
      },
    },
  ];

  for (const { thought, expected } of cases) {
    assert.deepEqual(resolveThoughtPresentation(thought), expected, `${thought.id} presentation contract changed`);
  }
});

test("source excerpts and source-led syntheses may keep a unique bilingual editorial summary for deep reading", async () => {
  const completeThoughts = await loadCompletePublicThoughts();
  const { resolveThoughtPresentationNature } = await tsImport(
    "../content/thoughtPresentation.ts",
    import.meta.url,
  );
  const summarized = completeThoughts.filter((thought) => thought.editorialSummary);

  for (const thought of completeThoughts) {
    assert.equal(
      Boolean(thought.editorialSummary?.trim()),
      Boolean(thought.englishEditorialSummary?.trim()),
      `${thought.id} must provide Chinese and English editorial summaries together`,
    );
  }

  assert.ok(summarized.length > 0, "the source-upgrade workflow must retain its deep-reading summaries");
  assert.equal(
    new Set(summarized.map((thought) => thought.editorialSummary)).size,
    summarized.length,
    "a profile summary must not leak into inherited expansion cards",
  );

  for (const thought of summarized) {
    assert.ok(
      ["source-excerpt", "editorial-synthesis"].includes(
        resolveThoughtPresentationNature(thought),
      ),
      `${thought.id} must expose its summary beside an explicit presentation nature`,
    );
    assert.ok(thought.englishEditorialSummary?.trim(), `${thought.id} needs an English editorial summary`);
    assert.notEqual(thought.editorialSummary, thought.text, `${thought.id} summary must stay distinct from its excerpt`);
    assert.notEqual(thought.englishEditorialSummary, thought.english, `${thought.id} English summary must stay distinct from its excerpt`);
  }
});

test("Mao study cards remain editorial syntheses when they inherit a source-excerpt profile", async () => {
  const { maoThoughts } = await tsImport("../content/mao.ts", import.meta.url);
  const { resolveThoughtPresentation } = await tsImport(
    "../content/thoughtPresentation.ts",
    import.meta.url,
  );
  const sourceProfileIds = new Set(
    maoThoughts
      .filter((thought) => thought.presentationNature === "source-excerpt")
      .map((thought) => thought.id),
  );
  const inheritedStudyCard = maoThoughts.find(
    (thought) => thought.presentationNature === "editorial-synthesis"
      && thought.rendering === "paraphrase"
      && sourceProfileIds.has(thought.authorId),
  );

  assert.ok(inheritedStudyCard, "the inherited Mao study card must exist");
  assert.equal(inheritedStudyCard.rendering, "paraphrase");
  assert.equal(inheritedStudyCard.presentationNature, "editorial-synthesis");
  assert.deepEqual(resolveThoughtPresentation(inheritedStudyCard), {
    nature: "editorial-synthesis",
    useQuotationMarks: false,
    attributionMode: "based-on",
    label: { zh: "命题整理", en: "Editorial synthesis" },
  });
});
