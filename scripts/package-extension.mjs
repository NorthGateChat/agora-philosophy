import { execFileSync } from "node:child_process";
import { mkdir, readdir, readFile, rm } from "node:fs/promises";
import { dirname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const distDirectory = resolve(projectRoot, "extension-dist");
const releaseDirectory = resolve(projectRoot, "release");
const brand = JSON.parse(
  await readFile(resolve(projectRoot, "brand.json"), "utf8"),
);
const packageMetadata = JSON.parse(
  await readFile(resolve(projectRoot, "package.json"), "utf8"),
);
const archivePath = resolve(
  releaseDirectory,
  `${brand.slug}-${brand.version}.zip`,
);

async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries
      .filter((entry) => entry.name !== ".DS_Store")
      .map(async (entry) => {
        const absolutePath = resolve(directory, entry.name);
        if (entry.isDirectory()) {
          return collectFiles(absolutePath);
        }
        return [relative(distDirectory, absolutePath)];
      }),
  );
  return nested.flat().sort();
}

const manifest = JSON.parse(
  await readFile(resolve(distDirectory, "manifest.json"), "utf8"),
);

if (manifest.manifest_version !== 3) {
  throw new Error("Refusing to package a non-MV3 extension");
}

const versions = {
  brand: brand.version,
  package: packageMetadata.version,
  manifest: manifest.version,
};

if (new Set(Object.values(versions)).size !== 1) {
  throw new Error(`Version mismatch: ${JSON.stringify(versions)}`);
}

await mkdir(releaseDirectory, { recursive: true });
await rm(archivePath, { force: true });

const files = await collectFiles(distDirectory);
execFileSync("zip", ["-X", "-q", archivePath, ...files], {
  cwd: distDirectory,
  stdio: "inherit",
});

const archivedFiles = execFileSync("unzip", ["-Z1", archivePath], {
  encoding: "utf8",
})
  .trim()
  .split("\n");

if (!archivedFiles.includes("manifest.json")) {
  throw new Error("Packaged archive does not contain manifest.json at its root");
}

const archivedManifest = JSON.parse(
  execFileSync("unzip", ["-p", archivePath, "manifest.json"], {
    encoding: "utf8",
  }),
);

if (archivedManifest.version !== brand.version) {
  throw new Error(
    `Packaged manifest version ${archivedManifest.version} does not match ${brand.version}`,
  );
}

console.log(`Created ${archivePath}`);
