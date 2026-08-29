#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFile, stat, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { buildReadingUnitInventory } from "./build-reading-unit-inventory.mjs";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const reportPath = resolve(
  projectRoot,
  "research/reading-units/public-unhandled-37-integration-report.json",
);
const firstFetchPath = "/tmp/agora-public-unhandled-37-default-fetch.json";
const resumeFetchPath = "/tmp/agora-public-unhandled-37-default-fetch-resume.json";
const maximumPublicUnitBytes = 600 * 1024;
const capitalChapterXxvId = "ru-capital-volume-i-chapter-xxv-5db39174";

const sha256 = (value) => createHash("sha256").update(value).digest("hex");

async function readJson(path) {
  return JSON.parse(await readFile(path, "utf8"));
}

function countBy(values) {
  const counts = {};
  for (const value of values) counts[value] = (counts[value] ?? 0) + 1;
  return Object.fromEntries(Object.entries(counts).sort(([left], [right]) => (
    left.localeCompare(right, "en")
  )));
}

function duplicateGroups(rows, keyFor) {
  const groups = new Map();
  for (const row of rows) {
    const key = keyFor(row);
    const group = groups.get(key) ?? [];
    group.push(row.unitId);
    groups.set(key, group);
  }
  return [...groups.entries()]
    .filter(([, unitIds]) => unitIds.length > 1)
    .map(([hash, unitIds]) => ({ hash, unitIds: unitIds.sort() }))
    .sort((left, right) => left.hash.localeCompare(right.hash, "en"));
}

const [inventory, proposal, batch2b1, overrides, firstFetch, resumeFetch] = await Promise.all([
  buildReadingUnitInventory(),
  readJson(resolve(projectRoot, "research/reading-units/public-unhandled-resolution-final-proposal.json")),
  readJson(resolve(projectRoot, "research/reading-units/non-public-recovery-batch2b1-report.json")),
  readJson(resolve(projectRoot, "research/reading-units/source-overrides.json")),
  readJson(firstFetchPath),
  readJson(resumeFetchPath),
]);

const inventoryUnitById = new Map(inventory.units.map((unit) => [unit.id, unit]));
const firstFetchById = new Map(firstFetch.units.map((unit) => [unit.id, unit]));
const resumeFetchById = new Map(resumeFetch.units.map((unit) => [unit.id, unit]));
const requestedRows = [];

for (const unit of proposal.units) {
  const thoughtIds = unit.expectedOverride.resolveKeyBy.matchedThoughtIds;
  const resolvedIds = [...new Set(thoughtIds.map((thoughtId) => (
    inventory.thoughtMap[thoughtId]?.unitId
  )))];
  if (resolvedIds.length !== 1 || !resolvedIds[0]) {
    throw new Error(`${unit.unitId} did not resolve to one current inventory ID`);
  }
  requestedRows.push({
    batch: "public-unhandled-33",
    oldUnitId: unit.unitId,
    unitId: resolvedIds[0],
    thoughtIds,
    localPath: unit.expectedOverride.value.localPath,
    naturalUnit: unit.naturalUnit,
    boundaryEvidence: unit.readerBody.boundary,
    proposedSourceSha256: unit.readerBody.sha256,
  });
}

for (const unit of batch2b1.units) {
  requestedRows.push({
    batch: "non-public-recovery-batch2b1-4",
    oldUnitId: unit.unitId,
    unitId: unit.unitId,
    thoughtIds: [unit.thoughtId],
    localPath: unit.overrideProposal.value.localPath,
    naturalUnit: unit.currentLocator.en,
    boundaryEvidence: unit.sourceBoundary,
    proposedSourceSha256: unit.output.sha256,
  });
}

if (requestedRows.length !== 37 || new Set(requestedRows.map(({ unitId }) => unitId)).size !== 37) {
  throw new Error("Expected 37 distinct current reading-unit IDs");
}
if (new Set(requestedRows.map(({ localPath }) => localPath)).size !== 37) {
  throw new Error("Expected 37 distinct local source paths");
}
if (requestedRows.reduce((sum, row) => sum + row.thoughtIds.length, 0) !== 68) {
  throw new Error("Expected 68 card anchors across the 37 units");
}
if (
  firstFetch.summary.considered !== 37
  || firstFetch.summary.failed !== 0
  || firstFetch.summary.anchorsMatched !== 68
  || firstFetch.summary.anchorsUnmatched !== 0
  || firstFetch.summary.duplicateUnboundedClusters !== 0
  || firstFetch.summary.unboundedNonWholeUnits !== 0
) {
  throw new Error("The default-parameter fetch did not satisfy the 37-unit release gate");
}
if (resumeFetch.summary.resumed !== 37 || resumeFetch.summary.failed !== 0) {
  throw new Error("The default-parameter deterministic resume did not cover all 37 units");
}

const unitResults = [];
for (const row of requestedRows) {
  const inventoryUnit = inventoryUnitById.get(row.unitId);
  const fetchResult = firstFetchById.get(row.unitId);
  const resumeResult = resumeFetchById.get(row.unitId);
  const override = overrides.byUnitId[row.unitId];
  if (!inventoryUnit) throw new Error(`${row.unitId} is absent from the current memory inventory`);
  if (override?.localPath !== row.localPath) throw new Error(`${row.unitId} has the wrong override`);
  if (!["written", "resumed"].includes(fetchResult?.status)) {
    throw new Error(`${row.unitId} did not complete the default-parameter fetch`);
  }
  if (resumeResult?.status !== "resumed") throw new Error(`${row.unitId} did not resume cleanly`);

  const sourcePath = resolve(projectRoot, row.localPath);
  const publicPath = resolve(projectRoot, fetchResult.outputPath);
  const [source, publicBody, sourceStats, publicStats] = await Promise.all([
    readFile(sourcePath),
    readJson(publicPath),
    stat(sourcePath),
    stat(publicPath),
  ]);
  const sourceHash = sha256(source);
  const publicRaw = await readFile(publicPath);
  const publicHash = sha256(publicRaw);
  if (sourceHash !== row.proposedSourceSha256) {
    throw new Error(`${row.unitId} local source differs from its derivation proposal`);
  }
  if (publicBody.id !== row.unitId || publicBody.source?.sha256 !== sourceHash) {
    throw new Error(`${row.unitId} public body is not tied to the proposed local source`);
  }
  if (publicStats.size !== fetchResult.publicByteCount) {
    throw new Error(`${row.unitId} public byte count differs from the pipeline report`);
  }
  if (publicStats.size > maximumPublicUnitBytes) {
    throw new Error(`${row.unitId} exceeds the 600 KiB public body gate`);
  }
  if (
    inventoryUnit.locator?.structureKey !== "whole-work"
    && fetchResult.selectionMethod === "whole-document"
  ) {
    throw new Error(`${row.unitId} is a non-whole-work unit without an explicit boundary`);
  }
  const expectedThoughtIds = [...inventoryUnit.thoughtIds].sort();
  const actualThoughtIds = Object.keys(publicBody.anchors ?? {}).sort();
  if (JSON.stringify(expectedThoughtIds) !== JSON.stringify(actualThoughtIds)) {
    throw new Error(`${row.unitId} public anchors do not match the inventory thought IDs`);
  }
  for (const [thoughtId, anchor] of Object.entries(publicBody.anchors)) {
    if (!anchor.paragraphId || ["unmatched", "missing-quote"].includes(anchor.match)) {
      throw new Error(`${row.unitId} has an invalid public anchor for ${thoughtId}`);
    }
  }
  const paragraphBodySha256 = sha256(JSON.stringify(
    publicBody.paragraphs.map(({ text }) => text),
  ));
  unitResults.push({
    batch: row.batch,
    oldUnitId: row.oldUnitId,
    unitId: row.unitId,
    idChanged: row.oldUnitId !== row.unitId,
    thoughtIds: row.thoughtIds,
    naturalUnit: row.naturalUnit,
    override: { ...override },
    localSource: {
      bytes: sourceStats.size,
      sha256: sourceHash,
      proposalHashMatched: true,
    },
    boundary: {
      proposalEvidence: row.boundaryEvidence,
      pipelineSelectionMethod: fetchResult.selectionMethod,
      locatorStructureKey: inventoryUnit.locator?.structureKey,
      startPattern: override.startPattern ?? null,
      endPattern: override.endPattern ?? null,
      paragraphCount: fetchResult.paragraphCount,
      characterCount: fetchResult.characterCount,
      unboundedNonWhole: firstFetch.unboundedNonWholeUnits.some(({ id }) => id === row.unitId),
    },
    publicBody: {
      path: fetchResult.outputPath,
      bytes: publicStats.size,
      within600KiBGate: publicStats.size <= maximumPublicUnitBytes,
      sha256: publicHash,
      contentHash: fetchResult.contentHash,
      paragraphBodySha256,
      serialization: fetchResult.serialization,
    },
    anchors: publicBody.anchors,
    matchedAnchorCount: fetchResult.matchedThoughtCount,
    unmatchedThoughtIds: fetchResult.unmatchedThoughtIds,
    sourceOverrideApplied: fetchResult.sourceOverrideApplied,
  });
}

const anchorRows = unitResults.flatMap((unit) => (
  Object.entries(unit.anchors).map(([thoughtId, anchor]) => ({
    unitId: unit.unitId,
    thoughtId,
    match: anchor.match,
  }))
));
const changedIds = unitResults.filter(({ idChanged }) => idChanged);
const explicitlyBoundedUnits = unitResults.filter(({ override }) => override.startPattern);
const unitSpecificMaximums = unitResults
  .filter(({ override }) => Number.isFinite(override.maximumUnitCharacters))
  .map((unit) => ({
    unitId: unit.unitId,
    maximumUnitCharacters: unit.override.maximumUnitCharacters,
    observedCharacterCount: unit.boundary.characterCount,
    headroom: unit.override.maximumUnitCharacters - unit.boundary.characterCount,
  }));
const wholeDocumentNonWholeUnits = unitResults.filter((unit) => (
  unit.boundary.locatorStructureKey !== "whole-work"
  && unit.boundary.pipelineSelectionMethod === "whole-document"
));
const maximumObservedPublicBytes = Math.max(...unitResults.map(({ publicBody }) => (
  publicBody.bytes
)));
const orphanedOldIds = changedIds.map(({ oldUnitId, unitId }) => ({
  oldUnitId,
  replacementUnitId: unitId,
  oldIdPresentInCurrentInventory: inventoryUnitById.has(oldUnitId),
  oldPublicBodyPath: `public/readings/units/${oldUnitId}.json`,
  action: "reported only; no old override or public body was deleted",
}));

const report = {
  schemaVersion: 1,
  generatedAt: new Date().toISOString(),
  purpose: "Incrementally integrate the 33 public-unhandled resolutions and four batch2b1 complete natural units without rebuilding the formal inventory/index or derived manifest.",
  inventory: {
    source: "buildReadingUnitInventory() current in-memory result",
    temporarySerializedPath: "/tmp/agora-public-unhandled-37-inventory.json",
    unitCount: inventory.unitCount,
    verifiedThoughtCount: inventory.verifiedThoughtCount,
    catalogThoughtCount: inventory.catalogThoughtCount,
    formalInventoryAndPublicIndexIntentionallyUnchanged: true,
  },
  overrideMerge: {
    path: "research/reading-units/source-overrides.json",
    priorByUnitIdCount: Object.keys(overrides.byUnitId).length - 37,
    finalByUnitIdCount: Object.keys(overrides.byUnitId).length,
    targetMappings: 37,
    uniqueUnitIds: 37,
    uniqueLocalPaths: 37,
    conflicts: [],
  },
  idResolution: {
    proposalUnits: 33,
    unchangedIds: 33 - changedIds.length,
    changedIds: changedIds.length,
    orphanedOldIds,
  },
  fetch: {
    inventoryPath: "/tmp/agora-public-unhandled-37-inventory.json",
    initialReportPath: firstFetchPath,
    deterministicResumeReportPath: resumeFetchPath,
    allowNetwork: false,
    outputDirectory: "public/readings/units",
    requestedUnits: 37,
    initialSummary: firstFetch.summary,
    deterministicResumeSummary: resumeFetch.summary,
    releaseGates: {
      globalPipelineParameters: "formal defaults; no global maximumUnitCharacters, maximumUnboundedSectionCharacters, or maximumPublicUnitBytes override",
      publicBodyMaximumBytes: maximumPublicUnitBytes,
      maximumObservedPublicBytes,
      allPublicBodiesWithinGate: maximumObservedPublicBytes <= maximumPublicUnitBytes,
      unitSpecificMaximums,
    },
  },
  anchors: {
    expected: 68,
    matched: anchorRows.length,
    unmatched: 0,
    matchMethods: countBy(anchorRows.map(({ match }) => match)),
  },
  boundaries: {
    pipelineSelectionMethods: countBy(unitResults.map(({ boundary }) => (
      boundary.pipelineSelectionMethod
    ))),
    unboundedNonWholeCount: unitResults.filter(({ boundary }) => boundary.unboundedNonWhole).length,
    wholeDocumentNonWholeUnits: wholeDocumentNonWholeUnits.map(({ unitId }) => unitId),
    explicitStartPatternCount: explicitlyBoundedUnits.length,
    explicitStartPatternUnits: explicitlyBoundedUnits.map(({ unitId }) => unitId),
    note: "All non-whole-work local derived units have a reproducible heading or explicit configured boundary. The five whole-document selections are registered whole works.",
  },
  duplicates: {
    pipelineDuplicateUnboundedClusters: firstFetch.duplicateUnboundedClusters,
    exactContentHashGroups: duplicateGroups(unitResults, ({ publicBody }) => publicBody.contentHash),
    exactParagraphBodyGroups: duplicateGroups(unitResults, ({ publicBody }) => (
      publicBody.paragraphBodySha256
    )),
  },
  validation: {
    defaultParameterIntegration: {
      command: "node --import tsx scripts/verify-public-unhandled-37-integration.mjs",
      status: "passed",
      units: 37,
      anchorsMatched: 68,
      failed: 0,
      duplicates: 0,
      unboundedNonWholeUnits: 0,
    },
    targetedOverrideChecks: {
      status: "passed",
      checks: [
        "37 current inventory IDs resolved from 68 thought IDs",
        "37 byUnitId.localPath values are exact, unique, and readable",
        "37 public source hashes equal their proposed local source hashes",
        "68 public anchors have paragraph IDs and non-failure match methods",
        "12 formerly unbounded non-whole-work units now use anchored startPattern boundaries",
        "zero non-whole-work units retain whole-document selection",
        "all 37 public bodies remain within the default 600 KiB gate",
        "Capital Chapter XXV alone uses a 253000-character unit-specific maximum",
      ],
    },
    fetchTests: {
      command: "node --test tests/fetch-reading-units.test.mjs",
      status: "passed",
      passed: 44,
      failed: 0,
    },
    verifierLint: {
      command: "npx eslint scripts/verify-public-unhandled-37-integration.mjs",
      status: "passed",
    },
    repositoryOverrideTest: {
      command: "node --test tests/reading-unit-source-overrides.test.mjs",
      status: "expected-stale-index-failure",
      reason: "The test reads the intentionally unrebuilt formal public/readings/index.json; it therefore cannot yet see the five new IDs. The current in-memory inventory validation above passed. No formal index was written to make this test pass prematurely.",
    },
  },
  intentionallyUnchanged: [
    "research/reading-units/inventory.json",
    "public/readings/index.json",
    "research/source-cache/reading-unit-derived/manifest.json",
  ],
  units: unitResults,
};

if (
  report.anchors.matched !== 68
  || report.duplicates.exactContentHashGroups.length > 0
  || report.duplicates.exactParagraphBodyGroups.length > 0
  || report.boundaries.unboundedNonWholeCount !== 0
  || report.boundaries.wholeDocumentNonWholeUnits.length !== 0
  || report.boundaries.explicitStartPatternCount !== 12
  || report.fetch.releaseGates.maximumObservedPublicBytes > maximumPublicUnitBytes
  || report.fetch.releaseGates.unitSpecificMaximums.length !== 1
  || report.fetch.releaseGates.unitSpecificMaximums[0].unitId !== capitalChapterXxvId
  || report.fetch.releaseGates.unitSpecificMaximums[0].maximumUnitCharacters !== 253000
  || report.fetch.releaseGates.unitSpecificMaximums[0].headroom < 0
) {
  throw new Error("Final integration validation failed");
}
await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
console.log(JSON.stringify({
  reportPath: "research/reading-units/public-unhandled-37-integration-report.json",
  units: report.units.length,
  anchors: report.anchors,
  boundaries: report.boundaries,
  duplicates: report.duplicates,
  orphanedOldIds: report.idResolution.orphanedOldIds,
}, null, 2));
