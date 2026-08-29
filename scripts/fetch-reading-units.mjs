#!/usr/bin/env node

import { createHash } from "node:crypto";
import { lookup as dnsLookup } from "node:dns/promises";
import {
  mkdir,
  readFile,
  rename,
  stat,
  unlink,
  writeFile,
} from "node:fs/promises";
import { isIP } from "node:net";
import {
  dirname,
  extname,
  relative,
  resolve,
  sep,
} from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { Converter as ChineseConverter } from "opencc-js/t2cn";

const scriptPath = fileURLToPath(import.meta.url);
const defaultProjectRoot = resolve(dirname(scriptPath), "..");
const readingUnitPipelineVersion = 2;
const supportedContentTypes = new Set([
  "application/json",
  "application/xhtml+xml",
  "text/html",
  "text/plain",
]);
const absoluteMaximumUnitCharacters = 600_000;
const maximumPublicUnitBytes = 600 * 1024;
const forbiddenSourceExtensions = new Set([
  ".djvu",
  ".epub",
  ".pdf",
]);
const localReadingExtensions = new Set([".html", ".txt", ".xml"]);
const sourceOverrideFields = new Set([
  "endPattern",
  "localPath",
  "maximumUnitCharacters",
  "minimumUnitCharacters",
  "startHeading",
  "startPattern",
  "url",
]);
const boilerplateParagraphs = [
  /^(?:skip to (?:main )?content|jump to navigation)$/iu,
  /^(?:accept|reject|manage) (?:all )?cookies?$/iu,
  /^(?:privacy policy|terms of (?:use|service)|cookie policy)$/iu,
  /^(?:share|download|print|navigation|menu)$/iu,
  /^(?:home|browse and comment|search|buy books and cd-roms|help)$/iu,
  /^(?:commentary|download):?$/iu,
  /^easy to print version\.?$/iu,
  /^hegel-by-hypertext home page(?: @ marxists\.org)?$/iu,
  /^&copy;\s*(?:textlog\.de\s+)?\d{4}(?:-\d{4})?\b.*$/iu,
  /^©\s*(?:textlog\.de\s+)?\d{4}(?:-\d{4})?\b.*$/iu,
  /^\*{3}\s*end of (?:the|this) project gutenberg ebook\b.*\*{3}$/iu,
  /^(?:table of contents|go to (?:previous|next|home|table of contents))$/iu,
  /^\[\s*(?:编辑|編輯|edit)\s*\]$/iu,
  /^comments\? suggestions\? please raise them here\. do not click this link\b.*$/iu,
  /^contact us\s*\|\s*advertise with new advent$/iu,
  /^categories:\s+.+$/iu,
  /^viewname is worksection$/iu,
  /^digitized by google$/iu,
  /^please help support the mission of new advent and get the full contents of this website as an instant download\b.*$/iu,
  /^about this page$/iu,
  /^contact information\.?\s+the editor of new advent is kevin knight\b.*$/iu,
  /^copyright © .*? by new advent\b.*$/iu,
];
const headingMarkerPattern = /\[\[AGORA-H([1-6])\]\]([\s\S]*?)\[\[\/AGORA-H\1\]\]/giu;
const englishNumberWordsSource = [
  "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
  "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen",
  "seventeen", "eighteen", "nineteen",
  "first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth",
  "ninth", "tenth", "eleventh", "twelfth", "thirteenth", "fourteenth", "fifteenth",
  "sixteenth", "seventeenth", "eighteenth", "nineteenth",
  "(?:twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety)(?:[- ](?:one|two|three|four|five|six|seven|eight|nine|first|second|third|fourth|fifth|sixth|seventh|eighth|ninth))?",
  "twentieth", "thirtieth", "fortieth", "fiftieth", "sixtieth", "seventieth",
  "eightieth", "ninetieth",
].join("|");
const ordinalFirstStructurePattern = new RegExp(
  `\\b(${englishNumberWordsSource})[ \\t]+(chapter|book|volume|part|section|essay|lecture|meditation|article)\\b`,
  "giu",
);
const kindFirstStructurePattern = new RegExp(
  `\\b(chapter|book|volume|part|section|essay|lecture|meditation|article)[ \\t]+(${englishNumberWordsSource})\\b`,
  "giu",
);
const numberedStructurePattern = new RegExp(
  `\\b(chapter|book|volume|part|section|essay|lecture|meditation|article)[ \\t_-]+([ivxlcdm]+|\\d+|${englishNumberWordsSource})\\b`,
  "giu",
);
const simplifyChineseCharacter = ChineseConverter({ from: "tw", to: "cn" });
const inFlightRemoteSources = new Map();
const headingComparableCache = new Map();
const headingStructuralKeyCache = new Map();

export class ReadingUnitPipelineError extends Error {
  constructor(code, message, details = undefined) {
    super(message);
    this.name = "ReadingUnitPipelineError";
    this.code = code;
    this.details = details;
  }
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function stableJson(value) {
  if (Array.isArray(value)) return `[${value.map(stableJson).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.keys(value).sort().map((key) => (
      `${JSON.stringify(key)}:${stableJson(value[key])}`
    )).join(",")}}`;
  }
  return JSON.stringify(value);
}

async function atomicWrite(path, contents) {
  await mkdir(dirname(path), { recursive: true });
  const temporaryPath = `${path}.${process.pid}.${Date.now()}.tmp`;
  await writeFile(temporaryPath, contents);
  await rename(temporaryPath, path);
}

function asPlainObject(value) {
  return value && typeof value === "object" && !Array.isArray(value)
    ? value
    : {};
}

function nonEmptyString(value) {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function decodeHtmlEntities(value) {
  const named = {
    Phi: "Φ",
    Omega: "Ω",
    Pi: "Π",
    Sigma: "Σ",
    amp: "&",
    alpha: "α",
    apos: "'",
    beta: "β",
    chi: "χ",
    delta: "δ",
    epsilon: "ε",
    exist: "∃",
    forall: "∀",
    gamma: "γ",
    ge: "≥",
    gt: ">",
    hellip: "…",
    infin: "∞",
    lambda: "λ",
    ldquo: "“",
    le: "≤",
    lsquo: "‘",
    lt: "<",
    mdash: "—",
    middot: "·",
    minus: "−",
    mu: "μ",
    nbsp: " ",
    ndash: "–",
    ne: "≠",
    nu: "ν",
    omega: "ω",
    phi: "φ",
    pi: "π",
    psi: "ψ",
    quot: '"',
    rdquo: "”",
    rho: "ρ",
    rsquo: "’",
    sigma: "σ",
    tau: "τ",
    theta: "θ",
    times: "×",
  };
  return value
    .replace(/&#x([0-9a-f]+);?/giu, (_, hexadecimal) => (
      String.fromCodePoint(Number.parseInt(hexadecimal, 16))
    ))
    .replace(/&#([0-9]+);?/gu, (_, decimal) => (
      String.fromCodePoint(Number.parseInt(decimal, 10))
    ))
    .replace(/&([a-z]+);/giu, (entity, name) => named[name] ?? named[name.toLowerCase()] ?? entity);
}

function normalizeParagraph(value) {
  return decodeHtmlEntities(value)
    .normalize("NFC")
    .replace(/\u00ad/gu, "")
    .replace(/\p{Cf}/gu, "")
    .replace(/[\t\f\v ]+/gu, " ")
    .replace(/ *\n */gu, "\n")
    .trim();
}

function splitLongParagraph(text, maximumLength = 8_000) {
  if (text.length <= maximumLength) return [text];
  const sentences = text.split(/(?<=[。！？.!?])\s+(?=\S)|(?<=[。！？])(?=\S)/u);
  const chunks = [];
  let current = "";
  for (const sentence of sentences) {
    if (current && current.length + sentence.length + 1 > maximumLength) {
      chunks.push(current.trim());
      current = "";
    }
    if (sentence.length > maximumLength) {
      if (current) chunks.push(current.trim());
      for (let offset = 0; offset < sentence.length; offset += maximumLength) {
        chunks.push(sentence.slice(offset, offset + maximumLength).trim());
      }
      current = "";
    } else {
      current = `${current}${current ? " " : ""}${sentence}`;
    }
  }
  if (current.trim()) chunks.push(current.trim());
  return chunks.filter(Boolean);
}

function paragraphsFromMarkedText(markedText, options = {}) {
  const paragraphs = [];
  const markerToken = "\u0000AGORA_HEADING_";
  let withHeadingLines = markedText.replace(
    headingMarkerPattern,
    (_, level, content) => `\n\n${markerToken}${level}\u0000${content}\n\n`,
  );
  withHeadingLines = withHeadingLines.replace(/\r\n?/gu, "\n");

  for (const rawBlock of withHeadingLines.split(/\n{2,}/u)) {
    const block = normalizeParagraph(rawBlock);
    if (!block) continue;
    const heading = block.match(/^\u0000AGORA_HEADING_([1-6])\u0000([\s\S]*)$/u);
    const rawText = normalizeParagraph(heading?.[2] ?? block.replace(/\n+/gu, " "));
    const text = options.removeInlineNumericFootnotes
      ? normalizeParagraph(removeInlineNumericFootnotes(rawText))
      : rawText;
    if (!text || boilerplateParagraphs.some((pattern) => pattern.test(text))) continue;
    for (const chunk of splitLongParagraph(text)) {
      paragraphs.push({
        text: chunk,
        ...(heading ? { headingLevel: Number(heading[1]) } : {}),
      });
    }
  }
  return paragraphs;
}

function sourceHostname(sourceUrl) {
  try {
    return new URL(sourceUrl).hostname.toLowerCase();
  } catch {
    return "";
  }
}

function sliceBetweenHtmlMarkers(html, startPattern, endPattern) {
  const start = html.search(startPattern);
  if (start === -1) return html;
  const fromStart = html.slice(start);
  const startMatch = fromStart.match(startPattern);
  const contentStart = start + (startMatch?.[0].length ?? 0);
  const afterStart = html.slice(contentStart);
  const relativeEnd = afterStart.search(endPattern);
  return relativeEnd === -1 ? afterStart : afterStart.slice(0, relativeEnd);
}

function htmlClassNames(tag) {
  const raw = tag.match(/\bclass\s*=\s*(["'])(.*?)\1/iu)?.[2] ?? "";
  return new Set(raw.split(/\s+/u).filter(Boolean));
}

function englishPhilosophyTextRegion(html) {
  const stack = [];
  const fragments = [];
  let active;
  for (const match of String(html).matchAll(/<\/?div\b[^>]*>/giu)) {
    const tag = match[0];
    if (/^<\/div/iu.test(tag)) {
      const frame = stack.pop();
      if (active?.frame === frame) {
        fragments.push(String(html).slice(active.start, match.index));
        active = undefined;
      }
      continue;
    }
    const frame = { classes: htmlClassNames(tag) };
    const parent = stack.at(-1);
    const grandparent = stack.at(-2);
    const withinTextDisplay = stack.some(({ classes }) => classes.has("text-display"));
    stack.push(frame);
    if (
      !active
      && frame.classes.has("content")
      && parent?.classes.has("block")
      && grandparent?.classes.has("blocks")
      && withinTextDisplay
    ) {
      active = { frame, start: match.index + tag.length };
    }
  }
  return fragments.length > 0 ? fragments.join("\n\n") : html;
}

function adaptHtmlSource(html, sourceUrl) {
  const hostname = sourceHostname(sourceUrl);
  if (hostname === "classics.mit.edu") {
    return sliceBetweenHtmlMarkers(
      html,
      /<a\b[^>]*\bname\s*=\s*["']start["'][^>]*>\s*<\/a>/iu,
      /<a\b[^>]*\bname\s*=\s*["']end["'][^>]*>\s*<\/a>/iu,
    );
  }
  if (hostname === "englishphilosophy.org" || hostname === "www.englishphilosophy.org") {
    return englishPhilosophyTextRegion(html);
  }
  return html;
}

function preferredHtmlRegion(html, sourceUrl) {
  const hostname = sourceHostname(sourceUrl);
  if (hostname === "ctext.org") {
    const contentStart = html.search(/<div\b[^>]*\bid\s*=\s*["']content3["'][^>]*>/iu);
    if (contentStart !== -1) return html.slice(contentStart);
  }
  for (const tag of ["article", "main"]) {
    const match = html.match(new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)<\\/${tag}>`, "iu"));
    if (match?.[1]) return match[1];
  }
  const body = html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/iu);
  return body?.[1] ?? html;
}

function plainTextFromHtml(fragment) {
  return normalizeParagraph(String(fragment)
    .replace(/<!--[\s\S]*?-->/gu, " ")
    .replace(/<(script|style|template|noscript|svg|canvas)\b[^>]*>[\s\S]*?<\/\1>/giu, " ")
    .replace(/<br\s*\/?>/giu, "\n")
    .replace(/<\/p>/giu, "\n\n")
    .replace(/<[^>]+>/gu, " "))
    .replace(/\s+([,.;:!?…。，；：！？)\]}>”’])/gu, "$1");
}

function structuralHeadingText(value) {
  const text = plainTextFromHtml(value);
  if (!text || text.length > 160) return undefined;
  return /^(?:(?:chapter|book|part|section|lecture|meditation|sutra)\b|§+\s*(?:\d+|[ivxlcdm]+)\b|第.{1,30}[章节卷篇部](?:\s|$))/iu.test(text)
    ? text
    : undefined;
}

function extractCTextParagraphs(html) {
  const region = preferredHtmlRegion(html, "https://ctext.org/");
  const paragraphs = [];
  for (const rowMatch of region.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/giu)) {
    const row = rowMatch[1];
    const cells = [...row.matchAll(/<td\b([^>]*)>([\s\S]*?)<\/td>/giu)];
    if (cells.length < 2) continue;
    const contentCell = [...cells].reverse().find((cell) => (
      /\bclass\s*=\s*["'][^"']*\b(?:ctext|etext)\b[^"']*["']/iu.test(cell[1])
    ));
    if (!contentCell) continue;
    const number = cells[0][2].match(/<a\b[^>]*\bclass\s*=\s*["'][^"']*\bpopup\b[^"']*["'][^>]*>\s*(\d{1,4})\s*<\/a>/iu)?.[1];
    if (number) paragraphs.push({ text: `[${number}]` });
    const blocks = plainTextFromHtml(contentCell[2]).split(/\n{2,}/u);
    for (const block of blocks) {
      const text = normalizeParagraph(block.replace(/\n+/gu, " "));
      if (!text || boilerplateParagraphs.some((pattern) => pattern.test(text))) continue;
      for (const chunk of splitLongParagraph(text)) paragraphs.push({ text: chunk });
    }
  }
  return paragraphs;
}

function filterSourceParagraphs(paragraphs, sourceUrl) {
  const hostname = sourceHostname(sourceUrl);
  if (!hostname.endsWith(".wikisource.org")) return paragraphs;
  const catalogHeaderIndex = paragraphs.slice(0, 12).findIndex(({ text }) => (
    /^(?:\S+\s+){0,4}\d{5,}\s+\S+(?:\s+\S+){1,40}$/u.test(normalizeParagraph(text))
  ));
  const contentParagraphs = catalogHeaderIndex >= 0
    ? paragraphs.slice(catalogHeaderIndex + 1)
    : paragraphs;
  return contentParagraphs.filter(({ text }) => {
    const normalized = normalizeParagraph(text);
    if (normalized.length <= 240 && /[◄►←→]/u.test(normalized)) return false;
    if (/^(?:版本信息|版本資訊)$/u.test(normalized)) return false;
    if (/^(?:姊妹计划|姊妹計劃)\s*:/u.test(normalized)) return false;
    if (/^↑?\s*(?:返回頂部|返回顶部|返回頁首|返回页首)$/u.test(normalized)) return false;
    if (/^此.*作品.*(?:公有領域|公有领域)/u.test(normalized)) return false;
    if (/^this page has been (?:proofread|validated)\b/iu.test(normalized)) return false;
    if (/^easy to print version\.?$/iu.test(normalized)) return false;
    if (/^for other english-language translations of this work, see\b/iu.test(normalized)) return false;
    if (/^a scan-backed, verifiable version of this work can be edited at\b/iu.test(normalized)) return false;
    if (/^if you would like to help, please see help:/iu.test(normalized)) return false;
    if (/^the source document of this text is not known\.?$/iu.test(normalized)) return false;
    if (/^please see this document's talk page for details for verification\b/iu.test(normalized)) return false;
    if (/^from wikisource(?:, the free online library)?\.?$/iu.test(normalized)) return false;
    if (/^sister projects\s*:/iu.test(normalized)) return false;
    if (/^layout\s+\d+$/iu.test(normalized)) return false;
    if (/^(?:work|author|translator|translated by|published by)\s*:/iu.test(normalized)) return false;
    if (/^[\u200b\u200c\u200d\ufeff]+$/u.test(normalized)) return false;
    if (/^(?:original|translation):$/iu.test(normalized)) return false;
    if (/^this work is a translation and has a separate copyright status\b/iu.test(normalized)) return false;
    if (/^(?:橫排|横排)\s*·\s*直排$/u.test(normalized)) return false;
    if (/^(?:this work|the longest-living author of this work)\b[\s\S]*\bpublic domain\b/iu.test(normalized)) {
      return false;
    }
    if (/^public domain(?:\s+public domain)*(?:\s+(?:true|false))*$/iu.test(normalized)) {
      return false;
    }
    return true;
  });
}

export function extractHtmlParagraphs(html, options = {}) {
  const sourceUrl = nonEmptyString(options.sourceUrl);
  const original = String(html);
  if (sourceHostname(sourceUrl) === "ctext.org" && /\bid\s*=\s*["']content3["']/iu.test(original)) {
    const ctextParagraphs = extractCTextParagraphs(original);
    if (ctextParagraphs.length > 0) return ctextParagraphs;
  }
  let region = preferredHtmlRegion(adaptHtmlSource(original, sourceUrl), sourceUrl);
  region = region
    .replace(/<!--[\s\S]*?-->/gu, " ")
    .replace(/<(script|style|template|noscript|svg|canvas|nav|header|footer|aside|form|dialog)\b[^>]*>[\s\S]*?<\/\1>/giu, " ")
    .replace(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/giu, (_, level, content) => (
      `\n\n[[AGORA-H${level}]]${content}[[/AGORA-H${level}]]\n\n`
    ))
    .replace(/<(?:b|strong)\b[^>]*>([\s\S]*?)<\/(?:b|strong)>/giu, (markup, content) => {
      const heading = structuralHeadingText(content);
      return heading ? `\n\n[[AGORA-H3]]${heading}[[/AGORA-H3]]\n\n` : markup;
    })
    .replace(/<br\s*\/?>/giu, "\n")
    .replace(/<\/(?:p|div|section|blockquote|pre|li|dt|dd|tr|table)>/giu, "\n\n")
    .replace(/<(?:p|div|section|blockquote|pre|li|dt|dd|tr|table)\b[^>]*>/giu, "\n\n")
    .replace(/<[^>]+>/gu, " ");
  return filterSourceParagraphs(paragraphsFromMarkedText(region, {
    removeInlineNumericFootnotes: isGutenbergSourceUrl(sourceUrl),
  }), sourceUrl);
}

function detectTextHeadings(text) {
  const structuralNumber = `(?:[ivxlcdm]+|\\d+|${englishNumberWordsSource})(?=[\\t .:—-]|$)`;
  const structuralKind = "chapter|book|volume|part|section|essay|lecture|meditation|article";
  const headingLevel = (kind) => ({
    book: 2,
    volume: 2,
    essay: 2,
    part: 3,
    article: 4,
    chapter: 4,
    lecture: 4,
    meditation: 4,
    section: 5,
  })[kind.toLowerCase()];
  const markHeading = (heading, kind) => (
    `\n\n[[AGORA-H${headingLevel(kind)}]]${heading}[[/AGORA-H${headingLevel(kind)}]]\n\n`
  );
  return String(text)
    .normalize("NFC")
    .replace(/\r\n?/gu, "\n")
    .replace(/^[ \t]*(#{1,6})[ \t]+(.+)$/gmu, (_, hashes, heading) => (
      `\n\n[[AGORA-H${Math.min(hashes.length, 6)}]]${heading}[[/AGORA-H${Math.min(hashes.length, 6)}]]\n\n`
    ))
    .replace(new RegExp(
      `^[ \\t]*((${structuralKind})[ \\t]+${structuralNumber}([^\\n]*))$`,
      "gimu",
    ), (_, heading, kind, suffix) => (
      /^[ \\t]+[a-z]/u.test(suffix) ? heading : markHeading(heading, kind)
    ))
    .replace(new RegExp(
      `^[ \\t]*((${englishNumberWordsSource})[ \\t]+(${structuralKind})\\b([^\\n]*))$`,
      "gimu",
    ), (_, heading, _number, kind, suffix) => (
      /^[ \\t]+[a-z]/u.test(suffix) ? heading : markHeading(heading, kind)
    ))
    .replace(new RegExp(
      `^[ \\t]*([^\\n]{1,80}(?:--|—)[ \\t]*(${structuralKind})[ \\t]+${structuralNumber}[^\\n]*)$`,
      "gimu",
    ), (_, heading, kind) => markHeading(heading, kind))
    .replace(/^[ \t]*((?:the[ \t]+)?(?:preface|forethought|introduction|conclusion|appendix)\s*\.?)\s*$/gimu, (
      _, heading,
    ) => `\n\n[[AGORA-H2]]${heading}[[/AGORA-H2]]\n\n`)
    .replace(/^[ \t]*([A-Z][A-Z -]{1,40}\s+SERIES\d?\s*\.?)\s*$/gmu, (
      _, heading,
    ) => `\n\n[[AGORA-H2]]${heading}[[/AGORA-H2]]\n\n`);
}

function stripGutenbergEnvelope(text) {
  const normalized = String(text).normalize("NFC").replace(/\r\n?/gu, "\n");
  const modernStart = normalized.match(/^\s*\*{3}\s*START OF (?:THE|THIS) PROJECT GUTENBERG EBOOK[^\n]*\*{3}\s*$/imu);
  const legacyHeaderEnd = normalized.match(/^\s*\*END THE SMALL PRINT![^\n]*\*END\*\s*$/imu);
  const start = modernStart ?? legacyHeaderEnd;
  const afterStart = start ? normalized.slice((start.index ?? 0) + start[0].length) : normalized;
  const modernEnd = afterStart.match(/^\s*\*{3}\s*END OF (?:THE|THIS) PROJECT GUTENBERG EBOOK[^\n]*\*{3}\s*$/imu);
  const legacyEnd = afterStart.match(/^\s*END OF (?:THE )?PROJECT GUTENBERG(?:(?:'|’)S\b|\s+(?:EBOOK|ETEXT)\b)[^\n]*$/imu);
  const end = [modernEnd, legacyEnd]
    .filter(Boolean)
    .sort((left, right) => (left.index ?? 0) - (right.index ?? 0))[0];
  return end ? afterStart.slice(0, end.index) : afterStart;
}

export function extractTextParagraphs(text, options = {}) {
  return paragraphsFromMarkedText(detectTextHeadings(stripGutenbergEnvelope(text)), {
    removeInlineNumericFootnotes: isGutenbergSourceUrl(options.sourceUrl),
  });
}

function romanNumeralValue(value) {
  const roman = String(value).toUpperCase();
  if (!/^(?=[IVXLCDM]+$)M{0,4}(?:CM|CD|D?C{0,3})(?:XC|XL|L?X{0,3})(?:IX|IV|V?I{0,3})$/u.test(roman)) {
    return undefined;
  }
  const values = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1_000 };
  let total = 0;
  for (let index = 0; index < roman.length; index += 1) {
    const current = values[roman[index]];
    const next = values[roman[index + 1]] ?? 0;
    total += current < next ? -current : current;
  }
  return total;
}

function englishNumberValue(value) {
  const direct = {
    zero: 0,
    one: 1,
    first: 1,
    two: 2,
    second: 2,
    three: 3,
    third: 3,
    four: 4,
    fourth: 4,
    five: 5,
    fifth: 5,
    six: 6,
    sixth: 6,
    seven: 7,
    seventh: 7,
    eight: 8,
    eighth: 8,
    nine: 9,
    ninth: 9,
    ten: 10,
    tenth: 10,
    eleven: 11,
    eleventh: 11,
    twelve: 12,
    twelfth: 12,
    thirteen: 13,
    thirteenth: 13,
    fourteen: 14,
    fourteenth: 14,
    fifteen: 15,
    fifteenth: 15,
    sixteen: 16,
    sixteenth: 16,
    seventeen: 17,
    seventeenth: 17,
    eighteen: 18,
    eighteenth: 18,
    nineteen: 19,
    nineteenth: 19,
    twentieth: 20,
    thirtieth: 30,
    fortieth: 40,
    fiftieth: 50,
    sixtieth: 60,
    seventieth: 70,
    eightieth: 80,
    ninetieth: 90,
  };
  const normalized = String(value).toLocaleLowerCase("en").replaceAll("-", " ").trim();
  if (Object.hasOwn(direct, normalized)) return direct[normalized];
  const [tensWord, unitWord, ...extra] = normalized.split(/\s+/u);
  if (extra.length > 0) return undefined;
  const tens = {
    twenty: 20,
    thirty: 30,
    forty: 40,
    fifty: 50,
    sixty: 60,
    seventy: 70,
    eighty: 80,
    ninety: 90,
  }[tensWord];
  const unit = direct[unitWord];
  return tens !== undefined && unit >= 1 && unit <= 9 ? tens + unit : tens;
}

function headingComparable(value) {
  const source = String(value ?? "");
  const cached = headingComparableCache.get(source);
  if (cached !== undefined) return cached;
  const comparable = simplifyChineseCharacter(source)
    .normalize("NFKC")
    .toLocaleLowerCase("en")
    .replace(ordinalFirstStructurePattern, "$2 $1")
    .replace(kindFirstStructurePattern, (_, kind, number) => (
      `${kind} ${englishNumberValue(number) ?? number}`
    ))
    .replace(/\b[ivxlcdm]+\b/giu, (roman) => romanNumeralValue(roman) ?? roman)
    .replace(/\bvolume\b/gu, "vol")
    .replace(/[第章节卷篇部编·:：,，.。()（）\[\]{}'"“”‘’\s_-]+/gu, "")
    .trim();
  headingComparableCache.set(source, comparable);
  return comparable;
}

function headingStructuralKey(value) {
  const source = String(value ?? "");
  const cached = headingStructuralKeyCache.get(source);
  if (cached !== undefined) return cached;
  const normalized = simplifyChineseCharacter(source)
    .normalize("NFKC")
    .toLocaleLowerCase("en")
    .replace(ordinalFirstStructurePattern, "$2 $1");
  numberedStructurePattern.lastIndex = 0;
  const key = [...normalized.matchAll(numberedStructurePattern)].map(([, kind, rawNumber]) => {
    const number = /^\d+$/u.test(rawNumber)
      ? Number(rawNumber)
      : romanNumeralValue(rawNumber) ?? englishNumberValue(rawNumber);
    return number === undefined ? "" : `${kind === "volume" ? "vol" : kind}${number}`;
  }).filter(Boolean).join("");
  headingStructuralKeyCache.set(source, key);
  return key;
}

function headingScore(heading, candidate) {
  const left = headingComparable(heading);
  const right = headingComparable(candidate);
  if (!left || !right) return 0;
  const leftStructure = headingStructuralKey(heading);
  const rightStructure = headingStructuralKey(candidate);
  if (leftStructure && rightStructure) {
    if (leftStructure === rightStructure) return 110;
    if (leftStructure.includes(rightStructure) || rightStructure.includes(leftStructure)) {
      return 70 + Math.min(leftStructure.length, rightStructure.length)
        / Math.max(leftStructure.length, rightStructure.length) * 20;
    }
  }
  if (left === right) return 100;
  if (left.includes(right) || right.includes(left)) {
    return 60 + Math.min(left.length, right.length) / Math.max(left.length, right.length) * 20;
  }
  const rightTokens = String(candidate)
    .toLocaleLowerCase("en")
    .match(/[\p{L}\p{N}]+/gu) ?? [];
  const distinctive = rightTokens.filter((token) => token.length >= 3 || /^\d+$/u.test(token));
  if (distinctive.length === 0) return 0;
  const headingLower = String(heading).toLocaleLowerCase("en");
  const hits = distinctive.filter((token) => headingLower.includes(token)).length;
  return hits / distinctive.length * 50;
}

function sectionCandidates(unit) {
  const locator = asPlainObject(unit.locator);
  const source = asPlainObject(unit.source);
  const work = asPlainObject(unit.work);
  const structureKey = nonEmptyString(locator.structureKey);
  const structureParts = structureKey?.split("-").filter(Boolean) ?? [];
  const structuralWords = new Set([
    "appendix",
    "book",
    "chapter",
    "conclusion",
    "essay",
    "introduction",
    "lecture",
    "meditation",
    "part",
    "preface",
    "section",
    "sutra",
    "volume",
  ]);
  const firstStructuralIndex = structureParts.findIndex((part) => structuralWords.has(part));
  const trimmedStructure = firstStructuralIndex > 0
    ? structureParts.slice(firstStructuralIndex).join("-")
    : structureParts.length > 1 && !structuralWords.has(structureParts[0])
      ? structureParts.slice(1).join("-")
      : undefined;
  const workTitleCandidates = structureKey === "whole-work" || structureKey?.startsWith("named-")
    ? [work.en, work.zh]
    : [];
  return [
    source.startHeading,
    locator.en,
    locator.zh,
    ...workTitleCandidates,
    structureKey,
    trimmedStructure,
    structureParts.length > 1 ? structureParts.slice(-2).join("-") : undefined,
    structureParts.at(-1),
  ].map(nonEmptyString).filter(Boolean);
}

function fastSearchableValue(value, aggressive = false) {
  let normalized = simplifyChineseCharacter(removeInlineEditorialAnnotations(
    removeInlineNumericFootnotes(String(value ?? "")),
  )
    .normalize("NFKC")
    .replace(/\p{Cf}/gu, "")
    .replace(/^(?:\.{3}|…)+|(?:\.{3}|…)+$/gu, "")
    .trim())
    .toLocaleLowerCase("en")
    .replace(/[“”„‟«»「」『』‘’‚‛]/gu, '"')
    .replace(/[‐‑‒–—―]/gu, "-")
    .replace(/…/gu, "...")
    .replace(/\s+/gu, "");
  if (aggressive) normalized = normalized.replace(/[\p{P}\p{S}]/gu, "");
  return normalized;
}

function findFastCoverage(searchRows, rawQuote, maximumParagraphs = 3) {
  const ellipsisSegments = String(rawQuote)
    .split(/(?:…+|\.{3,})/u)
    .map((segment) => fastSearchableValue(segment, true))
    .filter(Boolean);
  const orderedEllipsis = ellipsisSegments.length >= 2;
  if (orderedEllipsis && ellipsisSegments.some((segment) => segment.length < 4)) {
    return undefined;
  }

  if (!orderedEllipsis) {
    for (const aggressive of [false, true]) {
      const needle = fastSearchableValue(rawQuote, aggressive);
      if (!needle || needle.length < 3) continue;
      for (const [index, row] of searchRows.entries()) {
        if (row[aggressive ? "aggressive" : "normal"].includes(needle)) {
          return { start: index, end: index + 1 };
        }
      }
      for (let start = 0; start < searchRows.length - 1; start += 1) {
        let joined = searchRows[start][aggressive ? "aggressive" : "normal"];
        for (
          let count = 2;
          count <= maximumParagraphs && start + count <= searchRows.length;
          count += 1
        ) {
          joined += searchRows[start + count - 1][aggressive ? "aggressive" : "normal"];
          if (joined.includes(needle)) return { start, end: start + count };
        }
      }
    }
    return undefined;
  }

  let cursor = { paragraphIndex: 0, normalizedOffset: 0 };
  let rangeStart;
  let rangeEnd;
  for (const segment of ellipsisSegments) {
    let hit;
    for (
      let start = cursor.paragraphIndex;
      start < searchRows.length && !hit;
      start += 1
    ) {
      let joined = "";
      for (
        let count = 1;
        count <= maximumParagraphs && start + count <= searchRows.length;
        count += 1
      ) {
        joined += searchRows[start + count - 1].aggressive;
        const from = start === cursor.paragraphIndex ? cursor.normalizedOffset : 0;
        const index = joined.indexOf(segment, from);
        if (index === -1) continue;
        const endOffset = index + segment.length;
        let consumed = 0;
        let firstParagraph = start;
        let finalParagraph = start;
        let finalOffset = endOffset;
        for (let offset = 0; offset < count; offset += 1) {
          const length = searchRows[start + offset].aggressive.length;
          if (index >= consumed + length) firstParagraph = start + offset + 1;
          if (endOffset > consumed + length) {
            consumed += length;
            continue;
          }
          finalParagraph = start + offset;
          finalOffset = endOffset - consumed;
          break;
        }
        hit = { firstParagraph, finalParagraph, finalOffset };
        break;
      }
    }
    if (!hit) return undefined;
    rangeStart ??= hit.firstParagraph;
    rangeEnd = hit.finalParagraph + 1;
    cursor = {
      paragraphIndex: hit.finalParagraph,
      normalizedOffset: hit.finalOffset,
    };
  }
  return { start: rangeStart, end: rangeEnd };
}

function quoteCoverage(paragraphs, cardQuotes) {
  if (Object.keys(cardQuotes).length === 0) return undefined;
  const searchRows = paragraphs.map(({ text }) => {
    const normal = fastSearchableValue(text);
    return {
      normal,
      aggressive: normal.replace(/[\p{P}\p{S}]/gu, ""),
    };
  });
  const ranges = [];
  for (const rawQuote of Object.values(cardQuotes)) {
    const quote = nonEmptyString(rawQuote);
    if (!quote) return undefined;
    const range = findFastCoverage(searchRows, quote);
    if (!range) return undefined;
    ranges.push(range);
  }
  return {
    start: Math.min(...ranges.map(({ start }) => start)),
    end: Math.max(...ranges.map(({ end }) => end)),
  };
}

export function selectReadingUnitParagraphs(paragraphs, unit, options = {}) {
  const maximumUnitCharacters = options.maximumUnitCharacters ?? 150_000;
  const maximumUnboundedSectionCharacters = options.maximumUnboundedSectionCharacters ?? 80_000;
  const minimumUnitCharacters = options.minimumUnitCharacters ?? 120;
  const source = asPlainObject(unit.source);
  const startPattern = nonEmptyString(source.startPattern);
  const endPattern = nonEmptyString(source.endPattern);
  let selected = paragraphs;
  let selectionMethod = "whole-document";
  const cardQuotes = asPlainObject(options.cardQuotes);
  const hasCardQuotes = Object.keys(cardQuotes).length > 0;
  const coverage = hasCardQuotes ? quoteCoverage(paragraphs, cardQuotes) : undefined;
  const quotesFit = (start, end) => Boolean(
    coverage && coverage.start >= start && coverage.end <= end,
  );

  if (startPattern) {
    let startExpression;
    let endExpression;
    try {
      startExpression = new RegExp(startPattern, "iu");
      endExpression = endPattern ? new RegExp(endPattern, "iu") : undefined;
    } catch (error) {
      throw new ReadingUnitPipelineError(
        "invalid-section-pattern",
        `Invalid section pattern for ${unit.id}: ${error.message}`,
      );
    }
    const starts = paragraphs
      .map(({ text }, index) => (startExpression.test(text) ? index : -1))
      .filter((index) => index !== -1);
    if (starts.length === 0) {
      throw new ReadingUnitPipelineError(
        "section-not-found",
        `Configured start pattern did not match ${unit.id}`,
      );
    }
    const configuredSelections = starts.map((start) => {
      const relativeEnd = endExpression
        ? paragraphs.slice(start + 1).findIndex(({ text }) => endExpression.test(text))
        : -1;
      const end = relativeEnd === -1 ? paragraphs.length : start + 1 + relativeEnd;
      const candidateParagraphs = paragraphs.slice(start, end);
      return {
        paragraphs: candidateParagraphs,
        quotesMatched: quotesFit(start, end),
        characterCount: candidateParagraphs.reduce((sum, paragraph) => sum + paragraph.text.length, 0),
      };
    });
    configuredSelections.sort((left, right) => (
      Number(right.quotesMatched) - Number(left.quotesMatched)
      || left.characterCount - right.characterCount
    ));
    selected = configuredSelections[0].paragraphs;
    selectionMethod = "configured-pattern";
  } else {
    const headingStack = [];
    const headings = paragraphs
      .map((paragraph, index) => {
        if (!paragraph.headingLevel) return undefined;
        headingStack.length = paragraph.headingLevel - 1;
        headingStack[paragraph.headingLevel - 1] = paragraph.text;
        return {
          paragraph,
          index,
          breadcrumb: headingStack.filter(Boolean).join(" "),
        };
      })
      .filter(Boolean);
    const matches = [];
    for (const heading of headings) {
      let score = 0;
      let specificity = 0;
      for (const candidate of sectionCandidates(unit)) {
        const candidateScore = Math.max(
          headingScore(heading.paragraph.text, candidate),
          headingScore(heading.breadcrumb, candidate),
        );
        const candidateSpecificity = headingComparable(candidate).length;
        if (candidateScore > score || (
          candidateScore === score && candidateSpecificity > specificity
        )) {
          score = candidateScore;
          specificity = candidateSpecificity;
        }
      }
      if (score < 55) continue;
      const next = headings.find(({ index, paragraph }) => (
        index > heading.index && paragraph.headingLevel <= heading.paragraph.headingLevel
      ));
      const candidateParagraphs = paragraphs.slice(heading.index, next?.index ?? paragraphs.length);
      matches.push({
        ...heading,
        score,
        specificity,
        paragraphs: candidateParagraphs,
        quotesMatched: quotesFit(heading.index, next?.index ?? paragraphs.length),
        characterCount: candidateParagraphs.reduce((sum, paragraph) => sum + paragraph.text.length, 0),
      });
    }
    matches.sort((left, right) => (
      Number(right.quotesMatched) - Number(left.quotesMatched)
      || right.score - left.score
      || right.specificity - left.specificity
      || left.characterCount - right.characterCount
      || right.index - left.index
    ));
    if (matches.length > 0) {
      selected = matches[0].paragraphs;
      selectionMethod = "matched-heading";
    }
  }

  const characterCount = selected.reduce((sum, paragraph) => sum + paragraph.text.length, 0);
  if (characterCount < minimumUnitCharacters) {
    throw new ReadingUnitPipelineError(
      "source-too-short",
      `Extracted text for ${unit.id} has only ${characterCount} characters`,
    );
  }
  if (
    !options.deferUnboundedBoundary
    && characterCount > maximumUnitCharacters
    && selectionMethod === "whole-document"
  ) {
    throw new ReadingUnitPipelineError(
      "section-not-found",
      `Refusing to publish ${characterCount} characters for ${unit.id} without a chapter boundary`,
    );
  }
  if (
    !options.deferUnboundedBoundary
    && selectionMethod === "whole-document"
    && unit.locator?.structureKey !== "whole-work"
    && characterCount > maximumUnboundedSectionCharacters
  ) {
    throw new ReadingUnitPipelineError(
      "boundary-required",
      `Unbounded non-whole unit ${unit.id} has ${characterCount} characters; add start/end override boundaries`,
      { characterCount, maximumUnboundedSectionCharacters },
    );
  }
  if (!options.deferUnboundedBoundary && characterCount > maximumUnitCharacters) {
    throw new ReadingUnitPipelineError(
      "unit-too-large",
      `Selected unit ${unit.id} has ${characterCount} characters`,
    );
  }
  return { paragraphs: selected, selectionMethod, characterCount };
}

function structuralBoundaryKind(paragraph) {
  if (paragraph.headingLevel) return `heading-${paragraph.headingLevel}`;
  const text = paragraph.text.trim();
  if (/^\[\d{1,4}\]$/u.test(text)) return "bracket-number";
  if (/^§+\s*\d{1,4}[.)]?$/u.test(text)) return "section-number";
  if (/^§+\s*[ivxlcdm]+[.)]?$/iu.test(text)) return "section-roman";
  if (/^\d{1,4}[.)]?$/u.test(text)) return "number";
  if (/^[ivxlcdm]+[.)]?$/iu.test(text)) return "roman";
  const named = text.match(/^(chapter|book|part|section|lecture|meditation|sutra)\b/iu);
  if (named) return named[1].toLowerCase();
  if (
    text.length <= 80
    && (
      /^第.{1,30}[章节卷篇部](?:[\s:：·、].*)?$/u.test(text)
      || /^.{1,30}第[一二三四五六七八九十百千〇零两兩0-9]+$/u.test(text)
    )
  ) return "chinese-section";
  return undefined;
}

function nextMatchingBoundary(paragraphs, startIndex, kind, headingLevel) {
  for (let index = startIndex + 1; index < paragraphs.length; index += 1) {
    const paragraph = paragraphs[index];
    if (headingLevel) {
      if (paragraph.headingLevel && paragraph.headingLevel <= headingLevel) return index;
      continue;
    }
    if (structuralBoundaryKind(paragraph) === kind) return index;
  }
  return paragraphs.length;
}

/**
 * Some primary-text pages expose numbered chapter markers as ordinary blocks
 * rather than HTML headings. A candidate boundary is accepted only when its
 * label agrees with the inventory locator and every card quote fits before the
 * next same-level marker.
 */
export function selectQuoteGuidedBoundary(paragraphs, unit, cardQuotes, options = {}) {
  const minimumUnitCharacters = options.minimumUnitCharacters ?? 120;
  const maximumUnitCharacters = options.maximumUnitCharacters ?? 150_000;
  const candidates = sectionCandidates(unit);
  const coverage = quoteCoverage(paragraphs, asPlainObject(cardQuotes));
  if (!coverage) return undefined;
  const validSelections = [];
  const breadcrumbByIndex = new Map();
  const headingStack = [];
  for (const [index, paragraph] of paragraphs.entries()) {
    if (!paragraph.headingLevel) continue;
    headingStack.length = paragraph.headingLevel - 1;
    headingStack[paragraph.headingLevel - 1] = paragraph.text;
    breadcrumbByIndex.set(index, headingStack.filter(Boolean).join(" "));
  }
  for (let index = 0; index < paragraphs.length; index += 1) {
    const paragraph = paragraphs[index];
    const kind = structuralBoundaryKind(paragraph);
    if (!kind) continue;
    const boundaryLabel = paragraph.text;
    const breadcrumb = breadcrumbByIndex.get(index) ?? boundaryLabel;
    let score = 0;
    let specificity = 0;
    for (const candidate of candidates) {
      const candidateScore = Math.max(
        headingScore(boundaryLabel, candidate),
        headingScore(breadcrumb, candidate),
      );
      const candidateSpecificity = headingComparable(candidate).length;
      if (candidateScore > score || (
        candidateScore === score && candidateSpecificity > specificity
      )) {
        score = candidateScore;
        specificity = candidateSpecificity;
      }
    }
    if (score < 55) continue;
    const end = nextMatchingBoundary(
      paragraphs,
      index,
      kind,
      paragraph.headingLevel,
    );
    const selected = paragraphs.slice(index, end);
    const characterCount = selected.reduce((sum, item) => sum + item.text.length, 0);
    if (characterCount < minimumUnitCharacters || characterCount > maximumUnitCharacters) continue;
    if (coverage.start >= index && coverage.end <= end) {
      validSelections.push({
        paragraphs: selected,
        selectionMethod: "quote-guided-boundary",
        characterCount,
        boundaryScore: score,
        boundarySpecificity: specificity,
      });
    }
  }
  validSelections.sort((left, right) => (
    right.boundaryScore - left.boundaryScore
    || right.boundarySpecificity - left.boundarySpecificity
    || left.characterCount - right.characterCount
  ));
  return validSelections[0];
}

function enforceFinalBoundary(selection, unit, options = {}) {
  const maximumUnboundedSectionCharacters = options.maximumUnboundedSectionCharacters ?? 80_000;
  const maximumUnitCharacters = options.maximumUnitCharacters ?? 150_000;
  if (selection.characterCount > maximumUnitCharacters) {
    throw new ReadingUnitPipelineError(
      "unit-too-large",
      `Selected unit ${unit.id} has ${selection.characterCount} characters`,
      { characterCount: selection.characterCount, maximumUnitCharacters },
    );
  }
  if (
    selection.selectionMethod === "whole-document"
    && unit.locator?.structureKey !== "whole-work"
    && selection.characterCount > maximumUnboundedSectionCharacters
  ) {
    throw new ReadingUnitPipelineError(
      "boundary-required",
      `Unbounded non-whole unit ${unit.id} has ${selection.characterCount} characters; add start/end override boundaries`,
      {
        characterCount: selection.characterCount,
        maximumUnboundedSectionCharacters,
      },
    );
  }
  return selection;
}

function canonicalCharacter(character) {
  if (/\p{Cf}/u.test(character)) return "";
  if (/\s/u.test(character)) return "";
  if (/[“”„‟«»「」『』‘’‚‛]/u.test(character)) return '"';
  if (/[‐‑‒–—―]/u.test(character)) return "-";
  if (/[…]/u.test(character)) return "...";
  return simplifyChineseCharacter(character).toLocaleLowerCase("en");
}

function inlineEditorialAnnotationAt(source, index) {
  if (source[index] !== "(") return undefined;
  return source.slice(index).match(
    /^(?:\(\s*\[Greek:\s*[^\]\r\n]{1,80}\]\s*\)|\((?:serving|ruling)\))/iu,
  )?.[0].length;
}

function inlineNumericFootnoteAt(source, index) {
  const marker = source.slice(index).match(/^\[\d{1,4}\]/u)?.[0];
  if (!marker) return undefined;
  const after = source[index + marker.length];
  const prefix = source.slice(0, index);
  const paragraphStart = prefix.lastIndexOf("\n\n") + 2;
  const followsText = source.slice(paragraphStart, index).trim().length > 0;
  const precedesText = !after || /[\s\p{L}\p{N}\p{P}\p{S}]/u.test(after);
  return followsText && precedesText ? marker.length : undefined;
}

function removeInlineNumericFootnotes(value) {
  const source = String(value);
  let result = "";
  for (let index = 0; index < source.length; index += 1) {
    const markerLength = inlineNumericFootnoteAt(source, index);
    if (markerLength) {
      const after = source[index + markerLength];
      if (!after || /[\p{P}\p{S}]/u.test(after)) result = result.replace(/[\t ]+$/u, "");
      index += markerLength - 1;
      continue;
    }
    result += source[index];
  }
  return result;
}

function removeInlineEditorialAnnotations(value) {
  const source = String(value);
  let result = "";
  for (let index = 0; index < source.length; index += 1) {
    const markerLength = inlineEditorialAnnotationAt(source, index);
    if (markerLength) {
      index += markerLength - 1;
      continue;
    }
    result += source[index];
  }
  return result;
}

function searchableText(value, aggressive = false) {
  const source = String(value ?? "")
    .normalize("NFKC")
    .replace(/^(?:\.{3}|…)+|(?:\.{3}|…)+$/gu, "")
    .trim();
  let normalized = "";
  const offsets = [];
  const ends = [];
  const ignoredRanges = [];
  for (let index = 0; index < source.length; index += 1) {
    const markerLength = inlineNumericFootnoteAt(source, index)
      ?? inlineEditorialAnnotationAt(source, index);
    if (markerLength) {
      ignoredRanges.push({ start: index, end: index + markerLength });
      index += markerLength - 1;
      continue;
    }
    const sourceCharacter = String.fromCodePoint(source.codePointAt(index));
    const canonical = canonicalCharacter(sourceCharacter);
    for (const character of canonical) {
      if (aggressive && /[\p{P}\p{S}]/u.test(character)) continue;
      normalized += character;
      for (let codeUnit = 0; codeUnit < character.length; codeUnit += 1) {
        offsets.push(index);
        ends.push(index + sourceCharacter.length);
      }
    }
    index += sourceCharacter.length - 1;
  }
  return { normalized, offsets, ends, ignoredRanges, source };
}

function trimSourceRange(source, start, end) {
  let trimmedStart = start;
  let trimmedEnd = end;
  while (trimmedStart < trimmedEnd && /\s/u.test(source[trimmedStart])) trimmedStart += 1;
  while (trimmedEnd > trimmedStart && /\s/u.test(source[trimmedEnd - 1])) trimmedEnd -= 1;
  return { start: trimmedStart, end: trimmedEnd };
}

function quoteBoundaryPunctuation(rawNeedle) {
  const needle = String(rawNeedle ?? "")
    .normalize("NFKC")
    .replace(/^(?:\.{3}|…)+|(?:\.{3}|…)+$/gu, "")
    .trim();
  return {
    leading: /^[\p{P}\p{S}]/u.test(needle),
    trailing: /[\p{P}\p{S}]$/u.test(needle),
  };
}

function expandSourceRangeToQuotedPunctuation(source, range, rawNeedle) {
  const boundary = quoteBoundaryPunctuation(rawNeedle);
  let { start, end } = range;
  if (boundary.leading) {
    let cursor = start;
    while (cursor > 0 && /[\t ]/u.test(source[cursor - 1])) cursor -= 1;
    const punctuationEnd = cursor;
    while (cursor > 0 && /[\p{P}\p{S}]/u.test(source[cursor - 1])) cursor -= 1;
    if (cursor < punctuationEnd) start = cursor;
  }
  if (boundary.trailing) {
    let cursor = end;
    while (cursor < source.length && /[\t \u00a0]/u.test(source[cursor])) cursor += 1;
    const punctuationStart = cursor;
    while (cursor < source.length && /[\p{P}\p{S}]/u.test(source[cursor])) cursor += 1;
    if (cursor > punctuationStart) end = cursor;
  }
  return { start, end };
}

function matchedSourceRanges(row, matchIndex, needleLength, rawNeedle) {
  const rawRange = expandSourceRangeToQuotedPunctuation(row.source, {
    start: row.offsets[matchIndex],
    end: row.ends[matchIndex + needleLength - 1],
  }, rawNeedle);
  const { start, end } = rawRange;
  const ignored = row.ignoredRanges.filter((range) => range.start < end && range.end > start);
  if (ignored.length === 0) return [{ start, end }];
  const ranges = [];
  let cursor = start;
  for (const range of ignored) {
    if (range.start > cursor) ranges.push(trimSourceRange(row.source, cursor, range.start));
    cursor = Math.max(cursor, range.end);
  }
  if (cursor < end) ranges.push(trimSourceRange(row.source, cursor, end));
  return ranges.filter((range) => range.start < range.end);
}

function findQuoteInParagraph(text, quote) {
  const orderedEllipsis = String(quote)
    .split(/(?:…+|\.{3,})/u)
    .map((segment) => segment.trim())
    .filter(Boolean).length >= 2;
  for (const aggressive of orderedEllipsis ? [false] : [false, true]) {
    const haystack = searchableText(text, aggressive);
    const needle = searchableText(quote, aggressive).normalized;
    if (!needle || needle.length < 3) continue;
    const matchIndex = haystack.normalized.indexOf(needle);
    if (matchIndex !== -1) {
      const ranges = matchedSourceRanges(haystack, matchIndex, needle.length, quote);
      return {
        start: ranges[0].start,
        end: ranges[0].end,
        ...(ranges.length > 1 ? { ranges } : {}),
        method: aggressive ? "punctuation-insensitive" : "normalized-exact",
      };
    }
  }
  return undefined;
}

function paragraphWindow(paragraphs, startIndex, count) {
  const entries = paragraphs.slice(startIndex, startIndex + count);
  let combined = "";
  const ranges = [];
  for (const [offset, paragraph] of entries.entries()) {
    if (offset > 0) combined += "\n\n";
    const start = combined.length;
    combined += paragraph.text;
    ranges.push({
      paragraph,
      start,
      end: combined.length,
    });
  }
  return { combined, ranges };
}

function mappedSegments(window, start, end) {
  return window.ranges.flatMap(({ paragraph, start: rangeStart, end: rangeEnd }) => {
    const overlapStart = Math.max(start, rangeStart);
    const overlapEnd = Math.min(end, rangeEnd);
    if (overlapStart >= overlapEnd) return [];
    const localStart = overlapStart - rangeStart;
    const localEnd = overlapEnd - rangeStart;
    return [{
      paragraphId: paragraph.id,
      start: localStart,
      end: localEnd,
      text: paragraph.text.slice(localStart, localEnd),
    }];
  });
}

function adjacentParagraphMatch(paragraphs, quote, maximumParagraphs = 3) {
  const orderedEllipsis = String(quote)
    .split(/(?:…+|\.{3,})/u)
    .map((segment) => segment.trim())
    .filter(Boolean).length >= 2;
  if (orderedEllipsis) return undefined;
  for (let startIndex = 0; startIndex < paragraphs.length - 1; startIndex += 1) {
    for (
      let count = 2;
      count <= maximumParagraphs && startIndex + count <= paragraphs.length;
      count += 1
    ) {
      const window = paragraphWindow(paragraphs, startIndex, count);
      for (const aggressive of [false, true]) {
        const haystack = searchableText(window.combined, aggressive);
        const needle = searchableText(quote, aggressive).normalized;
        if (!needle || needle.length < 3) continue;
        const matchIndex = haystack.normalized.indexOf(needle);
        if (matchIndex === -1) continue;
        const segments = matchedSourceRanges(haystack, matchIndex, needle.length, quote)
          .flatMap(({ start, end }) => mappedSegments(window, start, end));
        if (new Set(segments.map(({ paragraphId }) => paragraphId)).size < 2) continue;
        return {
          paragraphId: segments[0].paragraphId,
          start: segments[0].start,
          end: segments[0].end,
          match: aggressive
            ? "punctuation-insensitive-adjacent-paragraphs"
            : "normalized-adjacent-paragraphs",
          segments,
        };
      }
    }
  }
  return undefined;
}

function normalizedOffsetAtOrAfter(row, sourceOffset) {
  const index = row.offsets.findIndex((offset) => offset >= sourceOffset);
  return index === -1 ? row.normalized.length : index;
}

function sparseSegmentMatch(
  paragraphs,
  searchRows,
  needle,
  rawNeedle,
  cursor,
  maximumParagraphs = 3,
) {
  for (let paragraphIndex = cursor.paragraphIndex; paragraphIndex < paragraphs.length; paragraphIndex += 1) {
    const row = searchRows[paragraphIndex];
    const from = paragraphIndex === cursor.paragraphIndex
      ? normalizedOffsetAtOrAfter(row, cursor.sourceOffset)
      : 0;
    const matchIndex = row.normalized.indexOf(needle, from);
    if (matchIndex === -1) continue;
    const ranges = matchedSourceRanges(row, matchIndex, needle.length, rawNeedle);
    const segments = ranges.map(({ start, end }) => ({
      paragraphId: paragraphs[paragraphIndex].id,
      start,
      end,
      text: paragraphs[paragraphIndex].text.slice(start, end),
    }));
    const finalSegment = segments.at(-1);
    return {
      segments,
      cursor: { paragraphIndex, sourceOffset: finalSegment.end },
    };
  }

  for (let startIndex = cursor.paragraphIndex; startIndex < paragraphs.length - 1; startIndex += 1) {
    for (
      let count = 2;
      count <= maximumParagraphs && startIndex + count <= paragraphs.length;
      count += 1
    ) {
      const window = paragraphWindow(paragraphs, startIndex, count);
      const haystack = searchableText(window.combined, true);
      const minimumSourceOffset = startIndex === cursor.paragraphIndex ? cursor.sourceOffset : 0;
      const minimumNormalizedOffset = normalizedOffsetAtOrAfter(haystack, minimumSourceOffset);
      const matchIndex = haystack.normalized.indexOf(needle, minimumNormalizedOffset);
      if (matchIndex === -1) continue;
      const segments = matchedSourceRanges(haystack, matchIndex, needle.length, rawNeedle)
        .flatMap(({ start, end }) => mappedSegments(window, start, end));
      if (new Set(segments.map(({ paragraphId }) => paragraphId)).size < 2) continue;
      const finalSegment = segments.at(-1);
      const finalParagraphOffset = window.ranges.findIndex(({ paragraph }) => (
        paragraph.id === finalSegment.paragraphId
      ));
      return {
        segments,
        cursor: {
          paragraphIndex: startIndex + finalParagraphOffset,
          sourceOffset: finalSegment.end,
        },
      };
    }
  }
  return undefined;
}

function ellipsisOrderedMatch(paragraphs, quote, maximumParagraphs = 3) {
  const rawSegments = String(quote)
    .split(/(?:…+|\.{3,})/u)
    .map((segment) => segment.trim())
    .filter(Boolean);
  if (rawSegments.length < 2) return undefined;
  const normalizedSegments = rawSegments.map((segment) => (
    searchableText(segment, true).normalized
  ));
  if (normalizedSegments.some((segment) => segment.length < 4)) return undefined;

  const searchRows = paragraphs.map(({ text }) => searchableText(text, true));
  let cursor = { paragraphIndex: 0, sourceOffset: 0 };
  const segments = [];
  for (const [index, needle] of normalizedSegments.entries()) {
    const hit = sparseSegmentMatch(
      paragraphs,
      searchRows,
      needle,
      rawSegments[index],
      cursor,
      maximumParagraphs,
    );
    if (!hit) return undefined;
    segments.push(...hit.segments);
    cursor = hit.cursor;
  }
  return {
    paragraphId: segments[0].paragraphId,
    start: segments[0].start,
    end: segments[0].end,
    match: "ellipsis-ordered-segments",
    segments,
  };
}

export function matchCardAnchors(paragraphs, cardQuotes) {
  const anchoredParagraphs = paragraphs.map((paragraph, index) => ({
    id: `p${String(index + 1).padStart(4, "0")}`,
    text: paragraph.text,
  }));
  const anchors = {};
  for (const [thoughtId, rawQuote] of Object.entries(cardQuotes)) {
    const quote = nonEmptyString(rawQuote);
    if (!quote) {
      anchors[thoughtId] = { match: "missing-quote" };
      continue;
    }
    let result;
    for (const paragraph of anchoredParagraphs) {
      const found = findQuoteInParagraph(paragraph.text, quote);
      if (found) {
        const segments = found.ranges?.map(({ start, end }) => ({
          paragraphId: paragraph.id,
          start,
          end,
          text: paragraph.text.slice(start, end),
        }));
        result = {
          paragraphId: paragraph.id,
          start: found.start,
          end: found.end,
          quote,
          match: found.method,
          ...(segments?.length > 1 ? { segments } : {}),
        };
        break;
      }
    }
    if (!result) {
      const found = adjacentParagraphMatch(anchoredParagraphs, quote)
        ?? ellipsisOrderedMatch(anchoredParagraphs, quote);
      if (found) result = { ...found, quote };
    }
    anchors[thoughtId] = result ?? { quote, match: "unmatched" };
  }
  return { paragraphs: anchoredParagraphs, anchors };
}

function isPrivateIpv4(address, options = {}) {
  const parts = address.split(".").map(Number);
  if (parts.length !== 4 || parts.some((part) => !Number.isInteger(part))) return true;
  const [a, b] = parts;
  return a === 0
    || a === 10
    || a === 127
    || a >= 224
    || (a === 100 && b >= 64 && b <= 127)
    || (a === 169 && b === 254)
    || (a === 172 && b >= 16 && b <= 31)
    || (a === 192 && b === 0)
    || (a === 192 && b === 168)
    || (!options.allowSyntheticNetworkProxy && a === 198 && (b === 18 || b === 19));
}

function isPrivateIp(address, options = {}) {
  if (isIP(address) === 4) return isPrivateIpv4(address, options);
  if (isIP(address) !== 6) return true;
  const normalized = address.toLowerCase();
  return normalized === "::"
    || normalized === "::1"
    || normalized.startsWith("fc")
    || normalized.startsWith("fd")
    || normalized.startsWith("fe8")
    || normalized.startsWith("fe9")
    || normalized.startsWith("fea")
    || normalized.startsWith("feb")
    || normalized.startsWith("::ffff:127.")
    || normalized.startsWith("::ffff:10.")
    || normalized.startsWith("::ffff:192.168.");
}

export async function validateRemoteUrl(rawUrl, options = {}) {
  let url;
  try {
    url = new URL(rawUrl);
  } catch {
    throw new ReadingUnitPipelineError("invalid-url", `Invalid source URL: ${rawUrl}`);
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") {
    throw new ReadingUnitPipelineError("unsafe-url", `Unsupported URL protocol: ${url.protocol}`);
  }
  if (url.username || url.password) {
    throw new ReadingUnitPipelineError("unsafe-url", "Source URLs cannot contain credentials");
  }
  if (url.port && url.port !== "80" && url.port !== "443") {
    throw new ReadingUnitPipelineError("unsafe-url", `Source URL uses disallowed port ${url.port}`);
  }
  const hostname = url.hostname.replace(/^\[|\]$/gu, "");
  if (hostname === "localhost" || hostname.endsWith(".localhost")) {
    throw new ReadingUnitPipelineError("unsafe-url", "Localhost sources are not allowed");
  }
  const resolver = options.resolveHost ?? (async (host) => dnsLookup(host, { all: true }));
  let addresses;
  try {
    addresses = isIP(hostname) ? [{ address: hostname }] : await resolver(hostname);
  } catch (error) {
    throw new ReadingUnitPipelineError(
      "dns-failed",
      `Could not resolve ${hostname}: ${error.message}`,
    );
  }
  if (!Array.isArray(addresses) || addresses.length === 0) {
    throw new ReadingUnitPipelineError("dns-failed", `No address found for ${hostname}`);
  }
  if (addresses.some(({ address }) => isPrivateIp(address, options))) {
    throw new ReadingUnitPipelineError("unsafe-url", `Private address rejected for ${hostname}`);
  }
  return url;
}

async function readResponseBody(response, maximumBytes) {
  if (!response.body) return "";
  const reader = response.body.getReader();
  const chunks = [];
  let byteLength = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    byteLength += value.byteLength;
    if (byteLength > maximumBytes) {
      await reader.cancel();
      throw new ReadingUnitPipelineError(
        "source-too-large",
        `Remote source exceeded ${maximumBytes} bytes`,
      );
    }
    chunks.push(value);
  }
  const body = new Uint8Array(byteLength);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder("utf-8", { fatal: false }).decode(body);
}

function normalizedContentType(value) {
  return String(value ?? "").split(";", 1)[0].trim().toLowerCase();
}

async function readCachedRemote(cacheDirectory, cacheKey) {
  try {
    const [metadataRaw, body] = await Promise.all([
      readFile(resolve(cacheDirectory, `${cacheKey}.json`), "utf8"),
      readFile(resolve(cacheDirectory, `${cacheKey}.body.txt`), "utf8"),
    ]);
    const metadata = JSON.parse(metadataRaw);
    if (metadata.sha256 !== sha256(body)) return undefined;
    return { ...metadata, body, cacheHit: true };
  } catch (error) {
    if (error?.code === "ENOENT" || error instanceof SyntaxError) return undefined;
    throw error;
  }
}

async function writeRemoteCache(cacheDirectory, cacheKey, source) {
  await mkdir(cacheDirectory, { recursive: true });
  await Promise.all([
    atomicWrite(resolve(cacheDirectory, `${cacheKey}.body.txt`), source.body),
    atomicWrite(resolve(cacheDirectory, `${cacheKey}.json`), `${JSON.stringify({
      url: source.url,
      contentType: source.contentType,
      sha256: source.sha256,
      fetchedAt: source.fetchedAt,
    }, null, 2)}\n`),
  ]);
}

async function fetchRemoteSourceOnce(rawUrl, options = {}) {
  const cacheDirectory = options.cacheDirectory
    ?? resolve(defaultProjectRoot, "research", "reading-units", "fetch-cache");
  const cacheKey = sha256(String(rawUrl));
  const cached = await readCachedRemote(cacheDirectory, cacheKey);
  if (cached) return cached;
  if (!options.allowNetwork) {
    throw new ReadingUnitPipelineError(
      "network-disabled",
      `Network fetch disabled for ${rawUrl}; rerun with --allow-network and a small --limit`,
    );
  }

  const fetchImplementation = options.fetchImplementation ?? globalThis.fetch;
  if (typeof fetchImplementation !== "function") {
    throw new ReadingUnitPipelineError("fetch-unavailable", "No fetch implementation available");
  }
  const maximumRedirects = options.maximumRedirects ?? 5;
  const maximumBytes = options.maximumBytes ?? 6_000_000;
  const timeoutMilliseconds = options.timeoutMilliseconds ?? 20_000;
  let currentUrl = String(rawUrl);

  for (let redirects = 0; redirects <= maximumRedirects; redirects += 1) {
    const validated = await validateRemoteUrl(currentUrl, options);
    const response = await fetchImplementation(validated, {
      redirect: "manual",
      signal: AbortSignal.timeout(timeoutMilliseconds),
      headers: {
        accept: "text/html,application/xhtml+xml,text/plain;q=0.9,*/*;q=0.1",
        "user-agent": "NOTHING-FINAL-Reading-Unit-Builder/0.3 (+https://github.com/NorthGateChat/agora-philosophy)",
      },
    });
    if ([301, 302, 303, 307, 308].includes(response.status)) {
      const location = response.headers.get("location");
      if (!location) {
        throw new ReadingUnitPipelineError("redirect-without-location", `${currentUrl} redirected without Location`);
      }
      currentUrl = new URL(location, validated).href;
      continue;
    }
    if (!response.ok) {
      throw new ReadingUnitPipelineError(
        "http-error",
        `${currentUrl} returned HTTP ${response.status}`,
      );
    }
    const contentLength = Number(response.headers.get("content-length"));
    if (Number.isFinite(contentLength) && contentLength > maximumBytes) {
      throw new ReadingUnitPipelineError(
        "source-too-large",
        `${currentUrl} declares ${contentLength} bytes`,
      );
    }
    const contentType = normalizedContentType(response.headers.get("content-type"));
    const permittedOctetStream = options.allowOctetStreamText
      && contentType === "application/octet-stream";
    if (!supportedContentTypes.has(contentType) && !permittedOctetStream) {
      throw new ReadingUnitPipelineError(
        "unsupported-content-type",
        `${currentUrl} returned ${contentType || "no content type"}; PDF/scans stay outside public readings`,
      );
    }
    const body = await readResponseBody(response, maximumBytes);
    const source = {
      url: validated.href,
      contentType,
      body,
      sha256: sha256(body),
      fetchedAt: new Date().toISOString(),
      cacheHit: false,
    };
    await writeRemoteCache(cacheDirectory, cacheKey, source);
    return source;
  }
  throw new ReadingUnitPipelineError(
    "too-many-redirects",
    `${rawUrl} exceeded ${maximumRedirects} redirects`,
  );
}

export function fetchRemoteSource(rawUrl, options = {}) {
  const cacheDirectory = resolve(
    options.cacheDirectory
      ?? resolve(defaultProjectRoot, "research", "reading-units", "fetch-cache"),
  );
  const requestKey = `${cacheDirectory}\u0000${rawUrl}`;
  const existing = inFlightRemoteSources.get(requestKey);
  if (existing) return existing;
  const pending = fetchRemoteSourceOnce(rawUrl, { ...options, cacheDirectory });
  inFlightRemoteSources.set(requestKey, pending);
  const clearPending = () => {
    if (inFlightRemoteSources.get(requestKey) === pending) {
      inFlightRemoteSources.delete(requestKey);
    }
  };
  void pending.then(clearPending, clearPending);
  return pending;
}

function gutenbergBookId(rawUrl) {
  let url;
  try {
    url = new URL(rawUrl);
  } catch {
    return undefined;
  }
  if (!/(?:^|\.)gutenberg\.org$/iu.test(url.hostname)) return undefined;
  return url.pathname.match(/(?:epub|ebooks|files)\/(\d+)|\/(\d+)\/(?:pg)?\d+/iu)
    ?.slice(1)
    .find(Boolean);
}

function isGutenbergSourceUrl(rawUrl) {
  const hostname = sourceHostname(rawUrl);
  return hostname === "gutenberg.pglaf.org"
    || hostname === "gutenberg.org"
    || hostname.endsWith(".gutenberg.org");
}

function gutenbergDirectory(bookId) {
  const digits = String(bookId).split("");
  const prefix = digits.slice(0, -1).join("/");
  return `https://gutenberg.pglaf.org/${prefix ? `${prefix}/` : ""}${bookId}/`;
}

export function gutenbergMirrorCandidates(rawUrl) {
  const bookId = gutenbergBookId(rawUrl);
  if (!bookId) return [];
  const directory = gutenbergDirectory(bookId);
  return [
    `${directory}${bookId}-0.txt`,
    `${directory}${bookId}.txt`,
  ];
}

function textLinksFromDirectory(html, directoryUrl, bookId) {
  const links = [];
  for (const match of String(html).matchAll(/href=["']([^"']+\.txt)["']/giu)) {
    const url = new URL(decodeHtmlEntities(match[1]), directoryUrl);
    if (url.hostname !== new URL(directoryUrl).hostname) continue;
    if (!url.pathname.includes(`/${bookId}/`)) continue;
    links.push(url.href);
  }
  const preference = (url) => (
    url.endsWith(`${bookId}-0.txt`) ? 0
      : url.endsWith(`${bookId}.txt`) ? 1
        : /-8\.txt$/iu.test(url) ? 3 : 2
  );
  return [...new Set(links)].sort((left, right) => preference(left) - preference(right));
}

export async function fetchGutenbergSource(rawUrl, options = {}) {
  const bookId = gutenbergBookId(rawUrl);
  if (!bookId) {
    throw new ReadingUnitPipelineError("not-gutenberg", `Not a Gutenberg URL: ${rawUrl}`);
  }
  const failures = [];
  for (const candidate of gutenbergMirrorCandidates(rawUrl)) {
    try {
      return await fetchRemoteSource(candidate, options);
    } catch (error) {
      if (error?.code !== "http-error") throw error;
      failures.push(error.message);
    }
  }
  const directoryUrl = gutenbergDirectory(bookId);
  let directory;
  try {
    directory = await fetchRemoteSource(directoryUrl, options);
  } catch (error) {
    throw new ReadingUnitPipelineError(
      "gutenberg-mirror-failed",
      `Gutenberg mirror failed for ${bookId}: ${[...failures, error.message].join("; ")}`,
    );
  }
  const candidates = textLinksFromDirectory(directory.body, directoryUrl, bookId);
  for (const candidate of candidates) {
    try {
      return await fetchRemoteSource(candidate, options);
    } catch (error) {
      if (error?.code !== "http-error") throw error;
      failures.push(error.message);
    }
  }
  throw new ReadingUnitPipelineError(
    "gutenberg-text-not-found",
    `No plain-text edition found in ${directoryUrl}`,
  );
}

function mediaWikiSource(rawUrl) {
  let url;
  try {
    url = new URL(rawUrl);
  } catch {
    return undefined;
  }
  const supportedHost = url.hostname.endsWith(".wikisource.org")
    || url.hostname === "commons.wikimedia.org";
  if (!supportedHost) return undefined;
  const titleMatch = url.pathname.match(/^\/wiki\/(.+)$/u);
  const indexTitle = url.pathname === "/w/index.php" ? url.searchParams.get("title") : undefined;
  const encodedTitle = titleMatch?.[1] ?? indexTitle;
  if (!encodedTitle) return undefined;
  let title;
  try {
    title = decodeURIComponent(encodedTitle).replaceAll("_", " ");
  } catch {
    title = encodedTitle.replaceAll("_", " ");
  }
  if (!title.trim()) return undefined;
  url.hash = "";
  const oldid = /^\d+$/u.test(url.searchParams.get("oldid") ?? "")
    ? url.searchParams.get("oldid")
    : undefined;
  return { host: url.hostname, title, oldid, pageUrl: url.href };
}

export function mediaWikiApiUrlFor(rawUrl) {
  const source = mediaWikiSource(rawUrl);
  if (!source) return undefined;
  const api = new URL(`https://${source.host}/w/api.php`);
  api.searchParams.set("action", "parse");
  if (source.oldid) api.searchParams.set("oldid", source.oldid);
  else {
    api.searchParams.set("page", source.title);
    api.searchParams.set("redirects", "1");
  }
  api.searchParams.set("prop", "text|displaytitle");
  api.searchParams.set("format", "json");
  api.searchParams.set("formatversion", "2");
  return api.href;
}

export async function fetchMediaWikiSource(rawUrl, options = {}) {
  const page = mediaWikiSource(rawUrl);
  const apiUrl = mediaWikiApiUrlFor(rawUrl);
  if (!apiUrl || !page) {
    throw new ReadingUnitPipelineError("not-mediawiki", `Not a supported MediaWiki page: ${rawUrl}`);
  }
  const response = await fetchRemoteSource(apiUrl, options);
  let payload;
  try {
    payload = JSON.parse(response.body);
  } catch {
    throw new ReadingUnitPipelineError(
      "mediawiki-invalid-json",
      `MediaWiki API returned invalid JSON for ${rawUrl}`,
    );
  }
  const html = payload?.parse?.text;
  if (!nonEmptyString(html)) {
    throw new ReadingUnitPipelineError(
      "mediawiki-parse-failed",
      payload?.error?.info ?? `MediaWiki API returned no article text for ${rawUrl}`,
    );
  }
  return {
    ...response,
    url: page.pageUrl,
    retrievalUrl: apiUrl,
    contentType: "text/html",
    body: html,
    sha256: sha256(html),
  };
}

function bilaraSource(rawUrl) {
  let url;
  try {
    url = new URL(rawUrl);
  } catch {
    return undefined;
  }
  if (url.hostname !== "github.com") return undefined;
  const match = url.pathname.match(
    /^\/suttacentral\/bilara-data\/blob\/([^/]+)\/(.+_translation-[^/]+\.json)$/iu,
  );
  if (!match) return undefined;
  url.hash = "";
  const retrievalUrl = new URL(
    `https://raw.githubusercontent.com/suttacentral/bilara-data/${match[1]}/${match[2]}`,
  ).href;
  return { pageUrl: url.href, retrievalUrl };
}

export function bilaraRawUrlFor(rawUrl) {
  return bilaraSource(rawUrl)?.retrievalUrl;
}

export async function fetchBilaraSource(rawUrl, options = {}) {
  const source = bilaraSource(rawUrl);
  if (!source) {
    throw new ReadingUnitPipelineError("not-bilara", `Not a Bilara translation JSON: ${rawUrl}`);
  }
  const response = await fetchRemoteSource(source.retrievalUrl, options);
  return {
    ...response,
    url: source.pageUrl,
    retrievalUrl: response.url,
    contentType: "application/json",
    sourceFormat: "bilara-json",
  };
}

function joinBilaraFragments(fragments) {
  let joined = "";
  for (const fragment of fragments) {
    if (!fragment) continue;
    const separator = joined && !/^[,.;:!?…。，；：！？)\]}>”’]/u.test(fragment) ? " " : "";
    joined += `${separator}${fragment}`;
  }
  return normalizeParagraph(joined);
}

export function extractBilaraJsonParagraphs(body) {
  let payload;
  try {
    payload = JSON.parse(String(body));
  } catch {
    throw new ReadingUnitPipelineError("bilara-invalid-json", "Bilara source is not valid JSON");
  }
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    throw new ReadingUnitPipelineError("bilara-invalid-json", "Bilara source must be a segment object");
  }
  const groups = new Map();
  for (const [segmentKey, rawText] of Object.entries(payload)) {
    if (typeof rawText !== "string") continue;
    const match = segmentKey.match(/^(.+):(\d+)\.(\d+)$/u);
    if (!match) continue;
    const text = plainTextFromHtml(rawText);
    if (!text) continue;
    const groupKey = `${match[1]}:${match[2]}`;
    const fragments = groups.get(groupKey) ?? [];
    fragments.push(text);
    groups.set(groupKey, fragments);
  }
  const paragraphs = [...groups.values()]
    .map((fragments) => ({ text: joinBilaraFragments(fragments) }))
    .filter(({ text }) => Boolean(text));
  if (paragraphs.length === 0) {
    throw new ReadingUnitPipelineError("bilara-empty-source", "Bilara source has no translation segments");
  }
  return paragraphs;
}

function archiveIdentifierFor(rawUrl) {
  let url;
  try {
    url = new URL(rawUrl);
  } catch {
    return undefined;
  }
  if (url.hostname !== "archive.org" && url.hostname !== "www.archive.org") {
    return undefined;
  }
  const match = url.pathname.match(/^\/(?:details|download)\/([^/]+)/u);
  if (!match) return undefined;
  try {
    return decodeURIComponent(match[1]);
  } catch {
    return match[1];
  }
}

function archiveTextFileScore(name, identifier) {
  const lower = name.toLowerCase();
  if (!lower.endsWith(".txt")) return Number.POSITIVE_INFINITY;
  if (lower === `${identifier.toLowerCase()}_djvu.txt`) return 0;
  if (lower.endsWith("_djvu.txt")) return 1;
  if (lower.endsWith("_searchtext.txt")) return 2;
  if (/_(?:meta|reviews|notes)\.txt$/u.test(lower)) return Number.POSITIVE_INFINITY;
  return 3;
}

export async function fetchArchiveTextSource(rawUrl, options = {}) {
  const identifier = archiveIdentifierFor(rawUrl);
  if (!identifier) {
    throw new ReadingUnitPipelineError("not-archive", `Not an Archive.org item: ${rawUrl}`);
  }
  const metadataUrl = `https://archive.org/metadata/${encodeURIComponent(identifier)}`;
  const metadataSource = await fetchRemoteSource(metadataUrl, options);
  let metadata;
  try {
    metadata = JSON.parse(metadataSource.body);
  } catch {
    throw new ReadingUnitPipelineError(
      "archive-invalid-metadata",
      `Archive.org returned invalid metadata for ${identifier}`,
    );
  }
  const maximumBytes = options.maximumBytes ?? 6_000_000;
  const files = (Array.isArray(metadata?.files) ? metadata.files : [])
    .map((file) => ({
      name: nonEmptyString(file?.name),
      size: Number(file?.size),
    }))
    .filter(({ name, size }) => (
      name
      && Number.isFinite(archiveTextFileScore(name, identifier))
      && (!Number.isFinite(size) || size <= maximumBytes)
    ))
    .sort((left, right) => (
      archiveTextFileScore(left.name, identifier) - archiveTextFileScore(right.name, identifier)
    ));
  const attempts = [];
  for (const file of files) {
    const encodedName = file.name.split("/").map(encodeURIComponent).join("/");
    const downloadUrl = `https://archive.org/download/${encodeURIComponent(identifier)}/${encodedName}`;
    try {
      const source = await fetchRemoteSource(downloadUrl, {
        ...options,
        allowOctetStreamText: true,
      });
      return {
        ...source,
        contentType: "text/plain",
      };
    } catch (error) {
      attempts.push({
        url: downloadUrl,
        reason: error?.code ?? "unexpected-error",
        message: error instanceof Error ? error.message : String(error),
      });
    }
  }
  throw new ReadingUnitPipelineError(
    "archive-text-not-found",
    `Archive.org item ${identifier} has no usable bounded OCR text`,
    { attempts },
  );
}

function ensureContainedPath(projectRoot, rawPath) {
  const path = resolve(projectRoot, rawPath);
  const relativePath = relative(projectRoot, path);
  if (relativePath === "" || relativePath.startsWith(`..${sep}`) || relativePath === "..") {
    throw new ReadingUnitPipelineError("unsafe-local-path", `Path escapes project root: ${rawPath}`);
  }
  return path;
}

async function readLocalSource(projectRoot, rawPath) {
  const path = ensureContainedPath(projectRoot, rawPath);
  const extension = extname(path).toLowerCase();
  if (forbiddenSourceExtensions.has(extension)) {
    throw new ReadingUnitPipelineError(
      "unsupported-local-format",
      `${relative(projectRoot, path)} is ${extension}; PDF/scans are never copied into public readings`,
    );
  }
  if (!localReadingExtensions.has(extension)) {
    throw new ReadingUnitPipelineError(
      "unsupported-local-format",
      `Unsupported local reading source: ${relative(projectRoot, path)}`,
    );
  }
  const metadata = await stat(path);
  if (!metadata.isFile()) {
    throw new ReadingUnitPipelineError("invalid-local-source", `${rawPath} is not a file`);
  }
  const body = await readFile(path, "utf8");
  return {
    url: undefined,
    contentType: extension === ".txt" ? "text/plain" : "text/html",
    body,
    sha256: sha256(body),
    cacheHit: true,
  };
}

function validateSourceOverride(patch, label) {
  if (!patch || typeof patch !== "object" || Array.isArray(patch)) {
    throw new ReadingUnitPipelineError("invalid-overrides", `${label} must be an object`);
  }
  for (const key of Object.keys(patch)) {
    if (!sourceOverrideFields.has(key)) {
      throw new ReadingUnitPipelineError(
        "invalid-overrides",
        `${label} contains unsupported field ${key}`,
      );
    }
    if (key === "maximumUnitCharacters" || key === "minimumUnitCharacters") {
      if (!label.startsWith("byUnitId.")) {
        throw new ReadingUnitPipelineError(
          "invalid-overrides",
          `${label}.${key} is only allowed on a specific unit`,
        );
      }
      const maximum = key === "minimumUnitCharacters" ? 120 : absoluteMaximumUnitCharacters;
      if (!Number.isInteger(patch[key]) || patch[key] <= 0 || patch[key] > maximum) {
        throw new ReadingUnitPipelineError(
          "invalid-overrides",
          `${label}.${key} must be an integer from 1 to ${maximum}`,
        );
      }
      continue;
    }
    if (!nonEmptyString(patch[key])) {
      throw new ReadingUnitPipelineError(
        "invalid-overrides",
        `${label}.${key} must be a non-empty string`,
      );
    }
  }
  if (patch.localPath && !localReadingExtensions.has(extname(patch.localPath).toLowerCase())) {
    throw new ReadingUnitPipelineError(
      "invalid-overrides",
      `${label}.localPath must end in .txt, .html, or .xml`,
    );
  }
  if (patch.url) {
    let url;
    try {
      url = new URL(patch.url);
    } catch {
      throw new ReadingUnitPipelineError("invalid-overrides", `${label}.url is invalid`);
    }
    if (url.protocol !== "https:" && url.protocol !== "http:") {
      throw new ReadingUnitPipelineError(
        "invalid-overrides",
        `${label}.url must use HTTP or HTTPS`,
      );
    }
  }
}

export async function loadSourceOverrides(path) {
  let registry;
  try {
    registry = JSON.parse(await readFile(path, "utf8"));
  } catch (error) {
    if (error?.code === "ENOENT") {
      return { schemaVersion: 1, bySourceUrl: {}, byUnitId: {} };
    }
    if (error instanceof SyntaxError) {
      throw new ReadingUnitPipelineError(
        "invalid-overrides",
        `${path} is not valid JSON: ${error.message}`,
      );
    }
    throw error;
  }
  if (registry?.schemaVersion !== 1) {
    throw new ReadingUnitPipelineError(
      "invalid-overrides",
      "Source overrides must declare schemaVersion 1",
    );
  }
  const bySourceUrl = asPlainObject(registry.bySourceUrl);
  const byUnitId = asPlainObject(registry.byUnitId);
  for (const [url, patch] of Object.entries(bySourceUrl)) {
    let parsed;
    try {
      parsed = new URL(url);
    } catch {
      throw new ReadingUnitPipelineError(
        "invalid-overrides",
        `bySourceUrl key is not a URL: ${url}`,
      );
    }
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
      throw new ReadingUnitPipelineError(
        "invalid-overrides",
        `bySourceUrl key must use HTTP or HTTPS: ${url}`,
      );
    }
    validateSourceOverride(patch, `bySourceUrl[${JSON.stringify(url)}]`);
  }
  for (const [unitId, patch] of Object.entries(byUnitId)) {
    if (!nonEmptyString(unitId)) {
      throw new ReadingUnitPipelineError("invalid-overrides", "byUnitId contains an empty id");
    }
    validateSourceOverride(patch, `byUnitId.${unitId}`);
  }
  return { schemaVersion: 1, bySourceUrl, byUnitId };
}

export function applySourceOverride(unit, registry) {
  const originalUrl = nonEmptyString(unit.source?.url);
  const sourcePatch = originalUrl ? registry.bySourceUrl?.[originalUrl] : undefined;
  const unitPatch = registry.byUnitId?.[unit.id];
  if (!sourcePatch && !unitPatch) return unit;
  const applied = [
    ...(sourcePatch ? ["source-url"] : []),
    ...(unitPatch ? ["unit-id"] : []),
  ];
  return {
    ...unit,
    registeredSourceUrl: originalUrl,
    source: {
      ...asPlainObject(unit.source),
      ...sourcePatch,
      ...unitPatch,
    },
    sourceOverrideApplied: applied,
  };
}

function sourceCandidatesForUnit(unit) {
  const source = asPlainObject(unit.source);
  const candidates = [];
  const localPath = nonEmptyString(source.localPath);
  if (localPath) candidates.push({ kind: "local", localPath });
  if (Array.isArray(source.segments) && source.segments.length > 0) {
    candidates.push({ kind: "segments", segments: source.segments });
    return candidates;
  }
  const urls = [
    source.url,
    ...(Array.isArray(source.additionalLinks)
      ? source.additionalLinks.map((link) => link?.url)
      : []),
  ].map(nonEmptyString).filter(Boolean);
  const seenUrls = new Set();
  for (const url of urls) {
    if (seenUrls.has(url)) continue;
    seenUrls.add(url);
    candidates.push({ kind: "remote", url });
  }
  return candidates;
}

async function resolveSourceCandidate(candidate, options) {
  if (candidate.kind === "local") {
    return readLocalSource(options.projectRoot, candidate.localPath);
  }
  if (candidate.kind === "segments") {
    return resolveSegmentedSource(candidate.segments, options);
  }
  const { url } = candidate;
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    throw new ReadingUnitPipelineError("invalid-url", `Invalid source URL: ${url}`);
  }
  if (forbiddenSourceExtensions.has(extname(parsed.pathname).toLowerCase())) {
    throw new ReadingUnitPipelineError(
      "unsupported-remote-format",
      `${url} points to a PDF/scan; it is not copied into public readings`,
    );
  }
  if (archiveIdentifierFor(url)) return fetchArchiveTextSource(url, options);
  if (gutenbergBookId(url)) return fetchGutenbergSource(url, options);
  if (mediaWikiApiUrlFor(url)) return fetchMediaWikiSource(url, options);
  if (bilaraRawUrlFor(url)) return fetchBilaraSource(url, options);
  return fetchRemoteSource(url, options);
}

function paragraphsForResolvedSource(resolvedSource, fallbackUrl) {
  if (resolvedSource.sourceFormat === "bilara-json") {
    return extractBilaraJsonParagraphs(resolvedSource.body);
  }
  if (resolvedSource.contentType === "text/plain") {
    return extractTextParagraphs(resolvedSource.body, {
      sourceUrl: resolvedSource.url ?? fallbackUrl,
    });
  }
  return extractHtmlParagraphs(resolvedSource.body, {
    sourceUrl: resolvedSource.url ?? fallbackUrl,
  });
}

async function resolveSegmentedSource(rawSegments, options) {
  if (!Array.isArray(rawSegments) || rawSegments.length < 2) {
    throw new ReadingUnitPipelineError(
      "invalid-source-segments",
      "A composite reading unit needs at least two ordered source segments",
    );
  }
  const paragraphs = [];
  const sourceSegments = [];
  for (const [index, rawSegment] of rawSegments.entries()) {
    const segment = asPlainObject(rawSegment);
    const url = nonEmptyString(segment.url);
    if (!url) {
      throw new ReadingUnitPipelineError(
        "invalid-source-segments",
        `Composite source segment ${index + 1} has no URL`,
      );
    }
    let resolved;
    try {
      resolved = await resolveSourceCandidate({ kind: "remote", url }, options);
    } catch (error) {
      throw new ReadingUnitPipelineError(
        "segment-source-failed",
        `Composite source segment ${index + 1} failed: ${url}`,
        {
          segmentIndex: index,
          url,
          reason: error?.code ?? "unexpected-error",
          message: error instanceof Error ? error.message : String(error),
        },
      );
    }
    const extracted = paragraphsForResolvedSource(resolved, url);
    let selection = {
      paragraphs: extracted,
      selectionMethod: "whole-segment",
      characterCount: extracted.reduce((sum, paragraph) => sum + paragraph.text.length, 0),
    };
    if (segment.startHeading || segment.startPattern || segment.endPattern) {
      selection = selectReadingUnitParagraphs(extracted, {
        id: `segment-${index + 1}`,
        work: {},
        locator: { structureKey: "whole-work" },
        source: segment,
      }, {
        ...options,
        minimumUnitCharacters: 1,
      });
    }
    if (selection.paragraphs.length === 0) {
      throw new ReadingUnitPipelineError(
        "segment-source-empty",
        `Composite source segment ${index + 1} produced no paragraphs: ${url}`,
      );
    }
    const startIndex = paragraphs.length;
    paragraphs.push(...selection.paragraphs);
    sourceSegments.push({
      url: resolved.url ?? url,
      ...(resolved.retrievalUrl ? { retrievalUrl: resolved.retrievalUrl } : {}),
      ...(resolved.title ? { title: resolved.title } : {}),
      contentType: resolved.contentType,
      sha256: resolved.sha256,
      selectionMethod: selection.selectionMethod,
      paragraphStartIndex: startIndex,
      paragraphEndIndex: paragraphs.length,
    });
  }
  return {
    url: sourceSegments[0].url,
    contentType: "multipart/mixed",
    sha256: sha256(stableJson(sourceSegments.map((segment) => ({
      url: segment.url,
      retrievalUrl: segment.retrievalUrl,
      sha256: segment.sha256,
      selectionMethod: segment.selectionMethod,
    })))),
    cacheHit: sourceSegments.every((segment) => segment.cacheHit !== false),
    sourceFormat: "segments",
    paragraphs,
    sourceSegments,
  };
}

function validateInventory(inventory) {
  if (inventory?.schemaVersion !== 1 || !Array.isArray(inventory.units)) {
    throw new ReadingUnitPipelineError(
      "invalid-inventory",
      "Reading-unit inventory must have schemaVersion 1 and a units array",
    );
  }
  const ids = new Set();
  for (const unit of inventory.units) {
    if (!nonEmptyString(unit?.id)) {
      throw new ReadingUnitPipelineError("invalid-inventory", "Every inventory unit needs an id");
    }
    if (ids.has(unit.id)) {
      throw new ReadingUnitPipelineError("invalid-inventory", `Duplicate unit id: ${unit.id}`);
    }
    ids.add(unit.id);
    if (!Array.isArray(unit.thoughtIds)) {
      throw new ReadingUnitPipelineError(
        "invalid-inventory",
        `${unit.id} needs a thoughtIds array`,
      );
    }
  }
}

async function loadCatalogQuotes() {
  const [{ contentLibraries }, { loadCompleteEconomicsCatalog }] = await Promise.all([
    import("../content/libraries.ts"),
    import("../content/economics.ts"),
  ]);
  const completeEconomics = await loadCompleteEconomicsCatalog();
  const thoughts = Object.entries(contentLibraries).flatMap(([libraryId, library]) => (
    libraryId === "economics" ? completeEconomics.thoughts : library.thoughts
  ));
  return new Map(thoughts.map((thought) => [thought.id, thought]));
}

function quoteForThought(thought, inventory, thoughtId) {
  if (!thought) return undefined;
  const originalField = inventory.thoughtMap?.[thoughtId]?.originalField;
  return originalField === "text" ? thought.text : originalField === "english" ? thought.english : (
    thought.presentationNature === "source-excerpt" ? thought.english : undefined
  );
}

function outputPathForUnit(unit, options) {
  const configured = nonEmptyString(unit.expectedUnitFile?.publicPath);
  const path = configured
    ? ensureContainedPath(options.projectRoot, configured)
    : resolve(options.outputDirectory, `${unit.id}.json`);
  const relativeOutput = relative(options.outputDirectory, path);
  if (relativeOutput === ".." || relativeOutput.startsWith(`..${sep}`)) {
    throw new ReadingUnitPipelineError(
      "unsafe-output-path",
      `${unit.id} output must stay inside ${relative(options.projectRoot, options.outputDirectory)}`,
    );
  }
  return path;
}

function publicSourceRecord(resolvedSource) {
  return {
    ...(nonEmptyString(resolvedSource.url) ? { url: resolvedSource.url } : {}),
    ...(nonEmptyString(resolvedSource.retrievalUrl)
      ? { retrievalUrl: resolvedSource.retrievalUrl }
      : {}),
    contentType: resolvedSource.contentType,
    sha256: resolvedSource.sha256,
  };
}

function processingOptionsForUnit(unit, options) {
  const configuredMaximum = unit.sourceOverrideApplied?.includes("unit-id")
    ? unit.source?.maximumUnitCharacters
    : undefined;
  const configuredMinimum = unit.sourceOverrideApplied?.includes("unit-id")
    ? unit.source?.minimumUnitCharacters
    : undefined;
  const structureKinds = String(unit.locator?.structureKey ?? "")
    .split("-")
    .filter((part) => [
      "appendix",
      "article",
      "book",
      "chapter",
      "conclusion",
      "essay",
      "forethought",
      "introduction",
      "lecture",
      "meditation",
      "part",
      "preface",
      "section",
      "volume",
    ].includes(part));
  const naturalUnitKinds = new Set([
    "appendix",
    "article",
    "book",
    "chapter",
    "conclusion",
    "essay",
    "forethought",
    "introduction",
    "lecture",
    "meditation",
    "part",
    "preface",
    "volume",
  ]);
  const naturallyBounded = unit.locator?.structureKey === "whole-work"
    || naturalUnitKinds.has(structureKinds.at(-1));
  return {
    ...options,
    minimumUnitCharacters: configuredMinimum ?? options.minimumUnitCharacters,
    maximumUnitCharacters: Math.min(
      configuredMaximum
        ?? options.maximumUnitCharacters
        ?? (naturallyBounded ? absoluteMaximumUnitCharacters : 150_000),
      absoluteMaximumUnitCharacters,
    ),
    maximumPublicUnitBytes: Math.min(
      options.maximumPublicUnitBytes ?? maximumPublicUnitBytes,
      maximumPublicUnitBytes,
    ),
  };
}

async function processUnit(unit, inventory, thoughtById, options) {
  if (unit.availability === "source-route") {
    return {
      id: unit.id,
      status: "skipped",
      reason: "source-route-only",
      libraryIds: unit.libraryIds ?? [],
      registeredSourceUrl: unit.registeredSourceUrl ?? unit.source?.url,
      thoughtCount: unit.thoughtIds.length,
      ...(unit.sourceOverrideApplied ? { sourceOverrideApplied: unit.sourceOverrideApplied } : {}),
    };
  }

  const cardQuotes = Object.fromEntries(unit.thoughtIds.map((thoughtId) => [
    thoughtId,
    quoteForThought(thoughtById.get(thoughtId), inventory, thoughtId),
  ]));
  const attempts = [];
  let partialUnmatchedThoughtIds;
  let prepared;
  const unitOptions = processingOptionsForUnit(unit, options);
  for (const candidate of sourceCandidatesForUnit(unit)) {
    const attemptSource = candidate.kind === "local" ? candidate.localPath : candidate.url;
    try {
      const resolvedSource = await resolveSourceCandidate(candidate, options);
      const allParagraphs = resolvedSource.sourceFormat === "bilara-json"
        ? extractBilaraJsonParagraphs(resolvedSource.body)
        : resolvedSource.contentType === "text/plain"
          ? extractTextParagraphs(resolvedSource.body, {
            sourceUrl: resolvedSource.url ?? unit.source?.url,
          })
          : extractHtmlParagraphs(resolvedSource.body, {
          sourceUrl: resolvedSource.url ?? unit.source?.url,
        });
      let selection;
      try {
        selection = selectReadingUnitParagraphs(allParagraphs, unit, {
          ...unitOptions,
          cardQuotes,
          deferUnboundedBoundary: true,
        });
      } catch (error) {
        if (![
          "boundary-required",
          "section-not-found",
          "source-too-short",
          "unit-too-large",
        ].includes(error?.code)) throw error;
        selection = selectQuoteGuidedBoundary(allParagraphs, unit, cardQuotes, unitOptions);
        if (!selection) throw error;
      }
      let anchored = matchCardAnchors(selection.paragraphs, cardQuotes);
      let matchedThoughtIds = Object.entries(anchored.anchors)
        .filter(([, anchor]) => anchor.paragraphId)
        .map(([thoughtId]) => thoughtId);
      let unmatchedThoughtIds = unit.thoughtIds.filter((id) => !matchedThoughtIds.includes(id));
      const boundaryOptimizationCharacters = unitOptions.boundaryOptimizationCharacters ?? 150_000;
      const maximumUnboundedSectionCharacters = unitOptions.maximumUnboundedSectionCharacters ?? 80_000;
      const unboundedNonWhole = selection.selectionMethod === "whole-document"
        && unit.locator?.structureKey !== "whole-work";
      if (
        selection.selectionMethod === "whole-document"
        || unmatchedThoughtIds.length > 0
        || (
          selection.selectionMethod !== "configured-pattern"
          && selection.characterCount > boundaryOptimizationCharacters
        )
        || (unboundedNonWhole && selection.characterCount > maximumUnboundedSectionCharacters)
      ) {
        const quoteGuided = selectQuoteGuidedBoundary(
          allParagraphs,
          unit,
          cardQuotes,
          unitOptions,
        );
        if (quoteGuided) {
          selection = quoteGuided;
          anchored = matchCardAnchors(selection.paragraphs, cardQuotes);
          matchedThoughtIds = Object.entries(anchored.anchors)
            .filter(([, anchor]) => anchor.paragraphId)
            .map(([thoughtId]) => thoughtId);
          unmatchedThoughtIds = unit.thoughtIds.filter((id) => !matchedThoughtIds.includes(id));
        }
      }
      selection = enforceFinalBoundary(selection, unit, unitOptions);
      if (unmatchedThoughtIds.length > 0) {
        if (matchedThoughtIds.length > 0) partialUnmatchedThoughtIds = unmatchedThoughtIds;
        throw new ReadingUnitPipelineError(
          matchedThoughtIds.length > 0 ? "partial-anchor-match" : "quote-not-found",
          matchedThoughtIds.length > 0
            ? `${matchedThoughtIds.length}/${unit.thoughtIds.length} card anchors matched ${attemptSource}`
            : `No registered card quote matched ${attemptSource}`,
          { matchedThoughtIds, unmatchedThoughtIds },
        );
      }
      if (matchedThoughtIds.length === 0) {
        throw new ReadingUnitPipelineError(
          "quote-not-found",
          `No registered card quote matched ${attemptSource}`,
          { unmatchedThoughtIds },
        );
      }
      attempts.push({
        source: attemptSource,
        status: "selected",
        actualUrl: resolvedSource.url,
      });
      prepared = {
        resolvedSource,
        selection,
        anchored,
        matchedThoughtIds,
        unmatchedThoughtIds,
      };
      break;
    } catch (error) {
      attempts.push({
        source: attemptSource,
        status: error?.code === "unsupported-remote-format" ? "skipped" : "failed",
        reason: error?.code ?? "unexpected-error",
        message: error instanceof Error ? error.message : String(error),
        ...(error?.details ? { details: error.details } : {}),
      });
    }
  }
  if (!prepared) {
    if (!options.dryRun) {
      try {
        await unlink(outputPathForUnit(unit, options));
      } catch (error) {
        if (error?.code !== "ENOENT") throw error;
      }
    }
    throw new ReadingUnitPipelineError(
      partialUnmatchedThoughtIds ? "partial-anchor-match" : "all-sources-failed",
      `No safe readable source produced a matched passage for ${unit.id}`,
      {
        attempts,
        unmatchedThoughtIds: partialUnmatchedThoughtIds ?? unit.thoughtIds,
      },
    );
  }
  const {
    resolvedSource,
    selection,
    anchored,
    matchedThoughtIds,
    unmatchedThoughtIds,
  } = prepared;

  const work = asPlainObject(unit.work);
  const locator = asPlainObject(unit.locator);
  const edition = asPlainObject(unit.edition);
  const contentHash = sha256(anchored.paragraphs.map(({ text }) => text).join("\n\n"));
  const inputHash = sha256(stableJson({
    pipelineVersion: readingUnitPipelineVersion,
    unit,
    sourceHash: resolvedSource.sha256,
    cardQuotes,
  }));
  const document = {
    schemaVersion: 1,
    id: unit.id,
    title: locator.zh || work.zh || unit.id,
    ...(locator.en || work.en ? { englishTitle: locator.en || work.en } : {}),
    ...(work.zh ? { work: work.zh } : {}),
    ...(work.en ? { englishWork: work.en } : {}),
    ...(locator.zh ? { locator: locator.zh } : {}),
    ...(locator.en ? { englishLocator: locator.en } : {}),
    ...(edition.zh ? { version: edition.zh } : {}),
    ...(edition.en ? { englishVersion: edition.en } : {}),
    ...(unit.registeredSourceUrl || unit.source?.url
      ? { sourceUrl: unit.registeredSourceUrl ?? unit.source.url }
      : {}),
    ...(resolvedSource.url
      && resolvedSource.url !== (unit.registeredSourceUrl ?? unit.source?.url)
      ? { preparedSourceUrl: resolvedSource.url }
      : {}),
    source: publicSourceRecord(resolvedSource),
    selectionMethod: selection.selectionMethod,
    contentHash,
    inputHash,
    paragraphs: anchored.paragraphs,
    anchors: anchored.anchors,
  };
  const outputPath = outputPathForUnit(unit, options);
  const prettyDocument = `${JSON.stringify(document, null, 2)}\n`;
  const compactDocument = `${JSON.stringify(document)}\n`;
  const prettyByteCount = Buffer.byteLength(prettyDocument, "utf8");
  const compactByteCount = Buffer.byteLength(compactDocument, "utf8");
  const compactSerialization = prettyByteCount > unitOptions.maximumPublicUnitBytes;
  const serializedDocument = compactSerialization ? compactDocument : prettyDocument;
  const publicByteCount = compactSerialization ? compactByteCount : prettyByteCount;
  if (publicByteCount > unitOptions.maximumPublicUnitBytes) {
    if (!options.dryRun) {
      try {
        await unlink(outputPath);
      } catch (error) {
        if (error?.code !== "ENOENT") throw error;
      }
    }
    throw new ReadingUnitPipelineError(
      "unit-file-too-large",
      `Serialized unit ${unit.id} is ${publicByteCount} bytes; public units must stay within ${unitOptions.maximumPublicUnitBytes} bytes`,
      { publicByteCount, maximumPublicUnitBytes: unitOptions.maximumPublicUnitBytes },
    );
  }
  let resumed = false;
  try {
    const existing = JSON.parse(await readFile(outputPath, "utf8"));
    resumed = existing.inputHash === inputHash
      && existing.contentHash === contentHash
      && stableJson(existing.anchors) === stableJson(document.anchors);
  } catch (error) {
    if (error?.code !== "ENOENT" && !(error instanceof SyntaxError)) throw error;
  }
  if (!options.dryRun && !resumed) {
    await atomicWrite(outputPath, serializedDocument);
  }
  return {
    id: unit.id,
    status: resumed ? "resumed" : options.dryRun ? "would-write" : "written",
    outputPath: relative(options.projectRoot, outputPath).replaceAll("\\", "/"),
    sourceCacheHit: resolvedSource.cacheHit,
    selectionMethod: selection.selectionMethod,
    paragraphCount: anchored.paragraphs.length,
    characterCount: selection.characterCount,
    publicByteCount,
    serialization: compactSerialization ? "compact" : "pretty",
    libraryIds: unit.libraryIds ?? [],
    thoughtCount: unit.thoughtIds.length,
    matchedThoughtCount: matchedThoughtIds.length,
    unmatchedThoughtIds,
    attempts,
    locatorStructureKey: unit.locator?.structureKey,
    registeredSourceUrl: unit.registeredSourceUrl ?? unit.source?.url,
    actualSourceUrl: resolvedSource.url,
    ...(resolvedSource.retrievalUrl ? { retrievalSourceUrl: resolvedSource.retrievalUrl } : {}),
    contentHash,
    ...(unit.sourceOverrideApplied ? { sourceOverrideApplied: unit.sourceOverrideApplied } : {}),
  };
}

async function concurrentMap(values, concurrency, mapper) {
  const results = new Array(values.length);
  let nextIndex = 0;
  async function worker() {
    while (true) {
      const index = nextIndex;
      nextIndex += 1;
      if (index >= values.length) return;
      results[index] = await mapper(values[index], index);
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, values.length) }, worker));
  return results;
}

export async function runReadingUnitPipeline(rawOptions = {}) {
  const projectRoot = resolve(rawOptions.projectRoot ?? defaultProjectRoot);
  const inventoryPath = resolve(
    projectRoot,
    rawOptions.inventoryPath ?? "research/reading-units/inventory.json",
  );
  const reportPath = resolve(
    projectRoot,
    rawOptions.reportPath ?? "research/reading-units/fetch-coverage.json",
  );
  const overridesPath = resolve(
    projectRoot,
    rawOptions.overridesPath ?? "research/reading-units/source-overrides.json",
  );
  const options = {
    projectRoot,
    inventoryPath,
    reportPath,
    overridesPath,
    outputDirectory: resolve(
      projectRoot,
      rawOptions.outputDirectory ?? "public/readings/units",
    ),
    cacheDirectory: resolve(
      projectRoot,
      rawOptions.cacheDirectory ?? "research/reading-units/fetch-cache",
    ),
    dryRun: Boolean(rawOptions.dryRun),
    allowNetwork: Boolean(rawOptions.allowNetwork),
    concurrency: Math.max(1, Math.min(8, rawOptions.concurrency ?? 3)),
    limit: rawOptions.limit ?? Number.POSITIVE_INFINITY,
    unitIds: Array.isArray(rawOptions.unitIds) ? [...new Set(rawOptions.unitIds)] : [],
    boundaryOptimizationCharacters: rawOptions.boundaryOptimizationCharacters,
    maximumBytes: rawOptions.maximumBytes,
    maximumPublicUnitBytes: rawOptions.maximumPublicUnitBytes,
    maximumUnitCharacters: rawOptions.maximumUnitCharacters,
    maximumUnboundedSectionCharacters: rawOptions.maximumUnboundedSectionCharacters,
    minimumUnitCharacters: rawOptions.minimumUnitCharacters,
    maximumRedirects: rawOptions.maximumRedirects,
    timeoutMilliseconds: rawOptions.timeoutMilliseconds,
    fetchImplementation: rawOptions.fetchImplementation,
    resolveHost: rawOptions.resolveHost,
    allowSyntheticNetworkProxy: rawOptions.allowSyntheticNetworkProxy
      ?? process.env.CODEX_CI === "1",
  };

  let inventory;
  try {
    inventory = JSON.parse(await readFile(inventoryPath, "utf8"));
  } catch (error) {
    if (error?.code !== "ENOENT") throw error;
    const report = {
      schemaVersion: 1,
      generatedAt: new Date().toISOString(),
      inventoryPath: relative(projectRoot, inventoryPath).replaceAll("\\", "/"),
      inventoryMissing: true,
      dryRun: options.dryRun,
      allowNetwork: options.allowNetwork,
      summary: { considered: 0, written: 0, failed: 0 },
      units: [],
      failures: [],
    };
    if (rawOptions.writeMissingInventoryReport) {
      await atomicWrite(reportPath, `${JSON.stringify(report, null, 2)}\n`);
    }
    return report;
  }
  validateInventory(inventory);
  const [thoughtById, sourceOverrides] = await Promise.all([
    rawOptions.thoughtById ?? loadCatalogQuotes(),
    rawOptions.sourceOverrides ?? loadSourceOverrides(overridesPath),
  ]);
  const requestedUnitIds = new Set(options.unitIds);
  const missingUnitIds = options.unitIds.filter((unitId) => (
    !inventory.units.some((unit) => unit.id === unitId)
  ));
  if (missingUnitIds.length > 0) {
    throw new ReadingUnitPipelineError(
      "unit-not-found",
      `Requested reading units are absent from the inventory: ${missingUnitIds.join(", ")}`,
      { unitIds: missingUnitIds },
    );
  }
  const selectedUnits = inventory.units
    .filter((unit) => requestedUnitIds.size === 0 || requestedUnitIds.has(unit.id))
    .slice(0, options.limit)
    .map((unit) => applySourceOverride(unit, sourceOverrides));
  const units = await concurrentMap(selectedUnits, options.concurrency, async (unit) => {
    try {
      return await processUnit(unit, inventory, thoughtById, options);
    } catch (error) {
      return {
        id: unit.id,
        status: "failed",
        reason: error?.code ?? "unexpected-error",
        message: error instanceof Error ? error.message : String(error),
        ...(error?.details ? { details: error.details } : {}),
        libraryIds: unit.libraryIds ?? [],
        locatorStructureKey: unit.locator?.structureKey,
        registeredSourceUrl: unit.registeredSourceUrl ?? unit.source?.url,
        thoughtCount: unit.thoughtIds?.length ?? 0,
      };
    }
  });
  const duplicateCandidates = units.filter((unit) => (
    ["written", "would-write", "resumed"].includes(unit.status)
    && unit.selectionMethod === "whole-document"
    && unit.locatorStructureKey !== "whole-work"
    && unit.registeredSourceUrl
    && unit.contentHash
  ));
  const duplicateGroups = new Map();
  for (const unit of duplicateCandidates) {
    const key = `${unit.registeredSourceUrl}\u0000${unit.contentHash}`;
    const group = duplicateGroups.get(key) ?? [];
    group.push(unit);
    duplicateGroups.set(key, group);
  }
  const duplicateUnboundedClusters = [...duplicateGroups.values()]
    .filter((group) => group.length > 1)
    .map((group) => ({
      registeredSourceUrl: group[0].registeredSourceUrl,
      contentHash: group[0].contentHash,
      unitIds: group.map(({ id }) => id).sort(),
    }))
    .sort((left, right) => left.registeredSourceUrl.localeCompare(right.registeredSourceUrl));
  const selectedUnitById = new Map(selectedUnits.map((unit) => [unit.id, unit]));
  for (const cluster of duplicateUnboundedClusters) {
    for (const unitId of cluster.unitIds) {
      const result = units.find((unit) => unit.id === unitId);
      if (!result) continue;
      if (!options.dryRun) {
        try {
          await unlink(outputPathForUnit(selectedUnitById.get(unitId), options));
        } catch (error) {
          if (error?.code !== "ENOENT") throw error;
        }
      }
      result.status = "failed";
      result.reason = "duplicate-unbounded-content";
      result.message = `${cluster.unitIds.length} non-whole units from one source produced identical whole-document content`;
      result.details = cluster;
      result.rejectedMatchedThoughtCount = result.matchedThoughtCount;
      result.matchedThoughtCount = 0;
    }
  }
  const failures = units
    .filter(({ status }) => status === "failed")
    .map(({ id, reason, message, details, libraryIds, registeredSourceUrl }) => ({
      id,
      reason,
      message,
      libraryIds,
      registeredSourceUrl,
      ...(details ? { details } : {}),
    }));
  const countStatus = (status) => units.filter((unit) => unit.status === status).length;
  const unboundedNonWholeUnits = units
    .filter((unit) => (
      ["written", "would-write", "resumed"].includes(unit.status)
      && unit.selectionMethod === "whole-document"
      && unit.locatorStructureKey !== "whole-work"
    ))
    .map((unit) => ({
      id: unit.id,
      registeredSourceUrl: unit.registeredSourceUrl,
      characterCount: unit.characterCount,
      contentHash: unit.contentHash,
    }))
    .sort((left, right) => right.characterCount - left.characterCount);
  const report = {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    inventoryPath: relative(projectRoot, inventoryPath).replaceAll("\\", "/"),
    overridesPath: relative(projectRoot, overridesPath).replaceAll("\\", "/"),
    inventoryUnitCount: inventory.units.length,
    limited: selectedUnits.length < inventory.units.length,
    ...(options.unitIds.length > 0 ? { requestedUnitIds: options.unitIds } : {}),
    dryRun: options.dryRun,
    allowNetwork: options.allowNetwork,
    concurrency: options.concurrency,
    summary: {
      considered: units.length,
      written: countStatus("written"),
      wouldWrite: countStatus("would-write"),
      resumed: countStatus("resumed"),
      skipped: countStatus("skipped"),
      failed: failures.length,
      thoughts: units.reduce((sum, unit) => sum + (unit.thoughtCount ?? 0), 0),
      anchorsMatched: units.reduce((sum, unit) => sum + (unit.matchedThoughtCount ?? 0), 0),
      anchorsUnmatched: units.reduce((sum, unit) => sum + (unit.unmatchedThoughtIds?.length ?? 0), 0),
      duplicateUnboundedClusters: duplicateUnboundedClusters.length,
      duplicateUnboundedUnits: duplicateUnboundedClusters.reduce(
        (sum, cluster) => sum + cluster.unitIds.length,
        0,
      ),
      unboundedNonWholeUnits: unboundedNonWholeUnits.length,
    },
    duplicateUnboundedClusters,
    unboundedNonWholeUnits,
    units,
    failures,
  };
  await atomicWrite(reportPath, `${JSON.stringify(report, null, 2)}\n`);
  return report;
}

export function parseArguments(argv) {
  const options = {};
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    const value = argv[index + 1];
    if (argument === "--inventory") {
      options.inventoryPath = value;
      index += 1;
    } else if (argument === "--output-dir") {
      options.outputDirectory = value;
      index += 1;
    } else if (argument === "--cache-dir") {
      options.cacheDirectory = value;
      index += 1;
    } else if (argument === "--report") {
      options.reportPath = value;
      index += 1;
    } else if (argument === "--overrides") {
      options.overridesPath = value;
      index += 1;
    } else if (argument === "--limit") {
      const limit = Number(value);
      if (!Number.isSafeInteger(limit) || limit < 1) {
        throw new Error(`--limit needs a positive integer, received ${value ?? "(missing)"}`);
      }
      options.limit = limit;
      index += 1;
    } else if (argument === "--unit-id") {
      if (!nonEmptyString(value)) {
        throw new Error("--unit-id needs a non-empty inventory unit id");
      }
      options.unitIds = [...(options.unitIds ?? []), value];
      index += 1;
    } else if (argument === "--concurrency") {
      const concurrency = Number(value);
      if (!Number.isSafeInteger(concurrency) || concurrency < 1 || concurrency > 8) {
        throw new Error(`--concurrency must be between 1 and 8, received ${value ?? "(missing)"}`);
      }
      options.concurrency = concurrency;
      index += 1;
    } else if (argument === "--dry-run") {
      options.dryRun = true;
    } else if (argument === "--allow-network") {
      options.allowNetwork = true;
    } else {
      throw new Error(`Unknown option: ${argument}`);
    }
  }
  return options;
}

async function main() {
  const options = parseArguments(process.argv.slice(2));
  const report = await runReadingUnitPipeline(options);
  if (report.inventoryMissing) {
    console.log(`Reading-unit inventory not found at ${report.inventoryPath}; no fetch attempted.`);
    return;
  }
  const { summary } = report;
  console.log(
    `Reading units: ${summary.written} written, ${summary.wouldWrite} dry-run ready, `
      + `${summary.resumed} resumed, ${summary.skipped} skipped, ${summary.failed} failed.`,
  );
  console.log(`Coverage report: ${relative(defaultProjectRoot, resolve(defaultProjectRoot, options.reportPath ?? "research/reading-units/fetch-coverage.json"))}`);
  if (summary.failed > 0) process.exitCode = 1;
}

if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) {
  await main();
}
