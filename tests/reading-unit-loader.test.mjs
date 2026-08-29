import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { tsImport } from "tsx/esm/api";

const loader = await tsImport("../content/readingUnitLoader.ts", import.meta.url);

function inventoryEntry(overrides = {}) {
  return {
    id: "unit-a",
    work: { zh: "《测试篇章》", en: "Test Passage" },
    libraryIds: ["western"],
    availability: "integrated-candidate",
    locator: { structureKey: "chapter-1", zh: "第一章", en: "Chapter I" },
    source: {
      url: "https://example.test/original",
      label: "原始来源",
      englishLabel: "Primary source",
      additionalLinks: [],
    },
    edition: { zh: "测试版", en: "Test edition" },
    useBasisKinds: ["public-domain"],
    thoughtIds: ["thought-a"],
    expectedUnitFile: {
      publicPath: "public/readings/units/unit-a.json",
      href: "/readings/units/unit-a.json",
    },
    ...overrides,
  };
}

function inventory(unitOverrides = {}) {
  return {
    schemaVersion: 1,
    generatedOn: "2026-08-28",
    catalogThoughtCount: 1,
    verifiedThoughtCount: 1,
    unitCount: 1,
    thoughtMap: {
      "thought-a": {
        unitId: "unit-a",
        locator: { zh: "第一章，第 2 段", en: "Chapter I, paragraph 2" },
        originalField: "english",
        useBasis: "public-domain",
      },
    },
    units: [inventoryEntry(unitOverrides)],
  };
}

function unitBody() {
  return {
    schemaVersion: 1,
    id: "unit-a",
    title: "测试篇章",
    englishTitle: "Test Passage",
    sourceUrl: "https://example.test/original",
    preparedSourceUrl: "https://prepared.test/passage",
    source: {
      url: "https://prepared.test/passage",
      retrievalUrl: "https://prepared.test/api/passage",
      sha256: "a".repeat(64),
    },
    paragraphs: [
      { id: "p-1", text: "The argument begins here." },
      { id: "p-2", text: "The exact thought appears in this paragraph." },
    ],
    anchors: {
      "thought-a": {
        paragraphId: "p-2",
        start: 4,
        end: 17,
        quote: "exact thought",
        match: "normalized-exact",
      },
    },
  };
}

function jsonResponse(value, status = 200) {
  return new Response(JSON.stringify(value), {
    status,
    headers: { "content-type": "application/json" },
  });
}

test("the checked-in reading inventory conforms to the runtime index contract", async () => {
  const raw = JSON.parse(await readFile(
    new URL("../public/readings/index.json", import.meta.url),
    "utf8",
  ));
  const parsed = loader.parseReadingUnitIndex(raw);

  assert.equal(parsed.schemaVersion, 1);
  assert.equal(parsed.units.length, parsed.unitCount);
  assert.equal(Object.keys(parsed.thoughtMap).length, parsed.verifiedThoughtCount);
  assert.ok(parsed.units.every((unit) => unit.expectedUnitFile.href.startsWith("/readings/units/")));
});

test("the first extracted unit matches its inventory route and has a usable anchor", async () => {
  const index = loader.parseReadingUnitIndex(JSON.parse(await readFile(
    new URL("../public/readings/index.json", import.meta.url),
    "utf8",
  )));
  const thoughtId = "chinese-li-zhi-childlike-heart";
  const route = index.thoughtMap[thoughtId];
  assert.ok(route);

  const body = loader.parseReadingUnit(JSON.parse(await readFile(
    new URL(`../public/readings/units/${route.unitId}.json`, import.meta.url),
    "utf8",
  )));
  const anchor = body.anchors[thoughtId];
  assert.equal(body.id, route.unitId);
  assert.equal(body.paragraphs.length, 7);
  assert.equal(anchor.paragraphId, "p0002");
  assert.ok(anchor.start >= 0 && anchor.end > anchor.start);
  assert.ok(body.paragraphs.some((paragraph) => paragraph.id === anchor.paragraphId));
  assert.match(body.source.url, /^https:\/\/zh\.wikisource\.org\//);
});

test("an integrated reading unit is fetched lazily and resolves its thought anchor", async () => {
  const requests = [];
  const fetchImpl = async (input) => {
    const url = String(input);
    requests.push(url);
    if (url === "/readings/index.json") return jsonResponse(inventory());
    if (url === "/readings/units/unit-a.json") return jsonResponse(unitBody());
    return jsonResponse({ error: "not found" }, 404);
  };

  const result = await loader.loadReadingUnitForThought("thought-a", { fetchImpl });
  assert.equal(result.kind, "integrated");
  assert.equal(result.unit.paragraphs.length, 2);
  assert.deepEqual(result.anchor, {
    paragraphId: "p-2",
    start: 4,
    end: 17,
    quote: "exact thought",
  });
  assert.equal(result.sourceUrl, "https://example.test/original");
  assert.equal(result.registeredSourceUrl, "https://example.test/original");
  assert.equal(result.preparedSourceUrl, "https://prepared.test/passage");
  assert.equal(result.sourceSha256, "a".repeat(64));
  assert.deepEqual(requests, [
    "/readings/index.json",
    "/readings/units/unit-a.json",
  ]);
});

test("source-route units skip body fetching and retain the original-site fallback", async () => {
  const requests = [];
  const fetchImpl = async (input) => {
    requests.push(String(input));
    return jsonResponse(inventory({ availability: "source-route" }));
  };

  const result = await loader.loadReadingUnitForThought("thought-a", { fetchImpl });
  assert.equal(result.kind, "external");
  assert.equal(result.reason, "external-only");
  assert.equal(result.sourceUrl, "https://example.test/original");
  assert.deepEqual(requests, ["/readings/index.json"]);
});

test("legacy MediaWiki API provenance becomes a human-readable prepared source", async () => {
  const body = unitBody();
  delete body.preparedSourceUrl;
  body.source.url = "https://en.wikisource.org/w/api.php?action=parse&page=Test+Passage%2FChapter+I&format=json";
  const fetchImpl = async (input) => String(input).endsWith("index.json")
    ? jsonResponse(inventory())
    : jsonResponse(body);

  const result = await loader.loadReadingUnitForThought("thought-a", { fetchImpl });
  assert.equal(result.kind, "integrated");
  assert.equal(
    result.preparedSourceUrl,
    "https://en.wikisource.org/wiki/Test_Passage/Chapter_I",
  );
  assert.doesNotMatch(result.preparedSourceUrl, /api\.php/u);
});

test("an unavailable integrated body degrades to the registered source route", async () => {
  const fetchImpl = async (input) => String(input).endsWith("index.json")
    ? jsonResponse(inventory())
    : jsonResponse({ error: "missing" }, 404);

  const result = await loader.loadReadingUnitForThought("thought-a", { fetchImpl });
  assert.equal(result.kind, "external");
  assert.equal(result.reason, "unit-unavailable");
  assert.equal(result.sourceUrl, "https://example.test/original");
  assert.equal(result.error.code, "http-error");
});

test("unit parsing rejects duplicate paragraph ids and accepts legacy card anchors", () => {
  assert.throws(
    () => loader.parseReadingUnit({
      id: "duplicate",
      paragraphs: [
        { id: "p-1", text: "One" },
        { id: "p-1", text: "Two" },
      ],
    }),
    (error) => error.code === "invalid-unit",
  );

  const parsed = loader.parseReadingUnit({
    id: "legacy",
    paragraphs: [{ id: "p-1", text: "Legacy passage" }],
    cardAnchors: [{ cardId: "thought-a", paragraphId: "p-1" }],
  });
  assert.deepEqual(parsed.anchors["thought-a"], {
    paragraphId: "p-1",
    anchorId: undefined,
    start: undefined,
    end: undefined,
    quote: undefined,
    match: undefined,
  });
});

test("segmented anchors retain every real range and reject drift or overlap", async () => {
  const segmentedBody = {
    schemaVersion: 1,
    id: "unit-a",
    paragraphs: [
      { id: "p-1", text: "Alpha gap Omega" },
      { id: "p-2", text: "Final segment." },
    ],
    anchors: {
      "thought-a": {
        paragraphId: "p-1",
        start: 0,
        end: 5,
        quote: "Alpha … Omega … Final",
        match: "ellipsis-ordered-segments",
        segments: [
          { paragraphId: "p-1", start: 0, end: 5, text: "Alpha" },
          { paragraphId: "p-1", start: 10, end: 15, text: "Omega" },
          { paragraphId: "p-2", start: 0, end: 5, text: "Final" },
        ],
      },
    },
  };
  const parsed = loader.parseReadingUnit(segmentedBody);
  assert.deepEqual(parsed.anchors["thought-a"].segments, [
    { paragraphId: "p-1", start: 0, end: 5, text: "Alpha" },
    { paragraphId: "p-1", start: 10, end: 15, text: "Omega" },
    { paragraphId: "p-2", start: 0, end: 5, text: "Final" },
  ]);

  const fetchImpl = async (input) => String(input).endsWith("index.json")
    ? jsonResponse(inventory())
    : jsonResponse(segmentedBody);
  const resolution = await loader.loadReadingUnitForThought("thought-a", { fetchImpl });
  assert.equal(resolution.kind, "integrated");
  assert.equal(resolution.anchor.segments.length, 3);
  assert.deepEqual(resolution.anchor.segments.map(({ paragraphId, start, end }) => ({
    paragraphId,
    start,
    end,
  })), [
    { paragraphId: "p-1", start: 0, end: 5 },
    { paragraphId: "p-1", start: 10, end: 15 },
    { paragraphId: "p-2", start: 0, end: 5 },
  ]);

  const invalidAnchors = [
    {
      ...segmentedBody.anchors["thought-a"],
      segments: [{ paragraphId: "p-1", start: 0, end: 99 }],
    },
    {
      ...segmentedBody.anchors["thought-a"],
      segments: [
        { paragraphId: "p-1", start: 0, end: 5 },
        { paragraphId: "p-1", start: 4, end: 10 },
      ],
    },
    {
      ...segmentedBody.anchors["thought-a"],
      segments: [{ paragraphId: "p-1", start: 0, end: 5, text: "wrong" }],
    },
    {
      ...segmentedBody.anchors["thought-a"],
      paragraphId: "p-2",
    },
  ];
  invalidAnchors.forEach((anchor) => {
    assert.throws(
      () => loader.parseReadingUnit({
        ...segmentedBody,
        anchors: { "thought-a": anchor },
      }),
      (error) => error.code === "invalid-unit",
    );
  });
});

test("the reader component keeps accessibility, highlighting, and source fallback explicit", async () => {
  const source = await readFile(
    new URL("../app/ReadingUnitReader.tsx", import.meta.url),
    "utf8",
  );
  assert.match(source, /role="dialog"/);
  assert.match(source, /aria-modal="true"/);
  assert.match(source, /aria-keyshortcuts="Escape"/);
  assert.match(source, /scrollIntoView\(/);
  assert.match(source, /anchor\.segments\?\.length/);
  assert.match(source, /\.filter\(\(segment\) => segment\.paragraphId === paragraphId\)/);
  assert.match(source, /highlightedText\(paragraph\.text, ranges\)/);
  assert.match(source, /aria-current=\{currentAnchor \? "location" : undefined\}/);
  assert.match(source, /<mark className=\{styles\.mark\}/);
  assert.match(source, /copy\.registeredSource/);
  assert.match(source, /copy\.preparedSource/);
  assert.match(source, /SHA-256 \$\{display\.sourceDigest\}/);
  assert.doesNotMatch(source, /unit\?\.source\?\.localPath/);
  assert.match(source, /target="_blank"/);
  assert.match(source, /"zh-hans"[\s\S]*"zh-hant"[\s\S]*en:/);
});

test("the detail view lazy-opens the reader and yields modal priority to it", async () => {
  const source = await readFile(
    new URL("../app/PhilosophyMoment.tsx", import.meta.url),
    "utf8",
  );
  assert.match(source, /lazy\(\(\) => import\("\.\/ReadingUnitReader"\)/);
  assert.match(source, /menuLabel\("读所在篇章", "Read containing passage"\)/);
  assert.match(source, /sourceMetadata\?\.verificationStatus === "primary-text-checked"/);
  assert.match(source, /aria-modal=\{detailOpen && !shareOpen && !savedOpen && !readingUnitOpen\}/);
  assert.match(source, /aria-hidden=\{!detailOpen \|\| shareOpen \|\| savedOpen \|\| readingUnitOpen\}/);
  assert.match(source, /if \(readingUnitOpen\) \{\s*closeReadingUnit\(\);/);
  assert.match(source, /<ReadingUnitReader[\s\S]*thoughtId=\{thought\.id\}[\s\S]*onClose=\{closeReadingUnit\}/);
});
