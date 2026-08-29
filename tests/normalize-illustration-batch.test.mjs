import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import sharp from "sharp";
import { normalizeIllustrationBatch } from "../scripts/normalize-illustration-batch.mjs";

async function createFixture(t) {
  const projectRoot = await mkdtemp(path.join(os.tmpdir(), "agora-normalize-test-"));
  t.after(() => rm(projectRoot, { recursive: true, force: true }));
  await Promise.all([
    mkdir(path.join(projectRoot, "content"), { recursive: true }),
    mkdir(path.join(projectRoot, "public", "illustrations"), { recursive: true }),
    mkdir(path.join(projectRoot, "staging", "sources"), { recursive: true }),
  ]);
  await writeFile(
    path.join(projectRoot, "content", "thoughts.ts"),
    'export const thoughts = [{ id: "test-thought" }, { id: "second-thought" }, { id: "legacy_thought" }];\n',
    "utf8",
  );
  const registryPath = path.join(projectRoot, "content", "illustrations.ts");
  await writeFile(registryPath, "export const thoughtIllustrations = [];\n", "utf8");
  const sourcePath = path.join(projectRoot, "staging", "sources", "test.png");
  await sharp({
    create: {
      width: 320,
      height: 180,
      channels: 4,
      background: { r: 80, g: 110, b: 120, alpha: 0.5 },
    },
  }).png().toFile(sourcePath);

  return { projectRoot, registryPath, sourcePath };
}

function stagedItem(overrides = {}) {
  return {
    thoughtId: "test-thought",
    source: "sources/test.png",
    assetId: "threshold-manuscript-999",
    altZh: "一条用于测试的线。",
    altEn: "A line used for testing.",
    captionZh: "测试手稿",
    captionEn: "Test Manuscript",
    corpus: "western",
    ...overrides,
  };
}

test("normalizes a staging batch without changing the production registry", async (t) => {
  const { projectRoot, registryPath } = await createFixture(t);
  const manifestPath = path.join(projectRoot, "staging", "batch.json");
  const outputDirectory = path.join(projectRoot, "staging", "review");
  await writeFile(manifestPath, `${JSON.stringify({ items: [stagedItem()] }, null, 2)}\n`, "utf8");
  const registryBefore = await readFile(registryPath, "utf8");

  const result = await normalizeIllustrationBatch({
    manifestPath,
    outputDirectory,
    projectRoot,
    now: () => new Date("2026-07-30T00:00:00.000Z"),
  });

  assert.equal(result.count, 1);
  assert.equal(await readFile(registryPath, "utf8"), registryBefore);
  const imagePath = path.join(projectRoot, "public", "illustrations", "test-thought-v1.webp");
  const metadata = await sharp(imagePath).metadata();
  assert.equal(metadata.format, "webp");
  assert.equal(metadata.width, 1536);
  assert.equal(metadata.height, 1024);
  assert.equal(metadata.space, "srgb");
  assert.equal(metadata.hasAlpha, false);

  const normalized = JSON.parse(await readFile(
    path.join(outputDirectory, "normalized-manifest.json"),
    "utf8",
  ));
  assert.equal(normalized.generatedAt, "2026-07-30T00:00:00.000Z");
  assert.equal(normalized.items[0].status, "generated");
  assert.equal(normalized.items[0].src, "/illustrations/test-thought-v1.webp");
  assert.match(
    await readFile(path.join(outputDirectory, "registry-snippet.ts"), "utf8"),
    /thoughtId: "test-thought"/,
  );

  await assert.rejects(
    normalizeIllustrationBatch({ manifestPath, outputDirectory, projectRoot }),
    /refusing to overwrite/i,
  );
});

test("rejects duplicate or undeclared entries before writing any output", async (t) => {
  const { projectRoot } = await createFixture(t);
  const manifestPath = path.join(projectRoot, "staging", "bad-batch.json");
  const outputDirectory = path.join(projectRoot, "staging", "bad-review");
  await writeFile(manifestPath, `${JSON.stringify({
    items: [
      stagedItem({ thoughtId: "not-a-real-thought" }),
      stagedItem({ thoughtId: "not-a-real-thought" }),
    ],
  }, null, 2)}\n`, "utf8");

  await assert.rejects(
    normalizeIllustrationBatch({ manifestPath, outputDirectory, projectRoot }),
    /duplicate thoughtId/,
  );
  await assert.rejects(stat(outputDirectory), { code: "ENOENT" });
  await assert.rejects(
    stat(path.join(projectRoot, "public", "illustrations", "not-a-real-thought-v1.webp")),
    { code: "ENOENT" },
  );
});

test("accepts declared legacy thought IDs containing underscores", async (t) => {
  const { projectRoot } = await createFixture(t);
  const manifestPath = path.join(projectRoot, "staging", "legacy-batch.json");
  const outputDirectory = path.join(projectRoot, "staging", "legacy-review");
  await writeFile(manifestPath, `${JSON.stringify({
    items: [stagedItem({ thoughtId: "legacy_thought" })],
  }, null, 2)}\n`, "utf8");

  const result = await normalizeIllustrationBatch({ manifestPath, outputDirectory, projectRoot });

  assert.equal(result.count, 1);
  await stat(path.join(projectRoot, "public", "illustrations", "legacy_thought-v1.webp"));
});
