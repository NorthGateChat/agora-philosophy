import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const here = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(here, "..");
const versionRoot = path.join(
  projectRoot,
  "store-assets/v6-agora-dialogue",
);
const sourceRoot = path.join(versionRoot, "source");
const previewRoot = path.join(versionRoot, "preview");
const illustrationPath = path.join(
  projectRoot,
  "public/illustrations/plato-cave-adjustment-v1.webp",
);

const palette = {
  ink: "#171715",
  ivory: "#f3efe6",
  paper: "#e8e1d5",
  muted: "#979086",
  orange: "#d97757",
};

const sansFont =
  "/Users/alanxrhuang/.codex/skills/canvas-design/canvas-fonts/InstrumentSans-Regular.ttf";
const serifFont =
  "/Users/alanxrhuang/.codex/skills/canvas-design/canvas-fonts/Gloock-Regular.ttf";

const escapeXml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

// The open O is a thought that remains open. A single warm point rests just
// beyond its upper-right opening: one new idea entering the Agora.
const openOSymbol = `
  <symbol id="open-o" viewBox="0 0 256 256">
    <circle cx="128" cy="128" r="91" fill="none" stroke="currentColor"
      stroke-width="24" stroke-linecap="butt" stroke-dasharray="522 50"
      transform="rotate(-30 128 128)"/>
    <circle cx="192" cy="64" r="12" fill="${palette.orange}" stroke="none"/>
  </symbol>`;

const wordmarkSymbol = `
  <symbol id="agora-wordmark" viewBox="0 0 620 144">
    <g fill="none" stroke="currentColor" stroke-width="14" stroke-linecap="butt"
      stroke-linejoin="miter" shape-rendering="geometricPrecision">
      <path d="M18 124 64 20l46 104M36 84h56"/>
      <path d="M232 43c-12-16-28-24-48-24-33 0-57 22-57 53s24 53 57 53c20 0 37-8 49-23V76h-42"/>
      <path d="M382 124V20h40c28 0 46 13 46 34 0 22-18 36-46 36h-40M426 90l48 34"/>
      <path d="M501 124 547 20l46 104M519 84h56"/>
    </g>
    <use href="#open-o" x="227.5" y="-2.5" width="149" height="149"/>
  </symbol>`;

const fontStyles = `
  @font-face {
    font-family: "AGORA Sans";
    src: url("${escapeXml(sansFont)}");
  }
  @font-face {
    font-family: "AGORA Serif";
    src: url("${escapeXml(serifFont)}");
  }
  .sans { font-family: "AGORA Sans", "Helvetica Neue", Arial, sans-serif; }
  .serif { font-family: "AGORA Serif", "Songti SC", "STSong", serif; }
  .cjk { font-family: "Songti SC", "STSong", "Noto Serif CJK SC", serif; }
`;

function svgDocument(width, height, defs, content) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"
  viewBox="0 0 ${width} ${height}">
  <title>AGORA</title>
  <desc>A Chrome new-tab space for ideas in context.</desc>
  <defs>
    <style>${fontStyles}</style>
    ${openOSymbol}
    ${wordmarkSymbol}
    ${defs}
  </defs>
  ${content}
</svg>`;
}

function makeStandaloneMarkSvg() {
  return svgDocument(
    256,
    256,
    "",
    `<rect width="256" height="256" fill="none"/>
  <use href="#open-o" width="256" height="256" color="${palette.ink}"/>`,
  );
}

function makeStandaloneWordmarkSvg() {
  return svgDocument(
    620,
    144,
    "",
    `<use href="#agora-wordmark" width="620" height="144" color="${palette.ink}"/>`,
  );
}

function makeIconSvg() {
  return svgDocument(
    128,
    128,
    "",
    `
  <!-- Chrome icon artwork occupies a 96 px safe area with 16 px outer padding. -->
  <rect x="16" y="16" width="96" height="96" rx="21" fill="${palette.ink}"/>
  <rect x="16.5" y="16.5" width="95" height="95" rx="20.5" fill="none"
    stroke="${palette.ivory}" stroke-opacity="0.14"/>
  <use href="#open-o" x="22" y="22" width="84" height="84"
    color="${palette.ivory}"/>
`,
  );
}

function makeSmallPromoSvg(illustrationDataUrl) {
  return svgDocument(
    440,
    280,
    `
    <clipPath id="small-image">
      <rect x="248" y="0" width="192" height="280"/>
    </clipPath>
    <linearGradient id="small-wash" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${palette.ink}" stop-opacity="1"/>
      <stop offset="0.28" stop-color="${palette.ink}" stop-opacity="0.92"/>
      <stop offset="0.78" stop-color="${palette.ink}" stop-opacity="0.2"/>
      <stop offset="1" stop-color="${palette.ink}" stop-opacity="0.06"/>
    </linearGradient>
  `,
    `
  <rect width="440" height="280" fill="${palette.ink}"/>
  <g clip-path="url(#small-image)">
    <image href="${illustrationDataUrl}" x="214" y="0" width="290" height="280"
      preserveAspectRatio="xMidYMid slice" opacity="0.8"/>
    <rect x="214" y="0" width="290" height="280" fill="${palette.ivory}" opacity="0.2"/>
  </g>
  <rect x="187" y="0" width="253" height="280" fill="url(#small-wash)"/>

  <use href="#agora-wordmark" x="28" y="26" width="224" height="52"
    color="${palette.ivory}"/>
  <text x="30" y="102" class="sans" fill="${palette.orange}"
    font-size="9" letter-spacing="2.15">PHILOSOPHY, IN CONTEXT</text>

  <text x="28" y="151" class="cjk" fill="${palette.ivory}" font-size="25">打开一页，</text>
  <text x="28" y="187" class="cjk" fill="${palette.ivory}" font-size="25">换一种看法。</text>

  <line x1="29" y1="219" x2="220" y2="219" stroke="${palette.ivory}" stroke-opacity="0.18"/>
  <circle cx="31" cy="242" r="3.2" fill="${palette.orange}"/>
  <text x="43" y="246" class="sans" fill="${palette.ivory}" fill-opacity="0.6"
    font-size="8.5" letter-spacing="1.1">原文 · 解读 · 观点对读</text>
`,
  );
}

function makeMarqueeSvg(illustrationDataUrl) {
  return svgDocument(
    1400,
    560,
    `
    <clipPath id="window-clip">
      <rect x="610" y="42" width="730" height="476" rx="24"/>
    </clipPath>
    <clipPath id="art-clip">
      <rect x="632" y="106" width="686" height="390" rx="12"/>
    </clipPath>
    <linearGradient id="art-wash" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${palette.ivory}" stop-opacity="0.02"/>
      <stop offset="0.54" stop-color="${palette.ivory}" stop-opacity="0.24"/>
      <stop offset="0.76" stop-color="${palette.ivory}" stop-opacity="0.88"/>
      <stop offset="1" stop-color="${palette.ivory}" stop-opacity="0.98"/>
    </linearGradient>
    <filter id="window-shadow" x="-30%" y="-30%" width="160%" height="180%">
      <feDropShadow dx="0" dy="18" stdDeviation="24" flood-color="#000000" flood-opacity="0.34"/>
    </filter>
  `,
    `
  <rect width="1400" height="560" fill="${palette.ink}"/>

  <use href="#agora-wordmark" x="68" y="68" width="430" height="100"
    color="${palette.ivory}"/>
  <text x="73" y="222" class="sans" fill="${palette.orange}"
    font-size="13.5" letter-spacing="3.25">PHILOSOPHY, IN CONTEXT</text>
  <text x="70" y="300" class="cjk" fill="${palette.ivory}"
    font-size="37">打开一页，换一种看法。</text>
  <text x="73" y="348" class="cjk" fill="${palette.ivory}" fill-opacity="0.52"
    font-size="17">遇见一则思想，也看见它的来处与回响。</text>

  <line x1="72" y1="424" x2="507" y2="424" stroke="${palette.ivory}" stroke-opacity="0.14"/>
  <circle cx="73" cy="424" r="4.5" fill="${palette.orange}"/>
  <circle cx="218" cy="424" r="3.5" fill="${palette.ivory}" fill-opacity="0.35"/>
  <circle cx="363" cy="424" r="3.5" fill="${palette.ivory}" fill-opacity="0.35"/>
  <circle cx="507" cy="424" r="3.5" fill="${palette.ivory}" fill-opacity="0.35"/>
  <text x="72" y="463" class="sans" fill="${palette.ivory}" fill-opacity="0.36"
    font-size="10" letter-spacing="2.1">READ · TRACE · COMPARE · KEEP</text>

  <g filter="url(#window-shadow)">
    <rect x="610" y="42" width="730" height="476" rx="24" fill="${palette.ivory}"/>
  </g>
  <g clip-path="url(#window-clip)">
    <rect x="610" y="42" width="730" height="476" fill="${palette.ivory}"/>
    <rect x="610" y="42" width="730" height="52" fill="${palette.paper}"/>
    <line x1="610" y1="94" x2="1340" y2="94" stroke="${palette.ink}" stroke-opacity="0.12"/>
    <use href="#agora-wordmark" x="642" y="57" width="128" height="30"
      color="${palette.ink}"/>
    <circle cx="1288" cy="68" r="3.6" fill="${palette.orange}"/>
    <circle cx="1309" cy="68" r="3.6" fill="${palette.ink}" fill-opacity="0.18"/>

    <g clip-path="url(#art-clip)">
      <image href="${illustrationDataUrl}" x="632" y="106" width="686" height="390"
        preserveAspectRatio="xMidYMid slice" opacity="0.72"/>
      <rect x="632" y="106" width="686" height="390" fill="url(#art-wash)"/>
    </g>
    <rect x="631.5" y="105.5" width="687" height="391" rx="12" fill="none"
      stroke="${palette.ink}" stroke-opacity="0.12"/>

    <rect x="965" y="143" width="324" height="312" rx="6"
      fill="${palette.ivory}" fill-opacity="0.93"/>
    <rect x="965.5" y="143.5" width="323" height="311" rx="5.5" fill="none"
      stroke="${palette.ink}" stroke-opacity="0.12"/>

    <text x="992" y="179" class="sans" fill="${palette.ink}" fill-opacity="0.44"
      font-size="9.5" letter-spacing="1.5">原文短句</text>
    <circle cx="1262" cy="175" r="3.8" fill="${palette.orange}"/>
    <text x="992" y="229" class="cjk" fill="${palette.ink}" font-size="27">从洞穴走向光明的人，</text>
    <text x="992" y="269" class="cjk" fill="${palette.ink}" font-size="27">起初反而会看不清。</text>
    <text x="994" y="314" class="serif" fill="${palette.ink}" fill-opacity="0.64"
      font-size="14">The person leaving the cave for light</text>
    <text x="994" y="336" class="serif" fill="${palette.ink}" fill-opacity="0.64"
      font-size="14">will at first see less clearly, not more.</text>
    <line x1="993" y1="370" x2="1262" y2="370" stroke="${palette.ink}" stroke-opacity="0.14"/>
    <text x="994" y="398" class="sans" fill="${palette.ink}" fill-opacity="0.52"
      font-size="9.5" letter-spacing="1.05">柏拉图 ·《理想国》第七卷</text>
    <text x="994" y="431" class="sans" fill="${palette.ink}" fill-opacity="0.35"
      font-size="8.5" letter-spacing="1.25">原文   解读   异答   回响</text>
  </g>
`,
  );
}

async function renderPng(svg, outputPath, width, height, { alpha }) {
  let image = sharp(Buffer.from(svg), { density: 288 }).resize(width, height);
  if (!alpha) {
    image = image.flatten({ background: palette.ink }).removeAlpha();
  }
  await image
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(outputPath);
}

async function createPreview(iconPath, smallPath, marqueePath) {
  const canvasWidth = 1600;
  const canvasHeight = 1120;
  const labelSvg = Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1120">
      <style>
        @font-face { font-family: "AGORA Sans"; src: url("${escapeXml(sansFont)}"); }
        .label { font-family: "AGORA Sans", sans-serif; fill: ${palette.ink}; letter-spacing: 2.3px; }
      </style>
      <text x="80" y="68" class="label" font-size="15">AGORA · CHROME WEB STORE ASSETS</text>
      <text x="80" y="1074" class="label" font-size="11" fill-opacity="0.46">OPEN O / WARM ORANGE / BRAND SYSTEM V6</text>
    </svg>
  `);

  const iconTile = await sharp({
    create: { width: 280, height: 280, channels: 3, background: palette.paper },
  })
    .composite([
      {
        input: await sharp(iconPath).resize(192, 192).png().toBuffer(),
        left: 44,
        top: 44,
      },
    ])
    .png()
    .toBuffer();

  await sharp({
    create: {
      width: canvasWidth,
      height: canvasHeight,
      channels: 3,
      background: palette.ivory,
    },
  })
    .composite([
      { input: labelSvg, left: 0, top: 0 },
      { input: iconTile, left: 80, top: 120 },
      {
        input: await sharp(smallPath).resize(660, 420).png().toBuffer(),
        left: 420,
        top: 120,
      },
      {
        input: await sharp(marqueePath).resize(1400, 560).png().toBuffer(),
        left: 100,
        top: 510,
      },
    ])
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(path.join(previewRoot, "store-assets-preview.png"));
}

async function main() {
  await Promise.all([
    mkdir(versionRoot, { recursive: true }),
    mkdir(sourceRoot, { recursive: true }),
    mkdir(previewRoot, { recursive: true }),
  ]);

  const illustrationPng = await sharp(await readFile(illustrationPath))
    .png()
    .toBuffer();
  const illustrationDataUrl = `data:image/png;base64,${illustrationPng.toString("base64")}`;

  const markSvg = makeStandaloneMarkSvg();
  const wordmarkSvg = makeStandaloneWordmarkSvg();
  const iconSvg = makeIconSvg();
  const smallSvg = makeSmallPromoSvg(illustrationDataUrl);
  const marqueeSvg = makeMarqueeSvg(illustrationDataUrl);

  await rm(path.join(sourceRoot, "agora-dialogue-o.svg"), { force: true });

  await Promise.all([
    writeFile(path.join(sourceRoot, "agora-open-o.svg"), markSvg),
    writeFile(path.join(sourceRoot, "agora-wordmark.svg"), wordmarkSvg),
    writeFile(path.join(sourceRoot, "store-icon-128.svg"), iconSvg),
    writeFile(path.join(sourceRoot, "small-promo-440x280.svg"), smallSvg),
    writeFile(path.join(sourceRoot, "marquee-1400x560.svg"), marqueeSvg),
  ]);

  const iconPath = path.join(versionRoot, "store-icon-128.png");
  const smallPath = path.join(versionRoot, "small-promo-440x280.png");
  const marqueePath = path.join(versionRoot, "marquee-1400x560.png");

  await Promise.all([
    renderPng(iconSvg, iconPath, 128, 128, { alpha: true }),
    renderPng(smallSvg, smallPath, 440, 280, { alpha: false }),
    renderPng(marqueeSvg, marqueePath, 1400, 560, { alpha: false }),
  ]);

  await createPreview(iconPath, smallPath, marqueePath);

  console.log(`Generated ${path.relative(projectRoot, versionRoot)}`);
}

await main();
