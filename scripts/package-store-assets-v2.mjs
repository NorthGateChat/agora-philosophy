import { execFile } from "node:child_process";
import { mkdir, rm } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const run = promisify(execFile);
const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const storeRoot = resolve(projectRoot, "store-assets");
const v2Root = resolve(storeRoot, "v2");

const packages = [
  {
    name: "agora-chrome-web-store-upload-v2.zip",
    entries: ["upload", "README.md", "COPY-ZH-CN.md", "COPY-EN.md"],
  },
  {
    name: "agora-product-intro-assets-v2.zip",
    entries: [
      "brand",
      "campaign",
      "story",
      "preview",
      "brand-and-campaign-board.png",
      "product-story-contact-sheet.png",
      "product-story-contact-sheet-en.png",
      "source/generated",
      "source/prompts",
      "README.md",
      "COPY-ZH-CN.md",
      "COPY-EN.md",
    ],
  },
  {
    name: "agora-store-assets-v2-complete.zip",
    entries: ["."],
  },
];

await mkdir(storeRoot, { recursive: true });

for (const archive of packages) {
  const destination = resolve(storeRoot, archive.name);
  await rm(destination, { force: true });
  await run("/usr/bin/zip", ["-q", "-r", destination, ...archive.entries], {
    cwd: v2Root,
  });
  console.log(destination);
}
