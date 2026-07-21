import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = new URL("../", import.meta.url);

test("brand configuration stays within Chrome Web Store manifest limits", async () => {
  const [brand, packageJson] = await Promise.all([
    readFile(new URL("brand.json", root), "utf8").then(JSON.parse),
    readFile(new URL("package.json", root), "utf8").then(JSON.parse),
  ]);

  for (const name of [brand.storeNameZhHans, brand.storeNameZhHant, brand.storeNameEn]) {
    assert.ok([...name].length <= 75, `store name is longer than 75 characters: ${name}`);
  }
  for (const shortName of [brand.shortNameZh, brand.shortNameEn]) {
    assert.ok([...shortName].length <= 12, `short name is longer than 12 characters: ${shortName}`);
  }
  for (const description of [
    brand.descriptionZhHans,
    brand.descriptionZhHant,
    brand.descriptionEn,
  ]) {
    assert.ok([...description].length <= 132, `description is longer than 132 characters: ${description}`);
  }

  assert.match(brand.version, /^\d+\.\d+\.\d+$/);
  assert.equal(packageJson.name, brand.slug);
  assert.equal(packageJson.version, brand.version);
  assert.equal(brand.nameZhHans, "AGORA");
  assert.equal(brand.nameEn, "AGORA");
  assert.equal(brand.sloganZhHans, "一页，一种思想。");
  assert.equal(packageJson.license, "GPL-3.0-or-later");
  assert.equal(brand.repositoryUrl, packageJson.repository.url.replace(/^git\+/, "").replace(/\.git$/, ""));
  assert.doesNotMatch(brand.storeNameEn, /一哲|Yizhe|思隙|Sīxì|SIXI/);
});

test("site metadata uses the single generated social preview", async () => {
  const [layout, favicon, socialMetadata] = await Promise.all([
    readFile(new URL("app/layout.tsx", root), "utf8"),
    readFile(new URL("public/favicon.svg", root), "utf8"),
    sharp(fileURLToPath(new URL("public/social-share.png", root))).metadata(),
  ]);

  assert.match(layout, /url: "\/social-share\.png"/);
  assert.match(layout, /images: \["\/social-share\.png"\]/);
  assert.equal((layout.match(/social-share\.png/g) ?? []).length, 2);
  assert.equal(socialMetadata.width, 1200);
  assert.equal(socialMetadata.height, 630);
  assert.doesNotMatch(favicon, />念</);
});
