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
  "research/source-cache/non-public-24-recovery/derived-batch-2b2b.json",
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

function filterRunningMatter(value, firstLine, classifyLine) {
  const removed = [];
  const kept = [];
  let pendingPageBreak = false;
  const lines = String(value).replace(/\r\n?/gu, "\n").split("\n");
  for (const [index, rawLine] of lines.entries()) {
    const line = normalizeSpaces(rawLine);
    const reason = classifyLine(line);
    if (reason) {
      while (kept.length > 0 && normalizeSpaces(kept.at(-1)) === "") kept.pop();
      removed.push({ line: firstLine + index, text: line, reason });
      pendingPageBreak = true;
      continue;
    }
    if (pendingPageBreak && !line) continue;
    if (pendingPageBreak) {
      const lastBlank = kept.findLastIndex((candidate) => normalizeSpaces(candidate) === "");
      const currentBlock = normalizeSpaces(kept.slice(lastBlank + 1).join(" "));
      const previous = normalizeSpaces(kept.at(-1) ?? "");
      const blockIsFootnote = /^(?:[*'’"™©]|[¹²³⁴⁵⁶⁷⁸⁹]\s)/u.test(currentBlock);
      const startsStructuralUnit = /^(?:\d+\.|§\s*\d+\.|[IVXLCDM]+\.)\s+[A-Z]/u.test(line);
      const previousEndsSentence = /[.!?]["'’”)]?$/u.test(previous);
      if (blockIsFootnote || startsStructuralUnit || previousEndsSentence) kept.push("");
      pendingPageBreak = false;
    }
    kept.push(rawLine);
  }
  const text = kept.join("\n");
  return { text, removed };
}

function cleanOcrSlice(value, preservedLineBreakCompounds = []) {
  const preserved = new Set(
    preservedLineBreakCompounds.map((word) => word.toLocaleLowerCase("en")),
  );
  const normalized = String(value)
    .normalize("NFC")
    .replace(/\r\n?/gu, "\n")
    .replace(/\u00ad/gu, "")
    .replace(
      /([A-Za-z]+(?:-[A-Za-z]+)*)-[ \t]*(?:\n[ \t]*)+([a-z]+)/gu,
      (_, left, right) => {
        const candidate = `${left}-${right}`;
        return preserved.has(candidate.toLocaleLowerCase("en"))
          ? candidate
          : `${left}${right}`;
      },
    )
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

function replaceRequired(text, pattern, replacement, label) {
  pattern.lastIndex = 0;
  if (!pattern.test(text)) throw new Error(`Required correction did not match: ${label}`);
  pattern.lastIndex = 0;
  return text.replace(pattern, replacement);
}

function removeRequiredParagraph(text, paragraph, label) {
  const token = `\n\n${paragraph}\n\n`;
  if (!text.includes(token)) throw new Error(`Required paragraph did not match: ${label}`);
  return text.replace(token, "\n\n");
}

function assertNoResidualRunningMatter(text, patterns, unitId) {
  for (const pattern of patterns) {
    pattern.lastIndex = 0;
    const match = text.match(pattern);
    if (match) throw new Error(`${unitId}: residual running matter: ${match[0]}`);
  }
}

function assertMatchedAnchor(anchor, unitId, thoughtId) {
  if (!anchor || anchor.match === "unmatched" || anchor.match === "missing-quote") {
    throw new Error(`${unitId}: production matcher did not match ${thoughtId}`);
  }
}

const units = [
  {
    unitId: "ru-the-economics-of-exhaustible-resources-whole-work-997380af",
    thoughtId: "economics-modern-hotelling-scarcity-rent",
    cardQuote: "The formula p = p₀e^{γt} fixes the relative prices at different times under free competition.",
    ocrFile: "sim_journal-of-political-economy_1931-04_39_2_djvu.txt",
    scanFile: "sim_journal-of-political-economy_1931-04_39_2.pdf",
    range: { firstLine: 124, lastLine: 2274 },
    markers: [
      { line: 124, role: "start-title", pattern: /^THE ECONOMICS OF EXHAUSTIBLE RESOURCES$/u },
      { line: 127, role: "first-section", pattern: /^I\. THE PECULIAR PROBLEMS OF MINERAL WEALTH$/u },
      { line: 2268, role: "author-signature", pattern: /^HAROLD HOTELLING$/u },
      { line: 2269, role: "institution", pattern: /^STANFORD UNIVERSITY$/u },
      { line: 2275, role: "next-natural-unit", pattern: /^PROFESSOR FISHER’S INTEREST THEORY: A$/u },
    ],
    scanBoundary: {
      firstPdfPage: 5,
      lastPdfPage: 43,
      printedPages: "137-175",
      followingPdfPage: 44,
      followingUnit: "Professor Fisher’s Interest Theory: A Case in Point",
    },
    anchorEvidence: { pdfPage: 9, printedPage: 141 },
    outputFile: "hotelling-exhaustible-resources-1931-complete-paper.txt",
    heading: "# THE ECONOMICS OF EXHAUSTIBLE RESOURCES\n\nHarold Hotelling",
    preservedLineBreakCompounds: [
      "carry-overs",
      "g-axis",
      "semi-replaceable",
      "so-called",
      "well-informed",
    ],
    classifyRunningMatter(line) {
      if (line === "137") return "first-page-folio";
      if (/^\d{3}\s+HAROLD HOTELLING$/u.test(line)) return "even-page-running-header";
      if (/^THE ECONOMICS OF EXHAUSTIBLE RESOURCES\s+[\dI]+$/u.test(line)) {
        return "odd-page-running-header";
      }
      return undefined;
    },
    transform(raw) {
      let text = removeRequiredPrefix(
        raw,
        /^THE ECONOMICS OF EXHAUSTIBLE RESOURCES\s*/u,
        "Hotelling paper title",
      );
      text = replaceRequired(
        text,
        /(^|\n\n)ONTEMPLATION of the world’s disappearing supplies/u,
        "$1CONTEMPLATION of the world’s disappearing supplies",
        "Hotelling opening drop-cap C, scan PDF p. 5 / print p. 137",
      );
      text = replaceRequired(
        text,
        /their exploitation\. The\s+feeling that these products/u,
        "their exploitation. The feeling that these products",
        "Hotelling opening paragraph split caused by drop-cap OCR layout",
      );
      text = replaceRequired(
        text,
        /The force of interest will be denoted by \+, so\s+that e~” is the present value of a unit of profit to be obtained after time #, interest rates being assumed to remain unchanged in the meantime\./u,
        "The force of interest will be denoted by γ, so that e^{-γt} is the present value of a unit of profit to be obtained after time t, interest rates being assumed to remain unchanged in the meantime.",
        "Hotelling interest notation, scan PDF p. 8 / print p. 140",
      );
      text = replaceRequired(
        text,
        /modifications\."\s+2\. FREE COMPETITION/u,
        "modifications.¹\n\n2. FREE COMPETITION",
        "Hotelling footnote 1 marker, scan PDF p. 8 / print p. 140",
      );
      text = replaceRequired(
        text,
        /\* As in “‘A General Mathematical Theory of Depreciation,/u,
        "¹ As in “‘A General Mathematical Theory of Depreciation,",
        "Hotelling footnote 1 text, scan PDF p. 8 / print p. 140",
      );
      text = replaceRequired(
        text,
        /Since it is a matter of indifference to the owner of a mine whether he receives for a unit of his product a price p, now or a price pe“ after time #, it is not unreasonable to expect that the price p will be a function of the time of the form p= \/,e"\./u,
        "Since it is a matter of indifference to the owner of a mine whether he receives for a unit of his product a price p₀ now or a price p₀e^{γt} after time t, it is not unreasonable to expect that the price p will be a function of the time of the form p = p₀e^{γt}.",
        "Hotelling free-competition notation, scan PDF p. 8 / print p. 140",
      );
      text = replaceRequired(
        text,
        /Here # is to be interpreted as the net price received/u,
        "Here p is to be interpreted as the net price received",
        "Hotelling p variable, scan PDF p. 9 / print p. 141",
      );
      text = replaceRequired(
        text,
        /The formula\s+\(1\) p= poe”\s+fixes the relative prices at different times under free competition\./u,
        "The formula p = p₀e^{γt} fixes the relative prices at different times under free competition.",
        "Hotelling registered anchor and equation (1), scan PDF p. 9 / print p. 141",
      );
      return replaceRequired(
        text,
        /exhaustible asset\. HAROLD HOTELLING STANFORD UNIVERSITY$/u,
        "exhaustible asset.\n\nHAROLD HOTELLING\n\nSTANFORD UNIVERSITY",
        "Hotelling closing author signature",
      );
    },
    residualRunningMatter: [
      /^\d{3}\s+HAROLD HOTELLING$/gmu,
      /^THE ECONOMICS OF EXHAUSTIBLE RESOURCES\s+[\dI]+$/gmu,
      /^137$/gmu,
      /PROFESSOR FISHER’S INTEREST THEORY/gmu,
    ],
    corrections: [
      "Restored the decorative opening C omitted by OCR on scan PDF p. 5 / print p. 137.",
      "Normalized γ, t, p₀, and exponential notation in the defining free-competition passage against scan PDF pp. 8-9 / print pp. 140-141.",
      "Removed equation label (1) only from the normalized anchor sentence so the registered quotation remains contiguous; the formula and surrounding wording are unchanged.",
    ],
  },
  {
    unitId: "ru-the-economics-of-welfare-part-ii-chapter-xiv-6cc3710f",
    thoughtId: "economics-principles-pigou-price-discrimination",
    cardQuote: "A third degree would obtain if the monopolist were able to distinguish among his customers n different groups, separated from one another more or less by some practicable mark, and could charge a separate monopoly price to the members of each group.",
    ocrFile: "cu31924073868113_djvu.txt",
    scanFile: "cu31924073868113.pdf",
    range: { firstLine: 12353, lastLine: 13038 },
    markers: [
      { line: 12353, role: "start-chapter", pattern: /^CHAPTEE XIV$/u },
      { line: 12356, role: "chapter-title", pattern: /^DISCRIMINATING MONOPOLY '\s*$/u },
      { line: 13039, role: "next-natural-unit", pattern: /^CHAPTEE XV$/u },
      { line: 13041, role: "next-unit-title", pattern: /^THE SPECIAl PEOBLEM OF KAILWAT KATES$/u },
    ],
    scanBoundary: {
      firstPdfPage: 284,
      lastPdfPage: 299,
      printedPages: "240-255",
      followingPdfPage: 300,
      followingUnit: "Part II, Chapter XV — The Special Problem of Railway Rates",
    },
    anchorEvidence: { pdfPage: 288, printedPage: 244 },
    outputFile: "pigou-economics-welfare-1920-part-ii-chapter-xiv.txt",
    heading: "# PART II — CHAPTER XIV\n\n## DISCRIMINATING MONOPOLY",
    preservedLineBreakCompounds: ["sub-market"],
    classifyRunningMatter(line) {
      if (line === "240") return "first-page-folio";
      if (/^\d{3}\s+ECONOMICS OF WELFA\S*\s+pt\./iu.test(line)) {
        return "even-page-running-header";
      }
      if (/^(?:CH|OH|0H)\.\s*XIV\b.*MONOPOLY\s+\d+$/iu.test(line)) {
        return "odd-page-running-header";
      }
      return undefined;
    },
    transform(raw) {
      let text = removeRequiredPrefix(
        raw,
        /^CHAPTEE XIV\s+DISCRIMINATING MONOPOLY '\s*/u,
        "Pigou Part II Chapter XIV heading",
      );
      text = replaceRequired(
        text,
        /different units of cpmmodity/u,
        "different units of commodity",
        "Pigou commodity OCR, scan PDF p. 288 / print p. 244",
      );
      text = replaceRequired(
        text,
        /at diflerent rates/u,
        "at different rates",
        "Pigou different OCR, scan PDF p. 286 / print p. 242",
      );
      text = replaceRequired(
        text,
        /traders in 0 wishing/u,
        "traders in C wishing",
        "Pigou location label C, scan PDF p. 287 / print p. 243",
      );
      text = replaceRequired(
        text,
        /the Euhr coal district/u,
        "the Ruhr coal district",
        "Pigou Ruhr OCR, scan PDF p. 286 / print p. 242",
      );
      text = replaceRequired(
        text,
        /Eesources tend to be attracted/u,
        "Resources tend to be attracted",
        "Pigou Resources OCR, scan PDF p. 299 / print p. 255",
      );
      text = replaceRequired(
        text,
        /monopoly plv\^ restriction of entry/u,
        "monopoly plus restriction of entry",
        "Pigou plus OCR, scan PDF p. 299 / print p. 255",
      );
      text = replaceRequired(text, /\bpi\^oduction\b/gu, "production", "Pigou production OCR");
      text = replaceRequired(text, /\balL\b/gu, "all", "Pigou all OCR with terminal capital L");
      text = replaceRequired(text, /\baU\b/gu, "all", "Pigou all OCR with terminal capital U");
      text = replaceRequired(
        text,
        /\^(?:ZiM|te)\b/gu,
        "plus",
        "Pigou italic plus OCR on print p. 247",
      );
      text = replaceRequired(
        text,
        /\b(?:plits|pltts|pliis|plvs)\b|pl%ts|j>lus/gu,
        "plus",
        "Pigou repeated italic plus OCR across print pp. 248-252",
      );
      text = replaceRequired(text, /\bh\^her\b/gu, "higher", "Pigou higher OCR");
      text = replaceRequired(text, /\bsufiBces\b/gu, "suffices", "Pigou suffices OCR");
      text = replaceRequired(text, /\biindustry\b/gu, "industry", "Pigou industry OCR");
      text = replaceRequired(text, /\bconviitions\b/gu, "conditions", "Pigou conditions OCR");
      text = replaceRequired(text, /\bTinally\b/gu, "Finally", "Pigou Finally OCR");
      text = replaceRequired(text, /\bincreasmg\b/gu, "increasing", "Pigou increasing OCR");
      text = replaceRequired(text, /Nor is this all For/u, "Nor is this all. For", "Pigou sentence punctuation, print p. 247");
      text = replaceRequired(text, /§ 9,/u, "§ 9.", "Pigou section 9 punctuation, print p. 247");
      text = replaceRequired(text, /any r\*"" unit/u, "any rᵗʰ unit", "Pigou ordinal variable, print p. 247");
      text = replaceRequired(text, /\bgi'eat\b/gu, "great", "Pigou great OCR");
      text = replaceRequired(text, /\bdiflSculty\b/gu, "difficulty", "Pigou difficulty OCR");
      text = replaceRequired(
        text,
        /\bArUhrcuyite\b/gu,
        "Anthracite",
        "Pigou Anthracite citation, scan PDF p. 290 / print p. 246",
      );
      text = replaceRequired(
        text,
        /pp\. ISO et seq\./u,
        "pp. 150 et seq.",
        "Pigou Anthracite citation page, scan PDF p. 290 / print p. 246",
      );
      text = replaceRequired(text, /' Of\. Appendix III\./u, "' Cf. Appendix III.", "Pigou Cf. footnote OCR");
      text = replaceRequired(
        text,
        /returns prevail But,/u,
        "returns prevail. But,",
        "Pigou sentence punctuation, scan print p. 248",
      );
      const notes = [
        {
          label: "Print p. 240, note 1",
          source: "1 In this chapter some of the results, depending, as they do, on mathematical reasoning that cannot readily be translated into ordinary language, are necessarily stated in a somewhat dogmatic form. For proof of these results reference must be made to Appendix III.",
        },
        {
          label: "Print p. 242, note 1",
          source: "• Walker, Combination in the German Coal Industry, p. 274.",
        },
        {
          label: "Print p. 242, note 2",
          source: "2 It must be added, however, that, though trade marks are sometimes mere devices for creating monopoly power, there is, nevertheless, a valid reason for protecting them against infringement by legal enactments, because ' ' an inducement is thereby given to make satisfactory articles and to continue making them.\" (Cf. Taussig, American Economic Review Supplement, vol. vi., 1916, p. 177.)",
        },
        {
          label: "Print p. 244, note 1",
          source: "1 A person's demand schedule for any commodity is the list of different quantities of that commodity that he would purchase at different price levels. Cf. Marshall. Principles of Economics, p. 96.",
        },
        {
          label: "Print p. 245, note 1",
          source: "' For such an analysis, cf. my paper \" Monopoly and Consumers' Surplus,'' Economic Journal, September 1904.",
        },
        {
          label: "Print pp. 245-246, note 2",
          source: "' Colson, Coitrs d'iconomie politique, vol. vi. p. 211. Special opportunities for injurious discrimination of this sort exist when a railway company is also itself a large producer of some commodity, say coal, which it also transports for rival producers. To prevent the obvious abuses to which this state of things may lead, the \"commodity clause \" of the Hepburn Act passed in 1906 in the United States made it unlawful for any railway to engage in interstate transport of any commodity which had been mined or manufactured by itself. The law does not, however, prevent a railway from transporting a commodity",
          continuation: "produced by a company in which it holds a majority of the shares, and it can, therefore, be evaded without great difficulty. (Cf. Jones, The Anthracite Coal Combination, pp. 150 et seq.)",
          rendered: "Colson, Cours d'économie politique, vol. vi. p. 211. Special opportunities for injurious discrimination of this sort exist when a railway company is also itself a large producer of some commodity, say coal, which it also transports for rival producers. To prevent the obvious abuses to which this state of things may lead, the \"commodity clause\" of the Hepburn Act passed in 1906 in the United States made it unlawful for any railway to engage in interstate transport of any commodity which had been mined or manufactured by itself. The law does not, however, prevent a railway from transporting a commodity produced by a company in which it holds a majority of the shares, and it can, therefore, be evaded without great difficulty. (Cf. Jones, The Anthracite Coal Combination, pp. 150 et seq.)",
        },
        {
          label: "Print p. 247, note 1",
          rendered: "Cf. Appendix III. §§ 9-10.",
        },
        {
          label: "Print p. 248, notes 1-2",
          source: "' Appendix III. § 20. ^ Cf. ibid. § 21.",
          rendered: "Appendix III. § 20. Cf. ibid. § 21.",
        },
        {
          label: "Print p. 250, note 1",
          rendered: "Cf. Appendix III. § 23.",
        },
      ];
      for (const note of notes) {
        if (note.source) {
          text = removeRequiredParagraph(text, note.source, note.label);
        }
        if (note.continuation) {
          text = removeRequiredParagraph(text, note.continuation, `${note.label} continuation`);
        }
      }
      text = replaceRequired(
        text,
        /individual net product and trade ' Cf\. Appendix III\. §§ 9-10\.\s+net product/u,
        "individual net product and trade net product",
        "Pigou print-p. 247 footnote reflow",
      );
      text = replaceRequired(
        text,
        /some of the commodity would have been ' Cf\. Appendix III\. § 23\.\s+consumed/u,
        "some of the commodity would have been consumed",
        "Pigou print-p. 250 footnote reflow",
      );
      text = replaceRequired(text, /district to\s+increase its production/u, "district to increase its production", "Pigou print-p. 240 body reflow");
      text = replaceRequired(text, /would prefer\s+to give 300 shillings/u, "would prefer to give 300 shillings", "Pigou print-p. 244 body reflow");
      text = replaceRequired(text, /condemn it\." \^ Thus,\s+a powerful influence/u, "condemn it.\" ^ Thus, a powerful influence", "Pigou print-pp. 245-246 body reflow");
      text = replaceRequired(text, /outrage the\s+popular sense of justice/u, "outrage the popular sense of justice", "Pigou print-pp. 246-247 body reflow");
      text = replaceRequired(text, /effects of monopoly\s+plus discrimination/u, "effects of monopoly plus discrimination", "Pigou print-pp. 248-249 body reflow");
      const renderedNotes = notes.map((note) => `- ${note.label}: ${note.rendered ?? note.source}`);
      return `${text.replace(/\n{3,}/gu, "\n\n").trim()}\n\n## NOTES\n\n${renderedNotes.join("\n\n")}`;
    },
    residualRunningMatter: [
      /^\d{3}\s+ECONOMICS OF WELFA\S*\s+pt\./gimu,
      /^(?:CH|OH|0H)\.\s*XIV\b.*MONOPOLY\s+\d+$/gimu,
      /^240$/gmu,
      /CHAPTEE XV/gmu,
      /THE SPECIAl PEOBLEM OF KAILWAT KATES/gmu,
    ],
    corrections: [
      "Normalized the OCR heading CHAPTEE to CHAPTER in the supplied Markdown heading; the complete chapter text remains bounded by the scanned Chapter XV heading.",
      "Corrected a bounded set of visually clear OCR forms in the chapter body and notes, including commodity, production, all, plus, higher, suffices, conditions, Anthracite, and the print-p. 246 citation page.",
      "Reflowed page-bottom footnotes into a NOTES section in original page order so they no longer interrupt cross-page body sentences; no note text was omitted.",
      "The registered third-degree discrimination sentence was visually checked on scan PDF p. 288 / print p. 244 and is otherwise unchanged.",
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

  const filtered = filterRunningMatter(
    range.text,
    unit.range.firstLine,
    unit.classifyRunningMatter,
  );
  const cleaned = cleanOcrSlice(filtered.text, unit.preservedLineBreakCompounds);
  const body = unit.transform(cleaned);
  const output = `${unit.heading}\n\n${body}\n`;
  assertNoResidualRunningMatter(output, unit.residualRunningMatter, unit.unitId);

  const outputRelativePath = `research/source-cache/reading-unit-derived/${unit.outputFile}`;
  const outputPath = resolve(projectRoot, outputRelativePath);
  const paragraphs = extractTextParagraphs(output, { sourceUrl: outputRelativePath });
  const matched = matchCardAnchors(paragraphs, { [unit.thoughtId]: unit.cardQuote });
  const anchor = matched.anchors[unit.thoughtId];
  assertMatchedAnchor(anchor, unit.unitId, unit.thoughtId);
  const exactOccurrences = output.split(unit.cardQuote).length - 1;
  if (exactOccurrences !== 1) {
    throw new Error(`${unit.unitId}: expected one exact card anchor, found ${exactOccurrences}`);
  }

  await writeFile(outputPath, output, "utf8");
  reportUnits.push({
    unitId: unit.unitId,
    thoughtId: unit.thoughtId,
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
    runningMatterRemoved: filtered.removed,
    cardAnchor: {
      quote: unit.cardQuote,
      exactOccurrences,
      evidence: unit.anchorEvidence,
      productionMatcherResult: anchor,
    },
    normalization: [
      "NFC and whitespace normalization",
      "edition-specific running headers and page folios removed",
      "line-end hyphenation dewrapped; attested lexical compounds retained",
      "only scan-verifiable OCR corrections listed below were applied",
      "no paraphrase, translation substitution, or card-centered short window",
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
  command: "node scripts/derive-non-public-recovery-batch2b2b.mjs",
  generatedFrom: "existing raw OCR and original scans only; no network access",
  naturalUnitPolicy: "Each output is the complete registered paper or chapter, bounded by the following peer unit; no card-centered short window is used.",
  sharedFilesIntentionallyUnchanged: [
    "content/**",
    "research/reading-units/inventory.json",
    "research/reading-units/source-overrides.json",
    "public/readings/**",
    "research/source-cache/reading-unit-derived/manifest.json",
  ],
  written: reportUnits.length,
  totalOutputBytes: reportUnits.reduce((sum, unit) => sum + unit.output.bytes, 0),
  allAnchorsMatched: reportUnits.every(({ cardAnchor }) => (
    cardAnchor.productionMatcherResult.match !== "unmatched"
    && cardAnchor.exactOccurrences === 1
  )),
  residualRunningMatterCount: 0,
  units: reportUnits,
};

await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
console.log(JSON.stringify(report, null, 2));
