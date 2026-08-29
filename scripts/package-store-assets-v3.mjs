import { execFile } from "node:child_process";
import { mkdir, rm } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const run = promisify(execFile);
const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const storeRoot = resolve(projectRoot, "store-assets");
const v3Root = resolve(storeRoot, "v3");

const packages = [
  {
    name: "agora-chrome-web-store-upload-v3.zip",
    entries: [
      "upload",
      "README.md",
      "COPY-ZH-CN.md",
      "COPY-ZH-TW.md",
      "COPY-EN.md",
      "asset-manifest.json",
    ],
  },
  {
    name: "agora-chrome-web-store-assets-v3-complete.zip",
    entries: [
      "upload",
      "brand",
      "preview",
      "README.md",
      "ART-DIRECTION.md",
      "COPY-ZH-CN.md",
      "COPY-ZH-TW.md",
      "COPY-EN.md",
      "asset-manifest.json",
    ],
  },
];

await mkdir(storeRoot, { recursive: true });

for (const archive of packages) {
  const destination = resolve(storeRoot, archive.name);
  await rm(destination, { force: true });
  await run(
    "/usr/bin/zip",
    [
      "-q",
      "-r",
      destination,
      ...archive.entries,
      "-x",
      "*/.DS_Store",
    ],
    { cwd: v3Root },
  );
  console.log(destination);
}
