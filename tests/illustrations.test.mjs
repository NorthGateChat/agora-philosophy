import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);

test("thought illustrations are keyed to real thoughts and lazy-loaded for detail and share", async () => {
  const [registry, supplement, client, depthLoader, cardExport, extensionConfig] = await Promise.all([
    readFile(new URL("content/illustrations.ts", projectRoot), "utf8"),
    readFile(new URL("content/philosophySupplement.ts", projectRoot), "utf8"),
    readFile(new URL("app/PhilosophyMoment.tsx", projectRoot), "utf8"),
    readFile(new URL("content/thoughtDepthLoader.ts", projectRoot), "utf8"),
    readFile(new URL("app/exportThoughtCard.ts", projectRoot), "utf8"),
    readFile(new URL("vite.extension.config.ts", projectRoot), "utf8"),
  ]);

  assert.match(registry, /thoughtId: "plato-cave-adjustment"/);
  assert.match(registry, /placement: \["detail", "share"\]/);
  assert.match(supplement, /id: "plato-cave-adjustment"/);
  assert.doesNotMatch(client, /^import .*content\/illustrations/m);
  assert.match(client, /loadThoughtDepthContent\(thought, thoughtLibraryId\)/);
  assert.match(client, /loadThoughtIllustrationContent\(thought\.id\)/);
  assert.match(client, /if \(!detailOpen\) return;/);
  assert.doesNotMatch(client, /if \(!detailOpen && !shareOpen\) return;/);
  assert.match(depthLoader, /import\("\.\/illustrations"\)/);
  assert.match(depthLoader, /loadThoughtIllustration\(thought\.id\)/);
  assert.match(client, /detail-quote-illustrated/);
  assert.match(client, /className="detail-quote-art"/);
  assert.match(client, /const illustrationUrl = illustration\?\.placement\.includes\("share"\)/);
  assert.match(client, /illustrationUrl,/);
  assert.match(cardExport, /illustrationUrl\?: string/);
  assert.match(cardExport, /drawIllustrationLayer/);
  assert.match(extensionConfig, /publicDir:/);

  const artwork = await stat(new URL("public/illustrations/plato-cave-adjustment-v1.webp", projectRoot));
  assert.ok(artwork.size > 10_000, "the packaged artwork should not be an empty placeholder");
});
