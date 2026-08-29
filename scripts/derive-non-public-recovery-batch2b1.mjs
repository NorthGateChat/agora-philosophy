#!/usr/bin/env node

import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { extractTextParagraphs, matchCardAnchors } from "./fetch-reading-units.mjs";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const originRoot = resolve(projectRoot, "research/source-cache/non-public-24-recovery/origins");
const derivedRoot = resolve(projectRoot, "research/source-cache/reading-unit-derived");
const reportPath = resolve(
  projectRoot,
  "research/reading-units/non-public-recovery-batch2b1-report.json",
);

const sha256 = (value) => createHash("sha256").update(value).digest("hex");
const normalizeSpaces = (value) => String(value).normalize("NFC").replace(/[\t ]+/gu, " ").trim();

function lineRange(value, firstLine, lastLine) {
  const lines = String(value).normalize("NFC").replace(/\r\n?/gu, "\n").split("\n");
  if (firstLine < 1 || lastLine > lines.length || firstLine > lastLine) {
    throw new Error(`Invalid source line range ${firstLine}-${lastLine} for ${lines.length} lines`);
  }
  return {
    lines,
    text: lines.slice(firstLine - 1, lastLine).join("\n"),
  };
}

function assertSourceMarker(lines, marker, unitId) {
  const actual = normalizeSpaces(lines[marker.line - 1] ?? "");
  marker.pattern.lastIndex = 0;
  if (!marker.pattern.test(actual)) {
    throw new Error(`${unitId}: source marker line ${marker.line} did not match: ${actual}`);
  }
}

function nextNonblankLine(lines, index) {
  for (let cursor = index + 1; cursor < lines.length; cursor += 1) {
    const line = normalizeSpaces(lines[cursor]);
    if (line) return line;
  }
  return "";
}

function filterRunningMatter(value, shouldDrop) {
  const lines = String(value).replace(/\r\n?/gu, "\n").split("\n");
  return lines
    .filter((line, index) => !shouldDrop(normalizeSpaces(line), index, lines))
    .join("\n");
}

function isCapitalistProductionHeader(line) {
  return line.length < 60
    && /Capitalist/iu.test(line)
    && /^(?:[0-9iloys\/"'\s]+)?Capitalist\s+\S+[\p{P}\s]*$/iu.test(line);
}

function cleanOcrSlice(value, preservedLineBreakCompounds = []) {
  const preserved = new Set(preservedLineBreakCompounds.map((word) => word.toLocaleLowerCase("en")));
  const normalized = String(value)
    .normalize("NFC")
    .replace(/\r\n?/gu, "\n")
    .replace(/\u00ad/gu, "")
    .replace(/([A-Za-z]+)-[ \t]*\n[ \t]*([a-z]+)/gu, (_, left, right) => (
      preserved.has(`${left}-${right}`.toLocaleLowerCase("en"))
        ? `${left}-${right}`
        : `${left}${right}`
    ))
    .replace(/[ \t]+\n/gu, "\n");
  return normalized
    .split(/\n{2,}/u)
    .map((block) => normalizeSpaces(block.replace(/\n+/gu, " ")))
    .filter(Boolean)
    .join("\n\n")
    .replace(/\n{3,}/gu, "\n\n")
    .trim();
}

function removeRequiredPrefix(text, pattern, label) {
  pattern.lastIndex = 0;
  if (!pattern.test(text)) throw new Error(`Required heading prefix was not found: ${label}`);
  pattern.lastIndex = 0;
  return text.replace(pattern, "").trim();
}

function assertMatchedAnchor(anchor, unitId, thoughtId) {
  if (!anchor || anchor.match === "unmatched" || anchor.match === "missing-quote") {
    throw new Error(`${unitId}: production matcher did not match ${thoughtId}`);
  }
}

const units = [
  {
    unitId: "ru-capital-volume-i-chapter-i-c4ed1d60",
    thoughtId: "economics-marx-commodity-fetish",
    cardQuote: "There it is a definite social relation between men, that assumes, in their eyes, the fantastic form of a relation between things.",
    currentLocator: { structureKey: "chapter-i", zh: "章 I", en: "Chapter I" },
    registeredSourceUrl: "https://commons.wikimedia.org/wiki/File:Capital_-_Marx_-_1887_-_Volume_1.pdf",
    ocrFile: "capitalcriticala00marxrich_djvu.txt",
    scanFile: "capital-marx-1887-volume-1.pdf",
    range: { firstLine: 1384, lastLine: 3967 },
    markers: [
      { line: 1384, role: "start", pattern: /^CHAPTER I\.$/u },
      { line: 3970, role: "following-page-header", pattern: /^56 Capitalist Production[.,]$/u },
      { line: 3979, role: "next-natural-unit", pattern: /^CHAPTER 11\.$/u },
    ],
    scanBoundary: {
      firstPdfPage: 37,
      lastPdfPage: 91,
      printedPages: "1-55",
      followingPdfPage: 92,
      followingUnit: "Chapter II — Exchange",
    },
    anchorEvidence: { pdfPage: 79, printedPage: 43 },
    outputFile: "marx-capital-1887-volume-1-chapter-i.txt",
    heading: "# CHAPTER I\n\n## COMMODITIES",
    preservedLineBreakCompounds: [
      "flax-growing",
      "ground-work",
      "labour-power",
      "labour-time",
      "many-coloured",
      "one-half",
      "socially-recognised",
      "table-turning",
      "two-fold",
      "use-value",
      "use-values",
      "value-substance",
    ],
    filter(line) {
      return isCapitalistProductionHeader(line)
        || /^Commodities[.,]?\s*[0-9ilo\s]*$/iu.test(line)
        || /^(?:[ABCDLrI01]|\\)$/u.test(line);
    },
    transform(text) {
      return removeRequiredPrefix(text, /^CHAPTER I\.\s*/u, "Capital Chapter I");
    },
    corrections: [
      "The card-anchor line wrap rela-/tion was dewrapped to relation after visual verification on PDF p. 79 / printed p. 43.",
    ],
  },
  {
    unitId: "ru-capital-volume-i-chapter-xxv-5db39174",
    thoughtId: "economics-marx-reserve-army",
    cardQuote: "On the one hand, therefore, the additional capital formed in the course of accumulation attracts fewer and fewer labourers in proportion to its magnitude.",
    currentLocator: { structureKey: "chapter-xxv", zh: "章 XXV", en: "Chapter XXV" },
    registeredSourceUrl: "https://commons.wikimedia.org/wiki/File:Capital_-_Marx_-_1887_-_Volume_2.pdf",
    ocrFile: "capitalcriticala02marxrich_djvu.txt",
    scanFile: "capitalcriticala02marxrich.pdf",
    range: { firstLine: 12715, lastLine: 19105 },
    markers: [
      { line: 12715, role: "start", pattern: /^CHAPTER XXV\.$/u },
      { line: 19108, role: "next-part", pattern: /^PART VIIL$/u },
      { line: 19112, role: "next-natural-unit", pattern: /^CHAPTER XXVI\.$/u },
    ],
    scanBoundary: {
      firstPdfPage: 269,
      lastPdfPage: 379,
      printedPages: "625-735",
      followingPdfPage: 380,
      followingUnit: "Part VIII / Chapter XXVI — The Secret of Primitive Accumulation",
    },
    anchorEvidence: { pdfPage: 286, printedPage: 642 },
    outputFile: "marx-capital-1887-volume-1-chapter-xxv.txt",
    heading: "# CHAPTER XXV\n\n## THE GENERAL LAW OF CAPITALIST ACCUMULATION",
    preservedLineBreakCompounds: [
      "bed-room",
      "bed-rooms",
      "blood-letting",
      "capital-value",
      "cotton-spinners",
      "counter-pole",
      "drain-pipes",
      "epoch-making",
      "eviction-spirit",
      "game-keepers",
      "gang-master",
      "ground-rents",
      "grown-up",
      "half-employed",
      "half-starved",
      "house-property",
      "house-room",
      "labour-army",
      "labour-power",
      "labour-process",
      "market-price",
      "middle-aged",
      "nail-making",
      "non-agricultural",
      "over-crowded",
      "over-crowding",
      "over-work",
      "piece-work",
      "population-theory",
      "rent-roll",
      "school-boyish",
      "self-expansion",
      "shop-keepers",
      "small-pox",
      "stocking-makers",
      "surplus-value",
      "wage-deficit",
      "wage-labourer",
      "wage-labourers",
      "work-house",
      "work-people",
      "working-class",
      "working-people",
    ],
    filter(line, index, lines) {
      if (isCapitalistProductionHeader(line)) return true;
      if (
        line.length < 110
        && /Law/iu.test(line)
        && /Capitalist/iu.test(line)
        && !/^THE GENERAL LAW OF CAPITALIST ACCUMULATION\.$/u.test(line)
      ) {
        return true;
      }
      if (/^(?:2r|o o)$/u.test(line)) return true;
      return /^\d{3}$/u.test(line) && isCapitalistProductionHeader(nextNonblankLine(lines, index));
    },
    transform(text) {
      return removeRequiredPrefix(
        text,
        /^CHAPTER XXV\.\s+THE GENERAL LAW OF CAPITALIST ACCUMULATION\.\s*/u,
        "Capital Chapter XXV",
      );
    },
    corrections: [],
  },
  {
    unitId: "ru-new-essays-on-human-understanding-preface-preface-9a2fa0f0",
    thoughtId: "leibniz-small-perceptions",
    cardQuote: "For it must be that we are affected a little by the motion of this wave, and that we have some perception of each one of these noises, small as they are; otherwise we would not have that of a hundred thousand waves, since a hundred thousand nothings cannot make something.",
    currentLocator: { structureKey: "preface-preface", zh: "序言", en: "Preface" },
    registeredSourceUrl: "https://commons.wikimedia.org/wiki/File:New_essays_concerning_human_understanding_(IA_cu31924032296422).pdf",
    ocrFile: "cu31924032296422_djvu.txt",
    scanFile: "cu31924032296422.pdf",
    range: { firstLine: 2583, lastLine: 3664 },
    markers: [
      { line: 2583, role: "start", pattern: /^PEEFACE$/u },
      { line: 3665, role: "next-natural-unit", pattern: /^NEW ESSAYS ON HUMAN UNDERSTANDING$/u },
      { line: 3668, role: "next-unit-subheading", pattern: /^Book I\. — Innate Ideas$/u },
    ],
    scanBoundary: {
      firstPdfPage: 67,
      lastPdfPage: 89,
      printedPages: "41-63",
      followingPdfPage: 90,
      followingUnit: "Book I — Innate Ideas",
    },
    anchorEvidence: { pdfPage: 74, printedPage: 48 },
    outputFile: "leibniz-new-essays-langley-1896-preface.txt",
    heading: "# PREFACE",
    preservedLineBreakCompounds: ["twenty-four"],
    filter(line) {
      return /LEIBNITZ'S\s+CRITIQUE\s+OF\s+LOCKE/iu.test(line)
        || (line.length < 70 && /^ON\s+HUMAN\b/iu.test(line) && /\d{2}$/u.test(line))
        || /^(?:4[1-9]|5\d|6[0-3])$/u.test(line)
        || /^[A-Z]$/u.test(line);
    },
    transform(text) {
      return removeRequiredPrefix(text, /^PEEFACE\s*/u, "Leibniz Preface");
    },
    corrections: [
      "The OCR heading PEEFACE was normalized to PREFACE after visual verification on PDF p. 67 / printed p. 41.",
      "The card-anchor wraps per-/ception and other-/wise were dewrapped after visual verification on PDF p. 74 / printed p. 48.",
    ],
  },
  {
    unitId: "ru-religion-within-the-boundaries-of-mere-reason-part-i-1cd8bd19",
    thoughtId: "kant-propensity-radical-evil",
    cardQuote: "Hence it appears that mankind is only evil so far forth as he inverts the ethical order of those springs which he adopts into his maxims. … he makes the selfish spring condition his observance of the law; whereas the latter it is that ought to be the condition precedent of his gratifying the former.",
    currentLocator: { structureKey: "part-i", zh: "部分 I", en: "Part I" },
    registeredSourceUrl: "https://commons.wikimedia.org/wiki/File:Religion_within_the_boundary_of_pure_reason_(IA_religionwithinbo00kantrich).pdf",
    ocrFile: "religionwithinbo00kantrich_djvu.txt",
    scanFile: "religionwithinbo00kantrich.pdf",
    range: { firstLine: 860, lastLine: 2697 },
    markers: [
      { line: 860, role: "start", pattern: /^BOOK I\.$/u },
      { line: 2700, role: "next-book-frontispiece", pattern: /^HARMONY AND IDENTITY$/u },
      { line: 2712, role: "next-natural-unit", pattern: /^OF THE COMBAT BETWIXT THE GOOD AND THE EVIL$/u },
    ],
    scanBoundary: {
      firstPdfPage: 35,
      lastPdfPage: 82,
      printedPages: "17 (unprinted opener)-64",
      followingPdfPage: 83,
      followingUnit: "Book II — Of the Combat Betwixt the Good and the Evil Principle",
    },
    anchorEvidence: { pdfPage: 59, printedPage: 41 },
    outputFile: "kant-religion-semple-1838-part-i.txt",
    heading: "# BOOK I\n\n## ON THE RADICAL EVIL OF HUMAN NATURE",
    preservedLineBreakCompounds: [
      "by-gone",
      "inter-sexual",
      "new-creation",
      "rail-way",
      "self-love",
      "self-reform",
    ],
    filter(line) {
      return (line.length < 100 && /INDWELLING/iu.test(line) && /PRINCIP/iu.test(line) && /EVIL/iu.test(line))
        || (line.length < 80 && /^ALON\S*\s+WITH\b/iu.test(line) && /GOOD/iu.test(line))
        || /^[A-Z]$/u.test(line);
    },
    transform(text) {
      return removeRequiredPrefix(
        text,
        /^BOOK I\.\s+ON THE RADICAL EVIL OF HUMAN NATURE\.\s*/u,
        "Kant Book I",
      );
    },
    corrections: [
      "The card-anchor wrap ob-/servance was dewrapped after visual verification on PDF p. 59 / printed p. 41.",
    ],
  },
];

await mkdir(derivedRoot, { recursive: true });
await mkdir(dirname(reportPath), { recursive: true });

const reportUnits = [];
for (const unit of units) {
  const ocrPath = resolve(originRoot, unit.ocrFile);
  const scanPath = resolve(originRoot, unit.scanFile);
  const [ocr, scan] = await Promise.all([readFile(ocrPath, "utf8"), readFile(scanPath)]);
  const range = lineRange(ocr, unit.range.firstLine, unit.range.lastLine);
  for (const marker of unit.markers) assertSourceMarker(range.lines, marker, unit.unitId);

  const withoutRunningMatter = filterRunningMatter(range.text, unit.filter);
  const cleaned = cleanOcrSlice(withoutRunningMatter, unit.preservedLineBreakCompounds);
  const body = unit.transform(cleaned);
  const output = `${unit.heading}\n\n${body}\n`;
  const outputRelativePath = `research/source-cache/reading-unit-derived/${unit.outputFile}`;
  const outputPath = resolve(projectRoot, outputRelativePath);
  const paragraphs = extractTextParagraphs(output, { sourceUrl: outputRelativePath });
  const matched = matchCardAnchors(paragraphs, { [unit.thoughtId]: unit.cardQuote });
  const anchor = matched.anchors[unit.thoughtId];
  assertMatchedAnchor(anchor, unit.unitId, unit.thoughtId);
  await writeFile(outputPath, output, "utf8");

  reportUnits.push({
    unitId: unit.unitId,
    thoughtId: unit.thoughtId,
    currentLocator: unit.currentLocator,
    currentRegisteredSourceUrl: unit.registeredSourceUrl,
    origins: {
      ocr: {
        path: `research/source-cache/non-public-24-recovery/origins/${unit.ocrFile}`,
        sha256: sha256(ocr),
      },
      scan: {
        path: `research/source-cache/non-public-24-recovery/origins/${unit.scanFile}`,
        sha256: sha256(scan),
      },
    },
    sourceBoundary: {
      ocrLinesInclusive: unit.range,
      verifiedMarkers: unit.markers.map(({ line, role }) => ({
        line,
        role,
        text: normalizeSpaces(range.lines[line - 1]),
      })),
      scan: unit.scanBoundary,
    },
    output: {
      path: outputRelativePath,
      bytes: Buffer.byteLength(output),
      characters: output.length,
      paragraphs: paragraphs.length,
      sha256: sha256(output),
    },
    cardAnchor: {
      quote: unit.cardQuote,
      evidence: unit.anchorEvidence,
      productionMatcherResult: anchor,
    },
    normalization: [
      "NFC and whitespace normalization",
      "running page headers, page folios, and printer signature artifacts removed with edition-specific rules",
      "line-end hyphenation dewrapped; attested or clearly lexical compounds in the edition retained",
      "no modernization, paraphrase, translation substitution, or short-window replacement",
    ],
    corrections: unit.corrections,
    overrideProposal: {
      scope: "byUnitId",
      key: unit.unitId,
      value: { localPath: outputRelativePath },
    },
  });
}

const report = {
  schemaVersion: 1,
  command: "node scripts/derive-non-public-recovery-batch2b1.mjs",
  generatedFrom: "existing raw origins only; no network access",
  naturalUnitPolicy: "Each output is the complete registered natural unit, bounded by the next peer structural unit; no card-centered short window is used.",
  sharedFilesIntentionallyUnchanged: [
    "research/reading-units/inventory.json",
    "research/reading-units/source-overrides.json",
    "public/readings/**",
    "research/source-cache/reading-unit-derived/manifest.json",
  ],
  written: reportUnits.length,
  totalOutputBytes: reportUnits.reduce((sum, unit) => sum + unit.output.bytes, 0),
  allAnchorsMatched: reportUnits.every(({ cardAnchor }) => (
    cardAnchor.productionMatcherResult.match !== "unmatched"
  )),
  units: reportUnits,
};

await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
console.log(JSON.stringify(report, null, 2));
