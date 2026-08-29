#!/usr/bin/env node

import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { chineseThoughts } from "../content/chinese.ts";
import {
  extractHtmlParagraphs,
  matchCardAnchors,
  mediaWikiApiUrlFor,
} from "./fetch-reading-units.mjs";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const legacyCacheDir = join(projectRoot, "research/reading-units/fetch-cache");
const outputDir = join(projectRoot, "research/source-cache/chinese-web-recovery");
const proposalPath = join(
  projectRoot,
  "research/reading-units/chinese-web-recovery-proposal.json",
);
const inventoryPath = join(projectRoot, "research/reading-units/inventory.json");
const writeOutputs = process.argv.includes("--write");

const legacyHashes = {
  wangBi: "f02915a77273c92231e7443a3ef3d9493ba013d9767eff37090ff618b292d7a1",
  zhangZai: "3c3b67c2a3bddd3c619557e846daec4a499d8df18e786bc733bcf0291da726ae",
  ctextDaodejing: "346f14ebcf500294ed1266a1c781ce893a84e541fc5b01893800f2088f829ec1",
  goldenLion: "1fe2d64e13f4b9ccdc4cb0f50fc9f720606d9710069aaeaee03e0cb413f21c3f",
  chuanxiluUpper: "362272a54e4a980ea4d9e379f91a49030d6fc2493fa5f24c6c9b32e2822dd6d6",
  menciusGongsun: "f2b66d9e823b25a5ff452d3e51e094956e64e3cfd3cbbc76fa810a0175edb2e9",
  menciusJinxin: "1b7780101fc35474319f9a1917c4d77bd084cae97bb9992e95d519feaf9ca55e",
  moziJianguVolume9: "09ed3817585c01995338ec10449ad15c6c07ef74a46983ebc0eaab7bdb8f0674",
  tongshu: "28ea4cfa076091b0f7984104a65788970f2a2ec246e300d008355fb2f5fdbd17",
  chengVolume2A: "1f954710a94c764089e22e21df913ba952b59efc1b735f49ef9105b523b04aa2",
  wangFuzhi: "481e2592f669b8dcf2e8eefde33527d7bde7ff69666f991765edb9aec41ef83d",
  zhaolun: "ff116fbea8a84c850aaccc687771afae39ccd459f995c0d98e5312ca7b8543df",
};

const unitSpecs = [
  {
    id: "ru-commentary-on-the-laozi-chapter-1-37b4420e",
    slug: "wang-bi-laozi-chapter-1",
    retrievalUrl: "https://zh.wikisource.org/wiki/道德經_(王弼本)",
    boundary: {
      kind: "heading-range",
      start: "一章",
      endExclusive: "二章",
      description: "Wang Bi chapter heading 一章 through the paragraph before 二章",
    },
    select: () => betweenExact(
      legacyParagraphs(legacyHashes.wangBi, "https://zh.wikisource.org/wiki/道德經_(王弼本)"),
      "一章",
      "二章",
    ),
  },
  {
    id: "ru-correcting-the-unenlightened-great-harmony-named-chapter-great-harmony-b67fbf4f",
    slug: "zhang-zai-zhengmeng-great-harmony",
    retrievalUrl: "https://zh.wikisource.org/wiki/正蒙/01",
    boundary: {
      kind: "whole-subpage",
      start: "first textual paragraph",
      endExclusive: "Wikisource navigation beginning 全書始",
      description: "all 22 textual paragraphs of 正蒙·太和篇第一",
    },
    select: () => beforeMatch(
      legacyParagraphs(legacyHashes.zhangZai, "https://zh.wikisource.org/wiki/正蒙/01"),
      /^全書始/u,
    ),
  },
  {
    id: "ru-daodejing-chapter-22-bb92adb5",
    slug: "ctext-daodejing-chapter-22",
    retrievalUrl: "https://ctext.org/dao-de-jing",
    boundary: {
      kind: "numbered-range",
      start: "[22]",
      endExclusive: "[23]",
      description: "CText chapter marker [22] through the paragraph before [23]",
    },
    select: () => betweenExact(
      legacyParagraphs(legacyHashes.ctextDaodejing, "https://ctext.org/dao-de-jing"),
      "[22]",
      "[23]",
    ),
  },
  {
    id: "ru-essay-on-the-golden-lion-i-clarifying-dependent--named-chapter-i-clarifying-dependent-arising-36c69243",
    slug: "fazang-golden-lion-clarifying-dependent-arising",
    retrievalUrl: "https://zh.wikisource.org/wiki/華嚴金師子章",
    boundary: {
      kind: "preformatted-heading-range",
      start: "明缘起第一",
      endExclusive: "辨色空第二",
      description: "the complete first lemma-and-commentary section",
    },
    select: () => goldenLionSection(),
  },
  {
    id: "ru-essay-on-the-golden-lion-the-realm-of-indras-net-named-chapter-the-realm-of-indras-net-3d3ef644",
    slug: "cbeta-t1881-golden-lion-indras-net",
    retrievalUrl: "https://raw.githubusercontent.com/cbeta-org/xml-p5/master/T/T45/T45n1881.xml",
    boundary: {
      kind: "tei-paragraph-range",
      start: "第四因陀羅網境界門",
      endExclusive: "第五諸藏純雜具德門",
      description: "CBETA T1881 paragraphs T45p0669c0601–T45p0669c1201",
    },
    select: async () => cbetaIndrasNetSection(),
  },
  {
    id: "ru-instructions-for-practical-living-part-i-named-chapter-part-i-5823de0e",
    slug: "wang-yangming-chuanxilu-volume-1",
    retrievalUrl: "https://zh.wikisource.org/wiki/傳習錄/卷上",
    boundary: {
      kind: "whole-subpage-without-editorial-notes",
      start: "徐愛引言",
      endExclusive: "註釋",
      description: "the complete transmitted upper volume; Wikisource notes are excluded",
    },
    select: () => beforeExact(
      legacyParagraphs(legacyHashes.chuanxiluUpper, "https://zh.wikisource.org/wiki/傳習錄/卷上"),
      "註釋",
    ),
  },
  {
    id: "ru-mencius-gongsun-chou-i-named-chapter-gongsun-chou-i-274326ad",
    slug: "mencius-gongsun-chou-i",
    retrievalUrl: "https://zh.wikisource.org/wiki/孟子/公孫丑上",
    boundary: {
      kind: "whole-subpage",
      start: "section 1",
      endExclusive: "end of section 9",
      description: "all nine numbered sections of 公孫丑上",
    },
    select: () => legacyParagraphs(
      legacyHashes.menciusGongsun,
      "https://zh.wikisource.org/wiki/孟子/公孫丑上",
    ),
  },
  {
    id: "ru-mencius-jinxin-ii-named-chapter-jinxin-ii-85e66e44",
    slug: "mencius-jin-xin-ii",
    retrievalUrl: "https://zh.wikisource.org/wiki/孟子/盡心下",
    boundary: {
      kind: "whole-subpage",
      start: "section 1",
      endExclusive: "end of section 38",
      description: "all thirty-eight numbered sections of 盡心下",
    },
    select: () => legacyParagraphs(
      legacyHashes.menciusJinxin,
      "https://zh.wikisource.org/wiki/孟子/盡心下",
    ),
  },
  {
    id: "ru-mozi-against-fatalism-i-named-chapter-against-fatalism-i-de9e8615",
    slug: "mozi-feiming-shang",
    retrievalUrl: "https://zh.wikisource.org/wiki/墨子/非命上",
    boundary: {
      kind: "whole-subpage",
      start: "first paragraph of 非命上",
      endExclusive: "end of 非命上",
      description: "direct base-text subpage, replacing the interleaved 墨子閒詁 volume",
    },
    select: async () => moziDirectChapter(),
  },
  {
    id: "ru-penetrating-the-book-of-changes-chapter-14-atten-named-chapter-chapter-14-attending-to-reality-5c9469d4",
    slug: "zhou-dunyi-tongshu-chapter-14",
    retrievalUrl: "https://zh.wikisource.org/wiki/通書",
    boundary: {
      kind: "heading-range",
      start: "務實第十四",
      endExclusive: "愛敬第十五",
      description: "chapter heading and its complete paragraph",
    },
    select: () => betweenExact(
      legacyParagraphs(legacyHashes.tongshu, "https://zh.wikisource.org/wiki/通書"),
      "務實第十四",
      "愛敬第十五",
    ),
  },
  {
    id: "ru-surviving-works-of-the-cheng-brothers-volume-2a-named-chapter-volume-2a-f384af19",
    slug: "cheng-brothers-yishu-volume-2a",
    retrievalUrl: "https://zh.wikisource.org/wiki/二程遺書_(四庫全書本)/卷02上",
    boundary: {
      kind: "whole-subpage",
      start: "欽定四庫全書",
      endExclusive: "end title 二程遺書卷二上",
      description: "the complete Siku volume 2A transcription",
    },
    select: () => legacyParagraphs(
      legacyHashes.chengVolume2A,
      "https://zh.wikisource.org/wiki/二程遺書_(四庫全書本)/卷02上",
    ),
  },
  {
    id: "ru-wang-fuzhis-record-of-questions-and-reflections--named-chapter-inner-chapters-eedb777d",
    slug: "wang-fuzhi-siwenlu-inner-chapters",
    retrievalUrl: "https://zh.wikisource.org/wiki/船山遺書/船山思問錄",
    boundary: {
      kind: "heading-range",
      start: "船山思問錄內篇",
      endExclusive: "船山思問錄外篇",
      description: "the complete inner chapters, excluding the outer chapters",
    },
    select: () => betweenExact(
      legacyParagraphs(legacyHashes.wangFuzhi, "https://zh.wikisource.org/wiki/船山遺書/船山思問錄"),
      "船山思問錄內篇",
      "船山思問錄外篇",
    ),
  },
  {
    id: "ru-zhaolun-the-emptiness-of-the-unreal-named-chapter-the-emptiness-of-the-unreal-243d23a9",
    slug: "sengzhao-buzhenkonglun",
    retrievalUrl: "https://zh.wikisource.org/wiki/肇論/2",
    boundary: {
      kind: "whole-subpage",
      start: "opening of 不真空論",
      endExclusive: "end of essay",
      description: "the complete Wikisource essay",
    },
    select: () => legacyParagraphs(
      legacyHashes.zhaolun,
      "https://zh.wikisource.org/wiki/肇論/2",
    ),
  },
];

const legacyEvidenceHashByUnit = {
  "ru-commentary-on-the-laozi-chapter-1-37b4420e": legacyHashes.wangBi,
  "ru-correcting-the-unenlightened-great-harmony-named-chapter-great-harmony-b67fbf4f": legacyHashes.zhangZai,
  "ru-daodejing-chapter-22-bb92adb5": legacyHashes.ctextDaodejing,
  "ru-essay-on-the-golden-lion-i-clarifying-dependent--named-chapter-i-clarifying-dependent-arising-36c69243": legacyHashes.goldenLion,
  "ru-instructions-for-practical-living-part-i-named-chapter-part-i-5823de0e": legacyHashes.chuanxiluUpper,
  "ru-mencius-gongsun-chou-i-named-chapter-gongsun-chou-i-274326ad": legacyHashes.menciusGongsun,
  "ru-mencius-jinxin-ii-named-chapter-jinxin-ii-85e66e44": legacyHashes.menciusJinxin,
  "ru-penetrating-the-book-of-changes-chapter-14-atten-named-chapter-chapter-14-attending-to-reality-5c9469d4": legacyHashes.tongshu,
  "ru-surviving-works-of-the-cheng-brothers-volume-2a-named-chapter-volume-2a-f384af19": legacyHashes.chengVolume2A,
  "ru-wang-fuzhis-record-of-questions-and-reflections--named-chapter-inner-chapters-eedb777d": legacyHashes.wangFuzhi,
  "ru-zhaolun-the-emptiness-of-the-unreal-named-chapter-the-emptiness-of-the-unreal-243d23a9": legacyHashes.zhaolun,
};

const anchorAdjustments = {
  "chinese-zhang-zai-great-harmony": {
    kind: "orthographic-variant",
    sourceQuote: "太和所謂道，中涵浮沈、升降、動靜、相感之性，是生絪縕、相盪、勝負、屈伸之始。",
    detail: "The received page has 浮沈; the card modernizes this to 浮沉. OpenCC does not safely collapse this historical name/verb ambiguity.",
  },
  "chinese-laozi-bending-whole": {
    kind: "edition-and-orthography-variant",
    sourceQuote: "曲則全，枉則直，窪則盈，弊則新，少則得，多則惑。",
    detail: "CText has 窪/弊; the card has simplified 洼 and the alternate received reading 敝.",
  },
  "chinese-fazang-golden-lion-dependent-arising": {
    kind: "source-lemma-segments",
    sourceSegments: [
      "谓金无自性随工巧匠缘",
      "遂有师子相起",
      "起但是缘故名缘起",
    ],
    detail: "The Wikisource transcription alternates the base-text lemma with commentary on each source line; the three lemma segments are exact and ordered.",
  },
  "chinese-cheng-hao-recognizing-humaneness": {
    kind: "received-text-variant",
    sourceQuote: "學者須先識仁仁者渾然與物同體義禮知信皆仁也識得此理以誠敬存之而已",
    detail: "The cited Siku transcription reads 知信; the card reads 智信.",
  },
  "chinese-wang-fuzhi-knowing-unknown": {
    kind: "possible-card-transcription-error",
    sourceQuote: "目所不見，非五色也；耳所不聞，非無聲也；言所不通，非無義也。故曰「知之為知之，不知為不知」。",
    detail: "The registered Wikisource text has 非五色也; the card adds 無 (非無五色也). This should be checked against a critical or facsimile edition before silently normalizing either side.",
  },
  "chinese-wang-fuzhi-private-and-public-knowing": {
    kind: "unmarked-internal-omission",
    sourceSegments: [
      "恃一端之意知，以天下嘗試之，強通其所不通，則私",
      "即天下而盡其意知，以確然於一，則公",
    ],
    sourceInterveningText: "故聖人毋意。",
    recommendedCardText: "恃一端之意知，以天下尝试之，强通其所不通，则私；……即天下而尽其意知，以确然于一，则公。",
    detail: "The two card clauses are ordered source segments, but the card currently omits a complete intervening sentence without an ellipsis.",
  },
  "chinese-sengzhao-dependent-and-empty": {
    kind: "unmarked-internal-omission-and-received-text-variant",
    sourceSegments: [
      "夫有若真有，有自常有，豈待緣而後有哉",
      "若有不自有，待緣而後有者，故知有非真有",
    ],
    sourceInterveningText: "譬彼真無，無自常無，豈待緣而後無也！",
    recommendedCardText: "夫有若真有，有自常有，岂待缘而后有哉？……若有不自有，待缘而后有者，故知有非真有。",
    corroboratingSourceUrl: "https://raw.githubusercontent.com/cbeta-org/xml-p5/master/T/T45/T45n1858.xml",
    detail: "The registered Wikisource edition contains a complete intervening sentence and reads 若有不自有; CBETA T45n1858, lines 0152c02–04, independently corroborates both facts. The card omits that sentence without an ellipsis and expands 不 to 不能.",
  },
};

const inventory = readJson(inventoryPath);
const thoughtsById = new Map(chineseThoughts.map((thought) => [thought.id, thought]));
const unitsById = new Map(inventory.units.map((unit) => [unit.id, unit]));

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function projectPath(path) {
  return relative(projectRoot, path).replaceAll("\\", "/");
}

function rawEvidenceForUnit(unitId) {
  const legacyHash = legacyEvidenceHashByUnit[unitId];
  if (legacyHash) {
    const bodyPath = join(legacyCacheDir, `${legacyHash}.body.txt`);
    const metadataPath = join(legacyCacheDir, `${legacyHash}.json`);
    const metadata = readJson(metadataPath);
    const body = readFileSync(bodyPath, "utf8");
    return [{
      kind: "preserved-fetch-response",
      bodyPath: projectPath(bodyPath),
      metadataPath: projectPath(metadataPath),
      retrievalUrl: metadata.url,
      contentType: metadata.contentType,
      sha256: sha256(body),
    }];
  }
  const rawPath = unitId.includes("indras-net")
    ? join(outputDir, "cbeta-t45n1881.xml")
    : join(outputDir, "mozi-feiming-shang.mediawiki.json");
  if (!existsSync(rawPath)) throw new Error(`Missing raw recovery evidence: ${projectPath(rawPath)}`);
  const raw = readFileSync(rawPath, "utf8");
  return [{
    kind: "preserved-fetch-response",
    bodyPath: projectPath(rawPath),
    retrievalUrl: unitId.includes("indras-net")
      ? "https://raw.githubusercontent.com/cbeta-org/xml-p5/master/T/T45/T45n1881.xml"
      : mediaWikiApiUrlFor("https://zh.wikisource.org/wiki/墨子/非命上"),
    contentType: unitId.includes("indras-net") ? "application/xml" : "application/json",
    sha256: sha256(raw),
  }];
}

function legacyBody(hash) {
  const metadata = readJson(join(legacyCacheDir, `${hash}.json`));
  const body = readFileSync(join(legacyCacheDir, `${hash}.body.txt`), "utf8");
  if (metadata.sha256 && metadata.sha256 !== sha256(body)) {
    throw new Error(`Legacy cache hash mismatch: ${hash}`);
  }
  if (metadata.contentType === "application/json") {
    const payload = JSON.parse(body);
    if (typeof payload?.parse?.text !== "string") {
      throw new Error(`MediaWiki cache has no parse.text: ${hash}`);
    }
    return payload.parse.text;
  }
  return body;
}

function legacyParagraphs(hash, sourceUrl) {
  return extractHtmlParagraphs(legacyBody(hash), { sourceUrl });
}

function textOf(paragraph) {
  return typeof paragraph === "string" ? paragraph : paragraph.text;
}

function normalizeParagraphs(paragraphs) {
  return paragraphs
    .map(textOf)
    .map((text) => text.normalize("NFC").replace(/[\t ]+/gu, " ").trim())
    .filter(Boolean);
}

function betweenExact(paragraphs, startText, endText) {
  const rows = normalizeParagraphs(paragraphs);
  const start = rows.indexOf(startText);
  const end = rows.indexOf(endText, start + 1);
  if (start < 0 || end <= start) {
    throw new Error(`Boundary not found: ${startText} -> ${endText}`);
  }
  return rows.slice(start, end);
}

function beforeExact(paragraphs, endText) {
  const rows = normalizeParagraphs(paragraphs);
  const end = rows.indexOf(endText);
  if (end < 0) throw new Error(`End boundary not found: ${endText}`);
  return rows.slice(0, end);
}

function beforeMatch(paragraphs, endPattern) {
  const rows = normalizeParagraphs(paragraphs);
  const end = rows.findIndex((text) => endPattern.test(text));
  if (end < 0) throw new Error(`End pattern not found: ${endPattern}`);
  return rows.slice(0, end);
}

function goldenLionSection() {
  const rows = legacyParagraphs(
    legacyHashes.goldenLion,
    "https://zh.wikisource.org/wiki/華嚴金師子章",
  );
  const flattened = rows.map(textOf).join("\n");
  const start = flattened.indexOf("明缘起第一");
  const end = flattened.indexOf("辨色空第二", start + 1);
  if (start < 0 || end <= start) throw new Error("Golden Lion section boundary not found");
  return flattened
    .slice(start, end)
    .split(/\n|　{2,}/u)
    .map((text) => text.trim())
    .filter(Boolean);
}

function decodeXmlEntities(value) {
  return value
    .replace(/&#x([0-9a-f]+);/giu, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&#([0-9]+);/gu, (_, code) => String.fromCodePoint(Number.parseInt(code, 10)))
    .replace(/&lt;/gu, "<")
    .replace(/&gt;/gu, ">")
    .replace(/&amp;/gu, "&")
    .replace(/&quot;/gu, '"')
    .replace(/&apos;/gu, "'");
}

async function cachedRemoteText(filename, url) {
  const target = join(outputDir, filename);
  if (existsSync(target)) return readFileSync(target, "utf8");
  if (!writeOutputs) {
    throw new Error(`Missing recovery cache ${projectPath(target)}; run with --write once`);
  }
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: { "User-Agent": "AgoraReadingUnitRecovery/1.0 (source audit)" },
      });
      if (!response.ok) throw new Error(`HTTP ${response.status} ${response.statusText}`);
      const body = await response.text();
      mkdirSync(outputDir, { recursive: true });
      writeFileSync(target, body);
      return body;
    } catch (error) {
      lastError = error;
      if (attempt < 3) await new Promise((resolvePromise) => setTimeout(resolvePromise, 1_500 * attempt));
    }
  }
  throw new Error(`Could not retrieve ${url}: ${lastError?.message ?? lastError}`);
}

async function cbetaIndrasNetSection() {
  const xml = await cachedRemoteText(
    "cbeta-t45n1881.xml",
    "https://raw.githubusercontent.com/cbeta-org/xml-p5/master/T/T45/T45n1881.xml",
  );
  const startToken = '<p xml:id="pT45p0669c0601">';
  const endToken = '<p xml:id="pT45p0669c1301">';
  const start = xml.indexOf(startToken);
  const end = xml.indexOf(endToken, start + startToken.length);
  if (start < 0 || end <= start) throw new Error("CBETA T1881 section boundary not found");
  const text = xml
    .slice(start, end)
    .replace(/<note\b[^>]*>[\s\S]*?<\/note>/giu, "")
    .replace(/<lb\b[^>]*\/>/giu, "")
    .replace(/<pb\b[^>]*\/>/giu, "")
    .replace(/<\/p>/giu, "\n\n")
    .replace(/<[^>]+>/gu, "");
  return decodeXmlEntities(text)
    .split(/\n{2,}/u)
    .map((paragraph) => paragraph.replace(/[\t ]+/gu, " ").trim())
    .filter(Boolean);
}

async function moziDirectChapter() {
  const pageUrl = "https://zh.wikisource.org/wiki/墨子/非命上";
  const apiUrl = mediaWikiApiUrlFor(pageUrl);
  if (!apiUrl) throw new Error("Could not construct MediaWiki API URL for Mozi");
  const raw = await cachedRemoteText("mozi-feiming-shang.mediawiki.json", apiUrl);
  const payload = JSON.parse(raw);
  if (typeof payload?.parse?.text !== "string") throw new Error("Mozi MediaWiki response has no parse.text");
  return normalizeParagraphs(extractHtmlParagraphs(payload.parse.text, { sourceUrl: pageUrl }));
}

function serializeParagraphs(paragraphs) {
  return `${normalizeParagraphs(paragraphs).join("\n\n")}\n`;
}

function cardsForUnit(unitId) {
  return Object.entries(inventory.thoughtMap)
    .filter(([, entry]) => entry.unitId === unitId)
    .map(([thoughtId]) => {
      const thought = thoughtsById.get(thoughtId);
      if (!thought?.text) throw new Error(`Missing Chinese source text for ${thoughtId}`);
      return [thoughtId, thought.text];
    });
}

function exactSegmentAnchors(paragraphs, sourceSegments) {
  return sourceSegments.map((segment, segmentIndex) => {
    const result = matchCardAnchors(
      paragraphs.map((text) => ({ text })),
      { [`segment-${segmentIndex + 1}`]: segment },
    ).anchors[`segment-${segmentIndex + 1}`];
    if (result.match === "unmatched") throw new Error(`Recovery segment did not match: ${segment}`);
    return result;
  });
}

function verifyAnchors(unitId, paragraphs) {
  const cardEntries = cardsForUnit(unitId);
  const direct = matchCardAnchors(
    paragraphs.map((text) => ({ text })),
    Object.fromEntries(cardEntries),
  ).anchors;
  const results = {};
  for (const [thoughtId, cardQuote] of cardEntries) {
    const directAnchor = direct[thoughtId];
    const adjustment = anchorAdjustments[thoughtId];
    if (directAnchor.match !== "unmatched") {
      results[thoughtId] = {
        cardQuote,
        status: "direct",
        anchor: directAnchor,
      };
      continue;
    }
    if (!adjustment) throw new Error(`Unmatched and undocumented anchor: ${thoughtId}`);
    if (adjustment.sourceQuote) {
      const sourceAnchor = matchCardAnchors(
        paragraphs.map((text) => ({ text })),
        { source: adjustment.sourceQuote },
      ).anchors.source;
      if (sourceAnchor.match === "unmatched") {
        throw new Error(`Documented source reading did not match: ${thoughtId}`);
      }
      results[thoughtId] = {
        cardQuote,
        status: "documented-source-difference",
        differenceKind: adjustment.kind,
        sourceQuote: adjustment.sourceQuote,
        sourceAnchor,
        detail: adjustment.detail,
      };
      continue;
    }
    const segmentAnchors = exactSegmentAnchors(paragraphs, adjustment.sourceSegments);
    results[thoughtId] = {
      cardQuote,
      status: adjustment.kind.includes("unmarked-internal-omission")
        ? "requires-card-ellipsis"
        : "exact-source-lemma-segments",
      differenceKind: adjustment.kind,
      sourceSegments: adjustment.sourceSegments,
      segmentAnchors,
      ...(adjustment.sourceInterveningText
        ? { sourceInterveningText: adjustment.sourceInterveningText }
        : {}),
      ...(adjustment.recommendedCardText
        ? { recommendedCardText: adjustment.recommendedCardText }
        : {}),
      ...(adjustment.corroboratingSourceUrl
        ? { corroboratingSourceUrl: adjustment.corroboratingSourceUrl }
        : {}),
      detail: adjustment.detail,
    };
  }
  return results;
}

const recoveredUnits = [];
for (const spec of unitSpecs) {
  const paragraphs = normalizeParagraphs(await spec.select());
  if (paragraphs.length === 0) throw new Error(`Empty natural unit: ${spec.id}`);
  const selectedText = serializeParagraphs(paragraphs);
  const selectedPath = join(outputDir, `${spec.slug}.txt`);
  const existingUnit = unitsById.get(spec.id);
  if (!existingUnit) throw new Error(`Unit not present in inventory: ${spec.id}`);
  const anchors = verifyAnchors(spec.id, paragraphs);
  recoveredUnits.push({
    unitId: spec.id,
    registeredSourceUrl: existingUnit.source.url,
    retrievalSourceUrl: spec.retrievalUrl,
    localPath: projectPath(selectedPath),
    sha256: sha256(selectedText),
    paragraphCount: paragraphs.length,
    characterCount: selectedText.length,
    byteCount: Buffer.byteLength(selectedText),
    rawEvidence: rawEvidenceForUnit(spec.id),
    naturalBoundary: spec.boundary,
    sourceOverrideCandidate: {
      originalSourceUrl: existingUnit.source.url,
      localPath: projectPath(selectedPath),
      provenanceUrl: spec.retrievalUrl,
    },
    anchors,
  });
  if (writeOutputs) {
    mkdirSync(outputDir, { recursive: true });
    writeFileSync(selectedPath, selectedText);
  } else {
    if (!existsSync(selectedPath)) throw new Error(`Missing selected cache: ${projectPath(selectedPath)}`);
    const diskText = readFileSync(selectedPath, "utf8");
    if (sha256(diskText) !== sha256(selectedText)) {
      throw new Error(`Selected cache differs from reproducible extraction: ${projectPath(selectedPath)}`);
    }
  }
}

const allAnchors = recoveredUnits.flatMap((unit) => Object.entries(unit.anchors));
const directCount = allAnchors.filter(([, result]) => result.status === "direct").length;
const lemmaSegmentCount = allAnchors.filter(([, result]) => result.status === "exact-source-lemma-segments").length;
const sourceDifferenceCount = allAnchors.filter(([, result]) => result.status === "documented-source-difference").length;
const requiresCardEllipsisCount = allAnchors.filter(([, result]) => result.status === "requires-card-ellipsis").length;

const sourceTextDifferences = allAnchors
  .filter(([, result]) => result.status === "documented-source-difference" || result.status === "requires-card-ellipsis")
  .map(([thoughtId, result]) => ({
    thoughtId,
    kind: result.differenceKind,
    cardQuote: result.cardQuote,
    ...(result.sourceQuote ? { sourceQuote: result.sourceQuote } : {}),
    ...(result.sourceInterveningText ? { sourceInterveningText: result.sourceInterveningText } : {}),
    ...(result.recommendedCardText ? { recommendedCardText: result.recommendedCardText } : {}),
    ...(result.corroboratingSourceUrl ? { corroboratingSourceUrl: result.corroboratingSourceUrl } : {}),
    detail: result.detail,
  }));

sourceTextDifferences.push(
  {
    unitId: "ru-mozi-against-fatalism-i-named-chapter-against-fatalism-i-de9e8615",
    kind: "registered-commentary-edition-does-not-preserve-card-contiguity",
    registeredSourceReading: "命，……雖強勁何益哉？」以上說王公大人……",
    replacementSourceReading: "命，雖強勁，何益哉？」上以說王公大人……",
    detail: "Use the direct 墨子/非命上 base-text subpage for an exact continuous anchor; retain the registered 墨子閒詁 volume as an additional scholarly link if desired.",
  },
  {
    unitId: "ru-essay-on-the-golden-lion-the-realm-of-indras-net-named-chapter-the-realm-of-indras-net-3d3ef644",
    kind: "dead-endpoint-and-license-metadata",
    registeredSourceUrl: "https://tripitaka.cbeta.org/T45n1881_001",
    replacementSourceUrl: "https://raw.githubusercontent.com/cbeta-org/xml-p5/master/T/T45/T45n1881.xml",
    detail: "The old CBETA endpoint is unavailable. The replacement is CBETA's official TEI P5 repository; the encoded file is distributed under CC BY-NC-SA 4.0 even though the underlying historical text is public domain.",
  },
);

const proposal = {
  schemaVersion: 1,
  generatedOn: "2026-08-29",
  scope: {
    description: "Missing Chinese online-text reading units only; Archive.org scan units are out of scope.",
    sourceResponsesPreserved: true,
    prohibitedSharedFilesUntouched: [
      "research/reading-units/source-overrides.json",
      "scripts/fetch-reading-units.mjs",
      "public/readings/units/*.json",
    ],
  },
  summary: {
    recoveredNaturalUnits: recoveredUnits.length,
    auditedCards: allAnchors.length,
    directAnchors: directCount,
    exactLemmaSegmentAnchors: lemmaSegmentCount,
    documentedSourceDifferences: sourceDifferenceCount,
    cardsRequiringExplicitEllipsis: requiresCardEllipsisCount,
    unrecoveredUnits: 0,
  },
  mergeGuidance: {
    sourceOverrides: recoveredUnits.map((unit) => unit.sourceOverrideCandidate),
    notes: [
      "Each localPath contains one complete natural chapter/volume/essay, not an entire book.",
      "Do not copy card wording into source caches; cache text remains faithful to the retrieved edition.",
      "Resolve documented card/source differences explicitly instead of widening the global matcher with unsafe character substitutions.",
      "The two existing Mencius URL overrides already point to the correct Wikisource subpages; the localPath candidates make those recovered chapters durable and reproducible.",
    ],
  },
  units: Object.fromEntries(recoveredUnits.map((unit) => [unit.unitId, unit])),
  sourceTextDifferences,
  recommendedCardEdits: [
    {
      thoughtId: "chinese-wang-fuzhi-private-and-public-knowing",
      action: "mark the internal omission",
      recommendedCardText: anchorAdjustments["chinese-wang-fuzhi-private-and-public-knowing"].recommendedCardText,
    },
    {
      thoughtId: "chinese-sengzhao-dependent-and-empty",
      action: "mark the internal omission and follow the corroborated 不自有 reading",
      recommendedCardText: anchorAdjustments["chinese-sengzhao-dependent-and-empty"].recommendedCardText,
      corroboratingSourceUrl: anchorAdjustments["chinese-sengzhao-dependent-and-empty"].corroboratingSourceUrl,
    },
  ],
  manualReview: [
    {
      thoughtId: "chinese-laozi-bending-whole",
      issue: "CText 弊 / alternate received reading 敝",
      recommendation: "If CText remains the cited edition, change the card to 弊则新; otherwise cite an exact named edition that reads 敝.",
    },
    {
      thoughtId: "chinese-wang-fuzhi-knowing-unknown",
      issue: "非五色 / 非無色 / 非無五色 textual reading",
      recommendation: "The registered page has 非五色也 and scholarly quotations commonly have 非無色也; neither supports the card's 非無五色也. Verify a facsimile/critical edition, then remove the unsupported extra graph rather than widening the matcher.",
    },
    {
      thoughtId: "chinese-cheng-hao-recognizing-humaneness",
      issue: "知信 / 智信 received-text variant",
      recommendation: "Either change the card to the cited Siku reading 知信 or cite a named edition that actually reads 智信.",
    },
  ],
  unrecovered: [],
};

const proposalText = `${JSON.stringify(proposal, null, 2)}\n`;
if (writeOutputs) {
  writeFileSync(proposalPath, proposalText);
} else {
  if (!existsSync(proposalPath)) throw new Error(`Missing proposal: ${projectPath(proposalPath)}`);
  if (readFileSync(proposalPath, "utf8") !== proposalText) {
    throw new Error(`Proposal is stale: ${projectPath(proposalPath)}; regenerate with --write`);
  }
}

console.log(JSON.stringify({
  mode: writeOutputs ? "write" : "dry-run",
  proposal: projectPath(proposalPath),
  cacheDirectory: projectPath(outputDir),
  ...proposal.summary,
}, null, 2));
