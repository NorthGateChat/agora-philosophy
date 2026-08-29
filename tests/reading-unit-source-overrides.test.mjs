import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile, realpath, stat } from "node:fs/promises";
import { basename, extname, isAbsolute, relative, resolve } from "node:path";
import test from "node:test";
import { tsImport } from "tsx/esm/api";

const projectRoot = resolve(new URL("..", import.meta.url).pathname);
const overridesPath = resolve(
  projectRoot,
  "research/reading-units/source-overrides.json",
);
const derivedPrefix = "research/source-cache/reading-unit-derived/";
const allowedExtensions = new Set([".txt", ".html", ".xml"]);
const forbiddenFilename = /(?:audit|excerpt|selected[-_ ]?passages|source-review-notes|edition-comparison|scandata|preview)/iu;
const allowedUseBasis = new Set(["public-domain", "open-license"]);

function normalizedSourceText(value, { stripMarkup = false } = {}) {
  const source = String(value)
    .normalize("NFKC")
    .toLocaleLowerCase("en");
  const readableText = stripMarkup
    ? source
      .replace(/<script\b[\s\S]*?<\/script>/giu, " ")
      .replace(/<style\b[\s\S]*?<\/style>/giu, " ")
      .replace(/<[^>]+>/gu, " ")
    : source;
  return readableText
    .replace(/&(?:nbsp|amp|quot|apos|lt|gt);/giu, " ")
    .replace(/&#(?:x[0-9a-f]+|\d+);/giu, " ")
    .replace(/[\p{P}\p{S}\s]/gu, "");
}

function normalizedQuoteSegments(value) {
  return String(value)
    .split(/(?:\.{3,}|…+|\[\s*(?:\.{3,}|…+)\s*\])/u)
    .map(normalizedSourceText)
    .filter((segment) => segment.length >= 20);
}

async function fileExists(path) {
  try {
    return (await stat(path)).isFile();
  } catch (error) {
    if (error?.code === "ENOENT") return false;
    throw error;
  }
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

test("reading-unit overrides are safe, source-backed, and quote-matched", async (t) => {
  const [
    overrides,
    inventory,
    sourceManifest,
    derivedManifest,
    libraries,
    economics,
    verifiedSources,
    fetcher,
  ] = await Promise.all([
    readFile(overridesPath, "utf8").then(JSON.parse),
    readFile(resolve(projectRoot, "public/readings/index.json"), "utf8").then(JSON.parse),
    readFile(resolve(projectRoot, "research/source-cache-manifest.json"), "utf8").then(JSON.parse),
    readFile(resolve(projectRoot, `${derivedPrefix}manifest.json`), "utf8").then(JSON.parse),
    tsImport("../content/libraries.ts", import.meta.url),
    tsImport("../content/economics.ts", import.meta.url),
    tsImport("../content/verifiedSourcePassages.ts", import.meta.url),
    import("../scripts/fetch-reading-units.mjs"),
  ]);

  // The production extractor remains the schema authority. Research evidence
  // lives in a parallel top-level registry so source patches stay consumable.
  const runtimeRegistry = await fetcher.loadSourceOverrides(overridesPath);
  assert.equal(runtimeRegistry.schemaVersion, 1);

  const mappings = overrides.bySourceUrl;
  const evidence = overrides.evidenceBySourceUrl;
  const urls = Object.keys(mappings);
  const unitOverrides = overrides.byUnitId;
  assert.ok(overrides.evidenceMethod?.includes("edition"));
  assert.deepEqual(Object.keys(evidence).sort(), [...urls].sort());
  assert.ok(urls.length >= 40, `expected at least 40 high-confidence URL overrides; found ${urls.length}`);

  const inventoryUnitIds = new Set(inventory.units.map((unit) => unit.id));
  for (const [unitId, override] of Object.entries(unitOverrides)) {
    assert.equal(inventoryUnitIds.has(unitId), true, `${unitId} is not used by the reading inventory`);
    assert.ok(Object.keys(override).length > 0, `${unitId} needs a non-empty override`);
    if (override.startPattern) {
      assert.match(override.startPattern, /^\^/u, `${unitId} needs an anchored startPattern`);
    }
    if (override.endPattern) {
      assert.match(override.endPattern, /^\^/u, `${unitId} needs an anchored endPattern`);
    }
    if (override.maximumUnitCharacters) {
      assert.equal(Number.isInteger(override.maximumUnitCharacters), true);
      assert.ok(override.maximumUnitCharacters > 150_000);
      assert.ok(override.maximumUnitCharacters <= 600_000);
    }
    if (override.minimumUnitCharacters) {
      assert.equal(Number.isInteger(override.minimumUnitCharacters), true);
      assert.ok(override.minimumUnitCharacters > 0);
      assert.ok(override.minimumUnitCharacters <= 120);
    }
  }
  assert.deepEqual(
    unitOverrides["ru-nicomachean-ethics-book-ii-chapter-6-6b4d53ac"],
    {
      startPattern: "^We must, however, not only describe virtue as a state of character",
      endPattern: "^7$",
    },
    "Nicomachean Ethics II.6 must be cropped to Chapter 6 rather than all of Book II",
  );

  const manifestByPath = new Map(sourceManifest.artifacts.flatMap((artifact) => (
    [artifact.path, ...(artifact.aliases ?? [])].map((path) => [path, artifact])
  )));
  const completeEconomics = await economics.loadCompleteEconomicsCatalog();
  const thoughtById = new Map(
    [...libraries.allThoughts, ...completeEconomics.thoughts]
      .map((thought) => [thought.id, thought]),
  );
  const sourceCacheRoot = await realpath(resolve(projectRoot, "research/source-cache"));
  const ignoredLocalPaths = Object.values(mappings)
    .map((mapping) => mapping.localPath)
    .filter((path) => path && !path.startsWith(derivedPrefix));
  const ignoredLocalPresence = await Promise.all(ignoredLocalPaths.map((path) => (
    fileExists(resolve(projectRoot, path))
  )));
  const hasRestoredLocalEvidence = ignoredLocalPresence.some(Boolean);
  if (hasRestoredLocalEvidence) {
    assert.equal(
      ignoredLocalPresence.every(Boolean),
      true,
      "a partially restored local evidence batch is unsafe; restore every mapped cache artifact or none",
    );
  } else {
    t.diagnostic("local evidence cache absent; validating its manifest metadata only");
  }
  const coveredUnits = [];
  const coveredThoughtIds = new Set();
  const evidencedThoughtIds = new Set();
  const directlyMatchedThoughtIds = new Set();
  const remotelyVerifiedThoughtIds = new Set();

  for (const sourceUrl of urls) {
    assert.match(sourceUrl, /^https?:\/\//u);
    const mapping = mappings[sourceUrl];
    const locationFields = ["localPath", "url"].filter((field) => mapping[field]);
    assert.equal(
      locationFields.length,
      1,
      `${sourceUrl} must choose exactly one localPath or replacement url`,
    );
    assert.deepEqual(
      Object.keys(mapping).sort(),
      [
        ...locationFields,
        ...(mapping.startPattern ? ["startPattern"] : []),
        ...(mapping.endPattern ? ["endPattern"] : []),
      ].sort(),
      `${sourceUrl} contains a field unsupported by the extraction pipeline`,
    );
    let sourceText;
    if (mapping.localPath) {
      assert.equal(isAbsolute(mapping.localPath), false);
      assert.equal(mapping.localPath.startsWith("research/source-cache/"), true);
      const manifestArtifact = manifestByPath.get(mapping.localPath);
      assert.ok(manifestArtifact, `${mapping.localPath} is absent from the cache manifest`);
      assert.ok(Number.isInteger(manifestArtifact.bytes) && manifestArtifact.bytes > 0);
      assert.match(manifestArtifact.sha256, /^[0-9a-f]{64}$/u);
      assert.equal(allowedExtensions.has(extname(mapping.localPath).toLowerCase()), true);
      assert.doesNotMatch(basename(mapping.localPath), forbiddenFilename);

      const absolutePath = resolve(projectRoot, mapping.localPath);
      const mustExist = mapping.localPath.startsWith(derivedPrefix) || hasRestoredLocalEvidence;
      if (mustExist) {
        const realPath = await realpath(absolutePath);
        assert.equal(relative(sourceCacheRoot, realPath).startsWith(".."), false);
        assert.equal((await stat(realPath)).isFile(), true);
        const contents = await readFile(realPath);
        assert.equal(contents.byteLength, manifestArtifact.bytes);
        assert.equal(sha256(contents), manifestArtifact.sha256);
        const extension = extname(mapping.localPath).toLowerCase();
        sourceText = normalizedSourceText(contents.toString("utf8"), {
          stripMarkup: extension === ".html" || extension === ".xml",
        });
      }
    } else {
      const replacement = new URL(mapping.url);
      assert.equal(replacement.protocol, "https:");
      assert.equal(replacement.hostname, "zh.wikisource.org");
    }

    const units = inventory.units.filter((unit) => (
      unit.source.url === sourceUrl && unit.availability === "integrated-candidate"
    ));
    assert.ok(units.length > 0, `${sourceUrl} is not used by the reading inventory`);
    assert.ok(units.every((unit) => (
      unit.useBasisKinds.length > 0
      && unit.useBasisKinds.every((basis) => allowedUseBasis.has(basis))
    )));
    assert.ok(units.every((unit) => unit.edition.zh.trim() && unit.edition.en.trim()));
    coveredUnits.push(...units);
    units.flatMap((unit) => unit.thoughtIds).forEach((id) => coveredThoughtIds.add(id));

    const sourceThoughtIds = new Set(units.flatMap((unit) => unit.thoughtIds));
    const matchedIds = evidence[sourceUrl];
    assert.ok(Array.isArray(matchedIds) && matchedIds.length > 0);

    for (const thoughtId of matchedIds) {
      evidencedThoughtIds.add(thoughtId);
      assert.equal(sourceThoughtIds.has(thoughtId), true, `${thoughtId} is not routed through ${sourceUrl}`);
      const verification = verifiedSources.verifiedSourcePassagesById[thoughtId];
      const thought = thoughtById.get(thoughtId);
      assert.ok(verification && thought, `missing verified thought ${thoughtId}`);
      assert.equal(allowedUseBasis.has(verification.useBasis.kind), true);
      const quote = thought[verification.originalField];
      const segments = normalizedQuoteSegments(quote);
      if (sourceText) {
        assert.ok(segments.length > 0, `${thoughtId} has no substantial source segment`);
        assert.equal(
          segments.some((segment) => sourceText.includes(segment)),
          true,
          `${mapping.localPath} does not contain the registered excerpt for ${thoughtId}`,
        );
        directlyMatchedThoughtIds.add(thoughtId);
      } else {
        assert.ok(
          normalizedSourceText(quote).length >= 8,
          `${thoughtId} has no usable remote-source anchor`,
        );
        remotelyVerifiedThoughtIds.add(thoughtId);
      }
    }
  }

  assert.ok(coveredUnits.length >= 70);
  assert.ok(coveredThoughtIds.size >= 90);
  assert.ok(evidencedThoughtIds.size >= 90);
  assert.ok(
    directlyMatchedThoughtIds.size >= (hasRestoredLocalEvidence ? 80 : 8),
    `insufficient on-disk quote checks: ${directlyMatchedThoughtIds.size}`,
  );
  assert.ok(remotelyVerifiedThoughtIds.size >= 17);

  assert.equal(derivedManifest.schemaVersion, 1);
  assert.equal(derivedManifest.generator, "scripts/derive-reading-unit-texts.mjs");
  const derivedByUrl = new Map(
    derivedManifest.artifacts.map((artifact) => [artifact.sourceUrl, artifact]),
  );
  const derivedMappings = Object.entries(mappings).filter(([, mapping]) => (
    mapping.localPath?.startsWith(derivedPrefix)
  ));
  assert.ok(
    derivedMappings.length >= 16,
    `expected at least 16 reproducible derived-source mappings; found ${derivedMappings.length}`,
  );
  for (const [sourceUrl, mapping] of derivedMappings) {
    const artifact = derivedByUrl.get(sourceUrl);
    assert.ok(artifact, `${sourceUrl} is absent from the PDF-derived manifest`);
    assert.equal(
      allowedUseBasis.has(artifact.useBasis),
      true,
      `${sourceUrl} has unsupported use basis ${artifact.useBasis}`,
    );
    assert.equal(artifact.outputPath, mapping.localPath);
    const sourceArtifactPath = artifact.sourcePdfPath ?? artifact.sourceTextPath;
    const sourceArtifactSha256 = artifact.sourcePdfSha256 ?? artifact.sourceTextSha256;
    assert.match(sourceArtifactPath, /^research\/source-cache\/.+\.(?:pdf|txt)$/u);
    if (artifact.sourcePdfPath) {
      assert.match(artifact.command, /^pdftotext -(?:layout|raw) /u);
    } else {
      assert.match(artifact.command, /^select declared line ranges from /u);
      assert.ok(Array.isArray(artifact.lineRanges) && artifact.lineRanges.length > 0);
    }
    assert.equal(artifact.outputBytes, manifestByPath.get(mapping.localPath).bytes);
    assert.equal(artifact.outputSha256, manifestByPath.get(mapping.localPath).sha256);
    assert.equal(
      sourceArtifactSha256,
      manifestByPath.get(sourceArtifactPath)?.sha256,
      `${sourceArtifactPath} hash is not tied to the cache manifest`,
    );
    const routedThoughtIds = inventory.units
      .filter((unit) => (
        unit.source.url === sourceUrl && unit.availability === "integrated-candidate"
      ))
      .flatMap((unit) => unit.thoughtIds)
      .sort();
    assert.deepEqual([...artifact.matchedThoughtIds].sort(), routedThoughtIds);
    assert.deepEqual([...evidence[sourceUrl]].sort(), routedThoughtIds);

    const sourceParagraphs = fetcher.extractTextParagraphs(
      await readFile(resolve(projectRoot, mapping.localPath), "utf8"),
    );
    for (const unit of inventory.units.filter((candidate) => (
      candidate.source.url === sourceUrl
      && candidate.availability === "integrated-candidate"
    ))) {
      const patchedUnit = fetcher.applySourceOverride(unit, runtimeRegistry);
      const cardQuotes = Object.fromEntries(unit.thoughtIds.map((thoughtId) => {
        const thought = thoughtById.get(thoughtId);
        const originalField = inventory.thoughtMap[thoughtId].originalField;
        return [thoughtId, thought[originalField]];
      }));
      const selection = fetcher.selectReadingUnitParagraphs(
        sourceParagraphs,
        patchedUnit,
        {
          cardQuotes,
          maximumUnitCharacters: patchedUnit.source.maximumUnitCharacters,
        },
      );
      const anchored = fetcher.matchCardAnchors(selection.paragraphs, cardQuotes);
      assert.ok(selection.characterCount >= 120);
      assert.equal(
        unit.thoughtIds.every((thoughtId) => anchored.anchors[thoughtId]?.paragraphId),
        true,
        `${unit.id} is not fully anchorable by the production extractor`,
      );
    }
  }
});
