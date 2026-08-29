import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import { readFile, readdir, stat } from "node:fs/promises";
import { dirname, extname, posix, relative, resolve } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const cacheRoot = resolve(projectRoot, "research", "source-cache");
const derivedPrefix = "research/source-cache/reading-unit-derived/";
const manifestPath = resolve(
  projectRoot,
  "research",
  "source-cache-manifest.json",
);
const archivedExtensions = new Set([
  ".djvu",
  ".html",
  ".json",
  ".md",
  ".pdf",
  ".txt",
  ".xml",
]);
const manifest = JSON.parse(await readFile(manifestPath, "utf8"));

async function collectCachedArtifacts(directory) {
  let entries;
  try {
    entries = await readdir(directory, { withFileTypes: true });
  } catch (error) {
    if (error?.code === "ENOENT") {
      return [];
    }
    throw error;
  }

  const nested = await Promise.all(
    entries.map(async (entry) => {
      const absolutePath = resolve(directory, entry.name);
      if (entry.isDirectory()) {
        return collectCachedArtifacts(absolutePath);
      }
      if (!archivedExtensions.has(extname(entry.name).toLowerCase())) {
        return [];
      }
      return [absolutePath];
    }),
  );
  return nested.flat();
}

function sha256File(path) {
  return new Promise((done, reject) => {
    const hash = createHash("sha256");
    createReadStream(path)
      .on("error", reject)
      .on("data", (chunk) => hash.update(chunk))
      .on("end", () => done(hash.digest("hex")));
  });
}

test("source-cache manifest has a unique, well-formed artifact inventory", () => {
  assert.equal(manifest.schemaVersion, 2);
  assert.equal(
    manifest.purpose,
    "Local research cache; never included in the public product bundle.",
  );
  assert.equal(manifest.referenceMetadata, "content/verifiedSourcePassages.ts");
  assert.ok(Number.isInteger(manifest.artifactCount));
  assert.ok(manifest.artifactCount >= 0);
  assert.ok(Number.isInteger(manifest.pathCount));
  assert.ok(manifest.pathCount >= manifest.artifactCount);
  assert.equal(
    manifest.duplicateAliasCount,
    manifest.pathCount - manifest.artifactCount,
  );
  assert.ok(Array.isArray(manifest.artifacts));
  assert.equal(manifest.artifactCount, manifest.artifacts.length);

  const paths = new Set();
  const hashes = new Set();
  for (const [index, artifact] of manifest.artifacts.entries()) {
    assert.ok(
      artifact && typeof artifact === "object" && !Array.isArray(artifact),
      `artifact ${index} must be an object`,
    );
    assert.equal(
      typeof artifact.path,
      "string",
      `artifact ${index} must declare a path`,
    );
    assert.equal(
      artifact.path,
      posix.normalize(artifact.path),
      `${artifact.path} must be a normalized relative path`,
    );
    assert.match(
      artifact.path,
      /^research\/source-cache\/.+\.(?:djvu|html|json|md|pdf|txt|xml)$/,
      `${artifact.path} must stay inside the source-artifact cache`,
    );
    assert.doesNotMatch(artifact.path, /\\|(?:^|\/)\.\.(?:\/|$)/);
    assert.ok(Number.isInteger(artifact.bytes), `${artifact.path} needs byte size`);
    assert.ok(artifact.bytes >= 0, `${artifact.path} has a negative byte size`);
    assert.match(
      artifact.sha256,
      /^[0-9a-f]{64}$/,
      `${artifact.path} needs a lowercase SHA-256 digest`,
    );
    assert.equal(paths.has(artifact.path), false, `duplicate path: ${artifact.path}`);
    assert.equal(
      hashes.has(artifact.sha256),
      false,
      `duplicate SHA-256 digest: ${artifact.sha256}`,
    );
    const aliases = artifact.aliases ?? [];
    assert.ok(Array.isArray(aliases), `${artifact.path} aliases must be an array`);
    assert.deepEqual(aliases, [...aliases].sort(), `${artifact.path} aliases must be sorted`);
    for (const alias of aliases) {
      assert.equal(alias, posix.normalize(alias), `${alias} must be a normalized relative path`);
      assert.match(
        alias,
        /^research\/source-cache\/.+\.(?:djvu|html|json|md|pdf|txt|xml)$/,
        `${alias} must stay inside the source-artifact cache`,
      );
      assert.doesNotMatch(alias, /\\|(?:^|\/)\.\.(?:\/|$)/);
      assert.equal(paths.has(alias), false, `duplicate path or alias: ${alias}`);
      paths.add(alias);
    }
    assert.equal(paths.has(artifact.path), false, `duplicate path: ${artifact.path}`);
    paths.add(artifact.path);
    hashes.add(artifact.sha256);
  }
  assert.equal(paths.size, manifest.pathCount);
});

test("restored local source cache matches its manifest", async (t) => {
  const cachedFiles = await collectCachedArtifacts(cacheRoot);
  const cachedPaths = cachedFiles
    .map((path) => relative(projectRoot, path).replaceAll("\\", "/"))
    .sort();
  const cachedPathSet = new Set(cachedPaths);
  const manifestPaths = manifest.artifacts.flatMap((artifact) => (
    [artifact.path, ...(artifact.aliases ?? [])].map((path) => ({ path, artifact }))
  ));
  const derivedArtifacts = manifestPaths.filter(({ path }) => path.startsWith(derivedPrefix));
  const localArtifacts = manifestPaths.filter(({ path }) => !path.startsWith(derivedPrefix));
  assert.equal(
    derivedArtifacts.every(({ path }) => cachedPathSet.has(path)),
    true,
    "versioned reading-unit derivatives must exist even without the private research cache",
  );

  const restoredLocalPaths = cachedPaths.filter((path) => !path.startsWith(derivedPrefix));
  if (restoredLocalPaths.length === 0) {
    t.diagnostic("local source-artifact cache absent; its manifest metadata was checked only");
  } else {
    assert.deepEqual(
      restoredLocalPaths,
      localArtifacts.map(({ path }) => path).sort(),
      "a restored local source cache must be complete and re-indexed",
    );
  }

  const artifactsToVerify = [
    ...derivedArtifacts,
    ...(restoredLocalPaths.length > 0 ? localArtifacts : []),
  ];
  for (const { path, artifact } of artifactsToVerify) {
    const absolutePath = resolve(projectRoot, path);
    const metadata = await stat(absolutePath);
    assert.equal(metadata.isFile(), true, `${path} must be a file`);
    assert.equal(metadata.size, artifact.bytes, `${path} byte size changed`);
    assert.equal(
      await sha256File(absolutePath),
      artifact.sha256,
      `${path} content hash changed`,
    );
  }
});
