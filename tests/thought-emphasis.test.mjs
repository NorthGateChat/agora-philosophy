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

test("curated reading emphasis uses one or two exact, non-overlapping segments per language", async () => {
  const thoughts = await loadCompletePublicThoughts();
  const { curatedThoughtEmphasis } = await tsImport(
    "../content/thoughtEmphasis.ts",
    import.meta.url,
  );
  const thoughtById = new Map(thoughts.map((thought) => [thought.id, thought]));

  assert.ok(Object.keys(curatedThoughtEmphasis).length > 0, "the editorial emphasis registry must not be empty");

  for (const [id, emphasis] of Object.entries(curatedThoughtEmphasis)) {
    const thought = thoughtById.get(id);
    assert.ok(thought, `${id} must resolve to a public thought`);

    for (const [language, content, segments] of [
      ["zh", thought.text, emphasis.zh],
      ["en", thought.english, emphasis.en],
    ]) {
      assert.ok(segments.length >= 1 && segments.length <= 2, `${id}.${language} must contain one or two segments`);
      assert.equal(new Set(segments).size, segments.length, `${id}.${language} segments must be unique`);

      const ranges = segments.map((segment) => {
        assert.equal(segment, segment.trim(), `${id}.${language} segments must not have outer whitespace`);
        assert.ok(segment.length > 0, `${id}.${language} segments must not be empty`);
        assert.ok(!/[……]/u.test(segment), `${id}.${language} must not emphasize an ellipsis`);
        const start = content.indexOf(segment);
        assert.notEqual(start, -1, `${id}.${language} segment “${segment}” must occur verbatim in the display text`);
        return [start, start + segment.length];
      }).sort((a, b) => a[0] - b[0]);

      for (let index = 1; index < ranges.length; index += 1) {
        assert.ok(ranges[index - 1][1] <= ranges[index][0], `${id}.${language} segments must not overlap`);
      }
    }
  }
});
