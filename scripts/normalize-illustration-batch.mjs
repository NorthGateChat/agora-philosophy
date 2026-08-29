import { constants as fsConstants } from "node:fs";
import {
  copyFile,
  mkdir,
  mkdtemp,
  readFile,
  readdir,
  realpath,
  rm,
  stat,
  writeFile,
} from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import ts from "typescript";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const defaultProjectRoot = path.resolve(scriptDirectory, "..");
const requiredFields = [
  "thoughtId",
  "source",
  "assetId",
  "altZh",
  "altEn",
  "captionZh",
  "captionEn",
  "corpus",
];
// A small number of canonical corpus IDs predate the kebab-case convention
// (for example `francis_bacon` and `thomas_aquinas`). Keep accepting those
// declared IDs while still rejecting whitespace, paths, and punctuation.
const thoughtIdPattern = /^[a-z0-9]+(?:[-_][a-z0-9]+)*$/;
const assetIdPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*-\d{3,}$/;
const validPlacements = new Set(["detail", "share"]);
const sourceExtensionPattern = /\.(?:png|jpe?g)$/i;
const canvas = Object.freeze({ width: 1536, height: 1024 });
const webpQuality = 84;

async function filesBelow(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) return filesBelow(absolute);
    return entry.isFile() ? [absolute] : [];
  }));
  return nested.flat();
}

async function pathExists(filename) {
  try {
    await stat(filename);
    return true;
  } catch (error) {
    if (error?.code === "ENOENT") return false;
    throw error;
  }
}

async function loadRegistry(projectRoot) {
  const filename = path.join(projectRoot, "content", "illustrations.ts");
  const source = await readFile(filename, "utf8");
  const javascript = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
    },
    fileName: filename,
  }).outputText;
  const encoded = Buffer.from(javascript).toString("base64");
  const registry = await import(`data:text/javascript;base64,${encoded}`);

  if (!Array.isArray(registry.thoughtIllustrations)) {
    throw new Error("content/illustrations.ts must export thoughtIllustrations as an array");
  }
  return registry.thoughtIllustrations;
}

async function collectDeclaredThoughtIds(projectRoot) {
  const contentDirectory = path.join(projectRoot, "content");
  const files = (await filesBelow(contentDirectory))
    .filter((filename) => filename.endsWith(".ts"))
    .filter((filename) => path.basename(filename) !== "illustrations.ts");
  const ids = new Set();

  for (const filename of files) {
    const source = await readFile(filename, "utf8");
    for (const match of source.matchAll(/\bid\s*:\s*["']([^"']+)["']/g)) {
      ids.add(match[1]);
    }
  }
  return ids;
}

function duplicateValues(items, selector) {
  const seen = new Set();
  const duplicates = new Set();
  for (const item of items) {
    const value = selector(item);
    if (value && seen.has(value)) duplicates.add(value);
    if (value) seen.add(value);
  }
  return [...duplicates];
}

function normalizedPlacement(value) {
  return value === undefined ? ["detail", "share"] : value;
}

function validateManifestShape(rawManifest) {
  const items = Array.isArray(rawManifest) ? rawManifest : rawManifest?.items;
  const errors = [];

  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("Staging manifest must be a non-empty array or contain a non-empty items array");
  }

  items.forEach((item, index) => {
    const label = `item ${index + 1}`;
    if (!item || typeof item !== "object" || Array.isArray(item)) {
      errors.push(`${label}: must be an object`);
      return;
    }
    for (const field of requiredFields) {
      if (typeof item[field] !== "string" || item[field].trim().length === 0) {
        errors.push(`${label}: ${field} is required and must be a non-empty string`);
      }
    }
    if (typeof item.thoughtId === "string" && !thoughtIdPattern.test(item.thoughtId.trim())) {
      errors.push(`${label}: invalid thoughtId ${item.thoughtId}`);
    }
    if (typeof item.assetId === "string" && !assetIdPattern.test(item.assetId.trim())) {
      errors.push(`${label}: invalid assetId ${item.assetId}`);
    }
    if (typeof item.source === "string" && !sourceExtensionPattern.test(item.source.trim())) {
      errors.push(`${label}: source must have a .png, .jpg, or .jpeg extension`);
    }

    const placement = normalizedPlacement(item.placement);
    if (!Array.isArray(placement) || placement.length === 0) {
      errors.push(`${label}: placement must contain detail, share, or both`);
    } else {
      if (new Set(placement).size !== placement.length) {
        errors.push(`${label}: placement contains duplicate values`);
      }
      for (const value of placement) {
        if (!validPlacements.has(value)) errors.push(`${label}: unsupported placement ${value}`);
      }
    }
  });

  for (const [field, selector] of [
    ["thoughtId", (item) => item?.thoughtId?.trim()],
    ["assetId", (item) => item?.assetId?.trim()],
  ]) {
    for (const value of duplicateValues(items, selector)) {
      errors.push(`manifest has duplicate ${field}: ${value}`);
    }
  }

  if (errors.length > 0) {
    throw new Error(`Staging manifest is invalid:\n- ${errors.join("\n- ")}`);
  }

  return items.map((item) => ({
    thoughtId: item.thoughtId.trim(),
    source: item.source.trim(),
    assetId: item.assetId.trim(),
    altZh: item.altZh.trim(),
    altEn: item.altEn.trim(),
    captionZh: item.captionZh.trim(),
    captionEn: item.captionEn.trim(),
    corpus: item.corpus.trim(),
    placement: [...normalizedPlacement(item.placement)],
  }));
}

async function mapWithConcurrency(items, concurrency, worker) {
  const results = new Array(items.length);
  let nextIndex = 0;

  async function consume() {
    while (nextIndex < items.length) {
      const index = nextIndex;
      nextIndex += 1;
      results[index] = await worker(items[index], index);
    }
  }

  const workers = Array.from(
    { length: Math.min(Math.max(1, concurrency), items.length) },
    () => consume(),
  );
  await Promise.all(workers);
  return results;
}

function registrySnippet(items) {
  const lines = [
    "/*",
    " * Generated by scripts/normalize-illustration-batch.mjs.",
    " * Review these entries, then copy the object literals into thoughtIllustrations.",
    " * This file does not modify content/illustrations.ts.",
    " */",
    "export const stagedThoughtIllustrations = [",
  ];

  for (const item of items) {
    lines.push(
      "  {",
      `    thoughtId: ${JSON.stringify(item.thoughtId)},`,
      `    assetId: ${JSON.stringify(item.assetId)},`,
      `    src: ${JSON.stringify(item.src)},`,
      `    width: ${item.width},`,
      `    height: ${item.height},`,
      `    altZh: ${JSON.stringify(item.altZh)},`,
      `    altEn: ${JSON.stringify(item.altEn)},`,
      `    captionZh: ${JSON.stringify(item.captionZh)},`,
      `    captionEn: ${JSON.stringify(item.captionEn)},`,
      `    placement: ${JSON.stringify(item.placement)},`,
      "  },",
    );
  }

  lines.push("] as const;", "");
  return lines.join("\n");
}

async function assertSourcesAndDestinations({
  items,
  manifestDirectory,
  illustrationDirectory,
  outputDirectory,
  registry,
  declaredThoughtIds,
}) {
  const errors = [];
  const existingThoughtIds = new Set(registry.map((item) => item.thoughtId));
  const existingAssetIds = new Set(registry.map((item) => item.assetId));
  const resolvedSources = [];

  for (const item of items) {
    const label = item.thoughtId;
    if (!declaredThoughtIds.has(item.thoughtId)) {
      errors.push(`${label}: thoughtId is not declared in content`);
    }
    if (existingThoughtIds.has(item.thoughtId)) {
      errors.push(`${label}: thoughtId already exists in content/illustrations.ts`);
    }
    if (existingAssetIds.has(item.assetId)) {
      errors.push(`${label}: assetId already exists in content/illustrations.ts`);
    }

    const sourcePath = path.isAbsolute(item.source)
      ? path.normalize(item.source)
      : path.resolve(manifestDirectory, item.source);
    try {
      const sourceStat = await stat(sourcePath);
      if (!sourceStat.isFile()) errors.push(`${label}: source is not a file: ${item.source}`);
      resolvedSources.push(await realpath(sourcePath));
    } catch (error) {
      if (error?.code === "ENOENT") {
        errors.push(`${label}: source does not exist: ${item.source}`);
        resolvedSources.push(sourcePath);
      } else {
        throw error;
      }
    }

    const destination = path.join(illustrationDirectory, `${item.thoughtId}-v1.webp`);
    if (await pathExists(destination)) {
      errors.push(`${label}: refusing to overwrite public/illustrations/${path.basename(destination)}`);
    }
  }

  for (const value of duplicateValues(resolvedSources, (source) => source)) {
    errors.push(`manifest reuses the same source file: ${value}`);
  }

  for (const artifact of ["registry-snippet.ts", "normalized-manifest.json"]) {
    const destination = path.join(outputDirectory, artifact);
    if (await pathExists(destination)) {
      errors.push(`refusing to overwrite staging artifact: ${destination}`);
    }
  }

  if (errors.length > 0) {
    throw new Error(`Batch preflight failed:\n- ${errors.join("\n- ")}`);
  }

  return items.map((item, index) => ({
    ...item,
    sourcePath: resolvedSources[index],
    filename: `${item.thoughtId}-v1.webp`,
  }));
}

async function normalizeOne(item, temporaryIllustrationDirectory) {
  const inputMetadata = await sharp(item.sourcePath, { failOn: "error" }).metadata();
  if (!new Set(["png", "jpeg"]).has(inputMetadata.format)) {
    throw new Error(`${item.thoughtId}: source content must be a real PNG or JPEG`);
  }

  const temporaryFile = path.join(temporaryIllustrationDirectory, item.filename);
  await sharp(item.sourcePath, { failOn: "error" })
    .rotate()
    .resize(canvas.width, canvas.height, { fit: "cover", position: "centre" })
    .flatten({ background: { r: 245, g: 242, b: 234 } })
    .toColourspace("srgb")
    .webp({ quality: webpQuality, effort: 6, smartSubsample: true })
    .toFile(temporaryFile);

  const outputMetadata = await sharp(temporaryFile).metadata();
  if (
    outputMetadata.format !== "webp"
    || outputMetadata.width !== canvas.width
    || outputMetadata.height !== canvas.height
    || outputMetadata.space !== "srgb"
    || outputMetadata.hasAlpha
  ) {
    throw new Error(`${item.thoughtId}: normalized output failed the 1536x1024 sRGB WebP contract`);
  }

  return {
    thoughtId: item.thoughtId,
    assetId: item.assetId,
    src: `/illustrations/${item.filename}`,
    width: canvas.width,
    height: canvas.height,
    altZh: item.altZh,
    altEn: item.altEn,
    captionZh: item.captionZh,
    captionEn: item.captionEn,
    placement: item.placement,
    corpus: item.corpus,
    source: item.source,
    file: item.filename,
    temporaryFile,
  };
}

export async function normalizeIllustrationBatch({
  manifestPath,
  outputDirectory,
  projectRoot = defaultProjectRoot,
  concurrency = 4,
  now = () => new Date(),
} = {}) {
  if (typeof manifestPath !== "string" || manifestPath.trim().length === 0) {
    throw new Error("manifestPath is required");
  }
  if (!Number.isInteger(concurrency) || concurrency < 1 || concurrency > 16) {
    throw new Error("concurrency must be an integer between 1 and 16");
  }

  const resolvedProjectRoot = path.resolve(projectRoot);
  const resolvedManifestPath = path.resolve(manifestPath);
  const manifestDirectory = path.dirname(resolvedManifestPath);
  const defaultOutputDirectory = path.join(
    manifestDirectory,
    `${path.basename(resolvedManifestPath, path.extname(resolvedManifestPath))}-normalized`,
  );
  const resolvedOutputDirectory = outputDirectory
    ? path.resolve(outputDirectory)
    : defaultOutputDirectory;
  const illustrationDirectory = path.join(resolvedProjectRoot, "public", "illustrations");

  const rawManifest = JSON.parse(await readFile(resolvedManifestPath, "utf8"));
  const items = validateManifestShape(rawManifest);
  const [registry, declaredThoughtIds] = await Promise.all([
    loadRegistry(resolvedProjectRoot),
    collectDeclaredThoughtIds(resolvedProjectRoot),
  ]);
  const preparedItems = await assertSourcesAndDestinations({
    items,
    manifestDirectory,
    illustrationDirectory,
    outputDirectory: resolvedOutputDirectory,
    registry,
    declaredThoughtIds,
  });

  const temporaryRoot = await mkdtemp(path.join(os.tmpdir(), "agora-illustration-batch-"));
  const temporaryIllustrationDirectory = path.join(temporaryRoot, "illustrations");
  const committedFiles = [];

  try {
    await mkdir(temporaryIllustrationDirectory, { recursive: true });
    const normalizedItems = await mapWithConcurrency(
      preparedItems,
      concurrency,
      (item) => normalizeOne(item, temporaryIllustrationDirectory),
    );
    const registryItems = normalizedItems.map((item) => ({
      thoughtId: item.thoughtId,
      assetId: item.assetId,
      src: item.src,
      width: item.width,
      height: item.height,
      altZh: item.altZh,
      altEn: item.altEn,
      captionZh: item.captionZh,
      captionEn: item.captionEn,
      placement: item.placement,
    }));
    const generatedAt = now().toISOString();
    const normalizedManifest = {
      schemaVersion: 1,
      generatedAt,
      sourceManifest: path.relative(resolvedProjectRoot, resolvedManifestPath).split(path.sep).join("/"),
      production: {
        directory: "public/illustrations",
        width: canvas.width,
        height: canvas.height,
        format: "webp",
        colorSpace: "srgb",
        alpha: false,
        quality: webpQuality,
      },
      items: normalizedItems.map((item) => ({
        thoughtId: item.thoughtId,
        assetId: item.assetId,
        src: item.src,
        width: item.width,
        height: item.height,
        altZh: item.altZh,
        altEn: item.altEn,
        captionZh: item.captionZh,
        captionEn: item.captionEn,
        placement: item.placement,
        corpus: item.corpus,
        source: item.source,
        file: item.file,
        outputFile: `public/illustrations/${item.file}`,
        status: "generated",
      })),
    };

    const temporaryRegistrySnippet = path.join(temporaryRoot, "registry-snippet.ts");
    const temporaryNormalizedManifest = path.join(temporaryRoot, "normalized-manifest.json");
    await Promise.all([
      writeFile(temporaryRegistrySnippet, registrySnippet(registryItems), "utf8"),
      writeFile(temporaryNormalizedManifest, `${JSON.stringify(normalizedManifest, null, 2)}\n`, "utf8"),
    ]);

    await mkdir(illustrationDirectory, { recursive: true });
    await mkdir(resolvedOutputDirectory, { recursive: true });
    const copies = [
      ...normalizedItems.map((item) => ({
        source: item.temporaryFile,
        destination: path.join(illustrationDirectory, item.file),
      })),
      {
        source: temporaryRegistrySnippet,
        destination: path.join(resolvedOutputDirectory, "registry-snippet.ts"),
      },
      {
        source: temporaryNormalizedManifest,
        destination: path.join(resolvedOutputDirectory, "normalized-manifest.json"),
      },
    ];

    for (const copy of copies) {
      await copyFile(copy.source, copy.destination, fsConstants.COPYFILE_EXCL);
      committedFiles.push(copy.destination);
    }

    return {
      count: normalizedItems.length,
      illustrationDirectory,
      outputDirectory: resolvedOutputDirectory,
      files: normalizedItems.map((item) => path.join(illustrationDirectory, item.file)),
      registrySnippet: path.join(resolvedOutputDirectory, "registry-snippet.ts"),
      normalizedManifest: path.join(resolvedOutputDirectory, "normalized-manifest.json"),
    };
  } catch (error) {
    await Promise.all(committedFiles.map((filename) => rm(filename, { force: true })));
    throw error;
  } finally {
    await rm(temporaryRoot, { recursive: true, force: true });
  }
}

async function main() {
  const [manifestPath, outputDirectory, ...extra] = process.argv.slice(2);
  if (!manifestPath || extra.length > 0 || manifestPath === "--help" || manifestPath === "-h") {
    const usage = "Usage: npm run normalize:illustrations -- <staging-manifest.json> [staging-output-directory]";
    if (manifestPath === "--help" || manifestPath === "-h") {
      console.log(usage);
      return;
    }
    throw new Error(usage);
  }

  const result = await normalizeIllustrationBatch({ manifestPath, outputDirectory });
  console.log(`Normalized ${result.count} illustration${result.count === 1 ? "" : "s"}.`);
  console.log(`Production assets: ${result.illustrationDirectory}`);
  console.log(`Review artifacts: ${result.outputDirectory}`);
}

const invokedDirectly = process.argv[1]
  && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (invokedDirectly) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  });
}
