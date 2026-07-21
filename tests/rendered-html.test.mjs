import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the minimal full-screen AGORA experience", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html lang="zh-CN">/i);
  assert.match(html, /<title>AGORA｜一页，一种思想。<\/title>/i);
  assert.match(html, /AGORA哲学卡片/);
  assert.match(html, /打开菜单/);
  assert.match(html, /上一则/);
  assert.match(html, /换一则/);
  assert.match(html, /读解/);
  assert.match(html, /思想轨迹/);
  assert.match(html, /思想脉络/);
  assert.match(html, /思想来处/);
  assert.match(html, /同题异答/);
  assert.match(html, /后续回响/);
  assert.match(html, /意识手稿/);
  assert.match(html, /命题档案/);
  assert.match(html, /主语言/);
  assert.match(html, /简体中文/);
  assert.match(html, /繁体中文/);
  assert.match(html, /英文/);
  assert.match(html, /句子同时带英文/);
  assert.doesNotMatch(html, />中英文</);
  assert.match(html, /class="quote-clause"/);
  assert.match(html, /<wbr\s*\/?>/i);
  assert.match(html, /这一则命题译写/);
  assert.match(html, /并非逐字引文/);
  assert.match(html, /class="primary-quote language-zh-hans with-english"/);
  assert.match(html, /role="switch" aria-checked="true"/);
  assert.match(html, /<kbd>←<\/kbd>/);
  assert.match(html, /<kbd>→<\/kbd>/);
  assert.match(html, /<kbd>Space<\/kbd>/);
  assert.match(html, /<kbd>Enter<\/kbd>/);
  assert.match(html, /<kbd>F<\/kbd>/);
  assert.match(html, /<kbd>S<\/kbd>/);
  assert.match(html, /保存图片/);
  assert.match(html, /<kbd>D<\/kbd>/);
  assert.match(html, /<kbd>Esc<\/kbd>/);
  assert.match(html, /开源代码与反馈/);
  assert.match(html, /https:\/\/github\.com\/NorthGateChat\/agora-philosophy/);
  assert.doesNotMatch(html, /思想摘译|原典线索|A THOUGHT/);
  assert.doesNotMatch(html, /Your site is taking shape|Codex is working/);
});

test("hydrates from the server-provided daily index", async () => {
  const [page, client, extension, cardExport] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/PhilosophyMoment.tsx", import.meta.url), "utf8"),
    readFile(new URL("../extension/main.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/exportThoughtCard.ts", import.meta.url), "utf8"),
  ]);

  assert.match(page, /<PhilosophyMoment initialIndex=\{dailyIndex\(\)\}/);
  assert.match(page, /dailyThoughtIndex\(\)/);
  assert.match(extension, /dailyThoughtIndex\(\)/);
  assert.match(client, /initialIndex = 0/);
  assert.match(client, /useState\(safeInitialIndex\)/);
  assert.match(client, /useState<LanguageMode>\("zh-hans"\)/);
  assert.match(client, /useState\(true\)/);
  assert.match(client, /agora-saved/);
  assert.match(client, /agora-visual-style/);
  assert.match(client, /agora-language-mode/);
  assert.match(client, /agora-include-english-quote/);
  assert.match(client, /sixi-saved/);
  assert.match(client, /yinian-saved/);
  assert.match(client, /yinian-visual-style/);
  assert.match(client, /yinian-language-mode/);
  assert.match(client, /yinian-include-english-quote/);
  assert.match(client, /readStoredPreference\(storageKeys\.saved, legacyStorageKeys\.saved\)/);
  assert.match(client, /window\.localStorage\.setItem\(currentKey, legacyValue\)/);
  assert.match(client, /const parsed: unknown = JSON\.parse\(value\)/);
  assert.match(client, /Array\.isArray\(parsed\)/);
  assert.match(client, /parsed\.every\(\(item\) => typeof item === "string"\)/);
  assert.match(client, /catch \{/);
  assert.doesNotMatch(client, /^import .* from "opencc-js(?:\/cn2t)?";$/m);
  assert.match(client, /import\("opencc-js\/cn2t"\)/);
  assert.match(client, /id: "zh-hant"/);
  assert.match(client, /role="switch"/);
  assert.doesNotMatch(client, /id: "both"/);
  assert.match(client, /className="main-quote-line main-quote-english" lang="en"/);
  assert.match(client, /thought\.englishName/);
  assert.match(client, /thought\.englishWork/);
  assert.match(client, /className="origin-line origin-english" lang="en"/);
  assert.match(client, /Manuscript Style/);
  assert.match(client, /Primary Language/);
  assert.match(client, /Thought Type/);
  assert.match(client, /Next Thought/);
  assert.match(client, /thoughtConnections/);
  assert.match(client, /\[comparisonKey, setComparisonKey\] = useState<string \| null>\(null\)/);
  assert.match(client, /const openComparison = useCallback\(\(entry: ResolvedConnection\)/);
  assert.match(client, /setComparisonKey\(entry\.key\)/);
  assert.match(client, /setComparisonKey\(null\)/);
  assert.match(client, /className="comparison-panel"/);
  assert.match(client, /Interpretive rendering and paraphrase for readability; not a verbatim quotation/);
  assert.match(client, /上下游包含直接影响、传统中介与编辑性重构/);
  assert.match(client, /event\.key === "ArrowRight"/);
  assert.match(client, /event\.key === "ArrowLeft"/);
  assert.match(client, /event\.key === "Enter"/);
  assert.match(client, /else if \(event\.key === " "\)[\s\S]*?next\(\)/);
  assert.match(client, /const lowerKey = event\.key\.toLowerCase\(\)/);
  assert.match(client, /lowerKey === "f"/);
  assert.match(client, /lowerKey === "s"/);
  assert.match(client, /lowerKey === "d"/);
  assert.match(client, /renderThoughtCard\(\{/);
  assert.match(client, /thoughtCardFilename\(localizedBrandName, displayedName\)/);
  assert.match(client, /\?\? thoughts\[0\]/);
  assert.doesNotMatch(client, /useState\(dateSeed\)|new Date\(\)/);
  assert.match(cardExport, /const CARD_WIDTH = 1080/);
  assert.match(cardExport, /const CARD_HEIGHT = 1350/);
  assert.match(cardExport, /canvas\.toBlob/);
  assert.match(cardExport, /"image\/png"/);
  assert.match(cardExport, /link\.download = filename/);
});
