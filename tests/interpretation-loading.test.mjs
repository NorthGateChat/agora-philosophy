import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { tsImport } from "tsx/esm/api";

test("the base interpretation module does not statically import the detail catalog", async () => {
  const [interpretation, loader] = await Promise.all([
    readFile(new URL("../content/interpretation.ts", import.meta.url), "utf8"),
    readFile(new URL("../content/interpretationDetailLoader.ts", import.meta.url), "utf8"),
  ]);

  assert.doesNotMatch(interpretation, /from ["']\.\/interpretationDetails(?:["'])/);
  assert.doesNotMatch(interpretation, /interpretationDetailForThought\(/);
  assert.match(interpretation, /bespoke\?: InterpretationDetail/);

  for (const chunk of [
    "interpretationDetailsWestChinese",
    "interpretationDetailsMaoScience",
    "interpretationDetailsIndian",
    "interpretationDetailsEconomics",
  ]) {
    assert.match(loader, new RegExp(`import\\(["']\\./${chunk}["']\\)`));
    assert.doesNotMatch(loader, new RegExp(`from ["']\\./${chunk}["']`));
  }
});

test("detail chunks load by library and preserve shared-chunk caching", async () => {
  const {
    loadInterpretationDetailForThought,
    loadInterpretationDetailsForLibrary,
  } = await tsImport("../content/interpretationDetailLoader.ts", import.meta.url);

  const west = await loadInterpretationDetailsForLibrary("western");
  const chinese = await loadInterpretationDetailsForLibrary("chinese");
  const mao = await loadInterpretationDetailsForLibrary("mao");
  const science = await loadInterpretationDetailsForLibrary("science");
  const indian = await loadInterpretationDetailsForLibrary("indian");
  const economics = await loadInterpretationDetailsForLibrary("economics");
  const psychology = await loadInterpretationDetailsForLibrary("psychology");
  const { curation2026RetiredThoughtIds } = await tsImport(
    "../content/curation2026Registry.ts",
    import.meta.url,
  );

  assert.equal(west, chinese, "western and Chinese details share one lazy chunk");
  assert.equal(mao, science, "Mao and science details share one lazy chunk");
  assert.notEqual(indian, economics, "India and economics keep independent lazy chunks");
  assert.equal(
    economics,
    await loadInterpretationDetailsForLibrary("economics"),
    "the economics detail chunk is cached after its first load",
  );
  assert.equal(typeof economics, "object");
  const loadedIds = new Set(
    [west, mao, indian, economics, psychology]
      .flatMap((details) => Object.keys(details)),
  );
  for (const thoughtId of curation2026RetiredThoughtIds) {
    assert.ok(!loadedIds.has(thoughtId), `${thoughtId} must stay out of lazy detail chunks`);
  }
  assert.ok(await loadInterpretationDetailForThought("plato", "western"));
  assert.ok(
    await loadInterpretationDetailForThought(
      "sextus-opposes-appearances-judgements",
      "western",
    ),
  );
  assert.ok(
    await loadInterpretationDetailForThought(
      "chinese-confucius-rectifying-names",
      "chinese",
    ),
  );
  assert.ok(
    await loadInterpretationDetailForThought(
      "chinese-xici-yin-yang-way",
      "chinese",
    ),
  );
  assert.ok(await loadInterpretationDetailForThought("mao-art", "mao"));
  assert.ok(
    await loadInterpretationDetailForThought(
      "science-bohr-complementarity",
      "science",
    ),
  );
  assert.ok(
    await loadInterpretationDetailForThought(
      "indian-buddha-not-self",
      "indian",
    ),
  );
});

test("the unified depth loader resolves source, bespoke reading, and illustration", async () => {
  const { thoughts } = await tsImport("../content/philosophy.ts", import.meta.url);
  const { loadThoughtDepth } = await tsImport(
    "../content/thoughtDepthLoader.ts",
    import.meta.url,
  );
  const thought = thoughts.find((item) => item.id === "plato-cave-adjustment");
  assert.ok(thought);

  const depth = await loadThoughtDepth(thought, "western");
  assert.equal(depth.sourceMetadata.locatorLevel, "passage");
  assert.ok(depth.interpretation.context.trim());
  assert.equal(depth.illustration?.thoughtId, thought.id);
});
