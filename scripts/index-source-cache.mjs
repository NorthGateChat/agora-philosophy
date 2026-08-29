#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readdir, readFile, stat, writeFile } from "node:fs/promises";
import { extname, join, relative } from "node:path";

const root = process.cwd();
const cacheRoot = join(root, "research", "source-cache");
const manifestPath = join(root, "research", "source-cache-manifest.json");
const archivedExtensions = new Set([
  ".djvu",
  ".html",
  ".json",
  ".md",
  ".pdf",
  ".txt",
  ".xml",
]);

async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries.sort((left, right) => left.name.localeCompare(right.name))) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...await collectFiles(path));
    } else if (archivedExtensions.has(extname(entry.name).toLowerCase())) {
      files.push(path);
    }
  }
  return files;
}

const files = await collectFiles(cacheRoot);
const filesByDigest = new Map();
for (const path of files) {
  const [contents, metadata] = await Promise.all([readFile(path), stat(path)]);
  const record = {
    path: relative(root, path).replaceAll("\\", "/"),
    bytes: metadata.size,
    sha256: createHash("sha256").update(contents).digest("hex"),
  };
  const matches = filesByDigest.get(record.sha256) ?? [];
  matches.push(record);
  filesByDigest.set(record.sha256, matches);
}

function canonicalPathRank(path) {
  if (path.startsWith("research/source-cache/reading-unit-derived/")) return 0;
  if (path.includes("/remote-cache/") || path.includes("/fetch-cache/")) return 3;
  if (path.includes("/public-unhandled-resolution/units/")) return 2;
  return 1;
}

const artifacts = [...filesByDigest.values()]
  .map((records) => {
    const ordered = [...records].sort((left, right) => (
      canonicalPathRank(left.path) - canonicalPathRank(right.path)
        || left.path.localeCompare(right.path)
    ));
    const [canonical, ...aliases] = ordered;
    return {
      ...canonical,
      ...(aliases.length > 0 ? { aliases: aliases.map(({ path }) => path).sort() } : {}),
    };
  })
  .sort((left, right) => left.path.localeCompare(right.path));
const pathCount = artifacts.reduce(
  (sum, artifact) => sum + 1 + (artifact.aliases?.length ?? 0),
  0,
);

const manifest = {
  schemaVersion: 2,
  purpose: "Local research cache; never included in the public product bundle.",
  referenceMetadata: "content/verifiedSourcePassages.ts",
  artifactCount: artifacts.length,
  pathCount,
  duplicateAliasCount: pathCount - artifacts.length,
  artifacts,
};

await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
console.log(
  `Indexed ${artifacts.length} unique source artifact(s) across ${pathCount} path(s) in ${relative(root, manifestPath)}.`,
);
