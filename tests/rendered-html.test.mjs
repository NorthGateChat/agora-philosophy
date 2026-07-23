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
  assert.match(html, /corner-menu-scrim/);
  assert.match(html, /上一则/);
  assert.match(html, /换一则/);
  assert.match(html, /读解/);
  assert.match(html, /思想轨迹/);
  assert.match(html, /内容库/);
  assert.match(html, /西方哲学/);
  assert.match(html, /毛选/);
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
  assert.match(html, /分享这则思想/);
  assert.match(html, /分享图版式/);
  assert.match(html, /移动端/);
  assert.match(html, /PC 端/);
  assert.match(html, /系统分享/);
  assert.match(html, /复制文本/);
  assert.match(html, /推荐给好友/);
  assert.match(html, /复制推荐语和 Chrome 商店链接/);
  assert.match(html, /menu-project[\s\S]*推荐给好友[\s\S]*share-dialog/);
  assert.doesNotMatch(html, /share-recommend-section/);
  assert.match(html, /保存图片/);
  assert.match(html, /<kbd>D<\/kbd>/);
  assert.match(html, /<kbd>Esc<\/kbd>/);
  assert.doesNotMatch(html, /开源代码与反馈/);
  assert.match(html, /新手引导/);
  assert.match(html, /点击观点，读深一层/);
  assert.match(html, /设置、分享与内容切换/);
  assert.match(html, /onboarding-hint onboarding-hint-quote/);
  assert.match(html, /onboarding-hint onboarding-hint-navigation/);
  assert.match(html, /onboarding-hint onboarding-hint-menu/);
  assert.doesNotMatch(html, /onboarding-dialog|onboarding-scrim/);
  assert.doesNotMatch(html, /思想摘译|原典线索|A THOUGHT/);
  assert.doesNotMatch(html, /Your site is taking shape|Codex is working/);
});

test("hydrates the website index and chooses a fresh thought from the selected content library", async () => {
  const [page, client, extension, randomIndex, cardExport, libraries, mao, styles] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/PhilosophyMoment.tsx", import.meta.url), "utf8"),
    readFile(new URL("../extension/main.tsx", import.meta.url), "utf8"),
    readFile(new URL("../lib/randomThoughtIndex.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/exportThoughtCard.ts", import.meta.url), "utf8"),
    readFile(new URL("../content/libraries.ts", import.meta.url), "utf8"),
    readFile(new URL("../content/mao.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(page, /<PhilosophyMoment initialIndex=\{dailyIndex\(\)\}/);
  assert.match(page, /dailyThoughtIndex\(\)/);
  assert.match(extension, /const initialContent = freshContentSelection\(\)/);
  assert.match(extension, /initialLibrary=\{initialContent\.library\}/);
  assert.match(extension, /initialIndex=\{initialContent\.index\}/);
  assert.match(extension, /nextRandomThoughtIndex\(contentLibraries\[library\]\.thoughts\.length, previousIndex\)/);
  assert.match(extension, /agora-last-new-tab-thought-index/);
  assert.match(extension, /localStorage\.getItem\(contentLibraryStorageKey\)/);
  assert.match(extension, /localStorage\.getItem\(`\$\{lastThoughtIndexKey\}-\$\{library\}`\)/);
  assert.match(extension, /localStorage\.setItem\(`\$\{lastThoughtIndexKey\}-\$\{library\}`, String\(nextIndex\)\)/);
  assert.doesNotMatch(extension, /dailyThoughtIndex/);
  assert.match(randomIndex, /Math\.trunc\(thoughtCount\)/);
  assert.match(randomIndex, /candidate >= normalizedPrevious \? candidate \+ 1 : candidate/);
  assert.match(client, /initialIndex = 0/);
  assert.match(client, /initialLibrary = "western"/);
  assert.match(client, /useState\(safeInitialIndex\)/);
  assert.match(client, /useState<ContentLibraryId>\(initialLibrary\)/);
  assert.match(client, /useState<LanguageMode>\("zh-hans"\)/);
  assert.match(client, /useState\(true\)/);
  assert.match(client, /agora-saved/);
  assert.match(client, /agora-visual-style/);
  assert.match(client, /agora-language-mode/);
  assert.match(client, /agora-include-english-quote/);
  assert.match(client, /agora-onboarding-complete/);
  assert.match(client, /contentLibrary: contentLibraryStorageKey/);
  assert.match(client, /const chooseContentLibrary = \(nextLibrary: ContentLibraryId\)/);
  assert.match(client, /window\.localStorage\.setItem\(storageKeys\.contentLibrary, nextLibrary\)/);
  assert.match(client, /const onboardingVersion = "2"/);
  assert.match(client, /localStorage\.getItem\(storageKeys\.onboardingComplete\)/);
  assert.match(client, /localStorage\.setItem\(storageKeys\.onboardingComplete, onboardingVersion\)/);
  assert.match(client, /\[onboardingOpen, setOnboardingOpen\] = useState\(false\)/);
  assert.match(client, /\[onboardingHints, setOnboardingHints\] = useState<OnboardingHints>\(initialOnboardingHints\)/);
  assert.match(client, /const openOnboarding = useCallback/);
  assert.match(client, /const completeOnboarding = useCallback/);
  assert.match(client, /const dismissOnboardingHint = useCallback/);
  assert.match(client, /dismissOnboardingHint\("quote"\)/);
  assert.match(client, /dismissOnboardingHint\("navigate"\)/);
  assert.match(client, /dismissOnboardingHint\("menu"\)/);
  assert.match(client, /onClick=\{openOnboarding\}/);
  assert.match(client, /if \(shareOpen\) return/);
  assert.doesNotMatch(client, /onboardingStep|onOnboardingKeyDown|onboardingDialogRef/);
  assert.match(client, /className=\{`corner-menu-scrim \$\{menuOpen \? "open" : ""\}`\}/);
  assert.match(client, /onClick=\{\(\) => setMenuOpen\(false\)\}/);
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
  assert.match(client, /const chineseQuoteFirst = contentLibrary === "mao" && isChineseLanguage/);
  assert.match(client, /contentLibraryForThought\(comparison\.related\.id\) === "mao"/);
  assert.match(client, /quoteChineseFirst: chineseQuoteFirst/);
  assert.match(client, /quote-chinese-first/);
  assert.match(client, /thought\.englishName/);
  assert.match(client, /thought\.englishWork/);
  assert.match(client, /className="origin-line origin-english" lang="en"/);
  assert.match(client, /Manuscript Style/);
  assert.match(client, /Primary Language/);
  assert.match(client, /Thought Type/);
  assert.match(client, /Next Thought/);
  assert.match(styles, /\.onboarding-hint-quote/);
  assert.match(styles, /\.onboarding-hint-navigation/);
  assert.match(styles, /\.onboarding-hint-menu/);
  assert.doesNotMatch(styles, /\.onboarding-dialog|\.onboarding-scrim|\.moment\.onboarding-open/);
  assert.match(client, /allThoughtConnections/);
  assert.match(client, /\[comparisonKey, setComparisonKey\] = useState<string \| null>\(null\)/);
  assert.match(client, /const openComparison = useCallback\(\(entry: ResolvedConnection\)/);
  assert.match(client, /setComparisonKey\(entry\.key\)/);
  assert.match(client, /setComparisonKey\(null\)/);
  assert.match(client, /className="comparison-panel"/);
  assert.match(client, /className="detail-sheet-content"/);
  assert.match(client, /className="detail-layout"/);
  assert.match(client, /className="detail-primary"/);
  assert.match(client, /className="lineage-tab-content"/);
  assert.match(client, /lineageContentRef\.current\?\.scrollTo\(\{ top: 0, behavior: "auto" \}\)/);
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
  assert.match(client, /className=\{`share-dialog \$\{shareOpen \? "open" : ""\}`\}/);
  assert.match(client, /className=\{`share-preview share-preview-\$\{shareFormat\}`\}/);
  assert.match(client, /role="radiogroup"/);
  assert.match(client, /chooseShareFormat\("mobile"\)/);
  assert.match(client, /chooseShareFormat\("desktop"\)/);
  assert.match(client, /navigator\.clipboard\.writeText\(thoughtCopyText\)/);
  assert.match(client, /navigator\.clipboard\.writeText\(recommendationText\)/);
  assert.match(client, /className="share-action-primary"/);
  assert.match(client, /className="share-action-secondary"/);
  assert.match(client, /系统分享/);
  assert.match(client, /保存图片/);
  assert.match(client, /复制文本/);
  assert.doesNotMatch(client, /openPlatformShare|SharePlatform|share-platforms/);
  assert.match(client, /navigator\.canShare\?\.\(\{ files: \[file\] \}\)/);
  assert.match(client, /url: brand\.storeUrl/);
  assert.match(client, /分享观点/);
  assert.match(client, /分享文案已复制/);
  assert.match(client, /观点文本已复制/);
  assert.match(client, /推荐语和商店链接已复制/);
  assert.doesNotMatch(client, /命题译写：|Interpretive rendering:/);
  assert.match(client, /renderThoughtCard\(\{/);
  assert.match(client, /thoughtCardFilename\(localizedBrandName, displayedName, format\)/);
  assert.match(client, /thoughtCardFilename\(localizedBrandName, displayedName, shareFormat\)/);
  assert.match(client, /\?\? activeLibrary\.thoughts\[0\] \?\? allThoughts\[0\]/);
  assert.doesNotMatch(client, /useState\(dateSeed\)|new Date\(\)/);
  assert.match(libraries, /export type ContentLibraryId = "western" \| "mao"/);
  assert.match(libraries, /label: "西方哲学"/);
  assert.match(libraries, /label: "毛选"/);
  assert.match(libraries, /export const contentLibraryStorageKey = "agora-content-library"/);
  assert.match(libraries, /\.\.\.thoughts, \.\.\.maoThoughts/);
  assert.match(mao, /export const maoThoughts: Thought\[\]/);
  assert.match(mao, /id: "mao-investigation"/);
  assert.match(mao, /id: "mao-practice"/);
  assert.match(mao, /id: "mao-contradiction"/);
  assert.match(mao, /rendering: "short-quote"/);
  assert.match(mao, /export const maoThoughtConnections: ThoughtConnection\[\]/);
  assert.match(cardExport, /export type ThoughtCardFormat = "mobile" \| "desktop"/);
  assert.match(cardExport, /quoteChineseFirst\?: boolean/);
  assert.match(cardExport, /if \(input\.quoteChineseFirst\)/);
  const thoughtCardExportFields = cardExport.match(
    /export type ThoughtCardExport = \{([\s\S]*?)\n\};/,
  )?.[1] ?? "";
  assert.doesNotMatch(
    thoughtCardExportFields,
    /\b(?:brandName|brandNameEnglish|slogan|topic|sequence|language|style):/,
  );
  assert.doesNotMatch(cardExport, /PHILOSOPHY \/ NEW TAB|INTERPRETIVE RENDERING/);
  assert.match(cardExport, /function drawOrbitSignature\(/);
  assert.match(cardExport, /function drawTrackedText\(/);
  assert.match(cardExport, /"AGORA"/);
  assert.match(cardExport, /const rings = format === "desktop"/);
  assert.doesNotMatch(cardExport, /drawStyleSignature|drawCornerMark/);
  assert.match(cardExport, /const quoteBlockTop = Math\.max/);
  assert.match(cardExport, /mobile: \{[\s\S]*?width: 1080,[\s\S]*?height: 1350,/);
  assert.match(cardExport, /desktop: \{[\s\S]*?width: 1600,[\s\S]*?height: 900,/);
  assert.match(cardExport, /input\.format \?\? "mobile"/);
  assert.match(cardExport, /canvas\.toBlob/);
  assert.match(cardExport, /"image\/png"/);
  assert.match(cardExport, /link\.download = filename/);
  assert.match(styles, /width: min\(1160px, calc\(100vw - 96px\)\)/);
  assert.match(styles, /margin: 0 clamp\(32px, 4vw, 48px\)/);
  assert.match(styles, /grid-template-columns: minmax\(0, 0\.9fr\) minmax\(0, 1\.1fr\)/);
  assert.match(styles, /border-left: 1px solid color-mix\(in srgb, var\(--ink\) 13%, transparent\)/);
  assert.match(styles, /height: min\(88svh, 820px\)/);
  assert.match(styles, /\.lineage-tab-content \{[\s\S]*?overflow-y: auto/);
  assert.doesNotMatch(styles, /\.detail-sheet > \*/);
  assert.match(styles, /transform: translate\(-50%, 104%\)/);
  assert.match(styles, /\.detail-sheet\.open \{\s*transform: translate\(-50%, 0\)/);
  assert.doesNotMatch(styles, /\.moment\.detail-open \.quote-stage\s*\{/);
  assert.doesNotMatch(styles, /transform: translateX\(104%\)/);
});
