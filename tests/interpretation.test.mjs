import assert from "node:assert/strict";
import test from "node:test";
import { tsImport } from "tsx/esm/api";

const hanCharacter = /\p{Script=Han}/u;

test("every thought library resolves the same three-layer interpretation model", async () => {
  const { allThoughts, contentLibraryForThought, contentLibraryIds } = await tsImport(
    "../content/libraries.ts",
    import.meta.url,
  );
  const { interpretationForThought } = await tsImport(
    "../content/interpretation.ts",
    import.meta.url,
  );
  const { sourceMetadataForThought } = await tsImport(
    "../content/sourceMetadata.ts",
    import.meta.url,
  );

  assert.ok(allThoughts.length >= 1000, "the interpretation layer must cover the full current corpus");

  const representedLibraries = new Set();
  for (const thought of allThoughts) {
    const source = sourceMetadataForThought(thought);
    const library = contentLibraryForThought(thought.id);
    assert.ok(library, `${thought.id} must belong to a registered content library`);
    const interpretation = interpretationForThought(thought, source, library);
    representedLibraries.add(library);

    assert.ok(thought.reflection.trim(), `${thought.id} must retain its card-specific core reading`);
    assert.ok(interpretation.context.trim(), `${thought.id} must resolve a source-aware context`);
    assert.ok(interpretation.distinction.trim(), `${thought.id} must resolve a reading boundary`);
    assert.ok(interpretation.englishContext.trim(), `${thought.id} must resolve English context`);
    assert.ok(
      interpretation.englishDistinction.trim(),
      `${thought.id} must resolve an English reading boundary`,
    );
    assert.doesNotMatch(
      interpretation.englishContext,
      hanCharacter,
      `${thought.id}.englishContext must not fall back to Chinese`,
    );
    assert.doesNotMatch(
      interpretation.englishDistinction,
      hanCharacter,
      `${thought.id}.englishDistinction must not fall back to Chinese`,
    );
  }

  assert.deepEqual(
    representedLibraries,
    new Set(contentLibraryIds),
    "every registered thought collection must be covered",
  );
});

test("context copy preserves each library's source and editorial boundary", async () => {
  const { allThoughts, contentLibraries, contentLibraryForThought } = await tsImport(
    "../content/libraries.ts",
    import.meta.url,
  );
  const { interpretationForThought } = await tsImport(
    "../content/interpretation.ts",
    import.meta.url,
  );
  const { sourceMetadataForThought } = await tsImport(
    "../content/sourceMetadata.ts",
    import.meta.url,
  );

  const western = allThoughts.find((thought) => thought.id === "spinoza");
  const chinese = allThoughts.find((thought) => thought.id === "chinese-confucius-learning-practice");
  const mao = allThoughts.find((thought) => thought.id === "mao-practice");
  const science = allThoughts.find((thought) => thought.id === "science-bacon-gradual-induction");
  const indian = allThoughts.find((thought) => thought.id === "indian-buddha-dependent-arising");
  const indianSource = allThoughts.find((thought) => thought.id === "indian-vedic-creation-question");
  const economics = contentLibraries.economics.thoughts[0];
  const economicsSource = contentLibraries.economics.thoughts.find(
    (thought) => thought.id === "economics-smith-public-works",
  );
  const psychologySource = allThoughts.find(
    (thought) => thought.id === "psychology-foundations-wundt-immediate-experience",
  );
  assert.ok(
    western
      && chinese
      && mao
      && science
      && indian
      && indianSource
      && economics
      && economicsSource
      && psychologySource,
    "representative thoughts must be present",
  );

  const westernContext = interpretationForThought(
    western,
    sourceMetadataForThought(western),
    contentLibraryForThought(western.id),
  );
  const chineseContext = interpretationForThought(
    chinese,
    sourceMetadataForThought(chinese),
    contentLibraryForThought(chinese.id),
  );
  const maoContext = interpretationForThought(
    mao,
    sourceMetadataForThought(mao),
    contentLibraryForThought(mao.id),
  );
  const scienceContext = interpretationForThought(
    science,
    sourceMetadataForThought(science),
    contentLibraryForThought(science.id),
  );
  const indianContext = interpretationForThought(
    indian,
    sourceMetadataForThought(indian),
    contentLibraryForThought(indian.id),
  );
  const economicsContext = interpretationForThought(
    economics,
    sourceMetadataForThought(economics),
    contentLibraryForThought(economics.id),
  );
  const indianSourceContext = interpretationForThought(
    indianSource,
    sourceMetadataForThought(indianSource),
    contentLibraryForThought(indianSource.id),
  );
  const economicsSourceContext = interpretationForThought(
    economicsSource,
    sourceMetadataForThought(economicsSource),
    contentLibraryForThought(economicsSource.id),
  );
  const psychologySourceContext = interpretationForThought(
    psychologySource,
    sourceMetadataForThought(psychologySource),
    contentLibraryForThought(psychologySource.id),
  );

  assert.match(westernContext.context, /命题译写|原文短句/);
  assert.match(chineseContext.context, /原文|今译/);
  assert.match(chineseContext.distinction, /今译、注释与原文/);
  assert.match(maoContext.context, /原文短句|编辑性转述/);
  assert.match(maoContext.distinction, /历史条件/);
  assert.match(scienceContext.context, /中间公理.*方法链/);
  assert.match(scienceContext.distinction, /概念工作.*新实例与反例/);
  assert.match(indianContext.context, /《自说经》1\.3|缘起/);
  assert.match(indianSourceContext.context, /印度哲学卡.*逐字字段/);
  assert.match(indianContext.distinction, /因果|充分条件|经典叙事/);
  assert.ok(economicsContext.context.trim());
  assert.ok(economicsContext.distinction.trim());
  assert.ok(economicsContext.englishContext.trim());
  assert.ok(economicsContext.englishDistinction.trim());
  assert.doesNotMatch(economicsContext.englishContext, hanCharacter);
  assert.doesNotMatch(economicsContext.englishDistinction, hanCharacter);
  assert.match(economicsSourceContext.context, /经济思想卡.*逐字字段/);
  assert.match(psychologySourceContext.context, /心理学卡.*逐字字段/);
});

test("important cards can replace the generated context with bespoke editorial copy", async () => {
  const { allThoughts, contentLibraryForThought } = await tsImport(
    "../content/libraries.ts",
    import.meta.url,
  );
  const { interpretationForThought } = await tsImport(
    "../content/interpretation.ts",
    import.meta.url,
  );
  const { sourceMetadataForThought } = await tsImport(
    "../content/sourceMetadata.ts",
    import.meta.url,
  );

  const base = allThoughts[0];
  const thought = {
    ...base,
    context: "逐条核订的作品语境。",
    englishContext: "Bespoke work context.",
    distinction: "逐条核订的辨析边界。",
    englishDistinction: "Bespoke interpretive boundary.",
  };
  const library = contentLibraryForThought(thought.id);
  assert.ok(library);
  const interpretation = interpretationForThought(
    thought,
    sourceMetadataForThought(thought),
    library,
  );

  assert.deepEqual(interpretation, {
    context: thought.context,
    englishContext: thought.englishContext,
    distinction: thought.distinction,
    englishDistinction: thought.englishDistinction,
  });
});

test("the curated interpretation catalog keeps complete bilingual copy as libraries grow", async () => {
  const { allThoughts, contentLibraryForThought, contentLibraryIds } = await tsImport(
    "../content/libraries.ts",
    import.meta.url,
  );
  const { interpretationDetails } = await tsImport(
    "../content/interpretationDetails.ts",
    import.meta.url,
  );
  const { loadCompleteEconomicsCatalog } = await tsImport(
    "../content/economics.ts",
    import.meta.url,
  );

  const completeEconomics = await loadCompleteEconomicsCatalog();
  const thoughtsById = new Map(
    [...allThoughts, ...completeEconomics.thoughts]
      .map((thought) => [thought.id, thought]),
  );
  const coverage = new Map();
  const normalizedDistinctions = new Set();

  for (const [thoughtId, detail] of Object.entries(interpretationDetails)) {
    assert.ok(thoughtsById.has(thoughtId), `${thoughtId} must name a real thought`);
    const library = contentLibraryForThought(thoughtId);
    assert.ok(library, `${thoughtId} must belong to a registered library`);
    coverage.set(library, (coverage.get(library) ?? 0) + 1);

    for (const field of ["context", "englishContext", "distinction", "englishDistinction"]) {
      assert.ok(detail[field].trim(), `${thoughtId}.${field} must not be blank`);
    }
    assert.doesNotMatch(detail.englishContext, hanCharacter, `${thoughtId}.englishContext is English`);
    assert.doesNotMatch(
      detail.englishDistinction,
      hanCharacter,
      `${thoughtId}.englishDistinction is English`,
    );

    const normalized = detail.distinction.replace(/[\s，。！？；：、“”‘’]/g, "");
    assert.ok(
      !normalizedDistinctions.has(normalized),
      `${thoughtId} must have a card-specific distinction`,
    );
    normalizedDistinctions.add(normalized);
  }

  assert.ok(Object.keys(interpretationDetails).length >= 50, "at least 50 priority cards are bespoke");
  assert.ok(
    contentLibraryIds.length - coverage.size <= 1,
    "at most one newly launched library may rely entirely on the shared fallback",
  );
  for (const [library, entryCount] of coverage) {
    assert.ok(contentLibraryIds.includes(library), `${library} must still be registered`);
    assert.ok(entryCount >= 8, `${library} needs at least eight bespoke entries once curated`);
  }
});

test("a real catalog entry overrides the topic fallback while inline copy remains highest priority", async () => {
  const { allThoughts, contentLibraryForThought } = await tsImport(
    "../content/libraries.ts",
    import.meta.url,
  );
  const { interpretationForThought } = await tsImport(
    "../content/interpretation.ts",
    import.meta.url,
  );
  const { loadInterpretationDetailForThought } = await tsImport(
    "../content/interpretationDetailLoader.ts",
    import.meta.url,
  );
  const { sourceMetadataForThought } = await tsImport(
    "../content/sourceMetadata.ts",
    import.meta.url,
  );

  const thought = allThoughts.find((item) => item.id === "science-bohr-complementarity");
  assert.ok(thought);
  const library = contentLibraryForThought(thought.id);
  assert.ok(library);
  const bespoke = await loadInterpretationDetailForThought(thought.id, library);
  assert.ok(bespoke);
  const resolved = interpretationForThought(
    thought,
    sourceMetadataForThought(thought),
    library,
    bespoke,
  );
  assert.deepEqual(resolved, bespoke);

  const inline = {
    ...thought,
    context: "条目内语境优先。",
    englishContext: "Inline context wins.",
    distinction: "条目内辨析优先。",
    englishDistinction: "Inline distinction wins.",
  };
  const inlineResolved = interpretationForThought(
    inline,
    sourceMetadataForThought(inline),
    library,
    bespoke,
  );
  assert.equal(inlineResolved.context, inline.context);
  assert.equal(inlineResolved.englishContext, inline.englishContext);
  assert.equal(inlineResolved.distinction, inline.distinction);
  assert.equal(inlineResolved.englishDistinction, inline.englishDistinction);
});
