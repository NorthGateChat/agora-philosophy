import type { Thought } from "../content/philosophy";

export type KnowledgeCardType = "quote" | "knowledge" | "question";
export type KnowledgeProvenance = "manual" | "material" | "generated";
export type KnowledgeSourceStatus = "verified" | "needs-review";

export type KnowledgeCard = {
  id: string;
  type: KnowledgeCardType;
  title?: string;
  content: string;
  englishContent?: string;
  explanation?: string;
  englishExplanation?: string;
  answer?: string;
  author?: string;
  work?: string;
  source?: string;
  sourceQuote?: string;
  tags: string[];
  reflection?: string;
  provenance: KnowledgeProvenance;
  sourceStatus: KnowledgeSourceStatus;
};

export type KnowledgeCollection = {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
  cards: KnowledgeCard[];
};

export type KnowledgeImportMode = "material" | "generated";

export type PromptOptions = {
  mode: KnowledgeImportMode;
  collectionTitle?: string;
  material?: string;
  topic?: string;
  audience?: string;
  difficulty?: string;
  count: number;
  cardTypes: KnowledgeCardType[];
  language: "zh" | "bilingual";
};

export type ParsedKnowledgeImport = {
  collection: KnowledgeCollection | null;
  errors: string[];
  warnings: string[];
};

export type CreateManualCardInput = {
  type: KnowledgeCardType;
  title?: string;
  content: string;
  englishContent?: string;
  explanation?: string;
  englishExplanation?: string;
  answer?: string;
  author?: string;
  work?: string;
  source?: string;
  sourceQuote?: string;
  tags?: string[];
  reflection?: string;
  sourceStatus?: KnowledgeSourceStatus;
};

export type KnowledgeImportTarget =
  | { mode: "new" }
  | { mode: "append"; collectionId: string };

export type KnowledgeImportPreview = {
  target: KnowledgeImportTarget;
  incomingCount: number;
  acceptedCount: number;
  /** Compatibility alias for UI callers that describe accepted cards as added. */
  addedCount: number;
  duplicateCount: number;
  needsReviewCount: number;
  duplicateCardIds: string[];
  warnings: string[];
  previewCards: KnowledgeCard[];
  /** Compatibility alias for previewCards. */
  cards: KnowledgeCard[];
};

export type KnowledgeImportResult = {
  collections: KnowledgeCollection[];
  preview: KnowledgeImportPreview;
};

export type KnowledgeImportSource = ParsedKnowledgeImport | KnowledgeCollection | null;

export type KnowledgeBackupSettings = Record<string, unknown>;

export type KnowledgeBackupV1 = {
  schema: "agora-knowledge-backup";
  version: 1;
  exportedAt: string;
  collections: KnowledgeCollection[];
  settings?: KnowledgeBackupSettings;
};

export type ParsedKnowledgeBackup = {
  backup: KnowledgeBackupV1 | null;
  errors: string[];
  warnings: string[];
  source: "backup" | "legacy-collection" | "legacy-array" | null;
  stats: KnowledgeBackupParseStats;
};

export type KnowledgeBackupParseStats = {
  inputCollectionCount: number;
  importedCollectionCount: number;
  droppedCollectionCount: number;
  inputCardCount: number;
  importedCardCount: number;
  droppedCardCount: number;
};

export type KnowledgeUndoKind = "import" | "restore";

export type KnowledgeUndoSnapshot = {
  schema: "agora-knowledge-undo";
  version: 1;
  kind: KnowledgeUndoKind;
  createdAt: string;
  before: KnowledgeCollection[];
  beforeSettings?: KnowledgeBackupSettings;
  afterSignature: string;
  afterSettingsSignature?: string;
};

export type KnowledgeUndoResult = {
  collections: KnowledgeCollection[];
  settings?: KnowledgeBackupSettings;
  applied: boolean;
  reason?: "not-found" | "changed-after-operation" | "settings-unavailable";
};

const databaseName = "agora-knowledge";
const storeName = "collections";
const storageKey = "agora-custom-knowledge";
const undoStorageKey = "agora-custom-knowledge-last-undo";
const legacyTimestamp = "1970-01-01T00:00:00.000Z";

function uid(prefix: string) {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}-${crypto.randomUUID()}`;
  }
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function text(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function stringList(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value.map(text).filter(Boolean).slice(0, 12);
}

function normalizeCardType(value: unknown): KnowledgeCardType {
  if (value === "quote" || value === "question") return value;
  return "knowledge";
}

function normalizeProvenance(value: unknown): KnowledgeProvenance {
  if (value === "material" || value === "generated") return value;
  return "manual";
}

function normalizeSourceStatus(value: unknown): KnowledgeSourceStatus {
  if (value === "verified" || value === "needs-review") return value;
  return "needs-review";
}

function isoDate(value: unknown, fallback: string) {
  const candidate = text(value);
  return candidate && !Number.isNaN(Date.parse(candidate)) ? candidate : fallback;
}

function cardFingerprint(content: string) {
  return content.normalize("NFKC").replace(/\s+/g, "").toLocaleLowerCase();
}

function uniqueId(prefix: string, requested: string, occupied: Set<string>) {
  if (requested && !occupied.has(requested)) {
    occupied.add(requested);
    return requested;
  }
  let generated = uid(prefix);
  while (occupied.has(generated)) generated = uid(prefix);
  occupied.add(generated);
  return generated;
}

function stableLegacyId(prefix: string, value: unknown) {
  const signature = valueSignature(value);
  return `${prefix}-legacy-${signature.slice(signature.lastIndexOf(":") + 1)}`;
}

function stableUniqueId(
  prefix: string,
  requested: string,
  occupied: Set<string>,
  seed: unknown,
) {
  const base = requested || stableLegacyId(prefix, seed);
  if (!occupied.has(base)) {
    occupied.add(base);
    return base;
  }
  let suffix = 2;
  while (occupied.has(`${base}-${suffix}`)) suffix += 1;
  const repaired = `${base}-${suffix}`;
  occupied.add(repaired);
  return repaired;
}

export function normalizeKnowledgeCard(
  value: unknown,
  fallbackProvenance: KnowledgeProvenance = "manual",
): KnowledgeCard | null {
  if (!isRecord(value)) return null;
  const content = text(value.content);
  if (!content) return null;
  const type = normalizeCardType(value.type);
  const provenance = value.provenance === undefined
    ? fallbackProvenance
    : normalizeProvenance(value.provenance);
  return {
    id: text(value.id) || stableLegacyId("card", value),
    type,
    title: text(value.title) || undefined,
    content,
    englishContent: text(value.englishContent) || undefined,
    explanation: text(value.explanation) || undefined,
    englishExplanation: text(value.englishExplanation) || undefined,
    answer: text(value.answer) || undefined,
    author: text(value.author) || undefined,
    work: text(value.work) || undefined,
    source: text(value.source) || undefined,
    sourceQuote: text(value.sourceQuote) || undefined,
    tags: stringList(value.tags),
    reflection: text(value.reflection) || undefined,
    provenance,
    sourceStatus: normalizeSourceStatus(value.sourceStatus),
  };
}

export function normalizeKnowledgeCollection(value: unknown): KnowledgeCollection | null {
  if (!isRecord(value) || !Array.isArray(value.cards)) return null;
  const occupiedCardIds = new Set<string>();
  const cards = value.cards.flatMap((item) => {
    const card = normalizeKnowledgeCard(item);
    if (!card) return [];
    return [{
      ...card,
      id: stableUniqueId("card", card.id, occupiedCardIds, item),
    }];
  });
  const createdAt = isoDate(value.createdAt, legacyTimestamp);
  return {
    id: text(value.id) || stableLegacyId("collection", value),
    title: text(value.title) || "我的知识集",
    description: text(value.description),
    enabled: typeof value.enabled === "boolean" ? value.enabled : true,
    createdAt,
    updatedAt: isoDate(value.updatedAt, createdAt),
    cards,
  };
}

export function normalizeKnowledgeCollections(value: unknown): KnowledgeCollection[] {
  if (!Array.isArray(value)) return [];
  const occupiedCollectionIds = new Set<string>();
  return value.flatMap((item) => {
    const collection = normalizeKnowledgeCollection(item);
    if (!collection) return [];
    return [{
      ...collection,
      id: stableUniqueId("collection", collection.id, occupiedCollectionIds, item),
    }];
  });
}

function normalizeJson(raw: string) {
  return raw.trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/, "");
}

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(databaseName, 1);
    request.onupgradeneeded = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains(storeName)) {
        database.createObjectStore(storeName);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function readDatabaseValue(key: string): Promise<unknown> {
  const database = await openDatabase();
  try {
    return await new Promise<unknown>((resolve, reject) => {
      const transaction = database.transaction(storeName, "readonly");
      const request = transaction.objectStore(storeName).get(key);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  } finally {
    database.close();
  }
}

async function writeDatabaseValue(key: string, value: unknown) {
  const database = await openDatabase();
  try {
    await new Promise<void>((resolve, reject) => {
      const transaction = database.transaction(storeName, "readwrite");
      transaction.objectStore(storeName).put(value, key);
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
      transaction.onabort = () => reject(transaction.error);
    });
  } finally {
    database.close();
  }
}

async function deleteDatabaseValue(key: string) {
  const database = await openDatabase();
  try {
    await new Promise<void>((resolve, reject) => {
      const transaction = database.transaction(storeName, "readwrite");
      transaction.objectStore(storeName).delete(key);
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
      transaction.onabort = () => reject(transaction.error);
    });
  } finally {
    database.close();
  }
}

export async function loadKnowledgeCollections(): Promise<KnowledgeCollection[]> {
  if (typeof indexedDB === "undefined") return [];
  return normalizeKnowledgeCollections(await readDatabaseValue(storageKey));
}

export async function saveKnowledgeCollections(collections: KnowledgeCollection[]) {
  if (typeof indexedDB === "undefined") return;
  await writeDatabaseValue(storageKey, normalizeKnowledgeCollections(collections));
}

export function createKnowledgePrompt(options: PromptOptions) {
  const typeNames = options.cardTypes.map((type) => ({
    quote: "原文摘录卡",
    knowledge: "知识解释卡",
    question: "问题卡",
  })[type]).join("、");
  const bilingual = options.language === "bilingual"
    ? "每张卡同时给出 englishContent；解释如能可靠翻译，也给出 englishExplanation。"
    : "只输出中文；不要为了双语而牺牲准确性。";
  const sharedRules = `
你是「未定稿 / NOTHING FINAL」的知识编辑。请把内容整理成可供反复阅读、逐张展示的知识卡，并根据内容自拟一个简洁、准确、不故作玄虚的知识集名称。

知识集名称：由你根据内容拟定
读者：${options.audience || "有好奇心的普通读者"}
难度：${options.difficulty || "入门到进阶之间"}
数量：${Math.max(1, Math.min(options.count, 60))} 张
卡片类型：${typeNames}
${bilingual}

编辑规则：
1. 每张卡只承载一个可独立理解的重点，正文宜在 25–110 个汉字。
2. quote 只能逐字摘录，必须同时填写 sourceQuote、author、work、source；无法确认逐字原文时改为 knowledge，绝不编造引文。
3. knowledge 用自己的话准确解释，不使用伪装成名言的引号。
4. question 必须是有明确学习价值的问题，并在 answer 中给出简洁答案。
5. explanation 说明“为什么重要、容易误解在哪里”；reflection 给出一个能联系现实的追问。
6. tags 使用 1–4 个短标签。未知字段留空，不要猜测页码、网址或出处。
7. 只输出合法 JSON，不要 Markdown，不要前后说明。

严格使用以下结构：
{
  "title": "知识集名称",
  "description": "一句话说明",
  "cards": [
    {
      "type": "quote | knowledge | question",
      "title": "可选短标题",
      "content": "卡片正文",
      "englishContent": "可选英文",
      "explanation": "解释",
      "englishExplanation": "可选英文解释",
      "answer": "仅问题卡需要",
      "author": "作者或机构",
      "work": "作品或文献",
      "source": "可核查的来源说明",
      "sourceQuote": "仅原文摘录卡需要，须与材料逐字一致",
      "tags": ["标签"],
      "reflection": "留给读者的问题"
    }
  ]
}`.trim();

  if (options.mode === "material") {
    return `${sharedRules}\n\n我会在当前对话中上传文件、粘贴网页或补充笔记。请把这些内容视为唯一允许引用的材料：\n1. 文件读取、内容识别、知识集命名与卡片拆分都由你在当前对话中完成，不要让我先整理标题或复制全文。\n2. 忠于材料，不补写材料没有提供的事实；需要跨材料综合时，在 explanation 中说明。\n3. quote 的 content 与 sourceQuote 必须逐字来自材料，并尽量用文件名、章节或页码填写 source；无法确认时改写为 knowledge。\n4. 如果当前还没有收到任何材料，只用一句话提醒我上传文件或粘贴内容，不要开始生成。\n5. 收到材料后，只输出上述结构的合法 JSON；title 和 description 也由你完成。`;
  }

  return `${sharedRules}\n\n请围绕主题“${options.topic?.trim() || "（填写主题）"}”生成一套结构完整的知识卡，并自行决定知识集标题与一句话说明。凡涉及逐字引文，必须是你能高置信确认的原文并给出可核查出处；否则一律写成 knowledge 卡。生成内容将由用户复核后导入。`;
}

export function parseKnowledgeImport(
  raw: string,
  provenance: KnowledgeProvenance,
  material = "",
): ParsedKnowledgeImport {
  const errors: string[] = [];
  const warnings: string[] = [];
  let parsed: unknown;
  try {
    parsed = JSON.parse(normalizeJson(raw));
  } catch {
    return { collection: null, errors: ["无法读取 JSON，请让模型只输出 JSON 后再试。"], warnings };
  }

  const object = Array.isArray(parsed) ? { title: "我的知识集", cards: parsed } : parsed;
  if (!object || typeof object !== "object") {
    return { collection: null, errors: ["导入内容不是有效的知识集。"], warnings };
  }

  const value = object as Record<string, unknown>;
  if (!Array.isArray(value.cards) || value.cards.length === 0) {
    return { collection: null, errors: ["没有找到 cards 数组，或卡片数量为 0。"], warnings };
  }

  const cards: KnowledgeCard[] = [];
  const seen = new Set<string>();
  const canVerifyMaterial = provenance === "material" && Boolean(material.trim());
  value.cards.slice(0, 200).forEach((item, index) => {
    if (!item || typeof item !== "object") {
      warnings.push(`第 ${index + 1} 张卡格式不正确，已跳过。`);
      return;
    }
    const card = item as Record<string, unknown>;
    const content = text(card.content);
    if (!content) {
      warnings.push(`第 ${index + 1} 张卡没有正文，已跳过。`);
      return;
    }
    const fingerprint = cardFingerprint(content);
    if (seen.has(fingerprint)) {
      warnings.push(`第 ${index + 1} 张卡与前文重复，已跳过。`);
      return;
    }
    seen.add(fingerprint);

    let type = normalizeCardType(card.type);
    const sourceQuote = text(card.sourceQuote);
    let sourceStatus: KnowledgeSourceStatus = "needs-review";
    if (type === "quote" && provenance === "material") {
      if (canVerifyMaterial && sourceQuote && material.includes(sourceQuote) && content.includes(sourceQuote)) {
        sourceStatus = "verified";
      } else if (canVerifyMaterial) {
        type = "knowledge";
        warnings.push(`第 ${index + 1} 张卡的引文无法在材料中逐字找到，已改为知识解释卡。`);
      }
    } else if (type !== "quote" && provenance === "material") {
      sourceStatus = canVerifyMaterial ? "verified" : "needs-review";
    }

    cards.push({
      id: uid("card"),
      type,
      title: text(card.title) || undefined,
      content,
      englishContent: text(card.englishContent) || undefined,
      explanation: text(card.explanation) || undefined,
      englishExplanation: text(card.englishExplanation) || undefined,
      answer: text(card.answer) || undefined,
      author: text(card.author) || undefined,
      work: text(card.work) || undefined,
      source: text(card.source) || undefined,
      sourceQuote: sourceQuote || undefined,
      tags: stringList(card.tags),
      reflection: text(card.reflection) || undefined,
      provenance,
      sourceStatus,
    });
  });

  if (cards.length === 0) errors.push("没有可导入的有效卡片。请检查正文和 JSON 结构。");
  if (value.cards.length > 200) warnings.push("单次最多导入 200 张卡，其余内容已忽略。 ");
  if (provenance === "material" && !canVerifyMaterial) {
    warnings.push("未定稿未读取原始材料，已保留 AI 提供的引文与来源，但将其标记为待核查。");
  }

  const now = new Date().toISOString();
  return {
    collection: errors.length ? null : {
      id: uid("collection"),
      title: text(value.title) || "我的知识集",
      description: text(value.description),
      enabled: true,
      createdAt: now,
      updatedAt: now,
      cards,
    },
    errors,
    warnings,
  };
}

export function createManualCard(input: CreateManualCardInput): KnowledgeCard {
  const type = normalizeCardType(input.type);
  const source = text(input.source);
  const work = text(input.work);
  const sourceStatus = input.sourceStatus === "verified" ? "verified" : "needs-review";
  return {
    id: uid("card"),
    type,
    title: text(input.title) || undefined,
    content: text(input.content),
    englishContent: text(input.englishContent) || undefined,
    explanation: text(input.explanation) || undefined,
    englishExplanation: text(input.englishExplanation) || undefined,
    answer: text(input.answer) || undefined,
    author: text(input.author) || undefined,
    work: work || undefined,
    source: source || undefined,
    sourceQuote: text(input.sourceQuote) || undefined,
    tags: stringList(input.tags),
    reflection: text(input.reflection)
      || (type === "question" ? text(input.content) : undefined),
    provenance: "manual",
    sourceStatus,
  };
}

export function createManualCollection(input: CreateManualCardInput & {
  collectionTitle: string;
  collectionDescription?: string;
}): KnowledgeCollection {
  const now = new Date().toISOString();
  return {
    id: uid("collection"),
    title: input.collectionTitle.trim() || "我的知识集",
    description: input.collectionDescription?.trim() || "由我整理的知识卡",
    enabled: true,
    createdAt: now,
    updatedAt: now,
    cards: [createManualCard(input)],
  } satisfies KnowledgeCollection;
}

export function updateKnowledgeCollection(
  collections: KnowledgeCollection[],
  collectionId: string,
  patch: Partial<Pick<KnowledgeCollection, "title" | "description" | "enabled">>,
): KnowledgeCollection[] {
  const normalized = normalizeKnowledgeCollections(collections);
  return normalized.map((collection) => {
    if (collection.id !== collectionId) return collection;
    return {
      ...collection,
      title: patch.title === undefined ? collection.title : text(patch.title) || collection.title,
      description: patch.description === undefined ? collection.description : text(patch.description),
      enabled: typeof patch.enabled === "boolean" ? patch.enabled : collection.enabled,
      updatedAt: new Date().toISOString(),
    };
  });
}

export function addKnowledgeCard(
  collections: KnowledgeCollection[],
  collectionId: string,
  input: KnowledgeCard | CreateManualCardInput,
): KnowledgeCollection[] {
  const normalized = normalizeKnowledgeCollections(collections);
  if (!normalized.some((collection) => collection.id === collectionId)) return normalized;
  const card = "id" in input
    ? normalizeKnowledgeCard(input, "manual")
    : createManualCard(input);
  if (!card?.content) return normalized;
  const occupiedIds = new Set(normalized.flatMap((collection) => collection.cards.map((item) => item.id)));
  const nextCard = { ...card, id: uniqueId("card", card.id, occupiedIds) };
  return normalized.map((collection) => collection.id === collectionId
    ? { ...collection, cards: [...collection.cards, nextCard], updatedAt: new Date().toISOString() }
    : collection);
}

export function updateKnowledgeCard(
  collections: KnowledgeCollection[],
  collectionId: string,
  cardId: string,
  patch: Partial<Omit<KnowledgeCard, "id">>,
): KnowledgeCollection[] {
  const normalized = normalizeKnowledgeCollections(collections);
  return normalized.map((collection) => {
    if (collection.id !== collectionId) return collection;
    let changed = false;
    const cards = collection.cards.map((card) => {
      if (card.id !== cardId) return card;
      const next = normalizeKnowledgeCard({ ...card, ...patch, id: card.id }, card.provenance);
      if (!next) return card;
      changed = true;
      return { ...next, id: card.id };
    });
    return changed ? { ...collection, cards, updatedAt: new Date().toISOString() } : collection;
  });
}

export function removeKnowledgeCard(
  collections: KnowledgeCollection[],
  collectionId: string,
  cardId: string,
): KnowledgeCollection[] {
  const normalized = normalizeKnowledgeCollections(collections);
  return normalized.map((collection) => {
    if (collection.id !== collectionId) return collection;
    const cards = collection.cards.filter((card) => card.id !== cardId);
    return cards.length === collection.cards.length
      ? collection
      : { ...collection, cards, updatedAt: new Date().toISOString() };
  });
}

function resolveImportSource(source: KnowledgeImportSource) {
  if (!source) return { collection: null, warnings: [] as string[] };
  if ("collection" in source) {
    return {
      collection: source.collection ? normalizeKnowledgeCollection(source.collection) : null,
      warnings: [...source.errors, ...source.warnings],
    };
  }
  return { collection: normalizeKnowledgeCollection(source), warnings: [] as string[] };
}

function prepareKnowledgeImport(
  collections: KnowledgeCollection[],
  source: KnowledgeImportSource,
  target: KnowledgeImportTarget,
) {
  const normalized = normalizeKnowledgeCollections(collections);
  const resolved = resolveImportSource(source);
  const warnings = [...resolved.warnings];
  const incoming = resolved.collection;
  const targetCollection = target.mode === "append"
    ? normalized.find((collection) => collection.id === target.collectionId)
    : undefined;

  if (target.mode === "append" && !targetCollection) {
    warnings.push("目标知识集不存在，未导入任何卡片。");
  }

  const fingerprints = new Set(
    targetCollection?.cards.map((card) => cardFingerprint(card.content)) ?? [],
  );
  const previewCards: KnowledgeCard[] = [];
  const duplicateCardIds: string[] = [];
  for (const card of incoming?.cards ?? []) {
    const fingerprint = cardFingerprint(card.content);
    if (fingerprints.has(fingerprint)) {
      duplicateCardIds.push(card.id);
      continue;
    }
    fingerprints.add(fingerprint);
    previewCards.push(card);
  }

  if (duplicateCardIds.length) {
    warnings.push(`发现 ${duplicateCardIds.length} 张正文重复的卡片，已跳过。`);
  }
  if (!incoming) warnings.push("没有可导入的知识集。");

  const canApply = target.mode === "new" || Boolean(targetCollection);
  const accepted = canApply ? previewCards : [];
  const preview: KnowledgeImportPreview = {
    target,
    incomingCount: incoming?.cards.length ?? 0,
    acceptedCount: accepted.length,
    addedCount: accepted.length,
    duplicateCount: duplicateCardIds.length,
    needsReviewCount: accepted.filter((card) => card.sourceStatus === "needs-review").length,
    duplicateCardIds,
    warnings,
    previewCards: accepted.map((card) => ({ ...card, tags: [...card.tags] })),
    cards: accepted.map((card) => ({ ...card, tags: [...card.tags] })),
  };
  return { normalized, incoming, targetCollection, accepted, preview };
}

export function previewKnowledgeImport(
  collections: KnowledgeCollection[],
  source: KnowledgeImportSource,
  target: KnowledgeImportTarget,
): KnowledgeImportPreview {
  return prepareKnowledgeImport(collections, source, target).preview;
}

export function applyKnowledgeImport(
  collections: KnowledgeCollection[],
  source: KnowledgeImportSource,
  target: KnowledgeImportTarget,
): KnowledgeImportResult {
  const prepared = prepareKnowledgeImport(collections, source, target);
  const { normalized, incoming, accepted, preview } = prepared;
  if (!incoming || accepted.length === 0) return { collections: normalized, preview };

  const occupiedCardIds = new Set(
    normalized.flatMap((collection) => collection.cards.map((card) => card.id)),
  );
  const cards = accepted.map((card) => ({
    ...card,
    tags: [...card.tags],
    id: uniqueId("card", card.id, occupiedCardIds),
  }));
  const now = new Date().toISOString();

  if (target.mode === "append") {
    return {
      collections: normalized.map((collection) => collection.id === target.collectionId
        ? { ...collection, cards: [...collection.cards, ...cards], updatedAt: now }
        : collection),
      preview,
    };
  }

  const occupiedCollectionIds = new Set(normalized.map((collection) => collection.id));
  const collection: KnowledgeCollection = {
    ...incoming,
    id: uniqueId("collection", incoming.id, occupiedCollectionIds),
    cards,
    updatedAt: now,
  };
  return { collections: [...normalized, collection], preview };
}

function cloneSettings(value: unknown): KnowledgeBackupSettings | undefined {
  if (!isRecord(value)) return undefined;
  try {
    const cloned = JSON.parse(JSON.stringify(value)) as unknown;
    return isRecord(cloned) ? cloned : undefined;
  } catch {
    return undefined;
  }
}

function canonicalize(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (!isRecord(value)) return value;
  return Object.keys(value).sort().reduce<Record<string, unknown>>((result, key) => {
    if (value[key] !== undefined) result[key] = canonicalize(value[key]);
    return result;
  }, {});
}

function valueSignature(value: unknown) {
  const serialized = JSON.stringify(canonicalize(value)) ?? "null";
  let hash = 2166136261;
  for (let index = 0; index < serialized.length; index += 1) {
    hash ^= serialized.charCodeAt(index);
    hash = Math.imul(hash, 16777619) >>> 0;
  }
  return `v1:${serialized.length}:${hash.toString(16).padStart(8, "0")}`;
}

function knowledgeUndoSettingsSignature(settings: KnowledgeBackupSettings) {
  const comparable = { ...settings };
  // Recent-card history is refreshed automatically as the new-tab page opens.
  // It must not make an otherwise untouched bulk restore impossible to undo.
  delete comparable["agora-recent"];
  return valueSignature(comparable);
}

export function knowledgeCollectionsSignature(collections: KnowledgeCollection[]) {
  return valueSignature(normalizeKnowledgeCollections(collections));
}

export function serializeKnowledgeBackup(
  collections: KnowledgeCollection[],
  settings?: KnowledgeBackupSettings,
) {
  const backup: KnowledgeBackupV1 = {
    schema: "agora-knowledge-backup",
    version: 1,
    exportedAt: new Date().toISOString(),
    collections: normalizeKnowledgeCollections(collections),
  };
  const safeSettings = cloneSettings(settings);
  if (safeSettings) backup.settings = safeSettings;
  return JSON.stringify(backup, null, 2);
}

function knowledgeBackupParseStats(
  rawCollections: unknown[],
  collections: KnowledgeCollection[],
): KnowledgeBackupParseStats {
  const inputCardCount = rawCollections.reduce<number>((count, collection) => {
    if (!isRecord(collection) || !Array.isArray(collection.cards)) return count;
    return count + collection.cards.length;
  }, 0);
  const importedCardCount = collections.reduce(
    (count, collection) => count + collection.cards.length,
    0,
  );
  return {
    inputCollectionCount: rawCollections.length,
    importedCollectionCount: collections.length,
    droppedCollectionCount: Math.max(0, rawCollections.length - collections.length),
    inputCardCount,
    importedCardCount,
    droppedCardCount: Math.max(0, inputCardCount - importedCardCount),
  };
}

function emptyKnowledgeBackupParseStats(): KnowledgeBackupParseStats {
  return knowledgeBackupParseStats([], []);
}

export function parseKnowledgeBackup(raw: string): ParsedKnowledgeBackup {
  const errors: string[] = [];
  const warnings: string[] = [];
  let parsed: unknown;
  try {
    parsed = JSON.parse(normalizeJson(raw));
  } catch {
    return {
      backup: null,
      errors: ["无法读取备份 JSON。"],
      warnings,
      source: null,
      stats: emptyKnowledgeBackupParseStats(),
    };
  }

  let source: ParsedKnowledgeBackup["source"] = null;
  let rawCollections: unknown[] = [];
  let exportedAt = new Date().toISOString();
  let settings: KnowledgeBackupSettings | undefined;

  if (Array.isArray(parsed)) {
    source = "legacy-array";
    if (parsed.length > 0 && !parsed.some((item) => isRecord(item) && Array.isArray(item.cards))) {
      rawCollections = [{ title: "我的知识集", cards: parsed }];
      warnings.push("已将旧版卡片数组转换为一个知识集。");
    } else {
      rawCollections = parsed;
      warnings.push("已读取旧版知识集数组备份。");
    }
  } else if (isRecord(parsed) && parsed.schema === "agora-knowledge-backup") {
    source = "backup";
    if (parsed.version !== 1) {
      return {
        backup: null,
        errors: ["备份版本暂不受支持，请先使用对应版本的未定稿打开。"],
        warnings,
        source,
        stats: knowledgeBackupParseStats(
          Array.isArray(parsed.collections) ? parsed.collections : [],
          [],
        ),
      };
    }
    if (!Array.isArray(parsed.collections)) {
      return {
        backup: null,
        errors: ["备份中缺少 collections 数组。"],
        warnings,
        source,
        stats: emptyKnowledgeBackupParseStats(),
      };
    }
    rawCollections = parsed.collections;
    exportedAt = isoDate(parsed.exportedAt, exportedAt);
    settings = cloneSettings(parsed.settings);
  } else if (isRecord(parsed) && Array.isArray(parsed.cards)) {
    source = "legacy-collection";
    rawCollections = [parsed];
    warnings.push("已读取旧版单知识集备份。");
  } else if (isRecord(parsed) && Array.isArray(parsed.collections)) {
    source = "legacy-array";
    rawCollections = parsed.collections;
    exportedAt = isoDate(parsed.exportedAt, exportedAt);
    settings = cloneSettings(parsed.settings);
    warnings.push("已读取旧版多知识集备份。");
  } else {
    return {
      backup: null,
      errors: ["这不是可识别的未定稿知识备份。"],
      warnings,
      source: null,
      stats: emptyKnowledgeBackupParseStats(),
    };
  }

  const collections = normalizeKnowledgeCollections(rawCollections);
  const stats = knowledgeBackupParseStats(rawCollections, collections);
  if (stats.droppedCollectionCount > 0) {
    warnings.push(
      `备份共读取 ${stats.inputCollectionCount} 个知识集，其中 ${stats.droppedCollectionCount} 个无效知识集已跳过。`,
    );
  }
  if (stats.droppedCardCount > 0) {
    warnings.push(
      `备份共读取 ${stats.inputCardCount} 张卡片，其中 ${stats.droppedCardCount} 张无效卡片已跳过。`,
    );
  }
  if (collections.length === 0) {
    errors.push("备份中没有可恢复的有效知识集。");
  } else if (stats.importedCardCount === 0) {
    errors.push("备份中没有可恢复的有效卡片。");
  }
  const backup: KnowledgeBackupV1 = {
    schema: "agora-knowledge-backup",
    version: 1,
    exportedAt,
    collections,
  };
  if (settings) backup.settings = settings;
  return {
    backup: errors.length ? null : backup,
    errors,
    warnings,
    source,
    stats,
  };
}

export function mergeKnowledgeCollections(
  current: KnowledgeCollection[],
  incoming: KnowledgeCollection[],
): KnowledgeCollection[] {
  const merged = normalizeKnowledgeCollections(current).map((collection) => ({
    ...collection,
    cards: collection.cards.map((card) => ({ ...card, tags: [...card.tags] })),
  }));
  const normalizedIncoming = normalizeKnowledgeCollections(incoming);
  const occupiedCardIds = new Set(merged.flatMap((collection) => collection.cards.map((card) => card.id)));

  for (const nextCollection of normalizedIncoming) {
    const existingIndex = merged.findIndex((collection) => collection.id === nextCollection.id);
    if (existingIndex < 0) {
      const seen = new Set<string>();
      const cards = nextCollection.cards.flatMap((card) => {
        const fingerprint = cardFingerprint(card.content);
        if (seen.has(fingerprint)) return [];
        seen.add(fingerprint);
        return [{
          ...card,
          tags: [...card.tags],
          id: uniqueId("card", card.id, occupiedCardIds),
        }];
      });
      merged.push({ ...nextCollection, cards });
      continue;
    }

    const existing = merged[existingIndex];
    const fingerprints = new Set(existing.cards.map((card) => cardFingerprint(card.content)));
    const cards = [...existing.cards];
    for (const card of nextCollection.cards) {
      const fingerprint = cardFingerprint(card.content);
      if (fingerprints.has(fingerprint)) continue;
      fingerprints.add(fingerprint);
      cards.push({
        ...card,
        tags: [...card.tags],
        id: uniqueId("card", card.id, occupiedCardIds),
      });
    }
    const incomingIsNewer = Date.parse(nextCollection.updatedAt) > Date.parse(existing.updatedAt);
    merged[existingIndex] = {
      ...(incomingIsNewer ? nextCollection : existing),
      id: existing.id,
      createdAt: existing.createdAt,
      updatedAt: incomingIsNewer ? nextCollection.updatedAt : existing.updatedAt,
      cards,
    };
  }
  return merged;
}

export async function saveKnowledgeUndoSnapshot(
  kind: KnowledgeUndoKind,
  before: KnowledgeCollection[],
  after: KnowledgeCollection[],
  options?: {
    beforeSettings?: KnowledgeBackupSettings;
    afterSettings?: KnowledgeBackupSettings;
  },
): Promise<KnowledgeUndoSnapshot> {
  const snapshot: KnowledgeUndoSnapshot = {
    schema: "agora-knowledge-undo",
    version: 1,
    kind,
    createdAt: new Date().toISOString(),
    before: normalizeKnowledgeCollections(before),
    afterSignature: knowledgeCollectionsSignature(after),
  };
  const beforeSettings = cloneSettings(options?.beforeSettings);
  const afterSettings = cloneSettings(options?.afterSettings);
  if (beforeSettings) snapshot.beforeSettings = beforeSettings;
  if (afterSettings) snapshot.afterSettingsSignature = knowledgeUndoSettingsSignature(afterSettings);
  if (typeof indexedDB !== "undefined") {
    await writeDatabaseValue(undoStorageKey, snapshot);
  }
  return snapshot;
}

export async function loadKnowledgeUndoSnapshot(): Promise<KnowledgeUndoSnapshot | null> {
  if (typeof indexedDB === "undefined") return null;
  const value = await readDatabaseValue(undoStorageKey);
  if (!isRecord(value)
    || value.schema !== "agora-knowledge-undo"
    || value.version !== 1
    || (value.kind !== "import" && value.kind !== "restore")
    || !Array.isArray(value.before)
    || !text(value.afterSignature)) {
    return null;
  }
  const snapshot: KnowledgeUndoSnapshot = {
    schema: "agora-knowledge-undo",
    version: 1,
    kind: value.kind,
    createdAt: isoDate(value.createdAt, new Date().toISOString()),
    before: normalizeKnowledgeCollections(value.before),
    afterSignature: text(value.afterSignature),
  };
  const beforeSettings = cloneSettings(value.beforeSettings);
  if (beforeSettings) snapshot.beforeSettings = beforeSettings;
  const afterSettingsSignature = text(value.afterSettingsSignature);
  if (afterSettingsSignature) snapshot.afterSettingsSignature = afterSettingsSignature;
  return snapshot;
}

export async function clearKnowledgeUndoSnapshot() {
  await replaceKnowledgeUndoSnapshot(null);
}

export async function replaceKnowledgeUndoSnapshot(snapshot: KnowledgeUndoSnapshot | null) {
  if (typeof indexedDB === "undefined") return;
  if (snapshot) {
    await writeDatabaseValue(undoStorageKey, snapshot);
    return;
  }
  await deleteDatabaseValue(undoStorageKey);
}

export function applyKnowledgeUndoSnapshot(
  current: KnowledgeCollection[],
  snapshot: KnowledgeUndoSnapshot,
  currentSettings?: KnowledgeBackupSettings,
): KnowledgeUndoResult {
  const normalized = normalizeKnowledgeCollections(current);
  if (knowledgeCollectionsSignature(normalized) !== snapshot.afterSignature) {
    return { collections: normalized, applied: false, reason: "changed-after-operation" };
  }
  if (snapshot.afterSettingsSignature) {
    const settings = cloneSettings(currentSettings);
    if (!settings) {
      return { collections: normalized, applied: false, reason: "settings-unavailable" };
    }
    if (knowledgeUndoSettingsSignature(settings) !== snapshot.afterSettingsSignature) {
      return { collections: normalized, applied: false, reason: "changed-after-operation" };
    }
  }
  return {
    collections: normalizeKnowledgeCollections(snapshot.before),
    settings: snapshot.beforeSettings,
    applied: true,
  };
}

export async function undoLastKnowledgeImport(
  current: KnowledgeCollection[],
  currentSettings?: KnowledgeBackupSettings,
): Promise<KnowledgeUndoResult> {
  const normalized = normalizeKnowledgeCollections(current);
  const snapshot = await loadKnowledgeUndoSnapshot();
  if (!snapshot) return { collections: normalized, applied: false, reason: "not-found" };
  // Deliberately compute only: the caller must persist collections/settings first,
  // then clear the snapshot after every required write succeeds.
  return applyKnowledgeUndoSnapshot(normalized, snapshot, currentSettings);
}

export function knowledgeCollectionsToThoughts(collections: KnowledgeCollection[]): Thought[] {
  const palette: Thought["palette"] = ["#e9e4da", "#c7bda9", "#786f61", "#292621"];
  return collections.filter((collection) => collection.enabled).flatMap((collection) => (
    collection.cards.map((card) => {
      const body = card.type === "question" && card.answer
        ? `${card.content}`
        : card.content;
      const explanation = card.explanation || card.answer || "把这张卡与自己的经验、判断和行动联系起来。";
      return {
        id: `custom:${collection.id}:${card.id}`,
        name: card.author || collection.title,
        englishName: card.author || collection.title,
        life: "我的知识集",
        englishLife: "My collection",
        school: collection.title,
        englishSchool: collection.title,
        topic: "知识",
        text: body,
        english: card.englishContent || "",
        work: card.work || card.source || collection.title,
        englishWork: card.work || card.source || collection.title,
        reflection: explanation,
        englishReflection: card.englishExplanation || explanation,
        question: card.reflection || (card.type === "question" ? card.content : "这张卡改变了你对什么的理解？"),
        englishQuestion: card.reflection || "What does this card change in your understanding?",
        context: card.answer || card.explanation,
        englishContext: card.englishExplanation || card.answer || card.explanation,
        distinction: card.sourceStatus === "needs-review" ? "这张卡的来源仍待核对，请不要把它当作已经确认的逐字引文。" : undefined,
        englishDistinction: card.sourceStatus === "needs-review" ? "This card still needs source review and should not be treated as a verified verbatim quotation." : undefined,
        palette,
        rendering: card.type === "quote" ? "short-quote" : "paraphrase",
        sourceLocator: card.source ? [card.source, card.source] : undefined,
        customKnowledge: {
          collectionId: collection.id,
          collectionTitle: collection.title,
          cardType: card.type,
          provenance: card.provenance,
          sourceStatus: card.sourceStatus,
        },
      } satisfies Thought;
    })
  ));
}
