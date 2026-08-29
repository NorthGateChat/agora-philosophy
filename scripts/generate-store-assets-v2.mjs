import { copyFile, mkdir, rm } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const assetsRoot = resolve(projectRoot, "store-assets", "v2");
const captureRoot = resolve(assetsRoot, "source", "captures");
const captureEnRoot = resolve(captureRoot, "en");
const generatedRoot = resolve(assetsRoot, "source", "generated");
const uploadZhRoot = resolve(assetsRoot, "upload", "zh-CN");
const uploadGlobalRoot = resolve(assetsRoot, "upload", "global");
const storyZhRoot = resolve(assetsRoot, "story", "zh-CN");
const storyEnRoot = resolve(assetsRoot, "story", "en");
const brandRoot = resolve(assetsRoot, "brand");
const campaignZhRoot = resolve(assetsRoot, "campaign", "zh-CN");
const campaignEnRoot = resolve(assetsRoot, "campaign", "en");
const previewRoot = resolve(assetsRoot, "preview");

const palette = {
  ivory: "#eee9df",
  ivorySoft: "#f6f2ea",
  graphite: "#262925",
  graphiteSoft: "#525954",
  verdigris: "#637e76",
  line: "#b8b7ad",
};

const uploadScreenshots = [
  ["01-home.png", "screenshot-01-discover-1280x800.png"],
  ["03-collections.png", "screenshot-02-collections-1280x800.png"],
  ["02-detail.png", "screenshot-03-read-deeper-1280x800.png"],
  ["04-library.png", "screenshot-04-library-1280x800.png"],
  ["05-share.png", "screenshot-05-share-1280x800.png"],
];

const scenes = [
  {
    slug: "encounter",
    art: "agora-threshold.png",
    capture: "01-home.png",
    layout: "left",
    zh: {
      eyebrow: "01 / 遇见",
      title: ["每一次新页，", "遇见一种思想。"],
      subtitle: ["一页，一种思想。", "让新标签页留下一点安静。"],
    },
    en: {
      eyebrow: "01 / ENCOUNTER",
      title: ["Meet a new idea", "with every new tab."],
      subtitle: ["One page, one idea.", "A quiet pause inside the everyday browser."],
    },
  },
  {
    slug: "wander",
    art: "five-paths.png",
    capture: "03-collections.png",
    layout: "right",
    zh: {
      eyebrow: "02 / 漫游",
      title: ["五个思想集，", "一次跨传统的漫游。"],
      subtitle: ["西方哲学 · 中国哲学 · 毛选", "科学思想 · 印度哲学 · 跨集随机"],
    },
    en: {
      eyebrow: "02 / WANDER",
      title: ["Five collections.", "One open-ended journey."],
      subtitle: ["Western · Chinese · Mao", "Science · Indian · Across collections"],
    },
  },
  {
    slug: "read-deeper",
    art: "idea-lineage.png",
    capture: "02-detail.png",
    layout: "left",
    zh: {
      eyebrow: "03 / 读深",
      title: ["不是金句，", "是思想的来路与去处。"],
      subtitle: ["原文与译写 · 核心解读 · 语境边界", "思想来处 · 同题异答 · 后续回响"],
    },
    en: {
      eyebrow: "03 / READ DEEPER",
      title: ["Not just a quote.", "Follow the life of an idea."],
      subtitle: ["Text · interpretation · context · boundaries", "Roots · counterpoints · echoes"],
    },
  },
  {
    slug: "keep",
    art: "private-keeping.png",
    capture: "04-library.png",
    layout: "right",
    zh: {
      eyebrow: "04 / 留下",
      title: ["留下想重读的，", "屏蔽不想再见的。"],
      subtitle: ["收藏 · 最近阅读 · 已屏蔽", "所有选择只留在本地。"],
    },
    en: {
      eyebrow: "04 / KEEP",
      title: ["Keep what matters.", "Hide what does not."],
      subtitle: ["Saved · recent · hidden", "Your reading practice stays on your device."],
    },
  },
  {
    slug: "carry",
    art: "carry-the-thought.png",
    capture: "05-share.png",
    layout: "left",
    zh: {
      eyebrow: "05 / 带走",
      title: ["把一句思想，", "带到下一次对话里。"],
      subtitle: ["保存图片 · 复制文本 · 系统分享", "桌面与移动版式，按场景选择。"],
    },
    en: {
      eyebrow: "05 / CARRY",
      title: ["Carry an idea", "into the next conversation."],
      subtitle: ["Save · copy · system share", "Choose a desktop or mobile composition."],
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

function textLines(lines, { x, y, size, lineHeight, family, weight = 400, fill }) {
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
      <rect x="16" y="16" width="96" height="96" rx="24" fill="#26231e"/>
      <circle cx="64" cy="64" r="28" fill="none" stroke="#eee5d5" stroke-width="4"
        stroke-linecap="round" stroke-dasharray="153 23" transform="rotate(-53 64 64)"/>
      <path d="M77 37 L88 25" fill="none" stroke="#caa35f" stroke-width="3" stroke-linecap="round"/>
      <circle cx="64" cy="64" r="4.5" fill="#caa35f"/>
    </svg>`;
}

async function iconBuffer(size) {
  return sharp(Buffer.from(iconArtwork()))
    .resize(size, size)
    .png()
    .toBuffer();
}

function roundedMask(width, height, radius) {
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><rect width="${width}" height="${height}" rx="${radius}" fill="#fff"/></svg>`,
  );
}

async function prepareUiCard(capturePath, width, height) {
  const screenshot = await sharp(capturePath)
    .resize(width, height, { fit: "fill" })
    .flatten({ background: palette.graphite })
    .removeAlpha()
    .png()
    .toBuffer();

  return sharp(screenshot)
    .composite([{ input: roundedMask(width, height, 14), blend: "dest-in" }])
    .png()
    .toBuffer();
}

function storyOverlay(scene, copy, language) {
  const left = scene.layout === "left";
  const textX = left ? 68 : 746;
  const titleY = language === "zh" ? 174 : 168;
  const titleSize = language === "zh" ? 45 : 42;
  const titleLineHeight = language === "zh" ? 66 : 58;
  const subtitleY = titleY + titleLineHeight * copy.title.length + 30;
  const fontSerif =
    language === "zh"
      ? "Songti SC, STSong, Noto Serif CJK SC, serif"
      : "Georgia, Times New Roman, serif";
  const textPanelX = left ? 38 : 716;
  const gradient = left
    ? `<linearGradient id="veil" x1="0" x2="1"><stop offset="0" stop-color="${palette.ivorySoft}" stop-opacity=".98"/><stop offset=".46" stop-color="${palette.ivorySoft}" stop-opacity=".86"/><stop offset=".72" stop-color="${palette.ivorySoft}" stop-opacity=".2"/><stop offset="1" stop-color="${palette.ivorySoft}" stop-opacity="0"/></linearGradient>`
    : `<linearGradient id="veil" x1="1" x2="0"><stop offset="0" stop-color="${palette.ivorySoft}" stop-opacity=".98"/><stop offset=".46" stop-color="${palette.ivorySoft}" stop-opacity=".86"/><stop offset=".72" stop-color="${palette.ivorySoft}" stop-opacity=".2"/><stop offset="1" stop-color="${palette.ivorySoft}" stop-opacity="0"/></linearGradient>`;

  return Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="1280" height="800" viewBox="0 0 1280 800">
      <defs>${gradient}</defs>
      <rect width="1280" height="800" fill="url(#veil)"/>
      <rect x="${textPanelX}" y="98" width="526" height="408" rx="22" fill="${palette.ivorySoft}" fill-opacity=".82"/>
      <text x="${textX}" y="74" fill="${palette.graphite}" font-family="Arial, sans-serif" font-size="20" font-weight="700" letter-spacing="6">AGORA</text>
      <circle cx="${textX + 111}" cy="68" r="4" fill="${palette.verdigris}"/>
      <text x="${textX}" y="128" fill="${palette.verdigris}" font-family="PingFang SC, Arial, sans-serif" font-size="14" font-weight="600" letter-spacing="2">${escapeXml(copy.eyebrow)}</text>
      ${textLines(copy.title, {
        x: textX,
        y: titleY,
        size: titleSize,
        lineHeight: titleLineHeight,
        family: fontSerif,
        weight: 600,
        fill: palette.graphite,
      })}
      <line x1="${textX}" y1="${subtitleY - 8}" x2="${textX + 54}" y2="${subtitleY - 8}" stroke="${palette.verdigris}" stroke-width="2"/>
      ${textLines(copy.subtitle, {
        x: textX,
        y: subtitleY + 28,
        size: language === "zh" ? 17 : 16,
        lineHeight: 30,
        family: language === "zh" ? "PingFang SC, Arial, sans-serif" : "Arial, sans-serif",
        fill: palette.graphiteSoft,
      })}
      <text x="${textX}" y="742" fill="${palette.graphiteSoft}" font-family="Arial, sans-serif" font-size="11" letter-spacing="2.2">PHILOSOPHY / NEW TAB</text>
      <text x="1212" y="742" text-anchor="end" fill="${palette.verdigris}" font-family="Arial, sans-serif" font-size="11" letter-spacing="2">${String(scenes.indexOf(scene) + 1).padStart(2, "0")} / 05</text>
    </svg>`,
  );
}

async function renderStory(scene, language, destination) {
  const left = scene.layout === "left";
  const art = await sharp(resolve(generatedRoot, scene.art))
    .resize(1280, 800, { fit: "cover", position: "centre" })
    .modulate({ saturation: 0.72, brightness: 1.04 })
    .flatten({ background: palette.ivorySoft })
    .removeAlpha()
    .png()
    .toBuffer();
  const uiWidth = 610;
  const uiHeight = 381;
  const uiX = left ? 610 : 60;
  const uiY = 305;
  const localizedCaptureRoot = language === "en" ? captureEnRoot : captureRoot;
  const ui = await prepareUiCard(resolve(localizedCaptureRoot, scene.capture), uiWidth, uiHeight);
  const shadow = Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="650" height="421">
      <filter id="s" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="12"/></filter>
      <rect x="20" y="20" width="610" height="381" rx="17" fill="#1d2a26" fill-opacity=".22" filter="url(#s)"/>
    </svg>`,
  );
  const frame = Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="630" height="401">
      <rect x="1" y="1" width="628" height="399" rx="18" fill="${palette.ivorySoft}" stroke="${palette.graphite}" stroke-opacity=".2" stroke-width="2"/>
    </svg>`,
  );

  await sharp(art)
    .composite([
      { input: storyOverlay(scene, scene[language], language), left: 0, top: 0 },
      { input: shadow, left: uiX - 20, top: uiY - 20 },
      { input: frame, left: uiX - 10, top: uiY - 10 },
      { input: ui, left: uiX, top: uiY },
    ])
    .flatten({ background: palette.ivorySoft })
    .removeAlpha()
    .toColourspace("srgb")
    .png({ compressionLevel: 9 })
    .toFile(destination);
}

async function renderSmallPromo(destination) {
  const art = await sharp(resolve(generatedRoot, "agora-threshold.png"))
    .resize(440, 280, { fit: "cover", position: "right" })
    .modulate({ saturation: 0.74, brightness: 1.05 })
    .removeAlpha()
    .png()
    .toBuffer();
  const mark = await iconBuffer(44);
  const overlay = Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="440" height="280">
      <defs><linearGradient id="g"><stop offset="0" stop-color="${palette.ivorySoft}" stop-opacity="1"/><stop offset=".65" stop-color="${palette.ivorySoft}" stop-opacity=".9"/><stop offset="1" stop-color="${palette.ivorySoft}" stop-opacity=".18"/></linearGradient></defs>
      <rect width="440" height="280" fill="url(#g)"/>
      <text x="82" y="50" fill="${palette.graphiteSoft}" font-family="Arial, sans-serif" font-size="10" letter-spacing="2.5">PHILOSOPHY / NEW TAB</text>
      <text x="31" y="135" fill="${palette.graphite}" font-family="Georgia, Times New Roman, serif" font-size="58" font-weight="700" letter-spacing="3">AGORA</text>
      <line x1="34" y1="164" x2="84" y2="164" stroke="${palette.verdigris}" stroke-width="2"/>
      <text x="34" y="201" fill="${palette.graphite}" font-family="Georgia, Times New Roman, serif" font-size="19">One page, one idea.</text>
      <circle cx="393" cy="233" r="5" fill="${palette.verdigris}"/>
    </svg>`,
  );
  await sharp(art)
    .composite([{ input: overlay }, { input: mark, left: 28, top: 25 }])
    .flatten({ background: palette.ivorySoft })
    .removeAlpha()
    .toColourspace("srgb")
    .png({ compressionLevel: 9 })
    .toFile(destination);
}

async function renderMarquee(destination, localizedCaptureRoot) {
  const art = await sharp(resolve(generatedRoot, "five-paths.png"))
    .resize(1400, 560, { fit: "cover", position: "centre" })
    .modulate({ saturation: 0.7, brightness: 1.04 })
    .removeAlpha()
    .png()
    .toBuffer();
  const ui = await prepareUiCard(resolve(localizedCaptureRoot, "02-detail.png"), 520, 325);
  const mark = await iconBuffer(64);
  const overlay = Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="1400" height="560">
      <defs><linearGradient id="g"><stop offset="0" stop-color="${palette.ivorySoft}" stop-opacity="1"/><stop offset=".52" stop-color="${palette.ivorySoft}" stop-opacity=".92"/><stop offset=".78" stop-color="${palette.ivorySoft}" stop-opacity=".24"/><stop offset="1" stop-color="${palette.ivorySoft}" stop-opacity="0"/></linearGradient></defs>
      <rect width="1400" height="560" fill="url(#g)"/>
      <text x="156" y="86" fill="${palette.verdigris}" font-family="Arial, sans-serif" font-size="13" letter-spacing="4">PHILOSOPHY / NEW TAB</text>
      <text x="86" y="218" fill="${palette.graphite}" font-family="Georgia, Times New Roman, serif" font-size="92" font-weight="700" letter-spacing="3">AGORA</text>
      <text x="92" y="295" fill="${palette.graphite}" font-family="Georgia, Times New Roman, serif" font-size="29">Follow the life of an idea.</text>
      <line x1="92" y1="338" x2="158" y2="338" stroke="${palette.verdigris}" stroke-width="3"/>
      <text x="92" y="387" fill="${palette.graphiteSoft}" font-family="Arial, sans-serif" font-size="15" letter-spacing="1.2">FIVE COLLECTIONS · BILINGUAL READING · THOUGHT CONNECTIONS</text>
      <text x="92" y="476" fill="${palette.graphiteSoft}" font-family="Arial, sans-serif" font-size="11" letter-spacing="2.2">NO ACCOUNT · NO TRACKING · NO PERMISSIONS</text>
      <rect x="796" y="88" width="556" height="361" rx="18" fill="${palette.ivorySoft}" stroke="${palette.graphite}" stroke-opacity=".2" stroke-width="2"/>
    </svg>`,
  );
  await sharp(art)
    .composite([
      { input: overlay },
      { input: mark, left: 76, top: 48 },
      { input: ui, left: 814, top: 106 },
    ])
    .flatten({ background: palette.ivorySoft })
    .removeAlpha()
    .toColourspace("srgb")
    .png({ compressionLevel: 9 })
    .toFile(destination);
}

function campaignCopy(language) {
  if (language === "zh") {
    return {
      eyebrow: "CHROME 新标签页",
      title: ["每一次新页，", "遇见一种思想。"],
      launchTitle: ["把新标签页，", "变成思想入口。"],
      subtitle: "五个思想集 · 原文与译写 · 观点解读 · 思想脉络",
      privacy: "无账号 · 无追踪 · 无需权限 · 离线可用",
    };
  }
  return {
    eyebrow: "PHILOSOPHY / NEW TAB",
    title: ["Meet a new idea", "with every new tab."],
    launchTitle: ["Turn every new tab", "into a doorway to thought."],
    subtitle: "FIVE COLLECTIONS · BILINGUAL TEXTS · CONTEXT · CONNECTIONS",
    privacy: "NO ACCOUNT · NO TRACKING · NO PERMISSIONS · OFFLINE",
  };
}

function campaignTypeface(language) {
  return language === "zh"
    ? "Songti SC, STSong, Noto Serif CJK SC, serif"
    : "Georgia, Times New Roman, serif";
}

async function renderArticleCover(language, destination) {
  const localizedCaptureRoot = language === "en" ? captureEnRoot : captureRoot;
  const copy = campaignCopy(language);
  const art = await sharp(resolve(generatedRoot, "agora-threshold.png"))
    .resize(900, 383, { fit: "cover", position: "centre" })
    .modulate({ saturation: 0.68, brightness: 1.06 })
    .flatten({ background: palette.ivorySoft })
    .removeAlpha()
    .png()
    .toBuffer();
  const ui = await prepareUiCard(resolve(localizedCaptureRoot, "01-home.png"), 300, 188);
  const mark = await iconBuffer(58);
  const titleSize = language === "zh" ? 35 : 32;
  const titleLineHeight = language === "zh" ? 48 : 39;
  const overlay = Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="900" height="383">
      <defs><linearGradient id="g"><stop offset="0" stop-color="${palette.ivorySoft}" stop-opacity=".99"/><stop offset=".58" stop-color="${palette.ivorySoft}" stop-opacity=".9"/><stop offset="1" stop-color="${palette.ivorySoft}" stop-opacity=".15"/></linearGradient></defs>
      <rect width="900" height="383" fill="url(#g)"/>
      <text x="120" y="67" fill="${palette.graphite}" font-family="Arial, sans-serif" font-size="24" font-weight="700" letter-spacing="5">AGORA</text>
      <text x="54" y="119" fill="${palette.verdigris}" font-family="Arial, sans-serif" font-size="11" font-weight="600" letter-spacing="3">${escapeXml(copy.eyebrow)}</text>
      ${textLines(copy.title, {
        x: 54,
        y: 172,
        size: titleSize,
        lineHeight: titleLineHeight,
        family: campaignTypeface(language),
        weight: 600,
        fill: palette.graphite,
      })}
      <line x1="54" y1="278" x2="108" y2="278" stroke="${palette.verdigris}" stroke-width="2"/>
      <text x="54" y="313" fill="${palette.graphiteSoft}" font-family="Arial, sans-serif" font-size="${language === "zh" ? 13 : 10}" letter-spacing="${language === "zh" ? 1 : 1.5}">${escapeXml(copy.subtitle)}</text>
      <rect x="566" y="104" width="320" height="208" rx="16" fill="${palette.ivorySoft}" stroke="${palette.graphite}" stroke-opacity=".2" stroke-width="2"/>
    </svg>`,
  );
  await sharp(art)
    .composite([
      { input: overlay },
      { input: mark, left: 48, top: 30 },
      { input: ui, left: 576, top: 114 },
    ])
    .flatten({ background: palette.ivorySoft })
    .removeAlpha()
    .toColourspace("srgb")
    .png({ compressionLevel: 9 })
    .toFile(destination);
}

async function renderLaunchCover(language, destination) {
  const localizedCaptureRoot = language === "en" ? captureEnRoot : captureRoot;
  const copy = campaignCopy(language);
  const art = await sharp(resolve(generatedRoot, "five-paths.png"))
    .resize(1600, 900, { fit: "cover", position: "centre" })
    .modulate({ saturation: 0.66, brightness: 1.04 })
    .flatten({ background: palette.ivorySoft })
    .removeAlpha()
    .png()
    .toBuffer();
  const ui = await prepareUiCard(resolve(localizedCaptureRoot, "02-detail.png"), 700, 438);
  const mark = await iconBuffer(82);
  const titleSize = language === "zh" ? 66 : 59;
  const titleLineHeight = language === "zh" ? 91 : 72;
  const launchTitle = language === "en"
    ? ["Turn every new tab", "into a doorway", "to thought."]
    : copy.launchTitle;
  const overlay = Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900">
      <defs><linearGradient id="g"><stop offset="0" stop-color="${palette.ivorySoft}" stop-opacity="1"/><stop offset=".52" stop-color="${palette.ivorySoft}" stop-opacity=".93"/><stop offset=".8" stop-color="${palette.ivorySoft}" stop-opacity=".34"/><stop offset="1" stop-color="${palette.ivorySoft}" stop-opacity=".08"/></linearGradient></defs>
      <rect width="1600" height="900" fill="url(#g)"/>
      <text x="182" y="124" fill="${palette.graphite}" font-family="Arial, sans-serif" font-size="34" font-weight="700" letter-spacing="7">AGORA</text>
      <text x="92" y="205" fill="${palette.verdigris}" font-family="Arial, sans-serif" font-size="14" font-weight="600" letter-spacing="4">${escapeXml(copy.eyebrow)}</text>
      ${textLines(launchTitle, {
        x: 92,
        y: 305,
        size: titleSize,
        lineHeight: titleLineHeight,
        family: campaignTypeface(language),
        weight: 600,
        fill: palette.graphite,
      })}
      <line x1="92" y1="516" x2="164" y2="516" stroke="${palette.verdigris}" stroke-width="3"/>
      <text x="92" y="568" fill="${palette.graphiteSoft}" font-family="Arial, sans-serif" font-size="${language === "zh" ? 18 : 14}" letter-spacing="${language === "zh" ? 1.4 : 1.8}">${escapeXml(copy.subtitle)}</text>
      <text x="92" y="797" fill="${palette.graphiteSoft}" font-family="Arial, sans-serif" font-size="13" letter-spacing="2.7">${escapeXml(copy.privacy)}</text>
      <rect x="804" y="238" width="740" height="478" rx="25" fill="${palette.ivorySoft}" stroke="${palette.graphite}" stroke-opacity=".22" stroke-width="2"/>
    </svg>`,
  );
  await sharp(art)
    .composite([
      { input: overlay },
      { input: mark, left: 84, top: 77 },
      { input: ui, left: 824, top: 258 },
    ])
    .flatten({ background: palette.ivorySoft })
    .removeAlpha()
    .toColourspace("srgb")
    .png({ compressionLevel: 9 })
    .toFile(destination);
}

async function renderSocialSquare(language, destination) {
  const localizedCaptureRoot = language === "en" ? captureEnRoot : captureRoot;
  const copy = campaignCopy(language);
  const art = await sharp(resolve(generatedRoot, "private-keeping.png"))
    .resize(1080, 1080, { fit: "cover", position: "centre" })
    .modulate({ saturation: 0.64, brightness: 1.06 })
    .flatten({ background: palette.ivorySoft })
    .removeAlpha()
    .png()
    .toBuffer();
  const ui = await prepareUiCard(resolve(localizedCaptureRoot, "03-collections.png"), 850, 531);
  const mark = await iconBuffer(84);
  const titleSize = language === "zh" ? 55 : 49;
  const titleLineHeight = language === "zh" ? 74 : 59;
  const overlay = Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1080">
      <rect width="1080" height="1080" fill="${palette.ivorySoft}" fill-opacity=".83"/>
      <text x="166" y="111" fill="${palette.graphite}" font-family="Arial, sans-serif" font-size="32" font-weight="700" letter-spacing="7">AGORA</text>
      <text x="72" y="190" fill="${palette.verdigris}" font-family="Arial, sans-serif" font-size="13" font-weight="600" letter-spacing="4">${escapeXml(copy.eyebrow)}</text>
      ${textLines(copy.launchTitle, {
        x: 72,
        y: 270,
        size: titleSize,
        lineHeight: titleLineHeight,
        family: campaignTypeface(language),
        weight: 600,
        fill: palette.graphite,
      })}
      <line x1="72" y1="420" x2="134" y2="420" stroke="${palette.verdigris}" stroke-width="3"/>
      <rect x="95" y="477" width="890" height="571" rx="26" fill="${palette.ivorySoft}" stroke="${palette.graphite}" stroke-opacity=".22" stroke-width="2"/>
    </svg>`,
  );
  await sharp(art)
    .composite([
      { input: overlay },
      { input: mark, left: 66, top: 61 },
      { input: ui, left: 115, top: 497 },
    ])
    .flatten({ background: palette.ivorySoft })
    .removeAlpha()
    .toColourspace("srgb")
    .png({ compressionLevel: 9 })
    .toFile(destination);
}

async function normalizeScreenshot(source, destination) {
  await sharp(source)
    .resize(1280, 800, { fit: "fill" })
    .flatten({ background: palette.graphite })
    .removeAlpha()
    .toColourspace("srgb")
    .png({ compressionLevel: 9 })
    .toFile(destination);
}

async function makeContactSheet(storyRoot, destination, localeLabel) {
  const thumbWidth = 378;
  const thumbHeight = 236;
  const lefts = [34, 451, 868];
  const tops = [104, 378];
  const cells = [];
  for (let index = 0; index < scenes.length; index += 1) {
    const source = resolve(storyRoot, `product-${String(index + 1).padStart(2, "0")}-${scenes[index].slug}-1280x800.png`);
    const input = await sharp(source)
      .resize(thumbWidth, thumbHeight, { fit: "fill" })
      .png()
      .toBuffer();
    cells.push({
      input,
      left: lefts[index % 3],
      top: tops[Math.floor(index / 3)],
    });
  }
  const header = Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="1280" height="650">
      <rect width="1280" height="650" fill="${palette.graphite}"/>
      <text x="34" y="48" fill="${palette.ivorySoft}" font-family="Arial, sans-serif" font-size="20" font-weight="700" letter-spacing="5">AGORA / STORE VISUALS V2 · ${localeLabel}</text>
      <text x="1246" y="48" text-anchor="end" fill="${palette.verdigris}" font-family="Arial, sans-serif" font-size="11" letter-spacing="2">ENCOUNTER · WANDER · READ · KEEP · CARRY</text>
      <rect x="34" y="104" width="378" height="236" fill="none" stroke="#fff" stroke-opacity=".2"/>
      <rect x="451" y="104" width="378" height="236" fill="none" stroke="#fff" stroke-opacity=".2"/>
      <rect x="868" y="104" width="378" height="236" fill="none" stroke="#fff" stroke-opacity=".2"/>
      <rect x="34" y="378" width="378" height="236" fill="none" stroke="#fff" stroke-opacity=".2"/>
      <rect x="451" y="378" width="378" height="236" fill="none" stroke="#fff" stroke-opacity=".2"/>
      <text x="1075" y="482" text-anchor="middle" fill="${palette.ivorySoft}" font-family="Georgia, serif" font-size="34">One page, one idea.</text>
      <text x="1075" y="528" text-anchor="middle" fill="${palette.verdigris}" font-family="Arial, sans-serif" font-size="11" letter-spacing="2.3">REAL UI + ORIGINAL EDITORIAL ART</text>
    </svg>`,
  );
  await sharp(header)
    .composite(cells)
    .removeAlpha()
    .toColourspace("srgb")
    .png({ compressionLevel: 9 })
    .toFile(destination);
}

async function makeBrandBoard(destination) {
  const items = [
    {
      source: resolve(brandRoot, "app-icon-1024.png"),
      width: 180,
      height: 180,
      left: 42,
      top: 126,
    },
    {
      source: resolve(uploadGlobalRoot, "small-promo-440x280.png"),
      width: 440,
      height: 280,
      left: 270,
      top: 126,
    },
    {
      source: resolve(uploadGlobalRoot, "marquee-1400x560.png"),
      width: 800,
      height: 320,
      left: 758,
      top: 126,
    },
    {
      source: resolve(campaignZhRoot, "article-cover-900x383.png"),
      width: 675,
      height: 287,
      left: 42,
      top: 548,
    },
    {
      source: resolve(campaignZhRoot, "social-square-1080.png"),
      width: 300,
      height: 300,
      left: 758,
      top: 548,
    },
    {
      source: resolve(campaignZhRoot, "launch-cover-1600x900.png"),
      width: 480,
      height: 270,
      left: 1100,
      top: 548,
    },
  ];
  const composites = await Promise.all(
    items.map(async (item) => ({
      input: await sharp(item.source)
        .resize(item.width, item.height, { fit: "fill" })
        .png()
        .toBuffer(),
      left: item.left,
      top: item.top,
    })),
  );
  const board = Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="1600" height="930">
      <rect width="1600" height="930" fill="${palette.graphite}"/>
      <text x="42" y="54" fill="${palette.ivorySoft}" font-family="Arial, sans-serif" font-size="22" font-weight="700" letter-spacing="5">AGORA / BRAND &amp; CAMPAIGN ASSETS V2</text>
      <text x="1558" y="54" text-anchor="end" fill="${palette.verdigris}" font-family="Arial, sans-serif" font-size="11" letter-spacing="2.3">IDENTITY · COVER · PRODUCT PROOF · STORY</text>
      <text x="42" y="104" fill="${palette.ivorySoft}" font-family="Arial, sans-serif" font-size="11" letter-spacing="2">PRODUCT ICON</text>
      <text x="270" y="104" fill="${palette.ivorySoft}" font-family="Arial, sans-serif" font-size="11" letter-spacing="2">CHROME SMALL PROMO · 440 × 280</text>
      <text x="758" y="104" fill="${palette.ivorySoft}" font-family="Arial, sans-serif" font-size="11" letter-spacing="2">CHROME MARQUEE · 1400 × 560</text>
      <text x="42" y="526" fill="${palette.ivorySoft}" font-family="Arial, sans-serif" font-size="11" letter-spacing="2">ARTICLE COVER · 900 × 383</text>
      <text x="758" y="526" fill="${palette.ivorySoft}" font-family="Arial, sans-serif" font-size="11" letter-spacing="2">SOCIAL SQUARE · 1080 × 1080</text>
      <text x="1100" y="526" fill="${palette.ivorySoft}" font-family="Arial, sans-serif" font-size="11" letter-spacing="2">LAUNCH COVER · 1600 × 900</text>
      <text x="42" y="892" fill="${palette.ivorySoft}" font-family="Georgia, serif" font-size="25">Not illustration instead of product — illustration guiding the eye toward real product proof.</text>
      <circle cx="1550" cy="885" r="6" fill="${palette.verdigris}"/>
    </svg>`,
  );
  await sharp(board)
    .composite(composites)
    .removeAlpha()
    .toColourspace("srgb")
    .png({ compressionLevel: 9 })
    .toFile(destination);
}

await Promise.all([
  uploadZhRoot,
  uploadGlobalRoot,
  storyZhRoot,
  storyEnRoot,
  brandRoot,
  campaignZhRoot,
  campaignEnRoot,
  previewRoot,
].map(async (directory) => {
  await rm(directory, { recursive: true, force: true });
  await mkdir(directory, { recursive: true });
}));

for (const [captureFile, screenshotFile] of uploadScreenshots) {
  await Promise.all([
    normalizeScreenshot(
      resolve(captureRoot, captureFile),
      resolve(uploadZhRoot, screenshotFile),
    ),
    normalizeScreenshot(
      resolve(captureEnRoot, captureFile),
      resolve(uploadGlobalRoot, screenshotFile),
    ),
  ]);
}

const icon = Buffer.from(iconArtwork());
await Promise.all([
  sharp(icon).png().toFile(resolve(uploadZhRoot, "store-icon-128.png")),
  sharp(icon).png().toFile(resolve(uploadGlobalRoot, "store-icon-128.png")),
  sharp(icon).resize(512, 512).png().toFile(resolve(brandRoot, "app-icon-512.png")),
  sharp(icon).resize(1024, 1024).png().toFile(resolve(brandRoot, "app-icon-1024.png")),
  renderSmallPromo(resolve(uploadZhRoot, "small-promo-440x280.png")),
  renderSmallPromo(resolve(uploadGlobalRoot, "small-promo-440x280.png")),
  renderMarquee(resolve(uploadZhRoot, "marquee-1400x560.png"), captureRoot),
  renderMarquee(resolve(uploadGlobalRoot, "marquee-1400x560.png"), captureEnRoot),
  renderArticleCover("zh", resolve(campaignZhRoot, "article-cover-900x383.png")),
  renderArticleCover("en", resolve(campaignEnRoot, "article-cover-900x383.png")),
  renderLaunchCover("zh", resolve(campaignZhRoot, "launch-cover-1600x900.png")),
  renderLaunchCover("en", resolve(campaignEnRoot, "launch-cover-1600x900.png")),
  renderSocialSquare("zh", resolve(campaignZhRoot, "social-square-1080.png")),
  renderSocialSquare("en", resolve(campaignEnRoot, "social-square-1080.png")),
]);

for (let index = 0; index < scenes.length; index += 1) {
  const number = String(index + 1).padStart(2, "0");
  await Promise.all([
    renderStory(
      scenes[index],
      "zh",
      resolve(storyZhRoot, `product-${number}-${scenes[index].slug}-1280x800.png`),
    ),
    renderStory(
      scenes[index],
      "en",
      resolve(storyEnRoot, `product-${number}-${scenes[index].slug}-1280x800.png`),
    ),
  ]);
}

await Promise.all([
  makeContactSheet(
    storyZhRoot,
    resolve(previewRoot, "product-story-contact-sheet-zh-CN.png"),
    "ZH-CN",
  ),
  makeContactSheet(
    storyEnRoot,
    resolve(previewRoot, "product-story-contact-sheet-en.png"),
    "EN",
  ),
]);

await makeBrandBoard(resolve(previewRoot, "brand-and-campaign-board.png"));

await copyFile(
  resolve(previewRoot, "product-story-contact-sheet-zh-CN.png"),
  resolve(assetsRoot, "product-story-contact-sheet.png"),
);

await copyFile(
  resolve(previewRoot, "product-story-contact-sheet-en.png"),
  resolve(assetsRoot, "product-story-contact-sheet-en.png"),
);

await copyFile(
  resolve(previewRoot, "brand-and-campaign-board.png"),
  resolve(assetsRoot, "brand-and-campaign-board.png"),
);

console.log(`Generated AGORA Store Assets V2 in ${assetsRoot}`);
