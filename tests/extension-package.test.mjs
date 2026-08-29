import assert from "node:assert/strict";
import { access, readFile, readdir, stat } from "node:fs/promises";
import { dirname, relative, resolve } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { gzipSync } from "node:zlib";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const distDirectory = resolve(projectRoot, "extension-dist");
// Keep the complete 1,452-card catalog available offline while preventing
// accidental entry-bundle growth from swallowing the lazy reading dossiers.
const offlineEntryBudgetBytes = 2_200_000;
const offlineEntryGzipBudgetBytes = 825_000;
const brand = JSON.parse(
  await readFile(resolve(projectRoot, "brand.json"), "utf8"),
);

async function readJson(path) {
  return JSON.parse(await readFile(path, "utf8"));
}

async function collectExtensionFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries
      .filter((entry) => entry.name !== ".DS_Store")
      .map(async (entry) => {
        const absolutePath = resolve(directory, entry.name);
        if (entry.isDirectory()) {
          return collectExtensionFiles(absolutePath);
        }
        return [relative(distDirectory, absolutePath).replaceAll("\\", "/")];
      }),
  );
  return nested.flat().sort();
}

function pngDimensions(buffer) {
  const signature = "89504e470d0a1a0a";
  assert.equal(buffer.subarray(0, 8).toString("hex"), signature);
  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  };
}

function pngColorType(buffer) {
  return buffer.readUInt8(25);
}

test("extension manifest is a minimal localized MV3 new-tab override", async () => {
  const manifest = await readJson(resolve(distDirectory, "manifest.json"));

  assert.equal(manifest.manifest_version, 3);
  assert.equal(manifest.version, brand.version);
  assert.equal(manifest.default_locale, "zh_CN");
  assert.equal(manifest.name, "__MSG_extensionName__");
  assert.equal(manifest.homepage_url, brand.repositoryUrl);
  assert.deepEqual(manifest.chrome_url_overrides, { newtab: "newtab.html" });

  for (const forbiddenKey of [
    "permissions",
    "optional_permissions",
    "host_permissions",
    "optional_host_permissions",
    "background",
    "content_scripts",
  ]) {
    assert.equal(
      Object.hasOwn(manifest, forbiddenKey),
      false,
      `manifest must not declare ${forbiddenKey}`,
    );
  }
});

test("all manifest locales contain translated store metadata", async () => {
  const expected = {
    zh_CN: [brand.storeNameZhHans, brand.shortNameZh, brand.descriptionZhHans],
    zh_TW: [brand.storeNameZhHant, brand.shortNameZh, brand.descriptionZhHant],
    en: [brand.storeNameEn, brand.shortNameEn, brand.descriptionEn],
  };

  for (const [locale, [name, shortName, description]] of Object.entries(expected)) {
    const messages = await readJson(
      resolve(distDirectory, "_locales", locale, "messages.json"),
    );
    assert.equal(messages.extensionName.message, name);
    assert.equal(messages.extensionShortName.message, shortName);
    assert.equal(messages.extensionDescription.message, description);
    assert.ok(messages.extensionSlogan.message);
  }
});

test("new-tab HTML loads only packaged resources", async () => {
  const html = await readFile(resolve(distDirectory, "newtab.html"), "utf8");
  const resourceReferences = [...html.matchAll(/(?:src|href)=["']([^"']+)["']/g)].map(
    (match) => match[1],
  );

  assert.ok(resourceReferences.length >= 2);
  for (const reference of resourceReferences) {
    assert.doesNotMatch(reference, /^(?:https?:)?\/\//i);
    assert.doesNotMatch(reference, /^(?:data|javascript):/i);
  }
  assert.match(html, /Content-Security-Policy/);
});

test("extension payload excludes research caches and source documents", async () => {
  // package-extension.mjs zips this directory verbatim, so checking the staged
  // payload protects the release boundary without creating another archive.
  const packagedFiles = await collectExtensionFiles(distDirectory);
  const forbiddenFiles = packagedFiles.filter(
    (path) =>
      /(?:^|\/)research\/source-cache(?:\/|$)/i.test(path) ||
      /\.pdf$/i.test(path) ||
      (/(?:^|\/)research(?:\/|$)/i.test(path) && /\.txt$/i.test(path)),
  );

  assert.deepEqual(
    forbiddenFiles,
    [],
    `extension payload contains research-only files: ${forbiddenFiles.join(", ")}`,
  );
});

test("deep-reading content stays lazy while the offline catalog keeps a bounded entry", async () => {
  const html = await readFile(resolve(distDirectory, "newtab.html"), "utf8");
  const entryReference = html.match(
    /<script[^>]+src=["']([^"']+\.js)["'][^>]*>/,
  )?.[1];

  assert.ok(entryReference, "newtab.html must declare a JavaScript entry");
  const entryPath = resolve(distDirectory, entryReference);
  const entrySource = await readFile(entryPath);
  const entryBytes = (await stat(entryPath)).size;
  const compressedEntryBytes = gzipSync(entrySource, { level: 9 }).byteLength;
  assert.ok(
    entryBytes < offlineEntryBudgetBytes,
    `initial JavaScript is ${entryBytes} bytes; the synchronous offline catalog exceeded its 2.2 MB budget`,
  );
  assert.ok(
    compressedEntryBytes < offlineEntryGzipBudgetBytes,
    `initial JavaScript is ${compressedEntryBytes} bytes after gzip; the offline catalog exceeded its transfer budget`,
  );

  const assets = await readdir(resolve(distDirectory, "assets"));
  for (const lazyChunk of [
    "ReadingUnitReader-",
    "thoughtDepthLoader-",
    "sourceMetadata-",
    "interpretationDetailsWestChinese-",
    "interpretationDetailsMaoScience-",
    "interpretationDetailsIndian-",
    "interpretationDetailsEconomics-",
    "illustrations-",
  ]) {
    assert.ok(
      assets.some((asset) => asset.startsWith(lazyChunk) && asset.endsWith(".js")),
      `${lazyChunk} must remain an asynchronously loaded chunk`,
    );
  }

  const sourceMetadataChunk = assets.find(
    (asset) => asset.startsWith("sourceMetadata-") && asset.endsWith(".js"),
  );
  assert.ok(sourceMetadataChunk);
  const sourceMetadata = await readFile(
    resolve(distDirectory, "assets", sourceMetadataChunk),
    "utf8",
  );
  for (const marker of ["篇章已定位", "Passage located"]) {
    assert.equal(
      entrySource.includes(marker),
      false,
      `${marker} belongs to the lazy source dossier, not the new-tab entry`,
    );
    assert.ok(
      sourceMetadata.includes(marker),
      `${marker} must remain in the lazy source-metadata chunk`,
    );
  }
});

test("prepared reading units are packaged offline but stay outside JavaScript", async () => {
  const sourceIndex = await readJson(resolve(projectRoot, "public/readings/index.json"));
  const packagedIndex = await readJson(resolve(distDirectory, "readings/index.json"));
  assert.deepEqual(packagedIndex, sourceIndex);

  const packagedUnitNames = (await readdir(resolve(distDirectory, "readings/units"))).sort();
  const expectedUnitNames = sourceIndex.units
    .filter(({ availability }) => availability === "integrated-candidate")
    .map(({ id }) => `${id}.json`)
    .sort();
  assert.deepEqual(packagedUnitNames, expectedUnitNames);

  const assets = (await readdir(resolve(distDirectory, "assets")))
    .filter((name) => name.endsWith(".js"));
  const javascript = Buffer.concat(await Promise.all(
    assets.map((name) => readFile(resolve(distDirectory, "assets", name))),
  ));
  const sampleUnit = await readJson(resolve(
    distDirectory,
    "readings/units",
    packagedUnitNames[0],
  ));
  const sampleParagraph = sampleUnit.paragraphs.find(({ text }) => text.length >= 32)?.text;
  assert.ok(sampleParagraph, "a packaged reading unit needs a representative paragraph");
  assert.equal(
    javascript.includes(Buffer.from(sampleParagraph)),
    false,
    "prepared source paragraphs belong in lazy JSON assets, not JavaScript chunks",
  );
});

test("extension icons and release artwork have exact dimensions", async () => {
  for (const size of [16, 32, 48, 128]) {
    const dimensions = pngDimensions(
      await readFile(resolve(distDirectory, "icons", `icon-${size}.png`)),
    );
    assert.deepEqual(dimensions, { width: size, height: size });
  }

  const artwork = [
    ["store-assets/store-icon-128.png", 128, 128],
    ["store-assets/small-promo-440x280.png", 440, 280],
    ["store-assets/marquee-1400x560.png", 1400, 560],
    ["store-assets/screenshot-1280x800-main.png", 1280, 800],
    ["store-assets/screenshot-1280x800-detail.png", 1280, 800],
    ["store-assets/screenshot-1280x800-context.png", 1280, 800],
    ["store-assets/screenshot-1280x800-share.png", 1280, 800],
    ["store-assets/screenshot-1280x800-controls.png", 1280, 800],
    ["store-assets/screenshot-1280x800-onboarding.png", 1280, 800],
    ["public/social-share.png", 1200, 630],
  ];

  for (const [path, width, height] of artwork) {
    const dimensions = pngDimensions(await readFile(resolve(projectRoot, path)));
    assert.deepEqual(dimensions, { width, height }, path);
  }
});

test("store screenshots and promo artwork are 24-bit RGB PNGs", async () => {
  for (const path of [
    "store-assets/small-promo-440x280.png",
    "store-assets/marquee-1400x560.png",
    "store-assets/screenshot-1280x800-main.png",
    "store-assets/screenshot-1280x800-detail.png",
    "store-assets/screenshot-1280x800-context.png",
    "store-assets/screenshot-1280x800-share.png",
    "store-assets/screenshot-1280x800-controls.png",
    "store-assets/screenshot-1280x800-onboarding.png",
  ]) {
    const buffer = await readFile(resolve(projectRoot, path));
    assert.equal(pngColorType(buffer), 2, `${path} must not contain alpha`);
  }
});

test("the built extension has every path declared by its manifest", async () => {
  const manifest = await readJson(resolve(distDirectory, "manifest.json"));
  await access(resolve(distDirectory, manifest.chrome_url_overrides.newtab));
  await Promise.all(
    Object.values(manifest.icons).map((path) =>
      access(resolve(distDirectory, path)),
    ),
  );
});
