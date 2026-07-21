import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const distDirectory = resolve(projectRoot, "extension-dist");
const brand = JSON.parse(
  await readFile(resolve(projectRoot, "brand.json"), "utf8"),
);

async function readJson(path) {
  return JSON.parse(await readFile(path, "utf8"));
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
    zh_CN: [brand.storeNameZhHans, brand.descriptionZhHans],
    zh_TW: [brand.storeNameZhHant, brand.descriptionZhHant],
    en: [brand.storeNameEn, brand.descriptionEn],
  };

  for (const [locale, [name, description]] of Object.entries(expected)) {
    const messages = await readJson(
      resolve(distDirectory, "_locales", locale, "messages.json"),
    );
    assert.equal(messages.extensionName.message, name);
    assert.equal(messages.extensionDescription.message, description);
    assert.ok(messages.extensionShortName.message);
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
    ["store-assets/screenshot-1280x800-context.png", 1280, 800],
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
    "store-assets/screenshot-1280x800-context.png",
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
