import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { tsImport } from "tsx/esm/api";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const researchPath = resolve(projectRoot, "research/reading-units/inventory.json");
const publicPath = resolve(projectRoot, "public/readings/index.json");
const MIN_READING_UNIT_COUNT = 650;
const MAX_READING_UNIT_COUNT = 750;
const [researchInventory, publicIndex] = await Promise.all([
  readFile(researchPath, "utf8").then(JSON.parse),
  readFile(publicPath, "utf8").then(JSON.parse),
]);
const unitById = new Map(publicIndex.units.map((unit) => [unit.id, unit]));

function unitForThought(thoughtId) {
  const route = publicIndex.thoughtMap[thoughtId];
  assert.ok(route, `${thoughtId} needs a thought route`);
  const unit = unitById.get(route.unitId);
  assert.ok(unit, `${thoughtId} needs a reading unit`);
  return unit;
}

function assertSharedUnit(thoughtIds, structureKey) {
  const units = thoughtIds.map(unitForThought);
  assert.equal(
    new Set(units.map(({ id }) => id)).size,
    1,
    `${thoughtIds.join(", ")} must share one complete reading unit`,
  );
  assert.equal(units[0].locator.structureKey, structureKey);
  return units[0];
}

async function loadExpectedState() {
  const [{ buildReadingUnitInventory }, { verifiedSourcePassages }] = await Promise.all([
    tsImport("../scripts/build-reading-unit-inventory.mjs", import.meta.url),
    tsImport("../content/verifiedSourcePassages.ts", import.meta.url),
  ]);
  return {
    built: await buildReadingUnitInventory(),
    verifiedSourcePassages,
  };
}

test("reading-unit inventory is reproducible and public index stays in sync", async () => {
  const { built } = await loadExpectedState();
  assert.deepEqual(researchInventory, built);
  assert.deepEqual(publicIndex, built);
});

test("all 918 verified thoughts map to one and only one non-orphan reading unit", async () => {
  const { verifiedSourcePassages } = await loadExpectedState();
  const verifiedIds = verifiedSourcePassages.map(({ id }) => id).sort();
  const mappedIds = Object.keys(publicIndex.thoughtMap).sort();
  const unitThoughtIds = publicIndex.units.flatMap(({ thoughtIds }) => thoughtIds).sort();

  assert.equal(publicIndex.catalogThoughtCount, 1_441);
  assert.equal(publicIndex.verifiedThoughtCount, 918);
  assert.equal(verifiedIds.length, 918);
  assert.equal(new Set(verifiedIds).size, 918, "verified evidence IDs must be unique");
  assert.deepEqual(mappedIds, verifiedIds, "every verified thought needs a reader route");
  assert.deepEqual(unitThoughtIds, verifiedIds, "unit membership must cover the registry exactly");
  assert.equal(
    new Set(unitThoughtIds).size,
    918,
    "no verified thought may be duplicated across reading units",
  );

  for (const unit of publicIndex.units) {
    assert.ok(unit.thoughtIds.length > 0, `${unit.id} must not be an orphan unit`);
    for (const thoughtId of unit.thoughtIds) {
      assert.equal(
        publicIndex.thoughtMap[thoughtId]?.unitId,
        unit.id,
        `${thoughtId} route must point back to its containing unit`,
      );
    }
  }
});

test("2026 curation additions open the actual containing section, chapter, fascicle, letter, or article", () => {
  assert.equal(unitForThought("ghazali-bases-certitude").locator.structureKey, "section-1");
  assert.equal(unitForThought("ghazali-blind-belief-consciousness").locator.structureKey, "section-3");
  assert.equal(unitForThought("ghazali-experience-not-definition").locator.structureKey, "section-7");
  assert.equal(unitForThought("maimonides-no-positive-attribute").locator.structureKey, "part-i-chapter-58");
  assert.equal(unitForThought("maimonides-negation-advances-knowledge").locator.structureKey, "part-i-chapter-59");
  assert.equal(unitForThought("maimonides-law-soul-body-welfare").locator.structureKey, "part-iii-chapter-27");
  assert.equal(unitForThought("chinese-zhiyi-one-mind-three-wisdoms").locator.structureKey, "fascicle-1");
  assert.equal(unitForThought("chinese-zhiyi-three-truths-one-mind").locator.structureKey, "fascicle-6");
  assert.notEqual(
    unitForThought("chinese-zhiyi-one-mind-three-wisdoms").id,
    unitForThought("chinese-zhiyi-three-truths-one-mind").id,
  );
  assert.equal(unitForThought("chinese-lu-jiuyuan-root-and-branches").locator.structureKey, "whole-work");
  assert.equal(unitForThought("science-lavoisier-nomenclature-facts-ideas-words").locator.structureKey, "preface-preface");
  assert.equal(unitForThought("science-lyell-present-causes").locator.structureKey, "book-i-chapter-xiii");
  assert.equal(unitForThought("science-hutton-deep-time-no-beginning").locator.structureKey, "chapter-i");
  assert.equal(unitForThought("science-fisher-randomized-plots").locator.structureKey, "whole-work");
});

test("reading units are deduplicated, bounded, source-routable, and lazily addressable", () => {
  assert.ok(
    publicIndex.unitCount >= MIN_READING_UNIT_COUNT
      && publicIndex.unitCount <= MAX_READING_UNIT_COUNT,
    `expected ${MIN_READING_UNIT_COUNT}-${MAX_READING_UNIT_COUNT} chapter-sized reading units, found ${publicIndex.unitCount}`,
  );
  assert.equal(publicIndex.unitCount, publicIndex.units.length);
  assert.equal(
    new Set(publicIndex.units.map(({ id }) => id)).size,
    publicIndex.units.length,
    "reading-unit IDs must be unique",
  );

  const groupKeys = new Set();
  for (const unit of publicIndex.units) {
    const sourceUrl = new URL(unit.source.url);
    assert.equal(sourceUrl.protocol, "https:", `${unit.id} needs an HTTPS primary source`);
    assert.ok(unit.source.label.trim(), `${unit.id} needs a Chinese source label`);
    assert.ok(unit.source.englishLabel.trim(), `${unit.id} needs an English source label`);
    assert.ok(unit.edition.zh.trim(), `${unit.id} needs Chinese edition provenance`);
    assert.ok(unit.edition.en.trim(), `${unit.id} needs English edition provenance`);
    assert.ok(unit.locator.structureKey.trim(), `${unit.id} needs a structural locator`);
    if (unit.source.segments) {
      assert.ok(unit.source.segments.length >= 2, `${unit.id} composite needs multiple segments`);
      assert.equal(unit.source.segments[0].url, unit.source.url);
      assert.equal(
        new Set(unit.source.segments.map(({ url }) => url)).size,
        unit.source.segments.length,
        `${unit.id} composite segment URLs must be distinct`,
      );
      for (const segment of unit.source.segments) {
        assert.equal(new URL(segment.url).protocol, "https:");
      }
    }
    assert.match(
      unit.expectedUnitFile.publicPath,
      new RegExp(`^public/readings/units/${unit.id}\\.json$`),
    );
    assert.equal(unit.expectedUnitFile.href, `/readings/units/${unit.id}.json`);

    const groupKey = [
      unit.work.en.normalize("NFKC").toLowerCase().trim(),
      sourceUrl.href,
      unit.locator.structureKey,
    ].join("\u001f");
    assert.equal(groupKeys.has(groupKey), false, `duplicate reading-unit group: ${groupKey}`);
    groupKeys.add(groupKey);

    const expectedAvailability = unit.useBasisKinds.includes("quotation-exception")
      ? "source-route"
      : "integrated-candidate";
    assert.equal(unit.availability, expectedAvailability);
  }
});

test("unit boundaries describe complete containing chapters while thought routes retain exact anchors", () => {
  const husserlUnit = unitForThought("husserl");
  assert.equal(husserlUnit.id, unitForThought("husserl-intentionality").id);
  assert.equal(husserlUnit.locator.structureKey, "part-i");
  assert.doesNotMatch(husserlUnit.locator.structureKey, /(?:book|volume)-17/u);
  assert.match(publicIndex.thoughtMap.husserl.locator.en, /vol\. 17 .*Part I/iu);

  assert.equal(unitForThought("kant-good-will").locator.structureKey, "section-i");
  assert.equal(unitForThought("kant").locator.structureKey, "section-ii");
  assert.equal(unitForThought("kant").id, unitForThought("kant-universal-law-test").id);
  assert.equal(unitForThought("kant").id, unitForThought("kant-autonomy-self-legislation").id);

  assertSharedUnit(
    [
      "indian-ambedkar-division-labourers",
      "indian-ambedkar-graded-inequality",
      "indian-ambedkar-social-reform",
    ],
    "whole-work",
  );
  assertSharedUnit(
    [
      "mao-late-ten-relations-central-local",
      "mao-late-ten-relations-industry-balance",
      "mao-late-ten-relations-positive-factors",
    ],
    "whole-work",
  );

  assert.equal(unitForThought("science-schrodinger-cat-boundary").locator.structureKey, "part-i");
  assert.equal(
    unitForThought("science-schrodinger-entangled-whole").locator.structureKey,
    "part-ii",
  );
  assert.equal(
    unitForThought("marx-alienated-labor-product").id,
    unitForThought("marx-species-being").id,
  );
  assert.equal(
    unitForThought("kierkegaard-faith-paradox").id,
    unitForThought("kierkegaard-infinite-resignation").id,
  );

  assert.equal(
    unitForThought("hume-particular-ideas").locator.structureKey,
    "book-1-part-1-section-7",
  );
  assert.equal(unitForThought("thomas_aquinas").locator.structureKey, "part-i-question-2");
  assert.equal(unitForThought("indian-gita-action-fruit").locator.structureKey, "chapter-ii");
  assert.equal(
    unitForThought("indian-gita-action-fruit").id,
    unitForThought("indian-gita-equanimity").id,
  );

  for (const unit of publicIndex.units.filter(({ work }) => work.en === "The Republic")) {
    assert.match(unit.locator.structureKey, /^book-/u);
    assert.doesNotMatch(unit.locator.structureKey, /stephanus|\d{3}[a-e]/iu);
  }

  assert.equal(unitForThought("epictetus").locator.structureKey, "whole-work");
  assert.equal(unitForThought("epicurus").locator.structureKey, "whole-work");

  const peirceIdeasUnit = unitForThought("peirce");
  assert.equal(
    peirceIdeasUnit.id,
    unitForThought("peirce-reality-community-inquiry").id,
    "two excerpts from How to Make Our Ideas Clear must share its complete essay unit",
  );
  assert.equal(peirceIdeasUnit.work.en, "How to Make Our Ideas Clear");
  assert.equal(peirceIdeasUnit.locator.structureKey, "whole-work");
  assert.match(
    publicIndex.thoughtMap["peirce-reality-community-inquiry"].locator.en,
    /How to Make Our Ideas Clear.*§IV/iu,
  );

  const peirceAbductionUnit = unitForThought("peirce-abduction");
  assert.equal(peirceAbductionUnit.work.en, "Pragmatism and Abduction");
  assert.equal(peirceAbductionUnit.locator.structureKey, "section-2");
  assert.match(
    publicIndex.thoughtMap["peirce-abduction"].locator.en,
    /Harvard Lectures on Pragmatism VII.*§2/iu,
  );

  const pavlovComposite = unitForThought("psychology-foundations-pavlov-acquisition-extinction");
  assert.equal(pavlovComposite.locator.structureKey, "lectures-ii-and-iv");
  assert.notEqual(pavlovComposite.id, unitForThought("psychology-foundations-pavlov-signal").id);
  assert.deepEqual(
    pavlovComposite.source.segments?.map(({ url }) => new URL(url).pathname),
    ["/Pavlov/lecture2.htm", "/Pavlov/lecture4.htm"],
  );
  assert.match(
    publicIndex.thoughtMap["psychology-foundations-pavlov-acquisition-extinction"].locator.en,
    /Lecture II.*Lecture IV/iu,
  );

  const tractatusComposite = unitForThought("wittgenstein-picture-reality");
  assert.equal(tractatusComposite.locator.structureKey, "major-propositions-2-and-4");
  assert.deepEqual(
    tractatusComposite.source.segments?.map(({ url }) => new URL(url).pathname),
    ["/wiki/Tractatus_Logico-Philosophicus/2", "/wiki/Tractatus_Logico-Philosophicus/4"],
  );
  assert.match(
    publicIndex.thoughtMap["wittgenstein-picture-reality"].locator.en,
    /2\.1.*4\.01/iu,
  );
});

test("anchor-only citations collapse into complete works, parts, books, or chapters", () => {
  assertSharedUnit(
    [
      "heraclitus",
      "heraclitus-character",
      "heraclitus-conflict",
      "heraclitus-logos",
      "heraclitus-river",
    ],
    "whole-work",
  );
  assertSharedUnit(
    [
      "parmenides",
      "parmenides-sayable",
      "parmenides-thinking-being",
      "parmenides-unchanging",
    ],
    "whole-work",
  );
  assertSharedUnit(
    ["berkeley", "berkeley-laws-signs", "berkeley-qualities", "berkeley-spirit"],
    "part-i",
  );
  assertSharedUnit(
    ["plato-knowledge-needs-account", "socrates-midwife-of-thought"],
    "whole-work",
  );
  assert.equal(unitForThought("socrates-midwife-of-thought").work.en, "Theaetetus");

  assertSharedUnit(
    ["science-mendel-design", "science-mendel-gametes", "science-mendel-ratios"],
    "whole-work",
  );
  assertSharedUnit(
    [
      "averroes",
      "averroes-interpretation",
      "averroes-truth",
    ],
    "part-i",
  );
  assertSharedUnit(
    [
      "economics-principles-jevons-equimarginal-allocation",
      "economics-principles-jevons-final-degree-utility",
    ],
    "chapter-iii",
  );
  assertSharedUnit(
    [
      "epicurus-gods-without-fear",
      "epicurus-limit-of-pleasure",
      "epicurus-pleasures-have-consequences",
    ],
    "whole-work",
  );
  assertSharedUnit(
    [
      "psychology-social-asch-central-traits",
      "psychology-social-asch-impression-whole",
      "psychology-social-asch-order",
    ],
    "whole-work",
  );
  assertSharedUnit(
    [
      "wittgenstein",
      "wittgenstein-beetle-box",
      "wittgenstein-family-resemblance",
      "wittgenstein-fly-bottle",
      "wittgenstein-language-games",
      "wittgenstein-private-diary",
      "wittgenstein-rule-practice",
    ],
    "part-i",
  );
  assertSharedUnit(
    ["wittgenstein-aspect-seeing", "wittgenstein-lion"],
    "part-ii",
  );

  assertSharedUnit(
    [
      "mao-concrete-analysis",
      "mao-contradiction",
      "mao-contradiction-particular",
      "mao-contradiction-universal",
      "mao-internal-external-causes",
      "mao-oppose-one-sidedness",
      "mao-principal-aspect-shifts",
    ],
    "whole-work",
  );
  assertSharedUnit(
    [
      "anscombe-directions-of-fit",
      "anscombe-intention-why",
      "anscombe-practical-knowledge",
    ],
    "whole-work",
  );
  assertSharedUnit(
    ["wittgenstein-doubt-background", "wittgenstein-hinge-certainty"],
    "whole-work",
  );

  assertSharedUnit(
    ["kant-disinterested-beauty", "kant-purposiveness-without-purpose"],
    "part-i-book-i",
  );
  assert.equal(
    unitForThought("hegel-ethical-life").locator.structureKey,
    "part-iii-named-section-ethical-life-introduction",
  );
  assertSharedUnit(
    ["hegel-civil-society-dependence", "hegel-poverty-rabble"],
    "part-iii-named-section-civil-society",
  );
  assert.equal(
    unitForThought("hegel-state-concrete-freedom").locator.structureKey,
    "part-iii-named-section-the-state",
  );
  assertSharedUnit(
    [
      "science-popper-falsifiability",
      "science-popper-induction",
      "science-popper-intersubjective-testing",
    ],
    "part-i-chapter-1",
  );
  assert.equal(
    unitForThought("science-popper-empirical-risk").locator.structureKey,
    "part-ii-chapter-6",
  );

  assertSharedUnit(
    ["schopenhauer", "schopenhauer-principle-sufficient-reason"],
    "book-i",
  );
  assertSharedUnit(
    ["schopenhauer-blind-striving", "schopenhauer-body-and-will"],
    "book-ii",
  );
  assertSharedUnit(
    [
      "schopenhauer-aesthetic-contemplation",
      "schopenhauer-desire-suffering",
      "schopenhauer-music-will",
    ],
    "book-iii",
  );
  assert.equal(
    unitForThought("schopenhauer-denial-of-will").locator.structureKey,
    "book-iv",
  );

  const forbiddenAnchorUnit = /^(?:abstract|fragment|proposition|aphorism|verse|paragraph|point|rule|query)-/u;
  assert.deepEqual(
    publicIndex.units
      .filter((unit) => forbiddenAnchorUnit.test(unit.locator.structureKey))
      .map((unit) => unit.id),
    [],
  );

  const allowedSectionWorks = [
    "A Compendium on the Soul",
    "An Enquiry Concerning Human Understanding",
    "An Enquiry Concerning the Principles of Morals",
    "Brihadaranyaka Upanishad",
    "Chandogya Upanishad",
    "Deliverance from Error (translated in 1909 as The Confessions of Al Ghazzali)",
    "Groundwork of the Metaphysics of Morals",
    "Katha Upanishad",
    "Pragmatism and Abduction",
  ];
  assert.deepEqual(
    [...new Set(
      publicIndex.units
        .filter((unit) => unit.locator.structureKey.startsWith("section-"))
        .map((unit) => unit.work.en),
    )].sort(),
    allowedSectionWorks,
    "only genuine top-level sections may remain reading-unit boundaries",
  );

  const tractatusUnits = publicIndex.units.filter(
    (unit) => unit.locator.structureKey.startsWith("major-proposition-"),
  );
  assert.equal(tractatusUnits.length, 5);
  assert.equal(tractatusUnits.every((unit) => (
    unit.work.en === "Tractatus Logico-Philosophicus"
      && /\/Tractatus_Logico-Philosophicus\/\d$/u.test(new URL(unit.source.url).pathname)
  )), true, "Tractatus major propositions remain because each source page is a top-level part");

  const yogaVivekananda = unitForThought("indian-yoga-four-attitudes");
  const yogaWoods = unitForThought("indian-yoga-stilling-fluctuations");
  assert.equal(yogaVivekananda.locator.structureKey, "book-i");
  assert.equal(yogaWoods.locator.structureKey, "book-i");
  assert.notEqual(yogaVivekananda.id, yogaWoods.id);
  assert.notEqual(yogaVivekananda.source.url, yogaWoods.source.url);
  assert.notEqual(yogaVivekananda.edition.en, yogaWoods.edition.en);

  assert.equal(
    unitForThought("science-newton-no-feigned-hypothesis").locator.structureKey,
    "book-iii-named-section-general-scholium",
  );
  const watsonInfantEnvironment = unitForThought(
    "psychology-foundations-watson-infant-environment",
  );
  assert.equal(watsonInfantEnvironment.locator.structureKey, "chapter-v");
  assert.match(watsonInfantEnvironment.locator.en, /Part I$/u);
  assertSharedUnit(
    [
      "science-newton-rule-fourth",
      "science-newton-rules-causes",
    ],
    "book-iii-named-section-rules-of-reasoning-in-philosophy",
  );

  assert.match(publicIndex.thoughtMap.heraclitus.locator.en, /DK 22 B2/iu);
  assert.match(publicIndex.thoughtMap["berkeley-spirit"].locator.en, /§27/iu);
  assert.match(publicIndex.thoughtMap["wittgenstein-beetle-box"].locator.en, /§293/iu);
});

test("known long structured works never fall back to whole-work", () => {
  const longStructuredWorks = new Set([
    "A Treatise of Human Nature",
    "Behaviorism",
    "Critique of the Power of Judgment",
    "Dialogue Concerning the Two Chief World Systems",
    "Discourses and Mathematical Demonstrations Relating to Two New Sciences",
    "Economic and Philosophic Manuscripts of 1844",
    "Elements of the Philosophy of Right",
    "Groundwork of the Metaphysics of Morals",
    "Human Nature and Conduct",
    "Nationalism",
    "Outlines of Psychology",
    "Phenomenology of Spirit",
    "Philosophical Investigations",
    "Repetition",
    "Sidereus Nuncius",
    "Summa Theologiae",
    "The Logic of Hegel",
    "The Logic of Scientific Discovery",
    "The Passions of the Soul",
    "The Present Situation in Quantum Mechanics",
    "The Republic",
    "The World as Will and Representation, Volume I",
    "Tractatus Logico-Philosophicus",
    "Twilight of the Idols",
  ]);
  const fallbacks = publicIndex.units
    .filter((unit) => longStructuredWorks.has(unit.work.en))
    .filter((unit) => unit.locator.structureKey === "whole-work")
    .map((unit) => `${unit.work.en}: ${unit.thoughtIds.join(", ")}`);
  assert.deepEqual(fallbacks, []);
});
