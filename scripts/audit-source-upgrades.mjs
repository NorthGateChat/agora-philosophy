#!/usr/bin/env node

import { createHash } from "node:crypto";

import {
  allThoughts,
  contentLibraries,
  contentLibraryIds,
} from "../content/libraries.ts";
import {
  editorialSourceDispositionSnapshot,
  retainedEditorialSourceDispositions,
} from "../content/editorialSourceDispositions.ts";
import { loadCompleteEconomicsCatalog } from "../content/economics.ts";
import { interpretationDetails } from "../content/interpretationDetails.ts";
import { verifiedSourceContextCoverageSnapshot } from "../content/sourceContextCoverage.ts";
import { resolveThoughtPresentationNature } from "../content/thoughtPresentation.ts";
import { curatedThoughtEmphasis } from "../content/thoughtEmphasis.ts";
import { verifiedSourcePassages } from "../content/verifiedSourcePassages.ts";

const EXPECTED_PUBLIC_THOUGHT_COUNT = 1_441;
const formats = new Set(["table", "tsv", "json"]);
const dispositionDecisions = new Set(["pending-upgrade", "retain-editorial", "all"]);
const retainedDispositionReasons = new Set([
  "multi-passage-synthesis",
  "version-or-attribution-instability",
  "no-stable-collatable-edition",
  "authorship-model-boundary",
]);

function fail(message) {
  console.error(`Source audit: ${message}`);
  process.exitCode = 1;
}

function parseArguments(argv) {
  const command = argv[0] ?? "summary";
  const options = {
    format: "table",
    library: undefined,
    limit: Number.POSITIVE_INFINITY,
    checkedOn: undefined,
    decision: "pending-upgrade",
    verbose: false,
  };

  for (let index = 1; index < argv.length; index += 1) {
    const argument = argv[index];
    const value = argv[index + 1];
    if (argument === "--format") {
      if (!formats.has(value)) throw new Error(`Unsupported format: ${value ?? "(missing)"}`);
      options.format = value;
      index += 1;
    } else if (argument === "--library") {
      if (!contentLibraryIds.includes(value)) {
        throw new Error(`Unknown library: ${value ?? "(missing)"}`);
      }
      options.library = value;
      index += 1;
    } else if (argument === "--limit") {
      const parsed = Number(value);
      if (!Number.isSafeInteger(parsed) || parsed < 1) {
        throw new Error(`--limit must be a positive integer, received ${value ?? "(missing)"}`);
      }
      options.limit = parsed;
      index += 1;
    } else if (argument === "--checked-on") {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(value ?? "")) {
        throw new Error(`--checked-on must use YYYY-MM-DD, received ${value ?? "(missing)"}`);
      }
      options.checkedOn = value;
      index += 1;
    } else if (argument === "--decision") {
      if (!dispositionDecisions.has(value)) {
        throw new Error(`--decision must be pending-upgrade, retain-editorial, or all; received ${value ?? "(missing)"}`);
      }
      options.decision = value;
      index += 1;
    } else if (argument === "--verbose") {
      options.verbose = true;
    } else {
      throw new Error(`Unknown option: ${argument}`);
    }
  }

  return { command, options };
}

function cleanCell(value) {
  return String(value ?? "").replace(/[\t\r\n]+/g, " ").trim();
}

function printRows(rows, format) {
  if (format === "json") {
    console.log(JSON.stringify(rows, null, 2));
    return;
  }
  if (format === "tsv") {
    if (rows.length === 0) return;
    const columns = Object.keys(rows[0]);
    console.log(columns.join("\t"));
    for (const row of rows) {
      console.log(columns.map((column) => cleanCell(row[column])).join("\t"));
    }
    return;
  }
  console.table(rows);
}

function hasText(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function hasCompleteSourceContext(value) {
  return Boolean(value) && [
    "context",
    "englishContext",
    "distinction",
    "englishDistinction",
  ].every((field) => hasText(value[field]));
}

function hasEllipsis(value) {
  return typeof value === "string" && /(?:…|\.{3})/u.test(value);
}

function locatorNotesOmission(thought) {
  return /(?:省略|删节|ellipsis|omission)/iu.test((thought.sourceLocator ?? []).join(" "));
}

function localDateStamp(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function validateEmphasis(thought, emphasis, errors, label = thought.id) {
  for (const [language, content, segments] of [
    ["zh", thought.text, emphasis.zh],
    ["en", thought.english, emphasis.en],
  ]) {
    if (!Array.isArray(segments) || segments.length < 1 || segments.length > 2) {
      errors.push(`${label}.${language} emphasis must contain one or two segments`);
      continue;
    }
    if (new Set(segments).size !== segments.length) {
      errors.push(`${label}.${language} emphasis contains duplicate segments`);
    }
    const ranges = [];
    for (const segment of segments) {
      if (!hasText(segment) || segment !== segment.trim()) {
        errors.push(`${label}.${language} emphasis contains an empty or untrimmed segment`);
        continue;
      }
      if (hasEllipsis(segment)) {
        errors.push(`${label}.${language} emphasis must not include an ellipsis`);
      }
      const start = content.indexOf(segment);
      if (start === -1) {
        errors.push(`${label}.${language} emphasis “${segment}” is absent from display text`);
      } else {
        ranges.push([start, start + segment.length]);
      }
    }
    ranges.sort((left, right) => left[0] - right[0]);
    for (let index = 1; index < ranges.length; index += 1) {
      if (ranges[index - 1][1] > ranges[index][0]) {
        errors.push(`${label}.${language} emphasis segments overlap`);
      }
    }
  }
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
        throw new Error(`Thought ${thought.id} appears in more than one content library`);
      }
      libraryByThoughtId.set(thought.id, libraryId);
    }
  }

  return { thoughts, libraryByThoughtId };
}

function buildState(catalog) {
  const thoughtById = new Map(catalog.thoughts.map((thought) => [thought.id, thought]));
  const evidenceById = new Map(verifiedSourcePassages.map((entry) => [entry.id, entry]));
  const emphasisById = new Map(Object.entries(curatedThoughtEmphasis));
  const retainedDispositionById = new Map(
    retainedEditorialSourceDispositions.map((entry) => [entry.id, entry]),
  );
  const editorialIds = catalog.thoughts
    .filter((thought) => resolveThoughtPresentationNature(thought) === "editorial-synthesis")
    .map((thought) => thought.id)
    .sort();
  const editorialIdSha256 = createHash("sha256")
    .update(editorialIds.join("\n"))
    .digest("hex");
  const dispositionSnapshotMatches =
    editorialIds.length === editorialSourceDispositionSnapshot.expectedEditorialCount
    && editorialIdSha256 === editorialSourceDispositionSnapshot.expectedEditorialIdSha256;
  const contextCompleteIds = new Set();
  const missingContextIds = [];
  for (const id of evidenceById.keys()) {
    const thought = thoughtById.get(id);
    if (
      hasCompleteSourceContext(thought)
      || hasCompleteSourceContext(interpretationDetails[id])
    ) {
      contextCompleteIds.add(id);
    } else {
      missingContextIds.push(id);
    }
  }
  missingContextIds.sort();
  const missingContextIdSha256 = createHash("sha256")
    .update(missingContextIds.join("\n"))
    .digest("hex");
  const contextCoverageSnapshotMatches =
    missingContextIds.length
      === verifiedSourceContextCoverageSnapshot.expectedMissingContextCount
    && missingContextIdSha256
      === verifiedSourceContextCoverageSnapshot.expectedMissingContextIdSha256;
  return {
    ...catalog,
    thoughtById,
    evidenceById,
    emphasisById,
    retainedDispositionById,
    editorialIds,
    editorialIdSha256,
    dispositionSnapshotMatches,
    contextCompleteIds,
    missingContextIds,
    missingContextIdSha256,
    contextCoverageSnapshotMatches,
  };
}

function dispositionForThought(state, thought) {
  const retained = state.retainedDispositionById.get(thought.id);
  if (retained) return retained;
  if (!state.dispositionSnapshotMatches) return undefined;
  return {
    id: thought.id,
    decision: editorialSourceDispositionSnapshot.defaultDecision,
    reason: editorialSourceDispositionSnapshot.defaultReason,
    reviewedOn: editorialSourceDispositionSnapshot.reviewedOn,
    note: editorialSourceDispositionSnapshot.defaultNote,
  };
}

function readingAidFor(thought) {
  if (hasText(thought.plainText)) return "plainText";
  if (hasText(thought.editorialSummary) && hasText(thought.englishEditorialSummary)) {
    return "editorialSummary";
  }
  return "missing";
}

function summaryRows(state) {
  const rows = contentLibraryIds.map((library) => {
    const thoughts = state.thoughts.filter(
      (thought) => state.libraryByThoughtId.get(thought.id) === library,
    );
    const source = thoughts.filter(
      (thought) => resolveThoughtPresentationNature(thought) === "source-excerpt",
    );
    const editorial = thoughts.filter(
      (thought) => resolveThoughtPresentationNature(thought) === "editorial-synthesis",
    );
    const verifiedSource = source.filter((thought) => state.evidenceById.has(thought.id));
    const sourceUseBasis = source.map(
      (thought) => state.evidenceById.get(thought.id)?.useBasis?.kind,
    );
    const dispositions = editorial.map((thought) => dispositionForThought(state, thought));
    return {
      library,
      total: thoughts.length,
      source: source.length,
      editorial: editorial.length,
      "pending upgrade": dispositions.filter(
        (entry) => entry?.decision === "pending-upgrade",
      ).length,
      "retain editorial": dispositions.filter(
        (entry) => entry?.decision === "retain-editorial",
      ).length,
      undisposed: dispositions.filter((entry) => !entry).length,
      verified: verifiedSource.length,
      "context complete": verifiedSource.filter(
        (thought) => state.contextCompleteIds.has(thought.id),
      ).length,
      "missing context": verifiedSource.filter(
        (thought) => !state.contextCompleteIds.has(thought.id),
      ).length,
      "public domain": sourceUseBasis.filter((kind) => kind === "public-domain").length,
      "open license": sourceUseBasis.filter((kind) => kind === "open-license").length,
      "quotation exception": sourceUseBasis.filter(
        (kind) => kind === "quotation-exception",
      ).length,
      "missing use basis": sourceUseBasis.filter((kind) => !kind).length,
      emphasis: source.filter((thought) => state.emphasisById.has(thought.id)).length,
      "missing emphasis": source.filter((thought) => !state.emphasisById.has(thought.id)).length,
      "missing reading aid": source.filter((thought) => readingAidFor(thought) === "missing").length,
    };
  });

  rows.push({
    library: "TOTAL",
    total: rows.reduce((sum, row) => sum + row.total, 0),
    source: rows.reduce((sum, row) => sum + row.source, 0),
    editorial: rows.reduce((sum, row) => sum + row.editorial, 0),
    "pending upgrade": rows.reduce((sum, row) => sum + row["pending upgrade"], 0),
    "retain editorial": rows.reduce((sum, row) => sum + row["retain editorial"], 0),
    undisposed: rows.reduce((sum, row) => sum + row.undisposed, 0),
    verified: rows.reduce((sum, row) => sum + row.verified, 0),
    "context complete": rows.reduce((sum, row) => sum + row["context complete"], 0),
    "missing context": rows.reduce((sum, row) => sum + row["missing context"], 0),
    "public domain": rows.reduce((sum, row) => sum + row["public domain"], 0),
    "open license": rows.reduce((sum, row) => sum + row["open license"], 0),
    "quotation exception": rows.reduce(
      (sum, row) => sum + row["quotation exception"],
      0,
    ),
    "missing use basis": rows.reduce((sum, row) => sum + row["missing use basis"], 0),
    emphasis: rows.reduce((sum, row) => sum + row.emphasis, 0),
    "missing emphasis": rows.reduce((sum, row) => sum + row["missing emphasis"], 0),
    "missing reading aid": rows.reduce((sum, row) => sum + row["missing reading aid"], 0),
  });
  return rows;
}

function queueRows(state, options) {
  const libraryOrder = new Map(contentLibraryIds.map((id, index) => [id, index]));
  return state.thoughts
    .filter((thought) => resolveThoughtPresentationNature(thought) === "editorial-synthesis")
    .filter((thought) => !options.library
      || state.libraryByThoughtId.get(thought.id) === options.library)
    .map((thought) => ({ thought, disposition: dispositionForThought(state, thought) }))
    .filter(({ disposition }) => options.decision === "all"
      || disposition?.decision === options.decision)
    .sort((left, right) => {
      const leftLibrary = state.libraryByThoughtId.get(left.thought.id);
      const rightLibrary = state.libraryByThoughtId.get(right.thought.id);
      return libraryOrder.get(leftLibrary) - libraryOrder.get(rightLibrary)
        || (left.thought.authorId ?? left.thought.id).localeCompare(
          right.thought.authorId ?? right.thought.id,
        )
        || left.thought.englishWork.localeCompare(right.thought.englishWork)
        || left.thought.id.localeCompare(right.thought.id);
    })
    .slice(0, options.limit)
    .map(({ thought, disposition }) => ({
      id: thought.id,
      library: state.libraryByThoughtId.get(thought.id),
      decision: disposition?.decision ?? "undisposed",
      reason: disposition?.reason ?? "snapshot-mismatch",
      reviewedOn: disposition?.reviewedOn ?? "",
      authorId: thought.authorId ?? thought.id,
      name: thought.name,
      englishName: thought.englishName,
      work: thought.work,
      englishWork: thought.englishWork,
      locatorZh: thought.sourceLocator?.[0] ?? "",
      locatorEn: thought.sourceLocator?.[1] ?? "",
    }));
}

function dispositionRows(state, options) {
  const libraryOrder = new Map(contentLibraryIds.map((id, index) => [id, index]));
  const counts = new Map();
  for (const thought of state.thoughts) {
    if (resolveThoughtPresentationNature(thought) !== "editorial-synthesis") continue;
    const library = state.libraryByThoughtId.get(thought.id);
    if (options.library && library !== options.library) continue;
    const disposition = dispositionForThought(state, thought);
    const decision = disposition?.decision ?? "undisposed";
    const reason = disposition?.reason ?? "snapshot-mismatch";
    if (options.decision !== "all" && decision !== options.decision) continue;
    for (const rowLibrary of [library, "TOTAL"]) {
      const key = JSON.stringify([rowLibrary, decision, reason]);
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
  }
  return [...counts]
    .map(([key, count]) => {
      const [library, decision, reason] = JSON.parse(key);
      return { library, decision, reason, count };
    })
    .sort((left, right) => {
      const leftOrder = left.library === "TOTAL"
        ? contentLibraryIds.length
        : libraryOrder.get(left.library);
      const rightOrder = right.library === "TOTAL"
        ? contentLibraryIds.length
        : libraryOrder.get(right.library);
      return leftOrder - rightOrder
        || left.decision.localeCompare(right.decision)
        || left.reason.localeCompare(right.reason);
    });
}

function runChecks(state) {
  const errors = [];
  const warnings = [];

  if (state.thoughts.length !== EXPECTED_PUBLIC_THOUGHT_COUNT) {
    errors.push(`complete public catalog has ${state.thoughts.length} thoughts; expected ${EXPECTED_PUBLIC_THOUGHT_COUNT}`);
  }
  if (state.thoughtById.size !== state.thoughts.length) {
    errors.push("complete public catalog contains duplicate thought IDs");
  }
  if (state.libraryByThoughtId.size !== state.thoughts.length) {
    errors.push("content-library membership does not cover the complete public catalog exactly once");
  }
  if (state.evidenceById.size !== verifiedSourcePassages.length) {
    errors.push("verified-source registry contains duplicate IDs");
  }
  if (state.retainedDispositionById.size !== retainedEditorialSourceDispositions.length) {
    errors.push("retained-editorial registry contains duplicate IDs");
  }
  if (!state.dispositionSnapshotMatches) {
    errors.push(
      `editorial disposition snapshot is stale: expected ${editorialSourceDispositionSnapshot.expectedEditorialCount} IDs / ${editorialSourceDispositionSnapshot.expectedEditorialIdSha256}, got ${state.editorialIds.length} / ${state.editorialIdSha256}`,
    );
  }
  if (!state.contextCoverageSnapshotMatches) {
    errors.push(
      `source context coverage snapshot is stale: expected ${verifiedSourceContextCoverageSnapshot.expectedMissingContextCount} missing IDs / ${verifiedSourceContextCoverageSnapshot.expectedMissingContextIdSha256}, got ${state.missingContextIds.length} / ${state.missingContextIdSha256}; review the changed missing-ID set before refreshing content/sourceContextCoverage.ts`,
    );
  }
  const unresolvedEditorialIds = state.editorialIds.filter(
    (id) => !state.retainedDispositionById.has(id),
  );
  if (unresolvedEditorialIds.length > 0) {
    errors.push(
      `${unresolvedEditorialIds.length} editorial card(s) remain in the default pending queue; every public editorial card must now have an explicit reviewed disposition`,
    );
  }
  if (state.missingContextIds.length > 0) {
    errors.push(
      `${state.missingContextIds.length} verified source excerpt(s) still lack complete bilingual deep-reading context`,
    );
  }

  const today = localDateStamp();
  for (const disposition of retainedEditorialSourceDispositions) {
    const thought = state.thoughtById.get(disposition.id);
    if (!thought) {
      errors.push(`${disposition.id} has an editorial disposition but is absent from the public catalog`);
      continue;
    }
    if (resolveThoughtPresentationNature(thought) !== "editorial-synthesis") {
      errors.push(`${disposition.id} is retained as editorial but is not presented as editorial synthesis`);
    }
    if (!retainedDispositionReasons.has(disposition.reason)) {
      errors.push(`${disposition.id} has an unsupported retained-editorial reason: ${disposition.reason}`);
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(disposition.reviewedOn) || disposition.reviewedOn > today) {
      errors.push(`${disposition.id}.reviewedOn is invalid or in the future: ${disposition.reviewedOn}`);
    }
    if (!hasText(disposition.note?.zh) || !hasText(disposition.note?.en)) {
      errors.push(`${disposition.id} needs a bilingual editorial-disposition note`);
    }
  }
  for (const evidence of verifiedSourcePassages) {
    const thought = state.thoughtById.get(evidence.id);
    if (!thought) {
      errors.push(`${evidence.id} is verified but absent from the public catalog`);
      continue;
    }
    if (resolveThoughtPresentationNature(thought) !== "source-excerpt") {
      errors.push(`${evidence.id} is verified but not presented as a source excerpt`);
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(evidence.checkedOn) || evidence.checkedOn > today) {
      errors.push(`${evidence.id}.checkedOn is invalid or in the future: ${evidence.checkedOn}`);
    }
    if (!hasText(evidence.referenceEdition?.zh) || !hasText(evidence.referenceEdition?.en)) {
      errors.push(`${evidence.id} needs a bilingual reference edition`);
    }
    if (!Array.isArray(evidence.referenceLinks) || evidence.referenceLinks.length === 0) {
      errors.push(`${evidence.id} needs at least one reference link`);
    }
    if (!evidence.useBasis || (
      !["public-domain", "open-license", "quotation-exception"].includes(evidence.useBasis.kind)
      || !hasText(evidence.useBasis.zh)
      || !hasText(evidence.useBasis.en)
    )) {
      errors.push(`${evidence.id}.useBasis must have a supported kind and bilingual explanation`);
    }
    for (const link of evidence.referenceLinks ?? []) {
      try {
        if (new URL(link.href).protocol !== "https:") throw new Error("not HTTPS");
      } catch {
        errors.push(`${evidence.id} has an invalid or non-HTTPS reference link: ${link.href}`);
      }
    }

    const originalField = thought[evidence.originalField];
    if (!hasText(originalField)) {
      errors.push(`${evidence.id}.${evidence.originalField} is registered as verbatim but empty`);
    }
    const libraryId = state.libraryByThoughtId.get(evidence.id);
    const expectedOriginalField = libraryId
      ? contentLibraries[libraryId].quoteOrder === "original-first"
        ? "text"
        : "english"
      : undefined;
    if (expectedOriginalField && evidence.originalField !== expectedOriginalField) {
      errors.push(
        `${evidence.id} registers ${evidence.originalField} as verbatim, but ${libraryId} displays ${expectedOriginalField} as the source-first field`,
      );
    }
    const hasMarkedOmission = hasEllipsis(originalField);
    const hasOmissionNote = locatorNotesOmission(thought);
    if (hasOmissionNote && !hasMarkedOmission) {
      errors.push(`${evidence.id} locator declares an omission but ${evidence.originalField} has no ellipsis`);
    } else if (hasMarkedOmission && !hasOmissionNote) {
      warnings.push(`${evidence.id} contains an ellipsis in ${evidence.originalField} but its locator does not declare the omission`);
    }
  }

  for (const thought of state.thoughts) {
    const nature = resolveThoughtPresentationNature(thought);
    const isSource = nature === "source-excerpt";
    if (nature === "unverified-excerpt") {
      errors.push(`${thought.id} is publicly presented as an unverified excerpt`);
    }
    if (isSource && !state.evidenceById.has(thought.id)) {
      errors.push(`${thought.id} is presented as a source excerpt without verified-source evidence`);
    }
    const hasChineseSummary = hasText(thought.editorialSummary);
    const hasEnglishSummary = hasText(thought.englishEditorialSummary);
    if (hasChineseSummary !== hasEnglishSummary) {
      errors.push(`${thought.id} must provide editorialSummary and englishEditorialSummary together`);
    }
    if (hasChineseSummary && !["source-excerpt", "editorial-synthesis"].includes(nature)) {
      errors.push(`${thought.id} has a deep-reading editorial summary but is not source-led content`);
    }
    if (isSource && !state.emphasisById.has(thought.id)) {
      warnings.push(`${thought.id} is a source excerpt without curated emphasis`);
    }
    if (isSource && readingAidFor(thought) === "missing") {
      warnings.push(`${thought.id} is a source excerpt without editorialSummary or plainText`);
    }
  }

  for (const [id, emphasis] of state.emphasisById) {
    const thought = state.thoughtById.get(id);
    if (!thought) {
      errors.push(`${id} has curated emphasis but is absent from the public catalog`);
      continue;
    }
    if (resolveThoughtPresentationNature(thought) !== "source-excerpt") {
      errors.push(`${id} has curated emphasis but is not a source excerpt`);
    }
    validateEmphasis(thought, emphasis, errors);
  }

  return { errors, warnings };
}

function warningCategory(warning) {
  if (warning.includes("locator does not declare")) return "unnoted omissions";
  if (warning.includes("without curated emphasis")) return "missing emphasis";
  if (warning.includes("without editorialSummary or plainText")) return "missing reading aid";
  return "other";
}

function printCheckResult(result, verbose) {
  if (result.errors.length === 0) {
    console.log(`Source audit passed with ${result.warnings.length} tracked warning(s).`);
  } else {
    fail(`${result.errors.length} error(s), ${result.warnings.length} warning(s)`);
    for (const error of result.errors) console.error(`ERROR\t${error}`);
  }
  if (verbose) {
    for (const warning of result.warnings) console.warn(`WARN\t${warning}`);
  } else {
    const warningCounts = new Map();
    for (const warning of result.warnings) {
      const category = warningCategory(warning);
      warningCounts.set(category, (warningCounts.get(category) ?? 0) + 1);
    }
    for (const [category, count] of warningCounts) {
      console.warn(`WARN\t${category}: ${count}`);
    }
    if (result.warnings.length > 0) {
      console.warn("Run check --verbose to list every tracked warning.");
    }
  }
}

function runBatch(state, checkedOn, format) {
  if (!checkedOn) throw new Error("batch requires --checked-on YYYY-MM-DD");
  const entries = verifiedSourcePassages.filter((entry) => entry.checkedOn === checkedOn);
  if (entries.length === 0) {
    fail(`no verified-source entries were checked on ${checkedOn}`);
    return;
  }

  const errors = [];
  const rows = entries.map((entry) => {
    const thought = state.thoughtById.get(entry.id);
    const emphasis = state.emphasisById.get(entry.id);
    const source = thought && resolveThoughtPresentationNature(thought) === "source-excerpt";
    const readingAid = thought ? readingAidFor(thought) : "missing";
    if (!thought) errors.push(`${entry.id} is absent from the public catalog`);
    if (thought && !source) errors.push(`${entry.id} is not presented as a source excerpt`);
    if (thought && readingAid === "missing") errors.push(`${entry.id} has no reading aid`);
    if (!emphasis) {
      errors.push(`${entry.id} has no curated emphasis`);
    } else if (thought) {
      validateEmphasis(thought, emphasis, errors, entry.id);
    }
    return {
      id: entry.id,
      library: state.libraryByThoughtId.get(entry.id) ?? "missing",
      public: Boolean(thought),
      source: Boolean(source),
      evidence: true,
      emphasis: Boolean(emphasis),
      readingAid,
    };
  });

  printRows(rows, format);
  console.log(`Batch ${checkedOn}: ${entries.length} verified-source entries.`);
  if (errors.length > 0) {
    fail(`batch ${checkedOn} has ${errors.length} error(s)`);
    for (const error of errors) console.error(`ERROR\t${error}`);
  }
}

async function main() {
  const { command, options } = parseArguments(process.argv.slice(2));
  const state = buildState(await loadCatalog());

  if (command === "summary") {
    printRows(summaryRows(state), options.format);
  } else if (command === "queue") {
    printRows(queueRows(state, options), options.format);
  } else if (command === "dispositions") {
    printRows(dispositionRows(state, options), options.format);
  } else if (command === "check") {
    printCheckResult(runChecks(state), options.verbose);
  } else if (command === "batch") {
    runBatch(state, options.checkedOn, options.format);
  } else {
    throw new Error(`Unknown command: ${command}`);
  }
}

main().catch((error) => {
  fail(error instanceof Error ? error.message : String(error));
});
