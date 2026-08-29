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

test("server-renders the minimal full-screen NOTHING FINAL experience", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html lang="zh-CN">/i);
  assert.match(html, /<title>未定稿｜一页，一种思想。<\/title>/i);
  assert.match(html, /未定稿思想卡片/);
  assert.match(html, /打开菜单/);
  assert.match(html, /corner-menu-scrim/);
  assert.match(html, /上一则/);
  assert.match(html, /换一则/);
  assert.match(html, /读解/);
  assert.match(html, /思想轨迹/);
  assert.match(html, /思想集/);
  assert.match(html, /西方哲学/);
  assert.match(html, /中国哲学/);
  assert.match(html, /毛选/);
  assert.match(html, /科学思想/);
  assert.match(html, /印度哲学/);
  assert.match(html, /经济思想/);
  assert.doesNotMatch(html, /跨集随机|menu-random-pick/);
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
  assert.match(html, /原文节选|命题整理|待核摘录/);
  assert.doesNotMatch(html, /命题译写/);
  assert.match(html, /class="primary-quote language-zh-hans with-english"/);
  assert.match(html, /role="switch" aria-checked="true"/);
  assert.match(html, /<kbd>←<\/kbd>/);
  assert.match(html, /<kbd>→<\/kbd>/);
  assert.match(html, /<kbd>Space<\/kbd>/);
  assert.match(html, /<kbd>Enter<\/kbd>/);
  assert.match(html, /<kbd>F<\/kbd>/);
  assert.match(html, /我的收藏/);
  assert.match(html, /最近读过/);
  assert.match(html, /已屏蔽/);
  assert.match(html, /检索作者、书名或观点/);
  assert.match(html, /全部思想集/);
  assert.match(html, /全部主题/);
  assert.match(html, /还没有收藏/);
  assert.match(html, /saved-dialog/);
  assert.match(html, /saved-scrim/);
  assert.match(html, /遇到想留下的思想/);
  assert.match(html, /<kbd>B<\/kbd>/);
  assert.match(html, /屏蔽当前/);
  assert.doesNotMatch(html, /blocked-dialog/);
  assert.match(html, /来源档案/);
  assert.match(html, /正在载入出处与版本记录/);
  assert.match(html, /核心解读/);
  assert.match(html, /放回语境/);
  assert.match(html, /辨析边界/);
  assert.match(html, /<kbd>S<\/kbd>/);
  assert.match(html, /分享这张思想卡/);
  assert.match(html, /分享图版式/);
  assert.match(html, />1:1</);
  assert.match(html, />3:4</);
  assert.match(html, />4:5</);
  assert.match(html, />9:16</);
  assert.match(html, />16:9</);
  assert.doesNotMatch(html, /移动端|PC 端/);
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
  const [page, client, extension, randomIndex, smartIndex, contentLibraryIndex, sourceMetadata, interpretation, cardExport, libraries, chinese, mao, science, indian, economics, styles] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/PhilosophyMoment.tsx", import.meta.url), "utf8"),
    readFile(new URL("../extension/main.tsx", import.meta.url), "utf8"),
    readFile(new URL("../lib/randomThoughtIndex.ts", import.meta.url), "utf8"),
    readFile(new URL("../lib/smartThoughtIndex.ts", import.meta.url), "utf8"),
    readFile(new URL("../lib/contentLibraryThoughtIndex.ts", import.meta.url), "utf8"),
    readFile(new URL("../content/sourceMetadata.ts", import.meta.url), "utf8"),
    readFile(new URL("../content/interpretation.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/exportThoughtCard.ts", import.meta.url), "utf8"),
    readFile(new URL("../content/libraries.ts", import.meta.url), "utf8"),
    readFile(new URL("../content/chinese.ts", import.meta.url), "utf8"),
    readFile(new URL("../content/mao.ts", import.meta.url), "utf8"),
    readFile(new URL("../content/science.ts", import.meta.url), "utf8"),
    readFile(new URL("../content/indian.ts", import.meta.url), "utf8"),
    readFile(new URL("../content/economics.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(page, /<PhilosophyMoment initialIndex=\{dailyIndex\(\)\}/);
  assert.match(page, /dailyThoughtIndex\(dailySeedRange\)/);
  assert.match(page, /smartThoughtIndex\(thoughts/);
  assert.match(extension, /const initialContent = freshContentSelection\(\)/);
  assert.match(extension, /initialLibrary=\{initialContent\.library\}/);
  assert.match(extension, /initialIndex=\{initialContent\.index\}/);
  assert.match(extension, /contentLibraryThoughtIndex\(candidates, library/);
  assert.match(extension, /localStorage\.getItem\("agora-recent"\)/);
  assert.match(extension, /localStorage\.getItem\("agora-saved"\)/);
  assert.match(extension, /localStorage\.getItem\("agora-blocked"\)/);
  assert.match(extension, /agora-last-new-tab-thought-id/);
  assert.match(extension, /agora-last-new-tab-thought-index/);
  assert.match(extension, /localStorage\.getItem\(contentLibraryStorageKey\)/);
  assert.match(extension, /localStorage\.getItem\(`\$\{lastThoughtIdKey\}-\$\{library\}`\)/);
  assert.match(extension, /localStorage\.setItem\(`\$\{lastThoughtIdKey\}-\$\{library\}`, selectedThought\.id\)/);
  assert.doesNotMatch(extension, /dailyThoughtIndex/);
  assert.match(randomIndex, /Math\.trunc\(thoughtCount\)/);
  assert.match(randomIndex, /candidate >= normalizedPrevious \? candidate \+ 1 : candidate/);
  assert.match(smartIndex, /slice\(-12\)/);
  assert.match(smartIndex, /recentSet\.has\(item\.id\)/);
  assert.match(smartIndex, /item\.authorId \?\? item\.id/);
  assert.match(smartIndex, /Math\.sqrt\(inventoryCount\)/);
  assert.match(smartIndex, /item\.topic === current\.topic/);
  assert.match(smartIndex, /savedTopics\.has\(item\.topic\)/);
  assert.match(smartIndex, /savedAuthors\.has\(itemAuthor\)/);
  assert.match(contentLibraryIndex, /contentLibraryIds[\s\S]*?\.map\(\(libraryId\) =>/);
  assert.match(contentLibraryIndex, /contentLibraryForThought\(candidate\.id\) === libraryId/);
  assert.match(contentLibraryIndex, /normalizedRandom\(random\) \* availableLibraries\.length/);
  assert.match(contentLibraryIndex, /smartThoughtIndex\(libraryCandidates/);
  assert.match(client, /initialIndex = 0/);
  assert.match(client, /initialLibrary = "western"/);
  assert.match(client, /useState\(safeInitialIndex\)/);
  assert.match(client, /useState<ContentLibraryMode>\(initialLibrary\)/);
  assert.match(client, /const restoredLibrary = storedLibrary === "random" \? "western" : storedLibrary/);
  assert.match(client, /storedLibrary === "random"[\s\S]*?setItem\(storageKeys\.contentLibrary, "western"\)/);
  assert.match(client, /thoughtsForContentLibraryMode\(restoredLibrary\)/);
  assert.match(client, /restoredLibrary === initialLibrary && preservedIndex >= 0/);
  assert.doesNotMatch(client, /menu-random-pick/);
  assert.match(client, /navigationHistoryRef\.current = \[safeIndex\]/);
  assert.match(client, /useState<LanguageMode>\("zh-hans"\)/);
  assert.match(client, /function languageModeForBrowserLocale\(locale: string \| undefined\): LanguageMode/);
  assert.match(client, /normalizedLocale\.startsWith\("zh-hant"\)/);
  assert.match(client, /\^zh-\(tw\|hk\|mo\)/);
  assert.match(client, /window\.navigator\.languages\?\.\[0\][\s\S]*?window\.navigator\.language/);
  assert.match(client, /setLanguageMode\(languageModeForBrowserLocale\(browserLocale\)\)/);
  assert.match(client, /useState\(true\)/);
  assert.match(client, /agora-saved/);
  assert.match(client, /agora-blocked/);
  assert.match(client, /agora-recent/);
  assert.match(client, /agora-visual-style/);
  assert.match(client, /agora-language-mode/);
  assert.match(client, /agora-include-english-quote/);
  assert.match(client, /agora-onboarding-complete/);
  assert.match(client, /contentLibrary: contentLibraryStorageKey/);
  assert.match(client, /const chooseContentLibrary = async \(nextLibrary: ContentLibraryMode\)/);
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
  assert.match(
    client,
    /if \(readingUnitOpen \|\| knowledgeStudioOpen \|\| shareOpen \|\| savedOpen\) return/,
  );
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
  assert.match(client, /const chineseQuoteFirst = thoughtQuoteOrder === "original-first" && showChineseQuote/);
  assert.match(client, /contentLibraries\[comparisonLibraryId\]\.quoteOrder === "original-first" && showComparisonChineseQuote/);
  assert.match(client, /quoteChineseFirst: chineseQuoteFirst/);
  assert.match(client, /quote-chinese-first/);
  assert.match(client, /const localizedNameFor = \(item: Thought\)[\s\S]*?item\.englishName\?\.trim\(\) \|\| item\.name/);
  assert.match(client, /const localizedWorkFor = \(item: Thought\)[\s\S]*?item\.englishWork\?\.trim\(\) \|\| item\.work/);
  assert.match(client, /className={`origin-line \${languageMode === "en" \? "origin-english" : "origin-chinese"}`}/);
  assert.match(client, /lang={languageMode === "en" \? "en" : undefined}/);
  assert.match(client, /Manuscript Style/);
  assert.match(client, /Primary Language/);
  assert.doesNotMatch(client, /Thought Type|思想类型/);
  assert.match(client, /menuLabel\("换一则", "Next"\)/);
  assert.match(styles, /\.onboarding-hint-quote/);
  assert.match(styles, /\.onboarding-hint-navigation/);
  assert.match(styles, /\.onboarding-hint-menu/);
  assert.doesNotMatch(styles, /\.onboarding-dialog|\.onboarding-scrim|\.moment\.onboarding-open/);
  assert.match(client, /thoughtLevelConnections/);
  assert.match(client, /resolveThoughtLineage\(/);
  assert.doesNotMatch(client, /representativeThoughtIdByAuthor/);
  assert.match(client, /\[comparisonKey, setComparisonKey\] = useState<string \| null>\(null\)/);
  assert.match(client, /const openComparison = useCallback\(\(entry: ResolvedConnection\)/);
  assert.match(client, /setComparisonKey\(entry\.key\)/);
  assert.match(client, /setComparisonKey\(null\)/);
  assert.match(client, /className="comparison-panel"/);
  assert.match(client, /className="detail-sheet-content"/);
  assert.match(client, /className="detail-layout"/);
  assert.match(client, /className="detail-primary"/);
  assert.doesNotMatch(client, /这则思想可以怎么读/);
  assert.match(client, /className="question-card"[\s\S]*?<h3>\{menuLabel\("留给此刻的问题"/);
  assert.match(client, /className="detail-source-line"/);
  assert.match(client, /className="detail-source-popover"/);
  assert.match(client, /const lineageEntries = useMemo/);
  assert.match(client, /const selectedComparisonKey = comparison\?\.key \?\? null/);
  assert.match(client, /selectedKey=\{selectedComparisonKey\}/);
  assert.match(client, /onSelect=\{openComparison\}/);
  assert.match(client, /className="lineage-comparison-scroll"[\s\S]*?className="comparison-panel"/);
  assert.doesNotMatch(client, /className="lineage-tabs"/);
  assert.doesNotMatch(client, /className="lineage-tab-content"/);
  assert.doesNotMatch(client, /className="lineage-list"/);
  assert.doesNotMatch(client, /scrollLineageToContent|onLineageTabKeyDown|lineageTabsRef|lineageContentRef/);
  assert.match(client, /sourceMetadata\.englishProvenanceNote/);
  assert.match(client, /sourceMetadata\.referenceLinks/);
  assert.match(sourceMetadata, /This is an editorial restatement rather than a verbatim quotation/);
  assert.match(client, /这里只显示明确连接到当前观点的编辑性关系/);
  assert.match(client, /event\.key === "ArrowRight"/);
  assert.match(client, /event\.key === "ArrowLeft"/);
  assert.match(client, /event\.key === "Enter"/);
  assert.match(client, /else if \(event\.key === " "\)[\s\S]*?next\(\)/);
  assert.match(client, /const lowerKey = event\.key\.toLowerCase\(\)/);
  assert.match(client, /lowerKey === "f"/);
  assert.match(client, /lowerKey === "b"/);
  assert.match(client, /lowerKey === "s"/);
  assert.match(client, /lowerKey === "d"/);
  assert.match(client, /\[savedOpen, setSavedOpen\] = useState\(false\)/);
  assert.doesNotMatch(client, /\[blockedOpen, setBlockedOpen\]/);
  assert.match(client, /const savedThoughts = useMemo/);
  assert.match(client, /const recentThoughts = useMemo/);
  assert.match(client, /const blockedThoughts = useMemo/);
  assert.match(client, /const thoughtbookThoughts = useMemo/);
  assert.match(client, /\.slice\(\)[\s\S]*?\.reverse\(\)/);
  assert.match(client, /const openSavedLibrary = useCallback/);
  assert.match(client, /const closeSavedLibrary = useCallback/);
  assert.match(client, /const removeSaved = useCallback/);
  assert.match(client, /const blockCurrentThought = useCallback/);
  assert.match(client, /const restoreBlocked = useCallback/);
  assert.match(client, /className=\{`saved-dialog thoughtbook-dialog \$\{savedOpen \? "open" : ""\}`\}/);
  assert.match(client, /role="tab"/);
  assert.match(client, /检索作者、书名或观点/);
  assert.match(client, /全部思想集/);
  assert.match(client, /全部主题/);
  assert.match(client, /onClick=\{\(\) => void goToThought\(item\.id\)\}/);
  assert.match(client, /className=\{`share-dialog \$\{shareOpen \? "open" : ""\}`\}/);
  assert.match(client, /className=\{`share-preview share-preview-\$\{shareFormat\}`\}/);
  assert.match(client, /role="radiogroup"/);
  assert.match(client, /chooseShareFormat\("square"\)/);
  assert.match(client, /chooseShareFormat\("portrait"\)/);
  assert.match(client, /chooseShareFormat\("portrait45"\)/);
  assert.match(client, /chooseShareFormat\("story"\)/);
  assert.match(client, /chooseShareFormat\("landscape"\)/);
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
  assert.doesNotMatch(client, /命题译写|Interpretive rendering/i);
  assert.match(
    client,
    /const PrimaryQuoteTag = thoughtPresentation\.useQuotationMarks \? "blockquote" : "div"/,
  );
  assert.match(client, /<PrimaryQuoteTag className=\{`primary-quote/);
  assert.doesNotMatch(client, /<blockquote className=\{`primary-quote/);
  assert.match(
    client,
    /itemPresentation\.useQuotationMarks[\s\S]*?<q>\{itemQuote\}<\/q>[\s\S]*?<p className="saved-card-statement">\{itemQuote\}<\/p>/,
  );
  assert.match(client, /thoughtPresentation\.useQuotationMarks \? "「" : null/);
  assert.match(
    client,
    /thoughtPresentation\.useQuotationMarks \? `“\$\{thought\.english\}”` : thought\.english/,
  );
  assert.match(
    client,
    /comparisonPresentation\?\.useQuotationMarks[\s\S]*?comparison\.related\.english/,
  );
  assert.match(client, /renderThoughtCard\(\{/);
  assert.match(
    client,
    /renderThoughtCard\(\{[\s\S]*?natureLabel: shareNatureLabel,/,
  );
  assert.match(client, /thoughtCardFilename\(localizedBrandName, displayedName, format\)/);
  assert.match(client, /thoughtCardFilename\(localizedBrandName, displayedName, shareFormat\)/);
  assert.match(client, /import\("\.\/exportThoughtCard"\)/);
  assert.match(client, /import\("\.\.\/content\/thoughtDepthLoader"\)/);
  assert.doesNotMatch(client, /^import .*content\/sourceMetadata/m);
  assert.doesNotMatch(client, /^import .*content\/interpretation/m);
  assert.doesNotMatch(client, /^import .*content\/illustrations/m);
  assert.match(client, /sourceCredibility\.reviewStatus/);
  assert.match(client, /sourceCredibility\.textNature/);
  assert.match(client, /sourceCredibility\.translationNature/);
  assert.match(client, /sourceCredibility\.verificationStatus/);
  assert.match(client, /menuLabel\("使用依据", "Use basis"\)/);
  assert.match(client, /sourceMetadata\.englishUseBasis/);
  assert.match(client, /menuLabel\("编辑关联", "Editorial link"\)/);
  assert.match(client, /useState<InterpretationView>\("reading"\)/);
  assert.match(client, /className="interpretation-tabs"/);
  assert.match(client, /id="interpretation-panel"/);
  assert.match(client, /menuLabel\("核心解读", "Core reading"\)/);
  assert.match(client, /menuLabel\("放回语境", "In context"\)/);
  assert.match(client, /menuLabel\("辨析边界", "Distinctions"\)/);
  assert.match(client, /sourceMetadata\?\.locatorLevel === "passage"/);
  assert.match(client, /sourceMetadata\?\.verificationStatus === "primary-text-checked"/);
  assert.match(client, /sourceMetadata\.referenceLinks\?\.slice\(0, 2\)/);
  assert.match(client, /className="interpretation-source-route"/);
  assert.match(client, /menuLabel\("精确定位", "Exact locator"\)/);
  assert.match(client, /menuLabel\("原文 \/ 扫描入口", "SOURCE \/ SCAN"\)/);
  assert.match(client, /aria-label=\{menuLabel\("打开原文或扫描版本", "Open source text or scan"\)\}/);
  assert.match(client, /来源档案/);
  assert.match(client, /className="plain-language-reading"/);
  assert.match(client, /menuLabel\("今译", "PLAIN-LANGUAGE READING"\)/);
  assert.match(client, /\?\? allAvailableThoughts\.find\(\(item\) => !blocked\.includes\(item\.id\)\)[\s\S]*?\?\? allThoughts\[0\]/);
  assert.doesNotMatch(client, /useState\(dateSeed\)|new Date\(\)/);
  assert.match(libraries, /export type ContentLibraryId =[^;]*"economics"/);
  assert.match(libraries, /export type ContentLibraryMode = ContentLibraryId \| "custom" \| "random"/);
  assert.match(libraries, /label: "西方哲学"/);
  assert.match(libraries, /label: "中国哲学"/);
  assert.match(libraries, /label: "毛选"/);
  assert.match(libraries, /shortLabel: "毛选"/);
  assert.match(libraries, /label: "科学思想"/);
  assert.match(libraries, /shortLabel: "科学"/);
  assert.match(libraries, /label: "印度哲学"/);
  assert.match(libraries, /shortLabel: "印度"/);
  assert.match(libraries, /label: "经济思想"/);
  assert.match(libraries, /shortLabel: "经济"/);
  assert.match(libraries, /id: "random"/);
  assert.match(libraries, /label: "跨集随机"/);
  assert.match(libraries, /if \(mode === "custom"\) return customThoughts/);
  assert.match(libraries, /mode === "random" \? \[\.\.\.allThoughts, \.\.\.customThoughts\] : contentLibraries\[mode\]\.thoughts/);
  assert.match(libraries, /export const contentLibraryStorageKey = "agora-content-library"/);
  assert.match(libraries, /\.\.\.indianThoughts/);
  assert.match(libraries, /\.\.\.economicsThoughts/);
  assert.match(
    libraries,
    /export const contentLibraryIds = \[[\s\S]*?"economics"/,
  );
  assert.match(chinese, /export const chineseThoughts: ChineseThought\[\]/);
  assert.match(chinese, /plainText: string/);
  assert.match(chinese, /rendering: "short-quote"/);
  assert.match(chinese, /export const chineseThoughtConnections: ThoughtConnection\[\]/);
  assert.match(mao, /export const maoThoughts: Thought\[\]/);
  assert.match(mao, /id: "mao-investigation"/);
  assert.match(mao, /id: "mao-practice"/);
  assert.match(mao, /id: "mao-contradiction"/);
  assert.match(mao, /rendering: "short-quote"/);
  assert.match(mao, /export const maoThoughtConnections: ThoughtConnection\[\]/);
  assert.match(science, /export const scienceThoughts/);
  assert.match(science, /export const scienceThoughtConnections: ThoughtConnection\[\]/);
  assert.match(indian, /export const indianThoughts/);
  assert.match(indian, /export const indianThoughtConnections: ThoughtConnection\[\]/);
  assert.match(economics, /export const economicsThoughts/);
  assert.match(economics, /export const economicsTopicOptions/);
  assert.match(economics, /export const economicsThoughtConnections/);
  assert.match(sourceMetadata, /export type SourceReviewStatus/);
  assert.match(sourceMetadata, /sourceCredibilityLabelsFor/);
  assert.match(sourceMetadata, /"passage-located"/);
  assert.match(sourceMetadata, /"editorial-restatement"/);
  assert.match(sourceMetadata, /plato: \["古希腊语", "Ancient Greek"\]/);
  assert.match(sourceMetadata, /const isMao = thought\.id\.startsWith\("mao-"\)/);
  assert.match(sourceMetadata, /const isChinesePhilosophy = thought\.id\.startsWith\("chinese-"\)/);
  assert.match(sourceMetadata, /const isScience = thought\.id\.startsWith\("science-"\)/);
  assert.match(sourceMetadata, /const isIndian = thought\.id\.startsWith\("indian-"\)/);
  assert.match(sourceMetadata, /economics-/);
  assert.match(sourceMetadata, /\["古代汉语（文言文）", "Classical Chinese"\]/);
  assert.match(sourceMetadata, /https:\/\/ctext\.org\/introduction/);
  assert.match(sourceMetadata, /isMao[\s\S]*?\["中文", "Chinese"\]/);
  assert.match(sourceMetadata, /Publicly available Chinese texts and English reference translations, as applicable to each work/);
  assert.match(sourceMetadata, /where available for that work/);
  assert.match(sourceMetadata, /both are not verbatim|neither is a verbatim/i);
  assert.match(sourceMetadata, /https:\/\/www\.12371\.cn\/special\/mzdxj\/dyj\//);
  assert.match(sourceMetadata, /编辑性转述/);
  assert.match(sourceMetadata, /editorial restatement/i);
  assert.match(sourceMetadata, /NOTHING FINAL editorial study renderings/);
  assert.match(sourceMetadata, /https:\/\/suttacentral\.net\//);
  assert.match(sourceMetadata, /https:\/\/sarit\.github\.io\//);
  assert.match(interpretation, /libraryId === "chinese"/);
  assert.match(interpretation, /libraryId === "mao"/);
  assert.match(interpretation, /libraryId === "science"/);
  assert.match(interpretation, /libraryId === "indian"/);
  assert.doesNotMatch(interpretation, /from ["']\.\/interpretationDetails["']/);
  assert.match(interpretation, /bespoke\?: InterpretationDetail/);
  assert.match(
    interpretation,
    /context: thought\.context \?\? bespoke\?\.context \?\? fallbackContext/,
  );
  assert.match(
    interpretation,
    /thought\.englishContext\s*\?\? bespoke\?\.englishContext\s*\?\? fallbackEnglishContext/,
  );
  assert.match(
    interpretation,
    /distinction: thought\.distinction \?\? bespoke\?\.distinction \?\? fallbackDistinction/,
  );
  assert.match(
    interpretation,
    /thought\.englishDistinction\s*\?\? bespoke\?\.englishDistinction\s*\?\? fallbackEnglishDistinction/,
  );
  assert.match(
    cardExport,
    /export type ThoughtCardFormat = "square" \| "portrait" \| "portrait45" \| "story" \| "landscape"/,
  );
  assert.match(cardExport, /export type ThoughtCardVisualStyle = "trajectory" \| "marginalia" \| "archive"/);
  assert.match(cardExport, /quoteChineseFirst\?: boolean/);
  assert.match(cardExport, /natureLabel\?: string/);
  assert.match(cardExport, /visualStyle\?: ThoughtCardVisualStyle/);
  assert.match(cardExport, /const natureLabel = input\.natureLabel\?\.trim\(\) \|\| undefined/);
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
  assert.match(cardExport, /function drawMarginaliaSignature\(/);
  assert.match(cardExport, /function drawArchiveSignature\(/);
  assert.match(cardExport, /function drawThemeSignature\(/);
  assert.match(cardExport, /function drawImageContain\(/);
  assert.match(
    cardExport,
    /const imageHeight = card\.height \* \(format === "square" \? 0\.62 : format === "story" \? 0\.56 : 0\.6\)/,
  );
  assert.match(
    cardExport,
    /const preserveWholeIllustration = format === "portrait"[\s\S]*?format === "portrait45"[\s\S]*?format === "story"/,
  );
  assert.match(
    cardExport,
    /preserveWholeIllustration[\s\S]*?drawImageContain\(context, image, 0, 0, card\.width, imageHeight, 0\.5, 0\)/,
  );
  assert.match(cardExport, /const fadeEnd = illustrationBounds\.y \+ illustrationBounds\.height/);
  assert.match(cardExport, /readingField\.addColorStop\(0\.92, rgba\(paper, 0\.93\)\)/);
  assert.match(cardExport, /function drawTrackedText\(/);
  assert.match(cardExport, /input\.signature\?\.trim\(\) \|\| "NOTHING FINAL"/);
  assert.match(cardExport, /const rings = compact/);
  assert.doesNotMatch(cardExport, /drawStyleSignature|drawCornerMark/);
  assert.match(
    cardExport,
    /const quoteBlockTop = illustrationDrawn && format !== "landscape"/,
  );
  assert.match(cardExport, /square: \{[\s\S]*?width: 1080,[\s\S]*?height: 1080,/);
  assert.match(cardExport, /portrait: \{[\s\S]*?width: 1080,[\s\S]*?height: 1440,/);
  assert.match(cardExport, /portrait45: \{[\s\S]*?width: 1080,[\s\S]*?height: 1350,/);
  assert.match(cardExport, /story: \{[\s\S]*?width: 1080,[\s\S]*?height: 1920,/);
  assert.match(cardExport, /landscape: \{[\s\S]*?width: 1600,[\s\S]*?height: 900,/);
  assert.match(cardExport, /input\.format \?\? "portrait45"/);
  assert.match(cardExport, /square: "1x1"/);
  assert.match(cardExport, /portrait: "3x4"/);
  assert.match(cardExport, /portrait45: "4x5"/);
  assert.match(cardExport, /story: "9x16"/);
  assert.match(cardExport, /landscape: "16x9"/);
  assert.match(cardExport, /CARD_FORMAT_FILENAME_SUFFIX\[format\]/);
  assert.match(cardExport, /input\.visualStyle \?\? "trajectory"/);
  assert.match(client, /visualStyle,/);
  assert.match(cardExport, /canvas\.toBlob/);
  assert.match(cardExport, /"image\/png"/);
  assert.match(cardExport, /link\.download = filename/);
  assert.match(styles, /width: min\(1240px, calc\(100vw - 72px\)\)/);
  assert.match(styles, /margin: 0 clamp\(24px, 3vw, 36px\)/);
  assert.match(styles, /--detail-center-gutter: clamp\(34px, 4vw, 54px\)/);
  assert.match(styles, /grid-template-columns: minmax\(0, 0\.96fr\) 1px minmax\(0, 1\.04fr\)/);
  assert.match(styles, /column-gap: var\(--detail-center-gutter\)/);
  assert.match(styles, /\.detail-layout::before \{[\s\S]*?grid-column: 2/);
  assert.match(styles, /\.detail-primary \{[\s\S]*?grid-column: 1/);
  assert.match(styles, /\.detail-layout \.lineage-section \{[\s\S]*?grid-column: 3/);
  assert.match(styles, /height: min\(88svh, 820px\)/);
  assert.match(styles, /\.detail-layout \.lineage-section \{[\s\S]*?overflow: hidden/);
  assert.match(styles, /\.lineage-comparison-scroll \{[\s\S]*?overflow-y: auto/);
  assert.doesNotMatch(styles, /\.lineage-tab-content|\.lineage-tabs|\.lineage-list/);
  assert.match(styles, /@media \(min-width: 900px\)[\s\S]*?\.interpretation-panel \{[\s\S]*?height: (?!auto)[^;]+;/);
  assert.doesNotMatch(styles, /\.detail-sheet > \*/);
  assert.match(styles, /transform: translate\(-50%, 104%\)/);
  assert.match(styles, /\.detail-sheet\.open \{\s*transform: translate\(-50%, 0\)/);
  assert.match(styles, /\.thoughtbook-tabs/);
  assert.match(styles, /\.thoughtbook-tools/);
  assert.match(styles, /\.detail-source-line/);
  assert.match(styles, /\.detail-source-popover/);
  assert.match(styles, /\.interpretation-tabs/);
  assert.match(styles, /\.interpretation-panel/);
  assert.match(styles, /\.interpretation-source-route/);
  assert.match(styles, /\.interpretation-source-locator/);
  assert.match(styles, /prefers-reduced-transparency/);
  assert.match(styles, /prefers-contrast: more/);
  assert.doesNotMatch(styles, /\.moment\.detail-open \.quote-stage\s*\{/);
  assert.doesNotMatch(styles, /transform: translateX\(104%\)/);
});
