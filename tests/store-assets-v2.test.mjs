import assert from "node:assert/strict";
import { readFile, readdir, stat } from "node:fs/promises";
import { createHash } from "node:crypto";
import { dirname, resolve } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const assetsRoot = resolve(projectRoot, "store-assets", "v2");
const uploadDirectories = ["zh-CN", "global"].map((locale) => ({
  locale,
  directory: resolve(assetsRoot, "upload", locale),
}));
const storyDirectories = ["zh-CN", "en"].map((locale) => ({
  locale,
  directory: resolve(assetsRoot, "story", locale),
}));
const campaignDirectories = ["zh-CN", "en"].map((locale) => ({
  locale,
  directory: resolve(assetsRoot, "campaign", locale),
}));
const screenshotNames = [
  "screenshot-01-discover-1280x800.png",
  "screenshot-02-collections-1280x800.png",
  "screenshot-03-read-deeper-1280x800.png",
  "screenshot-04-library-1280x800.png",
  "screenshot-05-share-1280x800.png",
];

async function pngFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return entries
    .filter(
      (entry) => entry.isFile() && entry.name.toLowerCase().endsWith(".png"),
    )
    .map((entry) => resolve(directory, entry.name))
    .sort();
}

async function directoryExists(directory) {
  try {
    return (await stat(directory)).isDirectory();
  } catch (error) {
    if (error?.code === "ENOENT") return false;
    throw error;
  }
}

function findSingle(files, pattern, label) {
  const matches = files.filter((file) => pattern.test(file));
  assert.equal(
    matches.length,
    1,
    `expected exactly one ${label}, found: ${matches.join(", ") || "none"}`,
  );
  return matches[0];
}

async function assertPngDimensions(file, width, height) {
  const metadata = await sharp(file).metadata();
  assert.equal(metadata.format, "png", `${file} must be a PNG`);
  assert.equal(metadata.width, width, `${file} must be ${width}px wide`);
  assert.equal(metadata.height, height, `${file} must be ${height}px high`);
  return metadata;
}

async function assertRgbPng(file, width, height) {
  const metadata = await assertPngDimensions(file, width, height);
  assert.equal(metadata.space, "srgb", `${file} must use an RGB color space`);
  assert.equal(metadata.channels, 3, `${file} must have exactly 3 RGB channels`);
  assert.equal(metadata.hasAlpha, false, `${file} must not contain alpha`);
  assert.equal(metadata.isPalette, false, `${file} must not be palette indexed`);
  assert.equal(metadata.bitsPerSample, 8, `${file} must use 8-bit channels`);
}

for (const { locale, directory } of uploadDirectories) {
  test(`${locale} upload assets meet Chrome Web Store image requirements`, async () => {
    const files = await pngFiles(directory);
    assert.equal(
      files.length,
      8,
      `upload/${locale} must contain one icon, five screenshots, one small promo, and one marquee PNG`,
    );

    const icon = findSingle(files, /icon/i, "store icon");
    const smallPromo = findSingle(
      files,
      /(?:small[-_ ]?promo|promo[-_ ]?small)/i,
      "small promo",
    );
    const marquee = findSingle(
      files,
      /(?:marquee|top[-_ ]?promo)/i,
      "marquee",
    );
    const screenshots = files.filter(
      (file) => ![icon, smallPromo, marquee].includes(file),
    );

    assert.equal(screenshots.length, 5, `upload/${locale} must contain 5 screenshots`);
    assert.deepEqual(
      screenshots.map((file) => file.split("/").at(-1)),
      screenshotNames,
      `upload/${locale} screenshots must follow the five-part narrative order`,
    );
    await assertPngDimensions(icon, 128, 128);
    await assertRgbPng(smallPromo, 440, 280);
    await assertRgbPng(marquee, 1400, 560);
    await Promise.all(
      screenshots.map((file) => assertRgbPng(file, 1280, 800)),
    );
  });
}

test("global screenshots use localized English UI captures", async () => {
  for (const fileName of screenshotNames) {
    const [chinese, english] = await Promise.all([
      readFile(resolve(assetsRoot, "upload", "zh-CN", fileName)),
      readFile(resolve(assetsRoot, "upload", "global", fileName)),
    ]);
    const digest = (buffer) => createHash("sha256").update(buffer).digest("hex");
    assert.notEqual(
      digest(chinese),
      digest(english),
      `${fileName} must not reuse the Simplified Chinese interface in the global listing`,
    );
  }
});

for (const { locale, directory } of storyDirectories) {
  test(`optional ${locale} story assets are five opaque RGB screenshots`, async (t) => {
    if (!(await directoryExists(directory))) {
      t.skip(`store-assets/v2/story/${locale} does not exist`);
      return;
    }

    const screenshots = await pngFiles(directory);
    assert.equal(screenshots.length, 5, `story/${locale} must contain 5 screenshots`);
    await Promise.all(
      screenshots.map((file) => assertRgbPng(file, 1280, 800)),
    );
  });
}

for (const { locale, directory } of campaignDirectories) {
  test(`${locale} campaign assets provide three finished text-and-image formats`, async () => {
    const files = await pngFiles(directory);
    assert.deepEqual(
      files.map((file) => file.split("/").at(-1)),
      [
        "article-cover-900x383.png",
        "launch-cover-1600x900.png",
        "social-square-1080.png",
      ],
    );
    await Promise.all([
      assertRgbPng(resolve(directory, "article-cover-900x383.png"), 900, 383),
      assertRgbPng(resolve(directory, "launch-cover-1600x900.png"), 1600, 900),
      assertRgbPng(resolve(directory, "social-square-1080.png"), 1080, 1080),
    ]);
  });
}

test("brand directory provides reusable high-resolution product icons", async () => {
  await Promise.all([
    assertPngDimensions(resolve(assetsRoot, "brand", "app-icon-512.png"), 512, 512),
    assertPngDimensions(resolve(assetsRoot, "brand", "app-icon-1024.png"), 1024, 1024),
  ]);
});
