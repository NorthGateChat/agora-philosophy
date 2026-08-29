import assert from "node:assert/strict";
import test from "node:test";

import { tsImport } from "tsx/esm/api";

const {
  addKnowledgeCard,
  applyKnowledgeImport,
  applyKnowledgeUndoSnapshot,
  createManualCard,
  createManualCollection,
  createKnowledgePrompt,
  knowledgeCollectionsToThoughts,
  knowledgeCollectionsSignature,
  loadKnowledgeCollections,
  loadKnowledgeUndoSnapshot,
  mergeKnowledgeCollections,
  normalizeKnowledgeCollection,
  normalizeKnowledgeCollections,
  parseKnowledgeBackup,
  parseKnowledgeImport,
  previewKnowledgeImport,
  removeKnowledgeCard,
  saveKnowledgeUndoSnapshot,
  serializeKnowledgeBackup,
  undoLastKnowledgeImport,
  updateKnowledgeCard,
  updateKnowledgeCollection,
} = await tsImport("../lib/customKnowledge.ts", import.meta.url);

const timestamp = "2026-01-02T03:04:05.000Z";

function card(overrides = {}) {
  return {
    id: "card-a",
    type: "knowledge",
    content: "Alpha",
    tags: [],
    provenance: "manual",
    sourceStatus: "verified",
    ...overrides,
  };
}

function collection(overrides = {}) {
  return {
    id: "collection-a",
    title: "Collection A",
    description: "Description",
    enabled: true,
    createdAt: timestamp,
    updatedAt: timestamp,
    cards: [card()],
    ...overrides,
  };
}

async function withMockIndexedDB(mock, callback) {
  const originalDescriptor = Object.getOwnPropertyDescriptor(globalThis, "indexedDB");
  Object.defineProperty(globalThis, "indexedDB", {
    configurable: true,
    value: mock,
  });
  try {
    return await callback();
  } finally {
    if (originalDescriptor) {
      Object.defineProperty(globalThis, "indexedDB", originalDescriptor);
    } else {
      delete globalThis.indexedDB;
    }
  }
}

test("knowledge loading surfaces IndexedDB failures instead of pretending storage is empty", async () => {
  const failure = new Error("IndexedDB read failed");
  await withMockIndexedDB({
    open() {
      const request = {};
      queueMicrotask(() => {
        request.error = failure;
        request.onerror?.();
      });
      return request;
    },
  }, async () => {
    await assert.rejects(() => loadKnowledgeCollections(), /IndexedDB read failed/);
  });
});

test("undo snapshot loading surfaces IndexedDB failures", async () => {
  const failure = new Error("Undo snapshot read failed");
  const database = {
    transaction() {
      return {
        objectStore() {
          return {
            get() {
              const request = {};
              queueMicrotask(() => {
                request.error = failure;
                request.onerror?.();
              });
              return request;
            },
          };
        },
      };
    },
    close() {},
  };
  await withMockIndexedDB({
    open() {
      const request = {};
      queueMicrotask(() => {
        request.result = database;
        request.onsuccess?.();
      });
      return request;
    },
  }, async () => {
    await assert.rejects(() => loadKnowledgeUndoSnapshot(), /Undo snapshot read failed/);
  });
});

test("material prompt hands file reading and naming to the user's AI", () => {
  const prompt = createKnowledgePrompt({
    mode: "material",
    count: 8,
    cardTypes: ["quote", "knowledge", "question"],
    language: "zh",
  });

  assert.match(prompt, /上传文件、粘贴网页或补充笔记/);
  assert.match(prompt, /知识集命名与卡片拆分都由你/);
  assert.match(prompt, /title 和 description 也由你完成/);
  assert.match(prompt, /只输出合法 JSON/);
  assert.match(prompt, /绝不编造引文/);
});

test("topic prompt asks for generated cards without pretending they are quotations", () => {
  const prompt = createKnowledgePrompt({
    mode: "generated",
    topic: "可用性与认知负荷",
    count: 12,
    cardTypes: ["knowledge", "question"],
    language: "zh",
  });

  assert.match(prompt, /可用性与认知负荷/);
  assert.match(prompt, /自行决定知识集标题/);
  assert.match(prompt, /否则一律写成 knowledge 卡/);
});

test("import parser verifies material quotes and flags unsupported ones", () => {
  const result = parseKnowledgeImport(JSON.stringify({
    title: "概率论笔记",
    cards: [
      {
        type: "quote",
        content: "贝叶斯更新用新证据修正已有判断。",
        sourceQuote: "贝叶斯更新用新证据修正已有判断。",
        author: "课堂笔记",
        work: "第一章",
        explanation: "新信息到来时，不必固守原判断。",
        reflection: "什么证据足以让我改变判断？",
      },
      {
        type: "quote",
        content: "材料中并不存在的原句。",
        sourceQuote: "材料中并不存在的原句。",
        author: "课堂笔记",
        work: "第二章",
        explanation: "这条内容需要复核。",
        reflection: "它有可靠出处吗？",
      },
    ],
  }), "material", "第一章：贝叶斯更新用新证据修正已有判断。");

  assert.ok(result.collection);
  assert.equal(result.collection.cards.length, 2);
  assert.equal(result.collection.cards[0].sourceStatus, "verified");
  assert.equal(result.collection.cards[1].sourceStatus, "needs-review");
  assert.equal(result.collection.cards[1].type, "knowledge");
  assert.ok(result.warnings.length > 0);
});

test("material import without local source keeps AI quotes but marks them for review", () => {
  const result = parseKnowledgeImport(JSON.stringify({
    title: "概率论笔记",
    cards: [{
      type: "quote",
      content: "贝叶斯更新用新证据修正已有判断。",
      sourceQuote: "贝叶斯更新用新证据修正已有判断。",
      author: "课堂笔记",
      work: "第一章",
    }],
  }), "material");

  assert.ok(result.collection);
  assert.equal(result.collection.cards[0].type, "quote");
  assert.equal(result.collection.cards[0].sourceStatus, "needs-review");
  assert.match(result.warnings.join("\n"), /未读取原始材料/);
});

test("enabled collections become private AGORA thoughts", () => {
  const imported = parseKnowledgeImport(JSON.stringify({
    title: "产品设计",
    cards: [{
      type: "knowledge",
      content: "界面应让下一步行动自然显现。",
      author: "个人笔记",
      work: "交互原则",
      explanation: "好的层级降低用户寻找操作的成本。",
      reflection: "当前页面最重要的下一步是否足够清楚？",
    }],
  }), "generated").collection;

  assert.ok(imported);
  const thoughts = knowledgeCollectionsToThoughts([imported]);
  assert.equal(thoughts.length, 1);
  assert.match(thoughts[0].id, /^custom:/);
  assert.equal(thoughts[0].customKnowledge?.collectionTitle, "产品设计");
});

test("old collections are normalized and duplicate IDs are repaired", () => {
  const normalized = normalizeKnowledgeCollections([
    {
      id: "same-collection",
      cards: [
        { id: "same-card", type: "quote", content: "  Old quote  " },
        { id: "same-card", type: "unknown", content: "Old note" },
        { id: "empty", content: "   " },
      ],
    },
    {
      id: "same-collection",
      title: "Second",
      cards: [{ content: "Second card", tags: [" tag ", 42] }],
    },
  ]);

  assert.equal(normalized.length, 2);
  assert.notEqual(normalized[0].id, normalized[1].id);
  assert.equal(normalized[0].title, "我的知识集");
  assert.equal(normalized[0].enabled, true);
  assert.equal(normalized[0].cards.length, 2);
  assert.notEqual(normalized[0].cards[0].id, normalized[0].cards[1].id);
  assert.equal(normalized[0].cards[0].content, "Old quote");
  assert.equal(normalized[0].cards[0].provenance, "manual");
  assert.equal(normalized[0].cards[0].sourceStatus, "needs-review");
  assert.equal(normalized[0].cards[1].type, "knowledge");
  assert.equal(normalized[0].cards[1].sourceStatus, "needs-review");
  assert.deepEqual(normalized[1].cards[0].tags, ["tag"]);
  assert.ok(Number.isFinite(Date.parse(normalized[0].createdAt)));
});

test("collection normalization rejects objects without a cards array", () => {
  assert.equal(normalizeKnowledgeCollection({ title: "Broken collection" }), null);
  assert.equal(normalizeKnowledgeCollection({ title: "Broken collection", cards: null }), null);
});

test("legacy normalization gives missing and duplicate IDs stable signatures", () => {
  const legacy = [
    {
      id: "duplicate-collection",
      title: "First",
      cards: [
        { content: "No card ID" },
        { id: "duplicate-card", content: "Duplicate one" },
        { id: "duplicate-card", content: "Duplicate two" },
      ],
    },
    {
      id: "duplicate-collection",
      title: "Second",
      cards: [{ content: "Another card without an ID" }],
    },
    {
      title: "Collection without an ID",
      cards: [{ content: "Stable content" }],
    },
  ];

  const first = normalizeKnowledgeCollections(legacy);
  const second = normalizeKnowledgeCollections(legacy);
  assert.deepEqual(
    first.map((item) => ({ id: item.id, cardIds: item.cards.map((itemCard) => itemCard.id) })),
    second.map((item) => ({ id: item.id, cardIds: item.cards.map((itemCard) => itemCard.id) })),
  );
  assert.equal(knowledgeCollectionsSignature(first), knowledgeCollectionsSignature(second));
});

test("manual cards and collection/card CRUD keep normalized data", () => {
  const quote = createManualCard({
    type: "quote",
    content: "  An unverified quotation.  ",
    tags: [" ethics ", ""],
  });
  assert.equal(quote.content, "An unverified quotation.");
  assert.equal(quote.sourceStatus, "needs-review");
  assert.deepEqual(quote.tags, ["ethics"]);

  const question = createManualCard({ type: "question", content: "Why?" });
  assert.equal(question.reflection, "Why?");
  assert.equal(question.provenance, "manual");

  const initial = createManualCollection({
    collectionTitle: "  My notes  ",
    collectionDescription: "  Small set  ",
    type: "knowledge",
    content: "First",
  });
  let collections = updateKnowledgeCollection([initial], initial.id, {
    title: "Renamed",
    enabled: false,
  });
  assert.equal(collections[0].title, "Renamed");
  assert.equal(collections[0].enabled, false);

  const colliding = { ...quote, id: collections[0].cards[0].id };
  collections = addKnowledgeCard(collections, initial.id, colliding);
  assert.equal(collections[0].cards.length, 2);
  assert.notEqual(collections[0].cards[0].id, collections[0].cards[1].id);

  const addedId = collections[0].cards[1].id;
  collections = updateKnowledgeCard(collections, initial.id, addedId, {
    content: "Updated quotation",
    tags: ["updated"],
  });
  assert.equal(collections[0].cards[1].content, "Updated quotation");
  assert.deepEqual(collections[0].cards[1].tags, ["updated"]);

  collections = removeKnowledgeCard(collections, initial.id, addedId);
  assert.equal(collections[0].cards.length, 1);
});

test("append import previews and skips target-level duplicates while repairing ID collisions", () => {
  const current = [collection()];
  const incoming = collection({
    id: "incoming",
    cards: [
      card({ id: "duplicate-target", content: " alpha\u3000" }),
      card({ id: "card-a", content: "Gamma" }),
      card({ id: "duplicate-incoming", content: " G A M M A " }),
      card({ id: "needs-review", type: "quote", content: "Delta", sourceStatus: "needs-review" }),
    ],
  });
  const target = { mode: "append", collectionId: "collection-a" };
  const preview = previewKnowledgeImport(current, incoming, target);

  assert.equal(preview.incomingCount, 4);
  assert.equal(preview.acceptedCount, 2);
  assert.equal(preview.addedCount, 2);
  assert.equal(preview.duplicateCount, 2);
  assert.equal(preview.needsReviewCount, 1);
  assert.equal(preview.previewCards.length, 2);
  assert.equal(preview.cards.length, 2);

  const result = applyKnowledgeImport(current, incoming, target);
  assert.equal(result.collections.length, 1);
  assert.equal(result.collections[0].cards.length, 3);
  assert.equal(new Set(result.collections[0].cards.map((item) => item.id)).size, 3);
  assert.notEqual(result.collections[0].cards[1].id, "card-a");
});

test("new-target import stays isolated and repairs collection/card collisions", () => {
  const current = [collection()];
  const incoming = collection({
    cards: [
      card({ content: "Alpha" }),
      card({ id: "second", content: " A l p h a " }),
    ],
  });
  const result = applyKnowledgeImport(current, incoming, { mode: "new" });

  assert.equal(result.preview.acceptedCount, 1);
  assert.equal(result.preview.duplicateCount, 1);
  assert.equal(result.collections.length, 2);
  assert.notEqual(result.collections[0].id, result.collections[1].id);
  assert.notEqual(result.collections[0].cards[0].id, result.collections[1].cards[0].id);
  assert.equal(result.collections[1].cards[0].content, "Alpha");

  const missing = applyKnowledgeImport(current, incoming, {
    mode: "append",
    collectionId: "missing",
  });
  assert.equal(missing.preview.acceptedCount, 0);
  assert.equal(
    knowledgeCollectionsSignature(missing.collections),
    knowledgeCollectionsSignature(current),
  );
  assert.match(missing.preview.warnings.join("\n"), /目标知识集不存在/);
});

test("backup round-trip includes optional settings and accepts legacy shapes", () => {
  const current = [collection()];
  const serialized = serializeKnowledgeBackup(current, {
    theme: "archive",
    nested: { enabled: true },
  });
  const parsed = parseKnowledgeBackup(serialized);
  assert.ok(parsed.backup);
  assert.equal(parsed.source, "backup");
  assert.deepEqual(parsed.backup.settings, {
    theme: "archive",
    nested: { enabled: true },
  });
  assert.equal(
    knowledgeCollectionsSignature(parsed.backup.collections),
    knowledgeCollectionsSignature(current),
  );

  const legacySingle = parseKnowledgeBackup(JSON.stringify(collection()));
  assert.equal(legacySingle.source, "legacy-collection");
  assert.equal(legacySingle.backup.collections.length, 1);

  const legacyCollections = parseKnowledgeBackup(JSON.stringify([collection()]));
  assert.equal(legacyCollections.source, "legacy-array");
  assert.equal(legacyCollections.backup.collections.length, 1);

  const legacyCards = parseKnowledgeBackup(JSON.stringify([
    { type: "knowledge", content: "Card one" },
    { type: "question", content: "Card two", answer: "Answer" },
  ]));
  assert.equal(legacyCards.source, "legacy-array");
  assert.equal(legacyCards.backup.collections[0].cards.length, 2);

  const unsupported = parseKnowledgeBackup(JSON.stringify({
    schema: "agora-knowledge-backup",
    version: 9,
    collections: [],
  }));
  assert.equal(unsupported.backup, null);
  assert.match(unsupported.errors.join("\n"), /版本暂不受支持/);
});

test("backup parsing reports invalid collections and cards with structured totals", () => {
  const parsed = parseKnowledgeBackup(JSON.stringify({
    schema: "agora-knowledge-backup",
    version: 1,
    collections: [
      {
        title: "Mixed validity",
        cards: [
          { type: "knowledge", content: "Keep this card" },
          { type: "knowledge", content: "   " },
          { type: "question" },
          null,
        ],
      },
      42,
    ],
  }));

  assert.ok(parsed.backup);
  assert.deepEqual(parsed.stats, {
    inputCollectionCount: 2,
    importedCollectionCount: 1,
    droppedCollectionCount: 1,
    inputCardCount: 4,
    importedCardCount: 1,
    droppedCardCount: 3,
  });
  assert.match(parsed.warnings.join("\n"), /共读取 2 个知识集，其中 1 个无效知识集/);
  assert.match(parsed.warnings.join("\n"), /共读取 4 张卡片，其中 3 张无效卡片/);
});

test("backup restore refuses empty and cardless backups", () => {
  const empty = parseKnowledgeBackup(JSON.stringify({
    schema: "agora-knowledge-backup",
    version: 1,
    exportedAt: timestamp,
    collections: [],
  }));
  assert.equal(empty.backup, null);
  assert.match(empty.errors.join("\n"), /有效知识集/);

  const cardless = parseKnowledgeBackup(JSON.stringify({
    schema: "agora-knowledge-backup",
    version: 1,
    exportedAt: timestamp,
    collections: [{ id: "empty", title: "Empty", cards: [] }],
  }));
  assert.equal(cardless.backup, null);
  assert.match(cardless.errors.join("\n"), /有效卡片/);
});

test("merge restore unions cards by collection ID and content, not by title", () => {
  const current = [collection({
    title: "Same title",
    updatedAt: "2026-01-01T00:00:00.000Z",
  })];
  const incoming = [
    collection({
      title: "Newer title",
      updatedAt: "2026-02-01T00:00:00.000Z",
      cards: [
        card({ id: "incoming-duplicate", content: " A l p h a " }),
        card({ id: "card-a", content: "Beta" }),
      ],
    }),
    collection({
      id: "collection-b",
      title: "Same title",
      cards: [card({ id: "card-b", content: "Separate collection" })],
    }),
  ];
  const merged = mergeKnowledgeCollections(current, incoming);

  assert.equal(merged.length, 2);
  assert.equal(merged[0].title, "Newer title");
  assert.deepEqual(merged[0].cards.map((item) => item.content), ["Alpha", "Beta"]);
  assert.equal(new Set(merged.flatMap((item) => item.cards.map((itemCard) => itemCard.id))).size, 3);
  assert.equal(merged[1].title, "Same title");
});

test("merging the same no-ID legacy backup twice is idempotent", () => {
  const raw = JSON.stringify({
    title: "Legacy notes",
    cards: [
      { type: "knowledge", content: "First legacy card" },
      { type: "knowledge", content: "Second legacy card" },
    ],
  });
  const firstBackup = parseKnowledgeBackup(raw).backup;
  const secondBackup = parseKnowledgeBackup(raw).backup;
  assert.ok(firstBackup);
  assert.ok(secondBackup);

  const once = mergeKnowledgeCollections([], firstBackup.collections);
  const twice = mergeKnowledgeCollections(once, secondBackup.collections);
  assert.equal(once.length, 1);
  assert.equal(twice.length, 1);
  assert.equal(twice[0].cards.length, 2);
  assert.equal(knowledgeCollectionsSignature(twice), knowledgeCollectionsSignature(once));
});

test("undo snapshots restore only when collection and settings signatures still match", async () => {
  const before = [collection()];
  const after = [collection({
    cards: [card(), card({ id: "card-b", content: "Beta" })],
  })];
  const beforeSettings = { theme: "light" };
  const afterSettings = { theme: "dark" };
  const snapshot = await saveKnowledgeUndoSnapshot("restore", before, after, {
    beforeSettings,
    afterSettings,
  });

  const restored = applyKnowledgeUndoSnapshot(after, snapshot, afterSettings);
  assert.equal(restored.applied, true);
  assert.equal(
    knowledgeCollectionsSignature(restored.collections),
    knowledgeCollectionsSignature(before),
  );
  assert.deepEqual(restored.settings, beforeSettings);

  const restoredAfterRecentRefresh = applyKnowledgeUndoSnapshot(after, snapshot, {
    ...afterSettings,
    "agora-recent": "[\"newly-opened-card\"]",
  });
  assert.equal(restoredAfterRecentRefresh.applied, true);
  assert.deepEqual(restoredAfterRecentRefresh.settings, beforeSettings);

  const changed = [collection({
    cards: [card(), card({ id: "card-c", content: "Changed later" })],
  })];
  const refused = applyKnowledgeUndoSnapshot(changed, snapshot, afterSettings);
  assert.equal(refused.applied, false);
  assert.equal(refused.reason, "changed-after-operation");

  const noSettings = applyKnowledgeUndoSnapshot(after, snapshot);
  assert.equal(noSettings.applied, false);
  assert.equal(noSettings.reason, "settings-unavailable");
});

test("collection-only import undo is not invalidated by local preference changes", async () => {
  const before = [collection()];
  const after = [collection({
    cards: [card(), card({ id: "card-b", content: "Beta" })],
  })];
  const snapshot = await saveKnowledgeUndoSnapshot("import", before, after);

  const restored = applyKnowledgeUndoSnapshot(after, snapshot, {
    "agora-selected-knowledge-collection": "another-collection",
    "agora-recent": "[\"card-b\"]",
  });
  assert.equal(restored.applied, true);
  assert.equal(restored.settings, undefined);
  assert.equal(
    knowledgeCollectionsSignature(restored.collections),
    knowledgeCollectionsSignature(before),
  );
});

test("undoLastKnowledgeImport computes an undo without saving or clearing it prematurely", async () => {
  const before = [collection()];
  const after = [collection({
    cards: [card(), card({ id: "card-b", content: "Beta" })],
  })];
  const beforeSettings = { theme: "light" };
  const snapshot = {
    schema: "agora-knowledge-undo",
    version: 1,
    kind: "import",
    createdAt: timestamp,
    before,
    beforeSettings,
    afterSignature: knowledgeCollectionsSignature(after),
  };
  const operations = [];
  const database = {
    transaction(_store, mode) {
      operations.push(`transaction:${mode}`);
      const transaction = {
        error: null,
        objectStore() {
          return {
            get(key) {
              operations.push(`get:${key}`);
              const request = {};
              queueMicrotask(() => {
                request.result = snapshot;
                request.onsuccess?.();
              });
              return request;
            },
            put(_value, key) {
              operations.push(`put:${key}`);
              queueMicrotask(() => transaction.oncomplete?.());
            },
            delete(key) {
              operations.push(`delete:${key}`);
              queueMicrotask(() => transaction.oncomplete?.());
            },
          };
        },
      };
      return transaction;
    },
    close() {
      operations.push("close");
    },
  };

  await withMockIndexedDB({
    open() {
      operations.push("open");
      const request = {};
      queueMicrotask(() => {
        request.result = database;
        request.onsuccess?.();
      });
      return request;
    },
  }, async () => {
    const result = await undoLastKnowledgeImport(after);
    assert.equal(result.applied, true);
    assert.deepEqual(result.settings, beforeSettings);
    assert.equal(
      knowledgeCollectionsSignature(result.collections),
      knowledgeCollectionsSignature(before),
    );
  });

  assert.deepEqual(operations, [
    "open",
    "transaction:readonly",
    "get:agora-custom-knowledge-last-undo",
    "close",
  ]);
});
