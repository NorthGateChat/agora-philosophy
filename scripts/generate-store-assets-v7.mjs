import { createHash } from "node:crypto";
import {
  access,
  copyFile,
  mkdir,
  readFile,
  rename,
  rm,
  writeFile,
} from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

import {
  BRAND,
  CONTACT_SHEET_SIZE,
  COPY,
  EXPECTED_UPLOAD_FILES,
  FONT_PATHS,
  GLOBAL_SOURCE_LOCALE,
  ICON_SIZE,
  MARQUEE_SIZE,
  PALETTE,
  PIPELINE_VERSION,
  PREVIEW_ROOT,
  SCENES,
  SCREENSHOT_SIZE,
  SMALL_PROMO_SIZE,
  SOURCE_CAPTURE_SIZE,
  SOURCE_LOCALES,
  TARGET_LOCALES,
  UPLOAD_ROOT,
  V6_ICON_SOURCE,
  V7_ICON_SOURCE,
  VERSION_ROOT,
  contactSheetPath,
  relativeToProject,
  uploadDirectory,
} from "./store-assets-v7-config.mjs";
import {
  validateV7RenderedTree,
  validateV7Sources,
} from "./validate-store-assets-v7.mjs";

const SOURCE_SCREENSHOT_ROOT = path.join(VERSION_ROOT, "source/screenshots");
const STAGING_PREFIX = ".v7-build-";

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function svgDocument(width, height, content, defs = "") {
  return Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"
  viewBox="0 0 ${width} ${height}">
  <defs>
    <style>
      @font-face { font-family: "Nothing Final Sans"; src: url("${escapeXml(FONT_PATHS.sans)}"); }
      @font-face { font-family: "Nothing Final Serif"; src: url("${escapeXml(FONT_PATHS.serif)}"); }
      .sans { font-family: "Nothing Final Sans", "Helvetica Neue", Arial, sans-serif; }
      .serif { font-family: "Nothing Final Serif", Georgia, "Times New Roman", serif; }
      .cjk { font-family: "Songti SC", STSong, "Noto Serif CJK SC", serif; }
    </style>
    ${defs}
  </defs>
  ${content}
</svg>`);
}

function serifClass(locale) {
  return locale === "en" ? "serif" : "cjk";
}

function brandNameForLocale(locale) {
  if (locale === "en" || locale === "global") return BRAND.nameEn;
  if (locale === "zh-TW") return BRAND.nameZhHant;
  return BRAND.nameZhHans;
}

function currentBrandIconSvg(sourceBuffer) {
  return Buffer.from(
    sourceBuffer
      .toString("utf8")
      .replace(
        /<title>[\s\S]*?<\/title>/,
        `<title>${escapeXml(`${BRAND.nameEn} app icon`)}</title>`,
      )
      .replace(
        /<desc>[\s\S]*?<\/desc>/,
        `<desc>${escapeXml("An open ring with a warm dot, the symbol for an idea that remains open to revision.")}</desc>`,
      )
      .replaceAll('"AGORA Sans"', '"Nothing Final Sans"')
      .replaceAll('"AGORA Serif"', '"Nothing Final Serif"')
      .replace(/\s*<symbol id="agora-wordmark"[\s\S]*?<\/symbol>/, ""),
  );
}

async function sha256(filePath) {
  return createHash("sha256").update(await readFile(filePath)).digest("hex");
}

async function normalizeScreenshot(sourcePath) {
  return sharp(sourcePath)
    .rotate()
    .resize(SOURCE_CAPTURE_SIZE.width, SOURCE_CAPTURE_SIZE.height, {
      fit: "fill",
    })
    .flatten({ background: PALETTE.ivory })
    .removeAlpha()
    .toColourspace("srgb")
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toBuffer();
}

async function renderLogoBuffers(iconSvg) {
  const icon = await sharp(iconSvg, { density: 288 })
    .resize(ICON_SIZE.width, ICON_SIZE.height)
    .ensureAlpha()
    .toColourspace("srgb")
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toBuffer();
  const header = await sharp(iconSvg, { density: 288 })
    .resize(64, 64)
    .ensureAlpha()
    .toColourspace("srgb")
    .png()
    .toBuffer();
  const promo = await sharp(iconSvg, { density: 288 })
    .resize(72, 72)
    .ensureAlpha()
    .toColourspace("srgb")
    .png()
    .toBuffer();
  return { icon, header, promo };
}

function screenshotHeader(locale, scene) {
  const copy = COPY[locale].scenes[scene.key];
  const family = serifClass(locale);
  return svgDocument(
    SCREENSHOT_SIZE.width,
    80,
    `
    <rect width="1280" height="80" fill="${PALETTE.ink}"/>
    <line x1="0" y1="79.5" x2="1280" y2="79.5" stroke="${PALETTE.ivory}" stroke-opacity="0.12"/>
    <text x="86" y="26" class="sans" fill="${PALETTE.orange}" font-size="9"
      letter-spacing="1.8">${escapeXml(copy.eyebrow)}</text>
    <text x="86" y="57" class="${family}" fill="${PALETTE.ivory}" font-size="21"
      letter-spacing="0.15">${escapeXml(copy.title)}</text>
    <text x="1248" y="48" class="sans" text-anchor="end" fill="${PALETTE.ivory}"
      fill-opacity="0.48" font-size="10.5" letter-spacing="0.35">${escapeXml(copy.detail)}</text>
    <text x="1248" y="26" class="sans" text-anchor="end" fill="${PALETTE.ivory}"
      fill-opacity="0.25" font-size="8.5" letter-spacing="1.6">0${scene.index} / 05</text>
  `,
  );
}

async function renderStoreScreenshot({ locale, scene, source, logo, outputPath }) {
  await sharp({
    create: {
      width: SCREENSHOT_SIZE.width,
      height: SCREENSHOT_SIZE.height,
      channels: 3,
      background: PALETTE.ink,
    },
  })
    .composite([
      { input: source, left: 0, top: 80 },
      { input: screenshotHeader(locale, scene), left: 0, top: 0 },
      { input: logo, left: 8, top: 8 },
    ])
    .flatten({ background: PALETTE.ink })
    .removeAlpha()
    .toColourspace("srgb")
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(outputPath);
}

function smallPromoOverlay(locale) {
  const [lineOne, lineTwo] = COPY[locale].small;
  const family = serifClass(locale);
  return svgDocument(
    SMALL_PROMO_SIZE.width,
    SMALL_PROMO_SIZE.height,
    `
    <defs>
      <linearGradient id="fade" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="${PALETTE.ink}" stop-opacity="1"/>
        <stop offset="0.42" stop-color="${PALETTE.ink}" stop-opacity="0.98"/>
        <stop offset="0.72" stop-color="${PALETTE.ink}" stop-opacity="0.45"/>
        <stop offset="1" stop-color="${PALETTE.ink}" stop-opacity="0.08"/>
      </linearGradient>
    </defs>
    <rect width="440" height="280" fill="url(#fade)"/>
    <rect x="205.5" y="19.5" width="214" height="241" rx="10" fill="none"
      stroke="${PALETTE.ivory}" stroke-opacity="0.22"/>
    <text x="30" y="100" class="sans" fill="${PALETTE.ivory}" font-size="20"
      letter-spacing="${locale === "en" || locale === "global" ? "2.6" : "4.8"}">${escapeXml(brandNameForLocale(locale))}</text>
    <text x="30" y="154" class="${family}" fill="${PALETTE.ivory}" font-size="24">${escapeXml(lineOne)}</text>
    <text x="30" y="188" class="${family}" fill="${PALETTE.ivory}" font-size="24">${escapeXml(lineTwo)}</text>
    <circle cx="31" cy="232" r="3" fill="${PALETTE.orange}"/>
    <line x1="42" y1="232" x2="164" y2="232" stroke="${PALETTE.ivory}" stroke-opacity="0.24"/>
  `,
  );
}

async function renderSmallPromo({ locale, source, logo, outputPath }) {
  const panel = await sharp(source)
    .resize(235, 242, { fit: "cover", position: "centre" })
    .toColourspace("srgb")
    .png()
    .toBuffer();

  await sharp({
    create: {
      width: SMALL_PROMO_SIZE.width,
      height: SMALL_PROMO_SIZE.height,
      channels: 3,
      background: PALETTE.ink,
    },
  })
    .composite([
      { input: panel, left: 194, top: 19 },
      { input: smallPromoOverlay(locale), left: 0, top: 0 },
      { input: logo, left: 10, top: 8 },
    ])
    .flatten({ background: PALETTE.ink })
    .removeAlpha()
    .toColourspace("srgb")
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(outputPath);
}

function marqueeOverlay(locale) {
  const copy = COPY[locale].marquee;
  const family = serifClass(locale);
  return svgDocument(
    MARQUEE_SIZE.width,
    MARQUEE_SIZE.height,
    `
    <defs>
      <filter id="shadow" x="-30%" y="-30%" width="160%" height="180%">
        <feDropShadow dx="0" dy="16" stdDeviation="22" flood-color="#000000" flood-opacity="0.28"/>
      </filter>
      <linearGradient id="panel-fade" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="${PALETTE.ink}" stop-opacity="0.5"/>
        <stop offset="0.16" stop-color="${PALETTE.ink}" stop-opacity="0"/>
        <stop offset="1" stop-color="${PALETTE.ink}" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <rect x="610" y="49" width="740" height="462" rx="22" fill="none"
      stroke="${PALETTE.ivory}" stroke-opacity="0.22" filter="url(#shadow)"/>
    <rect x="610" y="49" width="740" height="462" rx="22" fill="url(#panel-fade)"/>
    <text x="125" y="136" class="sans" fill="${PALETTE.ivory}" font-size="31"
      letter-spacing="${locale === "en" || locale === "global" ? "3.2" : "7.6"}">${escapeXml(brandNameForLocale(locale))}</text>
    <text x="76" y="184" class="sans" fill="${PALETTE.orange}" font-size="10.5"
      letter-spacing="2.6">${escapeXml(copy.kicker)}</text>
    <text x="72" y="276" class="${family}" fill="${PALETTE.ivory}" font-size="42">${escapeXml(copy.title[0])}</text>
    <text x="72" y="332" class="${family}" fill="${PALETTE.ivory}" font-size="42">${escapeXml(copy.title[1])}</text>
    <text x="75" y="386" class="sans" fill="${PALETTE.ivory}" fill-opacity="0.5"
      font-size="13.5" letter-spacing="0.25">${escapeXml(copy.subtitle)}</text>
    <circle cx="76" cy="455" r="4" fill="${PALETTE.orange}"/>
    <line x1="92" y1="455" x2="526" y2="455" stroke="${PALETTE.ivory}" stroke-opacity="0.18"/>
    <text x="526" y="481" class="sans" text-anchor="end" fill="${PALETTE.ivory}"
      fill-opacity="0.3" font-size="9" letter-spacing="2">READ · TRACE · KEEP · SHARE</text>
  `,
  );
}

async function renderMarquee({ locale, source, logo, outputPath }) {
  const panel = await sharp(source)
    .resize(740, 462, { fit: "cover", position: "centre" })
    .toColourspace("srgb")
    .png()
    .toBuffer();
  const largeLogo = await sharp(logo).resize(82, 82).png().toBuffer();

  await sharp({
    create: {
      width: MARQUEE_SIZE.width,
      height: MARQUEE_SIZE.height,
      channels: 3,
      background: PALETTE.ink,
    },
  })
    .composite([
      { input: panel, left: 610, top: 49 },
      { input: marqueeOverlay(locale), left: 0, top: 0 },
      { input: largeLogo, left: 25, top: 85 },
    ])
    .flatten({ background: PALETTE.ink })
    .removeAlpha()
    .toColourspace("srgb")
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(outputPath);
}

function contactSheetOverlay(locale) {
  const labels = [
    ["01", 64, 104],
    ["02", 832, 104],
    ["03", 64, 574],
    ["04", 832, 574],
    ["05", 64, 1044],
  ];
  const frames = [
    [64, 120, 704, 440],
    [832, 120, 704, 440],
    [64, 590, 704, 440],
    [832, 590, 704, 440],
    [64, 1060, 704, 440],
    [832, 1060, 440, 280],
    [240, 1368, 1120, 448],
  ];
  return svgDocument(
    CONTACT_SHEET_SIZE.width,
    CONTACT_SHEET_SIZE.height,
    `
    <text x="64" y="62" class="sans" fill="${PALETTE.ink}" font-size="17"
      letter-spacing="3">${escapeXml(brandNameForLocale(locale))} · CHROME WEB STORE · V7</text>
    <text x="1536" y="62" class="sans" text-anchor="end" fill="${PALETTE.ink}"
      fill-opacity="0.45" font-size="13" letter-spacing="2">${escapeXml(locale.toUpperCase())}</text>
    ${labels
      .map(
        ([label, x, y]) =>
          `<text x="${x}" y="${y}" class="sans" fill="${PALETTE.ink}" fill-opacity="0.46" font-size="11" letter-spacing="1.8">${label}</text>`,
      )
      .join("\n")}
    ${frames
      .map(
        ([x, y, width, height]) =>
          `<rect x="${x - 0.5}" y="${y - 0.5}" width="${width + 1}" height="${height + 1}" fill="none" stroke="${PALETTE.ink}" stroke-opacity="0.18"/>`,
      )
      .join("\n")}
    <text x="832" y="1044" class="sans" fill="${PALETTE.ink}" fill-opacity="0.46"
      font-size="11" letter-spacing="1.8">PROMO + ICON</text>
    <text x="240" y="1352" class="sans" fill="${PALETTE.ink}" fill-opacity="0.46"
      font-size="11" letter-spacing="1.8">MARQUEE</text>
  `,
  );
}

async function createContactSheet({ root, locale }) {
  const uploadRoot = uploadDirectory(root, locale);
  const screenshotBuffers = await Promise.all(
    SCENES.map((scene) =>
      sharp(path.join(uploadRoot, scene.outputFile))
        .resize(704, 440)
        .png()
        .toBuffer(),
    ),
  );
  const small = await sharp(path.join(uploadRoot, "small-promo-440x280.png"))
    .png()
    .toBuffer();
  const marquee = await sharp(path.join(uploadRoot, "marquee-1400x560.png"))
    .resize(1120, 448)
    .png()
    .toBuffer();
  const icon = await sharp(path.join(uploadRoot, "store-icon-128.png"))
    .resize(168, 168)
    .png()
    .toBuffer();

  const positions = [
    [64, 120],
    [832, 120],
    [64, 590],
    [832, 590],
    [64, 1060],
  ];
  const composites = screenshotBuffers.map((input, index) => ({
    input,
    left: positions[index][0],
    top: positions[index][1],
  }));
  composites.push(
    { input: small, left: 832, top: 1060 },
    { input: icon, left: 1336, top: 1096 },
    { input: marquee, left: 240, top: 1368 },
    { input: contactSheetOverlay(locale), left: 0, top: 0 },
  );

  const outputPath = contactSheetPath(root, locale);
  await sharp({
    create: {
      width: CONTACT_SHEET_SIZE.width,
      height: CONTACT_SHEET_SIZE.height,
      channels: 3,
      background: PALETTE.ivory,
    },
  })
    .composite(composites)
    .flatten({ background: PALETTE.ivory })
    .removeAlpha()
    .toColourspace("srgb")
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(outputPath);
  return outputPath;
}

function finalUploadPath(locale, file) {
  return path.join(UPLOAD_ROOT, locale, file);
}

async function recordOutput({
  locale,
  file,
  kind,
  stagedPath,
  sources,
  width,
  height,
  compositePasses,
  previewOnly = false,
  derivedFromLocale,
}) {
  const finalPath = previewOnly
    ? path.join(PREVIEW_ROOT, file)
    : finalUploadPath(locale, file);
  return {
    locale,
    file,
    kind,
    path: relativeToProject(finalPath),
    width,
    height,
    colorSpace: "srgb",
    alpha: kind === "store-icon",
    sources,
    compositePasses,
    previewOnly,
    ...(derivedFromLocale ? { derivedFromLocale } : {}),
    sha256: await sha256(stagedPath),
  };
}

async function captureInputManifest() {
  const inputs = [];
  for (const locale of SOURCE_LOCALES) {
    for (const scene of SCENES) {
      const sourcePath = path.join(SOURCE_SCREENSHOT_ROOT, locale, scene.sourceFile);
      const metadata = await sharp(sourcePath).metadata();
      inputs.push({
        locale,
        scene: scene.key,
        path: relativeToProject(sourcePath),
        width: metadata.width,
        height: metadata.height,
        format: metadata.format,
        sha256: await sha256(sourcePath),
      });
    }
  }
  inputs.push({
    locale: "all",
    scene: "store-icon",
    path: relativeToProject(V6_ICON_SOURCE),
    format: "svg",
    sha256: await sha256(V6_ICON_SOURCE),
  });
  return inputs;
}

async function buildLocale({ stagingRoot, locale, iconBuffers, outputs }) {
  const localeUploadRoot = uploadDirectory(stagingRoot, locale);
  await mkdir(localeUploadRoot, { recursive: true });

  const normalized = new Map();
  for (const scene of SCENES) {
    const sourcePath = path.join(SOURCE_SCREENSHOT_ROOT, locale, scene.sourceFile);
    normalized.set(scene.key, await normalizeScreenshot(sourcePath));
    const outputPath = path.join(localeUploadRoot, scene.outputFile);
    await renderStoreScreenshot({
      locale,
      scene,
      source: normalized.get(scene.key),
      logo: iconBuffers.header,
      outputPath,
    });
    outputs.push(
      await recordOutput({
        locale,
        file: scene.outputFile,
        kind: "screenshot",
        stagedPath: outputPath,
        sources: [relativeToProject(sourcePath)],
        width: SCREENSHOT_SIZE.width,
        height: SCREENSHOT_SIZE.height,
        compositePasses: 1,
      }),
    );
  }

  const smallPath = path.join(localeUploadRoot, "small-promo-440x280.png");
  await renderSmallPromo({
    locale,
    source: normalized.get("home"),
    logo: iconBuffers.promo,
    outputPath: smallPath,
  });
  outputs.push(
    await recordOutput({
      locale,
      file: "small-promo-440x280.png",
      kind: "small-promo",
      stagedPath: smallPath,
      sources: [
        relativeToProject(
          path.join(SOURCE_SCREENSHOT_ROOT, locale, SCENES[0].sourceFile),
        ),
      ],
      width: SMALL_PROMO_SIZE.width,
      height: SMALL_PROMO_SIZE.height,
      compositePasses: 1,
    }),
  );

  const marqueePath = path.join(localeUploadRoot, "marquee-1400x560.png");
  await renderMarquee({
    locale,
    source: normalized.get("detail-network"),
    logo: iconBuffers.promo,
    outputPath: marqueePath,
  });
  outputs.push(
    await recordOutput({
      locale,
      file: "marquee-1400x560.png",
      kind: "marquee",
      stagedPath: marqueePath,
      sources: [
        relativeToProject(
          path.join(SOURCE_SCREENSHOT_ROOT, locale, SCENES[2].sourceFile),
        ),
      ],
      width: MARQUEE_SIZE.width,
      height: MARQUEE_SIZE.height,
      compositePasses: 1,
    }),
  );

  const iconPath = path.join(localeUploadRoot, "store-icon-128.png");
  await writeFile(iconPath, iconBuffers.icon);
  outputs.push(
    await recordOutput({
      locale,
      file: "store-icon-128.png",
      kind: "store-icon",
      stagedPath: iconPath,
      sources: [relativeToProject(V6_ICON_SOURCE)],
      width: ICON_SIZE.width,
      height: ICON_SIZE.height,
      compositePasses: 0,
    }),
  );
}

async function buildGlobal({ stagingRoot, outputs }) {
  const enRoot = uploadDirectory(stagingRoot, GLOBAL_SOURCE_LOCALE);
  const globalRoot = uploadDirectory(stagingRoot, "global");
  await mkdir(globalRoot, { recursive: true });

  for (const file of EXPECTED_UPLOAD_FILES) {
    const sourcePath = path.join(enRoot, file);
    const outputPath = path.join(globalRoot, file);
    await copyFile(sourcePath, outputPath);
    const enOutput = outputs.find(
      (output) => output.locale === GLOBAL_SOURCE_LOCALE && output.file === file,
    );
    outputs.push(
      await recordOutput({
        locale: "global",
        file,
        kind: enOutput.kind,
        stagedPath: outputPath,
        sources: enOutput.sources,
        width: enOutput.width,
        height: enOutput.height,
        compositePasses: enOutput.compositePasses,
        derivedFromLocale: GLOBAL_SOURCE_LOCALE,
      }),
    );
  }
}

async function buildContactSheets({ stagingRoot, outputs }) {
  await mkdir(path.join(stagingRoot, "preview"), { recursive: true });
  for (const locale of TARGET_LOCALES) {
    const outputPath = await createContactSheet({ root: stagingRoot, locale });
    outputs.push(
      await recordOutput({
        locale,
        file: `${locale}-contact-sheet.png`,
        kind: "contact-sheet",
        stagedPath: outputPath,
        sources: EXPECTED_UPLOAD_FILES.map((file) =>
          relativeToProject(finalUploadPath(locale, file)),
        ),
        width: CONTACT_SHEET_SIZE.width,
        height: CONTACT_SHEET_SIZE.height,
        compositePasses: 1,
        previewOnly: true,
      }),
    );
  }
}

async function moveExistingToBackup(finalPath, backupPath) {
  try {
    await rename(finalPath, backupPath);
    return true;
  } catch (error) {
    if (error.code === "ENOENT") return false;
    throw error;
  }
}

async function commitStaging(stagingRoot) {
  const stamp = `${process.pid}-${Date.now()}`;
  const pairs = [
    [path.join(stagingRoot, "upload"), UPLOAD_ROOT],
    [path.join(stagingRoot, "preview"), PREVIEW_ROOT],
    [path.join(stagingRoot, "asset-manifest.json"), path.join(VERSION_ROOT, "asset-manifest.json")],
    [path.join(stagingRoot, "store-icon-128.svg"), V7_ICON_SOURCE],
  ];
  const backups = [];
  const committed = [];

  try {
    for (const [, finalPath] of pairs) {
      const backupPath = `${finalPath}.backup-${stamp}`;
      if (await moveExistingToBackup(finalPath, backupPath)) {
        backups.push([backupPath, finalPath]);
      }
    }
    for (const [stagedPath, finalPath] of pairs) {
      await mkdir(path.dirname(finalPath), { recursive: true });
      await rename(stagedPath, finalPath);
      committed.push(finalPath);
    }
    await Promise.all(backups.map(([backup]) => rm(backup, { recursive: true, force: true })));
  } catch (error) {
    await Promise.all(committed.map((finalPath) => rm(finalPath, { recursive: true, force: true })));
    for (const [backupPath, finalPath] of backups.reverse()) {
      await rename(backupPath, finalPath);
    }
    throw error;
  }
}

async function main() {
  // Preflight happens before mkdir/rm/write, so missing or stale captures can never
  // destroy a previously generated V7 set.
  await validateV7Sources();
  await Promise.all(Object.values(FONT_PATHS).map((fontPath) => access(fontPath)));

  const stagingRoot = path.join(
    VERSION_ROOT,
    `${STAGING_PREFIX}${process.pid}-${Date.now()}`,
  );
  const outputs = [];

  try {
    await mkdir(stagingRoot, { recursive: true });
    const iconSvg = currentBrandIconSvg(await readFile(V6_ICON_SOURCE));
    const iconBuffers = await renderLogoBuffers(iconSvg);
    await writeFile(path.join(stagingRoot, "store-icon-128.svg"), iconSvg);

    for (const locale of SOURCE_LOCALES) {
      await buildLocale({ stagingRoot, locale, iconBuffers, outputs });
    }
    await buildGlobal({ stagingRoot, outputs });
    await buildContactSheets({ stagingRoot, outputs });

    const manifest = {
      schemaVersion: 1,
      pipeline: "agora-chrome-store-assets",
      pipelineVersion: PIPELINE_VERSION,
      generatedAt: new Date().toISOString(),
      visualDirection: "Silent Orbit / 静默轨道",
      globalSourceLocale: GLOBAL_SOURCE_LOCALE,
      palette: PALETTE,
      inputs: await captureInputManifest(),
      outputs,
    };
    await writeFile(
      path.join(stagingRoot, "asset-manifest.json"),
      `${JSON.stringify(manifest, null, 2)}\n`,
      "utf8",
    );

    await validateV7RenderedTree(stagingRoot);
    await commitStaging(stagingRoot);
    await rm(stagingRoot, { recursive: true, force: true });

    console.log(`Generated and validated Chrome Web Store assets V${PIPELINE_VERSION}.`);
    for (const locale of TARGET_LOCALES) {
      console.log(`  ${locale}: 5 screenshots + small promo + marquee + icon`);
    }
    console.log(`  previews: ${TARGET_LOCALES.length} contact sheets`);
    console.log(`  output: ${relativeToProject(VERSION_ROOT)}`);
  } catch (error) {
    await rm(stagingRoot, { recursive: true, force: true });
    throw error;
  }
}

main().catch((error) => {
  console.error(error.stack ?? error.message);
  process.exitCode = 1;
});
