import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { tsImport } from "tsx/esm/api";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const detailSourcePaths = [
  "content/interpretationDetailsWestChinese.ts",
  "content/interpretationDetailsWestChineseStaticChinese.ts",
  "content/interpretationDetailsWesternEarly.ts",
  "content/interpretationDetailsWesternMiddle.ts",
  "content/interpretationDetailsWesternLate.ts",
];
const detailFields = [
  "context",
  "englishContext",
  "distinction",
  "englishDistinction",
];
const rejectedGeneratorMarkers = [
  "stableVariant",
  "compactChinese",
  "compactEnglish",
  "sourceAwareCompletionDetail",
  "generatedWestChineseDetails",
];
const rejectedTemplateFragments = [
  "把本条固定在",
  "而不是把同作者的相近说法拼成一句",
  "本条定位为",
  "短引直接支持的是",
  "这里应区分三层",
  "fixes the card within a specific argument",
  "not assembled from similar statements elsewhere",
  "The short excerpt directly supports the bounded reading",
  "Keep three levels distinct",
];

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&");
}

function literalKeyOccurrences(source, id) {
  const escaped = escapeRegExp(id);
  const key = /^[A-Za-z_$][\w$]*$/u.test(id)
    ? `(?:["']${escaped}["']|${escaped})`
    : `["']${escaped}["']`;
  return source.match(new RegExp(`^\\s*${key}\\s*:\\s*\\{`, "gmu"))?.length ?? 0;
}

function duplicateValues(entries) {
  const firstIdByValue = new Map();
  const duplicates = [];
  for (const [id, value] of entries) {
    const firstId = firstIdByValue.get(value);
    if (firstId) {
      duplicates.push(`${firstId} = ${id}`);
    } else {
      firstIdByValue.set(value, id);
    }
  }
  return duplicates;
}

test("Western and Chinese verified-source deep readings are literal static entries", async () => {
  const [
    { thoughts },
    { chineseThoughts },
    { verifiedSourcePassages },
    { westChineseInterpretationDetails },
    { westChineseStaticChineseDetails },
    { westernEarlyStaticDetails },
    { westernMiddleStaticDetails },
    { westernLateInterpretationDetails },
  ] = await Promise.all([
    tsImport("../content/philosophy.ts", import.meta.url),
    tsImport("../content/chinese.ts", import.meta.url),
    tsImport("../content/verifiedSourcePassages.ts", import.meta.url),
    tsImport("../content/interpretationDetailsWestChinese.ts", import.meta.url),
    tsImport("../content/interpretationDetailsWestChineseStaticChinese.ts", import.meta.url),
    tsImport("../content/interpretationDetailsWesternEarly.ts", import.meta.url),
    tsImport("../content/interpretationDetailsWesternMiddle.ts", import.meta.url),
    tsImport("../content/interpretationDetailsWesternLate.ts", import.meta.url),
  ]);
  const verifiedIds = new Set(verifiedSourcePassages.map((entry) => entry.id));
  const targetThoughts = [...thoughts, ...chineseThoughts]
    .filter((thought) => verifiedIds.has(thought.id));
  const targetIds = targetThoughts.map((thought) => thought.id);
  const sources = detailSourcePaths.map((path) => ({
    path,
    source: readFileSync(`${repositoryRoot}/${path}`, "utf8"),
  }));
  const combinedSource = sources.map(({ source }) => source).join("\n");

  assert.equal(
    new Set(targetIds).size,
    targetIds.length,
    "Western and Chinese verified source cards must have unique IDs",
  );

  const staticModuleKeySets = Object.entries({
    chinese: new Set(Object.keys(westChineseStaticChineseDetails)),
    early: new Set(Object.keys(westernEarlyStaticDetails)),
    middle: new Set(Object.keys(westernMiddleStaticDetails)),
    late: new Set(Object.keys(westernLateInterpretationDetails)),
  });
  for (let leftIndex = 0; leftIndex < staticModuleKeySets.length; leftIndex += 1) {
    const [leftName, leftKeys] = staticModuleKeySets[leftIndex];
    for (
      let rightIndex = leftIndex + 1;
      rightIndex < staticModuleKeySets.length;
      rightIndex += 1
    ) {
      const [rightName, rightKeys] = staticModuleKeySets[rightIndex];
      assert.deepEqual(
        [...leftKeys].filter((id) => rightKeys.has(id)),
        [],
        `${leftName} and ${rightName} static modules must have no overlapping keys`,
      );
    }
  }

  for (const marker of rejectedGeneratorMarkers) {
    assert.equal(
      combinedSource.includes(marker),
      false,
      `removed runtime generator marker must stay at zero: ${marker}`,
    );
  }
  for (const fragment of rejectedTemplateFragments) {
    assert.equal(
      combinedSource.includes(fragment),
      false,
      `rejected completion-template fragment must stay at zero: ${fragment}`,
    );
  }
  for (const { path, source } of sources.slice(1)) {
    assert.doesNotMatch(
      source,
      /Object\.fromEntries|\.map\s*\(|^\s*(?:export\s+)?function\s+[A-Za-z_$]/mu,
      `${path} must remain a literal static record rather than a generator`,
    );
  }

  const missingDetails = [];
  const nonliteralIds = [];
  for (const id of targetIds) {
    const detail = westChineseInterpretationDetails[id];
    if (!detail || detailFields.some((field) => !detail[field]?.trim())) {
      missingDetails.push(id);
    }
    const occurrences = sources.reduce(
      (total, { source }) => total + literalKeyOccurrences(source, id),
      0,
    );
    if (occurrences !== 1) {
      nonliteralIds.push(`${id} (${occurrences})`);
    }
  }
  assert.deepEqual(missingDetails, [], "every target card needs all four deep-reading fields");
  assert.deepEqual(
    nonliteralIds,
    [],
    "each target card must have exactly one literal static object entry",
  );

  const fieldDuplicates = Object.fromEntries(
    detailFields.map((field) => [
      field,
      duplicateValues(targetIds.map((id) => [id, westChineseInterpretationDetails[id][field].trim()])),
    ]),
  );
  assert.deepEqual(
    fieldDuplicates,
    { context: [], englishContext: [], distinction: [], englishDistinction: [] },
    "no target deep-reading field may be copied verbatim between cards",
  );

  const combinationDuplicates = duplicateValues(
    targetIds.map((id) => [
      id,
      JSON.stringify(detailFields.map(
        (field) => westChineseInterpretationDetails[id][field].trim(),
      )),
    ]),
  );
  assert.deepEqual(
    combinationDuplicates,
    [],
    "four-field deep-reading combinations must have exact duplicate count zero",
  );
});
