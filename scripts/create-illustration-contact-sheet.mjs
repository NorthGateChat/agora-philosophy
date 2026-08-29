import { readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const [, , manifestArgument, outputArgument, columnsArgument = "4"] = process.argv;
if (!manifestArgument || !outputArgument) {
  console.error("Usage: node scripts/create-illustration-contact-sheet.mjs <manifest.json> <output.png> [columns]");
  process.exit(1);
}

const manifestPath = path.resolve(manifestArgument);
const parsed = JSON.parse(await readFile(manifestPath, "utf8"));
const items = Array.isArray(parsed) ? parsed : parsed.items;
if (!Array.isArray(items) || items.length === 0) throw new Error("Manifest has no items");

const columns = Math.max(1, Number.parseInt(columnsArgument, 10) || 4);
const cell = Object.freeze({ width: 512, height: 341 });
const rows = Math.ceil(items.length / columns);
const composites = [];

for (const [index, item] of items.entries()) {
  const source = item.source
    ? path.resolve(item.source)
    : path.resolve("public", "illustrations", item.file ?? `${item.thoughtId}-v1.webp`);
  const image = await sharp(source)
    .resize(cell.width, cell.height, { fit: "cover", position: "centre" })
    .png()
    .toBuffer();
  const badge = Buffer.from(
    `<svg width="${cell.width}" height="${cell.height}"><rect x="12" y="12" width="44" height="32" rx="4" fill="#f5f2ea" fill-opacity="0.9"/><text x="34" y="35" text-anchor="middle" font-family="Arial" font-size="18" fill="#34332f">${index + 1}</text></svg>`,
  );
  composites.push({ input: image, left: (index % columns) * cell.width, top: Math.floor(index / columns) * cell.height });
  composites.push({ input: badge, left: (index % columns) * cell.width, top: Math.floor(index / columns) * cell.height });
}

await sharp({
  create: {
    width: columns * cell.width,
    height: rows * cell.height,
    channels: 3,
    background: { r: 245, g: 242, b: 234 },
  },
})
  .composite(composites)
  .png()
  .toFile(path.resolve(outputArgument));

console.log(JSON.stringify({ output: path.resolve(outputArgument), items: items.length, columns, rows }));
