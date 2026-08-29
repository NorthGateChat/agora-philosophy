import assert from "node:assert/strict";
import { gzipSync } from "node:zlib";
import { readdir, readFile, stat } from "node:fs/promises";
import { dirname, extname, resolve } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { Converter as ChineseConverter } from "opencc-js/t2cn";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const readingsRoot = resolve(projectRoot, "public/readings");
const unitsRoot = resolve(readingsRoot, "units");
const index = JSON.parse(await readFile(resolve(readingsRoot, "index.json"), "utf8"));
const simplifyChinese = ChineseConverter({ from: "tw", to: "cn" });
const unitNames = (await readdir(unitsRoot)).sort();
const expectedIntegrated = index.units
  .filter(({ availability }) => availability === "integrated-candidate")
  .map(({ id }) => `${id}.json`)
  .sort();
const edgeChromePattern = /^(?:home|.*home page.*|browse and comment|search|buy books and cd-roms|help|easy to print version\.?|produced by\b.*|transcriber's? notes?:?|for other english-language translations of this work, see\b.*|translation:|.*project gutenberg.*|copyright|©|&copy;.*|skip to (?:main )?content|.*(?:←|◄).*(?:→|►).*|public domain(?:\s+public domain)?(?:\s+(?:true|false)){1,})$/iu;

function normalizedExcerpt(value) {
  return String(value ?? "")
    .normalize("NFKC")
    .split("")
    .map((character) => simplifyChinese(character))
    .join("")
    .toLocaleLowerCase("en")
    .replace(/[“”„‟«»「」『』‘’‚‛]/gu, '"')
    .replace(/[‐‑‒–—―]/gu, "-")
    .replace(/\s+/gu, "")
    .replace(/[\p{P}\p{S}]/gu, "");
}

function beginsInsideSentence(value) {
  const text = String(value ?? "").trim();
  return /^[a-z]/u.test(text)
    && !/^(?:appendix|article|book|chapter|conclusion|essay|forethought|introduction|lecture|lesson|part|postscript|preface|prologue|section|volume)\b/iu.test(text);
}

test("every integrated reading route has one bounded JSON body and no orphan asset", async () => {
  assert.deepEqual(
    unitNames,
    expectedIntegrated,
    "public reading bodies must exactly match integrated inventory entries",
  );
  assert.ok(unitNames.length > 0, "the integrated reader must ship at least one prepared unit");
  assert.ok(
    unitNames.every((name) => extname(name) === ".json"),
    "PDF, DJVU, EPUB, scans, and other research artifacts must never enter public/readings/units",
  );
});

test("all embedded cards resolve to a real paragraph and an exact bounded range", async () => {
  const metadataById = new Map(index.units.map((unit) => [unit.id, unit]));
  for (const name of unitNames) {
    const path = resolve(unitsRoot, name);
    const document = JSON.parse(await readFile(path, "utf8"));
    const metadata = metadataById.get(document.id);
    assert.ok(metadata, `${name} must be registered in the public index`);
    assert.equal(name, `${document.id}.json`);
    assert.equal(document.schemaVersion, 1, `${name} must use schema version 1`);
    assert.ok(document.source?.sha256, `${name} must preserve a source digest`);
    assert.ok(document.contentHash, `${name} must preserve a content digest`);
    assert.ok(document.inputHash, `${name} must preserve a resumable input digest`);
    assert.ok(Array.isArray(document.paragraphs) && document.paragraphs.length > 0);

    const paragraphById = new Map(document.paragraphs.map((paragraph) => [paragraph.id, paragraph]));
    const paragraphIndexById = new Map(document.paragraphs.map((paragraph, index) => [paragraph.id, index]));
    assert.equal(paragraphById.size, document.paragraphs.length, `${name} has duplicate paragraph IDs`);
    for (const thoughtId of metadata.thoughtIds) {
      const anchor = document.anchors?.[thoughtId];
      assert.ok(anchor?.paragraphId, `${name} does not anchor ${thoughtId}`);
      const paragraph = paragraphById.get(anchor.paragraphId);
      assert.ok(paragraph, `${name} points ${thoughtId} to a missing paragraph`);
      assert.ok(Number.isInteger(anchor.start) && anchor.start >= 0, `${thoughtId} needs a start offset`);
      assert.ok(
        Number.isInteger(anchor.end) && anchor.end > anchor.start && anchor.end <= paragraph.text.length,
        `${thoughtId} needs an in-range end offset`,
      );
      const segments = Array.isArray(anchor.segments) && anchor.segments.length > 0
        ? anchor.segments
        : [{
            paragraphId: anchor.paragraphId,
            start: anchor.start,
            end: anchor.end,
            text: paragraph.text.slice(anchor.start, anchor.end),
          }];
      assert.deepEqual(
        {
          paragraphId: segments[0].paragraphId,
          start: segments[0].start,
          end: segments[0].end,
        },
        {
          paragraphId: anchor.paragraphId,
          start: anchor.start,
          end: anchor.end,
        },
        `${thoughtId} primary range must equal its first real segment`,
      );

      let previousParagraphIndex = -1;
      let previousEnd = -1;
      const selected = segments.map((segment, segmentIndex) => {
        const segmentParagraph = paragraphById.get(segment.paragraphId);
        assert.ok(segmentParagraph, `${thoughtId} segment ${segmentIndex + 1} points to a missing paragraph`);
        assert.ok(
          Number.isInteger(segment.start)
            && Number.isInteger(segment.end)
            && segment.start >= 0
            && segment.end > segment.start
            && segment.end <= segmentParagraph.text.length,
          `${thoughtId} segment ${segmentIndex + 1} needs an in-range offset`,
        );
        const paragraphIndex = paragraphIndexById.get(segment.paragraphId);
        assert.ok(
          paragraphIndex > previousParagraphIndex
            || (paragraphIndex === previousParagraphIndex && segment.start >= previousEnd),
          `${thoughtId} segments must remain in source order without overlap`,
        );
        previousParagraphIndex = paragraphIndex;
        previousEnd = segment.end;
        const literal = segmentParagraph.text.slice(segment.start, segment.end);
        if (segment.text !== undefined) {
          assert.equal(segment.text, literal, `${thoughtId} segment ${segmentIndex + 1} text drifted`);
        }
        return literal;
      }).join(" ");
      assert.equal(
        normalizedExcerpt(selected),
        normalizedExcerpt(anchor.quote),
        `${thoughtId} offsets must select its recorded quote`,
      );
    }
  }
});

test("different units from one source never publish the same whole document", async () => {
  const seen = new Map();
  for (const name of unitNames) {
    const document = JSON.parse(await readFile(resolve(unitsRoot, name), "utf8"));
    const registered = index.units.find(({ id }) => id === document.id);
    const sourceUrl = registered?.source?.url;
    if (!sourceUrl) continue;
    const key = `${sourceUrl}\u0000${document.contentHash}`;
    const previous = seen.get(key);
    assert.equal(
      previous,
      undefined,
      `${name} and ${previous} duplicate one source document instead of selecting their containing chapters`,
    );
    seen.set(key, name);
  }
});

test("prepared texts trim source-site and ebook chrome from their edges", async () => {
  for (const name of unitNames) {
    const document = JSON.parse(await readFile(resolve(unitsRoot, name), "utf8"));
    const edges = [
      ...document.paragraphs.slice(0, 8),
      ...document.paragraphs.slice(-8),
    ];
    const chrome = edges.filter(({ text }) => edgeChromePattern.test(text.trim()));
    assert.deepEqual(chrome, [], `${name} retains source-site chrome at a reading boundary`);
  }
});

test("prepared non-whole units do not begin or end inside a sentence", async () => {
  const metadataById = new Map(index.units.map((unit) => [unit.id, unit]));
  for (const name of unitNames) {
    const document = JSON.parse(await readFile(resolve(unitsRoot, name), "utf8"));
    const metadata = metadataById.get(document.id);
    if (metadata?.locator?.structureKey === "whole-work") continue;
    const first = String(document.paragraphs[0]?.text ?? "").trim();
    const last = String(document.paragraphs.at(-1)?.text ?? "").trim();
    assert.equal(beginsInsideSentence(first), false, `${name} begins inside a sentence`);
    if (document.selectionMethod === "quote-guided-boundary") {
      assert.doesNotMatch(last, /[\p{L}\p{N}]$/u, `${name} ends inside a sentence`);
    }
  }
});

test("prepared chapter assets remain within the release budget", async () => {
  const buffers = await Promise.all(unitNames.map((name) => readFile(resolve(unitsRoot, name))));
  const rawBytes = buffers.reduce((sum, buffer) => sum + buffer.byteLength, 0);
  const compressedBytes = gzipSync(Buffer.concat(buffers), { level: 9 }).byteLength;
  const sizes = await Promise.all(unitNames.map(async (name) => ({
    name,
    bytes: (await stat(resolve(unitsRoot, name))).size,
  })));

  assert.ok(rawBytes <= 32 * 1024 * 1024, `reading bodies use ${rawBytes} raw bytes`);
  assert.ok(compressedBytes <= 12 * 1024 * 1024, `reading bodies use ${compressedBytes} gzip bytes`);
  assert.ok(
    sizes.every(({ bytes }) => bytes <= 600 * 1024),
    `oversized reading unit: ${sizes.sort((a, b) => b.bytes - a.bytes)[0]?.name}`,
  );
});
