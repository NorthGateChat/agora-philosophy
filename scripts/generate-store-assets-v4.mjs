import { copyFile, mkdir, rm, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

sharp.cache(false);
sharp.concurrency(1);

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const rawRoot = resolve(projectRoot, "store-assets", "raw-captures", "plato-cave");
const assetsRoot = resolve(projectRoot, "store-assets", "v4");
const uploadRoot = resolve(assetsRoot, "upload");
const brandRoot = resolve(assetsRoot, "brand", "exports");
const previewRoot = resolve(assetsRoot, "preview");

const colors = {
  paper: "#eee9de",
  paperLight: "#f6f2e9",
  paperDark: "#ddd6c8",
  ink: "#25231f",
  inkSoft: "#5d5951",
  sage: "#667f76",
  sageLight: "#93a79f",
  line: "#aaa397",
  night: "#1e201e",
};

const locales = ["zh-CN", "global"];
const fontFace = `
  @font-face {
    font-family: "Gloock";
    src: url("file:///Users/alanxrhuang/.codex/skills/canvas-design/canvas-fonts/Gloock-Regular.ttf");
  }
  @font-face {
    font-family: "Instrument Sans";
    src: url("file:///Users/alanxrhuang/.codex/skills/canvas-design/canvas-fonts/InstrumentSans-Regular.ttf");
  }
`;

const copy = {
  "zh-CN": {
    heroEyebrow: "走出洞穴",
    heroTitle: ["每开一页，", "换一种眼光。"],
    heroDetail: "随机遇见一则思想 · 中英双语 · 每句配图",
    settingsEyebrow: "内容与气息",
    settingsTitle: "思想集、语言与手稿样式，都由你决定。",
    settingsDetail: "五种思想集 · 三种手稿样式 · 三种语言",
    deepEyebrow: "读深一层",
    deepTitle: "不止一句话，还要说清它从哪里来。",
    deepDetail: "原文 · 今译 · 解读 · 来源核查",
    networkEyebrow: "思想关系",
    networkTitle: "顺着节点，把不同的回答放在一起读。",
    networkDetail: "来处 · 异答 · 回响",
    shareEyebrow: "留下或带走",
    shareTitle: "把读过的思想，留存，也分享给别人。",
    shareDetail: "收藏 · 保存图片 · 复制文本 · 系统分享",
  },
  global: {
    heroEyebrow: "STEP INTO THE LIGHT",
    heroTitle: ["A quiet encounter,", "with every new tab."],
    heroDetail: "1,000+ ideas · bilingual text · original artwork",
    settingsEyebrow: "YOURS TO SHAPE",
    settingsTitle: "Choose the traditions, language and atmosphere.",
    settingsDetail: "Five collections · three themes · three languages",
    deepEyebrow: "READ DEEPER",
    deepTitle: "Read the source. Follow the argument.",
    deepDetail: "Text · translation · interpretation · verification",
    networkEyebrow: "IDEAS IN RELATION",
    networkTitle: "Follow a node. Compare the answers.",
    networkDetail: "Roots · counterpoints · echoes",
    shareEyebrow: "KEEP OR CARRY",
    shareTitle: "Keep a thought—or carry it onward.",
    shareDetail: "Save · export · copy · share",
  },
};

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function serif(locale) {
  return locale === "global"
    ? "Gloock, Baskerville, Georgia, serif"
    : "Songti SC, STSong, Gloock, serif";
}

function sans(locale) {
  return locale === "global"
    ? "Instrument Sans, Helvetica Neue, Arial, sans-serif"
    : "PingFang SC, Hiragino Sans GB, Instrument Sans, sans-serif";
}

function svg(width, height, body, background = colors.paper) {
  return Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <style>${fontFace}</style>
      <rect width="${width}" height="${height}" fill="${background}"/>
      ${body}
    </svg>
  `);
}

function titleLines(lines, { x, y, locale, size, lineHeight, fill, weight = 400 }) {
  return lines.map((line, index) => `
    <text x="${x}" y="${y + index * lineHeight}" fill="${fill}" font-family="${serif(locale)}" font-size="${size}" font-weight="${weight}">${escapeXml(line)}</text>
  `).join("");
}

function brandLabel({ x, y, fill = colors.ink, locale = "global", compact = false }) {
  return `
    <text x="${x}" y="${y}" fill="${fill}" font-family="${sans(locale)}" font-size="${compact ? 12 : 15}" font-weight="650" letter-spacing="${compact ? 3.4 : 4.2}">AGORA</text>
    <circle cx="${x + (compact ? 78 : 98)}" cy="${y - (compact ? 4 : 5)}" r="${compact ? 3 : 3.5}" fill="${colors.sageLight}"/>
  `;
}

function apertureMark({ x = 0, y = 0, scale = 1, stroke = colors.paperLight, accent = colors.sageLight }) {
  return `
    <g transform="translate(${x} ${y}) scale(${scale})" fill="none" stroke="${stroke}" stroke-linecap="round">
      <path d="M50 20 A30 30 0 1 0 50 80" stroke-width="5"/>
      <path d="M50 30 A20 20 0 1 0 50 70" stroke-width="3" opacity=".72"/>
      <path d="M50 40 A10 10 0 1 0 50 60" stroke-width="2.5" opacity=".48"/>
      <path d="M52 50 L78 42" stroke-width="2" opacity=".72"/>
      <circle cx="84" cy="40" r="4.2" fill="${accent}" stroke="none"/>
    </g>
  `;
}

function iconSvg() {
  return svg(128, 128, `
    <rect x="7" y="7" width="114" height="114" rx="29" fill="${colors.ink}"/>
    ${apertureMark({ x: 16, y: 14, scale: 0.96 })}
  `, colors.paperLight);
}

function roundedMask(width, height, radius) {
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><rect width="${width}" height="${height}" rx="${radius}" fill="#fff"/></svg>`);
}

async function capture(theme, file, width, height, options = {}) {
  const source = resolve(rawRoot, theme, file);
  let pipeline = sharp(source)
    .resize(width, height, {
      fit: options.fit ?? "cover",
      position: options.position ?? "centre",
    })
    .flatten({ background: colors.paper })
    .toColourspace("srgb");

  if (options.blur) pipeline = pipeline.blur(options.blur);
  if (options.modulate) pipeline = pipeline.modulate(options.modulate);

  const buffer = await pipeline.png().toBuffer();
  if (!options.radius) return buffer;
  return sharp(buffer)
    .composite([{ input: roundedMask(width, height, options.radius), blend: "dest-in" }])
    .png()
    .toBuffer();
}

async function writeRgb(image, destination, background = colors.paper) {
  await sharp(image)
    .flatten({ background })
    .removeAlpha()
    .toColourspace("srgb")
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(destination);
}

async function renderHero(locale, destination) {
  const c = copy[locale];
  const home = await capture("trajectory", "01-home.png", 1000, 625, { radius: 14 });
  const titleSize = locale === "global" ? 47 : 45;
  const base = svg(1280, 800, `
    <path d="M760 -110 A460 460 0 0 1 1330 412" fill="none" stroke="${colors.line}" stroke-opacity=".22"/>
    <rect x="258" y="96" width="1000" height="625" rx="14" fill="#000" opacity=".10"/>
    <rect x="246" y="84" width="1000" height="625" rx="14" fill="${colors.paperLight}" stroke="${colors.line}" stroke-opacity=".42"/>
  `);
  const panel = svg(1280, 800, `
    <defs>
      <linearGradient id="fade" x1="0" x2="1">
        <stop offset="0" stop-color="${colors.ink}" stop-opacity="1"/>
        <stop offset=".76" stop-color="${colors.ink}" stop-opacity=".97"/>
        <stop offset="1" stop-color="${colors.ink}" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <path d="M0 0 H355 C431 124 456 258 447 400 C439 551 397 691 339 800 H0 Z" fill="url(#fade)"/>
    ${brandLabel({ x: 58, y: 68, fill: colors.paperLight, locale })}
    <text x="58" y="182" fill="${colors.sageLight}" font-family="${sans(locale)}" font-size="13" font-weight="650" letter-spacing="2.2">${escapeXml(c.heroEyebrow)}</text>
    ${titleLines(c.heroTitle, { x: 58, y: 264, locale, size: titleSize, lineHeight: 65, fill: colors.paperLight })}
    <line x1="58" y1="424" x2="112" y2="424" stroke="${colors.sageLight}" stroke-width="2"/>
    <text x="58" y="465" fill="${colors.paperDark}" font-family="${sans(locale)}" font-size="${locale === "global" ? 13 : 14}">${escapeXml(c.heroDetail)}</text>
    <text x="58" y="718" fill="${colors.paperDark}" opacity=".66" font-family="${sans(locale)}" font-size="11" letter-spacing="1.8">PHILOSOPHY / NEW TAB</text>
    ${apertureMark({ x: 260, y: 626, scale: 0.82, stroke: colors.paperLight })}
    <path d="M362 625 C438 600 489 556 550 501" fill="none" stroke="${colors.sageLight}" stroke-width="1.3" opacity=".62"/>
    <circle cx="553" cy="498" r="3.2" fill="${colors.sage}"/>
    <rect x="24" y="24" width="1232" height="752" fill="none" stroke="${colors.paperLight}" stroke-opacity=".16"/>
  `, "transparent");

  await writeRgb(await sharp(base).composite([
    { input: home, left: 246, top: 84 },
    { input: panel },
  ]).png().toBuffer(), destination);
}

async function renderSettings(locale, destination) {
  const c = copy[locale];
  const homes = await Promise.all([
    capture("trajectory", "01-home.png", 294, 142, { radius: 8 }),
    capture("marginalia", "01-home.png", 294, 142, { radius: 8 }),
    capture("archive", "01-home.png", 294, 142, { radius: 8 }),
  ]);
  const settings = await capture("trajectory", "02-settings.png", 750, 469, { radius: 13 });

  const backdrop = svg(1280, 800, `
    <path d="M0 0 H1280 V800 H0 Z" fill="${colors.paper}"/>
    <path d="M948 -24 A315 315 0 0 0 1240 302" fill="none" stroke="${colors.line}" stroke-opacity=".28"/>
    ${brandLabel({ x: 58, y: 61, locale, compact: true })}
    <text x="58" y="118" fill="${colors.sage}" font-family="${sans(locale)}" font-size="12" font-weight="650" letter-spacing="2">${escapeXml(c.settingsEyebrow)}</text>
    <text x="58" y="170" fill="${colors.ink}" font-family="${serif(locale)}" font-size="${locale === "global" ? 35 : 36}">${escapeXml(c.settingsTitle)}</text>
    <text x="58" y="210" fill="${colors.inkSoft}" font-family="${sans(locale)}" font-size="13">${escapeXml(c.settingsDetail)}</text>
    <rect x="46" y="246" width="342" height="518" rx="13" fill="${colors.paperLight}" stroke="${colors.line}" stroke-opacity=".42"/>
    <text x="70" y="278" fill="${colors.inkSoft}" font-family="${sans(locale)}" font-size="10" letter-spacing="1.5">01 / 思想轨迹</text>
    <text x="70" y="442" fill="${colors.inkSoft}" font-family="${sans(locale)}" font-size="10" letter-spacing="1.5">02 / 意识手稿</text>
    <text x="70" y="606" fill="${colors.inkSoft}" font-family="${sans(locale)}" font-size="10" letter-spacing="1.5">03 / 命题档案</text>
    <rect x="423" y="236" width="786" height="501" rx="18" fill="#000" opacity=".08"/>
    <rect x="407" y="220" width="786" height="501" rx="18" fill="${colors.paperLight}" stroke="${colors.line}" stroke-opacity=".55"/>
    <circle cx="1144" cy="248" r="4" fill="${colors.sage}"/>
    <circle cx="1127" cy="248" r="4" fill="${colors.line}" opacity=".45"/>
    <circle cx="1110" cy="248" r="4" fill="${colors.line}" opacity=".45"/>
  `);

  await writeRgb(
    await sharp(backdrop).composite([
      { input: homes[0], left: 70, top: 288 },
      { input: homes[1], left: 70, top: 452 },
      { input: homes[2], left: 70, top: 616 },
      { input: settings, left: 425, top: 260 },
    ]).png().toBuffer(),
    destination,
  );
}

async function renderFeature(locale, { eyebrow, title, detail, theme, file, index }, destination) {
  const c = copy[locale];
  const shot = await capture(theme, file, 1120, 700, { radius: 14 });
  const backdrop = svg(1280, 800, `
    <rect x="0" y="0" width="1280" height="100" fill="${colors.paperLight}"/>
    ${brandLabel({ x: 80, y: 41, locale, compact: true })}
    <text x="187" y="40" fill="${colors.sage}" font-family="${sans(locale)}" font-size="11" font-weight="650" letter-spacing="1.7">${escapeXml(c[eyebrow])}</text>
    <text x="80" y="82" fill="${colors.ink}" font-family="${serif(locale)}" font-size="${locale === "global" ? 31 : 33}">${escapeXml(c[title])}</text>
    <text x="1200" y="38" text-anchor="end" fill="${colors.inkSoft}" font-family="${sans(locale)}" font-size="11" letter-spacing="1.1">${escapeXml(c[detail])}</text>
    <text x="1200" y="77" text-anchor="end" fill="${colors.sage}" font-family="${sans(locale)}" font-size="11" letter-spacing="1.8">0${index} / 05</text>
    <rect x="88" y="108" width="1120" height="692" rx="14" fill="#000" opacity=".10"/>
    <rect x="80" y="100" width="1120" height="700" rx="14" fill="${colors.paperLight}" stroke="${colors.line}" stroke-opacity=".38"/>
  `);

  await writeRgb(
    await sharp(backdrop).composite([{ input: shot, left: 80, top: 100 }]).png().toBuffer(),
    destination,
  );
}

async function renderIconExports() {
  await mkdir(brandRoot, { recursive: true });
  for (const size of [16, 32, 48, 128, 256, 512, 1024]) {
    await sharp(iconSvg())
      .resize(size, size, { kernel: sharp.kernel.lanczos3 })
      .flatten({ background: colors.paperLight })
      .removeAlpha()
      .toColourspace("srgb")
      .png({ compressionLevel: 9 })
      .toFile(resolve(brandRoot, `icon-${size}.png`));
  }
}

async function renderSmallPromo(destination) {
  const background = svg(440, 280, `
    <path d="M0 0 H134 C188 53 197 112 190 142 C183 187 159 232 127 280 H0 Z" fill="${colors.ink}"/>
    ${apertureMark({ x: 21, y: 84, scale: 1.1 })}
    <text x="220" y="57" fill="${colors.sage}" font-family="${sans("global")}" font-size="10" font-weight="650" letter-spacing="2.4">PHILOSOPHY / NEW TAB</text>
    <text x="220" y="124" fill="${colors.ink}" font-family="${serif("global")}" font-size="45" letter-spacing="2">AGORA</text>
    <line x1="220" y1="148" x2="267" y2="148" stroke="${colors.sage}" stroke-width="2"/>
    <text x="220" y="184" fill="${colors.ink}" font-family="${serif("global")}" font-size="17">A new tab for</text>
    <text x="220" y="210" fill="${colors.ink}" font-family="${serif("global")}" font-size="17">unhurried thought.</text>
    <text x="220" y="247" fill="${colors.inkSoft}" font-family="${sans("global")}" font-size="9.5" letter-spacing="1.25">READ · CONNECT · KEEP</text>
  `);
  await writeRgb(background, destination);
}

async function renderMarquee(destination) {
  const home = await capture("trajectory", "01-home.png", 700, 438, { radius: 18 });
  const deep = await capture("trajectory", "03-deep-reading.png", 520, 325, { radius: 14 });
  const background = svg(1400, 560, `
    <path d="M0 0 H434 C552 88 572 187 558 280 C543 389 502 481 427 560 H0 Z" fill="${colors.ink}"/>
    ${brandLabel({ x: 74, y: 78, fill: colors.paperLight, locale: "global" })}
    <text x="74" y="198" fill="${colors.sageLight}" font-family="${sans("global")}" font-size="12" font-weight="650" letter-spacing="2.5">STEP INTO THE LIGHT</text>
    <text x="74" y="274" fill="${colors.paperLight}" font-family="${serif("global")}" font-size="43">A quiet encounter,</text>
    <text x="74" y="329" fill="${colors.paperLight}" font-family="${serif("global")}" font-size="43">with every new tab.</text>
    <line x1="74" y1="367" x2="135" y2="367" stroke="${colors.sageLight}" stroke-width="2.5"/>
    <text x="74" y="410" fill="${colors.paperDark}" font-family="${sans("global")}" font-size="11" letter-spacing="1.2">1,000+ SOURCED IDEAS · ORIGINAL ARTWORK</text>
    ${apertureMark({ x: 325, y: 414, scale: 0.9 })}
    <path d="M445 454 C574 392 633 329 708 256" fill="none" stroke="${colors.sageLight}" stroke-width="1.4" opacity=".72"/>
    <circle cx="710" cy="254" r="4" fill="${colors.sage}"/>
    <rect x="604" y="54" width="720" height="458" rx="22" fill="#000" opacity=".10"/>
    <rect x="592" y="42" width="720" height="458" rx="22" fill="${colors.paperLight}" stroke="${colors.line}" stroke-opacity=".58"/>
    <rect x="823" y="191" width="544" height="349" rx="18" fill="#000" opacity=".16"/>
    <rect x="813" y="181" width="544" height="349" rx="18" fill="${colors.paperLight}" stroke="${colors.line}" stroke-opacity=".66"/>
  `);

  await writeRgb(
    await sharp(background).composite([
      { input: home, left: 602, top: 52 },
      { input: deep, left: 825, top: 193 },
    ]).png().toBuffer(),
    destination,
  );
}

async function renderContactSheet(locale, destination) {
  const files = [
    "screenshot-01-new-tab-1280x800.png",
    "screenshot-02-collections-themes-1280x800.png",
    "screenshot-03-deep-reading-1280x800.png",
    "screenshot-04-thought-network-1280x800.png",
    "screenshot-05-keep-share-1280x800.png",
  ];
  const positions = [
    [54, 138], [820, 138], [54, 620], [820, 620], [437, 1102],
  ];
  const cards = [];
  for (let index = 0; index < files.length; index += 1) {
    const card = await sharp(resolve(uploadRoot, locale, files[index]))
      .resize(720, 450)
      .png()
      .toBuffer();
    cards.push({ input: card, left: positions[index][0], top: positions[index][1] });
  }
  const backdrop = svg(1540, 1612, `
    <text x="54" y="64" fill="${colors.ink}" font-family="${serif("global")}" font-size="35">AGORA · Chrome Web Store v4</text>
    <text x="1486" y="64" text-anchor="end" fill="${colors.inkSoft}" font-family="${sans("global")}" font-size="13" letter-spacing="2">${locale}</text>
    <line x1="54" y1="94" x2="1486" y2="94" stroke="${colors.line}" stroke-opacity=".48"/>
  `, colors.paperDark);
  await writeRgb(await sharp(backdrop).composite(cards).png().toBuffer(), destination, colors.paperDark);
}

async function renderPromoBoard(destination) {
  const icon = await sharp(resolve(brandRoot, "icon-128.png")).resize(220, 220).png().toBuffer();
  const small = await sharp(resolve(uploadRoot, "global", "small-promo-440x280.png")).resize(660, 420).png().toBuffer();
  const marquee = await sharp(resolve(uploadRoot, "global", "marquee-1400x560.png")).resize(1260, 504).png().toBuffer();
  const backdrop = svg(1600, 1170, `
    <text x="60" y="70" fill="${colors.ink}" font-family="${serif("global")}" font-size="35">AGORA · Dialectical Light</text>
    <text x="1540" y="70" text-anchor="end" fill="${colors.inkSoft}" font-family="${sans("global")}" font-size="12" letter-spacing="2">ICON / SMALL PROMO / MARQUEE</text>
    <line x1="60" y1="100" x2="1540" y2="100" stroke="${colors.line}" stroke-opacity=".5"/>
    <rect x="60" y="150" width="270" height="270" rx="22" fill="${colors.paperLight}"/>
    <text x="60" y="459" fill="${colors.inkSoft}" font-family="${sans("global")}" font-size="11" letter-spacing="1.6">STORE ICON / 128 × 128</text>
    <text x="410" y="145" fill="${colors.inkSoft}" font-family="${sans("global")}" font-size="11" letter-spacing="1.6">SMALL PROMO / 440 × 280</text>
    <text x="60" y="574" fill="${colors.inkSoft}" font-family="${sans("global")}" font-size="11" letter-spacing="1.6">MARQUEE / 1400 × 560</text>
  `, colors.paperDark);
  await writeRgb(await sharp(backdrop).composite([
    { input: icon, left: 85, top: 175 },
    { input: small, left: 410, top: 170 },
    { input: marquee, left: 170, top: 610 },
  ]).png().toBuffer(), destination, colors.paperDark);
}

function readme() {
  return `# AGORA · Chrome Web Store 图片资源 v4\n\n这套素材以“辩证之光 / 走出洞穴”为视觉母题，使用真实的 AGORA 产品界面重新编排，旧版 v3 没有被覆盖。\n\n## 直接上传\n\n- 商店图标：\`upload/global/store-icon-128.png\`（128 × 128）\n- 简体中文截图：\`upload/zh-CN\`（5 张，1280 × 800）\n- 全球通用截图：\`upload/global/screenshot-*\`（5 张，1280 × 800）\n- 小型宣传图块：\`upload/global/small-promo-440x280.png\`\n- 顶部宣传图块：\`upload/global/marquee-1400x560.png\`\n\n截图与宣传图均为 24 位 RGB PNG、无 alpha 透明通道；图标同样已压平为 RGB PNG。宣传视频不是必填项，没有成片时可以留空。\n\n## 推荐顺序\n\n1. 每开一页，换一种眼光。\n2. 思想集、语言与手稿样式，都由你决定。\n3. 不止一句话，还要说清它从哪里来。\n4. 顺着节点，把不同的回答放在一起读。\n5. 把读过的思想，留存，也分享给别人。\n\n## 预览\n\n- \`preview/contact-sheet-zh-CN.png\`\n- \`preview/contact-sheet-global.png\`\n- \`preview/promo-board.png\`\n`;
}

function copyZh() {
  return `# AGORA 商店图片文案（简体中文）\n\n## 一句话简介\n\n让每一个 Chrome 新标签页，成为一次安静而有出处的思想相遇。\n\n## 五张截图\n\n1. 每开一页，换一种眼光。\n2. 思想集、语言与手稿样式，都由你决定。\n3. 不止一句话，还要说清它从哪里来。\n4. 顺着节点，把不同的回答放在一起读。\n5. 把读过的思想，留存，也分享给别人。\n`;
}

function copyGlobal() {
  return `# AGORA store image copy (Global)\n\n## One-line description\n\nTurn every Chrome new tab into a quiet encounter with a sourced idea.\n\n## Five screenshots\n\n1. A quiet encounter, with every new tab.\n2. Choose the traditions, language and atmosphere.\n3. Read the source. Follow the argument.\n4. Follow a node. Compare the answers.\n5. Keep a thought—or carry it onward.\n`;
}

await Promise.all([
  rm(uploadRoot, { recursive: true, force: true }),
  rm(resolve(assetsRoot, "brand"), { recursive: true, force: true }),
  rm(previewRoot, { recursive: true, force: true }),
]);
await Promise.all([
  mkdir(resolve(uploadRoot, "zh-CN"), { recursive: true }),
  mkdir(resolve(uploadRoot, "global"), { recursive: true }),
  mkdir(previewRoot, { recursive: true }),
]);

for (const locale of locales) {
  await renderHero(locale, resolve(uploadRoot, locale, "screenshot-01-new-tab-1280x800.png"));
  await renderSettings(locale, resolve(uploadRoot, locale, "screenshot-02-collections-themes-1280x800.png"));
  await renderFeature(locale, {
    eyebrow: "deepEyebrow", title: "deepTitle", detail: "deepDetail",
    theme: "trajectory", file: "03-deep-reading.png", index: 3,
  }, resolve(uploadRoot, locale, "screenshot-03-deep-reading-1280x800.png"));
  await renderFeature(locale, {
    eyebrow: "networkEyebrow", title: "networkTitle", detail: "networkDetail",
    theme: "archive", file: "06-thought-network.png", index: 4,
  }, resolve(uploadRoot, locale, "screenshot-04-thought-network-1280x800.png"));
  await renderFeature(locale, {
    eyebrow: "shareEyebrow", title: "shareTitle", detail: "shareDetail",
    theme: "marginalia", file: "07-share.png", index: 5,
  }, resolve(uploadRoot, locale, "screenshot-05-keep-share-1280x800.png"));
}

await renderIconExports();
await copyFile(resolve(brandRoot, "icon-128.png"), resolve(uploadRoot, "global", "store-icon-128.png"));
await renderSmallPromo(resolve(uploadRoot, "global", "small-promo-440x280.png"));
await renderMarquee(resolve(uploadRoot, "global", "marquee-1400x560.png"));
await renderContactSheet("zh-CN", resolve(previewRoot, "contact-sheet-zh-CN.png"));
await renderContactSheet("global", resolve(previewRoot, "contact-sheet-global.png"));
await renderPromoBoard(resolve(previewRoot, "promo-board.png"));
await writeFile(resolve(assetsRoot, "README.md"), readme());
await writeFile(resolve(assetsRoot, "COPY-ZH-CN.md"), copyZh());
await writeFile(resolve(assetsRoot, "COPY-GLOBAL.md"), copyGlobal());

console.log(`AGORA v4 assets generated in ${assetsRoot}`);
