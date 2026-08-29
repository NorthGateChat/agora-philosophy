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
  "research/source-cache/non-public-24-recovery/derived-batch-2b2a.json",
);

const sha256 = (value) => createHash("sha256").update(value).digest("hex");
const normalizeSpaces = (value) => String(value).normalize("NFC").replace(/[\t ]+/gu, " ").trim();

function sourceLines(value) {
  return String(value).normalize("NFC").replace(/\r\n?/gu, "\n").split("\n");
}

function assertSourceMarker(lines, marker, unitId) {
  const actual = normalizeSpaces(lines[marker.line - 1] ?? "");
  marker.pattern.lastIndex = 0;
  if (!marker.pattern.test(actual)) {
    throw new Error(`${unitId}: source marker line ${marker.line} did not match: ${actual}`);
  }
}

function lineRange(lines, firstLine, lastLine, unitId) {
  if (firstLine < 1 || lastLine > lines.length || firstLine > lastLine) {
    throw new Error(`${unitId}: invalid source range ${firstLine}-${lastLine} for ${lines.length} lines`);
  }
  return lines.slice(firstLine - 1, lastLine).join("\n");
}

function filterLines(value, shouldDrop) {
  const lines = sourceLines(value);
  let dropped = 0;
  const kept = lines.filter((line, index) => {
    if (!shouldDrop(normalizeSpaces(line), index, lines)) return true;
    dropped += 1;
    return false;
  });
  return { text: kept.join("\n"), dropped };
}

function cleanOcrSlice(value) {
  const normalized = String(value)
    .normalize("NFC")
    .replace(/\r\n?/gu, "\n")
    .replace(/\u00ad/gu, "")
    .replace(/([A-Za-z])-[ \t]*\n[ \t]*([a-z])/gu, "$1$2")
    .replace(/[ \t]+\n/gu, "\n");
  return normalized
    .split(/\n{2,}/u)
    .map((block) => normalizeSpaces(block.replace(/\n+/gu, " ")))
    .filter(Boolean)
    .join("\n\n")
    .replace(/[ \t]+([,.;:!?])/gu, "$1")
    .replace(/\n{3,}/gu, "\n\n")
    .trim();
}

function replaceRequired(text, pattern, replacement, label) {
  pattern.lastIndex = 0;
  if (!pattern.test(text)) throw new Error(`Required scan-backed correction did not match: ${label}`);
  pattern.lastIndex = 0;
  return text.replace(pattern, replacement);
}

function assertContains(text, excerpts, label) {
  for (const excerpt of excerpts) {
    if (!text.includes(excerpt)) throw new Error(`${label} is missing verified excerpt: ${excerpt}`);
  }
}

function assertDoesNotContain(text, patterns, label) {
  for (const pattern of patterns) {
    pattern.lastIndex = 0;
    if (pattern.test(text)) throw new Error(`${label} retains excluded boundary or running matter: ${pattern}`);
  }
}

function repeatedLongParagraphs(text) {
  const seen = new Set();
  const repeated = [];
  for (const paragraph of text.split(/\n{2,}/u).map(normalizeSpaces).filter(Boolean)) {
    if (paragraph.length < 120) continue;
    if (seen.has(paragraph)) repeated.push(paragraph.slice(0, 160));
    seen.add(paragraph);
  }
  return repeated;
}

function assertProductionAnchors(output, cardQuotes, unitId) {
  const paragraphs = extractTextParagraphs(output);
  const { anchors } = matchCardAnchors(paragraphs, cardQuotes);
  for (const [thoughtId, anchor] of Object.entries(anchors)) {
    if (!anchor || anchor.match === "unmatched" || anchor.match === "missing-quote") {
      throw new Error(`${unitId}: production matcher did not match ${thoughtId}`);
    }
  }
  return Object.fromEntries(Object.entries(anchors).map(([thoughtId, anchor]) => [thoughtId, {
    match: anchor.match,
    paragraphId: anchor.paragraphId,
    start: anchor.start,
    end: anchor.end,
  }]));
}

// The IA DJVU text has no page-break character. These are the one running-header
// line on each printed page 2-102; several are too badly OCR-corrupted for a
// trustworthy text-pattern filter, so the scan-checked source line is explicit.
const hegelRunningHeaderSourceLines = new Set([
  855, 902, 948, 995, 1045, 1090, 1137, 1183, 1229, 1275, 1322, 1368, 1417,
  1465, 1514, 1561, 1610, 1655, 1702, 1750, 1795, 1844, 1890, 1936, 1981,
  2027, 2057, 2105, 2152, 2197, 2246, 2294, 2341, 2387, 2436, 2481, 2532,
  2578, 2623, 2671, 2721, 2766, 2813, 2858, 2904, 2950, 2996, 3042, 3090,
  3137, 3187, 3236, 3291, 3339, 3385, 3430, 3480, 3549, 3594, 3641, 3687,
  3733, 3780, 3825, 3872, 3918, 3963, 4009, 4056, 4102, 4151, 4200, 4247,
  4292, 4339, 4388, 4436, 4486, 4535, 4581, 4627, 4673, 4722, 4767, 4812,
  4858, 4904, 4957, 5006, 5053, 5101, 5146, 5196, 5241, 5292, 5338, 5384,
  5430, 5484, 5531, 5577,
]);

const hegelDetachedPageNumberSourceLines = new Set([
  1042, 1371, 1462, 1468, 1747, 1841, 2102, 2243, 2338, 2390, 2484,
  2674, 3084, 3087, 3184, 3239, 3288, 3477, 4148, 4489, 5003, 5149, 5244,
  5433,
]);

const units = [
  {
    unitId: "ru-stages-on-lifes-road-part-i-in-vino-veritas-the--part-i-dfaef241",
    thoughtIds: ["kierkegaard-aesthetic-immediacy"],
    sourceFile: "selectionsfromwr00kieruoft_djvu.txt",
    scanFile: "selectionsfromwr00kieruoft.pdf",
    range: { firstLine: 1684, lastLine: 5002 },
    markers: [
      { line: 1684, role: "start", pattern: /^IN VINO VERITAS \(THE BANQUET\)$/u },
      { line: 5003, role: "next-natural-unit", pattern: /^FEAR AND TREMBLING$/u },
      { line: 5005, role: "next-unit-subheading", pattern: /^INTRODUCTION$/u },
    ],
    outputFile: "kierkegaard-stages-in-vino-veritas-hollander-1923.txt",
    heading: "# STAGES ON LIFE’S ROAD\n\n## PART I — IN VINO VERITAS (THE BANQUET)",
    scanBoundary: {
      firstPdfPage: 48,
      lastPdfPage: 120,
      printedPages: "46-118",
      followingPdfPage: 121,
      followingUnit: "Fear and Trembling — Introduction",
    },
    anchorEvidence: {
      "kierkegaard-aesthetic-immediacy": { pdfPage: 51, printedPage: 49 },
    },
    cardQuotes: {
      "kierkegaard-aesthetic-immediacy": "Whatever is to be good must come at once;",
    },
    dropLine(line, index, lines) {
      if (/^Selectio\S* from the \S+ of Kierkegaard(?: \d+)?$/iu.test(line)) return true;
      if (/^(?:\d+ )?Uni(?:versity|Dersity) of Texas Bulletin(?: \d+)?$/iu.test(line)) return true;
      const nextNonblank = lines.slice(index + 1).map(normalizeSpaces).find(Boolean) ?? "";
      return /^[A-Za-z0-9'"* .-]{1,10}$/u.test(line)
        && /^(?:\d+ )?Uni(?:versity|Dersity) of Texas Bulletin$/iu.test(nextNonblank);
    },
    transform(text) {
      let result = text.replace(/^IN VINO VERITAS \(THE BANQUET\)\s*/u, "");
      result = replaceRequired(
        result,
        /Whatever is to be good must come at once\s*;/u,
        "Whatever is to be good must come at once;",
        "Kierkegaard card clause, PDF p. 51 / print p. 49",
      );
      result = replaceRequired(result, /\bbecpme\b/u, "become", "Kierkegaard become OCR form");
      result = replaceRequired(result, /\bwork spoken\b/u, "word spoken", "Kierkegaard word OCR form");
      result = replaceRequired(result, /\bseeri something\b/u, "seen something", "Kierkegaard seen OCR form");
      result = replaceRequired(result, /\blor now the worst\b/u, "for now the worst", "Kierkegaard for OCR form");
      result = replaceRequired(result, /\bwoyld put me\b/u, "would put me", "Kierkegaard would OCR form");
      return result;
    },
    firstBodyText: "It was on one of the last days in July, at ten o'clock in the evening",
    finalBodyText: "Victor, who imagined that he had the prescriptive right to do so.",
    excludedPatterns: [
      /Selections from the Writings of Kierkegaard/iu,
      /University of Texas Bulletin/iu,
      /(?:^|\n\n)FEAR AND TREMBLING(?:\n\n|$)/iu,
    ],
    corrections: [
      "Normalized the registered semicolon clause against PDF p. 51 / print p. 49.",
      "Corrected five unambiguous OCR letter confusions (becpme, work/word, seeri, lor/for, woyld) against the scan; no prose was modernized.",
      "Removed alternating book-title and University of Texas Bulletin running headers while retaining notes and the complete selection.",
    ],
  },
  {
    unitId: "ru-the-philosophy-of-history-introduction-introduction-21f23086",
    thoughtIds: ["hegel-cunning-of-reason", "hegel-history-consciousness-freedom"],
    sourceFile: "philosophyofhist00hege_djvu.txt",
    scanFile: "philosophyofhist00hege.pdf",
    range: { firstLine: 810, lastLine: 5612 },
    markers: [
      { line: 810, role: "work-heading", pattern: /^PHILOSOPHY OF HISTORY$/u },
      { line: 812, role: "start", pattern: /^INTRODUCTION$/u },
      { line: 5615, role: "next-natural-unit", pattern: /^THE PHILOSOPHY OF HISTORY$/u },
      { line: 5618, role: "next-unit-subheading", pattern: /^CLASSIFICATION OF HISTORIC DATA$/u },
    ],
    outputFile: "hegel-philosophy-history-sibree-1899-introduction.txt",
    heading: "# THE PHILOSOPHY OF HISTORY\n\n## INTRODUCTION",
    scanBoundary: {
      firstPdfPage: 35,
      lastPdfPage: 136,
      printedPages: "1-102",
      followingPdfPage: 137,
      followingUnit: "Classification of Historic Data",
    },
    anchorEvidence: {
      "hegel-history-consciousness-freedom": { pdfPage: 53, printedPage: 19 },
      "hegel-cunning-of-reason": { pdfPage: 67, printedPage: 33 },
    },
    cardQuotes: {
      "hegel-cunning-of-reason": "This may be called the cunning of reason—that it sets the passions to work for itself, while that which develops its existence through such impulsion pays the penalty, and suffers loss.",
      "hegel-history-consciousness-freedom": "The History of the world is none other than the progress of the consciousness of Freedom; a progress whose development according to the necessity of its nature, it is our business to investigate.",
    },
    dropLine(line, index, lines) {
      const sourceLine = 810 + index;
      if (hegelRunningHeaderSourceLines.has(sourceLine)
        || hegelDetachedPageNumberSourceLines.has(sourceLine)) return true;
      const isRunningHeader = (candidate) => (
        candidate.length <= 64
        && (/PHILOSOPHY OF HISTORY[,.]?$/iu.test(candidate)
          || /^INTRODUCTION(?: [A-Za-z0-9]{1,4})?$/iu.test(candidate))
      );
      const nearbyRunningHeader = lines
        .slice(Math.max(0, index - 5), index + 6)
        .map(normalizeSpaces)
        .some(isRunningHeader);
      return isRunningHeader(line)
        || (/^[A-Za-z0-9]{1,3}$/u.test(line) && nearbyRunningHeader);
    },
    transform(text) {
      let result = text;
      result = replaceRequired(
        result,
        /bitid toovtlicr tlio llootiiii; olcinctits of story, ami treasure them up for iinuiortality iu the Temple of Mnemosyne\. Leg:ends, l>a!lad-stories, Traclitiotis, nuist be exeluded from such orio;inal history\. These are but dim and hazy forms of historical apprehension, and therefore belong; to nations whose intelligence is but half awakened\. Here, on the contrary, we have to do with people fully conscious of what they were and what they were about\. The domain of reality — actually seen, or capable of being- so — alTords a very dilierent basis in point of tirnmess from that fugitive and shadowy element, in which were engenilered those legends and poetic dreams whose historical prestige vanishes, as soon as nations have attained a mature individuality\./u,
        "bind together the fleeting elements of story, and treasure them up for immortality in the Temple of Mnemosyne. Legends, Ballad-stories, Traditions, must be excluded from such original history. These are but dim and hazy forms of historical apprehension, and therefore belong to nations whose intelligence is but half awakened. Here, on the contrary, we have to do with people fully conscious of what they were and what they were about. The domain of reality—actually seen, or capable of being so—affords a very different basis in point of firmness from that fugitive and shadowy element, in which were engendered those legends and poetic dreams whose historical prestige vanishes, as soon as nations have attained a mature individuality.",
        "Hegel badly degraded opening continuation, PDF p. 36 / print p. 2",
      );
      result = replaceRequired(result, /\benviromnent\b/u, "environment", "Hegel environment OCR form on print p. 2");
      result = replaceRequired(result, /\bmouliled\b/u, "moulded", "Hegel moulded OCR form on print p. 2");
      result = replaceRequired(result, /\bJiis 0:01 aims\b/u, "his own aims", "Hegel his own OCR form on print p. 2");
      result = replaceRequired(result, /\bbo\)ia fide\b/u, "bona fide", "Hegel bona fide OCR form on print p. 2");
      result = replaceRequired(result, /\bfrof\^ria f\^rrsotta\b/u, "propria persona", "Hegel propria persona OCR form on print p. 2");
      result = replaceRequired(
        result,
        /Periods of happiness are blank pages in it, for they are periods[\s\S]*?abstractedly\./u,
        "Periods of happiness are blank pages in it, for they are periods of harmony—periods when the antithesis is in abeyance. Reflection on self—the Freedom above described—is abstractly defined as the formal element of the activity of the absolute Idea. The realizing activity of which we have spoken is the middle term of the Syllogism, one of whose extremes is the Universal essence, the Idea, which reposes in the penetralia of Spirit; and the other, the complex of external things—objective matter. That activity is the medium by which the universal latent principle is translated into the domain of objectivity.\n\nI will endeavor to make what has been said more vivid and clear by examples.\n\nThe building of a house is, in the first instance, a subjective aim and design. On the other hand we have, as means, the several substances required for the work—Iron, Wood, Stones. The elements are made use of in working up this material: fire to melt the iron, wind to blow the fire, water to set wheels in motion, in order to cut the wood, etc. The result is, that the wind, which has helped to build the house, is shut out by the house; so also are the violence of rains and floods, and the destructive powers of fire, so far as the house is made fire-proof. The stones and beams obey the law of gravity—press downward—and so high walls are carried up. Thus the elements are made use of in accordance with their nature, and yet to co-operate for a product, by which their operation is limited. Thus the passions of men are gratified; they develop themselves and their aims in accordance with their natural tendencies, and build up the edifice of human society; thus fortifying a position for Right and Order against themselves.\n\nThe connection of events above indicated, involves also the fact, that in history an additional result is commonly produced by human actions beyond that which they aim at and obtain—that which they immediately recognize and desire. They gratify their own interest; but something further is thereby accomplished, latent in the actions in question, though not present to their consciousness, and not included in their design. An analogous example is offered in the case of a man who, from a feeling of revenge—perhaps not an unjust one, but produced by injury on the other's part—burns another man's house. A connection is immediately established between the deed itself and a train of circumstances not directly included in it, taken abstractedly.",
        "Hegel severely degraded print p. 27, PDF p. 61",
      );
      result = replaceRequired(
        result,
        /The History of the world is none other than the pro\^-ress of the consciousness of Freedom; a progress whose development according to the necessity of its nature, it is our business to investigate\./u,
        "The History of the world is none other than the progress of the consciousness of Freedom; a progress whose development according to the necessity of its nature, it is our business to investigate.",
        "Hegel consciousness of Freedom sentence, PDF p. 53 / print p. 19",
      );
      result = replaceRequired(
        result,
        /This may be called the cunning of reason\s*—\s*that it sets the passions to work for itself, while that which develops its existence through such impulsion pays the penalty, and suffers loss\./u,
        "This may be called the cunning of reason—that it sets the passions to work for itself, while that which develops its existence through such impulsion pays the penalty, and suffers loss.",
        "Hegel cunning of reason sentence, PDF p. 67 / print p. 33",
      );
      return result;
    },
    firstBodyText: "THE subject of this course of Lectures is the Philosophical History of the World.",
    finalBodyText: "counterbalance each other.",
    excludedPatterns: [
      /(?:^|\n)INTRODUCTION(?:\s+[A-Za-z0-9]{1,4})?(?:\n|$)/iu,
      /(?:^|\n)[^\n]{0,12}PHILOSOPHY OF HISTORY[,.]?(?:\n|$)/iu,
      /CLASSIFICATION OF HISTORIC DATA/iu,
    ],
    corrections: [
      "Restored the severely degraded opening continuation and five unambiguous print-p. 2 OCR forms against PDF p. 36; wording and punctuation follow the scan.",
      "Restored the scan-readable print-p. 27 passage that the source OCR had reduced to fragments, against PDF p. 61.",
      "Normalized pro^-ress to progress in the registered Freedom sentence after visual verification on PDF p. 53 / print p. 19.",
      "Joined the scan-backed line wraps and em dash in the registered cunning-of-reason sentence on PDF p. 67 / print p. 33.",
      "Removed recto/verso Introduction and Philosophy of History running headers plus isolated OCR page-number fragments; retained the complete print pp. 1-102 Introduction.",
    ],
  },
];

await mkdir(derivedRoot, { recursive: true });
const report = [];

for (const unit of units) {
  const sourcePath = resolve(originRoot, unit.sourceFile);
  const scanPath = resolve(originRoot, unit.scanFile);
  const [source, scan] = await Promise.all([readFile(sourcePath, "utf8"), readFile(scanPath)]);
  const lines = sourceLines(source);
  for (const marker of unit.markers) assertSourceMarker(lines, marker, unit.unitId);

  const rawSlice = lineRange(lines, unit.range.firstLine, unit.range.lastLine, unit.unitId);
  const filtered = filterLines(rawSlice, unit.dropLine);
  let body = cleanOcrSlice(filtered.text);
  body = unit.transform(body).trim();

  if (!body.startsWith(unit.firstBodyText)) {
    throw new Error(`${unit.unitId}: first body text does not match the verified start boundary`);
  }
  assertContains(body, [unit.finalBodyText, ...Object.values(unit.cardQuotes)], unit.unitId);
  assertDoesNotContain(body, unit.excludedPatterns, unit.unitId);

  const output = `${unit.heading}\n\n${body}\n`;
  const duplicateParagraphs = repeatedLongParagraphs(output);
  if (duplicateParagraphs.length > 0) {
    throw new Error(`${unit.unitId}: repeated long paragraphs: ${duplicateParagraphs.join(" | ")}`);
  }
  const productionAnchors = assertProductionAnchors(output, unit.cardQuotes, unit.unitId);
  const outputPath = resolve(derivedRoot, unit.outputFile);
  await writeFile(outputPath, output, "utf8");

  report.push({
    unitId: unit.unitId,
    thoughtIds: unit.thoughtIds,
    sourcePath: `research/source-cache/non-public-24-recovery/origins/${unit.sourceFile}`,
    sourceBytes: Buffer.byteLength(source),
    sourceSha256: sha256(source),
    scanPath: `research/source-cache/non-public-24-recovery/origins/${unit.scanFile}`,
    scanBytes: scan.length,
    scanSha256: sha256(scan),
    sourceBoundary: unit.range,
    boundaryMarkers: unit.markers.map(({ line, role }) => ({ line, role })),
    scanBoundary: unit.scanBoundary,
    anchorEvidence: unit.anchorEvidence,
    outputPath: `research/source-cache/reading-unit-derived/${unit.outputFile}`,
    outputBytes: Buffer.byteLength(output),
    outputCharacters: output.length,
    outputWords: output.split(/\s+/u).filter(Boolean).length,
    outputSha256: sha256(output),
    droppedRunningMatterLines: filtered.dropped,
    productionAnchors,
    qa: {
      exactRegisteredQuotesPresent: true,
      startBoundaryPresent: true,
      finalBoundaryPresent: true,
      nextNaturalUnitExcluded: true,
      runningMatterResiduals: 0,
      repeatedLongParagraphs: 0,
    },
    corrections: unit.corrections,
  });
}

const payload = {
  schemaVersion: 1,
  command: "node scripts/derive-non-public-recovery-batch2b2a.mjs",
  generatedAt: new Date().toISOString(),
  methodology: "Fixed source-line boundaries verified against the associated Internet Archive scans; only scan-backed OCR normalization and running-matter removal are applied.",
  units: report,
};
await writeFile(reportPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
console.log(JSON.stringify({ written: report.length, reportPath, units: report }, null, 2));
