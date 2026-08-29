import assert from "node:assert/strict";
import test from "node:test";
import { tsImport } from "tsx/esm/api";

const { contentLibraryThoughtIndex } = await tsImport(
  "../lib/contentLibraryThoughtIndex.ts",
  import.meta.url,
);
const { contentLibraries, contentLibraryForThought, contentLibraryIds } = await tsImport(
  "../content/libraries.ts",
  import.meta.url,
);

function randomSequence(...values) {
  let index = 0;
  return () => values[Math.min(index++, values.length - 1)] ?? 0;
}

const [westernFirst, westernSecond] = contentLibraries.western.thoughts;
const [chineseFirst, chineseSecond] = contentLibraries.chinese.thoughts;
const [maoFirst] = contentLibraries.mao.thoughts;

test("cross-collection selection gives each available collection a draw", () => {
  assert.deepEqual(
    [...contentLibraryIds],
    Object.keys(contentLibraries),
    "the draw order must follow the registered-library order",
  );
  const candidatePairs = contentLibraryIds.map((libraryId) => {
    const pair = contentLibraries[libraryId].thoughts.slice(0, 2);
    assert.equal(pair.length, 2, `${libraryId} must provide at least two draw candidates`);
    return pair;
  });
  const candidates = candidatePairs.flat();

  for (const [libraryIndex, libraryId] of contentLibraryIds.entries()) {
    const selectedIndex = contentLibraryThoughtIndex(candidates, "random", {
      random: randomSequence(
        (libraryIndex + 0.5) / contentLibraryIds.length,
        0,
      ),
    });
    assert.equal(contentLibraryForThought(candidates[selectedIndex].id), libraryId);
  }
});

test("a collection containing only the current thought cannot repeat it", () => {
  const candidates = [westernFirst, chineseFirst, chineseSecond];
  const selectedIndex = contentLibraryThoughtIndex(candidates, "random", {
    currentId: westernFirst.id,
    random: randomSequence(0),
  });

  assert.notEqual(candidates[selectedIndex].id, westernFirst.id);
  assert.equal(contentLibraryForThought(candidates[selectedIndex].id), "chinese");
});

test("the current thought is excluded inside a collection that has alternatives", () => {
  const candidates = [westernFirst, westernSecond, chineseFirst, maoFirst];
  const selectedIndex = contentLibraryThoughtIndex(candidates, "random", {
    currentId: westernFirst.id,
    random: randomSequence(0, 0),
  });

  assert.equal(candidates[selectedIndex].id, westernSecond.id);
});
