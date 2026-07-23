import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const here = path.dirname(fileURLToPath(import.meta.url));
const articleDir = path.resolve(here, "..");
const screenshotsDir = path.join(articleDir, "screenshots");

async function renderCover() {
  await sharp(path.join(here, "cover-agora-scene-original.png"))
    .resize({ width: 900, height: 383, fit: "cover", position: "centre" })
    .grayscale()
    .toColourspace("srgb")
    .flatten({ background: "#111111" })
    .removeAlpha()
    .png({ compressionLevel: 9, palette: false })
    .toFile(path.join(articleDir, "cover-900x383.png"));
}

async function cropQuote(filename) {
  return sharp(path.join(screenshotsDir, filename))
    .extract({ left: 0, top: 45, width: 430, height: 620 })
    .resize({ width: 1000 })
    .png()
    .toBuffer();
}

function stripHeader(index) {
  return Buffer.from(`
  <svg xmlns="http://www.w3.org/2000/svg" width="1080" height="150">
    <rect width="1080" height="150" fill="#211f1b"/>
    <text x="42" y="58" fill="#eae2d5" font-family="Georgia, serif" font-size="25" letter-spacing="5">AGORA</text>
    <line x1="42" y1="88" x2="92" y2="88" stroke="#cfad6d" stroke-width="2"/>
    <text x="1040" y="62" text-anchor="end" fill="#8f8679" font-family="Georgia, serif" font-size="18" letter-spacing="3">${index}</text>
    <text x="42" y="128" fill="#aaa092" font-family="Songti SC, STSong, serif" font-size="23" letter-spacing="2">两次打开，两种追问</text>
  </svg>`);
}

async function renderQuoteStrip(outputName, topFile, bottomFile, index) {
  const [top, bottom] = await Promise.all([cropQuote(topFile), cropQuote(bottomFile)]);
  const topMeta = await sharp(top).metadata();
  const bottomMeta = await sharp(bottom).metadata();
  const gap = 42;
  const footer = 58;
  const height = 150 + topMeta.height + gap + bottomMeta.height + footer;

  await sharp({
    create: { width: 1080, height, channels: 3, background: "#211f1b" },
  })
    .composite([
      { input: stripHeader(index), top: 0, left: 0 },
      { input: top, top: 150, left: 40 },
      { input: bottom, top: 150 + topMeta.height + gap, left: 40 },
    ])
    .png({ compressionLevel: 9, palette: false })
    .toFile(path.join(screenshotsDir, outputName));
}

await renderCover();
await renderQuoteStrip(
  "07-multi-quotes-01.png",
  "01-quote-heidegger-mobile.png",
  "02-quote-wittgenstein-mobile.png",
  "01 / 02",
);
await renderQuoteStrip(
  "08-multi-quotes-02.png",
  "03-quote-third-mobile.png",
  "04-quote-fourth-mobile.png",
  "02 / 02",
);

console.log("Rendered WeChat cover and mobile quote strips.");
