import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const distDirectory = resolve(projectRoot, "extension-dist");
const iconDirectory = resolve(distDirectory, "icons");
const localeDirectory = resolve(distDirectory, "_locales");
const storeAssetsDirectory = resolve(projectRoot, "store-assets");
const publicDirectory = resolve(projectRoot, "public");

const brand = JSON.parse(
  await readFile(resolve(projectRoot, "brand.json"), "utf8"),
);

const manifest = {
  manifest_version: 3,
  default_locale: "zh_CN",
  name: "__MSG_extensionName__",
  short_name: "__MSG_extensionShortName__",
  description: "__MSG_extensionDescription__",
  version: brand.version,
  homepage_url: brand.repositoryUrl,
  chrome_url_overrides: {
    newtab: "newtab.html",
  },
  icons: {
    16: "icons/icon-16.png",
    32: "icons/icon-32.png",
    48: "icons/icon-48.png",
    128: "icons/icon-128.png",
  },
};

const localeMessages = {
  zh_CN: {
    extensionName: brand.storeNameZhHans,
    extensionShortName: brand.shortNameZh,
    extensionDescription: brand.descriptionZhHans,
    extensionSlogan: brand.sloganZhHans,
  },
  zh_TW: {
    extensionName: brand.storeNameZhHant,
    extensionShortName: brand.shortNameZh,
    extensionDescription: brand.descriptionZhHant,
    extensionSlogan: brand.sloganZhHant,
  },
  en: {
    extensionName: brand.storeNameEn,
    extensionShortName: brand.shortNameEn,
    extensionDescription: brand.descriptionEn,
    extensionSlogan: brand.sloganEn,
  },
};

function asChromeMessages(messages) {
  return Object.fromEntries(
    Object.entries(messages).map(([key, message]) => [key, { message }]),
  );
}

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
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

function decorativeMark(x, y, radius, opacity = 1) {
  const circumference = Math.round(2 * Math.PI * radius);
  const gap = Math.max(18, Math.round(radius * 0.52));
  return `
    <g opacity="${opacity}" transform="translate(${x} ${y})">
      <circle r="${radius}" fill="none" stroke="#d2ad69" stroke-width="3"
        stroke-linecap="round" stroke-dasharray="${circumference - gap} ${gap}" transform="rotate(-48)"/>
      <circle r="5" fill="#d2ad69"/>
      <path d="M ${Math.round(radius * 0.42)} -${Math.round(radius * 0.82)} L ${Math.round(radius * 0.73)} -${Math.round(radius * 1.14)}"
        fill="none" stroke="#d2ad69" stroke-width="2" stroke-linecap="round"/>
    </g>`;
}

function smallPromoArtwork() {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="440" height="280" viewBox="0 0 440 280">
      <rect width="440" height="280" fill="#24221e"/>
      <path d="M0 72H440M0 208H440M80 0V280M360 0V280" stroke="#eee5d5" stroke-opacity=".07"/>
      ${decorativeMark(352, 68, 42, 0.9)}
      <text x="42" y="45" fill="#d2ad69" font-family="Arial, sans-serif" font-size="11" letter-spacing="2.4">PHILOSOPHY · NEW TAB</text>
      <text x="40" y="116" fill="#f2eadc" font-family="Songti SC, STSong, Noto Serif CJK SC, serif" font-size="54" font-weight="600">${escapeXml(brand.nameZhHans)}</text>
      <text x="42" y="158" fill="#e2d8c7" font-family="Songti SC, STSong, Noto Serif CJK SC, serif" font-size="18">${escapeXml(brand.sloganZhHans)}</text>
      <line x1="42" y1="193" x2="398" y2="193" stroke="#e2d8c7" stroke-opacity=".22"/>
      <text x="42" y="226" fill="#bcb19f" font-family="PingFang SC, Microsoft YaHei, sans-serif" font-size="13" letter-spacing="1">双语译写 · 思想脉络 · 本地收藏</text>
      <text x="42" y="253" fill="#827a6e" font-family="Arial, sans-serif" font-size="10" letter-spacing="1.8">${escapeXml(brand.nameEn.toUpperCase())}</text>
    </svg>`;
}

function marqueeArtwork() {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="1400" height="560" viewBox="0 0 1400 560">
      <rect width="1400" height="560" fill="#eae3d7"/>
      <path d="M0 94H1400M0 468H1400M118 0V560M1282 0V560" stroke="#2b2823" stroke-opacity=".08"/>
      ${decorativeMark(1190, 126, 86, 0.78)}
      ${decorativeMark(1148, 484, 210, 0.12)}
      <text x="130" y="104" fill="#927044" font-family="Arial, sans-serif" font-size="16" letter-spacing="5">PHILOSOPHY · NEW TAB</text>
      <text x="126" y="265" fill="#2a2722" font-family="Songti SC, STSong, Noto Serif CJK SC, serif" font-size="112" font-weight="600">${escapeXml(brand.nameZhHans)}</text>
      <text x="132" y="334" fill="#37322b" font-family="Songti SC, STSong, Noto Serif CJK SC, serif" font-size="34">${escapeXml(brand.sloganZhHans)}</text>
      <text x="132" y="395" fill="#81776a" font-family="PingFang SC, Microsoft YaHei, sans-serif" font-size="19" letter-spacing="2">${escapeXml(brand.campaignZhHans ?? "不是金句，是思想的来路与去处。")}</text>
      <rect x="850" y="205" width="416" height="230" rx="4" fill="#26231e"/>
      <text x="888" y="251" fill="#d2ad69" font-family="Arial, sans-serif" font-size="12" letter-spacing="2.2">A MOMENT OF THOUGHT</text>
      <text x="888" y="312" fill="#f0e7d8" font-family="Songti SC, STSong, Noto Serif CJK SC, serif" font-size="29">人的品格，生成于</text>
      <text x="888" y="356" fill="#f0e7d8" font-family="Songti SC, STSong, Noto Serif CJK SC, serif" font-size="29">一次又一次的行动之中。</text>
      <line x1="888" y1="388" x2="1228" y2="388" stroke="#f0e7d8" stroke-opacity=".2"/>
      <text x="888" y="417" fill="#aaa091" font-family="PingFang SC, Microsoft YaHei, sans-serif" font-size="14">亚里士多德 ·《尼各马可伦理学》</text>
    </svg>`;
}

function socialShareArtwork() {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
      <rect width="1200" height="630" fill="#25221d"/>
      <path d="M0 90H1200M0 540H1200M96 0V630M1104 0V630" stroke="#eee5d5" stroke-opacity=".07"/>
      ${decorativeMark(1008, 132, 86, 0.92)}
      ${decorativeMark(1070, 606, 260, 0.1)}
      <text x="104" y="104" fill="#d2ad69" font-family="Arial, sans-serif" font-size="16" letter-spacing="4.5">PHILOSOPHY · NEW TAB</text>
      <text x="98" y="284" fill="#f2eadc" font-family="Songti SC, STSong, Noto Serif CJK SC, serif" font-size="118" font-weight="600">${escapeXml(brand.nameZhHans)}</text>
      <text x="106" y="368" fill="#e7ddcd" font-family="Songti SC, STSong, Noto Serif CJK SC, serif" font-size="40">${escapeXml(brand.sloganZhHans)}</text>
      <line x1="106" y1="426" x2="914" y2="426" stroke="#eee5d5" stroke-opacity=".2"/>
      <text x="106" y="480" fill="#b9ad9b" font-family="PingFang SC, Microsoft YaHei, sans-serif" font-size="23" letter-spacing="2">${escapeXml(brand.campaignZhHans ?? "不是金句，是思想的来路与去处。")}</text>
      <text x="106" y="558" fill="#746c61" font-family="Arial, sans-serif" font-size="13" letter-spacing="3">${escapeXml(brand.nameEn.toUpperCase())}</text>
    </svg>`;
}

async function renderPng(svg, outputPath) {
  // Chrome Web Store promo artwork must be 24-bit PNG/JPEG without alpha.
  // Each SVG already paints a full-canvas background, so dropping alpha keeps
  // the appearance intact while producing an RGB PNG (PNG colour type 2).
  await sharp(Buffer.from(svg)).removeAlpha().png().toFile(outputPath);
}

await Promise.all([
  mkdir(distDirectory, { recursive: true }),
  mkdir(iconDirectory, { recursive: true }),
  mkdir(localeDirectory, { recursive: true }),
  mkdir(storeAssetsDirectory, { recursive: true }),
  mkdir(publicDirectory, { recursive: true }),
]);

await writeFile(
  resolve(distDirectory, "manifest.json"),
  `${JSON.stringify(manifest, null, 2)}\n`,
);

await Promise.all(
  Object.entries(localeMessages).map(async ([locale, messages]) => {
    const directory = resolve(localeDirectory, locale);
    await mkdir(directory, { recursive: true });
    await writeFile(
      resolve(directory, "messages.json"),
      `${JSON.stringify(asChromeMessages(messages), null, 2)}\n`,
    );
  }),
);

const iconSvg = Buffer.from(iconArtwork());
await Promise.all(
  [16, 32, 48, 128].map((size) =>
    sharp(iconSvg)
      .resize(size, size, { fit: "fill" })
      .png()
      .toFile(resolve(iconDirectory, `icon-${size}.png`)),
  ),
);

await copyFile(
  resolve(iconDirectory, "icon-128.png"),
  resolve(storeAssetsDirectory, "store-icon-128.png"),
);

await Promise.all([
  renderPng(
    smallPromoArtwork(),
    resolve(storeAssetsDirectory, "small-promo-440x280.png"),
  ),
  renderPng(
    marqueeArtwork(),
    resolve(storeAssetsDirectory, "marquee-1400x560.png"),
  ),
  renderPng(
    socialShareArtwork(),
    resolve(publicDirectory, "social-share.png"),
  ),
]);

console.log(`Finalized Chrome extension ${brand.version} in ${distDirectory}`);
