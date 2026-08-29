#!/usr/bin/env node

import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  allThoughts,
  contentLibraries,
  contentLibraryIds,
} from "../content/libraries.ts";
import { loadCompleteEconomicsCatalog } from "../content/economics.ts";
import { sourceMetadataForThought } from "../content/sourceMetadata.ts";
import { verifiedSourcePassages } from "../content/verifiedSourcePassages.ts";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const RESEARCH_OUTPUT = path.join(ROOT, "research/reading-units/inventory.json");
const PUBLIC_OUTPUT = path.join(ROOT, "public/readings/index.json");
const GENERATED_ON = "2026-08-29";
const EXPECTED_CATALOG_COUNT = 1_452;
const EXPECTED_VERIFIED_COUNT = 890;
const MIN_UNIT_COUNT = 650;
const MAX_UNIT_COUNT = 750;

const identifierAtom = String.raw`(?:\d+[a-z]?|[ivxlcdm]+)`;
const identifierPath = String.raw`${identifierAtom}(?:\.[a-z0-9]+)*(?:\([a-z0-9]+\))?`;
const identifierRange = String.raw`${identifierPath}(?:\s*(?:[–—-]|to|and)\s*${identifierPath})?`;
const numberedStructureDefinitions = [
  ["book", "Book", "卷"],
  ["part", "Part", "部分"],
  ["chapter", "Chapter", "章"],
  ["essay", "Essay", "论说"],
  ["discourse", "Discourse", "篇"],
  ["canto", "Canto", "诗章"],
  ["meditation", "Meditation", "沉思"],
  ["lecture", "Lecture", "讲"],
  ["lesson", "Lesson", "课"],
  ["mandala", "Mandala", "曼荼罗"],
  ["hymn", "Hymn", "赞歌"],
  ["article", "Article", "条"],
  ["clause", "Clause", "款"],
  ["section", "Section", "节"],
  ["proposition", "Proposition", "命题"],
  ["aphorism", "Aphorism", "格言"],
  ["definition", "Definition", "定义"],
  ["verse", "Verse", "颂"],
  ["rule", "Rule", "规则"],
  ["query", "Query", "疑问"],
  ["paragraph", "Paragraph", "段"],
  ["point", "Point", "点"],
  ["question", "Question", "问题"],
  ["hypothesis", "Hypothesis", "假设"],
  ["experiment", "Experiment", "实验"],
  ["study", "Study", "研究"],
  ["manuscript", "Manuscript", "手稿"],
  ["theorem", "Theorem", "定理"],
  ["appendix", "Appendix", "附录"],
].map(([kind, en, zh]) => ({
  kind,
  en,
  zh,
  pattern: new RegExp(`\\b${kind}s?\\s+(${identifierRange})\\b`, "iu"),
}));

const symbolSectionPattern = new RegExp(`§{1,2}\\s*(${identifierRange})\\b`, "iu");
const ordinalWords = "first|second|third|fourth|fifth|sixth|seventh|eighth|ninth|tenth";
const ordinalStructureDefinitions = [
  ["essay", "Essay", "论说"],
  ["question", "Question", "问题"],
].map(([kind, en, zh]) => ({
  kind,
  en,
  zh,
  pattern: new RegExp(`\\b(${ordinalWords})\\s+${kind}\\b`, "iu"),
}));

const fixedStructureDefinitions = [
  ["preface", "Preface", "序言"],
  ["introduction", "Introduction", "导言"],
  ["prologue", "Prologue", "序章"],
  ["conclusion", "Conclusion", "结语"],
  ["postscript", "Postscript", "后记"],
  ["forethought", "Forethought", "卷首语"],
  ["appendix", "Appendix", "附录"],
  ["abstract", "Abstract", "摘要"],
].map(([kind, en, zh]) => ({ kind, en, zh, pattern: new RegExp(`\\b${kind}\\b`, "iu") }));

const shortWholeWorkPatterns = [
  /^Letter\b/iu,
  /\bLetter to\b/iu,
  /^Annihilation of Caste$/iu,
  /^Enchiridion$/iu,
  /^Experiments in Plant-Hybridisation$/iu,
  /^Forming Impressions of Personality$/iu,
  /^Fragments of Heraclitus$/iu,
  /^Intention$/iu,
  /^On Certainty$/iu,
  /^On Contradiction$/iu,
  /^On Nature$/iu,
  /^On New Democracy$/iu,
  /^On the Movement of Small Particles Suspended in Stationary Liquids Required by the Molecular-Kinetic Theory of Heat$/iu,
  /^On the Ten Major Relationships$/iu,
  /^Principal Doctrines$/iu,
  /^Monadology$/iu,
  /^Samkhya Karika$/iu,
  /^The Birth of Tragedy$/iu,
];

const numberedSectionUnitWorkPatterns = [
  /^A Compendium on the Soul$/iu,
  /^Groundwork of the Metaphysics of Morals$/iu,
  /^Pragmatism and Abduction$/iu,
];

function normalizedToken(value) {
  return value
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[‐‑‒–—]/gu, "-")
    .replace(/\s+/gu, " ")
    .trim();
}

function normalizedUrl(value) {
  const url = new URL(value);
  url.hash = "";
  if (url.pathname.length > 1) url.pathname = url.pathname.replace(/\/+$/u, "");
  return url.href;
}

function sourceGroupingKey(sourceUrl, englishWork) {
  const url = new URL(sourceUrl);
  if (
    englishWork === "The Decisive Treatise"
    && url.hostname === "archive.org"
    && /^\/details\/philosophytheol00aver(?:\/|$)/u.test(url.pathname)
  ) {
    return "https://archive.org/details/philosophytheol00aver";
  }
  if (
    englishWork === "The Theory of Political Economy"
    && url.hostname === "www.columbia.edu"
    && url.pathname.includes("/cul/texts/ldpd_10482866_000/pages/")
  ) {
    return "https://www.columbia.edu/cu/lweb/digital/collections/cul/texts/ldpd_10482866_000";
  }
  return sourceUrl;
}

function slug(value, fallback = "unit") {
  const compact = normalizedToken(value)
    .replace(/[’']/gu, "")
    .replace(/[^a-z0-9]+/gu, "-")
    .replace(/^-+|-+$/gu, "")
    .slice(0, 48);
  return compact || fallback;
}

function structurePart(kind, identifier, enName, zhName, index = 0) {
  const compactIdentifier = identifier
    .replace(/[‐‑‒–—]/gu, "–")
    .replace(/\s+/gu, " ")
    .replace(/^[,.:;\s]+|[,.:;\s]+$/gu, "")
    .trim();
  return {
    kind,
    identifier: compactIdentifier,
    en: compactIdentifier ? `${enName} ${compactIdentifier}` : enName,
    zh: compactIdentifier ? `${zhName} ${compactIdentifier}` : zhName,
    index,
  };
}

function namedStructurePart(kind, identifier, enName, zhName, index = 0) {
  return {
    kind,
    identifier,
    en: enName,
    zh: zhName,
    index,
  };
}

function completedStructure(parts) {
  const uniqueParts = [];
  const seen = new Set();
  for (const part of [...parts].sort((left, right) => left.index - right.index)) {
    const token = `${part.kind}:${normalizedToken(part.identifier)}`;
    if (seen.has(token)) continue;
    seen.add(token);
    uniqueParts.push(part);
  }
  return {
    structureKey: uniqueParts
      .map((part) => `${part.kind}-${slug(part.identifier || part.en)}`)
      .join("-"),
    zh: uniqueParts.map((part) => part.zh).join(" · "),
    en: uniqueParts.map((part) => part.en).join(" · "),
  };
}

function wholeWorkStructure() {
  return {
    structureKey: "whole-work",
    zh: "全篇",
    en: "Whole work",
  };
}

function compositeContainingUnit(thoughtId) {
  if (thoughtId === "psychology-foundations-pavlov-acquisition-extinction") {
    return completedStructure([
      namedStructurePart("lectures", "ii-and-iv", "Lectures II + IV", "第 II、IV 讲"),
    ]);
  }
  if (thoughtId === "wittgenstein-picture-reality") {
    return completedStructure([
      namedStructurePart(
        "major-propositions",
        "2-and-4",
        "Major propositions 2 + 4",
        "主命题 2、4",
      ),
    ]);
  }
  return undefined;
}

function isEditionPart(citationHead, match, kind) {
  if (kind !== "part") return false;
  const prefix = citationHead.slice(Math.max(0, match.index - 55), match.index);
  return /\b(?:vol\.?|volume)\s+[ivxlcdm\d]+\b[^;]{0,35}$/iu.test(prefix);
}

function firstOrdinalStructure(citationHead, kind) {
  const definition = ordinalStructureDefinitions.find((entry) => entry.kind === kind);
  const match = definition ? citationHead.match(definition.pattern) : undefined;
  if (!match) return undefined;
  return structurePart(kind, match[1], definition.en, definition.zh, match.index);
}

function namedChapterForChineseThought(thought) {
  if (!thought.id.startsWith("chinese-")) return undefined;
  const separator = thought.englishWork.indexOf(",");
  if (separator === -1) return undefined;
  const name = thought.englishWork.slice(separator + 1).trim();
  return name
    ? completedStructure([structurePart("named-chapter", name, "Chapter", "篇")])
    : undefined;
}

function numberedSectionForLongWork(citationHead, englishWork) {
  if (!numberedSectionUnitWorkPatterns.some((pattern) => pattern.test(englishWork))) {
    return undefined;
  }
  const match = citationHead.match(symbolSectionPattern)
    ?? citationHead.match(/\bsection\s+([IVXLCDM\d]+(?:\.[A-Z\d]+)*)\b/iu);
  return match
    ? completedStructure([structurePart("section", match[1], "Section", "节", match.index)])
    : undefined;
}

function citedSectionIdentifier(citationHead) {
  return citationHead.match(symbolSectionPattern)?.[1]
    ?? citationHead.match(/\bsection\s+([IVXLCDM\d]+(?:\.[A-Z\d]+)*)\b/iu)?.[1];
}

function canonicalYogaBookIdentifier(citationHead) {
  const identifier = citationHead.match(/\bBook\s+([IVXLCDM\d]+)\b/iu)?.[1]
    ?? citationHead.match(/\bYoga Aphorisms\s+([IVXLCDM\d]+)\.\d+\b/iu)?.[1]
    ?? citationHead.match(/\bYoga S(?:ū|u)tra,?\s+([IVXLCDM\d]+)\.\d+\b/iu)?.[1];
  if (!identifier) return undefined;
  const canonical = {
    "1": "I",
    "2": "II",
    "3": "III",
    "4": "IV",
  }[identifier] ?? identifier.toUpperCase();
  return completedStructure([
    structurePart("book", canonical, "Book", "卷"),
  ]);
}

function workSpecificContainingUnit(citationHead, englishWork) {
  if (englishWork === "Yoga Sutra") {
    return canonicalYogaBookIdentifier(citationHead);
  }

  if (englishWork === "A Treatise Concerning the Principles of Human Knowledge") {
    return completedStructure([
      structurePart("part", "I", "Part", "部分"),
    ]);
  }

  if (englishWork === "Philosophical Investigations") {
    const part = citationHead.match(/\bPart\s+([IVXLCDM]+)\b/iu)?.[1]
      ?? (citedSectionIdentifier(citationHead) ? "I" : undefined);
    return part
      ? completedStructure([structurePart("part", part, "Part", "部分")])
      : undefined;
  }

  if (englishWork === "Critique of the Power of Judgment"
    && citedSectionIdentifier(citationHead)) {
    return completedStructure([
      structurePart("part", "I", "Part", "部分"),
      structurePart("book", "I", "Book", "卷"),
    ]);
  }

  if (englishWork === "Elements of the Philosophy of Right"
    && citedSectionIdentifier(citationHead)) {
    const section = Number.parseInt(citedSectionIdentifier(citationHead), 10);
    const division = section >= 142 && section <= 157
      ? ["ethical-life-introduction", "Ethical Life · Introduction", "伦理生活 · 导论"]
      : section >= 182 && section <= 256
        ? ["civil-society", "Civil Society", "市民社会"]
        : section >= 257 && section <= 360
          ? ["the-state", "The State", "国家"]
          : undefined;
    return division
      ? completedStructure([
        structurePart("part", "III", "Part", "部分"),
        namedStructurePart("named-section", division[0], division[1], division[2]),
      ])
      : undefined;
  }

  if (englishWork === "The Logic of Scientific Discovery") {
    const rawSection = citedSectionIdentifier(citationHead);
    const section = rawSection ? Number.parseInt(rawSection, 10) : undefined;
    if (section >= 1 && section <= 8) {
      return completedStructure([
        structurePart("part", "I", "Part", "部分"),
        structurePart("chapter", "1", "Chapter", "章"),
      ]);
    }
    if (section >= 31 && section <= 40) {
      return completedStructure([
        structurePart("part", "II", "Part", "部分"),
        structurePart("chapter", "6", "Chapter", "章"),
      ]);
    }
  }

  if (englishWork === "The Logic of Hegel" && citedSectionIdentifier(citationHead)) {
    return completedStructure([
      structurePart("part", "I", "Part", "部分"),
      namedStructurePart("named-section", "quality", "Quality", "质"),
    ]);
  }

  if (englishWork === "The Passions of the Soul"
    && /\bArticle\s+153\b/iu.test(citationHead)) {
    return completedStructure([
      structurePart("part", "III", "Part", "部分"),
    ]);
  }

  if (englishWork === "The World as Will and Representation, Volume I") {
    const rawSection = citedSectionIdentifier(citationHead);
    const section = rawSection ? Number.parseInt(rawSection, 10) : undefined;
    const book = section >= 1 && section <= 16
      ? "I"
      : section >= 17 && section <= 29
        ? "II"
        : section >= 30 && section <= 52
          ? "III"
          : section >= 53 && section <= 71
            ? "IV"
            : undefined;
    return book
      ? completedStructure([structurePart("book", book, "Book", "卷")])
      : undefined;
  }

  if (englishWork === "Talks at the Yenan Forum on Literature and Art"
    && /\bConclusion\b/iu.test(citationHead)) {
    return completedStructure([
      namedStructurePart("conclusion", "conclusion", "Conclusion", "结语"),
    ]);
  }

  return undefined;
}

function classicContainingChapter(citationHead, englishWork) {
  const humeTreatiseMatch = citationHead.match(
    /\bT\s+(\d+)\.(\d+)\.(\d+)\.\d+\b/iu,
  );
  if (/^A Treatise of Human Nature$/iu.test(englishWork) && humeTreatiseMatch) {
    return completedStructure([
      structurePart("book", humeTreatiseMatch[1], "Book", "卷", humeTreatiseMatch.index),
      structurePart("part", humeTreatiseMatch[2], "Part", "部分", humeTreatiseMatch.index),
      structurePart(
        "section",
        humeTreatiseMatch[3],
        "Section",
        "节",
        humeTreatiseMatch.index,
      ),
    ]);
  }

  if (/^An Enquiry Concerning the Principles of Morals$/iu.test(englishWork)) {
    const appendixMatch = citationHead.match(/\bM\s+App(?:endix)?\s*(\d+)\.\d+\b/iu);
    if (appendixMatch) {
      return completedStructure([
        structurePart(
          "appendix",
          appendixMatch[1],
          "Appendix",
          "附录",
          appendixMatch.index,
        ),
      ]);
    }
    const sectionMatch = citationHead.match(/\bM\s+(\d+)\.\d+\b/iu);
    if (sectionMatch) {
      return completedStructure([
        structurePart("section", sectionMatch[1], "Section", "节", sectionMatch.index),
      ]);
    }
  }

  const summaMatch = citationHead.match(
    /\bSumma Theologiae\s+([IVXLCDM]+(?:-[IVXLCDM]+)?),\s*q\.(\d+),\s*a\.\d+\b/iu,
  );
  if (/^Summa Theologiae$/iu.test(englishWork) && summaMatch) {
    return completedStructure([
      structurePart("part", summaMatch[1], "Part", "部分", summaMatch.index),
      structurePart("question", summaMatch[2], "Question", "问题", summaMatch.index),
    ]);
  }

  const lockeMatch = citationHead.match(
    /\bAn Essay Concerning Human(?:e)? Understanding,?\s+([IVXLCDM]+)\.(\d+)\.\d+\b/iu,
  );
  if (/An Essay Concerning Human Understanding/iu.test(englishWork) && lockeMatch) {
    return completedStructure([
      structurePart("book", lockeMatch[1], "Book", "卷", lockeMatch.index),
      structurePart("chapter", lockeMatch[2], "Chapter", "章", lockeMatch.index),
    ]);
  }

  const humeMatch = citationHead.match(/\bE\s+(\d+)\.\d+\b/iu);
  if (/An Enquiry Concerning Human Understanding/iu.test(englishWork) && humeMatch) {
    return completedStructure([
      structurePart("section", humeMatch[1], "Section", "节", humeMatch.index),
    ]);
  }

  const bookChapterRules = [
    [
      /^(?:Discourses|Discourses on Livy)$/iu,
      /\bDiscourses(?: on Livy)?\s+([IVXLCDM]+)\.(\d+)\b/iu,
    ],
    [
      /(?:Confessions|The City of God|On the Social Contract|The Social Contract|On the Soul|On Christian Teaching)/iu,
      /\b(?:Confessions|The City of God|On the Social Contract|The Social Contract|On the Soul|On Christian Doctrine)\s+([IVXLCDM]+)\.(\d+)(?:\.\d+)?\b/iu,
    ],
    [
      /(?:Nicomachean Ethics|Politics|Metaphysics|Physics|Rhetoric|Poetics)/iu,
      /\b(?:Nicomachean Ethics|Politics|Metaphysics|Physics|Rhetoric|Poetics)\s+([IVXLCDM]+)\.(\d+)\b/iu,
    ],
  ];
  for (const [workPattern, citationPattern] of bookChapterRules) {
    if (!workPattern.test(englishWork)) continue;
    const match = citationHead.match(citationPattern);
    if (!match) continue;
    return completedStructure([
      structurePart("book", match[1], "Book", "卷", match.index),
      structurePart("chapter", match[2], "Chapter", "章", match.index),
    ]);
  }

  const philosophyMatch = citationHead.match(/\bPrinciples of Philosophy\s+([IVXLCDM]+)\.(\d+)\b/iu);
  if (/^Principles of Philosophy$/iu.test(englishWork) && philosophyMatch) {
    return completedStructure([
      structurePart("part", philosophyMatch[1], "Part", "部分", philosophyMatch.index),
      structurePart("section", philosophyMatch[2], "Section", "节", philosophyMatch.index),
    ]);
  }

  const gitaMatch = citationHead.match(/\bBhagavad Gita\s+([IVXLCDM]+)\.\d+\b/iu);
  if (/Bhagavad Gita/iu.test(englishWork) && gitaMatch) {
    return completedStructure([
      structurePart("chapter", gitaMatch[1], "Chapter", "章", gitaMatch.index),
    ]);
  }

  const upanishadMatch = citationHead.match(
    /\b(?:Brihad-?Aranyaka|Chandogya|Katha) Upanishad\s+(\d+)\.(\d+)\.\d+(?:\s*[–—-]\s*\d+)?\b/iu,
  );
  if (/Upanishad/iu.test(englishWork) && upanishadMatch) {
    return completedStructure([
      structurePart(
        "section",
        `${upanishadMatch[1]}.${upanishadMatch[2]}`,
        "Section",
        "节",
        upanishadMatch.index,
      ),
    ]);
  }

  const nyayabinduMatch = citationHead.match(/\bNyāyabindu\s+([IVXLCDM]+)\.\d+\b/iu);
  if (/Nyāyabindu|Drop of Reasoning/iu.test(englishWork) && nyayabinduMatch) {
    return completedStructure([
      structurePart("chapter", nyayabinduMatch[1], "Chapter", "章", nyayabinduMatch.index),
    ]);
  }

  const enneadsMatch = citationHead.match(/\bEnneads?\s+([IVXLCDM]+)\.(\d+)(?:\.\d+)?\b/iu);
  if (/Enneads?/iu.test(englishWork) && enneadsMatch) {
    return completedStructure([
      structurePart("ennead", enneadsMatch[1], "Ennead", "九章集", enneadsMatch.index),
      structurePart("tractate", enneadsMatch[2], "Tractate", "篇", enneadsMatch.index),
    ]);
  }

  return undefined;
}

function sutraContainingChapter(citationHead) {
  const match = citationHead.match(new RegExp(
    `\\b(Nyāya|Nyaya|Mimamsa|Mīmāṃsā|Vaisheshika|Vaiśeṣika|Yoga|Tattvarthadhigama|Tattvartha)\\s+S(?:ū|u)tra,?(?:\\s+Book\\s+([ivxlcdm]+),?)?\\s+(${identifierRange})\\b`,
    "iu",
  ));
  if (!match) return undefined;
  const school = normalizedToken(match[1]);
  const components = match[3].match(/[A-Z\d]+/giu) ?? [];
  if (components.length === 0) return undefined;
  if (school === "yoga") {
    const book = match[2] ?? components[0];
    return completedStructure([
      structurePart("book", book, "Book", "卷", match.index),
    ]);
  }
  if (school.startsWith("tattvarth")) {
    return completedStructure([
      structurePart("chapter", components[0], "Chapter", "章", match.index),
    ]);
  }
  return completedStructure([
    structurePart("book", components[0], "Book", "卷", match.index),
    ...(components[1]
      ? [structurePart("chapter", components[1], "Chapter", "章", match.index)]
      : []),
  ]);
}

function specialLongWorkChapter(citationHead, englishWork, englishLocator) {
  if (
    englishWork === "Behaviorism"
    && /\bChapter\s+V\b/iu.test(citationHead)
    && /\bp\.\s*104\b/iu.test(citationHead)
  ) {
    return completedStructure([
      namedStructurePart(
        "chapter",
        "v",
        "Chapter V · Are There Any Human Instincts? Part I",
        "第 V 章 · 人类有本能吗？第一部分",
      ),
    ]);
  }

  if (englishWork === "Elements of Folk Psychology"
    && /\bIntroduction\b/iu.test(englishLocator)) {
    return completedStructure([
      namedStructurePart("introduction", "introduction", "Introduction", "导言"),
    ]);
  }

  if (englishWork === "Journals") {
    const entryMatch = citationHead.match(/\bJournals\s+([IVXLCDM]+\s+[A-Z]\s+\d+)\b/u);
    if (entryMatch) {
      return completedStructure([
        structurePart("journal-entry", entryMatch[1], "Journal entry", "日记条目", entryMatch.index),
      ]);
    }
  }

  if (englishWork === "Repetition") {
    const partMatch = citationHead.match(/\bPart\s+(One|Two)\b/iu);
    if (partMatch) {
      return completedStructure([
        structurePart("part", partMatch[1], "Part", "部分", partMatch.index),
      ]);
    }
  }

  if (englishWork === "Nationalism") {
    const chapterMatch = citationHead.match(/[“"](Nationalism in the [^”"]+)[”"]/iu);
    if (chapterMatch) {
      return completedStructure([
        namedStructurePart(
          "named-lecture",
          slug(chapterMatch[1]),
          chapterMatch[1],
          chapterMatch[1],
          chapterMatch.index,
        ),
      ]);
    }
  }

  if (englishWork === "Discourse on the Origin and Foundations of Inequality Among Men") {
    const noteMatch = citationHead.match(/\bNote\s+([IVXLCDM]+)\b/iu);
    if (noteMatch) {
      return completedStructure([
        structurePart("note", noteMatch[1], "Note", "注释", noteMatch.index),
      ]);
    }
  }

  if (englishWork === "The Teacher") {
    const chapterMatch = citationHead.match(/\bDe Magistro\s+([IVXLCDM]+)\.\d+\b/iu);
    if (chapterMatch) {
      return completedStructure([
        structurePart("chapter", chapterMatch[1], "Chapter", "章", chapterMatch.index),
      ]);
    }
  }

  if (englishWork === "Yoga Sutra") {
    const bookMatch = citationHead.match(/\bYoga Aphorisms\s+(\d+)\.\d+\b/iu);
    if (bookMatch) {
      return completedStructure([
        structurePart("book", bookMatch[1], "Book", "卷", bookMatch.index),
      ]);
    }
  }

  if (englishWork === "On Interpretation") {
    const chapterMatch = citationHead.match(/\bOn Interpretation\s+(\d+)\b/iu);
    if (chapterMatch) {
      return completedStructure([
        structurePart("chapter", chapterMatch[1], "Chapter", "章", chapterMatch.index),
      ]);
    }
  }

  if (englishWork === "Phenomenology of Spirit") {
    const paragraphMatch = citationHead.match(/§\s*(\d+)\b/u);
    const paragraph = paragraphMatch ? Number(paragraphMatch[1]) : undefined;
    const chapter = /Sense-Certainty/iu.test(citationHead)
      ? ["sense-certainty", "Sense-Certainty", "感性确定性"]
      : /Perception/iu.test(citationHead)
        ? ["perception", "Perception", "知觉"]
        : /Force and the Understanding/iu.test(citationHead)
          ? ["force-and-understanding", "Force and the Understanding", "力与知性"]
          : /Unhappy Consciousness/iu.test(citationHead)
            ? ["unhappy-consciousness", "Unhappy Consciousness", "苦恼意识"]
            : /Certainty and Truth of Reason/iu.test(citationHead)
              ? ["certainty-and-truth-of-reason", "Certainty and Truth of Reason", "理性的确定性与真理"]
              : paragraph !== undefined && paragraph >= 166 && paragraph < 197
                ? [
                  "independence-and-dependence-of-self-consciousness",
                  "Independence and Dependence of Self-Consciousness",
                  "自我意识的独立与依赖",
                ]
                : undefined;
    if (chapter) {
      return completedStructure([
        namedStructurePart("named-chapter", chapter[0], chapter[1], chapter[2]),
      ]);
    }
  }

  if (englishWork === "Moral Letters to Lucilius") {
    const letterMatch = citationHead.match(/\bLetter\s+(\d+)\b/iu);
    if (letterMatch) {
      return completedStructure([
        structurePart("letter", letterMatch[1], "Letter", "书信", letterMatch.index),
      ]);
    }
  }

  if (englishWork === "Outlines of Psychology") {
    const chapterMatch = citationHead.match(/§\s*(\d+)(?:\.\d+[a-z]?)?\b/iu);
    if (chapterMatch) {
      return completedStructure([
        structurePart("chapter", chapterMatch[1], "Chapter", "章", chapterMatch.index),
      ]);
    }
  }

  if (englishWork === "Classified Conversations of Master Zhu") {
    const volumeMatch = citationHead.match(/\bvol\.\s*(\d+)\b/iu);
    if (volumeMatch) {
      return completedStructure([
        structurePart("volume", volumeMatch[1], "Volume", "卷", volumeMatch.index),
      ]);
    }
  }

  if (englishWork === "Dialogue Concerning the Two Chief World Systems"
    || englishWork === "Discourses and Mathematical Demonstrations Relating to Two New Sciences") {
    const dayMatch = citationHead.match(/\b(First|Second|Third|Fourth)\s+Day\b/iu);
    if (dayMatch) {
      return completedStructure([
        structurePart("day", dayMatch[1], "Day", "日", dayMatch.index),
      ]);
    }
  }

  if (englishWork === "Reveries of the Solitary Walker") {
    const walkMatch = citationHead.match(
      /\b(First|Second|Third|Fourth|Fifth|Sixth|Seventh|Eighth|Ninth|Tenth)\s+Walk\b/iu,
    );
    if (walkMatch) {
      return completedStructure([
        structurePart("walk", walkMatch[1], "Walk", "漫步", walkMatch.index),
      ]);
    }
  }

  if (englishWork === "Human Nature and Conduct") {
    const partMatch = citationHead.match(/\bPart\s+(One|Two|Three|Four)\b/iu);
    const chapterMatch = citationHead.match(/[‘']([^’']+)[’']/u);
    if (partMatch && chapterMatch) {
      return completedStructure([
        structurePart("part", partMatch[1], "Part", "部分", partMatch.index),
        namedStructurePart(
          "named-chapter",
          slug(chapterMatch[1]),
          chapterMatch[1],
          chapterMatch[1],
          chapterMatch.index,
        ),
      ]);
    }
  }

  if (englishWork === "Animal Intelligence") {
    const chapterMatch = citationHead.match(/^[“"]([^”"]+)[”"]/u);
    if (chapterMatch) {
      return completedStructure([
        namedStructurePart(
          "named-chapter",
          slug(chapterMatch[1]),
          chapterMatch[1],
          chapterMatch[1],
          chapterMatch.index,
        ),
      ]);
    }
  }

  if (englishWork === "Twilight of the Idols") {
    const chapterMatch = citationHead.match(
      /\bTwilight of the Idols,\s+([^,]+),\s+§/iu,
    );
    if (chapterMatch) {
      return completedStructure([
        namedStructurePart(
          "named-chapter",
          slug(chapterMatch[1]),
          chapterMatch[1],
          chapterMatch[1],
          chapterMatch.index,
        ),
      ]);
    }
  }

  if (englishWork === "The Republic") {
    const match = citationHead.match(/\bRepublic\s+([IVXLCDM]+)\b/iu);
    if (match) {
      return completedStructure([
        structurePart("book", match[1], "Book", "卷", match.index),
      ]);
    }
  }

  if (englishWork === "The Gay Science") {
    const match = citationHead.match(/§{1,2}\s*(\d+)\b/u);
    if (match) {
      const section = Number(match[1]);
      const book = section <= 56 ? "I"
        : section <= 107 ? "II"
          : section <= 275 ? "III"
            : section <= 342 ? "IV"
              : "V";
      return completedStructure([structurePart("book", book, "Book", "卷", match.index)]);
    }
  }

  if (englishWork === "Critique of Pure Reason") {
    if (/\bB Preface\b/u.test(citationHead)) {
      return completedStructure([structurePart("preface", "B", "Preface", "序言")]);
    }
    const match = citationHead.match(/\bA(\d+)(?:\/B\d+)?\b/u);
    if (match) {
      const reference = Number(match[1]);
      const boundary = reference < 20
        ? ["introduction", "Introduction", "导言"]
        : reference < 50
          ? ["transcendental-aesthetic", "Transcendental Aesthetic", "先验感性论"]
          : reference < 200
            ? ["transcendental-logic-introduction", "Introduction to Transcendental Logic", "先验逻辑导言"]
            : reference < 500
              ? ["analytic-appendix", "Appendix to the Transcendental Analytic", "先验分析论附录"]
              : ["dialectic-appendix", "Appendix to the Transcendental Dialectic", "先验辩证论附录"];
      return completedStructure([
        structurePart(boundary[0], "", boundary[1], boundary[2], match.index),
      ]);
    }
  }

  if (englishWork === "On Protracted War" && /Initiative, Flexibility and Planning/iu.test(citationHead)) {
    return completedStructure([
      structurePart(
        "named-section",
        "Initiative, Flexibility and Planning",
        "Section",
        "节",
      ),
    ]);
  }

  if (englishWork === "On the Ten Major Relationships" && /concluding paragraph/iu.test(citationHead)) {
    return completedStructure([
      namedStructurePart("conclusion", "conclusion", "Conclusion", "结语"),
    ]);
  }

  if (englishWork === "Sidereus Nuncius") {
    const namedSections = [
      [
        /Medicean Stars/iu,
        "medicean-stars",
        "Medicean Stars",
        "美第奇星",
      ],
      [
        /fixed stars, the Milky Way, and nebulae/iu,
        "fixed-stars-milky-way-nebulae",
        "Fixed stars, the Milky Way, and nebulae",
        "恒星、银河与星云",
      ],
      [
        /observations of the Moon/iu,
        "observations-of-the-moon",
        "Observations of the Moon",
        "月球表面的观测",
      ],
    ];
    const namedSection = namedSections.find(([pattern]) => pattern.test(citationHead));
    if (namedSection) {
      return completedStructure([
        namedStructurePart(
          "named-section",
          namedSection[1],
          namedSection[2],
          namedSection[3],
        ),
      ]);
    }
  }

  if (englishWork === "Economic and Philosophic Manuscripts of 1844"
    && /Estranged Labour/iu.test(citationHead)) {
    return completedStructure([
      namedStructurePart(
        "named-section",
        "estranged-labour",
        "Estranged Labour",
        "异化劳动",
      ),
    ]);
  }

  if (englishWork === "Fear and Trembling" && /Preliminary Expectoration/iu.test(citationHead)) {
    return completedStructure([
      namedStructurePart(
        "named-section",
        "preliminary-expectoration",
        "Preliminary Expectoration",
        "初步倾诉",
      ),
    ]);
  }

  if (englishWork === "The Present Situation in Quantum Mechanics") {
    const partMatch = englishLocator.match(
      /corresponding German original[^;]*\bPart\s+([IVXLCDM]+)\b/iu,
    );
    if (partMatch) {
      return completedStructure([
        structurePart("part", partMatch[1], "Part", "部分", partMatch.index),
      ]);
    }
  }

  if (englishWork === "“Phenomenology” (Encyclopaedia Britannica)") {
    const partMatch = citationHead.match(/\bPart\s+([IVXLCDM]+)\b/iu);
    if (partMatch) {
      return completedStructure([
        structurePart("part", partMatch[1], "Part", "部分", partMatch.index),
      ]);
    }
  }

  if (englishWork === "Tractatus Logico-Philosophicus") {
    const propositionMatch = citationHead.match(/\bTractatus\s+(\d+)(?:\.\d+)?\b/iu);
    if (propositionMatch) {
      return completedStructure([
        structurePart(
          "major-proposition",
          propositionMatch[1],
          "Major proposition",
          "主命题",
          propositionMatch.index,
        ),
      ]);
    }
  }

  return undefined;
}

function hierarchicalContainingChapter(citationHead) {
  const matches = Object.fromEntries(
    numberedStructureDefinitions.map((definition) => {
      const match = citationHead.match(definition.pattern);
      return [
        definition.kind,
        match && !isEditionPart(citationHead, match, definition.kind)
          ? structurePart(
            definition.kind,
            match[1],
            definition.en,
            definition.zh,
            match.index,
          )
          : undefined,
      ];
    }),
  );
  const ordinalEssay = firstOrdinalStructure(citationHead, "essay");
  if (ordinalEssay) matches.essay = ordinalEssay;
  const definitiveArticleMatch = citationHead.match(
    new RegExp(`\\b(${ordinalWords})\\s+(?:definitive\\s+)?article\\b`, "iu"),
  );
  if (definitiveArticleMatch) {
    matches.article = structurePart(
      "article",
      definitiveArticleMatch[1],
      "Article",
      "条",
      definitiveArticleMatch.index,
    );
  }
  const fixed = fixedStructureDefinitions
    .map((definition) => {
      const match = citationHead.match(definition.pattern);
      return match
        ? structurePart(definition.kind, "", definition.en, definition.zh, match.index)
        : undefined;
    })
    .filter(Boolean)
    .sort((left, right) => left.index - right.index)[0];

  for (const preferred of [
    "chapter",
    "essay",
    "lecture",
    "discourse",
    "article",
    "meditation",
    "canto",
    "hymn",
  ]) {
    if (!matches[preferred]) continue;
    const scopes = [matches.book, matches.part];
    if (preferred === "lecture") scopes.push(matches.lesson);
    if (preferred === "hymn") scopes.unshift(matches.mandala);
    scopes.push(matches[preferred]);
    return completedStructure(scopes.filter(Boolean));
  }
  if (matches.part) {
    return completedStructure([fixed, matches.book, matches.part].filter(Boolean));
  }
  if (matches.book) {
    return completedStructure([fixed, matches.book].filter(Boolean));
  }
  return fixed ? completedStructure([fixed]) : undefined;
}

export function structuralLocator(englishLocator, thought) {
  const englishWork = thought.englishWork;
  const citationHead = englishLocator.split(";")[0].trim();

  const composite = compositeContainingUnit(thought.id);
  if (composite) return composite;

  if (shortWholeWorkPatterns.some((pattern) => pattern.test(englishWork))) {
    return wholeWorkStructure();
  }

  const chineseChapter = namedChapterForChineseThought(thought);
  if (chineseChapter) return chineseChapter;

  const workSpecific = workSpecificContainingUnit(citationHead, englishWork);
  if (workSpecific) return workSpecific;

  if (englishWork === "Philosophiæ Naturalis Principia Mathematica") {
    if (/\bGeneral Scholium\b/iu.test(citationHead)) {
      return completedStructure([
        structurePart("book", "III", "Book", "卷"),
        namedStructurePart(
          "named-section",
          "general-scholium",
          "General Scholium",
          "总释",
        ),
      ]);
    }
    if (/\bRules of Reasoning in Philosophy\b/iu.test(citationHead)) {
      return completedStructure([
        structurePart("book", "III", "Book", "卷"),
        namedStructurePart(
          "named-section",
          "rules-of-reasoning-in-philosophy",
          "Rules of Reasoning in Philosophy",
          "哲学推理规则",
        ),
      ]);
    }
  }

  // An abstract is an exact quotation anchor inside a paper, not a standalone
  // reading unit. The complete article remains the containing unit even when
  // the registered source route opens on an abstract landing page.
  if (/\babstract\b/iu.test(citationHead)) return wholeWorkStructure();

  const fragmentMatch = citationHead.match(
    /\b(?:fragment\s+)?DK\s+(\d+\s+B\d+(?:\.\d+)?(?:\s*(?:and|[–—-])\s*(?:B)?\d+(?:\.\d+)?)?)/iu,
  );
  if (fragmentMatch) {
    return completedStructure([
      structurePart("fragment", fragmentMatch[1], "Fragment", "残篇", fragmentMatch.index),
    ]);
  }

  const special = specialLongWorkChapter(citationHead, englishWork, englishLocator)
    ?? classicContainingChapter(citationHead, englishWork)
    ?? sutraContainingChapter(citationHead);
  if (special) return special;

  if (englishWork === "Experimental Researches in Electricity") {
    const match = citationHead.match(
      /\bVolume\s+([IVXLCDM]+),\s+([A-Za-z-]+)\s+Series\b/iu,
    );
    if (match) {
      return completedStructure([
        structurePart("volume", match[1], "Volume", "卷", match.index),
        structurePart("series", match[2], "Series", "组", match.index),
      ]);
    }
  }

  if (englishWork === "The German Ideology") {
    const match = citationHead.match(
      /\bVolume\s+([IVXLCDM]+),\s+Part\s+([IVXLCDM]+(?:\.[A-Z]+)?)\b/iu,
    );
    if (match) {
      return completedStructure([
        structurePart("volume", match[1], "Volume", "卷", match.index),
        structurePart("part", match[2], "Part", "部分", match.index),
      ]);
    }
  }

  const ethicsScopeMatch = citationHead.match(/\bEthics\s+([IVXLCDM]+)\b/iu);
  if (/^Ethics$/iu.test(englishWork) && ethicsScopeMatch) {
    return completedStructure([
      structurePart("part", ethicsScopeMatch[1], "Part", "部分", ethicsScopeMatch.index),
    ]);
  }

  const numberedSection = numberedSectionForLongWork(citationHead, englishWork);
  if (numberedSection) return numberedSection;

  const hierarchy = hierarchicalContainingChapter(citationHead);
  return hierarchy ?? wholeWorkStructure();
}

function digest(value, length = 8) {
  return createHash("sha256").update(value).digest("hex").slice(0, length);
}

function idForGroup(groupKey, work, structureKey) {
  return `ru-${slug(work, "work")}-${slug(structureKey)}-${digest(groupKey)}`;
}

function uniqueByUrl(links, primaryUrl) {
  const seen = new Set([primaryUrl]);
  const result = [];
  for (const link of links) {
    const url = normalizedUrl(link.href);
    if (seen.has(url)) continue;
    seen.add(url);
    result.push({
      url,
      label: link.label,
      englishLabel: link.englishLabel,
    });
  }
  return result;
}

function compositeSourceSegments(evidence) {
  const counts = {
    "psychology-foundations-pavlov-acquisition-extinction": 2,
    "wittgenstein-picture-reality": 2,
  };
  const count = counts[evidence.id];
  if (!count) return undefined;
  const segments = evidence.referenceLinks.slice(0, count).map((link) => ({
    url: normalizedUrl(link.href),
  }));
  if (segments.length !== count || new Set(segments.map(({ url }) => url)).size !== count) {
    throw new Error(`${evidence.id} needs ${count} distinct ordered source segments`);
  }
  return segments;
}

async function loadCatalog() {
  const completeEconomics = await loadCompleteEconomicsCatalog();
  const thoughts = [
    ...allThoughts.filter((thought) => !thought.id.startsWith("economics-")),
    ...completeEconomics.thoughts,
  ];
  const libraryByThoughtId = new Map();
  for (const libraryId of contentLibraryIds) {
    const libraryThoughts = libraryId === "economics"
      ? completeEconomics.thoughts
      : contentLibraries[libraryId].thoughts;
    for (const thought of libraryThoughts) {
      if (libraryByThoughtId.has(thought.id)) {
        throw new Error(`Thought ${thought.id} appears in more than one library`);
      }
      libraryByThoughtId.set(thought.id, libraryId);
    }
  }
  return { thoughts, libraryByThoughtId };
}

export async function buildReadingUnitInventory() {
  const catalog = await loadCatalog();
  const thoughtById = new Map(catalog.thoughts.map((thought) => [thought.id, thought]));
  const groups = new Map();

  for (const evidence of verifiedSourcePassages) {
    const thought = thoughtById.get(evidence.id);
    if (!thought) throw new Error(`Verified thought ${evidence.id} is absent from the catalog`);
    const libraryId = catalog.libraryByThoughtId.get(evidence.id);
    if (!libraryId) throw new Error(`Verified thought ${evidence.id} has no library`);
    const primaryLink = evidence.referenceLinks[0];
    if (!primaryLink) throw new Error(`Verified thought ${evidence.id} has no primary source URL`);
    const metadata = sourceMetadataForThought(thought);
    const locator = {
      zh: metadata.locator,
      en: metadata.englishLocator,
    };
    const structure = structuralLocator(locator.en, thought);
    const sourceUrl = normalizedUrl(primaryLink.href);
    const groupKey = [
      normalizedToken(thought.englishWork),
      sourceGroupingKey(sourceUrl, thought.englishWork),
      structure.structureKey,
    ].join("\u001f");
    const record = {
      evidence,
      thought,
      libraryId,
      locator,
      structure,
      sourceUrl,
      primaryLink,
      metadata,
      sourceSegments: compositeSourceSegments(evidence),
    };
    const group = groups.get(groupKey) ?? [];
    group.push(record);
    groups.set(groupKey, group);
  }

  const thoughtMap = {};
  const units = [...groups.entries()]
    .sort(([left], [right]) => left.localeCompare(right, "en"))
    .map(([groupKey, records]) => {
      records.sort((left, right) => left.thought.id.localeCompare(right.thought.id, "en"));
      const first = records[0];
      const unitId = idForGroup(
        groupKey,
        first.thought.englishWork,
        first.structure.structureKey,
      );
      const useBasisKinds = [...new Set(records.map(({ evidence }) => evidence.useBasis.kind))]
        .sort();
      const thoughtIds = records.map(({ thought }) => thought.id);
      const libraryIds = [...new Set(records.map(({ libraryId }) => libraryId))].sort();
      const availability = useBasisKinds.includes("quotation-exception")
        ? "source-route"
        : "integrated-candidate";
      const allLinks = records.flatMap(({ evidence }) => evidence.referenceLinks);
      for (const record of records) {
        if (thoughtMap[record.thought.id]) {
          throw new Error(`Verified thought ${record.thought.id} maps more than once`);
        }
        thoughtMap[record.thought.id] = {
          unitId,
          locator: record.locator,
          originalField: record.evidence.originalField,
          useBasis: record.evidence.useBasis.kind,
        };
      }
      return {
        id: unitId,
        work: {
          zh: first.thought.work,
          en: first.thought.englishWork,
        },
        libraryIds,
        availability,
        locator: first.structure,
        source: {
          url: first.sourceUrl,
          label: first.primaryLink.label,
          englishLabel: first.primaryLink.englishLabel,
          additionalLinks: uniqueByUrl(allLinks, first.sourceUrl),
          ...(first.sourceSegments ? { segments: first.sourceSegments } : {}),
        },
        edition: {
          zh: first.evidence.referenceEdition.zh,
          en: first.evidence.referenceEdition.en,
        },
        useBasisKinds,
        thoughtIds,
        expectedUnitFile: {
          publicPath: `public/readings/units/${unitId}.json`,
          href: `/readings/units/${unitId}.json`,
        },
      };
    });

  const inventory = {
    schemaVersion: 1,
    generatedOn: GENERATED_ON,
    catalogThoughtCount: catalog.thoughts.length,
    verifiedThoughtCount: verifiedSourcePassages.length,
    unitCount: units.length,
    thoughtMap: Object.fromEntries(
      Object.entries(thoughtMap).sort(([left], [right]) => left.localeCompare(right, "en")),
    ),
    units,
  };

  if (inventory.catalogThoughtCount !== EXPECTED_CATALOG_COUNT) {
    throw new Error(`Expected ${EXPECTED_CATALOG_COUNT} catalog thoughts, found ${inventory.catalogThoughtCount}`);
  }
  if (inventory.verifiedThoughtCount !== EXPECTED_VERIFIED_COUNT) {
    throw new Error(`Expected ${EXPECTED_VERIFIED_COUNT} verified thoughts, found ${inventory.verifiedThoughtCount}`);
  }
  if (Object.keys(inventory.thoughtMap).length !== EXPECTED_VERIFIED_COUNT) {
    throw new Error("The verified thought map is incomplete or contains duplicate IDs");
  }
  if (inventory.unitCount < MIN_UNIT_COUNT || inventory.unitCount > MAX_UNIT_COUNT) {
    throw new Error(
      `Expected ${MIN_UNIT_COUNT}-${MAX_UNIT_COUNT} reading units, built ${inventory.unitCount}`,
    );
  }
  return inventory;
}

export async function writeReadingUnitInventory() {
  const inventory = await buildReadingUnitInventory();
  const serialized = `${JSON.stringify(inventory, null, 2)}\n`;
  await Promise.all([
    mkdir(path.dirname(RESEARCH_OUTPUT), { recursive: true }),
    mkdir(path.dirname(PUBLIC_OUTPUT), { recursive: true }),
  ]);
  await Promise.all([
    writeFile(RESEARCH_OUTPUT, serialized),
    writeFile(PUBLIC_OUTPUT, serialized),
  ]);
  return inventory;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const inventory = await writeReadingUnitInventory();
  console.log(
    `Reading-unit inventory: ${inventory.verifiedThoughtCount} thoughts -> ${inventory.unitCount} units`,
  );
}
