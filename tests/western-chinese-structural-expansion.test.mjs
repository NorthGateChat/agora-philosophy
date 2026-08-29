import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { tsImport } from "tsx/esm/api";

const hanCharacter = /\p{Script=Han}/u;
const deepReadFields = [
  "editorialSummary",
  "englishEditorialSummary",
];
const interpretationFields = [
  "context",
  "englishContext",
  "distinction",
  "englishDistinction",
];

const expectedRetiredWesternIds = new Set([
  "heidegger",
  "sartre",
  "camus",
  "foucault",
  "derrida",
  "averroes-audiences",
  "arendt",
  "rawls",
  "nussbaum",
  "marx-commodity-fetishism",
  "francis-bacon-idols",
  "james-stream-of-thought",
  "popper",
  "kuhn-normal-science-puzzles",
  "kuhn-anomaly-discovery",
]);

function assertSourceLedCard(thought, interpretation) {
  assert.equal(thought.presentationNature, "source-excerpt", `${thought.id} must be source-led`);
  assert.equal(thought.rendering, "short-quote", `${thought.id} must render as a short quote`);
  assert.equal(thought.sourceLocator?.length, 2, `${thought.id} needs a bilingual locator`);
  for (const locator of thought.sourceLocator) {
    assert.ok(locator.trim(), `${thought.id} locator values must not be empty`);
  }
  assert.doesNotMatch(
    thought.sourceLocator[1],
    hanCharacter,
    `${thought.id} English locator must not contain Chinese`,
  );
  for (const field of deepReadFields) {
    assert.ok(thought[field]?.trim(), `${thought.id}.${field} must support deep reading`);
  }
  assert.ok(interpretation, `${thought.id} must have a lazy-loaded interpretation detail`);
  for (const field of interpretationFields) {
    assert.ok(
      interpretation[field]?.trim(),
      `${thought.id}.${field} must support lazy-loaded deep reading`,
    );
  }
}

test("the Western structural pass is quota-neutral and removes only its declared retirement set", async () => {
  const { thoughts } = await tsImport("../content/philosophy.ts", import.meta.url);
  const {
    westernRetiredThoughtIds,
    westernStructuralExpansionThoughts,
  } = await tsImport("../content/philosophyStructuralExpansion.ts", import.meta.url);
  const { loadInterpretationDetailsForLibrary } = await tsImport(
    "../content/interpretationDetailLoader.ts",
    import.meta.url,
  );
  const westernDetails = await loadInterpretationDetailsForLibrary("western");

  assert.deepEqual(westernRetiredThoughtIds, expectedRetiredWesternIds);
  assert.equal(
    westernStructuralExpansionThoughts.length,
    westernRetiredThoughtIds.size,
    "the Western pass must replace one card for every retired card",
  );
  assert.equal(
    new Set(westernStructuralExpansionThoughts.map((thought) => thought.id)).size,
    westernStructuralExpansionThoughts.length,
    "Western replacement ids must be unique",
  );

  const publicIds = new Set(thoughts.map((thought) => thought.id));
  for (const id of westernRetiredThoughtIds) {
    assert.ok(!publicIds.has(id), `${id} must be filtered from the public Western catalog`);
  }
  for (const thought of westernStructuralExpansionThoughts) {
    assert.ok(publicIds.has(thought.id), `${thought.id} must be public`);
    assertSourceLedCard(thought, westernDetails[thought.id]);
    assert.ok(thought.authorId?.trim(), `${thought.id}.authorId must be present`);
    assert.doesNotMatch(thought.english, hanCharacter, `${thought.id}.english must not contain Chinese`);
  }

  const authorCounts = new Map();
  for (const thought of westernStructuralExpansionThoughts) {
    authorCounts.set(thought.authorId, (authorCounts.get(thought.authorId) ?? 0) + 1);
  }
  assert.deepEqual(
    authorCounts,
    new Map([
      ["sextus_empiricus", 3],
      ["lucretius", 3],
      ["al_ghazali", 3],
      ["maimonides", 3],
      ["jl_austin", 3],
    ]),
  );
});

test("the Chinese structural pass contributes five three-card source clusters", async () => {
  const { chineseThoughts } = await tsImport("../content/chinese.ts", import.meta.url);
  const { chineseStructuralExpansionThoughts } = await tsImport(
    "../content/chineseStructuralExpansion.ts",
    import.meta.url,
  );
  const { loadInterpretationDetailsForLibrary } = await tsImport(
    "../content/interpretationDetailLoader.ts",
    import.meta.url,
  );
  const chineseDetails = await loadInterpretationDetailsForLibrary("chinese");

  const authorCounts = new Map();
  for (const thought of chineseStructuralExpansionThoughts) {
    assert.match(thought.id, /^chinese-/, `${thought.id} must use the Chinese namespace`);
    assertSourceLedCard(thought, chineseDetails[thought.id]);
    assert.ok(thought.text.trim(), `${thought.id}.text must retain a source passage`);
    assert.ok(thought.plainText.trim(), `${thought.id}.plainText must provide a modern reading`);
    assert.notEqual(thought.text, thought.plainText, `${thought.id} must separate source and reading`);
    assert.doesNotMatch(thought.english, hanCharacter, `${thought.id}.english must be an English study translation`);
    authorCounts.set(thought.authorId, (authorCounts.get(thought.authorId) ?? 0) + 1);
  }

  assert.deepEqual(
    authorCounts,
    new Map([
      ["yijing_xici", 3],
      ["later_mohists", 3],
      ["zhiyi", 3],
      ["lu_jiuyuan", 3],
      ["he_yin_zhen", 3],
    ]),
  );

  const publicIds = new Set(chineseThoughts.map((thought) => thought.id));
  for (const thought of chineseStructuralExpansionThoughts) {
    assert.ok(publicIds.has(thought.id), `${thought.id} must be public`);
  }
  assert.equal(publicIds.size, chineseThoughts.length, "Chinese public ids must remain unique");

  const byId = new Map(chineseStructuralExpansionThoughts.map((thought) => [thought.id, thought]));
  assert.equal(
    byId.get("chinese-xici-yin-yang-way")?.text,
    "一阴一阳之谓道，继之者善也，成之者性也。",
  );
  assert.equal(byId.get("chinese-mohist-kinds-of-names")?.text, "名，达、类、私。");
  assert.equal(
    byId.get("chinese-zhiyi-three-truths-one-mind")?.text,
    "若论道理秖在一心。即空即假即中。",
  );
  assert.match(byId.get("chinese-lu-jiuyuan-way-fills-cosmos")?.text ?? "", /^道塞宇宙/);
  assert.match(byId.get("chinese-he-yin-zhen-world-shared")?.text ?? "", /必自女子解放始。$/);
});

test("every new card has a staged evidence and reading-unit record", async () => {
  const { westernStructuralExpansionThoughts } = await tsImport(
    "../content/philosophyStructuralExpansion.ts",
    import.meta.url,
  );
  const { chineseStructuralExpansionThoughts } = await tsImport(
    "../content/chineseStructuralExpansion.ts",
    import.meta.url,
  );
  const evidence = await readFile(
    new URL(
      "../research/curation-2026-08-30/western-chinese-evidence.md",
      import.meta.url,
    ),
    "utf8",
  );

  for (const thought of [
    ...westernStructuralExpansionThoughts,
    ...chineseStructuralExpansionThoughts,
  ]) {
    assert.ok(
      evidence.includes("#### `" + thought.id + "`"),
      `${thought.id} must have an evidence heading`,
    );
  }
  assert.equal(
    (evidence.match(/^- Proposed reading unit:/gm) ?? []).length,
    westernStructuralExpansionThoughts.length + chineseStructuralExpansionThoughts.length,
  );
  assert.equal(
    (evidence.match(/^- Illustration prompt:/gm) ?? []).length,
    westernStructuralExpansionThoughts.length + chineseStructuralExpansionThoughts.length,
  );
});
