import {
  copyFile,
  mkdir,
  readFile,
  rm,
  writeFile,
} from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const assetsRoot = resolve(projectRoot, "store-assets", "v3");
const captureRoot = resolve(assetsRoot, "source", "captures");
const uploadRoot = resolve(assetsRoot, "upload");
const brandRoot = resolve(assetsRoot, "brand");
const previewRoot = resolve(assetsRoot, "preview");
const legacyArtRoot = resolve(projectRoot, "store-assets", "v2", "source", "generated");
const storeAssetsRoot = resolve(projectRoot, "store-assets");

const palette = {
  ivory: "#eee8dc",
  ivoryLight: "#f7f3ea",
  charcoal: "#26231e",
  charcoalSoft: "#55514a",
  verdigris: "#5f8176",
  verdigrisDark: "#496a60",
  line: "#aaa396",
};

const locales = ["zh-CN", "zh-TW", "en"];

const stories = [
  {
    number: "01",
    slug: "new-tab",
    capture: "01-new-tab.png",
    panel: "left",
    copy: {
      "zh-CN": {
        eyebrow: "每一次打开",
        title: ["每开一页，", "换一种看世界的方法。"],
        detail: "1000+ 则思想 · 每则配有原创插画",
      },
      "zh-TW": {
        eyebrow: "每一次打開",
        title: ["每開一頁，", "換一種看世界的方法。"],
        detail: "1000+ 則思想 · 每則配有原創插畫",
      },
      en: {
        eyebrow: "WITH EVERY NEW TAB",
        title: ["A different way to see,", "with every new tab."],
        detail: "1,000+ ideas · each with original artwork",
      },
    },
  },
  {
    number: "02",
    slug: "collections",
    capture: "02-library-menu.png",
    panel: "left",
    copy: {
      "zh-CN": {
        eyebrow: "跨传统阅读",
        title: ["五种传统，", "自由穿行。"],
        detail: "西哲 · 中哲 · 毛选 · 科学 · 印度",
      },
      "zh-TW": {
        eyebrow: "跨傳統閱讀",
        title: ["五種傳統，", "自由穿行。"],
        detail: "西哲 · 中哲 · 毛選 · 科學 · 印度",
      },
      en: {
        eyebrow: "READ ACROSS TRADITIONS",
        title: ["Five traditions.", "One open path."],
        detail: "Western · Chinese · Mao · Science · Indian",
      },
    },
  },
  {
    number: "03",
    slug: "deep-reading",
    capture: "03-deep-reading.png",
    panel: "right",
    copy: {
      "zh-CN": {
        eyebrow: "读深一层",
        title: ["一句话，", "也要说清来处。"],
        detail: "原文 · 今译 · 解读 · 核查",
      },
      "zh-TW": {
        eyebrow: "讀深一層",
        title: ["一句話，", "也要說清來處。"],
        detail: "原文 · 今譯 · 解讀 · 核查",
      },
      en: {
        eyebrow: "READ DEEPER",
        title: ["Every idea deserves", "its source."],
        detail: "Text · translation · interpretation · verification",
      },
    },
  },
  {
    number: "04",
    slug: "thought-network",
    capture: "03-deep-reading.png",
    panel: "left",
    copy: {
      "zh-CN": {
        eyebrow: "思想脉络",
        title: ["顺着关联，", "把思想对照着读。"],
        detail: "来处 · 异答 · 回响",
      },
      "zh-TW": {
        eyebrow: "思想脈絡",
        title: ["順著關聯，", "把思想對照著讀。"],
        detail: "來處 · 異答 · 回響",
      },
      en: {
        eyebrow: "THOUGHT CONNECTIONS",
        title: ["Follow the links.", "Read ideas side by side."],
        detail: "Roots · counterpoints · echoes",
      },
    },
  },
  {
    number: "05",
    slug: "keep-and-share",
    capture: "05-share.png",
    panel: "left",
    copy: {
      "zh-CN": {
        eyebrow: "留下或带走",
        title: ["把读过的思想，", "留下或带走。"],
        detail: "收藏 · 屏蔽 · 保存图片 · 系统分享",
      },
      "zh-TW": {
        eyebrow: "留下或帶走",
        title: ["把讀過的思想，", "留下或帶走。"],
        detail: "收藏 · 屏蔽 · 儲存圖片 · 系統分享",
      },
      en: {
        eyebrow: "KEEP OR CARRY",
        title: ["Keep an idea—", "or carry it onward."],
        detail: "Save · hide · export · share",
      },
    },
  },
];

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function languageFamily(locale, serif = false) {
  if (locale === "en") {
    return serif
      ? "Georgia, Times New Roman, serif"
      : "Helvetica Neue, Arial, sans-serif";
  }
  return serif
    ? "Songti SC, STSong, Noto Serif CJK SC, serif"
    : "PingFang SC, Hiragino Sans GB, Arial, sans-serif";
}

function linesSvg(lines, { x, y, size, lineHeight, family, weight, fill }) {
  return lines
    .map(
      (line, index) =>
        `<text x="${x}" y="${y + index * lineHeight}" fill="${fill}" font-family="${family}" font-size="${size}" font-weight="${weight}">${escapeXml(line)}</text>`,
    )
    .join("\n");
}

function iconArtwork() {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128">
      <rect x="16" y="16" width="96" height="96" rx="24" fill="${palette.charcoal}"/>
      <g fill="none" stroke="#eee5d5" stroke-width="6" stroke-linecap="round" stroke-linejoin="round">
        <path d="M56 40 H40 V56"/>
        <path d="M73 40 H86 V52"/>
        <path d="M88 72 V88 H72"/>
        <path d="M56 88 H40 V73"/>
      </g>
      <circle cx="64" cy="64" r="4.5" fill="#eee5d5"/>
      <path d="M87 51 L97 40" fill="none" stroke="#eee5d5" stroke-width="3" stroke-linecap="round"/>
      <circle cx="100" cy="37" r="5" fill="${palette.verdigris}"/>
    </svg>`;
}

async function iconBuffer(size) {
  return sharp(Buffer.from(iconArtwork())).resize(size, size).png().toBuffer();
}

function storyOverlay(story, locale) {
  const copy = story.copy[locale];
  const isLeft = story.panel === "left";
  const panelStart = isLeft ? 0 : 842;
  const panelWidth = 438;
  const textX = isLeft ? 54 : 896;
  const titleY = locale === "en" ? 234 : 228;
  const titleSize = locale === "en" ? 39 : 42;
  const titleLineHeight = locale === "en" ? 52 : 61;
  const gradient = isLeft
    ? `<linearGradient id="panel" x1="0" x2="1"><stop offset="0" stop-color="${palette.ivoryLight}" stop-opacity="1"/><stop offset=".72" stop-color="${palette.ivoryLight}" stop-opacity=".97"/><stop offset="1" stop-color="${palette.ivoryLight}" stop-opacity="0"/></linearGradient>`
    : `<linearGradient id="panel" x1="1" x2="0"><stop offset="0" stop-color="${palette.ivoryLight}" stop-opacity="1"/><stop offset=".72" stop-color="${palette.ivoryLight}" stop-opacity=".97"/><stop offset="1" stop-color="${palette.ivoryLight}" stop-opacity="0"/></linearGradient>`;
  const detailY = titleY + copy.title.length * titleLineHeight + 37;
  const markerX = isLeft ? 366 : 914;
  const markerEndX = isLeft ? 413 : 867;
  const nodeX = isLeft ? 415 : 865;

  return Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="1280" height="800" viewBox="0 0 1280 800">
      <defs>${gradient}</defs>
      <rect x="${panelStart}" y="0" width="${panelWidth}" height="800" fill="url(#panel)"/>
      <rect x="${isLeft ? 0 : 1246}" y="0" width="34" height="800" fill="${palette.ivoryLight}"/>
      <text x="${textX}" y="70" fill="${palette.charcoal}" font-family="Helvetica Neue, Arial, sans-serif" font-size="19" font-weight="700" letter-spacing="5">AGORA</text>
      <circle cx="${textX + 102}" cy="64" r="4" fill="${palette.verdigris}"/>
      <text x="${textX}" y="162" fill="${palette.verdigrisDark}" font-family="${languageFamily(locale)}" font-size="14" font-weight="600" letter-spacing="2">${escapeXml(copy.eyebrow)}</text>
      ${linesSvg(copy.title, {
        x: textX,
        y: titleY,
        size: titleSize,
        lineHeight: titleLineHeight,
        family: languageFamily(locale, true),
        weight: 600,
        fill: palette.charcoal,
      })}
      <line x1="${textX}" y1="${detailY - 20}" x2="${textX + 52}" y2="${detailY - 20}" stroke="${palette.verdigris}" stroke-width="2"/>
      <text x="${textX}" y="${detailY + 17}" fill="${palette.charcoalSoft}" font-family="${languageFamily(locale)}" font-size="${locale === "en" ? 14 : 15}" letter-spacing=".4">${escapeXml(copy.detail)}</text>
      <line x1="${markerX}" y1="717" x2="${markerEndX}" y2="717" stroke="${palette.line}" stroke-width="1.5"/>
      <circle cx="${nodeX}" cy="717" r="4" fill="${palette.verdigris}"/>
      <text x="${textX}" y="726" fill="${palette.charcoalSoft}" font-family="Helvetica Neue, Arial, sans-serif" font-size="11" letter-spacing="2">PHILOSOPHY / NEW TAB</text>
      <text x="${isLeft ? 386 : 894}" y="766" fill="${palette.verdigrisDark}" font-family="Helvetica Neue, Arial, sans-serif" font-size="11" text-anchor="${isLeft ? "end" : "start"}" letter-spacing="2">${story.number} / 05</text>
    </svg>`,
  );
}

async function normalizedCapture(path) {
  return sharp(path)
    .resize(1280, 800, { fit: "cover", position: "centre" })
    .flatten({ background: palette.ivoryLight })
    .removeAlpha()
    .toColourspace("srgb")
    .png({ compressionLevel: 9 })
    .toBuffer();
}

async function renderStory(story, locale, destination) {
  const capture = await normalizedCapture(
    resolve(captureRoot, locale, story.capture),
  );

  await sharp(capture)
    .composite([{ input: storyOverlay(story, locale), left: 0, top: 0 }])
    .flatten({ background: palette.ivoryLight })
    .removeAlpha()
    .toColourspace("srgb")
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(destination);
}

function networkMotif(width, height, opacity = 0.18) {
  const cx = Math.round(width * 0.76);
  const cy = Math.round(height * 0.48);
  const nodes = [
    [cx, cy, 5],
    [Math.round(width * 0.88), Math.round(height * 0.28), 3.8],
    [Math.round(width * 0.91), Math.round(height * 0.69), 4.4],
    [Math.round(width * 0.64), Math.round(height * 0.22), 3.2],
    [Math.round(width * 0.59), Math.round(height * 0.72), 3.6],
  ];
  const lines = nodes
    .slice(1)
    .map(
      ([x, y]) =>
        `<path d="M${cx} ${cy} L${x} ${y}" fill="none" stroke="${palette.verdigris}" stroke-width="1.5"/>`,
    )
    .join("");
  const circles = nodes
    .map(
      ([x, y, radius], index) =>
        `<circle cx="${x}" cy="${y}" r="${radius}" fill="${index === 0 ? palette.charcoal : palette.verdigris}"/>`,
    )
    .join("");
  return `<g opacity="${opacity}">${lines}${circles}</g>`;
}

async function renderSmallPromo(destination) {
  const mark = await iconBuffer(54);
  const overlay = Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="440" height="280" viewBox="0 0 440 280">
      <rect width="440" height="280" fill="${palette.ivoryLight}"/>
      <path d="M312 30 H404 V112 M404 168 V250 H312" fill="none" stroke="${palette.charcoal}" stroke-opacity=".11" stroke-width="1.5"/>
      ${networkMotif(440, 280, 0.2)}
      <text x="92" y="58" fill="${palette.charcoalSoft}" font-family="Helvetica Neue, Arial, sans-serif" font-size="10" letter-spacing="2.3">PHILOSOPHY / NEW TAB</text>
      <text x="30" y="151" fill="${palette.charcoal}" font-family="Georgia, Times New Roman, serif" font-size="55" font-weight="700" letter-spacing="4">AGORA</text>
      <line x1="33" y1="176" x2="79" y2="176" stroke="${palette.verdigris}" stroke-width="2"/>
      <text x="32" y="211" fill="${palette.charcoal}" font-family="Georgia, Times New Roman, serif" font-size="18">A different way to see.</text>
      <text x="32" y="245" fill="${palette.charcoalSoft}" font-family="Helvetica Neue, Arial, sans-serif" font-size="10" letter-spacing="1.8">1,000+ IDEAS · ORIGINAL ARTWORK</text>
    </svg>`,
  );

  await sharp(overlay)
    .composite([{ input: mark, left: 28, top: 25 }])
    .flatten({ background: palette.ivoryLight })
    .removeAlpha()
    .toColourspace("srgb")
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(destination);
}

function roundedMask(width, height, radius) {
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><rect width="${width}" height="${height}" rx="${radius}" fill="#fff"/></svg>`,
  );
}

async function uiCard(path, width, height) {
  const image = await sharp(path)
    .resize(width, height, { fit: "cover", position: "centre" })
    .flatten({ background: palette.charcoal })
    .removeAlpha()
    .toColourspace("srgb")
    .png()
    .toBuffer();
  return sharp(image)
    .composite([{ input: roundedMask(width, height, 16), blend: "dest-in" }])
    .png()
    .toBuffer();
}

async function renderMarquee(destination) {
  const mark = await iconBuffer(66);
  const ui = await uiCard(
    resolve(captureRoot, "en", "03-deep-reading.png"),
    674,
    421,
  );
  const overlay = Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="1400" height="560" viewBox="0 0 1400 560">
      <rect width="1400" height="560" fill="${palette.ivoryLight}"/>
      <path d="M37 32 H633 V145 M633 415 V528 H37" fill="none" stroke="${palette.charcoal}" stroke-opacity=".1" stroke-width="1.5"/>
      ${networkMotif(1400, 560, 0.16)}
      <text x="158" y="82" fill="${palette.verdigrisDark}" font-family="Helvetica Neue, Arial, sans-serif" font-size="12" letter-spacing="3.4">PHILOSOPHY / NEW TAB</text>
      <text x="78" y="227" fill="${palette.charcoal}" font-family="Georgia, Times New Roman, serif" font-size="88" font-weight="700" letter-spacing="5">AGORA</text>
      <text x="83" y="297" fill="${palette.charcoal}" font-family="Georgia, Times New Roman, serif" font-size="28">A different way to see,</text>
      <text x="83" y="337" fill="${palette.charcoal}" font-family="Georgia, Times New Roman, serif" font-size="28">with every new tab.</text>
      <line x1="84" y1="376" x2="144" y2="376" stroke="${palette.verdigris}" stroke-width="3"/>
      <text x="84" y="419" fill="${palette.charcoalSoft}" font-family="Helvetica Neue, Arial, sans-serif" font-size="12" letter-spacing="1.7">FIVE TRADITIONS · SOURCE-AWARE READING</text>
      <text x="84" y="478" fill="${palette.charcoalSoft}" font-family="Helvetica Neue, Arial, sans-serif" font-size="10" letter-spacing="2.1">NO ACCOUNT · NO TRACKING · NO PERMISSIONS</text>
      <rect x="677" y="51" width="706" height="453" rx="23" fill="#d9d4ca" fill-opacity=".55"/>
      <rect x="687" y="61" width="686" height="433" rx="19" fill="${palette.charcoal}" stroke="${palette.charcoal}" stroke-opacity=".14" stroke-width="2"/>
    </svg>`,
  );

  await sharp(overlay)
    .composite([
      { input: mark, left: 76, top: 46 },
      { input: ui, left: 693, top: 67 },
    ])
    .flatten({ background: palette.ivoryLight })
    .removeAlpha()
    .toColourspace("srgb")
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(destination);
}

async function renderContactSheet(locale, destination) {
  const width = 1600;
  const height = 900;
  const cards = [];
  const cardWidth = 456;
  const cardHeight = 285;
  const positions = [
    [56, 130],
    [572, 130],
    [1088, 130],
    [314, 475],
    [830, 475],
  ];

  for (let index = 0; index < stories.length; index += 1) {
    const story = stories[index];
    const source = resolve(
      uploadRoot,
      locale,
      `screenshot-${story.number}-${story.slug}-1280x800.png`,
    );
    const card = await sharp(source)
      .resize(cardWidth, cardHeight)
      .png()
      .toBuffer();
    const [left, top] = positions[index];
    cards.push({ input: card, left, top });
  }

  const backdrop = Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
      <rect width="${width}" height="${height}" fill="#ded8cc"/>
      <text x="60" y="66" fill="${palette.charcoal}" font-family="Georgia, Times New Roman, serif" font-size="34" font-weight="700">AGORA · Chrome Web Store screenshots</text>
      <text x="1540" y="66" text-anchor="end" fill="${palette.charcoalSoft}" font-family="Helvetica Neue, Arial, sans-serif" font-size="14" letter-spacing="2">${locale}</text>
    </svg>`,
  );
  await sharp(backdrop)
    .composite(cards)
    .flatten({ background: "#ded8cc" })
    .removeAlpha()
    .png({ compressionLevel: 9 })
    .toFile(destination);
}

async function renderPromoBoard(destination) {
  const small = await sharp(
    resolve(uploadRoot, "global", "small-promo-440x280.png"),
  )
    .resize(660, 420)
    .png()
    .toBuffer();
  const marquee = await sharp(
    resolve(uploadRoot, "global", "marquee-1400x560.png"),
  )
    .resize(1120, 448)
    .png()
    .toBuffer();
  const icon = await iconBuffer(192);
  const backdrop = Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1040">
      <rect width="1600" height="1040" fill="#ded8cc"/>
      <text x="64" y="73" fill="${palette.charcoal}" font-family="Georgia, Times New Roman, serif" font-size="35" font-weight="700">AGORA · Store identity &amp; promotional tiles</text>
      <text x="64" y="129" fill="${palette.charcoalSoft}" font-family="Helvetica Neue, Arial, sans-serif" font-size="13" letter-spacing="2">OPEN COURTYARD · THOUGHT NODE · QUIET EDITORIAL SYSTEM</text>
      <rect x="64" y="177" width="244" height="244" rx="18" fill="#f5f1e8"/>
      <text x="64" y="459" fill="${palette.charcoalSoft}" font-family="Helvetica Neue, Arial, sans-serif" font-size="13" letter-spacing="1.8">STORE ICON / 128 × 128</text>
      <text x="392" y="176" fill="${palette.charcoalSoft}" font-family="Helvetica Neue, Arial, sans-serif" font-size="13" letter-spacing="1.8">SMALL PROMO / 440 × 280</text>
      <text x="64" y="545" fill="${palette.charcoalSoft}" font-family="Helvetica Neue, Arial, sans-serif" font-size="13" letter-spacing="1.8">MARQUEE / 1400 × 560</text>
    </svg>`,
  );
  await sharp(backdrop)
    .composite([
      { input: icon, left: 90, top: 203 },
      { input: small, left: 392, top: 198 },
      { input: marquee, left: 240, top: 574 },
    ])
    .flatten({ background: "#ded8cc" })
    .removeAlpha()
    .png({ compressionLevel: 9 })
    .toFile(destination);
}

function copyDocument(locale) {
  if (locale === "zh-CN") {
    return `# AGORA 商店文案（简体中文）\n\n## 一句话简介\n\n让每一个 Chrome 新标签页，成为一次安静而有出处的思想相遇。\n\n## 图片顺序\n\n1. 每开一页，换一种看世界的方法。\n2. 五种传统，自由穿行。\n3. 一句话，也要说清来处。\n4. 顺着关联，把思想对照着读。\n5. 把读过的思想，留下或带走。\n\n## 卖点短句\n\n1000+ 则思想；西哲、中哲、毛选、科学、印度五种思想集；原文与译写；解读与来源核查；思想脉络；收藏、屏蔽与分享。\n`;
  }
  if (locale === "zh-TW") {
    return `# AGORA 商店文案（繁體中文）\n\n## 一句話簡介\n\n讓每一個 Chrome 新分頁，成為一次安靜而有出處的思想相遇。\n\n## 圖片順序\n\n1. 每開一頁，換一種看世界的方法。\n2. 五種傳統，自由穿行。\n3. 一句話，也要說清來處。\n4. 順著關聯，把思想對照著讀。\n5. 把讀過的思想，留下或帶走。\n\n## 賣點短句\n\n1000+ 則思想；西哲、中哲、毛選、科學、印度五種思想集；原文與譯寫；解讀與來源核查；思想脈絡；收藏、屏蔽與分享。\n`;
  }
  return `# AGORA store copy (English)\n\n## One-line description\n\nTurn every Chrome new tab into a quiet encounter with a sourced idea.\n\n## Screenshot order\n\n1. A different way to see, with every new tab.\n2. Five traditions. One open path.\n3. Every idea deserves its source.\n4. Follow the links. Read ideas side by side.\n5. Keep an idea—or carry it onward.\n\n## Feature line\n\n1,000+ ideas; five traditions; bilingual texts; interpretation and source verification; thought connections; saving, hiding and sharing.\n`;
}

function readme() {
  return `# AGORA · Chrome Web Store assets v3\n\n这是一套可直接上传的 Chrome Web Store 图片资源。新版以“开放方庭 + 思想节点”为品牌母题，截图以真实产品界面为主体。\n\n## 上传目录\n\n- \`upload/global/store-icon-128.png\`：商店图标（128 × 128，透明边距）\n- \`upload/zh-CN\`：简体中文截图 5 张\n- \`upload/zh-TW\`：繁体中文截图 5 张\n- \`upload/en\`：英文截图 5 张\n- \`upload/global\`：全球通用英文截图、440 × 280 小型宣传图、1400 × 560 顶部宣传图\n\n所有截图和宣传图均为 24 位 RGB PNG、无透明通道。商店图标保留透明画布，96 × 96 主图形位于 128 × 128 画布中央。\n\n## 建议上传方式\n\n1. 简体、繁体、英文截图分别放入对应语言的“以当地语言显示的资源”。\n2. 全球通用截图使用 \`upload/global/screenshot-*\`。若商店后台不需要重复素材，可只保留英文全局组。\n3. 小型宣传图和顶部宣传图使用 \`upload/global\` 中同名文件。\n4. 视频不是必填项；没有成片时留空，比上传低质量录屏更合适。\n\n## 预览\n\n- \`preview/contact-sheet-zh-CN.png\`\n- \`preview/contact-sheet-zh-TW.png\`\n- \`preview/contact-sheet-en.png\`\n- \`preview/promo-board.png\`\n`;
}

async function writeBrandExports() {
  const masterRoot = resolve(brandRoot, "master");
  const exportRoot = resolve(brandRoot, "exports");
  await mkdir(masterRoot, { recursive: true });
  await mkdir(exportRoot, { recursive: true });
  await writeFile(resolve(masterRoot, "store-icon.svg"), iconArtwork());
  for (const size of [16, 32, 48, 128, 256, 512, 1024]) {
    await sharp(Buffer.from(iconArtwork()))
      .resize(size, size)
      .png({ compressionLevel: 9 })
      .toFile(resolve(exportRoot, `icon-${size}.png`));
  }
}

async function writeManifest() {
  const manifest = {
    name: "AGORA Chrome Web Store assets",
    version: 3,
    generatedAt: new Date().toISOString(),
    identity: {
      concept: "open courtyard and thought node",
      palette,
    },
    files: {
      storeIcon: {
        path: "upload/global/store-icon-128.png",
        width: 128,
        height: 128,
        alpha: true,
      },
      screenshots: Object.fromEntries(
        [...locales, "global"].map((locale) => [
          locale,
          stories.map(
            (story) =>
              `upload/${locale}/screenshot-${story.number}-${story.slug}-1280x800.png`,
          ),
        ]),
      ),
      smallPromo: {
        path: "upload/global/small-promo-440x280.png",
        width: 440,
        height: 280,
        alpha: false,
      },
      marquee: {
        path: "upload/global/marquee-1400x560.png",
        width: 1400,
        height: 560,
        alpha: false,
      },
    },
  };
  await writeFile(
    resolve(assetsRoot, "asset-manifest.json"),
    `${JSON.stringify(manifest, null, 2)}\n`,
  );
}

async function ensureSources() {
  for (const locale of locales) {
    for (const story of stories) {
      await readFile(resolve(captureRoot, locale, story.capture));
    }
  }
  // Keep the previous campaign artwork available as provenance, even though the
  // v3 upload set uses only real product captures and original vector motifs.
  await readFile(resolve(legacyArtRoot, "agora-threshold.png"));
}

await ensureSources();
await rm(uploadRoot, { recursive: true, force: true });
await rm(brandRoot, { recursive: true, force: true });
await rm(previewRoot, { recursive: true, force: true });
await Promise.all([
  ...locales.map((locale) => mkdir(resolve(uploadRoot, locale), { recursive: true })),
  mkdir(resolve(uploadRoot, "global"), { recursive: true }),
  mkdir(previewRoot, { recursive: true }),
]);

for (const locale of locales) {
  for (const story of stories) {
    const destination = resolve(
      uploadRoot,
      locale,
      `screenshot-${story.number}-${story.slug}-1280x800.png`,
    );
    await renderStory(story, locale, destination);
    console.log(`Rendered ${locale}/${story.number}-${story.slug}`);
  }
}

for (const story of stories) {
  const fileName = `screenshot-${story.number}-${story.slug}-1280x800.png`;
  await copyFile(resolve(uploadRoot, "en", fileName), resolve(uploadRoot, "global", fileName));
}

await writeBrandExports();
await copyFile(
  resolve(brandRoot, "exports", "icon-128.png"),
  resolve(uploadRoot, "global", "store-icon-128.png"),
);
await renderSmallPromo(resolve(uploadRoot, "global", "small-promo-440x280.png"));
await renderMarquee(resolve(uploadRoot, "global", "marquee-1400x560.png"));

for (const locale of locales) {
  await renderContactSheet(
    locale,
    resolve(previewRoot, `contact-sheet-${locale}.png`),
  );
  await writeFile(resolve(assetsRoot, `COPY-${locale.toUpperCase()}.md`), copyDocument(locale));
}
await renderPromoBoard(resolve(previewRoot, "promo-board.png"));
await writeFile(resolve(assetsRoot, "README.md"), readme());
await writeManifest();

// Convenience copies for users who are accustomed to the previous root layout.
await copyFile(
  resolve(uploadRoot, "global", "store-icon-128.png"),
  resolve(storeAssetsRoot, "store-icon-128.png"),
);
await copyFile(
  resolve(uploadRoot, "global", "small-promo-440x280.png"),
  resolve(storeAssetsRoot, "small-promo-440x280.png"),
);
await copyFile(
  resolve(uploadRoot, "global", "marquee-1400x560.png"),
  resolve(storeAssetsRoot, "marquee-1400x560.png"),
);

console.log(`AGORA v3 store assets generated in ${assetsRoot}`);
