import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import sharp from "sharp";
import ts from "typescript";
import { tsImport } from "tsx/esm/api";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const defaultProjectRoot = path.resolve(scriptDirectory, "..");
const validPlacements = new Set(["detail", "share"]);
const validPlanStatuses = new Set(["planned", "approved", "generated", "registered"]);
// A few long-standing corpus ids use underscores; runtime assets preserve the
// declared id verbatim so validation must accept the same legacy-safe grammar
// as the batch normalizer.
const runtimeFilePattern = /^([a-z0-9]+(?:[-_][a-z0-9]+)*)-v([1-9]\d*)\.webp$/;
const assetIdPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*-\d{3,}$/;
const batchPlanPattern = /^batch-(\d+)(?:-v\d+)?\.json$/;

async function filesBelow(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) return filesBelow(absolute);
    return entry.isFile() ? [absolute] : [];
  }));
  return nested.flat();
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
  return registry.thoughtIllustrations;
}

async function collectDeclaredIds(projectRoot) {
  const contentDirectory = path.join(projectRoot, "content");
  const importContent = (filename) => tsImport(
    pathToFileURL(path.join(contentDirectory, filename)).href,
    import.meta.url,
  );
  const [philosophy, chinese, mao, science, economics, indian, psychology] = await Promise.all([
    importContent("philosophy.ts"),
    importContent("chinese.ts"),
    importContent("mao.ts"),
    importContent("science.ts"),
    importContent("economics.ts"),
    importContent("indian.ts"),
    importContent("psychology.ts"),
  ]);
  const completeEconomics = await economics.loadCompleteEconomicsCatalog();
  return new Set([
    ...philosophy.thoughts,
    ...chinese.chineseThoughts,
    ...mao.maoThoughts,
    ...science.scienceThoughts,
    ...completeEconomics.thoughts,
    ...indian.indianThoughts,
    ...psychology.psychologyThoughts,
  ].map(({ id }) => id));
}

function duplicateValues(items, selector) {
  const seen = new Set();
  const duplicates = new Set();
  for (const item of items) {
    const value = selector(item);
    if (seen.has(value)) duplicates.add(value);
    seen.add(value);
  }
  return [...duplicates];
}

function validatePlacement(placement, label, errors) {
  if (!Array.isArray(placement) || placement.length === 0) {
    errors.push(`${label}: placement must contain detail, share, or both`);
    return;
  }
  if (new Set(placement).size !== placement.length) {
    errors.push(`${label}: placement contains duplicate values`);
  }
  for (const value of placement) {
    if (!validPlacements.has(value)) errors.push(`${label}: unsupported placement ${value}`);
  }
}

export async function validateIllustrationAssets(projectRoot = defaultProjectRoot) {
  const errors = [];
  const warnings = [];
  const registry = await loadRegistry(projectRoot);
  const declaredIds = await collectDeclaredIds(projectRoot);
  const planDirectory = path.join(projectRoot, "design", "illustrations");
  const planFiles = (await readdir(planDirectory))
    .filter((filename) => batchPlanPattern.test(filename))
    .sort();
  const plans = await Promise.all(planFiles.map(async (filename) => ({
    filename,
    expectedCount: Number(filename.match(batchPlanPattern)?.[1]),
    plan: JSON.parse(await readFile(path.join(planDirectory, filename), "utf8")),
  })));
  const illustrationDirectory = path.join(projectRoot, "public", "illustrations");
  const diskFiles = (await filesBelow(illustrationDirectory)).map((filename) => (
    path.relative(illustrationDirectory, filename).split(path.sep).join("/")
  ));

  if (!Array.isArray(registry)) errors.push("content/illustrations.ts must export thoughtIllustrations");
  if (plans.length === 0) errors.push("design/illustrations must contain at least one batch-*.json plan");
  for (const { filename, plan } of plans) {
    if (!Array.isArray(plan.items)) errors.push(`${filename} must contain an items array`);
  }

  const runtimeItems = Array.isArray(registry) ? registry : [];
  const plannedItems = plans.flatMap(({ filename, plan }) => (
    Array.isArray(plan.items) ? plan.items.map((item) => ({ ...item, planFilename: filename })) : []
  ));

  for (const field of ["thoughtId", "assetId", "src"]) {
    for (const value of duplicateValues(runtimeItems, (item) => item[field])) {
      errors.push(`runtime registry has duplicate ${field}: ${value}`);
    }
  }

  for (const item of runtimeItems) {
    const label = `runtime ${item.thoughtId ?? "<missing thoughtId>"}`;
    if (!declaredIds.has(item.thoughtId)) errors.push(`${label}: thoughtId is not declared in content`);
    if (!assetIdPattern.test(item.assetId ?? "")) errors.push(`${label}: invalid assetId ${item.assetId}`);
    validatePlacement(item.placement, label, errors);

    for (const field of ["altZh", "altEn", "captionZh", "captionEn"]) {
      if (typeof item[field] !== "string" || item[field].trim().length === 0) {
        errors.push(`${label}: ${field} must not be empty`);
      }
    }

    const relativeSrc = typeof item.src === "string" && item.src.startsWith("/illustrations/")
      ? item.src.slice("/illustrations/".length)
      : null;
    if (!relativeSrc || relativeSrc.includes("/")) {
      errors.push(`${label}: src must be a direct /illustrations/*.webp path`);
      continue;
    }
    const match = relativeSrc.match(runtimeFilePattern);
    if (!match || match[1] !== item.thoughtId) {
      errors.push(`${label}: filename must be <thoughtId>-vN.webp`);
    }

    const absolute = path.join(illustrationDirectory, relativeSrc);
    let fileStat;
    try {
      fileStat = await stat(absolute);
    } catch {
      errors.push(`${label}: missing file public/illustrations/${relativeSrc}`);
      continue;
    }

    const metadata = await sharp(absolute).metadata();
    if (metadata.format !== "webp") errors.push(`${label}: asset is not WebP`);
    if (metadata.width !== item.width || metadata.height !== item.height) {
      errors.push(`${label}: declared ${item.width}x${item.height}, actual ${metadata.width}x${metadata.height}`);
    }
    if (metadata.width !== 1536 || metadata.height !== 1024) {
      errors.push(`${label}: production canvas must be 1536x1024`);
    }
    if (metadata.space !== "srgb") errors.push(`${label}: color space must be sRGB`);
    if (metadata.hasAlpha) errors.push(`${label}: production WebP must not contain alpha`);
    if (fileStat.size > 420 * 1024) {
      errors.push(`${label}: ${(fileStat.size / 1024).toFixed(0)} KiB exceeds the 420 KiB limit`);
    } else if (fileStat.size > 300 * 1024) {
      warnings.push(`${label}: ${(fileStat.size / 1024).toFixed(0)} KiB exceeds the 300 KiB target`);
    }
  }

  const registeredFiles = new Set(runtimeItems
    .map((item) => item.src?.replace(/^\/illustrations\//, ""))
    .filter(Boolean));
  const knownPlanFiles = new Set(plannedItems
    .map((item) => item.file)
    .filter(Boolean));
  for (const filename of diskFiles) {
    if (!registeredFiles.has(filename) && !knownPlanFiles.has(filename)) {
      errors.push(`orphan runtime asset: public/illustrations/${filename}`);
    }
  }

  for (const { filename, expectedCount, plan } of plans) {
    const itemCount = Array.isArray(plan.items) ? plan.items.length : 0;
    if (itemCount !== expectedCount) {
      errors.push(`${filename} must contain exactly ${expectedCount} items, found ${itemCount}`);
    }
  }
  for (const field of ["thoughtId", "assetId", "file"]) {
    for (const value of duplicateValues(plannedItems, (item) => item[field])) {
      errors.push(`batch plan has duplicate ${field}: ${value}`);
    }
  }

  const runtimeThoughtIds = new Set(runtimeItems.map((item) => item.thoughtId));
  const runtimeAssetIds = new Set(runtimeItems.map((item) => item.assetId));
  for (const item of plannedItems) {
    const label = `plan ${item.planFilename} / ${item.thoughtId ?? "<missing thoughtId>"}`;
    if (!declaredIds.has(item.thoughtId)) errors.push(`${label}: thoughtId is not declared in content`);
    if (!assetIdPattern.test(item.assetId ?? "")) errors.push(`${label}: invalid assetId ${item.assetId}`);
    if (!runtimeFilePattern.test(item.file ?? "") || !item.file.startsWith(`${item.thoughtId}-v`)) {
      errors.push(`${label}: file must be <thoughtId>-vN.webp`);
    }
    if (!validPlanStatuses.has(item.status)) errors.push(`${label}: invalid status ${item.status}`);
    validatePlacement(item.placement, label, errors);

    const absolute = path.join(illustrationDirectory, item.file);
    let fileStat;
    try {
      fileStat = await stat(absolute);
    } catch {
      if (item.status === "generated") {
        errors.push(`${label}: status is generated but public/illustrations/${item.file} is missing`);
      }
    }
    if (fileStat) {
      const metadata = await sharp(absolute).metadata();
      if (metadata.format !== "webp") errors.push(`${label}: generated asset is not WebP`);
      if (metadata.width !== 1536 || metadata.height !== 1024) {
        errors.push(`${label}: generated canvas must be 1536x1024`);
      }
      if (metadata.space !== "srgb") errors.push(`${label}: generated asset color space must be sRGB`);
      if (metadata.hasAlpha) errors.push(`${label}: generated WebP must not contain alpha`);
      if (fileStat.size > 420 * 1024) {
        errors.push(`${label}: generated asset ${(fileStat.size / 1024).toFixed(0)} KiB exceeds the 420 KiB limit`);
      } else if (fileStat.size > 300 * 1024) {
        warnings.push(`${label}: generated asset ${(fileStat.size / 1024).toFixed(0)} KiB exceeds the 300 KiB target`);
      }
    }

    if (item.status === "generated") {
      if (runtimeThoughtIds.has(item.thoughtId)) {
        warnings.push(`${label}: registry entry exists; status can be advanced to registered`);
      }
    } else if (item.status === "registered") {
      if (!runtimeThoughtIds.has(item.thoughtId)) errors.push(`${label}: status is registered but registry entry is missing`);
      if (!runtimeAssetIds.has(item.assetId)) errors.push(`${label}: registered assetId is missing from registry`);
    } else {
      if (runtimeThoughtIds.has(item.thoughtId) || runtimeAssetIds.has(item.assetId)) {
        warnings.push(`${label}: runtime entry exists; status can be advanced to registered`);
      }
    }
  }

  return {
    errors,
    warnings,
    stats: {
      registered: runtimeItems.length,
      planned: plannedItems.length,
      batches: plans.length,
      runtimeBytes: (await Promise.all(runtimeItems.map(async (item) => {
        const filename = item.src?.replace(/^\/illustrations\//, "");
        if (!filename) return 0;
        try {
          return (await stat(path.join(illustrationDirectory, filename))).size;
        } catch {
          return 0;
        }
      }))).reduce((sum, size) => sum + size, 0),
    },
  };
}

const invokedDirectly = process.argv[1]
  && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url;

if (invokedDirectly) {
  const result = await validateIllustrationAssets();
  for (const warning of result.warnings) console.warn(`warning: ${warning}`);
  if (result.errors.length > 0) {
    for (const error of result.errors) console.error(`error: ${error}`);
    process.exitCode = 1;
  } else {
    console.log(
      `Illustrations valid: ${result.stats.registered} registered, ${result.stats.planned} planned, `
      + `${(result.stats.runtimeBytes / 1024).toFixed(0)} KiB runtime assets.`,
    );
  }
}
