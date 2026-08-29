#!/usr/bin/env node

import { execFile } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const sourcePdf = resolve(
  projectRoot,
  "research/source-cache/remaining-paper-recovery/watson-behaviorism-1925.pdf",
);
const rawOcrOutput = resolve(
  projectRoot,
  "research/source-cache/remaining-paper-recovery/watson-behaviorism-1925-chapter-v-tesseract.txt",
);
const readingUnitOutput = resolve(
  projectRoot,
  "research/source-cache/reading-unit-derived/watson-behaviorism-1925-chapter-v.txt",
);
const reportOutput = resolve(
  projectRoot,
  "research/reading-units/watson-behaviorism-chapter-v-derivation.json",
);
const pdftoppm = process.env.PDFTOPPM_BIN ?? "pdftoppm";
const tesseract = process.env.TESSERACT_BIN ?? "tesseract";
const firstPdfPage = 105;
const lastPdfPage = 125;

const pageStartMarkers = new Map([
  [105, "V. Are There Any Human Instincts"],
  [106, "first appeared many millions"],
  [107, "As an animal that has a nine-month"],
  [108, "THE GENETIC PSYCHOLOGIST’S ANSWER"],
  [109, "inheritances are color of hair"],
  [110, "are not inherited? Surely"],
  [111, "devoted her time to the second son"],
  [112, "ages or that he has ever been"],
  [113, "individual, we have absolute proof"],
  [114, "social duties; servants are brought in"],
  [115, "His fingers were not long enough"],
  [116, "records have been carefully enough kept"],
  [117, "society begins to exert its crushing might"],
  [118, "he states very positively"],
  [119, "career was not very successful"],
  [120, "score was 29"],
  [121, "children to grow up without language"],
  [122, "of “mental” characteristics"],
  [123, "have been written about instincts"],
  [124, "dice now and again"],
  [125, "of the material out of which he is made"],
]);

const protectedLineBreakHyphens = new Set([
  "prize-fighter",
  "well-formed",
]);
const pageFootnotes = new Map([
  [110, {
    pattern: /^2\s+(?=And by this statement)/mu,
    replacement: "[Footnote 1, print p. 98] ",
  }],
  [117, {
    pattern: /^1\]\s+say nothing here/mu,
    replacement: "[Footnote 1, print p. 105] I say nothing here",
  }],
  [124, {
    pattern: /^2(?=One may argue)/mu,
    replacement: "[Footnote 1, print p. 112] ",
  }],
]);

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function normalizedQuote(value) {
  return String(value)
    .normalize("NFKC")
    .toLocaleLowerCase("en")
    .replace(/[\p{P}\p{S}\s]/gu, "");
}

function cropPageOcr(rawText, pageNumber) {
  const normalized = String(rawText).replace(/\r\n?/gu, "\n");
  const marker = pageStartMarkers.get(pageNumber);
  const markerIndex = normalized.indexOf(marker);
  if (markerIndex === -1) {
    throw new Error(`Page ${pageNumber} did not contain its verified start marker: ${marker}`);
  }
  return normalized
    .slice(markerIndex)
    .split("\n")
    .filter((line) => !/^\s*(?:\d+\s+BEHAVIORISM|ARE THERE ANY HUMAN INSTINCTS\?\s+[\dIlr]+|\d+)\s*$/iu.test(line))
    .filter((line) => !/^\s*[|~_=—–-]{1,12}\s*$/u.test(line))
    .join("\n")
    .trim();
}

function cleanChapter(croppedPages, footnotes) {
  let text = `${croppedPages.join("\n")}\n\nNOTES\n\n${footnotes.join("\n\n")}`;
  text = text
    .replace(/^PART J\./mu, "PART I.")
    .replace(/“MENTAL”\s+[‘']TRAITS/gu, "“MENTAL” TRAITS")
    .replace(
      /NTRopuction:—In the next four chapters we shall try to find\s*\n\]\s*out how/iu,
      "INTRODUCTION:—In the next four chapters we shall try to find out how",
    )
    .replace(/offspring\. Other\s+\.\s*\ninheritances/iu, "offspring. Other inheritances")
    .replace(/May-\s*\n\.?\s*flower/gu, "Mayflower")
    .replace(/\baf\s*\n\s*fairs\b/gu, "affairs")
    .replace(/\bcraw\]/gu, "crawl")
    .replace(/\bAsa\b/gu, "As a")
    .replace(/\bznstincts\b/gu, "instincts")
    .replace(/\b8\.\s*c\./giu, "B.C.")
    .replace(/\b1930\s+a\.p\./giu, "1930 A.D.")
    .replace(/F\.\s*F\.\s*V-—/gu, "F. F. V.’—")
    .replace(/inheritance of traits\.\s*\]\s*would/gu, "inheritance of traits. I would")
    .replace(/boomerang\?\s*\*/gu, "boomerang? [Footnote 1, print p. 112]")
    .replace(/^\s*~\s+(?=[a-z])/gimu, "")
    .replace(/^\s*[’']?\s*—\s*[“"]now how/gimu, "—“now how")
    .replace(/—[‘']{2}What/gu, "—“What")
    .replace(/^T have in my hand/imu, "I have in my hand")
    .replace(/^\s*_?[’']?\s*elevation, yet/gimu, "elevation, yet")
    .replace(/\bIll guarantee\b/gu, "I'll guarantee")
    .replace(/\bevery:/gu, "every")
    .replace(/\bchilden\b/gu, "children")
    .replace(/\bscore was ror\b/giu, "score was 101")
    .replace(/\/ittle\b/gu, "little")
    .replace(/\s+‘\s+of the material/gu, " of the material")
    .replace(/\s+©/gu, "")
    .replace(/\b1s\b/gu, "is")
    .replace(/\bindivid-\s*\n\s*\*\s*ual\b/gu, "individual")
    .replace(/\bbusiness\s*:\s*career\b/gu, "business career")
    .replace(/\bthe\s*\n\s*\n\s*fairest\b/gu, "the fairest")
    .replace(/\bTam sure\b/gu, "I am sure")
    .replace(/\bcarly conditioning\b/gu, "early conditioning")
    .replace(/\bhardest case\.\s+for\b/gu, "hardest case for");

  text = text.replace(/\b([A-Za-z]+)-\n([a-z][A-Za-z]*)/gu, (_, left, right) => {
    const combined = `${left}-${right}`;
    return protectedLineBreakHyphens.has(combined.toLocaleLowerCase("en"))
      ? combined
      : `${left}${right}`;
  });
  text = text.replace(/\b([A-Z]+)-\n([A-Z]+)\b/gu, "$1$2");
  text = text
    .replace(/other\s*\n\s*two\."\s+Suppose/gu, "other two. [Footnote 1, print p. 98] Suppose")
    .replace(/compete\.\*/gu, "compete. [Footnote 1, print p. 105]")
    .replace(/when’\s*\n\s*society/gu, "when society")
    .replace(/his\s*\n\s*\n\s*"original blacksmith forebear/gu, "his original blacksmith forebear")
    .replace(/^"original blacksmith forebear/gimu, "original blacksmith forebear")
    .replace(/\(including the heat loss to the air\),\s+When/gu, "(including the heat loss to the air). When")
    .replace(/valley\.\s*‘/gu, "valley.");

  let chapter = text
    .split(/\n{2,}/u)
    .map((block) => block.replace(/\s*\n\s*/gu, " ").replace(/[ \t]{2,}/gu, " ").trim())
    .filter(Boolean)
    .join("\n\n")
    .replace(/\s+([?!,.;:])/gu, "$1")
    .replace(/\s+—/gu, "—")
    .replace(/—\s+/gu, "—")
    .replace(/\bevery:/gu, "every")
    .replace(/\bcarly conditioning\b/gu, "early conditioning")
    .replace(/\bhardest case\.\s+for\b/gu, "hardest case for")
    .replace(/(?<=\p{L})'(?=\p{L})/gu, "’")
    .trim();
  chapter = chapter.replace(
    /DIFFERENCES IN STRUCTURE AND DIFFERENCES IN EARLY TRAINING WILL\n\nACCOUNT FOR ALL DIFFERENCES IN LATER BEHAVIOR/gu,
    "DIFFERENCES IN STRUCTURE AND DIFFERENCES IN EARLY TRAINING WILL ACCOUNT FOR ALL DIFFERENCES IN LATER BEHAVIOR",
  );
  chapter = chapter.replace(/when’ society/gu, "when society");
  const headings = [
    "V. Are There Any Human Instincts?",
    "PART I. ON THE SUBJECT OF TALENT, TENDENCIES AND THE INHERITANCE OF ALL SO-CALLED “MENTAL” TRAITS",
    "THE THESIS PRESENTED",
    "THE ARGUMENT IN ITS DEFENSE",
    "THE GENETIC PSYCHOLOGIST’S ANSWER",
    "ARE “MENTAL” TRAITS INHERITED?",
    "DIFFERENCES IN STRUCTURE AND DIFFERENCES IN EARLY TRAINING WILL ACCOUNT FOR ALL DIFFERENCES IN LATER BEHAVIOR",
    "(1) HUMAN BEINGS DIFFER IN THE WAY THEY ARE PUT TOGETHER",
    "(2) DIFFERENCES IN EARLY TRAINING MAKE MAN STILL MORE DIFFERENT",
    "THE CONCLUSION WE DRAW",
    "DOES THE EXPERIMENTAL WORK ON IDENTICAL TWINS NEGATE OUR EMPHASIS ON THE RELATIVELY GREATER INFLUENCE OF ENVIRONMENT IN THE EARLY DIFFERENTIATION OF BEHAVIOR?",
    "ARE THERE ANY INSTINCTS?",
    "A LESSON FROM THE BOOMERANG",
    "CONCEPT OF INSTINCT NO LONGER NEEDED IN PSYCHOLOGY",
  ];
  for (const heading of headings) {
    chapter = chapter
      .replaceAll(` ${heading}`, `\n\n${heading}`)
      .replaceAll(`${heading} `, `${heading}\n\n`);
  }
  return `${chapter.replace(/\n{3,}/gu, "\n\n").trim()}\n`;
}

const temporaryDirectory = await mkdtemp(resolve(tmpdir(), "agora-watson-v-"));
try {
  const imagePrefix = resolve(temporaryDirectory, "page");
  await execFileAsync(pdftoppm, [
    "-f", String(firstPdfPage),
    "-l", String(lastPdfPage),
    "-png",
    "-r", "180",
    sourcePdf,
    imagePrefix,
  ], { maxBuffer: 8 * 1024 * 1024 });

  const rawPages = [];
  const croppedPages = [];
  const footnotes = [];
  for (let pageNumber = firstPdfPage; pageNumber <= lastPdfPage; pageNumber += 1) {
    const imagePath = `${imagePrefix}-${pageNumber}.png`;
    const { stdout } = await execFileAsync(tesseract, [
      imagePath,
      "stdout",
      "-l", "eng",
      "--psm", "6",
    ], { encoding: "utf8", maxBuffer: 8 * 1024 * 1024 });
    rawPages.push(`[[PDF page ${pageNumber}]]\n${stdout.trim()}`);
    let cropped = cropPageOcr(stdout, pageNumber);
    const footnote = pageFootnotes.get(pageNumber);
    if (footnote) {
      const footnoteIndex = cropped.search(footnote.pattern);
      if (footnoteIndex === -1) {
        throw new Error(`Page ${pageNumber} did not contain its verified footnote boundary`);
      }
      const noteText = cropped.slice(footnoteIndex).replace(
        footnote.pattern,
        footnote.replacement,
      );
      footnotes.push(noteText);
      cropped = cropped.slice(0, footnoteIndex).trim();
    }
    croppedPages.push(cropped);
  }

  const rawOcr = `${rawPages.join("\n\n")}\n`;
  const chapter = cleanChapter(croppedPages, footnotes);
  const registeredQuoteSegments = [
    "Give me a dozen healthy infants, well-formed, and my own specified world to bring them up in and I'll guarantee to take any one at random and train him to become any type of specialist I might select.",
    "I am going beyond my facts and I admit it, but so have the advocates of the contrary and they have been doing it for many thousands of years.",
  ];
  for (const segment of registeredQuoteSegments) {
    if (!normalizedQuote(chapter).includes(normalizedQuote(segment))) {
      throw new Error(`Derived Chapter V is missing verified quote segment: ${segment}`);
    }
  }
  if (!chapter.startsWith("V. Are There Any Human Instincts?")) {
    throw new Error("Derived Chapter V does not begin at the verified chapter heading");
  }
  if (!chapter.includes("the human offspring does do at birth.\n\nNOTES\n")) {
    throw new Error("Derived Chapter V does not end at the verified final sentence");
  }

  await Promise.all([
    mkdir(dirname(rawOcrOutput), { recursive: true }),
    mkdir(dirname(readingUnitOutput), { recursive: true }),
    mkdir(dirname(reportOutput), { recursive: true }),
  ]);
  await Promise.all([
    writeFile(rawOcrOutput, rawOcr, "utf8"),
    writeFile(readingUnitOutput, chapter, "utf8"),
    writeFile(reportOutput, `${JSON.stringify({
      schemaVersion: 1,
      sourceUrl: "https://archive.org/details/behaviorism0000john",
      sourcePdf: "research/source-cache/remaining-paper-recovery/watson-behaviorism-1925.pdf",
      sourcePdfSha256: sha256(await readFile(sourcePdf)),
      rawOcrOutput: "research/source-cache/remaining-paper-recovery/watson-behaviorism-1925-chapter-v-tesseract.txt",
      rawOcrSha256: sha256(rawOcr),
      readingUnitOutput: "research/source-cache/reading-unit-derived/watson-behaviorism-1925-chapter-v.txt",
      readingUnitBytes: Buffer.byteLength(chapter),
      readingUnitSha256: sha256(chapter),
      pdfPageRange: [firstPdfPage, lastPdfPage],
      printPageRange: [93, 113],
      boundary: "Complete Chapter V, from its title through the sentence immediately preceding Chapter VI.",
      notePlacement: "Three printed footnotes, each numbered 1 on its source page, are retained under a NOTES heading after the chapter body. Inline markers identify the footnote number and print page, while moving the note text prevents page-bottom notes from interrupting sentences continued on the next page.",
      visualChecks: [
        "PDF pages 105-125 / print pages 93-113: every page compared against the derived text",
        "PDF page 105 / print page 93: Chapter V opening and display headings",
        "PDF pages 110, 117, and 124 / print pages 98, 105, and 112: footnote markers, note text, and page-edge continuations",
        "PDF page 116 / print page 104: both registered quotation segments",
        "PDF page 125 / print page 113: Chapter V ending",
        "PDF page 126 / print page 114: Chapter VI exclusive boundary",
      ],
      imageVerifiedCorrections: [
        "Restored omitted quotation marks around F. F. V., the mental-traits question, and the father's reported speech.",
        "Rejoined individual, business career, the fairest, and the Chapter V sentence split across OCR or page boundaries.",
        "Corrected Tam to I am, carly to early, and removed the false period after hardest case.",
        "Retained all three source-page footnote numbers as Footnote 1 and normalized their inline locations.",
      ],
      remainingUncertainReadings: [],
      commands: {
        render: `pdftoppm -f ${firstPdfPage} -l ${lastPdfPage} -png -r 180 <source-pdf> <temporary-prefix>`,
        ocr: "tesseract <page-image> stdout -l eng --psm 6",
      },
    }, null, 2)}\n`, "utf8"),
  ]);
  console.log(`Derived Watson Behaviorism Chapter V: ${Buffer.byteLength(chapter)} bytes.`);
} finally {
  await rm(temporaryDirectory, { recursive: true, force: true });
}
