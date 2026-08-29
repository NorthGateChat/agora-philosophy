import { mkdtemp, readFile, rename, rm, stat } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDirectory, "..");
const illustrationDirectory = path.join(projectRoot, "public", "illustrations");
const canvas = Object.freeze({ width: 1536, height: 1024 });
const webpQuality = 84;
const thoughtIdPattern = /^[a-z0-9]+(?:[-_][a-z0-9]+)*$/;

async function loadItems(manifestPath) {
  const parsed = JSON.parse(await readFile(manifestPath, "utf8"));
  const items = Array.isArray(parsed) ? parsed : parsed.items;
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("Replacement manifest must contain a non-empty items array");
  }

  const seen = new Set();
  for (const [index, item] of items.entries()) {
    const label = `items[${index}]`;
    if (!thoughtIdPattern.test(item?.thoughtId ?? "")) {
      throw new Error(`${label}: invalid thoughtId`);
    }
    if (seen.has(item.thoughtId)) throw new Error(`${label}: duplicate thoughtId`);
    seen.add(item.thoughtId);
    if (item.file !== `${item.thoughtId}-v1.webp`) {
      throw new Error(`${label}: file must equal <thoughtId>-v1.webp`);
    }
    if (typeof item.source !== "string" || !/\.(?:png|jpe?g)$/i.test(item.source)) {
      throw new Error(`${label}: source must be a PNG or JPEG path`);
    }
    const sourceStats = await stat(item.source);
    if (!sourceStats.isFile() || sourceStats.size === 0) {
      throw new Error(`${label}: source is missing or empty`);
    }
    const targetStats = await stat(path.join(illustrationDirectory, item.file));
    if (!targetStats.isFile() || targetStats.size === 0) {
      throw new Error(`${label}: registered target is missing or empty`);
    }
  }
  return items;
}

async function normalize(item, temporaryDirectory) {
  const output = path.join(temporaryDirectory, item.file);
  const inputMetadata = await sharp(item.source, { failOn: "error" }).metadata();
  if (!new Set(["png", "jpeg"]).has(inputMetadata.format)) {
    throw new Error(`${item.thoughtId}: source content is not a real PNG or JPEG`);
  }
  await sharp(item.source, { failOn: "error" })
    .rotate()
    .resize(canvas.width, canvas.height, { fit: "cover", position: "centre" })
    .flatten({ background: { r: 245, g: 242, b: 234 } })
    .toColourspace("srgb")
    .webp({ quality: webpQuality, effort: 6, smartSubsample: true })
    .toFile(output);
  const metadata = await sharp(output).metadata();
  if (
    metadata.format !== "webp"
    || metadata.width !== canvas.width
    || metadata.height !== canvas.height
    || metadata.space !== "srgb"
    || metadata.hasAlpha
  ) {
    throw new Error(`${item.thoughtId}: normalized output failed the asset contract`);
  }
  return output;
}

export async function replaceIllustrationAssets(manifestPath) {
  const resolvedManifest = path.resolve(manifestPath);
  const items = await loadItems(resolvedManifest);
  const temporaryDirectory = await mkdtemp(path.join(os.tmpdir(), "agora-illustration-replace-"));
  try {
    const outputs = [];
    for (const item of items) outputs.push(await normalize(item, temporaryDirectory));
    for (const [index, item] of items.entries()) {
      await rename(outputs[index], path.join(illustrationDirectory, item.file));
    }
    return { replaced: items.length, files: items.map((item) => item.file) };
  } finally {
    await rm(temporaryDirectory, { recursive: true, force: true });
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const manifestPath = process.argv[2];
  if (!manifestPath) {
    console.error("Usage: node scripts/replace-illustration-assets.mjs <replacement-manifest.json>");
    process.exitCode = 1;
  } else {
    replaceIllustrationAssets(manifestPath)
      .then((result) => console.log(JSON.stringify(result, null, 2)))
      .catch((error) => {
        console.error(error instanceof Error ? error.message : String(error));
        process.exitCode = 1;
      });
  }
}
