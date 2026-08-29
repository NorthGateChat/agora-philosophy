#!/usr/bin/env node

import { createHash } from "node:crypto";
import { mkdir, readFile, readdir, rename, stat, writeFile } from "node:fs/promises";
import { gzipSync } from "node:zlib";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { Converter as ChineseConverter } from "opencc-js/t2cn";

const scriptPath = fileURLToPath(import.meta.url);
const defaultProjectRoot = resolve(dirname(scriptPath), "..");
const edgeChromePattern = /^(?:home|.*home page.*|browse and comment|search|buy books and cd-roms|help|easy to print version\.?|produced by\b.*|transcriber's? notes?:?|for other english-language translations of this work, see\b.*|translation:|.*project gutenberg.*|copyright|©|&copy;.*|skip to (?:main )?content|.*(?:←|◄).*(?:→|►).*|public domain(?:\s+public domain)?(?:\s+(?:true|false)){1,})$/iu;
const simplifyChinese = ChineseConverter({ from: "tw", to: "cn" });

function normalizedExcerpt(value) {
  return String(value ?? "")
    .normalize("NFKC")
    .split("")
    .map((character) => simplifyChinese(character))
    .join("")
    .toLocaleLowerCase("en")
    .replace(/\p{Cf}/gu, "")
    .replace(/[“”„‟«»「」『』‘’‚‛]/gu, '"')
    .replace(/[‐‑‒–—―]/gu, "-")
    .replace(/\s+/gu, "")
    .replace(/[\p{P}\p{S}]/gu, "");
}

function beginsInsideSentence(value) {
  const text = String(value ?? "")
    .trim()
    .replace(/^p\s+\d+\s+/iu, "");
  return /^[a-z]/u.test(text)
    && !/^(?:appendix|article|book|chapter|conclusion|essay|forethought|introduction|lecture|lesson|part|postscript|preface|prologue|section|volume)\b/iu.test(text);
}

async function atomicWrite(path, contents) {
  await mkdir(dirname(path), { recursive: true });
  const temporary = `${path}.${process.pid}.${Date.now()}.tmp`;
  await writeFile(temporary, contents);
  await rename(temporary, path);
}

function anchorFailure(document, metadata, thoughtId) {
  const anchor = document.anchors?.[thoughtId];
  const paragraph = document.paragraphs.find(({ id }) => id === anchor?.paragraphId);
  if (!paragraph) return "missing-paragraph";
  if (!Number.isInteger(anchor.start) || !Number.isInteger(anchor.end)) return "missing-offset";
  if (anchor.start < 0 || anchor.end <= anchor.start || anchor.end > paragraph.text.length) {
    return "invalid-offset";
  }
  if (!anchor.quote?.trim()) return "missing-quote";
  const selectedSegments = Array.isArray(anchor.segments) && anchor.segments.length > 0
    ? anchor.segments
    : [{
        paragraphId: anchor.paragraphId,
        start: anchor.start,
        end: anchor.end,
      }];
  if (Array.isArray(anchor.segments) && anchor.segments.length > 0) {
    const paragraphIndexById = new Map(document.paragraphs.map(({ id }, index) => [id, index]));
    let previousParagraphIndex = -1;
    let previousEnd = -1;
    for (const [segmentIndex, segment] of anchor.segments.entries()) {
      const segmentParagraph = document.paragraphs.find(({ id }) => id === segment?.paragraphId);
      if (!segmentParagraph) return `segment-${segmentIndex + 1}-missing-paragraph`;
      if (
        !Number.isInteger(segment.start)
        || !Number.isInteger(segment.end)
        || segment.start < 0
        || segment.end <= segment.start
        || segment.end > segmentParagraph.text.length
      ) return `segment-${segmentIndex + 1}-invalid-offset`;
      const paragraphIndex = paragraphIndexById.get(segment.paragraphId);
      if (
        paragraphIndex < previousParagraphIndex
        || (paragraphIndex === previousParagraphIndex && segment.start < previousEnd)
      ) return `segment-${segmentIndex + 1}-out-of-order`;
      const literal = segmentParagraph.text.slice(segment.start, segment.end);
      if (segment.text !== undefined && segment.text !== literal) {
        return `segment-${segmentIndex + 1}-text-drift`;
      }
      previousParagraphIndex = paragraphIndex;
      previousEnd = segment.end;
    }
    const first = anchor.segments[0];
    if (
      first.paragraphId !== anchor.paragraphId
      || first.start !== anchor.start
      || first.end !== anchor.end
    ) return "primary-range-does-not-match-first-segment";
  }
  const selected = selectedSegments.map((segment) => {
    const selectedParagraph = document.paragraphs.find(({ id }) => id === segment.paragraphId);
    return selectedParagraph?.text.slice(segment.start, segment.end) ?? "";
  }).join(" ");
  if (normalizedExcerpt(selected) !== normalizedExcerpt(anchor.quote)) {
    return "offset-text-does-not-match-quote";
  }
  return undefined;
}

export async function auditReadingUnits(rawOptions = {}) {
  const projectRoot = resolve(rawOptions.projectRoot ?? defaultProjectRoot);
  const indexPath = resolve(projectRoot, rawOptions.indexPath ?? "public/readings/index.json");
  const unitsDirectory = resolve(projectRoot, rawOptions.unitsDirectory ?? "public/readings/units");
  const index = JSON.parse(await readFile(indexPath, "utf8"));
  const metadataById = new Map(index.units.map((unit) => [unit.id, unit]));
  const expectedIds = new Set(index.units
    .filter(({ availability }) => availability === "integrated-candidate")
    .map(({ id }) => id));
  const names = (await readdir(unitsDirectory)).filter((name) => name.endsWith(".json")).sort();
  const records = [];
  const rawBuffers = [];

  for (const name of names) {
    const path = resolve(unitsDirectory, name);
    const raw = await readFile(path);
    rawBuffers.push(raw);
    const document = JSON.parse(raw.toString("utf8"));
    const metadata = metadataById.get(document.id);
    const paragraphCharacters = document.paragraphs?.reduce(
      (sum, paragraph) => sum + String(paragraph.text ?? "").length,
      0,
    ) ?? 0;
    records.push({
      id: document.id,
      name,
      bytes: (await stat(path)).size,
      paragraphCount: document.paragraphs?.length ?? 0,
      paragraphCharacters,
      contentHash: document.contentHash,
      selectionMethod: document.selectionMethod,
      sourceUrl: metadata?.source?.url,
      locatorKey: metadata?.locator?.structureKey,
      libraryIds: metadata?.libraryIds ?? [],
      thoughtIds: metadata?.thoughtIds ?? [],
      edgeParagraphs: [
        ...(document.paragraphs?.slice(0, 8) ?? []),
        ...(document.paragraphs?.slice(-8) ?? []),
      ].map(({ text }) => text),
      anchorFailures: (metadata?.thoughtIds ?? []).flatMap((thoughtId) => {
        const reason = anchorFailure(document, metadata, thoughtId);
        return reason ? [{ thoughtId, reason }] : [];
      }),
    });
  }

  const ids = new Set(records.map(({ id }) => id));
  const sourceCounts = new Map();
  for (const unit of index.units) {
    sourceCounts.set(unit.source.url, (sourceCounts.get(unit.source.url) ?? 0) + 1);
  }
  const duplicateGroups = new Map();
  for (const record of records) {
    if (!record.sourceUrl || !record.contentHash) continue;
    const key = `${record.sourceUrl}\u0000${record.contentHash}`;
    const group = duplicateGroups.get(key) ?? [];
    group.push(record.id);
    duplicateGroups.set(key, group);
  }

  const duplicateBodies = [...duplicateGroups.entries()]
    .filter(([, ids]) => ids.length > 1)
    .map(([key, ids]) => ({ sourceUrl: key.split("\u0000")[0], contentHash: key.split("\u0000")[1], ids }));
  const anchorFailures = records.flatMap((record) => record.anchorFailures.map((failure) => ({
    unitId: record.id,
    ...failure,
  })));
  const chromeFindings = records
    .filter(({ edgeParagraphs }) => edgeParagraphs.some((text) => edgeChromePattern.test(String(text).trim())))
    .map(({ id, edgeParagraphs }) => ({
      id,
      matches: edgeParagraphs.filter((text) => edgeChromePattern.test(String(text).trim())),
    }));
  const boundaryRisks = records
    .filter((record) => (
      record.locatorKey !== "whole-work"
      && (
        (
          record.selectionMethod === "whole-document"
          && (record.paragraphCharacters > 80_000 || (sourceCounts.get(record.sourceUrl) ?? 0) > 1)
        )
        || beginsInsideSentence(record.edgeParagraphs[0])
        || (
          record.selectionMethod === "quote-guided-boundary"
          && /[\p{L}\p{N}]$/u.test(String(record.edgeParagraphs.at(-1) ?? "").trim())
        )
      )
    ))
    .map(({ id, sourceUrl, locatorKey, paragraphCount, paragraphCharacters }) => ({
      id,
      sourceUrl,
      locatorKey,
      paragraphCount,
      paragraphCharacters,
    }));
  const perLibrary = {};
  for (const record of records) {
    for (const libraryId of record.libraryIds) {
      const entry = perLibrary[libraryId] ?? { units: 0, thoughts: 0, bytes: 0 };
      entry.units += 1;
      entry.thoughts += record.thoughtIds.length;
      entry.bytes += record.bytes;
      perLibrary[libraryId] = entry;
    }
  }
  const combined = Buffer.concat(rawBuffers);
  const report = {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    inventory: {
      units: index.unitCount,
      integratedCandidates: expectedIds.size,
      sourceRoutes: index.units.filter(({ availability }) => availability === "source-route").length,
    },
    summary: {
      bodies: records.length,
      missingBodies: [...expectedIds].filter((id) => !ids.has(id)).length,
      orphanBodies: records.filter(({ id }) => !expectedIds.has(id)).length,
      anchors: records.reduce((sum, record) => sum + record.thoughtIds.length, 0),
      anchorFailures: anchorFailures.length,
      duplicateBodies: duplicateBodies.length,
      chromeFindings: chromeFindings.length,
      boundaryRisks: boundaryRisks.length,
      rawBytes: combined.byteLength,
      gzipBytes: combined.byteLength ? gzipSync(combined, { level: 9 }).byteLength : 0,
      contentDigest: createHash("sha256").update(combined).digest("hex"),
    },
    perLibrary,
    missingBodies: [...expectedIds].filter((id) => !ids.has(id)).sort(),
    orphanBodies: records.filter(({ id }) => !expectedIds.has(id)).map(({ id }) => id).sort(),
    anchorFailures,
    duplicateBodies,
    chromeFindings,
    boundaryRisks,
    largestBodies: [...records]
      .sort((left, right) => right.bytes - left.bytes)
      .slice(0, 30)
      .map((record) => Object.fromEntries(Object.entries(record).filter(([key]) => (
        key !== "edgeParagraphs" && key !== "anchorFailures"
      )))),
  };
  return report;
}

async function main() {
  const report = await auditReadingUnits();
  const outputPath = resolve(defaultProjectRoot, "research/reading-units/body-audit.json");
  await atomicWrite(outputPath, `${JSON.stringify(report, null, 2)}\n`);
  console.log(JSON.stringify(report.summary));
  if (
    report.summary.missingBodies
    || report.summary.orphanBodies
    || report.summary.anchorFailures
    || report.summary.duplicateBodies
    || report.summary.chromeFindings
    || report.summary.boundaryRisks
  ) {
    process.exitCode = 1;
  }
}

if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) {
  await main();
}
