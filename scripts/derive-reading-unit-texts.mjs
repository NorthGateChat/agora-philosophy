#!/usr/bin/env node

import { execFile } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outputRoot = resolve(projectRoot, "research/source-cache/reading-unit-derived");
const pdftotextBinary = process.env.PDFTOTEXT_BIN ?? "pdftotext";
const reuseExistingPdfDerivatives = process.argv.includes("--reuse-existing-pdf-derivatives");

const derivations = [
  {
    sourceUrl: "https://assets.aeaweb.org/asset-server/files/9442.pdf",
    sourcePdfPath: "research/source-cache/economics-context-batch7/arrow-medical-care-uncertainty-1963.pdf",
    outputPath: "research/source-cache/reading-unit-derived/arrow-medical-care-1963-introduction.txt",
    lineRanges: [[1, 342]],
    matchedThoughts: {
      "economics-modern-arrow-medical-care-uncertainty": "I will hold that virtually all the special features of this industry, in fact, stem from the prevalence of uncertainty.",
    },
  },
  {
    sourceUrl: "https://web.stanford.edu/class/msande314/arrow-debreu.pdf",
    sourceTextPath: "research/source-cache/reading-unit-origins/papers/arrow-debreu-1954.txt",
    outputPath: "research/source-cache/reading-unit-derived/arrow-debreu-equilibrium-1954-introduction.txt",
    lineRanges: [[33, 88]],
    matchedThoughts: {
      "economics-principles-arrow-debreu-equilibrium-existence": "The main results of this paper are two theorems stating very general conditions under which a competitive equilibrium will exist.",
    },
  },
  {
    sourceUrl: "https://gwern.net/doc/psychology/personality/1946-asch.pdf",
    sourcePdfPath: "research/source-cache/reading-unit-origins/papers/asch-forming-impressions-1946.pdf",
    pdftotextMode: "raw",
    outputPath: "research/source-cache/reading-unit-derived/asch-forming-impressions-1946.txt",
    matchedThoughts: {
      "psychology-social-asch-central-traits": "In the course of this process some characteristics are discovered to be central. The whole system of relations determines which will become central.",
      "psychology-social-asch-impression-whole": "As soon as two or more traits are understood to belong to one person, they cease to exist as isolated traits, and come into immediate dynamic interaction.",
      "psychology-social-asch-order": "It is not the sheer temporal position of the item which is important as much as the functional relation of its content to the content of the items following it.",
    },
  },
  {
    sourceUrl: "https://jwclegg.org/psy329/readings/Bandura.pdf",
    sourcePdfPath: "research/source-cache/reading-unit-origins/papers/bandura-aggression-1961.pdf",
    pdftotextMode: "raw",
    outputPath: "research/source-cache/reading-unit-derived/bandura-aggression-1961.txt",
    matchedThoughts: {
      "psychology-social-bandura-observational-learning": "Since subjects could not perform the model's aggressive behavior, any learning that occurred was purely on an observational or covert basis.",
    },
  },
  {
    sourceUrl: "https://www.gov.uk/government/publications/final-report-the-economics-of-biodiversity-the-dasgupta-review",
    sourceTextPath: "research/source-cache/reading-unit-origins/papers/dasgupta-biodiversity-2021.txt",
    outputPath: "research/source-cache/reading-unit-derived/dasgupta-biodiversity-2021-preface.txt",
    lineRanges: [[94, 784]],
    useBasis: "open-license",
    matchedThoughts: {
      "economics-modern-dasgupta-biodiversity-inclusive-wealth": "The qualifier ‘inclusive’ says that wealth includes Nature as an asset.",
    },
  },
  {
    sourceUrl: "https://web.mit.edu/curhan/www/docs/Articles/15341_Readings/Motivation/Festinger_Carlsmith_1959_Cognitive_consequences_of_forced_compliance.pdf",
    sourcePdfPath: "research/source-cache/reading-unit-origins/papers/festinger-carlsmith-1959.pdf",
    pdftotextMode: "raw",
    outputPath: "research/source-cache/reading-unit-derived/festinger-carlsmith-forced-compliance-1959.txt",
    matchedThoughts: {
      "psychology-social-festinger-insufficient-justification": "The greater the reward offered (beyond what was necessary to elicit the behavior) the smaller was the effect.",
    },
  },
  {
    sourceUrl: "https://www.math.toronto.edu/mccann/assignments/477/Hotelling29.pdf",
    sourceTextPath: "research/source-cache/reading-unit-origins/papers/hotelling-stability-1929.txt",
    outputPath: "research/source-cache/reading-unit-derived/hotelling-stability-in-competition-1929.txt",
    lineRanges: [[20, 748]],
    corrections: [
      {
        description: "Remove the JSTOR access footer repeated after each article page.",
        pattern: String.raw`\nThis content downloaded[^\n]*\nAll use subject[^\n]*`,
        replacement: "",
        expectedMatches: 16,
      },
    ],
    matchedThoughts: {
      "economics-principles-hotelling-spatial-competition": "The foregoing considerations apply, particularly the conclusion that competing sellers tend to become too much alike.",
    },
  },
  {
    sourceUrl: "https://www.haverford.edu/sites/default/files/Nash1950.pdf",
    sourceTextPath: "research/source-cache/reading-unit-origins/papers/nash-bargaining-1950.txt",
    outputPath: "research/source-cache/reading-unit-derived/nash-bargaining-problem-1950.txt",
    lineRanges: [[20, 314]],
    corrections: [
      {
        description: "Remove the JSTOR access footer repeated after each article page.",
        pattern: String.raw`\nThis content downloaded[^\n]*\nAll use subject[^\n]*`,
        replacement: "",
        expectedMatches: 7,
      },
      {
        description: "Restore u₁ subscripts that the PDF text layer read as u1/ul; verified against print p. 159.",
        pattern: String.raw`\bu(?:1|l)\b`,
        replacement: "u₁",
        expectedMatches: 14,
      },
      {
        description: "Restore u₂ subscripts that the PDF text layer flattened; verified against print p. 159.",
        pattern: String.raw`\bu2\b`,
        replacement: "u₂",
        expectedMatches: 16,
      },
    ],
    matchedThoughts: {
      "economics-principles-nash-bargaining": "We now show that these conditions require that the solution be the point of the set in the first quadrant where u₁ u₂ is maximized.",
    },
  },
  {
    sourceUrl: "https://library.oarcloud.noaa.gov/docs.lib/htdocs/rescue/Rarebook_treasures/QC503F211839_PDF/QC503F211839v3.pdf",
    sourcePdfPath: "research/source-cache/completion-mao-science/faraday-experimental-researches-v3.pdf",
    outputPath: "research/source-cache/reading-unit-derived/faraday-experimental-researches-v3-series-xix-xxviii.txt",
    lineRanges: [[256, 1365], [13835, 15595]],
    corrections: [
      {
        description: "Normalize the Series XIX heading as its own paragraph boundary.",
        pattern: String.raw`^\s+NINETEENTH SERIES \.\n`,
        replacement: "NINETEENTH SERIES.\n\n",
      },
      {
        description: "Normalize the Series XXVIII heading and its footnote marker as its own paragraph boundary.",
        pattern: String.raw`\n+\s+TWENTY-EIGHTH SERIES1\.\n`,
        replacement: "\n\nTWENTY-EIGHTH SERIES.\n\n",
      },
      {
        description: "Remove the superscript note marker after ‘first time’ in paragraph 2221.",
        pattern: String.raw`for the first time1,`,
        replacement: "for the first time,",
      },
      {
        description: "Remove the footnote and repeated page header interrupting paragraph 2221.",
        pattern: String.raw`\n\s+I say, for the first time, because I do not think that the experiments of[\s\S]*?\n\f20\s+Relation of light to magnetism\.\s+\[SERIES XIX\.\n`,
        replacement: "\n",
      },
      {
        description: "Correct two unambiguous OCR errors in paragraph 3075 (phœnomena/he).",
        pattern: String.raw`phœnomena ; or he tied up`,
        replacement: "phenomena; or be tied up",
      },
    ],
    matchedThoughts: {
      "science-faraday-magneto-optics": "Thus is established, I think for the first time, a true, direct relation and dependence between light and the magnetic and electric forces; and thus a great addition made to the facts and considerations which tend to prove that all natural forces are tied together, and have one common origin.",
      "science-faraday-lines-force": "I desire to restrict the meaning of the term line of force, so that it shall imply no more than the condition of the force in any given place, as to strength and direction; and not to include (at present) any idea of the nature of the physical cause of the phenomena; or be tied up with, or in any way dependent on, such an idea.",
    },
  },
  {
    sourceUrl: "https://german.yale.edu/sites/default/files/hayek_-_the_use_of_knowledge_in_society.pdf",
    sourcePdfPath: "research/source-cache/economics-context-batch7/hayek-use-knowledge-society-1945.pdf",
    outputPath: "research/source-cache/reading-unit-derived/hayek-use-knowledge-1945.txt",
    matchedThoughts: {
      "economics-hayek-dispersed-knowledge": "We need decentralization because only thus can we ensure that the knowledge of the particular circumstances of time and place will be promptly used.",
      "economics-hayek-price-signal": "In abbreviated form, by a kind of symbol, only the most essential information is passed on, and passed on only to those concerned.",
    },
  },
  {
    sourceUrl: "https://archive.org/details/cu31924014578979",
    sourceTextPath: "research/source-cache/reading-unit-origins/hegel-philosophy-of-right-dyde-1896-archive-ocr.txt",
    outputPath: "research/source-cache/reading-unit-derived/hegel-philosophy-of-right-dyde-1896-selected-units.txt",
    lineRanges: [[482, 1167], [7836, 16393]],
    corrections: [
      {
        description: "Correct the three unambiguous Archive OCR errors in the registered §142 sentence (etMcal/tlie/wWcli).",
        pattern: String.raw`142\. The etMcal system is the idea of freedom\. It is tlie\s+living good, wWcli has in self-consciousness its knowing\s+and willing, and through the action of self-consciousness\s+its actuality\.`,
        replacement: "142. The ethical system is the idea of freedom. It is the living good, which has in self-consciousness its knowing and willing, and through the action of self-consciousness its actuality.",
      },
    ],
    matchedThoughts: {
      "hegel-actual-rational": "What is rational is real; And what is real is rational.",
      "hegel-owl-of-minerva": "The owl of Minerva takes its flight only when the shades of night are gathering.",
      "hegel-ethical-life": "The ethical system is the idea of freedom. It is the living good, which has in self-consciousness its knowing and willing, and through the action of self-consciousness its actuality.",
      "hegel-civil-society-dependence": "The self-seeking end is conditioned in its realization by the universal. Hence is formed a system of mutual dependence, a system which interweaves the subsistence, happiness, and rights of the individual with the subsistence, happiness, and right of all.",
      "hegel-poverty-rabble": "When a large number of people sink below the standard of living regarded as essential for the members of society, and lose that sense of right, rectitude, and honour which is derived from self-support, a pauper class arises, and wealth accumulates disproportionately in the hands of a few.",
      "hegel-state-concrete-freedom": "The state is the embodiment of concrete freedom. In this concrete freedom, personal individuality and its particular interests, as found in the family and civic community, have their complete development. In this concrete freedom, too, the rights of personal individuality receive adequate recognition.",
    },
  },
  {
    sourceUrl: "https://ntrs.nasa.gov/citations/19840008978",
    sourcePdfPath: "research/source-cache/nasa-heisenberg.pdf",
    outputPath: "research/source-cache/reading-unit-derived/heisenberg-nasa-tm-77379.txt",
    corrections: [
      {
        description: "Replace OCR margin debris inside the position–impulse sentence on print p. 5.",
        pattern: String.raw`That\s+is,\s+the\s+more[\s\S]{0,500}?will\s+the\s+impulse\s+be\s+known,\s+and\s+vice-versa\.`,
        replacement: "That is, the more precisely the position is determined, the more imprecisely will the impulse be known, and vice-versa.",
      },
      {
        description: "Replace OCR margin debris inside the gamma-ray-microscope passage on print p. 4.",
        pattern: String.raw`At\s+the\s+instant\s+of\s+the[\s\S]{0,1000}?the\s+more\s+precise\s+the\s+position\s+determination\s+is\s+to\s+be\.`,
        replacement: "At the instant of the determination of its position - i.e., the instant at which the light quantum is diffracted by the electron - the electron discontinuously changes its impulse. That change will be more pronounced, the smaller the wavelength of the light used, i.e. the more precise the position determination is to be.",
      },
    ],
    matchedThoughts: {
      "science-heisenberg-conjugate-limits": "That is, the more precisely the position is determined, the more imprecisely will the impulse be known, and vice-versa.",
      "science-heisenberg-microscope": "At the instant of the determination of its position - i.e., the instant at which the light quantum is diffracted by the electron - the electron discontinuously changes its impulse. That change will be more pronounced, the smaller the wavelength of the light used, i.e. the more precise the position determination is to be.",
    },
  },
  {
    sourceUrl: "https://archive.org/details/NyayaSutra",
    sourceTextPath: "research/source-cache/reading-unit-origins/nyaya-sutra-vidyabhusana-1913-archive-ocr.txt",
    outputPath: "research/source-cache/reading-unit-derived/nyaya-sutra-vidyabhusana-1913-book-i.txt",
    lineRanges: [[1448, 2082], [2083, 2459]],
    corrections: [
      {
        description: "Normalize the Book I / Chapter I heading without changing its meaning.",
        pattern: String.raw`Book I\. — Chapter 1\.`,
        replacement: "BOOK I. CHAPTER I.",
      },
      {
        description: "Normalize the Book I / Chapter II heading without changing its meaning.",
        pattern: String.raw`Book I\. — Chapter II\.`,
        replacement: "BOOK I. CHAPTER II.",
      },
      {
        description: "Normalize the following Book II / Chapter I boundary without changing its meaning.",
        pattern: String.raw`Book II\. — Chapter I\.`,
        replacement: "BOOK II. CHAPTER I.",
      },
    ],
    matchedThoughts: {
      "indian-nyaya-error-to-liberation": "Pain, birth, activity, faults and misapprehension—on the successive annihilation of these in the reverse order, there follows release.",
      "indian-nyaya-five-member-argument": "The members (of a syllogism) are proposition, reason, example, application, and conclusion.",
      "indian-nyaya-four-means": "Perception, inference, comparison and word (verbal testimony)—these are the means of right knowledge.",
      "indian-nyaya-perception-conditions": "Perception is that knowledge which arises from the contact of a sense with its object and which is determinate, unnameable and non-erratic.",
      "indian-nyaya-sixteen-categories": "Supreme felicity is attained by the knowledge about the true nature of sixteen categories, …",
      "indian-nyaya-debate-modes": "Wrangling, which aims at gaining victory, is the defence or attack of a proposition in the manner aforesaid by quibbles, futilities, and other processes which deserve rebuke.",
    },
  },
  {
    sourceUrl: "https://archive.org/details/anenglishtransla00vaacuoft",
    sourceTextPath: "research/source-cache/reading-unit-origins/samkhya-karika-jha-1896-archive-ocr.txt",
    outputPath: "research/source-cache/reading-unit-derived/samkhya-karika-jha-1896-complete-text.txt",
    lineRanges: [[896, 7662]],
    corrections: [
      {
        description: "Restore the continuous Karika XIII sentence from the same-edition scan (print p. 42), removing only interleaved marginal-heading OCR and repairing line-break OCR in illuminating/versatile.",
        pattern: String.raw`Goodness\s+is\s+considered\s+to\s+be\s+buoyant\s+and\s+illuminat-[\s\S]{0,350}?tile\s+\(mobile\)\s*;\s*Darkness,\s+sluggish\s+and\s+enveloping\.`,
        replacement: "Goodness is considered to be buoyant and illuminating; Foulness is exciting and versatile (mobile); Darkness, sluggish and enveloping.",
      },
      {
        description: "Restore the continuous Karika XVIII sentence from the same-edition scan (print p. 56), correcting clear OCR glyph errors and removing only an interleaved marginal heading.",
        pattern: String.raw`Prom\s+allotment\s+of\s+birth,\s+death,\s+and\s+the\s+organs\s*;[\s\S]{0,500}?Attributes\s*—\s*the\s+plurality\s+of\s+Spirits\s+is\s+established\.`,
        replacement: "From allotment of birth, death, and the organs; (2) from the non-simultaneity of actions (with different individuals); and (3) from the different modifications of the Attributes—the plurality of Spirits is established.",
      },
      {
        description: "Restore the continuous Karika XXI sentence from the same-edition scan (print p. 60), removing only the interleaved marginal gloss and repairing the line-break OCR in proceeds.",
        pattern: String.raw`For\s+the\s+Spirit's\s+contemplation\s+of\s+Prakriti,[\s\S]{0,650}?ceeds\s+creation\.`,
        replacement: "For the Spirit’s contemplation of Prakriti, and its final Emancipation, the union of both takes place, like that of the halt and the blind; and from this union proceeds creation.",
      },
    ],
    matchedThoughts: {
      "indian-samkhya-blind-lame": "For the Spirit’s contemplation of Prakriti, and its final Emancipation, the union of both takes place, like that of the halt and the blind; and from this union proceeds creation.",
      "indian-samkhya-effect-preexists": "The effect is an entity; (1) because a non-entity can never be brought into existence;",
      "indian-samkhya-many-purushas": "From allotment of birth, death, and the organs; (2) from the non-simultaneity of actions (with different individuals); and (3) from the different modifications of the Attributes—the plurality of Spirits is established.",
      "indian-samkhya-three-gunas": "Goodness is considered to be buoyant and illuminating; Foulness is exciting and versatile (mobile); Darkness, sluggish and enveloping.",
      "indian-samkhya-threefold-suffering": "There being (in this world) an impediment caused by the three kinds of pain, (there arises) a desire for enquiry into the means of alleviating them.",
      "indian-samkhya-unmanifest-manifest-knower": "Nature or Primordial Matter, the root of all, is not produced; the Great Principle (Mahat, i. e., Buddhi) and the rest are seven, being both producer and produced; sixteen are the produced; and the Spirit is neither the producer nor the produced.",
    },
  },
  {
    sourceUrl: "https://archive.org/details/thevaiasesikasut00kanauoft",
    sourceTextPath: "research/source-cache/indian-source-audit-batch9/sinha-vaisheshika-sutras-1923-djvu.txt",
    outputPath: "research/source-cache/reading-unit-derived/vaisheshika-sutra-sinha-1923-selected-chapters.txt",
    lineRanges: [[2265, 4310], [4311, 5104], [10123, 10709], [14881, 16862]],
    corrections: [
      {
        description: "Normalize the Book II / Chapter I boundary without changing its meaning.",
        pattern: String.raw`BOOK\s+SECOND—\s+CHAPTER\s+FIRST\.`,
        replacement: "BOOK II. CHAPTER I.",
      },
      {
        description: "Normalize the Book IV / Chapter I boundary without changing its meaning.",
        pattern: String.raw`BOOK\s+FOURTH—\s*CHAPTER\s+FIRST\.`,
        replacement: "BOOK IV. CHAPTER I.",
      },
      {
        description: "Normalize the Book VII / Chapter II boundary without changing its meaning.",
        pattern: String.raw`BOOK\s+SEVENTH—\s+CHAPTER\s+SECOND\.`,
        replacement: "BOOK VII. CHAPTER II.",
      },
      {
        description: "Normalize the Book VIII / Chapter I boundary without changing its meaning.",
        pattern: String.raw`BOOK\s+EIGHTH—\s+CHAPTER\s+FIRST\.`,
        replacement: "BOOK VIII. CHAPTER I.",
      },
      {
        description: "Restore ‘cause’ in aphorism VII.ii.26, dropped by Archive OCR; the same-edition contents summary prints ‘effect and cause’ in full.",
        pattern: String.raw`26\.\s+That\s+is\s+Combination\s+by\s+virtue\s+of\s+which\s+\(arises\s+the\s+intui\s*tion\)\s+in\s+the\s+foim\s+of\s+"\s*This\s+is\s+here/'\s+with\s+regard\s+to\s+effect\s+and\s+\.'—\s*307\.`,
        replacement: "26. That is Combination by virtue of which (arises the intuition) in the form of “This is here,” with regard to effect and cause.— 307.",
      },
    ],
    matchedThoughts: {
      "indian-vaisheshika-category-errors": "It possesses Action and Attribute, it is a combinative cause—such (is) the mark of Substance.",
      "indian-vaisheshika-dharma-inquiry": "Dharma (is) that from which (results) the accomplishment of Exaltation and of the Supreme Good.",
      "indian-vaisheshika-nine-substances": "Earth, Water, Fire, Air, Ether, Time, Space, Self, and Mind (are) the only Substances.",
      "indian-vaisheshika-universal-particular": "Substance-ness, and Attribute-ness and Action-ness are both Genera and Species.",
      "indian-vaisheshika-atoms-composites": "The effect is the mark (of the existence) of the ultimate atom.",
      "indian-vaisheshika-inherence": "That is Combination by virtue of which (arises the intuition) in the form of “This is here,” with regard to effect and cause.",
    },
  },
  {
    sourceUrl: "https://cdn.mises.org/On%20the%20Origins%20of%20Money_5.pdf",
    sourcePdfPath: "research/source-cache/menger-origin-money.pdf",
    outputPath: "research/source-cache/reading-unit-derived/menger-origin-money-2009.txt",
    matchedThoughts: {
      "economics-principles-menger-origin-money": "Men have been led, with increasing knowledge of their individual interests, each by his own economic interests, without convention, without legal compulsion, nay, even without any regard to the common interest, to exchange goods destined for exchange (their “wares”) for other goods equally destined for exchange, but more saleable.",
    },
  },
];

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function selectLineRanges(text, lineRanges) {
  if (!lineRanges) return text;
  const lines = text.replace(/\r\n?/gu, "\n").split("\n");
  return lineRanges.map(([start, end]) => {
    if (start < 1 || end < start || end > lines.length) {
      throw new Error(`Invalid line range ${start}-${end} for ${lines.length} extracted lines`);
    }
    return lines.slice(start - 1, end).join("\n");
  }).join("\n\n");
}

function applyCorrections(text, corrections = [], label) {
  return corrections.reduce((current, correction) => {
    const expression = new RegExp(correction.pattern, "gu");
    const matches = [...current.matchAll(expression)];
    const expectedMatches = correction.expectedMatches ?? 1;
    if (matches.length !== expectedMatches) {
      throw new Error(`${label}: expected ${expectedMatches} match(es) for ${correction.description}; found ${matches.length}`);
    }
    return current.replace(expression, correction.replacement);
  }, text);
}

function normalizedQuote(value) {
  return String(value)
    .normalize("NFKC")
    .toLocaleLowerCase("en")
    .replace(/[\p{P}\p{S}\s]/gu, "");
}

await mkdir(outputRoot, { recursive: true });
const manifestArtifacts = [];

for (const derivation of derivations) {
  const sourceArtifactPath = derivation.sourcePdfPath ?? derivation.sourceTextPath;
  if (!sourceArtifactPath) {
    throw new Error(`${derivation.outputPath} has no source artifact path`);
  }
  const sourcePath = resolve(projectRoot, sourceArtifactPath);
  const outputPath = resolve(projectRoot, derivation.outputPath);
  const sourceBytes = await readFile(sourcePath);
  let sourceText;
  let reusedExistingOutput = false;
  if (derivation.sourcePdfPath) {
    if (reuseExistingPdfDerivatives) {
      sourceText = await readFile(outputPath, "utf8");
      reusedExistingOutput = true;
    } else {
      const { stdout } = await execFileAsync(
        pdftotextBinary,
        [`-${derivation.pdftotextMode ?? "layout"}`, sourcePath, "-"],
        { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 },
      );
      sourceText = stdout;
    }
  } else {
    sourceText = sourceBytes.toString("utf8");
  }
  let output = reusedExistingOutput
    ? sourceText
    : selectLineRanges(sourceText, derivation.lineRanges);
  if (!reusedExistingOutput) {
    output = applyCorrections(output, derivation.corrections, derivation.outputPath);
  }
  output = `${output.trimEnd()}\n`;

  const searchableOutput = normalizedQuote(output);
  for (const [thoughtId, quote] of Object.entries(derivation.matchedThoughts)) {
    if (!searchableOutput.includes(normalizedQuote(quote))) {
      throw new Error(`${derivation.outputPath} does not contain the registered quote for ${thoughtId}`);
    }
  }

  await writeFile(outputPath, output, "utf8");
  manifestArtifacts.push({
    sourceUrl: derivation.sourceUrl,
    useBasis: derivation.useBasis ?? "public-domain",
    ...(derivation.sourcePdfPath ? {
      sourcePdfPath: derivation.sourcePdfPath,
      sourcePdfSha256: sha256(sourceBytes),
      command: `pdftotext -${derivation.pdftotextMode ?? "layout"} ${derivation.sourcePdfPath} -`,
    } : {
      sourceTextPath: derivation.sourceTextPath,
      sourceTextSha256: sha256(sourceBytes),
      command: `select declared line ranges from ${derivation.sourceTextPath}`,
    }),
    ...(derivation.lineRanges ? { lineRanges: derivation.lineRanges } : {}),
    ...(derivation.corrections ? {
      corrections: derivation.corrections.map(({ description }) => description),
    } : {}),
    outputPath: derivation.outputPath,
    outputBytes: Buffer.byteLength(output),
    outputSha256: sha256(output),
    matchedThoughtIds: Object.keys(derivation.matchedThoughts),
  });
}

const manifest = {
  schemaVersion: 1,
  purpose: "Reproducible text-only reading-unit fallbacks derived from eligible source PDFs and locally preserved text extractions; source scans are never shipped.",
  generator: "scripts/derive-reading-unit-texts.mjs",
  artifacts: manifestArtifacts,
};
await writeFile(
  resolve(outputRoot, "manifest.json"),
  `${JSON.stringify(manifest, null, 2)}\n`,
  "utf8",
);

console.log(`Derived ${manifestArtifacts.length} reading-unit text fallback(s).`);
