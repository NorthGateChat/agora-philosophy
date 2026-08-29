import { createHash } from "node:crypto";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import sharp from "sharp";

import {
  CONTACT_SHEET_SIZE,
  EXPECTED_UPLOAD_FILES,
  GLOBAL_SOURCE_LOCALE,
  ICON_SIZE,
  MANIFEST_PATH,
  MARQUEE_SIZE,
  PIPELINE_VERSION,
  SCENES,
  SCREENSHOT_SIZE,
  SMALL_PROMO_SIZE,
  SOURCE_CAPTURE_SIZE,
  SOURCE_LOCALES,
  TARGET_LOCALES,
  V6_ICON_SOURCE,
  VERSION_ROOT,
  contactSheetPath,
  relativeToProject,
  uploadDirectory,
} from "./store-assets-v7-config.mjs";

const SHA256 = "sha256";

function visibleFiles(entries) {
  return entries.filter((entry) => !entry.startsWith("."));
}

function compareFileSets(actual, expected) {
  const actualSet = new Set(actual);
  const expectedSet = new Set(expected);
  return {
    missing: expected.filter((file) => !actualSet.has(file)),
    unexpected: actual.filter((file) => !expectedSet.has(file)),
  };
}

async function sha256(filePath) {
  return createHash(SHA256).update(await readFile(filePath)).digest("hex");
}

async function inspectImage(filePath) {
  const metadata = await sharp(filePath).metadata();
  return {
    format: metadata.format,
    width: metadata.width,
    height: metadata.height,
    space: metadata.space,
    channels: metadata.channels,
    hasAlpha: Boolean(metadata.hasAlpha),
  };
}

function pushImageErrors(errors, label, image, expected, { allowAlpha = false } = {}) {
  if (image.format !== "png") {
    errors.push(`${label}: expected PNG, received ${image.format ?? "unknown"}`);
  }
  if (image.width !== expected.width || image.height !== expected.height) {
    errors.push(
      `${label}: expected ${expected.width}x${expected.height}, received ${image.width}x${image.height}`,
    );
  }
  if (image.space !== "srgb") {
    errors.push(`${label}: expected sRGB, received ${image.space ?? "unknown"}`);
  }
  if (allowAlpha) {
    if (image.channels !== 4 || !image.hasAlpha) {
      errors.push(`${label}: the store icon must retain its RGBA transparency`);
    }
  } else if (image.channels !== 3 || image.hasAlpha) {
    errors.push(`${label}: expected RGB without alpha`);
  }
}

function throwIfErrors(title, errors) {
  if (errors.length === 0) return;
  const detail = errors.map((error) => `  - ${error}`).join("\n");
  throw new Error(`${title}\n${detail}`);
}

export async function validateV7Sources() {
  const errors = [];
  const expectedNames = SCENES.map((scene) => scene.sourceFile);

  for (const locale of SOURCE_LOCALES) {
    const localeRoot = path.join(VERSION_ROOT, "source/screenshots", locale);
    let names = [];
    try {
      names = visibleFiles(await readdir(localeRoot));
    } catch {
      errors.push(`${locale}: source directory is missing`);
      continue;
    }

    const { missing, unexpected } = compareFileSets(names, expectedNames);
    if (missing.length > 0) {
      errors.push(`${locale}: missing ${missing.join(", ")}`);
    }
    if (unexpected.length > 0) {
      errors.push(`${locale}: unexpected files ${unexpected.join(", ")}`);
    }

    for (const file of expectedNames.filter((name) => names.includes(name))) {
      const sourcePath = path.join(localeRoot, file);
      try {
        const image = await inspectImage(sourcePath);
        if (
          image.width !== SOURCE_CAPTURE_SIZE.width ||
          image.height !== SOURCE_CAPTURE_SIZE.height
        ) {
          errors.push(
            `${locale}/${file}: expected ${SOURCE_CAPTURE_SIZE.width}x${SOURCE_CAPTURE_SIZE.height}, received ${image.width}x${image.height}`,
          );
        }
        if (image.space !== "srgb") {
          errors.push(`${locale}/${file}: expected sRGB source, received ${image.space}`);
        }
      } catch (error) {
        errors.push(`${locale}/${file}: unreadable image (${error.message})`);
      }
    }
  }

  try {
    await readFile(V6_ICON_SOURCE);
  } catch {
    errors.push(`logo source is missing: ${relativeToProject(V6_ICON_SOURCE)}`);
  }

  throwIfErrors("V7 source preflight failed; no assets were generated.", errors);
  return { localeCount: SOURCE_LOCALES.length, sceneCount: SCENES.length };
}

function dimensionsForUpload(file) {
  if (file.startsWith("screenshot-")) return SCREENSHOT_SIZE;
  if (file === "small-promo-440x280.png") return SMALL_PROMO_SIZE;
  if (file === "marquee-1400x560.png") return MARQUEE_SIZE;
  if (file === "store-icon-128.png") return ICON_SIZE;
  return null;
}

function manifestOutputKey(locale, file) {
  return `${locale}/${file}`;
}

function validateProvenance(errors, output) {
  const sources = Array.isArray(output.sources) ? output.sources : [];
  if (output.previewOnly) return;

  if (sources.length === 0) {
    errors.push(`${output.locale}/${output.file}: manifest has no source provenance`);
  }
  if (!Number.isInteger(output.compositePasses) || output.compositePasses > 1) {
    errors.push(
      `${output.locale}/${output.file}: upload assets may use at most one composite pass`,
    );
  }

  for (const source of sources) {
    const normalized = source.replaceAll("\\", "/");
    const isApprovedIconSource =
      normalized === "store-assets/v6-agora-dialogue/source/store-icon-128.svg";
    if (normalized.includes("/upload/") || normalized.includes("/preview/")) {
      errors.push(
        `${output.locale}/${output.file}: upload provenance points to a rendered asset (${source})`,
      );
    }
    if (/store-assets\/v[2-6][^/]*/.test(normalized) && !isApprovedIconSource) {
      errors.push(
        `${output.locale}/${output.file}: legacy store asset is not an approved source (${source})`,
      );
    }
  }
}

export async function validateV7RenderedTree(
  root = VERSION_ROOT,
  { validateManifest = true } = {},
) {
  const errors = [];
  const hashes = new Map();

  for (const locale of TARGET_LOCALES) {
    const localeRoot = uploadDirectory(root, locale);
    let names = [];
    try {
      names = visibleFiles(await readdir(localeRoot));
    } catch {
      errors.push(`${locale}: upload directory is missing`);
      continue;
    }

    const { missing, unexpected } = compareFileSets(names, EXPECTED_UPLOAD_FILES);
    if (missing.length > 0) errors.push(`${locale}: missing ${missing.join(", ")}`);
    if (unexpected.length > 0) {
      errors.push(`${locale}: unexpected upload files ${unexpected.join(", ")}`);
    }

    for (const file of EXPECTED_UPLOAD_FILES.filter((name) => names.includes(name))) {
      const filePath = path.join(localeRoot, file);
      try {
        const image = await inspectImage(filePath);
        pushImageErrors(errors, `${locale}/${file}`, image, dimensionsForUpload(file), {
          allowAlpha: file === "store-icon-128.png",
        });
        hashes.set(manifestOutputKey(locale, file), await sha256(filePath));
      } catch (error) {
        errors.push(`${locale}/${file}: unreadable image (${error.message})`);
      }
    }

    const sheetPath = contactSheetPath(root, locale);
    try {
      const image = await inspectImage(sheetPath);
      pushImageErrors(
        errors,
        `${locale}-contact-sheet.png`,
        image,
        CONTACT_SHEET_SIZE,
      );
      hashes.set(
        manifestOutputKey(locale, `${locale}-contact-sheet.png`),
        await sha256(sheetPath),
      );
    } catch (error) {
      errors.push(`${locale}: contact sheet is missing or unreadable (${error.message})`);
    }
  }

  for (const file of EXPECTED_UPLOAD_FILES) {
    const enHash = hashes.get(manifestOutputKey(GLOBAL_SOURCE_LOCALE, file));
    const globalHash = hashes.get(manifestOutputKey("global", file));
    if (enHash && globalHash && enHash !== globalHash) {
      errors.push(`global/${file}: must be byte-identical to the English asset`);
    }
  }

  const iconHashes = TARGET_LOCALES.map((locale) =>
    hashes.get(manifestOutputKey(locale, "store-icon-128.png")),
  ).filter(Boolean);
  if (new Set(iconHashes).size > 1) {
    errors.push("store icon differs between locale upload directories");
  }

  if (validateManifest) {
    const manifestPath = path.join(root, path.basename(MANIFEST_PATH));
    try {
      const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
      if (manifest.pipelineVersion !== PIPELINE_VERSION) {
        errors.push(
          `manifest: expected pipelineVersion ${PIPELINE_VERSION}, received ${manifest.pipelineVersion}`,
        );
      }

      const outputEntries = Array.isArray(manifest.outputs) ? manifest.outputs : [];
      const byKey = new Map(
        outputEntries.map((output) => [
          manifestOutputKey(output.locale, output.file),
          output,
        ]),
      );

      for (const locale of TARGET_LOCALES) {
        for (const file of EXPECTED_UPLOAD_FILES) {
          const key = manifestOutputKey(locale, file);
          const output = byKey.get(key);
          if (!output) {
            errors.push(`manifest: missing output entry ${key}`);
            continue;
          }
          if (hashes.get(key) && output.sha256 !== hashes.get(key)) {
            errors.push(`manifest: hash mismatch for ${key}`);
          }
          validateProvenance(errors, output);
        }

        const sheetFile = `${locale}-contact-sheet.png`;
        const sheetKey = manifestOutputKey(locale, sheetFile);
        const sheet = byKey.get(sheetKey);
        if (!sheet || sheet.previewOnly !== true) {
          errors.push(`manifest: ${sheetKey} must be present and marked previewOnly`);
        } else if (hashes.get(sheetKey) && sheet.sha256 !== hashes.get(sheetKey)) {
          errors.push(`manifest: hash mismatch for ${sheetKey}`);
        }
      }
    } catch (error) {
      errors.push(`manifest is missing or invalid (${error.message})`);
    }
  }

  throwIfErrors("V7 rendered asset validation failed.", errors);
  return {
    localeCount: TARGET_LOCALES.length,
    uploadAssetCount: TARGET_LOCALES.length * EXPECTED_UPLOAD_FILES.length,
    contactSheetCount: TARGET_LOCALES.length,
  };
}

async function main() {
  const sourcesOnly = process.argv.includes("--sources");
  const sourceSummary = await validateV7Sources();
  if (sourcesOnly) {
    console.log(
      `V7 sources valid: ${sourceSummary.localeCount} locales × ${sourceSummary.sceneCount} scenes.`,
    );
    return;
  }

  const outputSummary = await validateV7RenderedTree();
  console.log(
    `V7 assets valid: ${outputSummary.uploadAssetCount} upload files and ${outputSummary.contactSheetCount} contact sheets.`,
  );
}

const isDirectRun =
  process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isDirectRun) {
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
