import sharp from "sharp";
import { fileURLToPath } from "node:url";

const root = new URL("../", import.meta.url);
const englishPath = new URL("store-assets/v7-current-ui/source/screenshots/en/05-share.png", root);
const chinesePath = new URL("store-assets/v7-current-ui/source/screenshots/zh-CN/05-share.png", root);
const englishFile = fileURLToPath(englishPath);
const chineseFile = fileURLToPath(chinesePath);

const cardX = 505;
const cardY = 145;
const cardWidth = 270;
const cardHeight = 337;

const sourceCard = await sharp(chineseFile)
  .extract({ left: cardX, top: cardY, width: cardWidth, height: cardHeight })
  .png()
  .toBuffer();

const typography = Buffer.from(`
<svg width="${cardWidth}" height="${cardHeight}" viewBox="0 0 ${cardWidth} ${cardHeight}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#f4efe5" stop-opacity="0"/>
      <stop offset="0.38" stop-color="#f4efe5" stop-opacity="0.92"/>
      <stop offset="1" stop-color="#f4efe5"/>
    </linearGradient>
  </defs>
  <rect x="1" y="150" width="268" height="186" fill="url(#fade)"/>
  <rect x="1" y="186" width="268" height="150" fill="#f4efe5" fill-opacity="0.98"/>
  <g fill="#34322e" text-anchor="middle">
    <text x="135" y="208" font-family="Georgia, Palatino, serif" font-size="12.2" font-style="italic">
      <tspan x="135" dy="0">The person leaving the cave for the light</tspan>
      <tspan x="135" dy="17">will at first see less clearly, not more.</tspan>
    </text>
    <text x="135" y="251" font-family="Songti SC, STSong, Noto Serif CJK SC, serif" font-size="9.2">
      <tspan x="135" dy="0">从洞穴走向光明的人，起初反而会看不清。</tspan>
    </text>
    <line x1="121" y1="280" x2="149" y2="280" stroke="#777269" stroke-width="0.65"/>
    <text x="135" y="291" font-family="Arial, PingFang SC, sans-serif" font-size="8.3" font-weight="600">PLATO</text>
    <text x="135" y="307" font-family="Arial, PingFang SC, sans-serif" font-size="5.8" fill="#777269">THE REPUBLIC</text>
    <text x="246" y="326" font-family="Arial, sans-serif" font-size="5.1" letter-spacing="0.9" fill="#777269">NOTHING FINAL</text>
  </g>
  <rect x="0.5" y="0.5" width="269" height="336" fill="none" stroke="#c8c1b3" stroke-width="1"/>
</svg>`);

const repairedCard = await sharp(sourceCard)
  .composite([{ input: typography, left: 0, top: 0 }])
  .png()
  .toBuffer();

const repaired = await sharp(englishFile)
  .composite([{ input: repairedCard, left: cardX, top: cardY }])
  .flatten({ background: "#ffffff" })
  .removeAlpha()
  .png({ compressionLevel: 9 })
  .toBuffer();

const repairedFile = fileURLToPath(new URL("store-assets/v7-current-ui/source/screenshots/en/05-share.repaired.png", root));
await sharp(repaired).toFile(repairedFile);
await import("node:fs/promises").then(({ rename }) => rename(
  repairedFile,
  englishFile,
));
