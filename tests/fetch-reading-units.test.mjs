import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, writeFile, mkdir } from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import test from "node:test";

import {
  applySourceOverride,
  bilaraRawUrlFor,
  extractBilaraJsonParagraphs,
  extractHtmlParagraphs,
  extractTextParagraphs,
  fetchArchiveTextSource,
  fetchBilaraSource,
  fetchGutenbergSource,
  fetchMediaWikiSource,
  fetchRemoteSource,
  gutenbergMirrorCandidates,
  loadSourceOverrides,
  matchCardAnchors,
  mediaWikiApiUrlFor,
  parseArguments,
  ReadingUnitPipelineError,
  runReadingUnitPipeline,
  selectQuoteGuidedBoundary,
  selectReadingUnitParagraphs,
  validateRemoteUrl,
} from "../scripts/fetch-reading-units.mjs";

async function temporaryProject(t) {
  const root = await mkdtemp(resolve(tmpdir(), "agora-readings-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  return root;
}

function fixtureInventory(source = {}) {
  const unitId = "ru-attention-chapter-ii-deadbeef";
  return {
    schemaVersion: 1,
    generatedOn: "2026-08-28",
    catalogThoughtCount: 1,
    verifiedThoughtCount: 1,
    unitCount: 1,
    thoughtMap: {
      "fixture-attention": {
        unitId,
        locator: { zh: "第二章", en: "Chapter II: Attention" },
        originalField: "english",
        useBasis: "public-domain",
      },
    },
    units: [{
      id: unitId,
      work: { zh: "《心理学原理》", en: "The Principles of Psychology" },
      libraryIds: ["psychology"],
      availability: "integrated-candidate",
      locator: {
        structureKey: "chapter-ii-attention",
        zh: "第二章：注意",
        en: "Chapter II: Attention",
      },
      source: {
        url: "https://example.com/attention.html",
        label: "原典",
        englishLabel: "Primary text",
        additionalLinks: [],
        ...source,
      },
      edition: { zh: "1890年版", en: "1890 edition" },
      useBasisKinds: ["public-domain"],
      thoughtIds: ["fixture-attention"],
      expectedUnitFile: {
        publicPath: `public/readings/units/${unitId}.json`,
        href: `/readings/units/${unitId}.json`,
      },
    }],
  };
}

const fixtureHtml = `<!doctype html>
  <html><body>
    <nav>Home Download Share</nav>
    <main>
      <h1>THE PRINCIPLES OF PSYCHOLOGY</h1>
      <h2>Chapter I: Scope</h2>
      <p>This introductory chapter is deliberately outside the requested unit.</p>
      <h2>Chapter II: Attention</h2>
      <p>Attention is the taking possession by the mind, in clear and vivid form, of one out of what seem several simultaneously possible objects.</p>
      <p>It implies withdrawal from some things in order to deal effectively with others. This second paragraph makes the fixture long enough to resemble a real reading unit.</p>
      <h2>Chapter III: Habit</h2>
      <p>This next chapter must not leak into the selected unit.</p>
      <script>window.secret = "must disappear";</script>
    </main>
  </body></html>`;

test("HTML cleanup removes page chrome and selects a bounded heading section", () => {
  const paragraphs = extractHtmlParagraphs(fixtureHtml);
  assert.equal(paragraphs.some(({ text }) => text.includes("window.secret")), false);
  assert.equal(paragraphs.some(({ text }) => text.includes("Home Download")), false);

  const selection = selectReadingUnitParagraphs(
    paragraphs,
    fixtureInventory().units[0],
  );
  assert.equal(selection.selectionMethod, "matched-heading");
  assert.match(selection.paragraphs[0].text, /Chapter II: Attention/);
  assert.equal(selection.paragraphs.some(({ text }) => text.includes("Chapter III")), false);
  assert.equal(selection.paragraphs.some(({ text }) => text.includes("introductory chapter")), false);
});

test("HTML named Greek and mathematical entities decode before anchor matching", () => {
  const paragraphs = extractHtmlParagraphs(
    "<main><p>The function &phi;(x) &ne; 0 while &Phi; remains\u200B fixed.</p></main>",
  );
  assert.equal(paragraphs[0].text, "The function φ(x) ≠ 0 while Φ remains fixed.");
  const matched = matchCardAnchors(paragraphs, {
    card: "The function φ(x) ≠ 0 while Φ remains fixed.",
  });
  assert.equal(matched.anchors.card.paragraphId, "p0001");
});

test("EnglishPhilosophy extracts only Locke text block content", () => {
  const paragraphs = extractHtmlParagraphs(`
    <main>
      <dialog><div class="content"><p>Search modal noise.</p></div></dialog>
      <div class="text-display">
        <div class="blocks"><div class="block" id="1">
          <div class="id">Locke.EHU.2.1</div>
          <div class="content"><h1>CHAP. I.</h1><h2>Of Ideas in general.</h2></div>
        </div></div>
        <div class="blocks"><div class="block" id="2">
          <div class="id">Locke.EHU.2.1.2</div>
          <div class="content"><p>All our Knowledge is founded in Experience.</p></div>
        </div></div>
      </div>
    </main>
  `, { sourceUrl: "https://englishphilosophy.org/locke/ehu/2/1" });
  assert.deepEqual(paragraphs, [
    { text: "CHAP. I.", headingLevel: 1 },
    { text: "Of Ideas in general.", headingLevel: 2 },
    { text: "All our Knowledge is founded in Experience." },
  ]);
});

test("Wikisource cleanup removes navigation and license templates but preserves section text", () => {
  const paragraphs = extractHtmlParagraphs(`
    <main>
      <p>← Previous chapter Work title Current chapter Author Next chapter →</p>
      <p>姊妹計劃: 維基百科條目</p>
      <p>版本資訊</p>
      <p>橫排 · 直排</p>
      <p>This page has been proofread, but needs to be validated.</p>
      <p>For other English-language translations of this work, see Theaetetus.</p>
      <p>This work is a translation and has a separate copyright status to the applicable copyright protections of the original content.</p>
      <p>Original:</p>
      <p>Translation:</p>
      <p>Easy to print version.</p>
      <p>1</p>
      <p>惻隱之心，仁之端也；羞惡之心，義之端也。</p>
      <p>38</p>
      <p>◄ ↑返回頂部 ►</p>
      <p>此作品在全世界都属于公有领域，因为作者逝世已经超过100年。</p>
      <p>此北宋作品在全世界都属于公有领域。</p>
      <p>Public domain Public domain false false</p>
      <p>This work is in the public domain worldwide because the author died many years ago.</p>
      <p>The longest-living author of this work died long ago, so it is in the public domain.</p>
    </main>
  `, { sourceUrl: "https://zh.wikisource.org/wiki/example" });
  assert.deepEqual(paragraphs.map(({ text }) => text), [
    "1",
    "惻隱之心，仁之端也；羞惡之心，義之端也。",
    "38",
  ]);
});

test("Wikisource cleanup drops catalog headers before the natural unit", () => {
  const paragraphs = extractHtmlParagraphs(`
    <main>
      <p>From Wikisource, the free online library.</p>
      <p>Layout 2</p>
      <p>James Clerk Maxwell 123456 On Faraday's Lines of Force — 1855</p>
      <p>A scan-backed, verifiable version of this work can be edited at Index:Example.djvu.</p>
      <p>If you would like to help, please see Help:Match and split and Help:Proofread.</p>
      <p>Source: Philosophical Magazine, 1856.</p>
      <h2>Introduction</h2>
      <p>The substantive opening remains intact.</p>
    </main>
  `, { sourceUrl: "https://en.wikisource.org/wiki/Example" });
  assert.deepEqual(paragraphs, [
    { text: "Source: Philosophical Magazine, 1856." },
    { text: "Introduction", headingLevel: 2 },
    { text: "The substantive opening remains intact." },
  ]);
});

test("known reading-host chrome is removed without discarding substantive text", () => {
  const paragraphs = extractHtmlParagraphs(`
    <main>
      <p>The substantive final paragraph remains intact.</p>
      <p>Comments? Suggestions? Please raise them here. Do not click this link.</p>
      <p>CONTACT US | ADVERTISE WITH NEW ADVENT</p>
      <p>Categories: Ancient philosophy | Source texts</p>
      <p>VIEWNAME is workSection</p>
      <p>Digitized by Google</p>
    </main>
  `);
  assert.deepEqual(paragraphs.map(({ text }) => text), [
    "The substantive final paragraph remains intact.",
  ]);
});

test("plain-text prose beginning with a structural phrase is not promoted to a heading", () => {
  const paragraphs = extractTextParagraphs(`
CHAPTER IX. THE STREAM OF THOUGHT

This is the real chapter body.

Chapter XII we shall have to take up this question again.

one part of the country exchanges produce with another.

CHAPTER X. THE CONSCIOUSNESS OF SELF
`);
  assert.deepEqual(paragraphs, [
    { text: "CHAPTER IX. THE STREAM OF THOUGHT", headingLevel: 4 },
    { text: "This is the real chapter body." },
    { text: "Chapter XII we shall have to take up this question again." },
    { text: "one part of the country exchanges produce with another." },
    { text: "CHAPTER X. THE CONSCIOUSNESS OF SELF", headingLevel: 4 },
  ]);
});

test("known source footers are removed without discarding substantive text", () => {
  const paragraphs = extractHtmlParagraphs(`
    <main>
      <p>Hegel-by-HyperText Home Page @ marxists.org</p>
      <p>The substantive final paragraph remains intact.</p>
      <p>&copy; 1994-2009</p>
      <p>&copy; textlog.de 2004 — 2026</p>
      <p>*** END OF THE PROJECT GUTENBERG EBOOK A SAMPLE ***</p>
    </main>
  `);
  assert.deepEqual(paragraphs.map(({ text }) => text), [
    "The substantive final paragraph remains intact.",
  ]);
});

test("repeated heading labels use card quotes to reject a table-of-contents occurrence", () => {
  const paragraphs = extractHtmlParagraphs(`
    <main>
      <h2>Contents</h2>
      <h3>Chapter II: Attention</h3><p>A short catalog annotation.</p>
      <h3>Chapter III: Habit</h3><p>Another catalog annotation.</p>
      <h2>Text</h2>
      <h3>Chapter II: Attention</h3>
      <p>Attention takes possession of one object while other objects recede from view.</p>
      <p>This is the full chapter context rather than a table-of-contents entry.</p>
      <h3>Chapter III: Habit</h3><p>The next chapter.</p>
    </main>
  `);
  const selection = selectReadingUnitParagraphs(paragraphs, fixtureInventory().units[0], {
    minimumUnitCharacters: 20,
    cardQuotes: {
      card: "Attention takes possession of one object while other objects recede from view.",
    },
  });
  assert.equal(selection.selectionMethod, "matched-heading");
  assert.equal(selection.paragraphs.some(({ text }) => text.includes("catalog annotation")), false);
  assert.equal(selection.paragraphs.some(({ text }) => text.includes("full chapter context")), true);
});

test("CText rows become clean bilingual paragraphs with quote-guided chapter boundaries", () => {
  const paragraphs = extractHtmlParagraphs(`
    <html><body><div id="menubar">About the site and thousands of navigation links</div>
    <div id="content3"><table>
      <tr id="n10"><td><a class="popup" href="#n10">10</a><a>Jump to dictionary</a></td><td class="ctext opt">道德經:</td><td class="ctext">載營魄抱一，能無離乎？</td></tr>
      <tr><td></td><td class="etext opt">Dao De Jing:</td><td class="etext">When the intelligent and animal souls are held together, can they be kept from separating?</td></tr>
      <tr id="n11"><td><a href="#n11" class="popup">11</a><a>Show commentary</a></td><td class="ctext opt">道德經:</td><td class="ctext">三十輻共一轂，當其無，有車之用。</td></tr>
      <tr><td></td><td class="etext opt">Dao De Jing:</td><td class="etext">The thirty spokes unite in the one nave; but it is on the empty space that the use of the wheel depends.</td></tr>
      <tr id="n12"><td><a class="popup" href="#n12">12</a></td><td class="ctext opt">道德經:</td><td class="ctext">五色令人目盲。</td></tr>
      <tr><td></td><td class="etext opt">Dao De Jing:</td><td class="etext">Colour's five hues from the eyes their sight will take.</td></tr>
    </table></div><footer>Site legal chrome</footer></body></html>
  `, { sourceUrl: "https://ctext.org/dao-de-jing" });
  assert.equal(paragraphs.some(({ text }) => text.includes("navigation links")), false);
  assert.equal(paragraphs.some(({ text }) => text.includes("Jump to dictionary")), false);
  const unit = fixtureInventory().units[0];
  unit.locator = { structureKey: "chapter-11", zh: "第十一章", en: "Chapter 11" };
  const selection = selectQuoteGuidedBoundary(paragraphs, unit, {
    zh: "三十辐共一毂，当其无，有车之用。",
    en: "The thirty spokes unite in the one nave; but it is on the empty space that the use of the wheel depends.",
  }, { minimumUnitCharacters: 20 });
  assert.equal(selection.selectionMethod, "quote-guided-boundary");
  assert.equal(selection.paragraphs[0].text, "[11]");
  assert.equal(selection.paragraphs.some(({ text }) => text === "[12]"), false);
  assert.equal(selection.paragraphs.some(({ text }) => text.includes("thirty spokes")), true);
});

test("quote-guided boundary selection stays bounded across many repeated chapter labels", {
  timeout: 2_000,
}, () => {
  const paragraphs = [];
  for (let book = 1; book <= 2_000; book += 1) {
    paragraphs.push({ text: `Book ${book}`, headingLevel: 2 });
    paragraphs.push({ text: "Chapter 2", headingLevel: 3 });
    paragraphs.push({
      text: book === 2_000
        ? "The uniquely anchored sentence belongs to the final requested book and its complete chapter context."
        : `Unrelated body text for book ${book}, deliberately sharing the same chapter label.`,
    });
  }
  const unit = fixtureInventory().units[0];
  unit.locator = {
    structureKey: "book-2000-chapter-2",
    zh: "第二千卷第二章",
    en: "Book 2000, Chapter 2",
  };
  const selection = selectQuoteGuidedBoundary(paragraphs, unit, {
    card: "The uniquely anchored sentence belongs to the final requested book",
  }, { minimumUnitCharacters: 20 });
  assert.equal(selection.selectionMethod, "quote-guided-boundary");
  assert.equal(selection.paragraphs[0].text, "Chapter 2");
  assert.equal(selection.paragraphs.some(({ text }) => text.includes("uniquely anchored")), true);
});

test("MIT Classics crops start/end chrome and promotes standalone Part labels", () => {
  const paragraphs = extractHtmlParagraphs(`
    <html><body><table><tr><td>Home</td><td>Browse and Comment</td><td>Search</td></tr></table>
    <a name="start"></a>
    <a name="10"></a><b>Part 1</b><br><br>
    The soul is in a way all existing things, and this paragraph supplies its context.<br><br>
    A second paragraph keeps the complete argument together for reading.<br><br>
    <a name="20"></a><b>Part 2</b><br><br>The next part must be excluded.
    <a name="end"></a><hr><a>Table of Contents</a><p>Copyright and permissions chrome.</p>
    </body></html>
  `, { sourceUrl: "https://classics.mit.edu/Aristotle/soul.2.ii.html" });
  const unit = fixtureInventory().units[0];
  unit.locator = {
    structureKey: "book-ii-chapter-1",
    zh: "第二卷第一章",
    en: "Book II, Chapter 1",
  };
  const selection = selectReadingUnitParagraphs(paragraphs, unit, {
    minimumUnitCharacters: 20,
  });
  assert.equal(selection.selectionMethod, "matched-heading");
  assert.equal(selection.paragraphs[0].text, "Part 1");
  assert.equal(selection.paragraphs.some(({ text }) => text.includes("next part")), false);
  assert.equal(selection.paragraphs.some(({ text }) => text.includes("Copyright")), false);
  assert.equal(selection.paragraphs.some(({ text }) => text === "Home"), false);
});

test("Project Gutenberg start/end markers remove headers and license appendix", () => {
  const paragraphs = extractTextParagraphs(`
Title: A Sample Work
Project Gutenberg administrative header

*** START OF THE PROJECT GUTENBERG EBOOK A SAMPLE WORK ***

CHAPTER I

The primary text begins here and continues with enough context to be useful.

*** END OF THE PROJECT GUTENBERG EBOOK A SAMPLE WORK ***

The Project Gutenberg License and donation instructions.
  `);
  assert.equal(paragraphs.some(({ text }) => text.includes("administrative header")), false);
  assert.equal(paragraphs.some(({ text }) => text.includes("donation instructions")), false);
  assert.equal(paragraphs.some(({ text }) => text.includes("primary text begins")), true);
});

test("legacy Project Gutenberg small-print envelopes and unstarred end markers are removed", () => {
  const paragraphs = extractTextParagraphs(`
Project Gutenberg header, producer notes, and legal preface.

***START**THE SMALL PRINT!**FOR PUBLIC DOMAIN ETEXTS**START***
The old license occupies many paragraphs.
*END THE SMALL PRINT! FOR PUBLIC DOMAIN ETEXTS*Ver.12.12.00*END*

BOOK I
CHAPTER 1

The public-domain work starts here and retains its complete chapter context.

End of The Project Gutenberg Etext of A Sample Work
The old donation and redistribution appendix must not remain.
  `);
  assert.equal(paragraphs.some(({ text }) => text.includes("legal preface")), false);
  assert.equal(paragraphs.some(({ text }) => text.includes("old license")), false);
  assert.equal(paragraphs.some(({ text }) => text.includes("donation and redistribution")), false);
  assert.equal(paragraphs.some(({ text }) => text.includes("public-domain work starts")), true);
});

test("Gutenberg extraction removes inline numeric references but preserves footnote blocks", () => {
  const paragraphs = extractTextParagraphs(`
FIRST BOOK

Beauty is perceived without[22] purpose, is _approved_[23], and supports another claim [24].

[22] This footnote explains the phrase without purpose.

[23] This footnote follows a closing emphasis marker.

[24] This footnote follows a space but remains a separate source paragraph here.
  `, { sourceUrl: "https://gutenberg.pglaf.org/4/8/4/3/48433/48433-0.txt" });
  assert.deepEqual(paragraphs.map(({ text }) => text), [
    "FIRST BOOK",
    "Beauty is perceived without purpose, is _approved_, and supports another claim.",
    "[22] This footnote explains the phrase without purpose.",
    "[23] This footnote follows a closing emphasis marker.",
    "[24] This footnote follows a space but remains a separate source paragraph here.",
  ]);
});

test("plain-text ordinal SERIES headings remain standalone override boundaries", () => {
  const paragraphs = extractTextParagraphs(`
                     NINETEENTH SERIES .
The first OCR line follows without a blank separator and contains the registered source passage.
The next OCR line continues the complete experimental discussion in the same section.
               TWENTY-EIGHTH SERIES1.
The later series must not be included.
  `);
  assert.equal(paragraphs[0].text, "NINETEENTH SERIES .");
  assert.equal(paragraphs[0].headingLevel, 2);
  assert.equal(paragraphs.some(({ text }) => text === "TWENTY-EIGHTH SERIES1."), true);
  const unit = fixtureInventory().units[0];
  unit.source.startPattern = "^NINETEENTH SERIES\\s*\\.?$";
  unit.source.endPattern = "^TWENTY-EIGHTH SERIES\\d?\\.?$";
  const selection = selectReadingUnitParagraphs(paragraphs, unit, {
    minimumUnitCharacters: 20,
  });
  assert.equal(selection.selectionMethod, "configured-pattern");
  assert.equal(selection.paragraphs[0].text, "NINETEENTH SERIES .");
  assert.equal(selection.paragraphs.some(({ text }) => text.includes("later series")), false);
});

test("hierarchical structure keys select a chapter inside the correct book", () => {
  const paragraphs = extractHtmlParagraphs(`
    <main>
      <h2>Book I</h2><h3>Chapter 13</h3><p>Wrong book.</p>
      <h2>Book II</h2><h3>Chapter 12</h3><p>Before.</p>
      <h3>Chapter 13</h3><p>The intended argument and its supporting context belong here.</p>
      <h3>Chapter 14</h3><p>After.</p>
    </main>
  `);
  const unit = fixtureInventory().units[0];
  unit.locator = {
    structureKey: "book-ii-chapter-13",
    zh: "第二卷第十三章",
    en: "Book II, Chapter 13",
  };
  const selection = selectReadingUnitParagraphs(paragraphs, unit, {
    minimumUnitCharacters: 20,
  });
  assert.equal(selection.selectionMethod, "matched-heading");
  assert.equal(selection.paragraphs.some(({ text }) => text === "Wrong book."), false);
  assert.equal(selection.paragraphs.some(({ text }) => text === "Before."), false);
  assert.equal(selection.paragraphs.some(({ text }) => text === "After."), false);
  assert.equal(
    selection.paragraphs.some(({ text }) => text.includes("intended argument")),
    true,
  );
});

test("Roman inventory locators match Arabic source headings without swapping hierarchy", () => {
  const paragraphs = extractHtmlParagraphs(`
    <main>
      <h2>BOOK 4</h2><h3>CHAPTER 2</h3><p>The reversed hierarchy is not the requested unit.</p>
      <h2>BOOK 2</h2><h3>CHAPTER 3</h3><p>The preceding chapter.</p>
      <h3>CHAPTER 4</h3><p>The intended Roman-numbered locator resolves to this Arabic-numbered chapter and keeps its full context.</p>
      <h3>CHAPTER 5</h3><p>The following chapter.</p>
    </main>
  `);
  const unit = fixtureInventory().units[0];
  unit.locator = {
    structureKey: "book-ii-chapter-iv",
    zh: "第二卷第四章",
    en: "Book II, Chapter IV",
  };
  const selection = selectReadingUnitParagraphs(paragraphs, unit, {
    minimumUnitCharacters: 20,
  });
  assert.equal(selection.selectionMethod, "matched-heading");
  assert.equal(selection.paragraphs[0].text, "CHAPTER 4");
  assert.equal(selection.paragraphs.some(({ text }) => text.includes("reversed hierarchy")), false);
  assert.equal(selection.paragraphs.some(({ text }) => text.includes("following chapter")), false);
});

test("plain-text Book, Part, Chapter, and Section labels preserve hierarchy", () => {
  const paragraphs = extractTextParagraphs(`
BOOK 4
PART 1
CHAPTER 2
Wrong reversed hierarchy.

BOOK 2
PART 3
CHAPTER 3
The preceding chapter.

CHAPTER 4
SECTION 1
The intended Roman locator resolves to this Arabic plain-text chapter with complete context.

CHAPTER 5
The following chapter.
  `);
  assert.deepEqual(
    paragraphs.filter(({ headingLevel }) => headingLevel).map(({ text, headingLevel }) => ({ text, headingLevel })),
    [
      { text: "BOOK 4", headingLevel: 2 },
      { text: "PART 1", headingLevel: 3 },
      { text: "CHAPTER 2", headingLevel: 4 },
      { text: "BOOK 2", headingLevel: 2 },
      { text: "PART 3", headingLevel: 3 },
      { text: "CHAPTER 3", headingLevel: 4 },
      { text: "CHAPTER 4", headingLevel: 4 },
      { text: "SECTION 1", headingLevel: 5 },
      { text: "CHAPTER 5", headingLevel: 4 },
    ],
  );
  const unit = fixtureInventory().units[0];
  unit.locator = {
    structureKey: "book-ii-part-iii-chapter-iv",
    zh: "第二卷第三部第四章",
    en: "Book II, Part III, Chapter IV",
  };
  const selection = selectReadingUnitParagraphs(paragraphs, unit, {
    minimumUnitCharacters: 20,
  });
  assert.equal(selection.selectionMethod, "matched-heading");
  assert.equal(selection.paragraphs[0].text, "CHAPTER 4");
  assert.equal(selection.paragraphs.some(({ text }) => text.includes("reversed hierarchy")), false);
  assert.equal(selection.paragraphs.some(({ text }) => text.includes("following chapter")), false);
});

test("plain-text number words and ordinal-first essays match numeric locators without body false positives", () => {
  const paragraphs = extractTextParagraphs(`
BOOK SECOND
CHAPTER THREE
The preceding chapter.

CHAPTER FOUR: Education as Growth
The intended chapter gives the complete argument and enough context for selection.
People may take
part in the inquiry without this wrapped body line becoming a heading.

CHAPTER FIVE
The following chapter.

FIRST ESSAY. GOOD AND EVIL
The first essay has its own bounded argument and complete context.
SECOND ESSAY. GUILT
The second essay follows.
  `);
  assert.equal(
    paragraphs.some(({ text, headingLevel }) => text.startsWith("part in") && headingLevel),
    false,
  );
  const chapterUnit = fixtureInventory().units[0];
  chapterUnit.locator = {
    structureKey: "book-ii-chapter-iv",
    zh: "第二卷第四章",
    en: "Book II, Chapter IV",
  };
  const chapter = selectReadingUnitParagraphs(paragraphs, chapterUnit, {
    minimumUnitCharacters: 20,
  });
  assert.equal(chapter.paragraphs[0].text, "CHAPTER FOUR: Education as Growth");
  assert.equal(chapter.paragraphs.some(({ text }) => text.includes("following chapter")), false);

  const essayUnit = fixtureInventory().units[0];
  essayUnit.locator = {
    structureKey: "essay-first",
    zh: "第一篇",
    en: "Essay First",
  };
  const essay = selectReadingUnitParagraphs(paragraphs, essayUnit, {
    minimumUnitCharacters: 20,
  });
  assert.equal(essay.paragraphs[0].text, "FIRST ESSAY. GOOD AND EVIL");
  assert.equal(essay.paragraphs.some(({ text }) => text.includes("second essay follows")), false);
});

test("a whole-work route can use the work title to crop one essay from a volume", () => {
  const paragraphs = extractHtmlParagraphs(`
    <main>
      <h2>前篇</h2><p>Unrelated material before the essay.</p>
      <h2>童心說</h2><p>夫童心者，真心也。這是本篇的連續論證與必要語境。</p>
      <p>本篇的第二段仍應保留，以形成完整閱讀單元。</p>
      <h2>後篇</h2><p>Unrelated material after the essay.</p>
    </main>
  `);
  const unit = fixtureInventory().units[0];
  unit.work = { zh: "《焚书·童心说》", en: "A Book to Burn, On the Childlike Heart" };
  unit.locator = { structureKey: "whole-work", zh: "全篇", en: "Whole work" };
  const selection = selectReadingUnitParagraphs(paragraphs, unit, {
    minimumUnitCharacters: 20,
  });
  assert.equal(selection.selectionMethod, "matched-heading");
  assert.equal(selection.paragraphs.some(({ text }) => text.includes("before")), false);
  assert.equal(selection.paragraphs.some(({ text }) => text.includes("after")), false);
  assert.equal(selection.paragraphs.some(({ text }) => text.includes("完整閱讀單元")), true);

  unit.locator = {
    structureKey: "named-chapter-on-the-childlike-heart",
    zh: "篇 On the Childlike Heart",
    en: "Chapter On the Childlike Heart",
  };
  const namedSelection = selectReadingUnitParagraphs(paragraphs, unit, {
    minimumUnitCharacters: 20,
  });
  assert.equal(namedSelection.selectionMethod, "matched-heading");
  assert.equal(namedSelection.paragraphs.some(({ text }) => text.includes("before")), false);
});

test("anchor matching records real offsets and leaves a failed quote explicit", () => {
  const result = matchCardAnchors(
    [{ text: "The mind’s attention—when sustained—changes what is noticed." }],
    {
      matched: "the mind's attention - when sustained - changes what is noticed",
      missing: "Words that do not occur in the paragraph",
    },
  );
  assert.equal(result.anchors.matched.paragraphId, "p0001");
  assert.equal(result.anchors.matched.match, "punctuation-insensitive");
  assert.equal(
    result.paragraphs[0].text.slice(
      result.anchors.matched.start,
      result.anchors.matched.end,
    ),
    "The mind’s attention—when sustained—changes what is noticed",
  );
  assert.deepEqual(result.anchors.missing, {
    quote: "Words that do not occur in the paragraph",
    match: "unmatched",
  });

  const traditional = matchCardAnchors(
    [{ text: "夫童心者，真心也。若以童心為不可，是以真心為不可也。夫童心者，絕假純真，最初一念之本心也。" }],
    { card: "夫童心者，真心也。若以童心为不可，是以真心为不可也。夫童心者，绝假纯真，最初一念之本心也。" },
  );
  assert.equal(traditional.anchors.card.paragraphId, "p0001");
  assert.equal(traditional.anchors.card.match, "normalized-exact");

  const footnoted = matchCardAnchors(
    [{ text: "Beauty is the form of the purposiveness of an object, so far as this is perceived in it without[22] purpose." }],
    { card: "Beauty is the form of the purposiveness of an object, so far as this is perceived in it without purpose." },
  );
  assert.equal(footnoted.anchors.card.paragraphId, "p0001");
  assert.equal(footnoted.anchors.card.match, "normalized-exact");
  assert.deepEqual(footnoted.anchors.card.segments.map(({ text }) => text), [
    "Beauty is the form of the purposiveness of an object, so far as this is perceived in it without",
    "purpose.",
  ]);

  const editorialAnnotations = matchCardAnchors([{
    text: "Further, you are a citizen of the world, not one of the subservient (serving), but one of the principal (ruling) parts.",
  }, {
    text: "To throw away self-conceit ([Greek: oiaesis]). For it is impossible to learn what one thinks one knows.",
  }, {
    text: "An ordinary parenthesis (changes the claim) remains part of the text.",
  }], {
    roles: "Further, you are a citizen of the world, not one of the subservient, but one of the principal parts.",
    greek: "To throw away self-conceit. For it is impossible to learn what one thinks one knows.",
    ordinary: "An ordinary parenthesis remains part of the text.",
  });
  assert.deepEqual(editorialAnnotations.anchors.roles.segments.map(({ text }) => text), [
    "Further, you are a citizen of the world, not one of the subservient",
    ", but one of the principal",
    "parts.",
  ]);
  assert.deepEqual(editorialAnnotations.anchors.greek.segments.map(({ text }) => text), [
    "To throw away self-conceit",
    ". For it is impossible to learn what one thinks one knows.",
  ]);
  assert.equal(editorialAnnotations.anchors.ordinary.match, "unmatched");

  const supplementaryPlaneMapping = matchCardAnchors([{
    text: "騞。依乎天理，批大郤，導大窾，因其固然。技",
  }], {
    card: "依乎天理，批大郤，导大窾，因其固然。",
  });
  const mappedAnchor = supplementaryPlaneMapping.anchors.card;
  assert.equal(mappedAnchor.start, supplementaryPlaneMapping.paragraphs[0].text.indexOf("依"));
  assert.equal(
    supplementaryPlaneMapping.paragraphs[0].text.slice(mappedAnchor.start, mappedAnchor.end),
    "依乎天理，批大郤，導大窾，因其固然。",
  );

  const punctuationInsensitiveBoundary = matchCardAnchors([{
    text: "前文心。欲者，血氣之自然，其好是懿德也，心知之自然，此孟子所以言性善。心後文",
  }], {
    card: "欲者，血气之自然；其好是懿德也，心知之自然。此孟子所以言性善。",
  });
  const boundedAnchor = punctuationInsensitiveBoundary.anchors.card;
  assert.equal(
    punctuationInsensitiveBoundary.paragraphs[0].text.slice(
      boundedAnchor.start,
      boundedAnchor.end,
    ),
    "欲者，血氣之自然，其好是懿德也，心知之自然，此孟子所以言性善。",
  );
});

test("anchor matching supports exact adjacent paragraphs and ordered ellipsis segments", () => {
  const adjacent = matchCardAnchors([
    { text: "The argument begins by distinguishing memory from present perception" },
    { text: "and then explains why the distinction matters for judgment." },
  ], {
    card: "The argument begins by distinguishing memory from present perception and then explains why the distinction matters for judgment.",
  });
  assert.equal(adjacent.anchors.card.paragraphId, "p0001");
  assert.equal(adjacent.anchors.card.match, "normalized-adjacent-paragraphs");
  assert.deepEqual(adjacent.anchors.card.segments.map(({ paragraphId }) => paragraphId), [
    "p0001",
    "p0002",
  ]);
  assert.equal(
    adjacent.paragraphs[0].text.slice(adjacent.anchors.card.start, adjacent.anchors.card.end),
    adjacent.anchors.card.segments[0].text,
  );

  const ellipsis = matchCardAnchors([
    { text: "The first exact segment establishes the premise before a long qualification." },
    { text: "Several omitted sentences carefully qualify the scope of the claim." },
    { text: "The final exact segment draws the conclusion without changing the premise." },
  ], {
    card: "The first exact segment establishes the premise … The final exact segment draws the conclusion",
  });
  assert.equal(ellipsis.anchors.card.paragraphId, "p0001");
  assert.equal(ellipsis.anchors.card.match, "ellipsis-ordered-segments");
  assert.deepEqual(ellipsis.anchors.card.segments.map(({ paragraphId }) => paragraphId), [
    "p0001",
    "p0003",
  ]);
  assert.equal(
    ellipsis.paragraphs[0].text.slice(ellipsis.anchors.card.start, ellipsis.anchors.card.end),
    "The first exact segment establishes the premise",
  );

  const sparseParagraphs = Array.from({ length: 24 }, (_, index) => ({
    text: index === 1
      ? "The first exact segment appears near the beginning."
      : index === 11
        ? "The second exact segment appears after a long omitted discussion."
        : index === 21
          ? "The third exact segment closes the bounded unit."
          : `Unquoted context paragraph ${index + 1}.`,
  }));
  const sparse = matchCardAnchors(sparseParagraphs, {
    card: "The first exact segment … The second exact segment … The third exact segment",
  });
  assert.equal(sparse.anchors.card.match, "ellipsis-ordered-segments");
  assert.deepEqual(
    sparse.anchors.card.segments.map(({ paragraphId }) => paragraphId),
    ["p0002", "p0012", "p0022"],
  );
  assert.deepEqual(
    sparse.anchors.card.segments.map(({ start, end, text }, index) => ({
      start,
      end,
      text,
      literal: sparse.paragraphs[[1, 11, 21][index]].text.slice(start, end),
    })),
    [
      { start: 0, end: 23, text: "The first exact segment", literal: "The first exact segment" },
      { start: 0, end: 24, text: "The second exact segment", literal: "The second exact segment" },
      { start: 0, end: 23, text: "The third exact segment", literal: "The third exact segment" },
    ],
  );

  const punctuatedSegments = matchCardAnchors([{
    text: "The premise is complete. Material omitted here: (1) Combining simple ideas makes a compound.",
  }], {
    card: "The premise is complete. ... (1) Combining simple ideas makes a compound.",
  });
  assert.deepEqual(punctuatedSegments.anchors.card.segments.map(({ text }) => text), [
    "The premise is complete.",
    "(1) Combining simple ideas makes a compound.",
  ]);

  const zeroWidth = matchCardAnchors([
    { text: "A picture agrees according ​ as its elements correspond with reality." },
  ], {
    card: "A picture agrees according as its elements correspond with reality.",
  });
  assert.equal(zeroWidth.anchors.card.paragraphId, "p0001");
  assert.equal(zeroWidth.anchors.card.match, "normalized-exact");

  const failClosed = matchCardAnchors([
    { text: "The final exact segment appears first." },
    { text: "Two words." },
    { text: "Another paragraph." },
    { text: "The first exact segment appears too late and outside a three-paragraph window." },
  ], {
    reversed: "The first exact segment … The final exact segment",
    tooShort: "Two … words",
  });
  assert.equal(failClosed.anchors.reversed.match, "unmatched");
  assert.equal(failClosed.anchors.tooShort.match, "unmatched");
});

test("pipeline writes a canonical lazy unit, records coverage, and resumes", async (t) => {
  const root = await temporaryProject(t);
  const localSource = "research/source-cache/attention.html";
  const inventory = fixtureInventory({ localPath: localSource });
  const inventoryPath = resolve(root, "research/reading-units/inventory.json");
  await mkdir(resolve(root, "research/source-cache"), { recursive: true });
  await mkdir(resolve(root, "research/reading-units"), { recursive: true });
  await writeFile(resolve(root, localSource), fixtureHtml);
  await writeFile(inventoryPath, `${JSON.stringify(inventory)}\n`);
  const thoughtById = new Map([[
    "fixture-attention",
    {
      id: "fixture-attention",
      english: "Attention is the taking possession by the mind, in clear and vivid form, of one out of what seem several simultaneously possible objects.",
      text: "注意是心灵以清晰鲜明的形式占有对象。",
    },
  ]]);

  const first = await runReadingUnitPipeline({ projectRoot: root, thoughtById });
  assert.equal(first.summary.written, 1);
  assert.equal(first.summary.anchorsMatched, 1);
  assert.equal(first.summary.failed, 0);

  const outputPath = resolve(
    root,
    inventory.units[0].expectedUnitFile.publicPath,
  );
  const body = JSON.parse(await readFile(outputPath, "utf8"));
  assert.equal(body.schemaVersion, 1);
  assert.equal(body.id, inventory.units[0].id);
  assert.equal(body.sourceUrl, inventory.units[0].source.url);
  assert.equal(Object.hasOwn(body, "preparedSourceUrl"), false);
  assert.match(body.contentHash, /^[0-9a-f]{64}$/u);
  assert.equal(body.anchors["fixture-attention"].paragraphId, "p0002");
  assert.equal(body.paragraphs.some(({ text }) => text.includes("Chapter III")), false);

  const second = await runReadingUnitPipeline({ projectRoot: root, thoughtById });
  assert.equal(second.summary.resumed, 1);
  assert.equal(second.summary.written, 0);
  const coverage = JSON.parse(await readFile(
    resolve(root, "research/reading-units/fetch-coverage.json"),
    "utf8",
  ));
  assert.equal(coverage.summary.anchorsMatched, 1);
});

test("a bounded natural chapter may exceed the 150k optimization threshold but stays under 600 KiB", async (t) => {
  const root = await temporaryProject(t);
  const localSource = "research/source-cache/long-chapter.html";
  const inventory = fixtureInventory({ localPath: localSource });
  inventory.units[0].locator = {
    structureKey: "book-ii-chapter-iv",
    zh: "第二卷第四章",
    en: "Book II, Chapter IV",
  };
  const source = `<main><h2>Book II</h2><h3>Chapter IV</h3><p>Natural chapter anchor. ${
    "Complete public-domain chapter context remains part of this reading unit. ".repeat(2_500)
  }</p><h3>Chapter V</h3><p>The next chapter is excluded.</p></main>`;
  await mkdir(resolve(root, "research/source-cache"), { recursive: true });
  await mkdir(resolve(root, "research/reading-units"), { recursive: true });
  await writeFile(resolve(root, localSource), source);
  await writeFile(
    resolve(root, "research/reading-units/inventory.json"),
    `${JSON.stringify(inventory)}\n`,
  );
  const report = await runReadingUnitPipeline({
    projectRoot: root,
    thoughtById: new Map([["fixture-attention", { english: "Natural chapter anchor." }]]),
  });
  assert.equal(report.summary.written, 1);
  assert.equal(report.units[0].characterCount > 150_000, true);
  assert.equal(report.units[0].publicByteCount <= 600 * 1024, true);
});

test("an explicit large-unit boundary remains authoritative instead of shrinking around its quote", async (t) => {
  const root = await temporaryProject(t);
  const localSource = "research/source-cache/explicit-long-chapter.txt";
  const inventory = fixtureInventory({ localPath: localSource });
  inventory.units[0].source.startPattern = "^CHAPTER X\\.$";
  inventory.units[0].source.endPattern = "^CHAPTER XI\\.$";
  const source = [
    "CHAPTER X.",
    "Natural chapter anchor.",
    `The chapter's complete later argument must remain present. ${"Bounded context. ".repeat(10_000)}`,
    "A final complete paragraph belongs to Chapter X.",
    "CHAPTER XI.",
    "The next chapter is excluded.",
  ].join("\n\n");
  await mkdir(resolve(root, "research/source-cache"), { recursive: true });
  await mkdir(resolve(root, "research/reading-units"), { recursive: true });
  await writeFile(resolve(root, localSource), source);
  await writeFile(
    resolve(root, "research/reading-units/inventory.json"),
    `${JSON.stringify(inventory)}\n`,
  );
  const report = await runReadingUnitPipeline({
    projectRoot: root,
    thoughtById: new Map([["fixture-attention", { english: "Natural chapter anchor." }]]),
  });
  assert.equal(report.summary.written, 1);
  const body = JSON.parse(await readFile(
    resolve(root, inventory.units[0].expectedUnitFile.publicPath),
    "utf8",
  ));
  assert.equal(body.selectionMethod, "configured-pattern");
  assert.match(body.paragraphs.at(-1).text, /^A final complete paragraph/u);
  assert.equal(body.paragraphs.some(({ text }) => text.includes("next chapter")), false);
});

test("serialized public reading units above 600 KiB fail closed and remove stale output", async (t) => {
  const root = await temporaryProject(t);
  const localSource = "research/source-cache/oversized-chapter.html";
  const inventory = fixtureInventory({ localPath: localSource });
  inventory.units[0].locator = {
    structureKey: "chapter-ii",
    zh: "第二章",
    en: "Chapter II",
  };
  const outputPath = resolve(root, inventory.units[0].expectedUnitFile.publicPath);
  const source = `<main><h2>Chapter II</h2><p>自然篇章锚点。${"文".repeat(210_000)}</p><h2>Chapter III</h2><p>后章。</p></main>`;
  await mkdir(resolve(root, "research/source-cache"), { recursive: true });
  await mkdir(resolve(root, "research/reading-units"), { recursive: true });
  await mkdir(resolve(root, "public/readings/units"), { recursive: true });
  await writeFile(resolve(root, localSource), source);
  await writeFile(outputPath, '{"stale":true}\n');
  await writeFile(
    resolve(root, "research/reading-units/inventory.json"),
    `${JSON.stringify(inventory)}\n`,
  );
  const report = await runReadingUnitPipeline({
    projectRoot: root,
    thoughtById: new Map([["fixture-attention", { english: "自然篇章锚点。" }]]),
  });
  assert.equal(report.summary.failed, 1);
  assert.equal(report.failures[0].reason, "unit-file-too-large");
  assert.equal(report.failures[0].details.publicByteCount > 600 * 1024, true);
  await assert.rejects(readFile(outputPath), { code: "ENOENT" });
});

test("compact JSON is used when formatting overhead alone would exceed the file gate", async (t) => {
  const root = await temporaryProject(t);
  const localSource = "research/source-cache/compact-chapter.html";
  const inventory = fixtureInventory({ localPath: localSource });
  const bodyParagraphs = Array.from({ length: 600 }, (_, index) => (
    `<p>${index === 0 ? "Compact unit anchor. " : ""}Context ${index}: ${"x".repeat(120)}</p>`
  )).join("");
  await mkdir(resolve(root, "research/source-cache"), { recursive: true });
  await mkdir(resolve(root, "research/reading-units"), { recursive: true });
  await writeFile(
    resolve(root, localSource),
    `<main><h2>Chapter II: Attention</h2>${bodyParagraphs}<h2>Chapter III</h2></main>`,
  );
  await writeFile(
    resolve(root, "research/reading-units/inventory.json"),
    `${JSON.stringify(inventory)}\n`,
  );
  const report = await runReadingUnitPipeline({
    projectRoot: root,
    maximumPublicUnitBytes: 105_000,
    thoughtById: new Map([["fixture-attention", { english: "Compact unit anchor." }]]),
  });
  assert.equal(report.summary.written, 1);
  assert.equal(report.units[0].serialization, "compact");
  assert.equal(report.units[0].publicByteCount <= 105_000, true);
  const serialized = await readFile(
    resolve(root, inventory.units[0].expectedUnitFile.publicPath),
    "utf8",
  );
  assert.equal(serialized.includes("\n  \"schemaVersion\""), false);
});

test("pipeline recovers from a short table-of-contents heading via a quoted body boundary", async (t) => {
  const root = await temporaryProject(t);
  const localSource = "research/source-cache/toc-and-body.html";
  const inventory = fixtureInventory({ localPath: localSource });
  const source = `<main>
    <h1>Contents</h1>
    <h2>Chapter II: Attention</h2><p>Index entry.</p>
    <h2>Chapter III: Habit</h2><p>Index entry.</p>
    <p>Chapter II: Attention</p>
    <p>Attention in the body text selects one object while the surrounding field recedes.</p>
    <p>The chapter continues by distinguishing sustained attention from a passing reaction, so the complete unit is long enough.</p>
    <p>Chapter III: Habit</p>
    <p>The following chapter is outside the selected reading unit.</p>
  </main>`;
  await mkdir(resolve(root, "research/source-cache"), { recursive: true });
  await mkdir(resolve(root, "research/reading-units"), { recursive: true });
  await writeFile(resolve(root, localSource), source);
  await writeFile(
    resolve(root, "research/reading-units/inventory.json"),
    `${JSON.stringify(inventory)}\n`,
  );
  const report = await runReadingUnitPipeline({
    projectRoot: root,
    thoughtById: new Map([["fixture-attention", {
      english: "Attention in the body text selects one object while the surrounding field recedes.",
    }]]),
  });
  assert.equal(report.summary.written, 1);
  assert.equal(report.units[0].selectionMethod, "quote-guided-boundary");
  const body = JSON.parse(await readFile(
    resolve(root, inventory.units[0].expectedUnitFile.publicPath),
    "utf8",
  ));
  assert.equal(body.paragraphs[0].text, "Chapter II: Attention");
  assert.equal(body.paragraphs.some(({ text }) => text.includes("following chapter")), false);
});

test("dry-run writes only its report, while source-route units never fetch", async (t) => {
  const root = await temporaryProject(t);
  const localSource = "research/source-cache/attention.html";
  const inventory = fixtureInventory({ localPath: localSource });
  await mkdir(resolve(root, "research/source-cache"), { recursive: true });
  await mkdir(resolve(root, "research/reading-units"), { recursive: true });
  await writeFile(resolve(root, localSource), fixtureHtml);
  await writeFile(
    resolve(root, "research/reading-units/inventory.json"),
    `${JSON.stringify(inventory)}\n`,
  );
  const thoughtById = new Map([[
    "fixture-attention",
    { english: "Attention is the taking possession by the mind, in clear and vivid form, of one out of what seem several simultaneously possible objects." },
  ]]);
  const dryRun = await runReadingUnitPipeline({
    projectRoot: root,
    thoughtById,
    dryRun: true,
  });
  assert.equal(dryRun.summary.wouldWrite, 1);
  await assert.rejects(
    readFile(resolve(root, inventory.units[0].expectedUnitFile.publicPath)),
    { code: "ENOENT" },
  );

  inventory.units[0].availability = "source-route";
  inventory.units[0].source = { url: "http://127.0.0.1/private", additionalLinks: [] };
  await writeFile(
    resolve(root, "research/reading-units/inventory.json"),
    `${JSON.stringify(inventory)}\n`,
  );
  const routed = await runReadingUnitPipeline({ projectRoot: root, thoughtById });
  assert.equal(routed.summary.skipped, 1);
  assert.equal(routed.units[0].reason, "source-route-only");
});

test("versioned source overrides merge URL defaults before unit-specific boundaries", async (t) => {
  const root = await temporaryProject(t);
  const overridePath = resolve(root, "source-overrides.json");
  await writeFile(overridePath, JSON.stringify({
    schemaVersion: 1,
    bySourceUrl: {
      "https://example.com/attention.html": {
        localPath: "research/source-cache/attention.txt",
        startHeading: "Attention",
      },
    },
    byUnitId: {
      "ru-attention-chapter-ii-deadbeef": {
        startPattern: "^Chapter II$",
        endPattern: "^Chapter III$",
        maximumUnitCharacters: 600_000,
        minimumUnitCharacters: 60,
      },
    },
  }));
  const registry = await loadSourceOverrides(overridePath);
  const merged = applySourceOverride(fixtureInventory().units[0], registry);
  assert.equal(merged.registeredSourceUrl, "https://example.com/attention.html");
  assert.equal(merged.source.localPath, "research/source-cache/attention.txt");
  assert.equal(merged.source.startHeading, "Attention");
  assert.equal(merged.source.startPattern, "^Chapter II$");
  assert.equal(merged.source.endPattern, "^Chapter III$");
  assert.equal(merged.source.maximumUnitCharacters, 600_000);
  assert.equal(merged.source.minimumUnitCharacters, 60);
  assert.deepEqual(merged.sourceOverrideApplied, ["source-url", "unit-id"]);

  await writeFile(overridePath, JSON.stringify({
    schemaVersion: 1,
    bySourceUrl: {},
    byUnitId: {
      "ru-attention-chapter-ii-deadbeef": {
        localPath: "research/source-cache/scan.pdf",
      },
    },
  }));
  await assert.rejects(
    loadSourceOverrides(overridePath),
    (error) => error instanceof ReadingUnitPipelineError && error.code === "invalid-overrides",
  );

  await writeFile(overridePath, JSON.stringify({
    schemaVersion: 1,
    bySourceUrl: {},
    byUnitId: {
      "ru-attention-chapter-ii-deadbeef": {
        maximumUnitCharacters: 600_001,
      },
    },
  }));
  await assert.rejects(
    loadSourceOverrides(overridePath),
    (error) => error instanceof ReadingUnitPipelineError && error.code === "invalid-overrides",
  );

  await writeFile(overridePath, JSON.stringify({
    schemaVersion: 1,
    bySourceUrl: {},
    byUnitId: {
      "ru-attention-chapter-ii-deadbeef": {
        minimumUnitCharacters: 121,
      },
    },
  }));
  await assert.rejects(
    loadSourceOverrides(overridePath),
    (error) => error instanceof ReadingUnitPipelineError && error.code === "invalid-overrides",
  );
});

test("a binary primary route falls through to a readable additional link", async (t) => {
  const root = await temporaryProject(t);
  const inventory = fixtureInventory();
  inventory.units[0].source.url = "https://example.com/scan.pdf";
  inventory.units[0].source.additionalLinks = [{
    url: "https://example.com/attention.html",
    label: "HTML text",
    englishLabel: "HTML text",
  }];
  await mkdir(resolve(root, "research/reading-units"), { recursive: true });
  await writeFile(
    resolve(root, "research/reading-units/inventory.json"),
    `${JSON.stringify(inventory)}\n`,
  );
  const report = await runReadingUnitPipeline({
    projectRoot: root,
    allowNetwork: true,
    thoughtById: new Map([[
      "fixture-attention",
      { english: "Attention is the taking possession by the mind, in clear and vivid form, of one out of what seem several simultaneously possible objects." },
    ]]),
    resolveHost: async () => [{ address: "93.184.216.34" }],
    fetchImplementation: async () => new Response(fixtureHtml, {
      status: 200,
      headers: { "content-type": "text/html" },
    }),
  });
  assert.equal(report.summary.written, 1);
  assert.deepEqual(report.units[0].attempts.map(({ status, reason }) => ({ status, reason })), [
    { status: "skipped", reason: "unsupported-remote-format" },
    { status: "selected", reason: undefined },
  ]);
  const body = JSON.parse(await readFile(
    resolve(root, inventory.units[0].expectedUnitFile.publicPath),
    "utf8",
  ));
  assert.equal(body.sourceUrl, "https://example.com/scan.pdf");
  assert.equal(body.preparedSourceUrl, "https://example.com/attention.html");
  assert.equal(body.source.url, "https://example.com/attention.html");
});

test("a multi-card unit with only a partial anchor match is not retained", async (t) => {
  const root = await temporaryProject(t);
  const localSource = "research/source-cache/attention.html";
  const inventory = fixtureInventory({ localPath: localSource });
  const unit = inventory.units[0];
  unit.thoughtIds.push("fixture-absent");
  inventory.thoughtMap["fixture-absent"] = {
    unitId: unit.id,
    locator: { zh: "第二章", en: "Chapter II" },
    originalField: "english",
    useBasis: "public-domain",
  };
  await mkdir(resolve(root, "research/source-cache"), { recursive: true });
  await mkdir(resolve(root, "research/reading-units"), { recursive: true });
  await mkdir(resolve(root, "public/readings/units"), { recursive: true });
  await writeFile(resolve(root, localSource), fixtureHtml);
  await writeFile(
    resolve(root, "research/reading-units/inventory.json"),
    `${JSON.stringify(inventory)}\n`,
  );
  const outputPath = resolve(root, unit.expectedUnitFile.publicPath);
  await writeFile(outputPath, '{"stale":true}\n');
  const report = await runReadingUnitPipeline({
    projectRoot: root,
    thoughtById: new Map([
      ["fixture-attention", {
        english: "Attention is the taking possession by the mind, in clear and vivid form, of one out of what seem several simultaneously possible objects.",
      }],
      ["fixture-absent", { english: "This sentence is absent from the chapter." }],
    ]),
  });
  assert.equal(report.summary.failed, 1);
  assert.equal(report.summary.anchorsMatched, 0);
  assert.equal(report.summary.anchorsUnmatched, 0);
  assert.equal(report.failures[0].reason, "partial-anchor-match");
  assert.deepEqual(report.failures[0].details.unmatchedThoughtIds, ["fixture-absent"]);
  await assert.rejects(readFile(outputPath), { code: "ENOENT" });
});

test("a source with zero matched cards reports all-sources-failed rather than partial", async (t) => {
  const root = await temporaryProject(t);
  const localSource = "research/source-cache/unmatched.html";
  const inventory = fixtureInventory({ localPath: localSource });
  await mkdir(resolve(root, "research/source-cache"), { recursive: true });
  await mkdir(resolve(root, "research/reading-units"), { recursive: true });
  await writeFile(resolve(root, localSource), fixtureHtml);
  await writeFile(
    resolve(root, "research/reading-units/inventory.json"),
    `${JSON.stringify(inventory)}\n`,
  );
  const report = await runReadingUnitPipeline({
    projectRoot: root,
    thoughtById: new Map([["fixture-attention", {
      english: "A quotation that does not occur anywhere in this source.",
    }]]),
  });
  assert.equal(report.summary.failed, 1);
  assert.equal(report.failures[0].reason, "all-sources-failed");
  assert.equal(report.failures[0].details.attempts[0].reason, "quote-not-found");
  assert.deepEqual(report.failures[0].details.unmatchedThoughtIds, ["fixture-attention"]);
});

test("identical whole-document bodies cannot stand in for distinct non-whole units", async (t) => {
  const root = await temporaryProject(t);
  const localSource = "research/source-cache/shared.html";
  const inventory = fixtureInventory({ localPath: localSource });
  const first = inventory.units[0];
  first.locator = { structureKey: "chapter-ii", zh: "第二章", en: "Chapter II" };
  const second = {
    ...structuredClone(first),
    id: "ru-attention-chapter-iii-cafebabe",
    locator: { structureKey: "chapter-iii", zh: "第三章", en: "Chapter III" },
    thoughtIds: ["fixture-second"],
    expectedUnitFile: {
      publicPath: "public/readings/units/ru-attention-chapter-iii-cafebabe.json",
      href: "/readings/units/ru-attention-chapter-iii-cafebabe.json",
    },
  };
  inventory.units.push(second);
  inventory.unitCount = 2;
  inventory.thoughtMap["fixture-second"] = {
    unitId: second.id,
    locator: { zh: "第三章", en: "Chapter III" },
    originalField: "english",
    useBasis: "public-domain",
  };
  const sharedHtml = `<main><p>${
    "Attention is the taking possession by the mind. Habit changes conduct. ".repeat(8)
  }</p></main>`;
  await mkdir(resolve(root, "research/source-cache"), { recursive: true });
  await mkdir(resolve(root, "research/reading-units"), { recursive: true });
  await writeFile(resolve(root, localSource), sharedHtml);
  await writeFile(
    resolve(root, "research/reading-units/inventory.json"),
    `${JSON.stringify(inventory)}\n`,
  );
  const report = await runReadingUnitPipeline({
    projectRoot: root,
    thoughtById: new Map([
      ["fixture-attention", { english: "Attention is the taking possession by the mind." }],
      ["fixture-second", { english: "Habit changes conduct." }],
    ]),
  });
  assert.equal(report.summary.failed, 2);
  assert.equal(report.summary.written, 0);
  assert.equal(report.summary.duplicateUnboundedClusters, 1);
  assert.equal(report.summary.duplicateUnboundedUnits, 2);
  assert.equal(report.duplicateUnboundedClusters[0].unitIds.length, 2);
  assert.equal(
    report.units.every(({ reason }) => reason === "duplicate-unbounded-content"),
    true,
  );
  await assert.rejects(readFile(resolve(root, first.expectedUnitFile.publicPath)), { code: "ENOENT" });
  await assert.rejects(readFile(resolve(root, second.expectedUnitFile.publicPath)), { code: "ENOENT" });
});

test("remote text cache is keyed by URL and reused without a second fetch", async (t) => {
  const root = await temporaryProject(t);
  const cacheDirectory = resolve(root, "fetch-cache");
  let calls = 0;
  const fetchImplementation = async () => {
    calls += 1;
    return new Response("<main><p>A safely fetched public-domain paragraph.</p></main>", {
      status: 200,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  };
  const resolveHost = async () => [{ address: "93.184.216.34" }];
  const first = await fetchRemoteSource("https://example.com/chapter", {
    allowNetwork: true,
    cacheDirectory,
    fetchImplementation,
    resolveHost,
  });
  const second = await fetchRemoteSource("https://example.com/chapter", {
    allowNetwork: false,
    cacheDirectory,
    fetchImplementation,
    resolveHost,
  });
  assert.equal(calls, 1);
  assert.equal(first.cacheHit, false);
  assert.equal(second.cacheHit, true);
  assert.equal(second.sha256, first.sha256);
});

test("concurrent units sharing one URL also share the in-flight request", async (t) => {
  const root = await temporaryProject(t);
  let calls = 0;
  const options = {
    allowNetwork: true,
    cacheDirectory: resolve(root, "fetch-cache"),
    resolveHost: async () => [{ address: "93.184.216.34" }],
    fetchImplementation: async () => {
      calls += 1;
      await new Promise((done) => setTimeout(done, 5));
      return new Response("A shared chapter response.", {
        status: 200,
        headers: { "content-type": "text/plain" },
      });
    },
  };
  const [first, second, third] = await Promise.all([
    fetchRemoteSource("https://example.com/shared", options),
    fetchRemoteSource("https://example.com/shared", options),
    fetchRemoteSource("https://example.com/shared", options),
  ]);
  assert.equal(calls, 1);
  assert.equal(first.sha256, second.sha256);
  assert.equal(second.sha256, third.sha256);
});

test("Gutenberg uses the PGLAF text mirror and falls back through its listing", async (t) => {
  const root = await temporaryProject(t);
  const cacheDirectory = resolve(root, "fetch-cache");
  assert.deepEqual(
    gutenbergMirrorCandidates("https://www.gutenberg.org/cache/epub/10661/pg10661-images.html"),
    [
      "https://gutenberg.pglaf.org/1/0/6/6/10661/10661-0.txt",
      "https://gutenberg.pglaf.org/1/0/6/6/10661/10661.txt",
    ],
  );
  const requested = [];
  const fetchImplementation = async (url) => {
    requested.push(url.href);
    if (url.pathname.endsWith("10661-0.txt") || url.pathname.endsWith("10661.txt")) {
      return new Response("missing", { status: 404, headers: { "content-type": "text/plain" } });
    }
    if (url.pathname.endsWith("/10661/")) {
      return new Response('<a href="10661-8.txt">legacy text</a>', {
        status: 200,
        headers: { "content-type": "text/html" },
      });
    }
    if (url.pathname.endsWith("10661-8.txt")) {
      return new Response("A public-domain mirror text.", {
        status: 200,
        headers: { "content-type": "text/plain" },
      });
    }
    return new Response("unexpected", { status: 500 });
  };
  const source = await fetchGutenbergSource(
    "https://www.gutenberg.org/cache/epub/10661/pg10661-images.html",
    {
      allowNetwork: true,
      cacheDirectory,
      fetchImplementation,
      resolveHost: async () => [{ address: "93.184.216.34" }],
    },
  );
  assert.equal(source.body, "A public-domain mirror text.");
  assert.equal(requested.at(-1), "https://gutenberg.pglaf.org/1/0/6/6/10661/10661-8.txt");
  assert.equal(requested.some((url) => url.includes("www.gutenberg.org")), false);
});

test("Wikisource fetches parser output through the MediaWiki API", async (t) => {
  const root = await temporaryProject(t);
  const sourceUrl = "https://zh.wikisource.org/wiki/%E7%84%9A%E6%9B%B8/%E5%8D%B73";
  const apiUrl = new URL(mediaWikiApiUrlFor(sourceUrl));
  assert.equal(apiUrl.pathname, "/w/api.php");
  assert.equal(apiUrl.searchParams.get("action"), "parse");
  assert.equal(apiUrl.searchParams.get("page"), "焚書/卷3");
  assert.equal(apiUrl.searchParams.get("redirects"), "1");
  let requested;
  const source = await fetchMediaWikiSource(sourceUrl, {
    allowNetwork: true,
    cacheDirectory: resolve(root, "fetch-cache"),
    resolveHost: async () => [{ address: "93.184.216.34" }],
    fetchImplementation: async (url) => {
      requested = url;
      return new Response(JSON.stringify({
        parse: {
          displaytitle: "焚書/卷3",
          text: '<div class="mw-parser-output"><h2>童心说</h2><p>夫童心者，真心也。</p></div>',
        },
      }), {
        status: 200,
        headers: { "content-type": "application/json; charset=utf-8" },
      });
    },
  });
  assert.equal(requested.searchParams.get("prop"), "text|displaytitle");
  assert.equal(source.contentType, "text/html");
  assert.equal(source.url, new URL(sourceUrl).href);
  assert.equal(source.retrievalUrl, apiUrl.href);
  assert.match(source.body, /夫童心者，真心也。/u);
  assert.match(source.sha256, /^[0-9a-f]{64}$/u);
});

test("Wikisource oldid pages keep a human URL while the API retrieves that exact revision", async (t) => {
  const root = await temporaryProject(t);
  const sourceUrl = "https://zh.wikisource.org/w/index.php?title=%E8%8D%80%E5%AD%90%2F%E5%8B%B8%E5%AD%B8%E7%AF%87&oldid=213659";
  const apiUrl = new URL(mediaWikiApiUrlFor(sourceUrl));
  assert.equal(apiUrl.searchParams.get("oldid"), "213659");
  assert.equal(apiUrl.searchParams.has("page"), false);
  assert.equal(apiUrl.searchParams.has("redirects"), false);
  const source = await fetchMediaWikiSource(sourceUrl, {
    allowNetwork: true,
    cacheDirectory: resolve(root, "fetch-cache"),
    resolveHost: async () => [{ address: "93.184.216.34" }],
    fetchImplementation: async (url) => {
      assert.equal(url.href, apiUrl.href);
      return new Response(JSON.stringify({
        parse: {
          displaytitle: "荀子/勸學篇",
          text: '<div class="mw-parser-output"><p>君子曰：學不可以已。</p></div>',
        },
      }), {
        status: 200,
        headers: { "content-type": "application/json; charset=utf-8" },
      });
    },
  });
  assert.equal(source.url, new URL(sourceUrl).href);
  assert.equal(source.retrievalUrl, apiUrl.href);
  assert.match(source.body, /學不可以已/u);
});

test("Bilara GitHub translations use immutable raw JSON and group segments into paragraphs", async (t) => {
  const root = await temporaryProject(t);
  const pageUrl = "https://github.com/suttacentral/bilara-data/blob/21b240d60ee298ea0bab0868d058dfac04dbd1fd/translation/en/sujato/sutta/sn/sn22/sn22.59_translation-en-sujato.json";
  const rawUrl = "https://raw.githubusercontent.com/suttacentral/bilara-data/21b240d60ee298ea0bab0868d058dfac04dbd1fd/translation/en/sujato/sutta/sn/sn22/sn22.59_translation-en-sujato.json";
  assert.equal(bilaraRawUrlFor(pageUrl), rawUrl);
  const body = JSON.stringify({
    "sn22.59:0.1": "The Characteristic of Not-Self ",
    "sn22.59:1.1": "At one time the Buddha addressed the mendicants. ",
    "sn22.59:2.1": "Form is <em>not-self</em>. ",
    "sn22.59:2.2": "For if form were self, it wouldn’t lead to affliction. ",
    "sn22.59:3.1": "Feeling is not-self.",
    "sn22.59:3.2": "",
  });
  let requested;
  const source = await fetchBilaraSource(pageUrl, {
    allowNetwork: true,
    cacheDirectory: resolve(root, "fetch-cache"),
    resolveHost: async () => [{ address: "93.184.216.34" }],
    fetchImplementation: async (url) => {
      requested = url.href;
      return new Response(body, {
        status: 200,
        headers: { "content-type": "text/plain; charset=utf-8" },
      });
    },
  });
  assert.equal(requested, rawUrl);
  assert.equal(source.url, pageUrl);
  assert.equal(source.retrievalUrl, rawUrl);
  assert.equal(source.contentType, "application/json");
  assert.deepEqual(extractBilaraJsonParagraphs(source.body), [
    { text: "The Characteristic of Not-Self" },
    { text: "At one time the Buddha addressed the mendicants." },
    { text: "Form is not-self. For if form were self, it wouldn’t lead to affliction." },
    { text: "Feeling is not-self." },
  ]);
});

test("Archive.org scan routes resolve only a derived OCR text file", async (t) => {
  const root = await temporaryProject(t);
  const requested = [];
  const source = await fetchArchiveTextSource(
    "https://archive.org/details/examplebook/page/n20/mode/1up",
    {
      allowNetwork: true,
      cacheDirectory: resolve(root, "fetch-cache"),
      resolveHost: async () => [{ address: "93.184.216.34" }],
      fetchImplementation: async (url) => {
        requested.push(url.href);
        if (url.pathname === "/metadata/examplebook") {
          return new Response(JSON.stringify({
            files: [
              { name: "examplebook.pdf", size: "2000000" },
              { name: "examplebook_djvu.xml", size: "500000" },
              { name: "examplebook_djvu.txt", size: "1200" },
            ],
          }), {
            status: 200,
            headers: { "content-type": "application/json" },
          });
        }
        if (url.pathname === "/download/examplebook/examplebook_djvu.txt") {
          return new Response("CHAPTER II\n\nA derived OCR paragraph.", {
            status: 200,
            headers: { "content-type": "application/octet-stream" },
          });
        }
        return new Response("unexpected binary request", { status: 500 });
      },
    },
  );
  assert.equal(source.contentType, "text/plain");
  assert.match(source.body, /derived OCR paragraph/u);
  assert.equal(requested.some((url) => url.endsWith(".pdf")), false);
  assert.equal(requested.some((url) => url.endsWith(".xml")), false);
  assert.equal(requested.at(-1), "https://archive.org/download/examplebook/examplebook_djvu.txt");
});

test("unsafe addresses, binary sources, and oversized whole books fail closed", async (t) => {
  await assert.rejects(
    validateRemoteUrl("http://127.0.0.1/secrets"),
    (error) => error instanceof ReadingUnitPipelineError && error.code === "unsafe-url",
  );
  const proxyUrl = await validateRemoteUrl("https://example.com/chapter", {
    allowSyntheticNetworkProxy: true,
    resolveHost: async () => [{ address: "198.18.0.20" }],
  });
  assert.equal(proxyUrl.hostname, "example.com");
  await assert.rejects(
    validateRemoteUrl("ftp://example.com/book.txt"),
    (error) => error instanceof ReadingUnitPipelineError && error.code === "unsafe-url",
  );
  assert.throws(
    () => selectReadingUnitParagraphs(
      [{ text: "A".repeat(200_000) }],
      fixtureInventory().units[0],
    ),
    (error) => error instanceof ReadingUnitPipelineError && error.code === "section-not-found",
  );
  assert.throws(
    () => selectReadingUnitParagraphs(
      [{ text: "A".repeat(100_000) }],
      {
        ...fixtureInventory().units[0],
        locator: { structureKey: "section-x", zh: "第十节", en: "Section X" },
      },
    ),
    (error) => error instanceof ReadingUnitPipelineError && error.code === "boundary-required",
  );

  const root = await temporaryProject(t);
  const inventory = fixtureInventory({ localPath: "research/source-cache/book.pdf" });
  await mkdir(resolve(root, "research/source-cache"), { recursive: true });
  await mkdir(resolve(root, "research/reading-units"), { recursive: true });
  await writeFile(resolve(root, "research/source-cache/book.pdf"), "not actually copied");
  await writeFile(
    resolve(root, "research/reading-units/inventory.json"),
    `${JSON.stringify(inventory)}\n`,
  );
  const report = await runReadingUnitPipeline({
    projectRoot: root,
    thoughtById: new Map([["fixture-attention", { english: "attention" }]]),
  });
  assert.equal(report.summary.failed, 1);
  assert.equal(report.failures[0].reason, "all-sources-failed");
  assert.equal(
    report.failures[0].details.attempts[0].reason,
    "unsupported-local-format",
  );
});

test("CLI defaults are network-off and enforce bounded concurrency", () => {
  assert.deepEqual(parseArguments(["--dry-run", "--limit", "4", "--concurrency", "2"]), {
    dryRun: true,
    limit: 4,
    concurrency: 2,
  });
  assert.throws(() => parseArguments(["--concurrency", "9"]), /between 1 and 8/u);
  assert.throws(() => parseArguments(["--allow-network", "--unknown"]), /Unknown option/u);
});
