import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const here = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(here, "..");
const storeRoot = path.join(projectRoot, "store-assets");
const versionRoot = path.join(storeRoot, "v5-brand-refresh");
const previewRoot = path.join(versionRoot, "preview");
const illustrationPath = path.join(
  projectRoot,
  "public/illustrations/plato-cave-adjustment-v1.webp",
);

const palette = {
  ink: "#171715",
  ivory: "#f2eee5",
  paper: "#e7e0d4",
  muted: "#8f8a80",
  terracotta: "#c7683f",
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

const openOSymbol = `
  <symbol id="open-o" viewBox="0 0 256 256">
    <circle cx="128" cy="128" r="91" fill="none" stroke="currentColor"
      stroke-width="24" stroke-linecap="butt" stroke-dasharray="522 50"
      transform="rotate(-30 128 128)"/>
    <circle cx="192" cy="64" r="12" fill="${palette.terracotta}" stroke="none"/>
  </symbol>`;

const wordmarkSymbol = `
  <symbol id="agora-wordmark" viewBox="0 0 720 144">
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
  <defs>
    <style>${fontStyles}</style>
    ${openOSymbol}
    ${wordmarkSymbol}
    ${defs}
  </defs>
  ${content}
</svg>`;
}

function makeIconSvg() {
  return svgDocument(
    128,
    128,
    "",
    `
  <!-- Chrome Web Store safe area: 96 × 96 artwork with 16 px transparent padding. -->
  <rect x="16" y="16" width="96" height="96" rx="20" fill="${palette.ink}"/>
  <rect x="16.5" y="16.5" width="95" height="95" rx="19.5" fill="none"
    stroke="${palette.ivory}" stroke-opacity="0.14"/>
  <use href="#open-o" x="20.8" y="20.8" width="86.4" height="86.4"
    color="${palette.ivory}"/>
`,
  );
}

function makeSmallPromoSvg() {
  return svgDocument(
    440,
    280,
    `
    <linearGradient id="small-glow" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${palette.terracotta}" stop-opacity="0.13"/>
      <stop offset="0.48" stop-color="${palette.ink}" stop-opacity="0"/>
    </linearGradient>
    <filter id="small-shadow" x="-30%" y="-30%" width="160%" height="170%">
      <feDropShadow dx="0" dy="9" stdDeviation="12" flood-color="#000000" flood-opacity="0.28"/>
    </filter>
  `,
    `
  <rect width="440" height="280" fill="${palette.ink}"/>
  <rect width="440" height="280" fill="url(#small-glow)"/>

  <use href="#agora-wordmark" x="28" y="26" width="236" height="47.2"
    color="${palette.ivory}"/>
  <text x="30" y="103" class="sans" fill="${palette.terracotta}"
    font-size="9.5" letter-spacing="2.15">A NEW TAB FOR IDEAS</text>

  <path d="M289 186 C323 148 350 123 399 105" fill="none"
    stroke="${palette.ivory}" stroke-opacity="0.14" stroke-width="1"/>
  <circle cx="289" cy="186" r="3" fill="${palette.terracotta}"/>
  <circle cx="399" cy="105" r="2.5" fill="${palette.ivory}" fill-opacity="0.36"/>

  <use href="#open-o" x="294" y="105" width="134" height="134"
    color="${palette.ivory}" opacity="0.78"/>

  <g filter="url(#small-shadow)">
    <rect x="28" y="132" width="277" height="110" rx="5" fill="${palette.ivory}"/>
    <rect x="28.5" y="132.5" width="276" height="109" rx="4.5" fill="none"
      stroke="${palette.ink}" stroke-opacity="0.13"/>
  </g>
  <circle cx="49" cy="157" r="3.2" fill="${palette.terracotta}"/>
  <text x="61" y="160" class="sans" fill="${palette.ink}" fill-opacity="0.55"
    font-size="7.5" letter-spacing="1.3">A THOUGHT, IN CONTEXT</text>
  <rect x="47" y="180" width="203" height="5" rx="2.5" fill="${palette.ink}" fill-opacity="0.88"/>
  <rect x="47" y="193" width="232" height="5" rx="2.5" fill="${palette.ink}" fill-opacity="0.88"/>
  <rect x="47" y="206" width="171" height="5" rx="2.5" fill="${palette.ink}" fill-opacity="0.88"/>
  <rect x="47" y="226" width="62" height="2" rx="1" fill="${palette.ink}" fill-opacity="0.3"/>
  <circle cx="282" cy="226" r="2.5" fill="${palette.terracotta}"/>
`,
  );
}

function makeMarqueeSvg(illustrationDataUrl) {
  return svgDocument(
    1400,
    560,
    `
    <linearGradient id="marquee-glow" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${palette.terracotta}" stop-opacity="0.15"/>
      <stop offset="0.34" stop-color="${palette.ink}" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="image-wash" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${palette.ivory}" stop-opacity="0.06"/>
      <stop offset="0.52" stop-color="${palette.ivory}" stop-opacity="0.22"/>
      <stop offset="0.76" stop-color="${palette.ivory}" stop-opacity="0.82"/>
      <stop offset="1" stop-color="${palette.ivory}" stop-opacity="0.96"/>
    </linearGradient>
    <clipPath id="product-window">
      <rect x="650" y="42" width="700" height="476" rx="24"/>
    </clipPath>
    <clipPath id="image-panel">
      <rect x="670" y="112" width="660" height="386" rx="12"/>
    </clipPath>
    <filter id="window-shadow" x="-30%" y="-30%" width="160%" height="180%">
      <feDropShadow dx="0" dy="18" stdDeviation="24" flood-color="#000000" flood-opacity="0.34"/>
    </filter>
  `,
    `
  <rect width="1400" height="560" fill="${palette.ink}"/>
  <rect width="1400" height="560" fill="url(#marquee-glow)"/>

  <use href="#agora-wordmark" x="70" y="70" width="472" height="94.4"
    color="${palette.ivory}"/>
  <text x="76" y="227" class="sans" fill="${palette.terracotta}"
    font-size="14" letter-spacing="3.4">A NEW TAB FOR IDEAS</text>
  <text x="73" y="304" class="cjk" fill="${palette.ivory}"
    font-size="37">打开一页，换一种看法。</text>
  <text x="76" y="347" class="sans" fill="${palette.ivory}" fill-opacity="0.48"
    font-size="13.5" letter-spacing="1.7">OPEN A PAGE. MEET ANOTHER VIEW.</text>

  <path d="M78 440 C171 392 263 406 337 449 C389 479 443 472 520 427" fill="none"
    stroke="${palette.ivory}" stroke-opacity="0.13" stroke-width="1.25"/>
  <circle cx="78" cy="440" r="4" fill="${palette.ivory}" fill-opacity="0.36"/>
  <circle cx="249" cy="420" r="5" fill="${palette.terracotta}"/>
  <circle cx="337" cy="449" r="3.5" fill="${palette.ivory}" fill-opacity="0.32"/>
  <circle cx="520" cy="427" r="4" fill="${palette.ivory}" fill-opacity="0.36"/>
  <text x="76" y="487" class="sans" fill="${palette.ivory}" fill-opacity="0.34"
    font-size="10" letter-spacing="2.5">READ · TRACE · CONNECT</text>

  <g filter="url(#window-shadow)">
    <rect x="650" y="42" width="700" height="476" rx="24" fill="${palette.ivory}"/>
  </g>
  <g clip-path="url(#product-window)">
    <rect x="650" y="42" width="700" height="476" fill="${palette.ivory}"/>
    <rect x="650" y="42" width="700" height="52" fill="${palette.paper}"/>
    <line x1="650" y1="94" x2="1350" y2="94" stroke="${palette.ink}" stroke-opacity="0.12"/>
    <use href="#agora-wordmark" x="682" y="57" width="132" height="26.4" color="${palette.ink}"/>
    <circle cx="1297" cy="68" r="4" fill="${palette.terracotta}"/>
    <circle cx="1318" cy="68" r="4" fill="${palette.ink}" fill-opacity="0.22"/>

    <g clip-path="url(#image-panel)">
      <image href="${illustrationDataUrl}" x="670" y="112" width="660" height="386"
        preserveAspectRatio="xMidYMid slice" opacity="0.72"/>
      <rect x="670" y="112" width="660" height="386" fill="url(#image-wash)"/>
    </g>
    <rect x="669.5" y="111.5" width="661" height="387" rx="12" fill="none"
      stroke="${palette.ink}" stroke-opacity="0.12"/>

    <rect x="989" y="158" width="314" height="284" rx="5" fill="${palette.ivory}" fill-opacity="0.91"/>
    <rect x="989.5" y="158.5" width="313" height="283" rx="4.5" fill="none"
      stroke="${palette.ink}" stroke-opacity="0.12"/>
    <circle cx="1017" cy="188" r="4.5" fill="${palette.terracotta}"/>
    <text x="1032" y="193" class="sans" fill="${palette.ink}" fill-opacity="0.48"
      font-size="10" letter-spacing="1.5">A THOUGHT, IN CONTEXT</text>
    <text x="1016" y="247" class="cjk" fill="${palette.ink}" font-size="28">从洞穴走向光明的人，</text>
    <text x="1016" y="288" class="cjk" fill="${palette.ink}" font-size="28">起初反而会看不清。</text>
    <text x="1018" y="331" class="serif" fill="${palette.ink}" fill-opacity="0.67"
      font-size="15">The person leaving the cave for light</text>
    <text x="1018" y="354" class="serif" fill="${palette.ink}" fill-opacity="0.67"
      font-size="15">will at first see less clearly, not more.</text>
    <line x1="1017" y1="382" x2="1274" y2="382" stroke="${palette.ink}" stroke-opacity="0.14"/>
    <text x="1018" y="408" class="sans" fill="${palette.ink}" fill-opacity="0.5"
      font-size="10" letter-spacing="1.25">PLATO · THE REPUBLIC VII</text>
  </g>
`,
  );
}

async function renderPng(svg, outputPath, width, height, { alpha }) {
  let image = sharp(Buffer.from(svg), { density: 288 }).resize(width, height);
  if (!alpha) {
    image = image.flatten({ background: palette.ink }).removeAlpha();
  }
  await image.png({ compressionLevel: 9, adaptiveFiltering: true }).toFile(outputPath);
}

async function createPreview(iconPath, smallPath, marqueePath) {
  const canvasWidth = 1600;
  const canvasHeight = 1120;
  const background = {
    create: {
      width: canvasWidth,
      height: canvasHeight,
      channels: 3,
      background: palette.ivory,
    },
  };

  const labelSvg = Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1120">
      <style>
        @font-face { font-family: "AGORA Sans"; src: url("${escapeXml(sansFont)}"); }
        .label { font-family: "AGORA Sans", sans-serif; fill: ${palette.ink}; letter-spacing: 2.3px; }
      </style>
      <text x="80" y="68" class="label" font-size="15">AGORA · CHROME WEB STORE ASSETS</text>
      <text x="80" y="1074" class="label" font-size="11" fill-opacity="0.46">ICON / SMALL PROMO / MARQUEE · BRAND REFRESH V5</text>
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

  const smallTile = await sharp(smallPath).resize(660, 420).png().toBuffer();
  const marqueeTile = await sharp(marqueePath).resize(1400, 560).png().toBuffer();

  await sharp(background)
    .composite([
      { input: labelSvg, left: 0, top: 0 },
      { input: iconTile, left: 80, top: 120 },
      { input: smallTile, left: 420, top: 120 },
      { input: marqueeTile, left: 100, top: 510 },
    ])
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(path.join(previewRoot, "store-assets-preview.png"));
}

async function main() {
  await mkdir(versionRoot, { recursive: true });
  await mkdir(previewRoot, { recursive: true });

  const illustration = await readFile(illustrationPath);
  // librsvg renders embedded PNGs consistently across local Sharp builds; converting
  // the WebP here keeps the source artwork intact while avoiding a blank SVG image.
  const illustrationPng = await sharp(illustration).png().toBuffer();
  const illustrationDataUrl = `data:image/png;base64,${illustrationPng.toString("base64")}`;

  const iconSvg = makeIconSvg();
  const smallPromoSvg = makeSmallPromoSvg();
  const marqueeSvg = makeMarqueeSvg(illustrationDataUrl);

  const sources = [
    ["store-icon-128.svg", iconSvg],
    ["small-promo-440x280.svg", smallPromoSvg],
    ["marquee-1400x560.svg", marqueeSvg],
  ];
  await Promise.all(
    sources.map(([name, source]) => writeFile(path.join(versionRoot, name), source)),
  );

  const iconPath = path.join(storeRoot, "store-icon-128.png");
  const smallPath = path.join(storeRoot, "small-promo-440x280.png");
  const marqueePath = path.join(storeRoot, "marquee-1400x560.png");

  await renderPng(iconSvg, iconPath, 128, 128, { alpha: true });
  await renderPng(smallPromoSvg, smallPath, 440, 280, { alpha: false });
  await renderPng(marqueeSvg, marqueePath, 1400, 560, { alpha: false });

  await Promise.all([
    sharp(iconPath).toFile(path.join(versionRoot, "store-icon-128.png")),
    sharp(smallPath).toFile(path.join(versionRoot, "small-promo-440x280.png")),
    sharp(marqueePath).toFile(path.join(versionRoot, "marquee-1400x560.png")),
  ]);

  await createPreview(iconPath, smallPath, marqueePath);

  console.log(`Updated ${path.relative(projectRoot, iconPath)}`);
  console.log(`Updated ${path.relative(projectRoot, smallPath)}`);
  console.log(`Updated ${path.relative(projectRoot, marqueePath)}`);
  console.log(
    `Preview ${path.relative(projectRoot, path.join(previewRoot, "store-assets-preview.png"))}`,
  );
}

await main();
