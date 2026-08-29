import { readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDirectory, "..");
const defaultRegistryPath = path.join(projectRoot, "content", "illustrations.ts");

function loadManifestItems(parsed) {
  const items = Array.isArray(parsed) ? parsed : parsed.items;
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("Metadata manifest must contain a non-empty items array");
  }

  const seen = new Set();
  for (const [index, item] of items.entries()) {
    const label = `items[${index}]`;
    if (typeof item?.thoughtId !== "string" || item.thoughtId.length === 0) {
      throw new Error(`${label}: thoughtId is required`);
    }
    if (seen.has(item.thoughtId)) throw new Error(`${label}: duplicate thoughtId`);
    seen.add(item.thoughtId);
    for (const key of ["altZh", "altEn"]) {
      if (typeof item[key] !== "string" || item[key].trim().length < 8 || /[\r\n]/.test(item[key])) {
        throw new Error(`${label}: ${key} must be a descriptive single-line string`);
      }
    }
  }
  return items;
}

function replaceMetadataBlock(registry, item) {
  const thoughtNeedle = `    thoughtId: ${JSON.stringify(item.thoughtId)},`;
  const occurrences = registry.split(thoughtNeedle).length - 1;
  if (occurrences !== 1) {
    throw new Error(`${item.thoughtId}: expected exactly one registry entry, found ${occurrences}`);
  }

  const thoughtIndex = registry.indexOf(thoughtNeedle);
  const blockStart = registry.lastIndexOf("  {\n", thoughtIndex);
  const blockEnd = registry.indexOf("\n  },", thoughtIndex);
  if (blockStart < 0 || blockEnd < 0) {
    throw new Error(`${item.thoughtId}: could not locate registry object boundaries`);
  }

  const originalBlock = registry.slice(blockStart, blockEnd + 5);
  let updatedBlock = originalBlock;
  for (const key of ["altZh", "altEn"]) {
    const fieldPattern = new RegExp(`^    ${key}: .*,$`, "m");
    if (!fieldPattern.test(updatedBlock)) {
      throw new Error(`${item.thoughtId}: registry entry is missing ${key}`);
    }
    updatedBlock = updatedBlock.replace(fieldPattern, `    ${key}: ${JSON.stringify(item[key])},`);
  }
  return registry.slice(0, blockStart) + updatedBlock + registry.slice(blockEnd + 5);
}

export async function updateIllustrationMetadata(manifestPath, options = {}) {
  const registryPath = options.registryPath ?? defaultRegistryPath;
  const parsed = JSON.parse(await readFile(path.resolve(manifestPath), "utf8"));
  const items = loadManifestItems(parsed);
  const originalRegistry = await readFile(registryPath, "utf8");
  let updatedRegistry = originalRegistry;
  for (const item of items) updatedRegistry = replaceMetadataBlock(updatedRegistry, item);

  if (options.write) {
    const temporaryPath = `${registryPath}.tmp-${process.pid}`;
    await writeFile(temporaryPath, updatedRegistry, "utf8");
    await rename(temporaryPath, registryPath);
  }
  return {
    checked: items.length,
    changed: updatedRegistry !== originalRegistry,
    wrote: Boolean(options.write),
  };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const manifestPath = process.argv[2];
  const write = process.argv.includes("--write");
  if (!manifestPath) {
    console.error("Usage: node scripts/update-illustration-metadata.mjs <manifest.json> [--write]");
    process.exitCode = 1;
  } else {
    updateIllustrationMetadata(manifestPath, { write })
      .then((result) => console.log(JSON.stringify(result, null, 2)))
      .catch((error) => {
        console.error(error instanceof Error ? error.message : String(error));
        process.exitCode = 1;
      });
  }
}
