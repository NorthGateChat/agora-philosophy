import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

import { updateIllustrationMetadata } from "../scripts/update-illustration-metadata.mjs";

const registryFixture = `export const illustrations = [
  {
    thoughtId: "thought-a",
    altZh: "旧的中文描述足够长",
    altEn: "An old English description.",
  },
] as const;
`;

test("illustration metadata updates are validated, previewed, and written atomically", async (t) => {
  const directory = await mkdtemp(path.join(tmpdir(), "agora-alt-metadata-"));
  t.after(() => rm(directory, { recursive: true, force: true }));
  const registryPath = path.join(directory, "illustrations.ts");
  const manifestPath = path.join(directory, "manifest.json");
  await writeFile(registryPath, registryFixture, "utf8");
  await writeFile(
    manifestPath,
    JSON.stringify({
      items: [
        {
          thoughtId: "thought-a",
          altZh: "一条新的中文画面描述。",
          altEn: "A new description of the illustrated scene.",
        },
      ],
    }),
    "utf8",
  );

  const preview = await updateIllustrationMetadata(manifestPath, { registryPath });
  assert.deepEqual(preview, { checked: 1, changed: true, wrote: false });
  assert.equal(await readFile(registryPath, "utf8"), registryFixture);

  const result = await updateIllustrationMetadata(manifestPath, { registryPath, write: true });
  assert.deepEqual(result, { checked: 1, changed: true, wrote: true });
  const updated = await readFile(registryPath, "utf8");
  assert.match(updated, /altZh: "一条新的中文画面描述。"/);
  assert.match(updated, /altEn: "A new description of the illustrated scene\."/);
});

test("illustration metadata rejects missing registry entries", async (t) => {
  const directory = await mkdtemp(path.join(tmpdir(), "agora-alt-metadata-"));
  t.after(() => rm(directory, { recursive: true, force: true }));
  const registryPath = path.join(directory, "illustrations.ts");
  const manifestPath = path.join(directory, "manifest.json");
  await writeFile(registryPath, registryFixture, "utf8");
  await writeFile(
    manifestPath,
    JSON.stringify({
      items: [
        {
          thoughtId: "missing-thought",
          altZh: "一条不存在条目的中文描述。",
          altEn: "A description for an entry that does not exist.",
        },
      ],
    }),
    "utf8",
  );

  await assert.rejects(
    updateIllustrationMetadata(manifestPath, { registryPath, write: true }),
    /expected exactly one registry entry, found 0/,
  );
});
