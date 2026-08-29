import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import test from "node:test";
import { tsImport } from "tsx/esm/api";

async function loadCompletePublicThoughts() {
  const { allThoughts } = await tsImport("../content/libraries.ts", import.meta.url);
  const { loadCompleteEconomicsCatalog } = await tsImport(
    "../content/economics.ts",
    import.meta.url,
  );
  const completeEconomics = await loadCompleteEconomicsCatalog();
  return [
    ...allThoughts.filter((thought) => !thought.id.startsWith("economics-")),
    ...completeEconomics.thoughts,
  ];
}

test("every built-in editorial card has an auditable source-upgrade disposition", async () => {
  const thoughts = await loadCompletePublicThoughts();
  const { resolveThoughtPresentationNature } = await tsImport(
    "../content/thoughtPresentation.ts",
    import.meta.url,
  );
  const {
    editorialSourceDispositionSnapshot,
    retainedEditorialSourceDispositions,
  } = await tsImport("../content/editorialSourceDispositions.ts", import.meta.url);

  const thoughtById = new Map(thoughts.map((thought) => [thought.id, thought]));
  const editorialIds = thoughts
    .filter(
      (thought) => resolveThoughtPresentationNature(thought) === "editorial-synthesis",
    )
    .map((thought) => thought.id)
    .sort();
  const editorialIdSha256 = createHash("sha256")
    .update(editorialIds.join("\n"))
    .digest("hex");
  const retainedIds = retainedEditorialSourceDispositions.map((entry) => entry.id);
  const rightsOnlyReasons = new Set(["copyright-or-license", "translation-rights"]);

  assert.equal(
    editorialIds.length,
    editorialSourceDispositionSnapshot.expectedEditorialCount,
    "an editorial catalog change must refresh the reviewed disposition snapshot",
  );
  assert.equal(
    editorialIdSha256,
    editorialSourceDispositionSnapshot.expectedEditorialIdSha256,
    "editorial IDs must match the reviewed disposition snapshot",
  );
  assert.equal(
    new Set(retainedIds).size,
    retainedIds.length,
    "retained-editorial decisions must not contain duplicate IDs",
  );

  for (const disposition of retainedEditorialSourceDispositions) {
    const thought = thoughtById.get(disposition.id);
    assert.ok(thought, `${disposition.id} must exist in the complete public catalog`);
    assert.equal(
      resolveThoughtPresentationNature(thought),
      "editorial-synthesis",
      `${disposition.id} cannot retain an editorial disposition after source upgrade`,
    );
    assert.equal(disposition.decision, "retain-editorial");
    assert.ok(
      !rightsOnlyReasons.has(disposition.reason),
      `${disposition.id} cannot use permission or translation rights alone to avoid checking a normal short quotation`,
    );
    assert.match(disposition.reviewedOn, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(disposition.note.zh.trim(), `${disposition.id} needs a Chinese rationale`);
    assert.ok(disposition.note.en.trim(), `${disposition.id} needs an English rationale`);
  }

  const retainedIdSet = new Set(retainedIds);
  const pendingCount = editorialIds.filter((id) => !retainedIdSet.has(id)).length;
  assert.equal(
    pendingCount + retainedIdSet.size,
    editorialIds.length,
    "every editorial card must be either pending upgrade or explicitly retained",
  );
  assert.equal(
    pendingCount,
    0,
    "the completed public corpus must not leave editorial cards in the default pending queue",
  );
});
