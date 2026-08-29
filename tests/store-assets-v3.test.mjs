import assert from "node:assert/strict";
import { access, readdir } from "node:fs/promises";
import { constants } from "node:fs";
import { dirname, resolve } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const assetsRoot = resolve(projectRoot, "store-assets", "v3");
const uploadRoot = resolve(assetsRoot, "upload");
const locales = ["zh-CN", "zh-TW", "en", "global"];

async function pngFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return entries
    .filter(
      (entry) => entry.isFile() && entry.name.toLowerCase().endsWith(".png"),
    )
    .map((entry) => resolve(directory, entry.name))
    .sort();
}

async function assertPngDimensions(file, width, height) {
  const metadata = await sharp(file).metadata();
  assert.equal(metadata.format, "png", `${file} must be a PNG`);
  assert.equal(metadata.width, width, `${file} must be ${width}px wide`);
  assert.equal(metadata.height, height, `${file} must be ${height}px high`);
  return metadata;
}

async function assertOpaqueRgbPng(file, width, height) {
  const metadata = await assertPngDimensions(file, width, height);
  assert.equal(metadata.space, "srgb", `${file} must use an RGB color space`);
  assert.equal(metadata.channels, 3, `${file} must have exactly 3 RGB channels`);
  assert.equal(metadata.hasAlpha, false, `${file} must not contain alpha`);
  assert.equal(metadata.isPalette, false, `${file} must not be palette indexed`);
  assert.equal(metadata.bitsPerSample, 8, `${file} must use 8-bit channels`);
}

test("v3 documentation and asset manifest exist", async () => {
  await Promise.all([
    access(resolve(assetsRoot, "README.md"), constants.R_OK),
    access(resolve(assetsRoot, "asset-manifest.json"), constants.R_OK),
  ]);
});

test("v3 global icon and promotional tiles meet Chrome Web Store dimensions", async () => {
  await assertPngDimensions(
    resolve(uploadRoot, "global", "store-icon-128.png"),
    128,
    128,
  );
  await Promise.all([
    assertOpaqueRgbPng(
      resolve(uploadRoot, "global", "small-promo-440x280.png"),
      440,
      280,
    ),
    assertOpaqueRgbPng(
      resolve(uploadRoot, "global", "marquee-1400x560.png"),
      1400,
      560,
    ),
  ]);
});

for (const locale of locales) {
  test(`v3 ${locale} upload set contains five compliant screenshots`, async () => {
    const directory = resolve(uploadRoot, locale);
    const screenshots = (await pngFiles(directory)).filter((file) =>
      /^screenshot-.*\.png$/i.test(file.split("/").at(-1)),
    );

    assert.ok(
      screenshots.length >= 1 && screenshots.length <= 5,
      `upload/${locale} must contain between 1 and 5 screenshots`,
    );
    assert.equal(
      screenshots.length,
      5,
      `upload/${locale} is expected to ship all 5 product screenshots`,
    );
    await Promise.all(
      screenshots.map((file) => assertOpaqueRgbPng(file, 1280, 800)),
    );
  });
}
