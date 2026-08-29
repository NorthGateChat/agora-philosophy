#!/usr/bin/env node

import { execFile } from "node:child_process";
import { createHash } from "node:crypto";
import { access, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { homedir, tmpdir } from "node:os";
import { dirname, resolve } from "node:path";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";

const execFileAsync = promisify(execFile);
const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const originRoot = resolve(projectRoot, "research/source-cache/non-public-24-recovery/origins");
const derivedRoot = resolve(projectRoot, "research/source-cache/reading-unit-derived");
const reportPath = resolve(projectRoot, "research/source-cache/non-public-24-recovery/derived-batch-2a.json");

const sha256 = (value) => createHash("sha256").update(value).digest("hex");
const normalizeSpaces = (value) => value.normalize("NFC").replace(/[\t ]+/gu, " ").trim();

function lineRange(value, firstLine, lastLine) {
  const lines = String(value).normalize("NFC").replace(/\r\n?/gu, "\n").split("\n");
  if (firstLine < 1 || lastLine > lines.length || firstLine > lastLine) {
    throw new Error(`Invalid source line range ${firstLine}-${lastLine} for ${lines.length} lines`);
  }
  return lines.slice(firstLine - 1, lastLine).join("\n");
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
    .replace(/\n{3,}/gu, "\n\n")
    .trim();
}

function dropLines(value, patterns) {
  return String(value)
    .replace(/\r\n?/gu, "\n")
    .split("\n")
    .filter((line) => !patterns.some((pattern) => pattern.test(normalizeSpaces(line))))
    .join("\n");
}

function replaceRequired(text, pattern, replacement, label) {
  pattern.lastIndex = 0;
  if (!pattern.test(text)) throw new Error(`Required correction did not match: ${label}`);
  pattern.lastIndex = 0;
  return text.replace(pattern, replacement);
}

function assertContains(text, excerpts, label) {
  for (const excerpt of excerpts) {
    if (!text.includes(excerpt)) throw new Error(`${label} is missing verified excerpt: ${excerpt}`);
  }
}

async function readable(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function resolvePdftoppm() {
  const candidates = [
    process.env.PDFTOPPM_PATH,
    "pdftoppm",
    resolve(homedir(), ".cache/codex-runtimes/codex-primary-runtime/dependencies/bin/override/pdftoppm"),
  ].filter(Boolean);
  for (const candidate of candidates) {
    if (candidate.includes("/") && !(await readable(candidate))) continue;
    try {
      await execFileAsync(candidate, ["-v"]);
      return candidate;
    } catch (error) {
      if (error?.code !== "ENOENT" && candidate.includes("/")) return candidate;
    }
  }
  throw new Error("pdftoppm was not found; set PDFTOPPM_PATH to reproduce the Einstein OCR source");
}

async function ensureEinsteinOcr() {
  const pdfPath = resolve(originRoot, "einstein-brownian-investigations-1926.pdf");
  const ocrPath = resolve(originRoot, "einstein-brownian-paper-pdf-pages-15-32-tesseract.txt");
  if (await readable(ocrPath)) return ocrPath;

  const pdftoppm = await resolvePdftoppm();
  const work = resolve(tmpdir(), `agora-einstein-brownian-${process.pid}`);
  await mkdir(work, { recursive: true });
  const chunks = [];
  try {
    for (let page = 15; page <= 32; page += 1) {
      const prefix = resolve(work, `page-${String(page).padStart(3, "0")}`);
      await execFileAsync(pdftoppm, [
        "-f", String(page), "-l", String(page), "-singlefile", "-r", "100", "-jpeg", pdfPath, prefix,
      ]);
      const { stdout } = await execFileAsync("tesseract", [`${prefix}.jpg`, "stdout", "--psm", "6"], {
        maxBuffer: 16 * 1024 * 1024,
      });
      chunks.push(`=== PDF PAGE ${page} ===\n${stdout.trim()}\n`);
    }
    await writeFile(ocrPath, `${chunks.join("\n")}\n`, "utf8");
  } finally {
    await rm(work, { recursive: true, force: true });
  }
  return ocrPath;
}

function extractRousseauFrench(apiJson) {
  const parsed = JSON.parse(apiJson);
  const byTitle = new Map(parsed.query.pages.map((page) => [page.title, page.revisions[0].slots.main.content]));
  const page418 = byTitle.get("Page:Rousseau - Collection complète des œuvres t8.djvu/418");
  const page419 = byTitle.get("Page:Rousseau - Collection complète des œuvres t8.djvu/419");
  if (!page418 || !page419) throw new Error("Rousseau Wikisource page revisions 418-419 were not found");
  let text = `${page418}\n${page419}`
    .replace(/<noinclude>[\s\S]*?<\/noinclude>/gu, "")
    .replace(/<nowiki\s*\/>/gu, "")
    .replace(/\{\{Centré\|''([\s\S]*?)''\}\}/gu, "$1")
    .split(/\n----\n/u)[0]
    .replace(/il seroit\s+il seroit absurde/u, "il seroit absurde");
  text = cleanOcrSlice(text);
  assertContains(text, [
    "Il est donc à croire que les besoins dicterent les premiers gestes, & que les passions arracherent les premieres voix.",
    "Ce n’est ni la faim, ni la soif, mais l’amour, la haine, la pitié, la colère, qui leur ont arraché les premieres voix.",
    "Voilà les plus anciens mots inventés, & voilà pourquoi les premieres langues furent chantantes & passionnées avant d’être simples & méthodiques.",
  ], "Rousseau French Chapter II");
  return text;
}

function extractRousseauSimpson(value) {
  let text = lineRange(value, 2521, 2534);
  text = cleanOcrSlice(text).replace(/^_Origin of language\._—/u, "");
  return text;
}

await mkdir(derivedRoot, { recursive: true });
const einsteinOcrPath = await ensureEinsteinOcr();

const fixedUnits = [
  {
    unitId: "ru-an-answer-to-the-question-what-is-enlightenment-whole-work-5c3bf825",
    source: "essaysandtreati01kantgoog_djvu.txt",
    output: "kant-what-is-enlightening-richardson-1798-complete.txt",
    range: [1029, 1518],
    heading: "# AN ANSWER TO THE QUESTION: WHAT IS ENLIGHTENING?",
    transform(raw) {
      let text = cleanOcrSlice(raw);
      const afterOpening = text.search(/Lazinefs and cowardice/iu);
      if (afterOpening < 0) throw new Error("Kant first paragraph boundary was not found");
      text = `Enlightening is, Man’s quitting the nonage occasioned by himself. Nonage or minority is the inability of making use of one’s own understanding without the guidance of another. This nonage is occasioned by one’s self, when the cause of it is not from want of understanding, but of resolution and courage to use one’s own understanding without the guidance of another. Sapere aude! Have courage to make use of thy own understanding! is therefore the dictum of enlightening.\n\n${text.slice(afterOpening)}`;
      return text.replace(/Lazinefs/gu, "Laziness");
    },
    excerpts: [
      "Enlightening is, Man’s quitting the nonage occasioned by himself.",
      "Sapere aude! Have courage to make use of thy own understanding! is therefore the dictum of enlightening.",
    ],
    evidence: "Internet Archive public-domain scan essaysandtreati01kantgoog, complete essay at OCR lines 1029-1518; opening checked against scan PDF pp. 28-29",
    corrections: ["Replaced the severely corrupted OCR of the opening paragraph with the wording visually checked on the 1798 scan; retained the rest as normalized source OCR."],
  },
  {
    unitId: "ru-class-function-concept-relation-whole-work-d92333b7",
    source: "sim_monist_1917-01_27_1_djvu.txt",
    output: "frege-class-function-concept-relation-1917-complete.txt",
    range: [6401, 7157],
    heading: "# CLASS, FUNCTION, CONCEPT, RELATION",
    transform(raw) {
      let text = cleanOcrSlice(raw).replace(/^CLASS, FUNCTION, CONCEPT, RELATION\.\s*/u, "");
      text = text.replace(/^N my Grundlagen/u, "In my Grundlagen");
      return replaceRequired(
        text,
        /The expression of a function needs completion \(ist erganzungsbediirftig\) and is not satished \(ungesdttigt\)\./u,
        "The expression of a function needs completion (ist ergänzungsbedürftig) and is not satisfied (ungesättigt).",
        "Frege German glosses and English OCR at original p. 119",
      );
    },
    excerpts: ["The expression of a function needs completion (ist ergänzungsbedürftig) and is not satisfied (ungesättigt)."],
    evidence: "Original The Monist 27(1) scan, complete Frege paper at OCR lines 6401-7157; anchor on original p. 119",
    corrections: ["Corrected OCR of ergänzungsbedürftig, satisfied, and ungesättigt against the journal scan."],
  },
  {
    unitId: "ru-illustrations-of-the-dynamical-theory-of-gases-part-i-c56f9836",
    source: "scientificpapers01maxw_djvu.txt",
    output: "maxwell-dynamical-theory-gases-part-i-1860.txt",
    range: [20616, 21301],
    heading: "# ILLUSTRATIONS OF THE DYNAMICAL THEORY OF GASES\n\n## PART I — On the Motions and Collisions of Perfectly Elastic Spheres",
    transform(raw) {
      let text = cleanOcrSlice(raw)
        .replace(/^XX\. Illustrations of the Dynamical Theory of Gases\*\. PART L On the Motions and Collisions of Perfectly Elastic Spheres\.\s*/iu, "")
        .replace(/\bUmits\b/gu, "limits")
        .replace(/\bcolUsion\b/gu, "collision");
      return text;
    },
    excerpts: [
      "If a great many equal spherical particles were in motion in a perfectly elastic vessel, collisions would take place among the particles, and their velocities would be altered at every collision; so that after a certain time the vis viva will be divided among the particles according to some regular law, the average number of particles whose velocity lies between certain limits being ascertainable, though the velocity of each particle changes at every collision.",
    ],
    evidence: "Scientific Papers of James Clerk Maxwell, vol. I (1890) public-domain scan, complete Part I at OCR lines 20616-21301; the following page header is excluded and Part II starts at line 21307; anchor on print p. 380",
    corrections: ["Corrected the two anchor OCR errors Umits/colUsion to limits/collision."],
  },
  {
    unitId: "ru-mathematical-psychics-part-ii-0e25c1e8",
    source: "mathematicalpsyc00edge_djvu.txt",
    output: "edgeworth-mathematical-psychics-part-ii-1881.txt",
    range: [807, 3693],
    heading: "# MATHEMATICAL PSYCHICS\n\n## PART II",
    transform(raw) {
      return cleanOcrSlice(raw)
        .replace(/^PAET n\.\s*/u, "")
        .replace(/\btliere\b/gu, "there");
    },
    excerpts: ["It is the interest of both parties that there should be some settlement, one of the contracts represented by the contract-curve between the limits."],
    evidence: "Original 1881 public-domain scan, complete Part II at OCR lines 807-3693; anchor in ‘Pure Contract,’ print p. 29",
    corrections: ["Corrected the anchor OCR form tliere to there."],
  },
  {
    unitId: "ru-phenomenology-encyclopaedia-britannica-part-i-7fba793f",
    source: "2015.73095.The-Encyclopaedia-Britannica-Vol-Xvii_djvu.txt",
    output: "husserl-phenomenology-britannica-1929-part-i.txt",
    range: [126994, 127211],
    heading: "# PHENOMENOLOGY\n\n## I. PHENOMENOLOGICAL PSYCHOLOGY",
    transform(raw) {
      let text = cleanOcrSlice(raw)
        .replace(/^PHENOMENOLOGY denotes/u, "Phenomenology denotes")
        .replace(/I I\. PHENOMENOLOGICAL PSYCHOLOGY\s*/u, "")
        .replace(/un’imited/gu, "unlimited")
        .replace(/self-consciousncss/gu, "self-consciousness")
        .replace(/consciousnezs/gu, "consciousness")
        .replace(/apjoearance/gu, "appearance");
      text = replaceRequired(
        text,
        /The phenomenologist, who will only notice phenomena, and know purely his own “life,” must practice an He must inhibit/u,
        "The phenomenologist, who will only notice phenomena, and know purely his own “life,” must practice an epoché. He must inhibit",
        "Husserl omitted epoché at the scan column break",
      );
      return text.replace(/He must inhibit\n\n(?=every ordinary objective)/u, "He must inhibit ");
    },
    excerpts: [
      "All consciousness is “intentional.”",
      "He must inhibit every ordinary objective “position,” and partake in no judgment concerning the objective world.",
    ],
    evidence: "Encyclopaedia Britannica, 14th ed., vol. 17 (1929), original scan, complete Part I at OCR lines 126994-127211; both card anchors on print p. 700",
    corrections: ["Restored epoché omitted by OCR at the column break and corrected a small set of obvious OCR forms; no conceptual rewriting."],
  },
  {
    unitId: "ru-the-teacher-chapter-xi-4bdee798",
    source: "philosophyofteac00augu_djvu.txt",
    output: "augustine-the-teacher-chapter-xi-tourscher-1924.txt",
    range: [2760, 2876],
    heading: "# CHAPTER XI",
    transform(raw) {
      const withoutHeaders = dropLines(raw, [
        /^SAINT AUGUSTINE \d+$/u,
        /^\d+ THE PHILOSOPHY OF TEACHING$/u,
      ]);
      return cleanOcrSlice(withoutHeaders).replace(/signi- _ fied/gu, "signified");
    },
    excerpts: ["By means of words, therefore, we learn only words: more still, only the sound and noise of words."],
    evidence: "Francis E. Tourscher translation (1924), scan PDF pp. 79-83 / print pp. 75-78; Chapter XI starts on PDF p. 79 and Chapter XII starts on p. 83",
    corrections: ["Chapter heading and boundary were visually verified because the Archive OCR omitted the Chapter XI heading."],
  },
];

const report = [];
for (const unit of fixedUnits) {
  const sourcePath = resolve(originRoot, unit.source);
  const source = await readFile(sourcePath, "utf8");
  const raw = lineRange(source, unit.range[0], unit.range[1]);
  const body = unit.transform(raw).trim();
  const output = `${unit.heading}\n\n${body}\n`;
  assertContains(output, unit.excerpts, unit.unitId);
  const outputPath = resolve(derivedRoot, unit.output);
  await writeFile(outputPath, output, "utf8");
  report.push({
    unitId: unit.unitId,
    sourcePaths: [`research/source-cache/non-public-24-recovery/origins/${unit.source}`],
    sourceSha256: [sha256(source)],
    sourceBoundary: { firstLine: unit.range[0], lastLine: unit.range[1] },
    outputPath: `research/source-cache/reading-unit-derived/${unit.output}`,
    outputBytes: Buffer.byteLength(output),
    outputCharacters: output.length,
    outputSha256: sha256(output),
    verifiedExcerpts: unit.excerpts,
    evidence: unit.evidence,
    corrections: unit.corrections,
  });
}

{
  const apiPath = resolve(originRoot, "rousseau-wikisource-pages-418-420-api.json");
  const simpsonPath = resolve(originRoot, "rousseau-essay-origin-languages-simpson-1921-gutenberg-69434.txt");
  const [api, simpson] = await Promise.all([readFile(apiPath, "utf8"), readFile(simpsonPath, "utf8")]);
  const french = extractRousseauFrench(api);
  const english = extractRousseauSimpson(simpson);
  const output = `# ESSAI SUR L’ORIGINE DES LANGUES\n\n## CHAPITRE II — Que la premiere invention de la parole ne vient pas des besoins, mais des passions\n\n### Texte français intégral (édition de 1782)\n\n${french}\n\n### Historical English rendering of the cited argument (Georgiana R. Simpson, 1921)\n\n${english}\n`;
  const excerpts = [
    "It is neither hunger nor thirst, but love, hate, pity, or anger which have called forth from men the first voices.",
    "nature dictates accents, cries, and tones of resentment. It was for this reason that the oldest words were invented.",
  ];
  assertContains(output, excerpts, "ru-essay-on-the-origin-of-languages-chapter-ii-2eda6e43");
  const outputName = "rousseau-origin-languages-chapter-ii-1782-with-simpson-1921.txt";
  await writeFile(resolve(derivedRoot, outputName), output, "utf8");
  report.push({
    unitId: "ru-essay-on-the-origin-of-languages-chapter-ii-2eda6e43",
    sourcePaths: [
      "research/source-cache/non-public-24-recovery/origins/rousseau-wikisource-pages-418-420-api.json",
      "research/source-cache/non-public-24-recovery/origins/rousseau-essay-origin-languages-simpson-1921-gutenberg-69434.txt",
    ],
    sourceSha256: [sha256(api), sha256(simpson)],
    sourceBoundary: {
      french: "French Wikisource scan pages 418-419, revision IDs 8971342-8971343, through the end of Chapter II before Chapter III",
      englishEvidence: "Gutenberg 69434 lines 2521-2534, Simpson's public-domain historical rendering of the cited argument",
    },
    outputPath: `research/source-cache/reading-unit-derived/${outputName}`,
    outputBytes: Buffer.byteLength(output),
    outputCharacters: output.length,
    outputSha256: sha256(output),
    verifiedExcerpts: excerpts,
    evidence: "Complete French natural chapter from the 1782 scan transcription, accompanied by a transparently labeled historical English rendering of the cited argument; Simpson did not translate the whole chapter.",
    corrections: ["Removed a duplicated il seroit at the scan-page join; no modernization of the 1782 French spelling."],
  });
}

{
  const source = await readFile(einsteinOcrPath, "utf8");
  let body = dropLines(source, [
    /^=== PDF PAGE \d+ ===$/u,
    /^Google$/u,
    /^\d+ THEORY OF BROWNIAN MOVEMENT$/u,
    /^MOVEMENT OF SMALL PARTICLES \d+$/u,
  ]);
  body = cleanOcrSlice(body);
  body = replaceRequired(
    body,
    /The mean displacement is therefore proportional to the square root of the time\./u,
    "The mean displacement is therefore proportional to the square root of the time.",
    "Einstein mean displacement conclusion",
  );
  const heading = "# ON THE MOVEMENT OF SMALL PARTICLES SUSPENDED IN A STATIONARY LIQUID DEMANDED BY THE MOLECULAR-KINETIC THEORY OF HEAT";
  const output = `${heading}\n\n${body}\n`;
  const excerpts = ["The mean displacement is therefore proportional to the square root of the time."];
  assertContains(output, excerpts, "ru-on-the-movement-of-small-particles-suspended-in--whole-work-8fd6f89b");
  const outputName = "einstein-brownian-movement-cowper-1926-complete-paper.txt";
  await writeFile(resolve(derivedRoot, outputName), output, "utf8");
  report.push({
    unitId: "ru-on-the-movement-of-small-particles-suspended-in--whole-work-8fd6f89b",
    sourcePaths: [
      "research/source-cache/non-public-24-recovery/origins/einstein-brownian-investigations-1926.pdf",
      "research/source-cache/non-public-24-recovery/origins/einstein-brownian-paper-pdf-pages-15-32-tesseract.txt",
    ],
    sourceSha256: [
      sha256(await readFile(resolve(originRoot, "einstein-brownian-investigations-1926.pdf"))),
      sha256(source),
    ],
    sourceBoundary: { firstPdfPage: 15, lastPdfPage: 32, printedPages: "title through p. 18; Paper II begins on PDF p. 33" },
    outputPath: `research/source-cache/reading-unit-derived/${outputName}`,
    outputBytes: Buffer.byteLength(output),
    outputCharacters: output.length,
    outputSha256: sha256(output),
    verifiedExcerpts: excerpts,
    evidence: "A. D. Cowper translation (1926), complete first paper in the Wikisource-hosted scan; title starts PDF p. 15, conclusion and Berne/received lines end PDF p. 32, Paper II starts PDF p. 33.",
    corrections: ["OCR was derived at 100 dpi with Tesseract psm 6; the card sentence was checked on printed p. 17 / PDF p. 31."],
  });
}

const summary = {
  schemaVersion: 1,
  command: "node scripts/derive-non-public-recovery-batch2a.mjs",
  prerequisites: ["pdftoppm (or PDFTOPPM_PATH) and tesseract, only when regenerating the cached Einstein OCR"],
  written: report.length,
  totalOutputBytes: report.reduce((sum, unit) => sum + unit.outputBytes, 0),
  units: report,
};
await writeFile(reportPath, `${JSON.stringify(summary, null, 2)}\n`, "utf8");
console.log(JSON.stringify(summary, null, 2));
