"use client";

import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import {
  addKnowledgeCard,
  applyKnowledgeUndoSnapshot,
  applyKnowledgeImport,
  clearKnowledgeUndoSnapshot,
  createKnowledgePrompt,
  createManualCard,
  loadKnowledgeUndoSnapshot,
  mergeKnowledgeCollections,
  parseKnowledgeBackup,
  parseKnowledgeImport,
  previewKnowledgeImport,
  removeKnowledgeCard,
  replaceKnowledgeUndoSnapshot,
  saveKnowledgeUndoSnapshot,
  serializeKnowledgeBackup,
  undoLastKnowledgeImport,
  updateKnowledgeCard,
  updateKnowledgeCollection,
  type KnowledgeCard,
  type KnowledgeCardType,
  type KnowledgeCollection,
  type KnowledgeProvenance,
  type KnowledgeSourceStatus,
  type KnowledgeUndoSnapshot,
  type ParsedKnowledgeImport,
} from "../lib/customKnowledge";

type StudioView = "home" | "collection" | "card" | "manual" | "material" | "generated" | "backup";
type DestinationMode = "" | "new" | "append";
type RestoreMode = "merge" | "replace";
type StudioLanguage = "zh-hans" | "zh-hant" | "en";
type KnowledgeChangeOptions = { preservePreferences?: boolean };

type KnowledgeStudioProps = {
  open: boolean;
  collections: KnowledgeCollection[];
  language: StudioLanguage;
  returnFocusRef?: RefObject<HTMLElement | null>;
  onClose: () => void;
  onChange: (collections: KnowledgeCollection[], options?: KnowledgeChangeOptions) => Promise<void>;
};

type CardDraft = {
  type: KnowledgeCardType;
  title: string;
  content: string;
  englishContent: string;
  explanation: string;
  englishExplanation: string;
  answer: string;
  author: string;
  work: string;
  source: string;
  sourceQuote: string;
  tags: string;
  reflection: string;
  provenance: KnowledgeProvenance;
  sourceStatus: KnowledgeSourceStatus;
};

const cardTypeOptions: { id: KnowledgeCardType; label: string; englishLabel: string }[] = [
  { id: "knowledge", label: "知识", englishLabel: "Knowledge" },
  { id: "quote", label: "摘录", englishLabel: "Quote" },
  { id: "question", label: "问题", englishLabel: "Question" },
];

const emptyCardDraft: CardDraft = {
  type: "knowledge",
  title: "",
  content: "",
  englishContent: "",
  explanation: "",
  englishExplanation: "",
  answer: "",
  author: "",
  work: "",
  source: "",
  sourceQuote: "",
  tags: "",
  reflection: "",
  provenance: "manual",
  sourceStatus: "needs-review",
};

const agoraSettingKeys = [
  "agora-saved",
  "agora-blocked",
  "agora-recent",
  "agora-visual-style",
  "agora-language-mode",
  "agora-include-english-quote",
  "agora-share-format",
  "agora-onboarding-complete",
  "agora-selected-knowledge-collection",
  "agora-content-library",
] as const;

type AgoraSettingKey = (typeof agoraSettingKeys)[number];
type AgoraSettings = Partial<Record<AgoraSettingKey, string>>;

const agoraSettingKeySet = new Set<string>(agoraSettingKeys);

function isAgoraSettingKey(key: string | null): key is AgoraSettingKey {
  return Boolean(key && agoraSettingKeySet.has(key));
}

function serializeSettingValue(value: unknown) {
  if (typeof value === "string") return value;
  if (value === undefined) return null;
  try {
    return JSON.stringify(value);
  } catch {
    return null;
  }
}

function normalizeAgoraSettings(settings: Record<string, unknown>) {
  const normalized: AgoraSettings = {};
  Object.entries(settings).forEach(([key, value]) => {
    if (!isAgoraSettingKey(key)) return;
    const serialized = serializeSettingValue(value);
    if (serialized !== null) normalized[key] = serialized;
  });
  return normalized;
}

function uid(prefix: string) {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}-${crypto.randomUUID()}`;
  }
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function cardToDraft(card: KnowledgeCard): CardDraft {
  return {
    type: card.type,
    title: card.title ?? "",
    content: card.content,
    englishContent: card.englishContent ?? "",
    explanation: card.explanation ?? "",
    englishExplanation: card.englishExplanation ?? "",
    answer: card.answer ?? "",
    author: card.author ?? "",
    work: card.work ?? "",
    source: card.source ?? "",
    sourceQuote: card.sourceQuote ?? "",
    tags: card.tags.join("，"),
    reflection: card.reflection ?? "",
    provenance: card.provenance,
    sourceStatus: card.sourceStatus,
  };
}

function readAgoraSettings() {
  const settings: AgoraSettings = {};
  if (typeof window === "undefined") return settings;
  agoraSettingKeys.forEach((key) => {
    const value = window.localStorage.getItem(key);
    if (value !== null) settings[key] = value;
  });
  return settings;
}

function writeAgoraSettingsSnapshot(settings: AgoraSettings) {
  if (typeof window === "undefined") return;
  agoraSettingKeys.forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(settings, key)) {
      window.localStorage.setItem(key, settings[key] ?? "");
    } else {
      window.localStorage.removeItem(key);
    }
  });
}

function applyAgoraSettings(settings: Record<string, unknown>, replace: boolean) {
  if (typeof window === "undefined") return {} as AgoraSettings;
  const before = readAgoraSettings();
  const incoming = normalizeAgoraSettings(settings);
  const next = replace ? incoming : { ...before, ...incoming };
  try {
    writeAgoraSettingsSnapshot(next);
  } catch (error) {
    try {
      writeAgoraSettingsSnapshot(before);
    } catch {
      // The original write error is the useful one to surface.
    }
    throw error;
  }
  return next;
}

function mergeSettings(current: Record<string, unknown>, incoming: Record<string, unknown>, mode: RestoreMode) {
  const normalizedCurrent = normalizeAgoraSettings(current);
  const normalizedIncoming = normalizeAgoraSettings(incoming);
  return mode === "replace" ? normalizedIncoming : { ...normalizedCurrent, ...normalizedIncoming };
}

function localizeImportMessage(message: string, english: boolean) {
  if (!english) return message;
  const exact: Record<string, string> = {
    "无法读取 JSON，请让模型只输出 JSON 后再试。": "Could not read the JSON. Ask the AI to return JSON only, then try again.",
    "导入内容不是有效的知识集。": "This result is not a valid knowledge collection.",
    "没有找到 cards 数组，或卡片数量为 0。": "No non-empty cards array was found.",
    "没有可导入的有效卡片。请检查正文和 JSON 结构。": "No valid cards can be imported. Check the content and JSON structure.",
    "单次最多导入 200 张卡，其余内容已忽略。 ": "Up to 200 cards can be imported at once; the rest were ignored.",
    "未定稿未读取原始材料，已保留 AI 提供的引文与来源，但将其标记为待核查。": "NOTHING FINAL did not read the original material. AI-provided quotes and sources were kept, but marked as needing review.",
    "目标知识集不存在，未导入任何卡片。": "The destination collection no longer exists, so no cards were imported.",
    "没有可导入的知识集。": "No collection can be imported.",
  };
  if (exact[message]) return exact[message];
  const indexed = message.match(/^第 (\d+) 张卡(.+)$/);
  if (indexed) {
    const suffix: Record<string, string> = {
      "格式不正确，已跳过。": "has an invalid format and was skipped.",
      "没有正文，已跳过。": "has no content and was skipped.",
      "与前文重复，已跳过。": "duplicates an earlier card and was skipped.",
      "的引文无法在材料中逐字找到，已改为知识解释卡。": "contains a quote that was not found verbatim in the material, so it was changed to a knowledge card.",
    };
    return `Card ${indexed[1]} ${suffix[indexed[2]] ?? "could not be read and was skipped."}`;
  }
  const duplicate = message.match(/^发现 (\d+) 张正文重复的卡片，已跳过。$/);
  if (duplicate) return `${duplicate[1]} duplicate cards were found and skipped.`;
  return "Some details in this result could not be read.";
}

function localizeBackupMessage(message: string, english: boolean) {
  if (!english) return message;
  const exact: Record<string, string> = {
    "无法读取备份 JSON。": "Could not read the backup JSON.",
    "备份版本暂不受支持，请先使用对应版本的未定稿打开。": "This backup version is not supported yet. Open it with the matching NOTHING FINAL version first.",
    "备份中缺少 collections 数组。": "The backup is missing its collections array.",
    "这不是可识别的未定稿知识备份。": "This is not a recognized NOTHING FINAL knowledge backup.",
    "已将旧版卡片数组转换为一个知识集。": "The legacy card array was converted into one collection.",
    "已读取旧版知识集数组备份。": "A legacy collection-array backup was read.",
    "已读取旧版单知识集备份。": "A legacy single-collection backup was read.",
    "已读取旧版多知识集备份。": "A legacy multi-collection backup was read.",
    "备份中没有可恢复的有效知识集。": "The backup contains no valid collections to restore.",
    "备份中没有可恢复的有效卡片。": "The backup contains no valid cards to restore.",
  };
  if (exact[message]) return exact[message];
  const collections = message.match(/^备份共读取 (\d+) 个知识集，其中 (\d+) 个无效知识集已跳过。$/);
  if (collections) return `${collections[1]} collections were read; ${collections[2]} invalid collections were skipped.`;
  const cards = message.match(/^备份共读取 (\d+) 张卡片，其中 (\d+) 张无效卡片已跳过。$/);
  if (cards) return `${cards[1]} cards were read; ${cards[2]} invalid cards were skipped.`;
  return "Some details in this backup could not be read.";
}

function downloadJson(raw: string, filename: string) {
  const blob = new Blob([raw], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

function downloadCollection(collection: KnowledgeCollection) {
  downloadJson(
    JSON.stringify(collection, null, 2),
    `${collection.title.replace(/[\\/:*?"<>|]/g, "-") || "nothing-final-knowledge"}.json`,
  );
}

function formatDateForFilename(date: Date) {
  return date.toISOString().slice(0, 10);
}

export function KnowledgeStudio({
  open,
  collections,
  language,
  returnFocusRef,
  onClose,
  onChange,
}: KnowledgeStudioProps) {
  const [view, setView] = useState<StudioView>("home");
  const [selectedCollectionId, setSelectedCollectionId] = useState("");
  const [editingCardId, setEditingCardId] = useState<string | null>(null);
  const [collectionTitle, setCollectionTitle] = useState("");
  const [collectionDescription, setCollectionDescription] = useState("");
  const [cardDraft, setCardDraft] = useState<CardDraft>({ ...emptyCardDraft });
  const [manualDestination, setManualDestination] = useState<DestinationMode>("");
  const [manualCollectionId, setManualCollectionId] = useState("");
  const [manualCollectionTitle, setManualCollectionTitle] = useState("");
  const [manualCollectionDescription, setManualCollectionDescription] = useState("");
  const [topic, setTopic] = useState("");
  const [resultText, setResultText] = useState("");
  const [parsed, setParsed] = useState<ParsedKnowledgeImport | null>(null);
  const [importDestination, setImportDestination] = useState<DestinationMode>("");
  const [importCollectionId, setImportCollectionId] = useState("");
  const [restoreText, setRestoreText] = useState("");
  const [restoreMode, setRestoreMode] = useState<RestoreMode>("merge");
  const [undoSnapshot, setUndoSnapshot] = useState<KnowledgeUndoSnapshot | null>(null);
  const [copied, setCopied] = useState(false);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [actionError, setActionError] = useState("");
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const backButtonRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const previousViewRef = useRef<StudioView>("home");
  const restoreFileRef = useRef<HTMLInputElement | null>(null);
  const isEnglish = language === "en";

  const label = (chinese: string, english: string) => isEnglish ? english : chinese;
  const totalCards = collections.reduce((sum, collection) => sum + collection.cards.length, 0);
  const selectedCollection = collections.find((collection) => collection.id === selectedCollectionId) ?? null;
  const editingCard = selectedCollection?.cards.find((card) => card.id === editingCardId) ?? null;

  const prompt = useMemo(() => createKnowledgePrompt({
    mode: view === "material" ? "material" : "generated",
    topic,
    count: 20,
    cardTypes: ["knowledge", "question", "quote"],
    language: language === "en" ? "bilingual" : "zh",
  }), [language, topic, view]);

  const importTarget = useMemo(() => {
    if (importDestination === "new") return { mode: "new" as const };
    if (importDestination === "append" && importCollectionId) {
      return { mode: "append" as const, collectionId: importCollectionId };
    }
    return null;
  }, [importCollectionId, importDestination]);

  const importPreview = useMemo(() => {
    if (!parsed?.collection || !importTarget || parsed.errors.length) return null;
    return previewKnowledgeImport(collections, parsed, importTarget);
  }, [collections, importTarget, parsed]);

  const parsedBackup = useMemo(() => restoreText.trim() ? parseKnowledgeBackup(restoreText) : null, [restoreText]);
  const backupIncomingCollections = parsedBackup?.backup?.collections ?? [];
  const backupIncomingCards = backupIncomingCollections.reduce((sum, collection) => sum + collection.cards.length, 0);
  const backupIncomingSettings = parsedBackup?.backup?.settings ?? {};
  const safeBackupIncomingSettings = normalizeAgoraSettings(backupIncomingSettings);
  const ignoredBackupSettingCount = Math.max(
    0,
    Object.keys(backupIncomingSettings).length - Object.keys(safeBackupIncomingSettings).length,
  );
  const droppedBackupEntries = (parsedBackup?.stats.droppedCollectionCount ?? 0)
    + (parsedBackup?.stats.droppedCardCount ?? 0);
  const unsafeReplace = restoreMode === "replace" && droppedBackupEntries > 0;
  const restoredCollections = useMemo(() => {
    if (!parsedBackup?.backup) return null;
    return restoreMode === "replace"
      ? parsedBackup.backup.collections
      : mergeKnowledgeCollections(collections, parsedBackup.backup.collections);
  }, [collections, parsedBackup, restoreMode]);

  useEffect(() => {
    if (!open) return;
    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const returnFocusTarget = returnFocusRef?.current ?? previousFocusRef.current;
    const frame = window.requestAnimationFrame(() => closeButtonRef.current?.focus({ preventScroll: true }));
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
      )).filter((element) => !element.hidden && element.getClientRects().length > 0);
      if (!focusable.length) {
        event.preventDefault();
        dialogRef.current.focus({ preventScroll: true });
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const activeElement = document.activeElement;
      if (!dialogRef.current.contains(activeElement)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      } else if (event.shiftKey && activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener("keydown", handleKeyDown);
      returnFocusTarget?.focus({ preventScroll: true });
      previousFocusRef.current = null;
    };
  }, [onClose, open, returnFocusRef]);

  useEffect(() => {
    if (!open || busy) return;
    let active = true;
    void loadKnowledgeUndoSnapshot().then(async (snapshot) => {
      if (!active) return;
      if (!snapshot) {
        setUndoSnapshot(null);
        return;
      }
      const currentSettings = snapshot.afterSettingsSignature ? readAgoraSettings() : undefined;
      const validation = applyKnowledgeUndoSnapshot(collections, snapshot, currentSettings);
      if (validation.applied) {
        setUndoSnapshot(snapshot);
        return;
      }
      setUndoSnapshot(null);
      await clearKnowledgeUndoSnapshot();
    }).catch(() => {
      if (active) setActionError(isEnglish
        ? "Could not check whether the last bulk change can be undone."
        : "无法读取最近一次撤销记录。");
    });
    return () => {
      active = false;
    };
  }, [busy, collections, isEnglish, open]);

  useEffect(() => {
    if (!open) {
      previousViewRef.current = "home";
      return;
    }
    if (previousViewRef.current === view) return;
    previousViewRef.current = view;
    const frame = window.requestAnimationFrame(() => {
      (view === "home" ? closeButtonRef.current : backButtonRef.current)?.focus({ preventScroll: true });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [open, view]);

  if (!open) return null;

  const resetImport = () => {
    setTopic("");
    setResultText("");
    setParsed(null);
    setImportDestination("");
    setImportCollectionId("");
    setCopied(false);
  };

  const resetManual = () => {
    setManualDestination("");
    setManualCollectionId("");
    setManualCollectionTitle("");
    setManualCollectionDescription("");
    setCardDraft({ ...emptyCardDraft });
  };

  const resetRestore = () => {
    setRestoreText("");
    setRestoreMode("merge");
    if (restoreFileRef.current) restoreFileRef.current.value = "";
  };

  const goHome = () => {
    resetImport();
    resetManual();
    resetRestore();
    setSelectedCollectionId("");
    setEditingCardId(null);
    setCollectionTitle("");
    setCollectionDescription("");
    setActionError("");
    setView("home");
  };

  const closeStudio = () => {
    goHome();
    setNotice("");
    onClose();
  };

  const commitCollections = async (next: KnowledgeCollection[]) => {
    setBusy(true);
    setActionError("");
    try {
      await onChange(next);
      return true;
    } catch (error) {
      setActionError(error instanceof Error ? error.message : label("保存失败，请再试一次。", "Could not save. Please try again."));
      return false;
    } finally {
      setBusy(false);
    }
  };

  const openCollection = (collection: KnowledgeCollection) => {
    setSelectedCollectionId(collection.id);
    setCollectionTitle(collection.title);
    setCollectionDescription(collection.description);
    setEditingCardId(null);
    setActionError("");
    setView("collection");
  };

  const openCard = (card: KnowledgeCard | null) => {
    setEditingCardId(card?.id ?? null);
    setCardDraft(card ? cardToDraft(card) : { ...emptyCardDraft });
    setActionError("");
    setView("card");
  };

  const goBack = () => {
    if (view === "card" && selectedCollection) {
      setEditingCardId(null);
      setView("collection");
      return;
    }
    goHome();
  };

  const toggleCollection = async (collection: KnowledgeCollection) => {
    await commitCollections(updateKnowledgeCollection(collections, collection.id, {
      enabled: !collection.enabled,
    }));
  };

  const saveCollection = async () => {
    if (!selectedCollection || !collectionTitle.trim()) return;
    const saved = await commitCollections(updateKnowledgeCollection(collections, selectedCollection.id, {
      title: collectionTitle.trim(),
      description: collectionDescription.trim(),
    }));
    if (saved) setNotice(label("知识集信息已保存。", "Collection details saved."));
  };

  const deleteCollection = async () => {
    if (!selectedCollection) return;
    const confirmed = window.confirm(label(
      `删除“${selectedCollection.title}”及其中全部卡片？`,
      `Delete “${selectedCollection.title}” and all of its cards?`,
    ));
    if (!confirmed) return;
    const saved = await commitCollections(collections.filter((collection) => collection.id !== selectedCollection.id));
    if (saved) {
      setNotice(label("知识集已删除。", "Collection deleted."));
      goHome();
    }
  };

  const saveCard = async () => {
    if (!selectedCollection || !cardDraft.content.trim()) return;
    const input = {
      type: cardDraft.type,
      title: cardDraft.title,
      content: cardDraft.content,
      englishContent: cardDraft.englishContent,
      explanation: cardDraft.explanation,
      englishExplanation: cardDraft.englishExplanation,
      answer: cardDraft.answer,
      author: cardDraft.author,
      work: cardDraft.work,
      source: cardDraft.source,
      sourceQuote: cardDraft.sourceQuote,
      tags: cardDraft.tags.split(/[，,]/).map((item) => item.trim()).filter(Boolean),
      reflection: cardDraft.reflection,
      provenance: cardDraft.provenance,
      sourceStatus: cardDraft.sourceStatus,
    };
    const next = editingCard
      ? updateKnowledgeCard(collections, selectedCollection.id, editingCard.id, input)
      : addKnowledgeCard(collections, selectedCollection.id, createManualCard(input));
    const saved = await commitCollections(next);
    if (saved) {
      setNotice(editingCard
        ? label("卡片已更新。", "Card updated.")
        : label("卡片已加入知识集。", "Card added to the collection."));
      setEditingCardId(null);
      setView("collection");
    }
  };

  const deleteCard = async () => {
    if (!selectedCollection || !editingCard) return;
    const confirmed = window.confirm(label("删除这张卡片？", "Delete this card?"));
    if (!confirmed) return;
    const saved = await commitCollections(removeKnowledgeCard(
      collections,
      selectedCollection.id,
      editingCard.id,
    ));
    if (saved) {
      setNotice(label("卡片已删除。", "Card deleted."));
      setEditingCardId(null);
      setView("collection");
    }
  };

  const saveManualCard = async () => {
    if (!cardDraft.content.trim() || !manualDestination) return;
    if (manualDestination === "new" && !manualCollectionTitle.trim()) return;
    if (manualDestination === "append" && !manualCollectionId) return;
    const card = createManualCard({
      type: cardDraft.type,
      title: cardDraft.title,
      content: cardDraft.content,
      englishContent: cardDraft.englishContent,
      explanation: cardDraft.explanation,
      englishExplanation: cardDraft.englishExplanation,
      answer: cardDraft.answer,
      author: cardDraft.author,
      work: cardDraft.work,
      source: cardDraft.source,
      sourceQuote: cardDraft.sourceQuote,
      tags: cardDraft.tags.split(/[，,]/).map((item) => item.trim()).filter(Boolean),
      reflection: cardDraft.reflection,
      sourceStatus: cardDraft.sourceStatus,
    });
    let next: KnowledgeCollection[];
    if (manualDestination === "new") {
      const now = new Date().toISOString();
      next = [...collections, {
        id: uid("collection"),
        title: manualCollectionTitle.trim(),
        description: manualCollectionDescription.trim(),
        enabled: true,
        createdAt: now,
        updatedAt: now,
        cards: [card],
      }];
    } else {
      next = addKnowledgeCard(collections, manualCollectionId, card);
    }
    const saved = await commitCollections(next);
    if (saved) {
      setNotice(label("卡片已保存。", "Card saved."));
      goHome();
    }
  };

  const copyPrompt = async () => {
    if (view === "generated" && !topic.trim()) return;
    setActionError("");
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setActionError(label("无法复制提示词，请检查浏览器的剪贴板权限。", "Could not copy the prompt. Check the browser's clipboard permission."));
    }
  };

  const updateResult = (raw: string) => {
    setResultText(raw);
    setParsed(raw.trim()
      ? parseKnowledgeImport(raw, view === "material" ? "material" : "generated")
      : null);
  };

  const finishImport = async () => {
    if (!parsed?.collection || !importTarget || !importPreview) return;
    const applied = applyKnowledgeImport(collections, parsed, importTarget);
    let previousUndoSnapshot: KnowledgeUndoSnapshot | null = null;
    let snapshotSaved = false;
    setBusy(true);
    setActionError("");
    try {
      previousUndoSnapshot = await loadKnowledgeUndoSnapshot();
      const snapshot = await saveKnowledgeUndoSnapshot("import", collections, applied.collections);
      snapshotSaved = true;
      await onChange(applied.collections);
      setUndoSnapshot(snapshot);
      setNotice(label(
        `已加入 ${applied.preview.acceptedCount} 张卡，可撤销。`,
        `${applied.preview.acceptedCount} cards added. You can undo this.`,
      ));
      goHome();
    } catch (error) {
      if (snapshotSaved) {
        try {
          await replaceKnowledgeUndoSnapshot(previousUndoSnapshot);
          setUndoSnapshot(previousUndoSnapshot);
        } catch {
          // Preserve the original operation error; a stale snapshot cannot apply
          // once the collection signature differs.
        }
      }
      setActionError(error instanceof Error ? error.message : label("导入失败，请再试一次。", "Import failed. Please try again."));
    } finally {
      setBusy(false);
    }
  };

  const backupAll = () => {
    setActionError("");
    try {
      const raw = serializeKnowledgeBackup(collections, readAgoraSettings());
      downloadJson(raw, `nothing-final-backup-${formatDateForFilename(new Date())}.json`);
      setNotice(label("完整备份已下载。", "Full backup downloaded."));
    } catch (error) {
      setActionError(error instanceof Error
        ? error.message
        : label("无法创建备份，请再试一次。", "Could not create the backup. Please try again."));
    }
  };

  const loadRestoreFile = async (file: File | undefined) => {
    if (!file) return;
    setActionError("");
    try {
      setRestoreText(await file.text());
    } catch {
      setActionError(label("无法读取这个文件。", "Could not read this file."));
    }
  };

  const restoreBackup = async () => {
    if (!parsedBackup?.backup || !restoredCollections || parsedBackup.errors.length || unsafeReplace) return;
    let currentSettings: AgoraSettings;
    try {
      currentSettings = readAgoraSettings();
    } catch (error) {
      setActionError(error instanceof Error
        ? error.message
        : label("无法读取当前设置，恢复尚未开始。", "Current settings could not be read, so restore did not start."));
      return;
    }
    const nextSettings = mergeSettings(currentSettings, safeBackupIncomingSettings, restoreMode);
    if (restoreMode === "replace" && (collections.length > 0 || Object.keys(currentSettings).length > 0)) {
      const confirmed = window.confirm(label(
        `替换会移除当前的 ${collections.length} 个知识集和本机设置，再写入备份内容。仍要继续吗？`,
        `Replace will remove your current ${collections.length} collections and local settings before restoring the backup. Continue?`,
      ));
      if (!confirmed) return;
    }
    let previousUndoSnapshot: KnowledgeUndoSnapshot | null = null;
    let snapshotSaved = false;
    let collectionsWritten = false;
    setBusy(true);
    setActionError("");
    try {
      previousUndoSnapshot = await loadKnowledgeUndoSnapshot();
      const snapshot = await saveKnowledgeUndoSnapshot("restore", collections, restoredCollections, {
        beforeSettings: currentSettings,
        afterSettings: nextSettings,
      });
      snapshotSaved = true;
      await onChange(restoredCollections, { preservePreferences: true });
      collectionsWritten = true;
      applyAgoraSettings(nextSettings, true);
      setUndoSnapshot(snapshot);
      setNotice(label(
        `已恢复 ${backupIncomingCollections.length} 个知识集，可撤销。`,
        `${backupIncomingCollections.length} collections restored. You can undo this.`,
      ));
      goHome();
      window.setTimeout(() => window.location.reload(), 0);
    } catch (error) {
      let rollbackFailed = false;
      if (collectionsWritten) {
        try {
          await onChange(collections, { preservePreferences: true });
        } catch {
          rollbackFailed = true;
        }
      }
      try {
        applyAgoraSettings(currentSettings, true);
      } catch {
        rollbackFailed = true;
      }
      if (snapshotSaved && !rollbackFailed) {
        try {
          await replaceKnowledgeUndoSnapshot(previousUndoSnapshot);
          setUndoSnapshot(previousUndoSnapshot);
        } catch {
          rollbackFailed = true;
        }
      }
      const message = error instanceof Error ? error.message : label("恢复失败，请再试一次。", "Restore failed. Please try again.");
      setActionError(rollbackFailed
        ? `${message} ${label("部分内容或设置可能未能回滚，请重新打开设置检查。", "Some content or settings may not have rolled back; reopen Settings to check them.")}`
        : message);
    } finally {
      setBusy(false);
    }
  };

  const undoLastChange = async () => {
    setBusy(true);
    setActionError("");
    try {
      const currentSettings = readAgoraSettings();
      const result = await undoLastKnowledgeImport(collections, currentSettings);
      if (!result.applied) {
        const reason = {
          "not-found": label("没有可撤销的批量改动。", "There is no bulk change to undo."),
          "changed-after-operation": label("内容或设置在批量改动后又发生了变化，无法安全撤销。", "Content or settings changed after the bulk operation, so this undo is no longer safe."),
          "settings-unavailable": label("当前无法读取本机设置，暂时不能安全撤销。", "Local settings are unavailable, so this change cannot be undone safely right now."),
        }[result.reason ?? "changed-after-operation"];
        setActionError(reason);
        return;
      }
      let collectionsWritten = false;
      const preservePreferences = Boolean(result.settings);
      try {
        await onChange(
          result.collections,
          preservePreferences ? { preservePreferences: true } : undefined,
        );
        collectionsWritten = true;
        if (result.settings) applyAgoraSettings(result.settings, true);
      } catch (error) {
        let rollbackFailed = false;
        if (collectionsWritten) {
          try {
            await onChange(
              collections,
              preservePreferences ? { preservePreferences: true } : undefined,
            );
          } catch {
            rollbackFailed = true;
          }
        }
        try {
          applyAgoraSettings(currentSettings, true);
        } catch {
          rollbackFailed = true;
        }
        const message = error instanceof Error ? error.message : label("撤销失败，请再试一次。", "Undo failed. Please try again.");
        throw new Error(rollbackFailed
          ? `${message} ${label("部分本机设置可能未能回滚，请重新打开设置检查。", "Some local settings may not have rolled back; reopen Settings to check them.")}`
          : message);
      }
      setUndoSnapshot(null);
      setNotice(label("已撤销最近一次导入或恢复。", "The most recent import or restore was undone."));
      try {
        await clearKnowledgeUndoSnapshot();
      } catch {
        setActionError(label(
          "撤销已完成，但旧的撤销记录暂时未能清理。",
          "Undo completed, but the old undo record could not be cleared yet.",
        ));
      }
      if (result.settings) window.setTimeout(() => window.location.reload(), 0);
    } catch (error) {
      setActionError(error instanceof Error ? error.message : label("撤销失败，请再试一次。", "Undo failed. Please try again."));
    } finally {
      setBusy(false);
    }
  };

  const provenanceLabel = (provenance: KnowledgeProvenance) => ({
    manual: label("手动添加", "Added manually"),
    material: label("由材料整理", "Structured from material"),
    generated: label("按主题生成", "Generated from a topic"),
  })[provenance];

  const renderDestination = (
    destination: DestinationMode,
    setDestination: (value: DestinationMode) => void,
    collectionId: string,
    setCollectionId: (value: string) => void,
    prefix: string,
  ) => (
    <section className="knowledge-destination" aria-labelledby={`${prefix}-destination-title`}>
      <div className="knowledge-section-heading knowledge-section-heading-compact">
        <h3 id={`${prefix}-destination-title`}>{label("放到哪里", "Choose a destination")}</h3>
        <span>{label("需要明确选择一次", "Choose explicitly")}</span>
      </div>
      <fieldset className="knowledge-segments knowledge-destination-segments">
        <legend className="sr-only">{label("目标知识集", "Destination collection")}</legend>
        <button
          type="button"
          className={destination === "new" ? "active" : ""}
          aria-pressed={destination === "new"}
          onClick={() => setDestination("new")}
        >{label("新建知识集", "New collection")}</button>
        <button
          type="button"
          className={destination === "append" ? "active" : ""}
          aria-pressed={destination === "append"}
          disabled={!collections.length}
          onClick={() => setDestination("append")}
        >{label("加入已有知识集", "Add to existing")}</button>
      </fieldset>
      {destination === "append" ? (
        <label className="knowledge-field-full knowledge-field-compact">
          <span>{label("已有知识集", "Existing collection")}</span>
          <select value={collectionId} onChange={(event) => setCollectionId(event.target.value)}>
            <option value="">{label("请选择…", "Select one…")}</option>
            {collections.map((collection) => (
              <option key={collection.id} value={collection.id}>{collection.title} · {collection.cards.length}</option>
            ))}
          </select>
        </label>
      ) : null}
    </section>
  );

  const renderCardFields = (draft: CardDraft, setDraft: (next: CardDraft) => void) => (
    <div className="knowledge-card-fields">
      <fieldset className="knowledge-segments knowledge-card-type-segments">
        <legend>{label("卡片类型", "Card type")}</legend>
        {cardTypeOptions.map((type) => (
          <button
            key={type.id}
            type="button"
            className={draft.type === type.id ? "active" : ""}
            aria-pressed={draft.type === type.id}
            onClick={() => setDraft({ ...draft, type: type.id })}
          >{label(type.label, type.englishLabel)}</button>
        ))}
      </fieldset>

      <label className="knowledge-field-full">
        <span>{label("短标题", "Short title")}</span>
        <input value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} placeholder={label("可选", "Optional")} />
      </label>
      <div className="knowledge-field-row knowledge-field-row-bilingual">
        <label>
          <span>{label("正文", "Content")}</span>
          <textarea value={draft.content} onChange={(event) => setDraft({ ...draft, content: event.target.value })} rows={5} />
        </label>
        <label>
          <span>{label("英文正文", "English content")}</span>
          <textarea value={draft.englishContent} onChange={(event) => setDraft({ ...draft, englishContent: event.target.value })} rows={5} placeholder={label("可选", "Optional")} />
        </label>
      </div>
      {draft.type === "question" ? (
        <label className="knowledge-field-full">
          <span>{label("简洁答案", "Short answer")}</span>
          <textarea value={draft.answer} onChange={(event) => setDraft({ ...draft, answer: event.target.value })} rows={3} />
        </label>
      ) : null}
      <div className="knowledge-field-row knowledge-field-row-bilingual">
        <label>
          <span>{label("解释", "Explanation")}</span>
          <textarea value={draft.explanation} onChange={(event) => setDraft({ ...draft, explanation: event.target.value })} rows={4} placeholder={label("为什么重要、容易误解在哪里", "Why it matters and what is easy to misunderstand")} />
        </label>
        <label>
          <span>{label("英文解释", "English explanation")}</span>
          <textarea value={draft.englishExplanation} onChange={(event) => setDraft({ ...draft, englishExplanation: event.target.value })} rows={4} placeholder={label("可选", "Optional")} />
        </label>
      </div>
      <label className="knowledge-field-full">
        <span>{label("留给此刻的问题", "A question for this moment")}</span>
        <input value={draft.reflection} onChange={(event) => setDraft({ ...draft, reflection: event.target.value })} placeholder={label("可选", "Optional")} />
      </label>

      <section className="knowledge-card-source" aria-labelledby="knowledge-card-source-title">
        <div className="knowledge-section-heading knowledge-section-heading-compact">
          <h3 id="knowledge-card-source-title">{label("作者与出处", "Author and source")}</h3>
          <span>{label("不知道的字段可以留空", "Leave unknown fields blank")}</span>
        </div>
        <div className="knowledge-field-row knowledge-field-row-three">
          <label><span>{label("作者", "Author")}</span><input value={draft.author} onChange={(event) => setDraft({ ...draft, author: event.target.value })} /></label>
          <label><span>{label("作品", "Work")}</span><input value={draft.work} onChange={(event) => setDraft({ ...draft, work: event.target.value })} /></label>
          <label><span>{label("来源", "Source")}</span><input value={draft.source} onChange={(event) => setDraft({ ...draft, source: event.target.value })} placeholder={label("书目、网址或笔记位置", "Book, URL, or note location")} /></label>
        </div>
        {draft.type === "quote" ? (
          <label className="knowledge-field-full">
            <span>{label("可核对的原文", "Verifiable source quote")}</span>
            <textarea value={draft.sourceQuote} onChange={(event) => setDraft({ ...draft, sourceQuote: event.target.value })} rows={3} />
          </label>
        ) : null}
        <label className="knowledge-field-full">
          <span>{label("标签", "Tags")}</span>
          <input value={draft.tags} onChange={(event) => setDraft({ ...draft, tags: event.target.value })} placeholder={label("用逗号分隔", "Separate with commas")} />
        </label>
      </section>

      <section className="knowledge-card-verification" aria-labelledby="knowledge-verification-title">
        <div>
          <h3 id="knowledge-verification-title">{label("来源核查", "Source review")}</h3>
          <p>{label("只有你已经核对过原文或可靠出处时，才选择“已核查”。", "Choose “Verified” only after checking the original or a reliable source.")}</p>
        </div>
        <fieldset className="knowledge-segments knowledge-status-segments">
          <legend className="sr-only">{label("来源核查状态", "Source review status")}</legend>
          <button type="button" className={draft.sourceStatus === "verified" ? "active" : ""} aria-pressed={draft.sourceStatus === "verified"} onClick={() => setDraft({ ...draft, sourceStatus: "verified" })}>{label("已核查", "Verified")}</button>
          <button type="button" className={draft.sourceStatus === "needs-review" ? "active" : ""} aria-pressed={draft.sourceStatus === "needs-review"} onClick={() => setDraft({ ...draft, sourceStatus: "needs-review" })}>{label("待核查", "Needs review")}</button>
        </fieldset>
        <div className="knowledge-provenance">
          <span>{label("来源方式", "Created via")}</span>
          <strong>{provenanceLabel(draft.provenance)}</strong>
          <small>{label("这是创建记录，不会随编辑改变。", "This creation record does not change when edited.")}</small>
        </div>
      </section>
    </div>
  );

  const viewTitle = ({
    home: label("我的知识集", "My Knowledge"),
    collection: selectedCollection?.title || label("知识集", "Collection"),
    card: editingCard ? label("编辑卡片", "Edit card") : label("添加卡片", "Add card"),
    manual: label("记下一张卡", "Add one card"),
    material: label("我有一些材料", "I have material"),
    generated: label("我想学一个主题", "I want to learn a topic"),
    backup: label("恢复备份", "Restore a backup"),
  } satisfies Record<StudioView, string>)[view];

  const viewDescription = view === "home"
    ? label("把想反复记住的东西，放进新标签页。", "Bring what you want to remember into every new tab.")
    : view === "collection"
      ? label("管理名称、说明和其中的每一张卡。", "Manage its name, description, and every card inside.")
      : view === "card" || view === "manual"
        ? label("内容属于你；来源状态也由你明确确认。", "The content is yours, and you explicitly decide its source status.")
        : view === "backup"
          ? label("先看清会恢复什么，再选择合并或替换。", "Review what will be restored, then merge or replace.")
          : label("未定稿只接收整理好的卡片；材料、文件与命名都交给你常用的 AI。", "NOTHING FINAL only receives finished cards; let your preferred AI handle files, material, and naming.");

  return (
    <div className="knowledge-studio-layer" role="presentation">
      <div
        className="knowledge-studio-scrim"
        aria-hidden="true"
        onClick={closeStudio}
      />
      <section
        ref={dialogRef}
        tabIndex={-1}
        className="knowledge-studio"
        role="dialog"
        aria-modal="true"
        aria-labelledby="knowledge-studio-title"
      >
        <header className="knowledge-studio-header">
          <div>
            {view !== "home" ? (
              <button ref={backButtonRef} type="button" className="knowledge-back" onClick={goBack}>← {view === "card" && selectedCollection ? selectedCollection.title : label("我的知识", "My Knowledge")}</button>
            ) : <span className="knowledge-eyebrow">{label("未定稿 · 我的知识", "NOTHING FINAL · MY KNOWLEDGE")}</span>}
            <h2 id="knowledge-studio-title">{viewTitle}</h2>
            <p>{viewDescription}</p>
          </div>
          <button ref={closeButtonRef} type="button" className="knowledge-close" onClick={closeStudio} aria-label={label("关闭", "Close")}>×</button>
        </header>

        <div className={`knowledge-studio-body knowledge-studio-body-${view}`}>
          {actionError ? <div className="knowledge-inline-message knowledge-inline-message-error" role="alert">{actionError}</div> : null}
          {notice ? <div className="knowledge-inline-message" role="status">{notice}</div> : null}

          {view === "home" ? (
            <>
              <section className="knowledge-home-overview" aria-label={label("知识概览", "Knowledge overview") }>
                <div className="knowledge-home-summary" role="status">
                  <span>{collections.length} {label("个知识集", "collections")}</span>
                  <i aria-hidden="true">·</i>
                  <span>{totalCards} {label("张卡片", "cards")}</span>
                  <i aria-hidden="true">·</i>
                  <span>{label("仅存本机", "stored on this device")}</span>
                </div>
                <div className="knowledge-home-backup-actions">
                  <button type="button" onClick={backupAll}>{label("备份全部", "Back up all")}</button>
                  <button type="button" onClick={() => { setNotice(""); setActionError(""); setView("backup"); }}>{label("恢复", "Restore")}</button>
                </div>
              </section>

              {undoSnapshot ? (
                <div className="knowledge-undo-banner" role="status">
                  <div>
                    <strong>{label("最近一次批量改动可以撤销", "The latest bulk change can be undone")}</strong>
                    <small>{undoSnapshot.kind === "restore" ? label("恢复备份", "Backup restore") : label("AI 导入", "AI import")}</small>
                  </div>
                  <button type="button" disabled={busy} onClick={() => void undoLastChange()}>{label("撤销", "Undo")}</button>
                </div>
              ) : null}

              <section className="knowledge-start" aria-labelledby="knowledge-start-title">
                <div className="knowledge-section-heading">
                  <h3 id="knowledge-start-title">{label("添加内容", "Add content")}</h3>
                  <button type="button" className="knowledge-manual-link" onClick={() => { resetManual(); setView("manual"); }}>{label("手动写一张", "Write one manually")} →</button>
                </div>
                <div className="knowledge-paths" aria-label={label("添加知识的方式", "Ways to add knowledge") }>
                  <button type="button" onClick={() => { resetImport(); setView("material"); }}>
                    <span className="knowledge-path-index" aria-hidden="true">01</span>
                    <strong>{label("我有材料", "I have material")}</strong>
                    <small>{label("在常用 AI 里处理文章、PDF、笔记或课程文件", "Let your preferred AI handle articles, PDFs, notes, or course files")}</small>
                    <i aria-hidden="true">→</i>
                  </button>
                  <button type="button" onClick={() => { resetImport(); setView("generated"); }}>
                    <span className="knowledge-path-index" aria-hidden="true">02</span>
                    <strong>{label("我有一个主题", "I have a topic")}</strong>
                    <small>{label("只需告诉 AI 你想学什么", "Just tell AI what you want to learn")}</small>
                    <i aria-hidden="true">→</i>
                  </button>
                </div>
              </section>

              <section className="knowledge-collections" aria-labelledby="knowledge-collections-title">
                <div className="knowledge-section-heading">
                  <h3 id="knowledge-collections-title">{label("已有知识集", "Your collections")}</h3>
                  <span>{collections.length ? label("点开即可管理", "Open one to manage it") : label("还没有导入内容", "Nothing imported yet")}</span>
                </div>
                {collections.length ? collections.map((collection) => (
                  <article className="knowledge-collection-card" key={collection.id}>
                    <button
                      type="button"
                      className={`knowledge-collection-toggle ${collection.enabled ? "active" : ""}`}
                      role="switch"
                      aria-label={label(`${collection.enabled ? "停用" : "启用"}${collection.title}`, `${collection.enabled ? "Disable" : "Enable"} ${collection.title}`)}
                      aria-checked={collection.enabled}
                      disabled={busy}
                      onClick={() => void toggleCollection(collection)}
                    ><span aria-hidden="true" /></button>
                    <button type="button" className="knowledge-collection-open" onClick={() => openCollection(collection)}>
                      <strong>{collection.title}</strong>
                      <p>{collection.description || label("自定义知识集", "Custom collection")}</p>
                      <small>{collection.cards.length} {label("张卡", "cards")} · {new Set(collection.cards.flatMap((card) => card.tags)).size} {label("个标签", "tags")}</small>
                    </button>
                    <button type="button" className="knowledge-collection-arrow" onClick={() => openCollection(collection)} aria-label={label(`管理${collection.title}`, `Manage ${collection.title}`)}>→</button>
                  </article>
                )) : (
                  <div className="knowledge-empty">
                    <span aria-hidden="true">＋</span>
                    <p>{label("先从一份你真正想反复学习的材料开始。", "Start with something you genuinely want to learn more than once.")}</p>
                  </div>
                )}
              </section>
            </>
          ) : null}

          {view === "collection" && selectedCollection ? (
            <div className="knowledge-editor knowledge-collection-editor">
              <section className="knowledge-form-panel knowledge-collection-settings" aria-labelledby="knowledge-collection-settings-title">
                <div className="knowledge-section-heading">
                  <h3 id="knowledge-collection-settings-title">{label("知识集信息", "Collection details")}</h3>
                  <button
                    type="button"
                    className={`knowledge-collection-toggle ${selectedCollection.enabled ? "active" : ""}`}
                    role="switch"
                    aria-checked={selectedCollection.enabled}
                    aria-label={label(
                      `${selectedCollection.enabled ? "停用" : "启用"}知识集`,
                      `${selectedCollection.enabled ? "Disable" : "Enable"} collection`,
                    )}
                    disabled={busy}
                    onClick={() => void toggleCollection(selectedCollection)}
                  ><span aria-hidden="true" /></button>
                </div>
                <div className="knowledge-field-row">
                  <label><span>{label("名称", "Name")}</span><input value={collectionTitle} onChange={(event) => setCollectionTitle(event.target.value)} /></label>
                  <label><span>{label("一句话说明", "Description")}</span><input value={collectionDescription} onChange={(event) => setCollectionDescription(event.target.value)} /></label>
                </div>
                <div className="knowledge-editor-actions knowledge-editor-actions-between">
                  <div>
                    <button type="button" onClick={() => downloadCollection(selectedCollection)}>{label("导出这个知识集", "Export this collection")}</button>
                    <button type="button" className="knowledge-danger-action" disabled={busy} onClick={() => void deleteCollection()}>{label("删除知识集", "Delete collection")}</button>
                  </div>
                  <button type="button" className="knowledge-primary" disabled={busy || !collectionTitle.trim()} onClick={() => void saveCollection()}>{label("保存信息", "Save details")}</button>
                </div>
              </section>

              <section className="knowledge-card-list" aria-labelledby="knowledge-card-list-title">
                <div className="knowledge-section-heading">
                  <div>
                    <h3 id="knowledge-card-list-title">{label("卡片", "Cards")}</h3>
                    <span>{selectedCollection.cards.length} {label("张", "total")}</span>
                  </div>
                  <button type="button" className="knowledge-primary" onClick={() => openCard(null)}>＋ {label("添加卡片", "Add card")}</button>
                </div>
                {selectedCollection.cards.length ? (
                  <div className="knowledge-card-rows">
                    {selectedCollection.cards.map((card, index) => (
                      <button type="button" className="knowledge-card-row" key={card.id} onClick={() => openCard(card)}>
                        <span className="knowledge-card-index">{String(index + 1).padStart(2, "0")}</span>
                        <span className="knowledge-card-row-copy">
                          <strong>{card.title || card.content}</strong>
                          <small>{card.author || label(cardTypeOptions.find((type) => type.id === card.type)?.label ?? "知识", cardTypeOptions.find((type) => type.id === card.type)?.englishLabel ?? "Knowledge")}</small>
                        </span>
                        <span className={`knowledge-source-badge ${card.sourceStatus === "verified" ? "verified" : "needs-review"}`}>{card.sourceStatus === "verified" ? label("已核查", "Verified") : label("待核查", "Needs review")}</span>
                        <i aria-hidden="true">→</i>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="knowledge-empty">
                    <span aria-hidden="true">＋</span>
                    <p>{label("这个知识集还是空的，先加入第一张卡。", "This collection is empty. Add its first card.")}</p>
                  </div>
                )}
              </section>
            </div>
          ) : null}

          {view === "card" && selectedCollection ? (
            <div className="knowledge-editor knowledge-card-editor">
              <section className="knowledge-form-panel">
                {renderCardFields(cardDraft, setCardDraft)}
                <div className="knowledge-editor-actions knowledge-editor-actions-between">
                  <div>{editingCard ? <button type="button" className="knowledge-danger-action" disabled={busy} onClick={() => void deleteCard()}>{label("删除卡片", "Delete card")}</button> : null}</div>
                  <button type="button" className="knowledge-primary" disabled={busy || !cardDraft.content.trim()} onClick={() => void saveCard()}>{editingCard ? label("保存修改", "Save changes") : label("加入知识集", "Add to collection")}</button>
                </div>
              </section>
            </div>
          ) : null}

          {view === "manual" ? (
            <div className="knowledge-editor knowledge-editor-manual">
              {renderDestination(manualDestination, setManualDestination, manualCollectionId, setManualCollectionId, "manual")}
              {manualDestination === "new" ? (
                <section className="knowledge-new-collection-fields" aria-label={label("新知识集信息", "New collection details") }>
                  <div className="knowledge-field-row">
                    <label><span>{label("知识集名称", "Collection name")}</span><input value={manualCollectionTitle} onChange={(event) => setManualCollectionTitle(event.target.value)} placeholder={label("例如：行为经济学", "e.g. Behavioral Economics")} /></label>
                    <label><span>{label("一句话说明", "Description")}</span><input value={manualCollectionDescription} onChange={(event) => setManualCollectionDescription(event.target.value)} placeholder={label("可选", "Optional")} /></label>
                  </div>
                </section>
              ) : null}
              {manualDestination ? (
                <section className="knowledge-form-panel knowledge-manual-card-panel">
                  {renderCardFields(cardDraft, setCardDraft)}
                  <div className="knowledge-editor-actions">
                    <button
                      type="button"
                      className="knowledge-primary"
                      disabled={busy || !cardDraft.content.trim() || (manualDestination === "new" ? !manualCollectionTitle.trim() : !manualCollectionId)}
                      onClick={() => void saveManualCard()}
                    >{label("保存卡片", "Save card")}</button>
                  </div>
                </section>
              ) : (
                <div className="knowledge-gentle-empty">{label("先选择新建知识集，或加入一个已有知识集。", "First choose a new collection or an existing one.")}</div>
              )}
            </div>
          ) : null}

          {(view === "material" || view === "generated") ? (
            <div className={`knowledge-editor knowledge-editor-import ${view === "generated" ? "knowledge-editor-generated" : ""}`}>
              <section className="knowledge-form-panel knowledge-ai-handoff">
                <span className="knowledge-step">1 · {label("交给你常用的 AI", "Use your preferred AI")}</span>
                <div className="knowledge-handoff-intro">
                  <div>
                    <h3>{view === "material" ? label("复制提示词，再把材料交给 AI", "Copy the prompt, then give your material to AI") : label("告诉 AI 你想学什么", "Tell AI what you want to learn")}</h3>
                    <p>{view === "material"
                      ? label("文章、PDF、笔记、标题和整理过程都留在你常用的 AI 里；最后只把 JSON 结果带回来。", "Keep articles, PDFs, notes, naming, and processing in your preferred AI; bring back only the final JSON.")
                      : label("无需先想标题或结构，AI 会替你整理成一组卡片。", "No need to invent a title or structure; AI will turn it into a set of cards.")}</p>
                  </div>
                  {view === "generated" ? <label className="knowledge-topic-field"><span>{label("我想学习", "I want to learn")}</span><input value={topic} onChange={(event) => setTopic(event.target.value)} placeholder={label("例如：怎样读懂财务报表", "e.g. How to read financial statements")} autoFocus /></label> : null}
                  <button type="button" className="knowledge-primary knowledge-copy-prompt" disabled={view === "generated" && !topic.trim()} onClick={() => void copyPrompt()}>{copied ? label("提示词已复制", "Prompt copied") : view === "material" ? label("复制整理提示词", "Copy structuring prompt") : label("复制生成提示词", "Copy generation prompt")}</button>
                </div>
              </section>

              <section className="knowledge-result-panel">
                <div className="knowledge-panel-heading"><div><span className="knowledge-step">2 · {label("把结果粘贴回来", "Paste the result back")}</span><p>{label("完整复制 AI 的 JSON 回复，未定稿会先检查再让你确认。", "Paste the complete JSON response; NOTHING FINAL will check it before you confirm.")}</p></div></div>
                <textarea value={resultText} onChange={(event) => updateResult(event.target.value)} rows={9} placeholder={label("在这里粘贴 AI 返回的完整内容…", "Paste the complete AI response here…")} />
              </section>

              {parsed?.collection && !parsed.errors.length ? renderDestination(importDestination, setImportDestination, importCollectionId, setImportCollectionId, "import") : null}

              {parsed ? (
                <section className={`knowledge-import-preview ${parsed.errors.length ? "has-errors" : ""}`} aria-labelledby="knowledge-import-preview-title">
                  <div className="knowledge-section-heading">
                    <h3 id="knowledge-import-preview-title">{label("导入前确认", "Review before importing")}</h3>
                    <span>{parsed.collection?.title}</span>
                  </div>
                  {parsed.errors.length ? (
                    <div className="knowledge-validation has-errors" role="alert">
                      <strong>{label("没有识别到可导入的卡片", "No importable cards found")}</strong>
                      {parsed.errors.map((message, index) => <p key={`${index}-${message}`}>{localizeImportMessage(message, isEnglish)}</p>)}
                    </div>
                  ) : importTarget && importPreview ? (
                    <>
                      <div className="knowledge-import-metrics" role="status">
                        <div><strong>{importPreview.acceptedCount}</strong><span>{label("新增", "new")}</span></div>
                        <div><strong>{importPreview.duplicateCount}</strong><span>{label("重复跳过", "duplicates skipped")}</span></div>
                        <div><strong>{importPreview.needsReviewCount}</strong><span>{label("待核查", "need review")}</span></div>
                      </div>
                      <div className="knowledge-import-card-preview">
                        {importPreview.previewCards.slice(0, 3).map((card, index) => (
                          <article key={card.id}>
                            <span>{String(index + 1).padStart(2, "0")}</span>
                            <div><strong>{card.title || card.content}</strong><small>{card.type} · {card.sourceStatus === "verified" ? label("已核查", "verified") : label("待核查", "needs review")}</small></div>
                          </article>
                        ))}
                      </div>
                      {importPreview.warnings.length ? <div className="knowledge-import-warnings">{importPreview.warnings.map((message, index) => <p key={`${index}-${message}`}>{localizeImportMessage(message, isEnglish)}</p>)}</div> : null}
                    </>
                  ) : (
                    <div className="knowledge-gentle-empty">{label("选择目标后，这里会显示新增、重复与待核查数量。", "Choose a destination to see new, duplicate, and review counts.")}</div>
                  )}
                  <div className="knowledge-editor-actions">
                    <button type="button" className="knowledge-primary" disabled={busy || !importPreview || importPreview.acceptedCount === 0} onClick={() => void finishImport()}>{importPreview ? label(`确认导入 ${importPreview.acceptedCount} 张`, `Import ${importPreview.acceptedCount} cards`) : label("等待确认", "Waiting for confirmation")}</button>
                  </div>
                </section>
              ) : null}
            </div>
          ) : null}

          {view === "backup" ? (
            <div className="knowledge-editor knowledge-backup-editor">
              <section className="knowledge-backup-drop" aria-labelledby="knowledge-backup-file-title">
                <span className="knowledge-step">1 · {label("选择备份文件", "Choose a backup file")}</span>
                <h3 id="knowledge-backup-file-title">{label("先读取，不会立刻覆盖", "It will be reviewed before anything changes")}</h3>
                <p>{label("支持未定稿完整备份，也兼容旧版单个知识集 JSON。", "Supports full NOTHING FINAL backups and legacy single-collection JSON files.")}</p>
                <input
                  ref={restoreFileRef}
                  className="knowledge-backup-file-input"
                  type="file"
                  accept="application/json,.json"
                  onChange={(event) => void loadRestoreFile(event.target.files?.[0])}
                />
              </section>

              {parsedBackup ? (
                <section className={`knowledge-backup-preview ${parsedBackup.errors.length || unsafeReplace ? "has-errors" : ""}`} aria-labelledby="knowledge-backup-preview-title">
                  <div className="knowledge-section-heading">
                    <div>
                      <span className="knowledge-step">2 · {label("确认恢复方式", "Choose how to restore")}</span>
                      <h3 id="knowledge-backup-preview-title">{label("备份内容", "Backup contents")}</h3>
                    </div>
                    <span>{parsedBackup.source === "backup" ? label("完整备份", "Full backup") : label("兼容旧版文件", "Legacy file")}</span>
                  </div>
                  {parsedBackup.errors.length ? (
                    <div className="knowledge-validation has-errors" role="alert">
                      {parsedBackup.errors.map((message, index) => <p key={`${index}-${message}`}>{localizeBackupMessage(message, isEnglish)}</p>)}
                    </div>
                  ) : (
                    <>
                      <div className="knowledge-import-metrics">
                        <div><strong>{backupIncomingCollections.length}</strong><span>{label("知识集", "collections")}</span></div>
                        <div><strong>{backupIncomingCards}</strong><span>{label("卡片", "cards")}</span></div>
                        <div><strong>{Object.keys(safeBackupIncomingSettings).length}</strong><span>{label("本机设置", "settings")}</span></div>
                      </div>
                      <fieldset className="knowledge-segments knowledge-restore-mode">
                        <legend>{label("恢复方式", "Restore mode")}</legend>
                        <button type="button" className={restoreMode === "merge" ? "active" : ""} aria-pressed={restoreMode === "merge"} onClick={() => setRestoreMode("merge")}>
                          <strong>{label("合并", "Merge")}</strong>
                          <small>{label("保留现有内容，跳过重复卡片", "Keep current content and skip duplicates")}</small>
                        </button>
                        <button type="button" className={restoreMode === "replace" ? "active" : ""} aria-pressed={restoreMode === "replace"} onClick={() => setRestoreMode("replace")}>
                          <strong>{label("替换", "Replace")}</strong>
                          <small>{label("以备份内容取代当前内容", "Replace current content with the backup")}</small>
                        </button>
                      </fieldset>
                      {parsedBackup.warnings.length || ignoredBackupSettingCount ? (
                        <div className="knowledge-import-warnings">
                          {parsedBackup.warnings.map((message, index) => <p key={`${index}-${message}`}>{localizeBackupMessage(message, isEnglish)}</p>)}
                          {ignoredBackupSettingCount ? <p>{label(
                            `有 ${ignoredBackupSettingCount} 项不受支持的设置不会恢复。`,
                            `${ignoredBackupSettingCount} unsupported setting ${ignoredBackupSettingCount === 1 ? "entry" : "entries"} will not be restored.`,
                          )}</p> : null}
                        </div>
                      ) : null}
                      {unsafeReplace ? (
                        <div className="knowledge-validation has-errors" role="alert">
                          <strong>{label("不能安全替换", "Replace is unavailable")}</strong>
                          <p>{label(
                            `备份中有 ${droppedBackupEntries} 项无效内容被跳过。为防止误删，请改用“合并”，或先修复备份文件。`,
                            `${droppedBackupEntries} invalid ${droppedBackupEntries === 1 ? "entry was" : "entries were"} skipped. To prevent data loss, use Merge or fix the backup first.`,
                          )}</p>
                        </div>
                      ) : null}
                      <div className="knowledge-backup-result-note">
                        {label(
                          `完成后共有 ${restoredCollections?.length ?? 0} 个知识集；恢复前会保留一次可撤销快照。`,
                          `You will have ${restoredCollections?.length ?? 0} collections; an undo snapshot will be saved first.`,
                        )}
                      </div>
                    </>
                  )}
                  <div className="knowledge-editor-actions">
                    <button type="button" className="knowledge-primary" disabled={busy || !parsedBackup.backup || parsedBackup.errors.length > 0 || unsafeReplace} onClick={() => void restoreBackup()}>{restoreMode === "replace" ? label("确认替换", "Replace now") : label("确认合并", "Merge now")}</button>
                  </div>
                </section>
              ) : (
                <div className="knowledge-gentle-empty">{label("选择文件后，这里会显示知识集、卡片与设置数量。", "Choose a file to preview its collections, cards, and settings.")}</div>
              )}
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
