import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { tsImport } from "tsx/esm/api";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const contextFields = [
  "context",
  "englishContext",
  "distinction",
  "englishDistinction",
];

function hasCompleteContext(value) {
  return Boolean(value) && contextFields.every(
    (field) => typeof value[field] === "string" && value[field].trim().length > 0,
  );
}

async function loadCoverageState() {
  const { allThoughts } = await tsImport("../content/libraries.ts", import.meta.url);
  const { loadCompleteEconomicsCatalog } = await tsImport(
    "../content/economics.ts",
    import.meta.url,
  );
  const { interpretationDetails } = await tsImport(
    "../content/interpretationDetails.ts",
    import.meta.url,
  );
  const { verifiedSourcePassages } = await tsImport(
    "../content/verifiedSourcePassages.ts",
    import.meta.url,
  );
  const { verifiedSourceContextCoverageSnapshot } = await tsImport(
    "../content/sourceContextCoverage.ts",
    import.meta.url,
  );
  const completeEconomics = await loadCompleteEconomicsCatalog();
  const thoughts = [
    ...allThoughts.filter((thought) => !thought.id.startsWith("economics-")),
    ...completeEconomics.thoughts,
  ];
  const thoughtById = new Map(thoughts.map((thought) => [thought.id, thought]));
  const verifiedIds = verifiedSourcePassages.map((entry) => entry.id);
  const contextCompleteIds = [];
  const missingContextIds = [];

  for (const id of verifiedIds) {
    if (
      hasCompleteContext(thoughtById.get(id))
      || hasCompleteContext(interpretationDetails[id])
    ) {
      contextCompleteIds.push(id);
    } else {
      missingContextIds.push(id);
    }
  }
  contextCompleteIds.sort();
  missingContextIds.sort();

  return {
    contextCompleteIds,
    interpretationDetails,
    missingContextIds,
    snapshot: verifiedSourceContextCoverageSnapshot,
    thoughtById,
    verifiedIds,
  };
}

function runAudit(...arguments_) {
  return spawnSync(
    process.execPath,
    ["--import", "tsx", "scripts/audit-source-upgrades.mjs", ...arguments_],
    {
      cwd: repositoryRoot,
      encoding: "utf8",
      maxBuffer: 10 * 1024 * 1024,
      timeout: 30_000,
    },
  );
}

test("verified source context coverage matches its reviewed missing-ID snapshot", async () => {
  const state = await loadCoverageState();

  assert.equal(
    new Set(state.verifiedIds).size,
    state.verifiedIds.length,
    "the verified-source registry must not contain duplicate IDs",
  );
  assert.ok(
    state.verifiedIds.some((id) => hasCompleteContext(state.thoughtById.get(id))),
    "card-level deep-reading context must count as complete",
  );
  assert.ok(
    state.verifiedIds.some(
      (id) => !hasCompleteContext(state.thoughtById.get(id))
        && hasCompleteContext(state.interpretationDetails[id]),
    ),
    "interpretation-detail context must complete a card that lacks card-level fields",
  );
  assert.equal(
    state.contextCompleteIds.length + state.missingContextIds.length,
    state.verifiedIds.length,
    "every verified source must be classified as context-complete or missing context",
  );
  assert.equal(
    state.missingContextIds.length,
    state.snapshot.expectedMissingContextCount,
    "a changed missing-context count requires reviewed snapshot refresh",
  );
  assert.equal(
    createHash("sha256").update(state.missingContextIds.join("\n")).digest("hex"),
    state.snapshot.expectedMissingContextIdSha256,
    "changed missing-context IDs require reviewed snapshot refresh",
  );
  assert.deepEqual(
    state.missingContextIds,
    [],
    "the completed verified-source corpus must not leave deep-reading context missing",
  );
});

test("source audit summary reports context coverage for every library", async () => {
  const state = await loadCoverageState();
  const result = runAudit("summary", "--format", "json");

  assert.equal(result.status, 0, result.stderr || result.stdout);
  const rows = JSON.parse(result.stdout);
  const total = rows.find((row) => row.library === "TOTAL");
  assert.ok(total, "summary must include a TOTAL row");

  for (const row of rows) {
    assert.equal(
      row["context complete"] + row["missing context"],
      row.verified,
      `${row.library} context coverage must partition verified sources`,
    );
  }
  assert.equal(total["context complete"], state.contextCompleteIds.length);
  assert.equal(total["missing context"], state.missingContextIds.length);
});

test("source audit check accepts the reviewed context-coverage snapshot", () => {
  const result = runAudit("check");

  assert.equal(result.status, 0, result.stderr || result.stdout);
  assert.match(result.stdout, /Source audit passed/);
});
