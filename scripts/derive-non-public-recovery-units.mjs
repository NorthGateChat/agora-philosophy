#!/usr/bin/env node

import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const derivedRoot = resolve(projectRoot, "research/source-cache/reading-unit-derived");
const evidenceRoot = resolve(projectRoot, "research/source-cache/non-public-24-recovery");

const sha256 = (value) => createHash("sha256").update(value).digest("hex");
const normalizeSpaces = (value) => value.normalize("NFC").replace(/[\t ]+/gu, " ").trim();

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
    .replace(/\n{3,}/gu, "\n\n")
    .trim();
}

function lineSlice(value, startTest, endTest, startOccurrence = "first") {
  const lines = String(value).normalize("NFC").replace(/\r\n?/gu, "\n").split("\n");
  const matchingStarts = lines.flatMap((line, index) => (
    startTest(normalizeSpaces(line)) ? [index] : []
  ));
  const start = startOccurrence === "last" ? matchingStarts.at(-1) ?? -1 : matchingStarts[0] ?? -1;
  if (start < 0) throw new Error("Start boundary not found");
  const relativeEnd = lines.slice(start + 1).findIndex((line) => endTest(normalizeSpaces(line)));
  const end = relativeEnd < 0 ? lines.length : start + 1 + relativeEnd;
  return { text: lines.slice(start, end).join("\n"), startLine: start + 1, endLine: end };
}

function replaceRequired(text, pattern, replacement, label) {
  if (!pattern.test(text)) throw new Error(`Required correction did not match: ${label}`);
  pattern.lastIndex = 0;
  return text.replace(pattern, replacement);
}

function assertContains(text, excerpts, label) {
  for (const excerpt of excerpts) {
    if (!text.includes(excerpt)) throw new Error(`${label} is missing verified excerpt: ${excerpt}`);
  }
}

const units = [
  {
    unitId: "ru-educational-psychology-volume-ii-the-psychology--chapter-xii-563c7183",
    source: "research/source-cache/completion-psychology/thorndike-educational-psychology-v2-ocr.txt",
    output: "thorndike-educational-psychology-v2-chapter-xii.txt",
    start: (line) => line.toLowerCase() === "chapter xii",
    end: (line) => /^Bibliography of References Made in/u.test(line),
    heading: "# CHAPTER XII\n\nThe Influence of Improvement in One Mental Function upon the Efficiency of Other Functions",
    transform(text) {
      let result = text.replace(/^chapter xii\s*/iu, "");
      result = result.replace(/^The Influence of Improvement in One Mental Func-?\s*tion UPON THE Efficiency of Other Functions\s*/iu, "");
      result = replaceRequired(
        result,
        /The answer which I shall try to defend is that a change in one function alters any other only in so far as the two functions have as factors identical elements\. The change in[\s\S]{0,180}?the second function is in amount that due to the change in the elements common to it and the first\./u,
        "The answer which I shall try to defend is that a change in one function alters any other only in so far as the two functions have as factors identical elements. The change in the second function is in amount that due to the change in the elements common to it and the first.",
        "Thorndike volume II anchor across print pp. 358-359",
      );
      result = replaceRequired(
        result,
        /Chief amongst such identical elements of practical importance in education are associations including ideas about aims and ideas of method and general principles/u,
        "Chief amongst such identical elements of practical importance in education are associations including ideas about aims and ideas of method and general principles",
        "Thorndike volume II second anchor segment",
      );
      return result;
    },
    excerpts: [
      "The answer which I shall try to defend is that a change in one function alters any other only in so far as the two functions have as factors identical elements. The change in the second function is in amount that due to the change in the elements common to it and the first.",
      "Chief amongst such identical elements of practical importance in education are associations including ideas about aims and ideas of method and general principles",
    ],
    evidence: "Archive.org scan educationalpsych02thor.pdf, PDF pp. 376-377 / print pp. 358-359",
  },
  {
    unitId: "ru-educational-psychology-volume-iii-mental-work-an-chapter-viii-a5cebbf8",
    source: "research/source-cache/non-public-24-recovery/origins/educationalpsych03thor_djvu.txt",
    output: "thorndike-educational-psychology-v3-chapter-viii.txt",
    start: (line) => line.toLowerCase() === "chapter viii",
    end: (line) => line.toUpperCase() === "CHAPTER IX",
    heading: "# CHAPTER VIII\n\nThe Measurement of Individual Differences",
    transform(text) {
      let result = text.replace(/^chapter viii\s*/iu, "");
      result = result.replace(/^The Measurement of Individual Differences\s*/iu, "");
      result = replaceRequired(
        result,
        /This is shown graphically in Fig\. 26\. The average, median and mode would be closely the same as for A, but the varia[\s\S]{0,900}?bility of the measures would be less\./u,
        "This is shown graphically in Fig. 26. The average, median and mode would be closely the same as for A, but the variability of the measures would be less.\n\n*The Median has two meanings: the point on the scale above and below which equal per cents of the individual scores lie, and the mid measure. These two definitions lead to substantially the same results, and for present purposes the reader may adopt either one. Indeed it will do no harm if he can see no difference between the two.",
        "Thorndike volume III anchor and intervening footnote across print pp. 163-164",
      );
      result = replaceRequired(
        result,
        /B's ability has the same central tendency as A's, but B is a more constant performer\./u,
        "B's ability has the same central tendency as A's, but B is a more constant performer.",
        "Thorndike volume III second anchor segment",
      );
      return result;
    },
    excerpts: [
      "The average, median and mode would be closely the same as for A, but the variability of the measures would be less.",
      "B's ability has the same central tendency as A's, but B is a more constant performer.",
    ],
    evidence: "Archive.org scan educationalpsych03thor.pdf, PDF pp. 177-178 / print pp. 163-164",
  },
  {
    unitId: "ru-yoga-sutra-book-i-b70c96b7",
    source: "research/source-cache/indian-context-batch4/woods-yoga-system-patanjali-1914-ocr.txt",
    output: "woods-yoga-system-1914-book-i-collected-translation.txt",
    start: (line) => line === "BOOK FIRST— CONCENTRATION" || line === "BOOK FIRST—CONCENTRATION",
    startOccurrence: "last",
    end: (line) => line.startsWith("BOOK SECOND—"),
    heading: "# BOOK FIRST—CONCENTRATION",
    transform(text) {
      let result = text.replace(/^BOOK FIRST— ?CONCENTRATION\s*/u, "");
      result = replaceRequired(
        result,
        /i\. 3 Then the Seer \[that is, the Self\] abides in himself, i\. 4 At other times it \[the Self\] takes the same form as the fluctuations \[of mind-stuff\]\./u,
        "Sutras 1.3–4\n\nThen the Seer [that is, the Self] abides in himself. At other times it [the Self] takes the same form as the fluctuations [of mind-stuff].",
        "Woods Yoga Sutra 1.3-4 punctuation and inline numbering checked on scan PDF p. 34",
      );
      return result;
    },
    excerpts: [
      "Then the Seer [that is, the Self] abides in himself. At other times it [the Self] takes the same form as the fluctuations [of mind-stuff].",
      "The restriction of them is by [means] of practice and passionlessness.",
    ],
    evidence: "Archive.org scan yogasystemofpata00pata, PDF p. 34, complete collected translation of Book I",
  },
  {
    unitId: "ru-the-magical-number-seven-plus-or-minus-two-whole-work-9199af20",
    source: "research/source-cache/non-public-24-recovery/origins/sim_psychological-review_1956-03_63_2_djvu.txt",
    output: "miller-magical-number-seven-1956-complete-paper.txt",
    start: (line) => line.startsWith("THE MAGICAL NUMBER SEVEN, PLUS OR MINUS TWO:"),
    end: (line) => line === "Psychological Review",
    heading: "# THE MAGICAL NUMBER SEVEN, PLUS OR MINUS TWO: SOME LIMITS ON OUR CAPACITY FOR PROCESSING INFORMATION",
    transform(text) {
      let result = text.replace(/^THE MAGICAL NUMBER SEVEN, PLUS OR MINUS TWO:[\s\S]{0,220}?GEORGE A\. MILLER\s*/u, "George A. Miller\n\n");
      result = replaceRequired(
        result,
        /Clearly, the addition of independently variable attributes to the stimulus increases the channel capacity, but at a[\s\S]{0,900}?decreasing rate\./u,
        "Clearly, the addition of independently variable attributes to the stimulus increases the channel capacity, but at a decreasing rate.",
        "Miller sentence split by Figure 6 and a column break",
      );
      return result;
    },
    excerpts: [
      "Clearly, the addition of independently variable attributes to the stimulus increases the channel capacity, but at a decreasing rate.",
      "the span of absolute judgment and the span of immediate memory are quite different kinds of limitations",
      "The point is that recoding is an extremely powerful weapon for increasing the amount of information that we can deal with.",
      "(Received May 4, 1955)",
    ],
    evidence: "Original journal scan miller-1956.pdf, complete paper PDF pp. 3-19; p. 10 visually checked for the Figure 6 column break",
  },
  {
    unitId: "ru-the-decisive-treatise-part-i-6fdef658",
    source: "research/source-cache/non-public-24-recovery/origins/averroes-1921-layout.txt",
    output: "averroes-decisive-treatise-part-i-1921.txt",
    start: (line) => line.includes("A DECISIVE DISCOURSE ON THE"),
    end: (line) => line === "APPENDIX.",
    heading: "# A DECISIVE DISCOURSE ON THE DELINEATION OF THE RELATION BETWEEN RELIGION AND PHILOSOPHY",
    transform(text) {
      let result = text.replace(/^A DECISIVE DISCOURSE ON THE[\s\S]{0,180}?PHILOSOPHY\s*/u, "");
      result = replaceRequired(
        result,
        /we Muslims should believe that rational investigation is not contrary to Law, for i? ?truth cannot contradict truth, but verifies it and bears testimony to it\./u,
        "we Muslims should believe that rational investigation is not contrary to Law, for truth cannot contradict truth, but verifies it and bears testimony to it.",
        "Averroes truth sentence OCR margin artifact",
      );
      result = replaceRequired(
        result,
        /Interpretation means to eariy the meaning of a word from its original sense to a metaphorical one\./u,
        "Interpretation means to carry the meaning of a word from its original sense to a metaphorical one.",
        "Averroes interpretation OCR correction",
      );
      return result;
    },
    excerpts: [
      "The Law encourages and exhorts us to observe creation.",
      "As this Law is true and leads to the consideration of the knowledge of God, we Muslims should believe that rational investigation is not contrary to Law, for truth cannot contradict truth, but verifies it and bears testimony to it.",
      "Interpretation means to carry the meaning of a word from its original sense to a metaphorical one.",
    ],
    evidence: "Original public-domain scan averroes-1921.pdf; PDF pp. 16, 28-29 visually checked against print pp. 14, 26-27",
  },
];

await mkdir(derivedRoot, { recursive: true });
const report = [];
for (const unit of units) {
  const sourcePath = resolve(projectRoot, unit.source);
  const source = await readFile(sourcePath, "utf8");
  const boundary = lineSlice(source, unit.start, unit.end, unit.startOccurrence);
  let body = cleanOcrSlice(boundary.text);
  body = unit.transform(body).trim();
  const output = `${unit.heading}\n\n${body}\n`;
  assertContains(output, unit.excerpts, unit.unitId);
  const outputPath = resolve(derivedRoot, unit.output);
  await writeFile(outputPath, output, "utf8");
  report.push({
    unitId: unit.unitId,
    sourcePath: unit.source,
    sourceSha256: sha256(source),
    sourceBoundary: { startLine: boundary.startLine, endLine: boundary.endLine },
    outputPath: `research/source-cache/reading-unit-derived/${unit.output}`,
    outputBytes: Buffer.byteLength(output),
    outputCharacters: output.length,
    outputSha256: sha256(output),
    evidence: unit.evidence,
  });
}

await writeFile(
  resolve(evidenceRoot, "derived-batch-1.json"),
  `${JSON.stringify({ schemaVersion: 1, command: "node scripts/derive-non-public-recovery-units.mjs", units: report }, null, 2)}\n`,
  "utf8",
);
console.log(JSON.stringify({ written: report.length, units: report }, null, 2));
