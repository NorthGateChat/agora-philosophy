"use client";

import { Fragment, lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import brand from "../brand.json";
import type { ThoughtCardFormat } from "./exportThoughtCard";
import readingUnitStyles from "./ReadingUnitReader.module.css";

import {
  type ConnectionKind,
  type Thought,
} from "../content/philosophy";
import { resolveThoughtPresentation } from "../content/thoughtPresentation";
import {
  allThoughts,
  contentLibraries,
  contentLibraryForThought,
  contentLibraryStorageKey,
  isContentLibraryMode,
  thoughtsForContentLibraryMode,
  type ContentLibraryId,
  type ContentLibraryMode,
  thoughtLevelConnections,
} from "../content/libraries";
import type { ThoughtDepth } from "../content/thoughtDepthLoader";
import { contentLibraryThoughtIndex } from "../lib/contentLibraryThoughtIndex";
import {
  resolveThoughtLineage,
  type ResolvedThoughtConnection,
  type ThoughtLineageView,
} from "../lib/thoughtLineage";
import { ThoughtNeighborhood } from "./ThoughtNeighborhood";
import {
  knowledgeCollectionsToThoughts,
  loadKnowledgeCollections,
  saveKnowledgeCollections,
  type KnowledgeCollection,
} from "../lib/customKnowledge";
import {
  economicsCollectionForThought,
  economicsCollectionOptions,
  economicsThoughtGroups,
  economicsThoughts,
  isEconomicsCollectionId,
  loadCompleteEconomicsCatalog,
  type EconomicsCatalog,
  type EconomicsCollectionId,
} from "../content/economics";
import {
  isPsychologyCollectionId,
  psychologyCollectionForThought,
  psychologyCollectionOptions,
  psychologyThoughtGroups,
  psychologyThoughts,
  type PsychologyCollectionId,
} from "../content/psychology";

const KnowledgeStudio = lazy(() => import("./KnowledgeStudio").then((module) => ({
  default: module.KnowledgeStudio,
})));
const ReadingUnitReader = lazy(() => import("./ReadingUnitReader").then((module) => ({
  default: module.ReadingUnitReader,
})));

type LineageView = ThoughtLineageView;
const lineageViews: LineageView[] = ["upstream", "dialogue", "downstream"];
type InterpretationView = "reading" | "context" | "distinction";
const interpretationViews: InterpretationView[] = ["reading", "context", "distinction"];

type ResolvedConnection = ResolvedThoughtConnection;

type ContentMenuSection = "philosophy" | "thought" | "economics" | "psychology" | "mine";
type ThoughtbookTab = "saved" | "recent" | "blocked";
type ThoughtbookLibraryFilter = "all" | ContentLibraryId | "custom";
const thoughtbookTabs: ThoughtbookTab[] = ["saved", "recent", "blocked"];
const contentMenuSections = [
  { id: "philosophy", label: "哲学", englishLabel: "Philosophy" },
  { id: "thought", label: "思想", englishLabel: "Thought" },
  { id: "economics", label: "经济", englishLabel: "Economics" },
  { id: "psychology", label: "心理", englishLabel: "Psychology" },
  { id: "mine", label: "我的", englishLabel: "Mine" },
] as const;
const philosophyLibraryIds = ["western", "chinese", "indian"] as const;
const thoughtLibraryIds = ["mao", "science"] as const;
const visualStyles = [
  { id: "trajectory", label: "思想轨迹", englishLabel: "Thought Trajectory" },
  { id: "marginalia", label: "意识手稿", englishLabel: "Mind Manuscript" },
  { id: "archive", label: "命题档案", englishLabel: "Proposition Archive" },
] as const;
type VisualStyle = (typeof visualStyles)[number]["id"];
const languageModes = [
  { id: "zh-hans", label: "简体中文", englishLabel: "Simplified Chinese" },
  { id: "zh-hant", label: "繁体中文", englishLabel: "Traditional Chinese" },
  { id: "en", label: "英文", englishLabel: "English" },
] as const;
type LanguageMode = (typeof languageModes)[number]["id"];

function languageModeForBrowserLocale(locale: string | undefined): LanguageMode {
  const normalizedLocale = locale?.trim().toLowerCase() ?? "";
  if (!normalizedLocale.startsWith("zh")) return "en";

  const usesTraditionalChinese = normalizedLocale.startsWith("zh-hant")
    || /^zh-(tw|hk|mo)(?:-|$)/.test(normalizedLocale);
  return usesTraditionalChinese ? "zh-hant" : "zh-hans";
}

type TextConverter = (text: string) => string;
type ActionNotice =
  | "copied"
  | "thought-copied"
  | "recommendation-copied"
  | "thought-blocked"
  | "thought-restored"
  | "block-limit"
  | "image-saving"
  | "image-saved"
  | "image-error";
type ThoughtDepthState = {
  key: string;
  status: "ready" | "error";
  data?: ThoughtDepth;
};
type OnboardingHint = "quote" | "navigate" | "menu";
type OnboardingHints = Record<OnboardingHint, boolean>;
const initialOnboardingHints: OnboardingHints = {
  quote: true,
  navigate: true,
  menu: true,
};
let cachedTraditionalConverter: TextConverter | null = null;
let traditionalConverterPromise: Promise<TextConverter> | null = null;
const storageKeys = {
  saved: "agora-saved",
  blocked: "agora-blocked",
  recent: "agora-recent",
  visualStyle: "agora-visual-style",
  languageMode: "agora-language-mode",
  includeEnglishQuote: "agora-include-english-quote",
  shareFormat: "agora-share-format",
  onboardingComplete: "agora-onboarding-complete",
  contentLibrary: contentLibraryStorageKey,
  economicsCollection: "agora-economics-collection",
  psychologyCollection: "agora-psychology-collection",
  selectedKnowledgeCollection: "agora-selected-knowledge-collection",
} as const;
const onboardingVersion = "2";
let thoughtCardModulePromise: Promise<typeof import("./exportThoughtCard")> | null = null;
let thoughtDepthModulePromise: Promise<typeof import("../content/thoughtDepthLoader")> | null = null;
const thoughtDepthCache = new Map<string, Promise<ThoughtDepth>>();

function loadThoughtCardModule() {
  if (!thoughtCardModulePromise) {
    thoughtCardModulePromise = import("./exportThoughtCard").catch((error: unknown) => {
      thoughtCardModulePromise = null;
      throw error;
    });
  }
  return thoughtCardModulePromise;
}

function loadThoughtDepthContent(thought: Thought, libraryId: ContentLibraryId) {
  const cacheKey = `${libraryId}:${thought.id}`;
  const cached = thoughtDepthCache.get(cacheKey);
  if (cached) return cached;

  if (!thoughtDepthModulePromise) {
    thoughtDepthModulePromise = import("../content/thoughtDepthLoader").catch((error: unknown) => {
      thoughtDepthModulePromise = null;
      throw error;
    });
  }

  const request = thoughtDepthModulePromise
    .then(({ loadThoughtDepth }) => loadThoughtDepth(thought, libraryId))
    .catch((error: unknown) => {
      thoughtDepthCache.delete(cacheKey);
      throw error;
    });
  thoughtDepthCache.set(cacheKey, request);
  return request;
}

function loadThoughtIllustrationContent(thoughtId: string) {
  if (!thoughtDepthModulePromise) {
    thoughtDepthModulePromise = import("../content/thoughtDepthLoader").catch((error: unknown) => {
      thoughtDepthModulePromise = null;
      throw error;
    });
  }
  return thoughtDepthModulePromise
    .then(({ loadThoughtIllustration }) => loadThoughtIllustration(thoughtId))
    .catch(() => undefined);
}

function loadTraditionalConverter(): Promise<TextConverter> {
  if (cachedTraditionalConverter) return Promise.resolve(cachedTraditionalConverter);

  if (!traditionalConverterPromise) {
    traditionalConverterPromise = import("opencc-js/cn2t")
      .then(({ Converter }) => {
        const converter = Converter({ from: "cn", to: "t" });
        cachedTraditionalConverter = converter;
        return converter;
      })
      .catch((error: unknown) => {
        traditionalConverterPromise = null;
        throw error;
      });
  }

  return traditionalConverterPromise;
}

function readStoredPreference(currentKey: string, legacyKeys: readonly string[]): string | null {
  const currentValue = window.localStorage.getItem(currentKey);
  if (currentValue !== null) return currentValue;

  for (const legacyKey of legacyKeys) {
    const legacyValue = window.localStorage.getItem(legacyKey);
    if (legacyValue !== null) {
      window.localStorage.setItem(currentKey, legacyValue);
      return legacyValue;
    }
  }
  return null;
}

function parseSavedIds(value: string): string[] {
  try {
    const parsed: unknown = JSON.parse(value);
    return Array.isArray(parsed) && parsed.every((item) => typeof item === "string")
      ? parsed
      : [];
  } catch {
    return [];
  }
}
const legacyStorageKeys = {
  saved: ["sixi-saved", "yinian-saved"],
  visualStyle: ["sixi-visual-style", "yinian-visual-style"],
  languageMode: ["sixi-language-mode", "yinian-language-mode"],
  includeEnglishQuote: ["sixi-include-english-quote", "yinian-include-english-quote"],
} as const;

function PunctuatedQuote({ text }: { text: string }) {
  const clauses = text.match(/[^，,、；;：:。！？!?]+[，,、；;：:。！？!?]?/gu) ?? [text];

  return clauses.map((clause, clauseIndex) => (
    <Fragment key={`${clauseIndex}-${clause}`}>
      <span className="quote-clause">{clause}</span>
      {clauseIndex < clauses.length - 1 ? <wbr /> : null}
    </Fragment>
  ));
}

function preferredScrollBehavior(): ScrollBehavior {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
}

function libraryModeForThought(thought: Thought): ContentLibraryId | "custom" {
  return thought.customKnowledge ? "custom" : contentLibraryForThought(thought.id) ?? "western";
}

function menuSectionForLibrary(library: ContentLibraryMode): ContentMenuSection {
  if (library === "custom") return "mine";
  if (library === "economics") return "economics";
  if (library === "psychology") return "psychology";
  if (library === "mao" || library === "science") return "thought";
  return "philosophy";
}

export function PhilosophyMoment({
  initialIndex = 0,
  initialLibrary = "western",
}: {
  initialIndex?: number;
  initialLibrary?: ContentLibraryMode;
}) {
  const initialLibraryThoughts = thoughtsForContentLibraryMode(initialLibrary);
  const safeLibraryInitialIndex = initialLibraryThoughts.length > 0 && Number.isFinite(initialIndex)
    ? Math.abs(Math.trunc(initialIndex)) % initialLibraryThoughts.length
    : 0;
  const initialThoughtId = initialLibraryThoughts[safeLibraryInitialIndex]?.id;
  const initialEconomicsCollection = initialLibrary === "economics"
    ? economicsCollectionForThought(initialThoughtId ?? "") ?? "principles"
    : "principles";
  const initialPsychologyCollection = initialLibrary === "psychology"
    ? psychologyCollectionForThought(initialThoughtId ?? "") ?? "foundations"
    : "foundations";
  const initialThoughts = initialLibrary === "economics"
    ? economicsThoughtGroups[initialEconomicsCollection]
    : initialLibrary === "psychology"
      ? psychologyThoughtGroups[initialPsychologyCollection]
      : initialLibraryThoughts;
  const safeInitialIndex = initialLibrary === "economics" || initialLibrary === "psychology"
    ? Math.max(0, initialThoughts.findIndex((item) => item.id === initialThoughtId))
    : safeLibraryInitialIndex;
  const [contentLibrary, setContentLibrary] = useState<ContentLibraryMode>(initialLibrary);
  const [economicsCollection, setEconomicsCollection] = useState<EconomicsCollectionId>(
    initialEconomicsCollection,
  );
  const [psychologyCollection, setPsychologyCollection] = useState<PsychologyCollectionId>(
    initialPsychologyCollection,
  );
  const [economicsCatalog, setEconomicsCatalog] = useState<EconomicsCatalog | null>(null);
  const [contentMenuSection, setContentMenuSection] = useState<ContentMenuSection>(
    () => menuSectionForLibrary(initialLibrary),
  );
  const [index, setIndex] = useState(safeInitialIndex);
  const [saved, setSaved] = useState<string[]>([]);
  const [blocked, setBlocked] = useState<string[]>([]);
  const [recent, setRecent] = useState<string[]>([]);
  const [preferencesReady, setPreferencesReady] = useState(false);
  const [customCollections, setCustomCollections] = useState<KnowledgeCollection[]>([]);
  const [selectedKnowledgeCollectionId, setSelectedKnowledgeCollectionId] = useState<string | null>(null);
  const [customKnowledgeReady, setCustomKnowledgeReady] = useState(false);
  const [customKnowledgeLoadFailed, setCustomKnowledgeLoadFailed] = useState(false);
  const [knowledgeStudioOpen, setKnowledgeStudioOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [readingUnitOpen, setReadingUnitOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [savedOpen, setSavedOpen] = useState(false);
  const [thoughtbookTab, setThoughtbookTab] = useState<ThoughtbookTab>("saved");
  const [thoughtbookSearch, setThoughtbookSearch] = useState("");
  const [thoughtbookLibrary, setThoughtbookLibrary] = useState<ThoughtbookLibraryFilter>("all");
  const [thoughtbookTopic, setThoughtbookTopic] = useState<string>("all");
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [onboardingHints, setOnboardingHints] = useState<OnboardingHints>(initialOnboardingHints);
  const [shareFormat, setShareFormat] = useState<ThoughtCardFormat>("portrait45");
  const [shareBlob, setShareBlob] = useState<Blob | null>(null);
  const [sharePreviewUrl, setSharePreviewUrl] = useState<string | null>(null);
  const [shareLoading, setShareLoading] = useState(false);
  const [shareError, setShareError] = useState(false);
  const [shareRenderVersion, setShareRenderVersion] = useState(0);
  const [visualStyle, setVisualStyle] = useState<VisualStyle>("trajectory");
  const [languageMode, setLanguageMode] = useState<LanguageMode>("zh-hans");
  const [includeEnglishQuote, setIncludeEnglishQuote] = useState(true);
  const [traditionalConverter, setTraditionalConverter] = useState<TextConverter | null>(
    () => cachedTraditionalConverter,
  );
  const [traditionalLoadFailed, setTraditionalLoadFailed] = useState(false);
  const [actionNotice, setActionNotice] = useState<ActionNotice | null>(null);
  const [imageSaving, setImageSaving] = useState(false);
  const [interpretationView, setInterpretationView] = useState<InterpretationView>("reading");
  const [comparisonKey, setComparisonKey] = useState<string | null>(null);
  const [thoughtDepthState, setThoughtDepthState] = useState<ThoughtDepthState | null>(null);
  const touchStart = useRef<number | null>(null);
  const quoteStageRef = useRef<HTMLDivElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const detailSheetRef = useRef<HTMLElement | null>(null);
  const detailCloseButtonRef = useRef<HTMLButtonElement | null>(null);
  const readingUnitTriggerRef = useRef<HTMLButtonElement | null>(null);
  const detailQuoteRef = useRef<HTMLDivElement | null>(null);
  const shareDialogRef = useRef<HTMLElement | null>(null);
  const shareCloseButtonRef = useRef<HTMLButtonElement | null>(null);
  const shareReturnFocusRef = useRef<HTMLElement | null>(null);
  const savedDialogRef = useRef<HTMLElement | null>(null);
  const savedCloseButtonRef = useRef<HTMLButtonElement | null>(null);
  const savedReturnFocusRef = useRef<HTMLElement | null>(null);
  const knowledgeStudioReturnFocusRef = useRef<HTMLElement | null>(null);
  const shareGenerationRef = useRef(0);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const noticeTimerRef = useRef<number | null>(null);
  const imageSavingRef = useRef(false);
  const interpretationPanelRef = useRef<HTMLDivElement | null>(null);
  const indexRef = useRef(safeInitialIndex);
  const navigationHistoryRef = useRef<number[]>([safeInitialIndex]);
  const navigationHistoryPositionRef = useRef(0);
  const customLibraryRestoredRef = useRef(false);
  const economicsCatalogRef = useRef<EconomicsCatalog | null>(null);
  const previewAppliedRef = useRef(false);
  const knowledgeSaveQueueRef = useRef<Promise<void>>(Promise.resolve());

  const updateIndex = useCallback((nextIndex: number) => {
    indexRef.current = nextIndex;
    setIndex(nextIndex);
  }, []);

  const updateContentLibrary = useCallback((nextLibrary: ContentLibraryMode) => {
    setContentLibrary(nextLibrary);
    if (nextLibrary !== "random") {
      setContentMenuSection(menuSectionForLibrary(nextLibrary));
    }
  }, []);

  const ensureEconomicsCatalog = useCallback(async () => {
    if (economicsCatalogRef.current) return economicsCatalogRef.current;

    const catalog = await loadCompleteEconomicsCatalog();
    economicsCatalogRef.current = catalog;
    setEconomicsCatalog(catalog);
    return catalog;
  }, []);

  const activeEconomicsThoughtGroups = economicsCatalog?.thoughtGroups ?? economicsThoughtGroups;
  const activeEconomicsThoughts = economicsCatalog?.thoughts ?? economicsThoughts;
  const activeEconomicsCollectionForThought = economicsCatalog?.collectionForThought
    ?? economicsCollectionForThought;

  const allCustomThoughts = useMemo(
    () => knowledgeCollectionsToThoughts(customCollections),
    [customCollections],
  );
  const customThoughts = useMemo(() => {
    if (!selectedKnowledgeCollectionId) return allCustomThoughts;
    return knowledgeCollectionsToThoughts(
      customCollections.filter((collection) => collection.id === selectedKnowledgeCollectionId),
    );
  }, [allCustomThoughts, customCollections, selectedKnowledgeCollectionId]);
  const allAvailableThoughts = useMemo(
    () => economicsCatalog
      ? [
          ...allThoughts.filter((item) => !item.id.startsWith("economics-")),
          ...economicsCatalog.thoughts,
          ...allCustomThoughts,
        ]
      : [...allThoughts, ...allCustomThoughts],
    [allCustomThoughts, economicsCatalog],
  );
  const thoughtById = useMemo(
    () => new Map(allAvailableThoughts.map((item) => [item.id, item])),
    [allAvailableThoughts],
  );
  const availableThoughts = useMemo(
    () => contentLibrary === "economics"
      ? activeEconomicsThoughtGroups[economicsCollection]
      : contentLibrary === "psychology"
        ? psychologyThoughtGroups[psychologyCollection]
        : contentLibrary === "random"
          ? allAvailableThoughts
          : thoughtsForContentLibraryMode(contentLibrary, customThoughts),
    [
      activeEconomicsThoughtGroups,
      allAvailableThoughts,
      contentLibrary,
      customThoughts,
      economicsCollection,
      psychologyCollection,
    ],
  );
  const filtered = useMemo(
    () => availableThoughts.filter((item) => !blocked.includes(item.id)),
    [availableThoughts, blocked],
  );
  const thought = filtered[index % filtered.length]
    ?? allAvailableThoughts.find((item) => !blocked.includes(item.id))
    ?? allThoughts[0];
  const savedThoughts = useMemo(
    () => saved
      .slice()
      .reverse()
      .map((thoughtId) => thoughtById.get(thoughtId))
      .filter((item): item is Thought => item !== undefined && !blocked.includes(item.id)),
    [blocked, saved, thoughtById],
  );
  const blockedThoughts = useMemo(
    () => blocked
      .slice()
      .reverse()
      .map((thoughtId) => thoughtById.get(thoughtId))
      .filter((item): item is Thought => Boolean(item)),
    [blocked, thoughtById],
  );
  const recentThoughts = useMemo(
    () => recent
      .slice()
      .reverse()
      .map((thoughtId) => thoughtById.get(thoughtId))
      .filter((item): item is Thought => item !== undefined && !blocked.includes(item.id)),
    [blocked, recent, thoughtById],
  );
  const thoughtbookBase = thoughtbookTab === "saved"
    ? savedThoughts
    : thoughtbookTab === "recent"
      ? recentThoughts
      : blockedThoughts;
  const thoughtbookTopics = useMemo(() => Array.from(new Set(
    allAvailableThoughts
      .filter((item) => thoughtbookLibrary === "all"
        || libraryModeForThought(item) === thoughtbookLibrary)
      .map((item) => item.topic),
  )), [allAvailableThoughts, thoughtbookLibrary]);
  const normalizedThoughtbookSearch = thoughtbookSearch.trim().toLocaleLowerCase();
  const thoughtbookThoughts = useMemo(() => thoughtbookBase.filter((item) => {
    const itemLibrary = libraryModeForThought(item);
    if (thoughtbookLibrary !== "all" && itemLibrary !== thoughtbookLibrary) return false;
    if (thoughtbookTopic !== "all" && item.topic !== thoughtbookTopic) return false;
    if (!normalizedThoughtbookSearch) return true;
    return [
      item.text,
      item.plainText ?? "",
      item.english,
      item.name,
      item.englishName,
      item.work,
      item.englishWork,
      item.school,
      item.englishSchool,
    ].some((value) => value.toLocaleLowerCase().includes(normalizedThoughtbookSearch));
  }), [normalizedThoughtbookSearch, thoughtbookBase, thoughtbookLibrary, thoughtbookTopic]);
  const thoughtLibraryId = libraryModeForThought(thought);
  const thoughtLibrary = thoughtLibraryId === "custom" ? null : contentLibraries[thoughtLibraryId];
  const thoughtTopic = thoughtLibrary?.topics.find((topic) => topic.id === thought.topic)
    ?? { id: thought.topic, label: thought.topic, englishLabel: thought.topic };
  const thoughtDepthKey = `${thoughtLibraryId}:${thought.id}`;
  const thoughtDepth = thoughtDepthState?.key === thoughtDepthKey
    && thoughtDepthState.status === "ready"
    ? thoughtDepthState.data
    : undefined;
  const sourceMetadata = thoughtDepth?.sourceMetadata;
  const sourceCredibility = thoughtDepth?.sourceCredibility;
  const thoughtIllustration = thoughtDepth?.illustration;
  const detailIllustration = thoughtIllustration?.placement.includes("detail")
    ? thoughtIllustration
    : undefined;
  const interpretation = thoughtDepth?.interpretation;
  const lineage = useMemo(() => {
    return resolveThoughtLineage(
      thought.id,
      thoughtLevelConnections,
      thoughtById,
      new Set(blocked),
    );
  }, [blocked, thought.id, thoughtById]);
  const lineageEntries = useMemo(
    () => lineageViews.flatMap((view) => lineage[view]),
    [lineage],
  );
  const hasLineage = lineageEntries.length > 0;
  const comparison = useMemo(
    () => lineageEntries.find((entry) => entry.key === comparisonKey)
      ?? lineageEntries[0]
      ?? null,
    [comparisonKey, lineageEntries],
  );
  const selectedComparisonKey = comparison?.key ?? null;

  const thoughtLibraryThoughts = thoughtLibraryId === "economics"
    ? activeEconomicsThoughts
    : thoughtLibraryId === "psychology"
      ? psychologyThoughts
      : thoughtLibrary?.thoughts ?? customThoughts;
  const thoughtQuoteOrder = thoughtLibrary?.quoteOrder ?? "original-first";
  const thoughtNumber = thoughtLibraryThoughts.findIndex((item) => item.id === thought.id) + 1;
  const isChineseLanguage = languageMode !== "en";
  const hasEnglishQuote = Boolean(thought.english?.trim());
  const showEnglishQuote = hasEnglishQuote
    && (languageMode === "en" || (isChineseLanguage && includeEnglishQuote));
  const showChineseQuote = isChineseLanguage || !hasEnglishQuote;
  const chineseQuoteFirst = thoughtQuoteOrder === "original-first" && showChineseQuote;
  const localizeChinese = useCallback(
    (text: string) => languageMode === "zh-hant" && traditionalConverter
      ? traditionalConverter(text)
      : text,
    [languageMode, traditionalConverter],
  );
  const menuLabel = (chinese: string, english: string) => {
    if (languageMode === "en") return english;
    return localizeChinese(chinese);
  };
  const localizedNameFor = (item: Thought) => languageMode === "en"
    ? item.englishName?.trim() || item.name
    : localizeChinese(item.name);
  const localizedWorkFor = (item: Thought) => languageMode === "en"
    ? item.englishWork?.trim() || item.work
    : localizeChinese(item.work);
  const presentationLabelFor = (item: Thought) => {
    const { label } = resolveThoughtPresentation(item);
    return menuLabel(label.zh, label.en);
  };
  const presentationAttributionFor = (item: Thought) => {
    const { attributionMode } = resolveThoughtPresentation(item);
    const name = localizedNameFor(item);
    const work = localizedWorkFor(item);
    if (attributionMode === "based-on") {
      return menuLabel(`据 ${name} · ${work} 整理`, `Based on ${name} · ${work}`);
    }
    if (attributionMode === "unverified") {
      return menuLabel(`待核摘录 · ${name} · ${work}`, `Unverified excerpt · ${name} · ${work}`);
    }
    return `${name} · ${work}`;
  };
  const thoughtPresentation = resolveThoughtPresentation(thought);
  const comparisonPresentation = comparison
    ? resolveThoughtPresentation(comparison.related)
    : null;
  const comparisonHasEnglishQuote = Boolean(comparison?.related.english?.trim());
  const showComparisonEnglishQuote = comparisonHasEnglishQuote
    && (languageMode === "en" || (isChineseLanguage && includeEnglishQuote));
  const showComparisonChineseQuote = Boolean(comparison)
    && (isChineseLanguage || !comparisonHasEnglishQuote);
  const comparisonLibraryId = comparison
    ? contentLibraryForThought(comparison.related.id)
    : null;
  const comparisonChineseQuoteFirst = comparisonLibraryId
    ? contentLibraries[comparisonLibraryId].quoteOrder === "original-first" && showComparisonChineseQuote
    : false;
  const displayedPlainText = thought.plainText
    ? localizeChinese(thought.plainText)
    : null;
  const displayedEditorialSummary = languageMode === "en"
    ? thought.englishEditorialSummary?.trim() || null
    : thought.editorialSummary
      ? localizeChinese(thought.editorialSummary)
      : null;
  const displayedName = localizedNameFor(thought);
  const displayedWork = localizedWorkFor(thought);
  const displayedSchool = languageMode === "en"
    ? thought.englishSchool?.trim() || thought.school
    : localizeChinese(thought.school);
  const displayedReflection = languageMode === "en"
    ? thought.englishReflection?.trim() || thought.reflection
    : localizeChinese(thought.reflection);
  const displayedContext = languageMode === "en"
    ? (interpretation?.englishContext
      ?? thought.englishContext
      ?? thought.englishReflection)?.trim() || thought.reflection
    : localizeChinese(interpretation?.context ?? thought.context ?? thought.reflection);
  const displayedSourceLocator = sourceMetadata?.locatorLevel === "passage"
    ? languageMode === "en"
      ? sourceMetadata.englishLocator.trim()
      : localizeChinese(sourceMetadata.locator.trim())
    : null;
  const contextSourceLinks = sourceMetadata?.verificationStatus === "primary-text-checked"
    ? sourceMetadata.referenceLinks?.slice(0, 2) ?? []
    : [];
  const displayedDistinction = languageMode === "en"
    ? interpretation?.englishDistinction
      ?? thought.englishDistinction
      ?? "Read this claim together with its work, concepts, and argument; it should not be reduced to a context-free slogan."
    : localizeChinese(
      interpretation?.distinction
        ?? thought.distinction
        ?? "请把这则命题放回著作、概念与论证中理解，不宜把它简化为脱离语境即可套用的格言。",
    );
  const displayedQuestion = languageMode === "en"
    ? thought.englishQuestion?.trim() || thought.question
    : localizeChinese(thought.question);
  const englishQuestion = thought.englishQuestion?.trim() || thought.question;
  const showEnglishQuestion = isChineseLanguage
    && includeEnglishQuote
    && Boolean(thought.englishQuestion?.trim());
  const localizedBrandName = languageMode === "en"
    ? brand.nameEn
    : languageMode === "zh-hant"
      ? brand.nameZhHant
      : brand.nameZhHans;
  const localizedSlogan = languageMode === "en"
    ? brand.sloganEn
    : languageMode === "zh-hant"
      ? brand.sloganZhHant
      : brand.sloganZhHans;
  const displayedPresentationLabel = presentationLabelFor(thought);
  const displayedPresentationAttribution = presentationAttributionFor(thought);
  const shareNatureLabel = thought.customKnowledge
    ? thoughtPresentation.nature === "source-excerpt"
      ? menuLabel("自定义摘录", "Custom excerpt")
      : thoughtPresentation.nature === "unverified-excerpt"
        ? menuLabel("待核摘录", "Unverified excerpt")
        : menuLabel("自定义知识卡", "Custom knowledge card")
    : thoughtPresentation.nature === "editorial-synthesis"
      ? menuLabel("未定稿命题整理", "NOTHING FINAL editorial synthesis")
      : displayedPresentationLabel;
  const shareAuthor = thoughtPresentation.attributionMode === "direct"
    ? displayedName
    : thoughtPresentation.attributionMode === "based-on"
      ? menuLabel(`据 ${displayedName}`, `Based on ${displayedName}`)
      : menuLabel(`待核摘录 · ${displayedName}`, `Unverified excerpt · ${displayedName}`);
  const shareWork = thoughtPresentation.attributionMode === "based-on"
    ? menuLabel(`${displayedWork} · 整理`, `${displayedWork} · Editorial synthesis`)
    : displayedWork;
  const shareQuote = languageMode === "en"
    ? thought.english?.trim() || thought.text
    : showEnglishQuote && showChineseQuote
      ? chineseQuoteFirst
        ? `${localizeChinese(thought.text)}\n${thought.english}`
        : `${thought.english}\n${localizeChinese(thought.text)}`
      : showEnglishQuote
        ? thought.english
        : localizeChinese(thought.text);
  const shareAttribution = thoughtPresentation.attributionMode === "direct"
    ? languageMode === "en"
      ? `— ${displayedPresentationAttribution}`
      : `—— ${displayedPresentationAttribution}`
    : displayedPresentationAttribution;
  const shareSignature = languageMode === "en"
    ? `${localizedBrandName} — ${localizedSlogan}`
    : `${localizedBrandName}｜${localizedSlogan}`;
  const thoughtCopyText = `${shareNatureLabel}\n\n${shareQuote}\n\n${shareAttribution}`;
  const shareText = `${thoughtCopyText}\n\n${shareSignature}`;
  const recommendationText = languageMode === "en"
    ? `Try NOTHING FINAL, a quiet new tab for ideas and knowledge. Each new tab opens a thought you can trace through its source, context, and related ideas.\n\n${brand.storeUrl}`
    : `${localizeChinese("推荐你试试未定稿：把每次打开 Chrome 新标签页，变成一次与思想的短暂相遇。每则观点都可以继续读解它的来源、语境与相关观点。")}\n\n${brand.storeUrl}`;
  const shareTitle = `${localizedBrandName} · ${shareNatureLabel}`;
  const PrimaryQuoteTag = thoughtPresentation.useQuotationMarks ? "blockquote" : "div";
  const relationLabel = (kind: ConnectionKind) => {
    const labels: Record<ConnectionKind, [string, string]> = {
      inherits: ["思想承接", "Idea inheritance"],
      reframes: ["批判重构", "Critical reframing"],
      challenges: ["问题反转", "Critical turn"],
      dialogues: ["双向对话", "Two-way dialogue"],
      resonates: ["主题呼应", "Thematic echo"],
      contrasts: ["核心分歧", "Core contrast"],
    };
    return menuLabel(...labels[kind]);
  };
  const relationBasisLabel = (basis: "editorial" | "documented") => basis === "documented"
    ? menuLabel("文献可证", "Documented")
    : menuLabel("编辑关联", "Editorial link");
  const relatedThoughtLabel = (related: Thought) => {
    const relatedLibraryId = contentLibraryForThought(related.id) ?? "western";
    const useWork = contentLibraries[relatedLibraryId].relatedLabel === "work";
    if (languageMode === "en") return useWork ? related.englishWork : related.englishName;
    return localizeChinese(useWork ? related.work : related.name);
  };
  const lineageViewLabel = (view: LineageView, short = false) => {
    if (view === "upstream") {
      return short ? menuLabel("来处", "Origins") : menuLabel("思想来处", "Origins");
    }
    if (view === "dialogue") {
      return short ? menuLabel("异答", "Dialogue") : menuLabel("同题异答", "Dialogue");
    }
    return short ? menuLabel("回响", "Afterlives") : menuLabel("后续回响", "Afterlives");
  };

  const showActionNotice = useCallback((notice: ActionNotice, duration = 1800) => {
    if (noticeTimerRef.current !== null) window.clearTimeout(noticeTimerRef.current);
    setActionNotice(notice);
    noticeTimerRef.current = window.setTimeout(() => {
      setActionNotice(null);
      noticeTimerRef.current = null;
    }, duration);
  }, []);

  useEffect(() => {
    let active = true;
    void loadKnowledgeCollections()
      .then((collections) => {
        if (!active) return;
        setCustomKnowledgeLoadFailed(false);
        setCustomCollections(collections);
        const storedCollectionId = window.localStorage.getItem(storageKeys.selectedKnowledgeCollection);
        const selectedCollection = collections.find((collection) => (
          collection.id === storedCollectionId && collection.enabled && collection.cards.length > 0
        )) ?? collections.find((collection) => collection.enabled && collection.cards.length > 0);
        setSelectedKnowledgeCollectionId(selectedCollection?.id ?? null);
        setCustomKnowledgeReady(true);
      })
      .catch(() => {
        if (!active) return;
        // Do not treat a failed IndexedDB read as an empty library. Editing in
        // that state could otherwise overwrite knowledge that still exists on disk.
        setCustomKnowledgeLoadFailed(true);
        setCustomKnowledgeReady(true);
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    // Sharing has its own small illustration-only loading path. Keep the much
    // heavier source archive and interpretation chunks behind the detail view.
    if (!detailOpen || thoughtLibraryId === "custom") return;

    let active = true;
    void loadThoughtDepthContent(thought, thoughtLibraryId)
      .then((data) => {
        if (active) setThoughtDepthState({ key: thoughtDepthKey, status: "ready", data });
      })
      .catch(() => {
        if (active) setThoughtDepthState({ key: thoughtDepthKey, status: "error" });
      });

    return () => {
      active = false;
    };
  }, [detailOpen, thought, thoughtDepthKey, thoughtLibraryId]);

  useEffect(() => () => {
    if (noticeTimerRef.current !== null) window.clearTimeout(noticeTimerRef.current);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const storedSaved = readStoredPreference(storageKeys.saved, legacyStorageKeys.saved);
      const storedSavedIds = storedSaved === null ? [] : parseSavedIds(storedSaved);
      if (storedSaved !== null) setSaved(storedSavedIds);

      const storedBlocked = window.localStorage.getItem(storageKeys.blocked);
      const storedBlockedIds = storedBlocked === null ? [] : parseSavedIds(storedBlocked);
      if (storedBlocked !== null) setBlocked(storedBlockedIds);

      const storedRecent = window.localStorage.getItem(storageKeys.recent);
      const storedRecentIds = storedRecent === null ? [] : parseSavedIds(storedRecent).slice(-100);
      if (storedRecent !== null) setRecent(storedRecentIds);

      const storedEconomicsCollection = window.localStorage.getItem(storageKeys.economicsCollection);
      const restoredEconomicsCollection = isEconomicsCollectionId(storedEconomicsCollection)
        ? storedEconomicsCollection
        : initialEconomicsCollection;
      setEconomicsCollection(restoredEconomicsCollection);

      const storedPsychologyCollection = window.localStorage.getItem(
        storageKeys.psychologyCollection,
      );
      const restoredPsychologyCollection = isPsychologyCollectionId(storedPsychologyCollection)
        ? storedPsychologyCollection
        : initialPsychologyCollection;
      setPsychologyCollection(restoredPsychologyCollection);

      const storedLibrary = window.localStorage.getItem(storageKeys.contentLibrary);
      const restoredLibrary = storedLibrary === "random" ? "western" : storedLibrary;
      if (storedLibrary === "random") {
        window.localStorage.setItem(storageKeys.contentLibrary, "western");
      }
      if (isContentLibraryMode(restoredLibrary) && restoredLibrary !== "custom") {
        const restoredThoughts = (restoredLibrary === "economics"
          ? economicsThoughtGroups[restoredEconomicsCollection]
          : restoredLibrary === "psychology"
            ? psychologyThoughtGroups[restoredPsychologyCollection]
            : thoughtsForContentLibraryMode(restoredLibrary))
          .filter((item) => !storedBlockedIds.includes(item.id));
        if (restoredThoughts.length > 0) {
          const preservedThoughtId = initialThoughts[safeInitialIndex]?.id;
          const preservedIndex = restoredThoughts.findIndex((item) => item.id === preservedThoughtId);
          const restoredIndex = restoredLibrary === initialLibrary && preservedIndex >= 0
            ? preservedIndex
            : indexRef.current % restoredThoughts.length;
          updateContentLibrary(restoredLibrary);
          navigationHistoryRef.current = [restoredIndex];
          navigationHistoryPositionRef.current = 0;
          updateIndex(restoredIndex);
        }
      }

      const previewThoughtId = new URLSearchParams(window.location.search).get("preview");
      const previewLibrary = previewThoughtId
        ? contentLibraryForThought(previewThoughtId)
        : null;
      if (previewThoughtId && previewLibrary) {
        const previewEconomicsCollection = previewLibrary === "economics"
          ? economicsCollectionForThought(previewThoughtId)
          : null;
        const previewPsychologyCollection = previewLibrary === "psychology"
          ? psychologyCollectionForThought(previewThoughtId)
          : null;
        const previewThoughts = previewEconomicsCollection
          ? economicsThoughtGroups[previewEconomicsCollection]
          : previewPsychologyCollection
            ? psychologyThoughtGroups[previewPsychologyCollection]
            : thoughtsForContentLibraryMode(previewLibrary);
        const previewIndex = previewThoughts.findIndex((item) => item.id === previewThoughtId);
        if (previewIndex >= 0) {
          const nextBlockedIds = storedBlockedIds.filter((id) => id !== previewThoughtId);
          setBlocked(nextBlockedIds);
          window.localStorage.setItem(storageKeys.blocked, JSON.stringify(nextBlockedIds));
          if (previewEconomicsCollection) {
            setEconomicsCollection(previewEconomicsCollection);
            window.localStorage.setItem(
              storageKeys.economicsCollection,
              previewEconomicsCollection,
            );
          }
          if (previewPsychologyCollection) {
            setPsychologyCollection(previewPsychologyCollection);
            window.localStorage.setItem(
              storageKeys.psychologyCollection,
              previewPsychologyCollection,
            );
          }
          updateContentLibrary(previewLibrary);
          navigationHistoryRef.current = [previewIndex];
          navigationHistoryPositionRef.current = 0;
          updateIndex(previewIndex);
          previewAppliedRef.current = true;
        }
      }

      const storedStyle = readStoredPreference(
        storageKeys.visualStyle,
        legacyStorageKeys.visualStyle,
      );
      if (visualStyles.some((item) => item.id === storedStyle)) {
        setVisualStyle(storedStyle as VisualStyle);
      }

      const storedLanguage = readStoredPreference(
        storageKeys.languageMode,
        legacyStorageKeys.languageMode,
      );
      if (storedLanguage === "zh" || storedLanguage === "both") {
        setLanguageMode("zh-hans");
      } else if (languageModes.some((item) => item.id === storedLanguage)) {
        setLanguageMode(storedLanguage as LanguageMode);
      } else {
        const browserLocale = window.navigator.languages?.[0]
          ?? window.navigator.language;
        setLanguageMode(languageModeForBrowserLocale(browserLocale));
      }

      const storedEnglishQuote = readStoredPreference(
        storageKeys.includeEnglishQuote,
        legacyStorageKeys.includeEnglishQuote,
      );
      if (storedEnglishQuote !== null) {
        setIncludeEnglishQuote(storedEnglishQuote === "true");
      } else if (storedLanguage === "both") {
        setIncludeEnglishQuote(true);
      }

      const storedShareFormat = window.localStorage.getItem(storageKeys.shareFormat);
      if (
        storedShareFormat === "square"
        || storedShareFormat === "portrait"
        || storedShareFormat === "portrait45"
        || storedShareFormat === "story"
        || storedShareFormat === "landscape"
      ) {
        setShareFormat(storedShareFormat);
      } else if (storedShareFormat === "mobile") {
        setShareFormat("portrait45");
      } else if (storedShareFormat === "desktop") {
        setShareFormat("landscape");
      }

      if (window.localStorage.getItem(storageKeys.onboardingComplete) !== onboardingVersion) {
        setOnboardingHints(initialOnboardingHints);
        setOnboardingOpen(true);
      }
      setPreferencesReady(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [initialEconomicsCollection, initialLibrary, initialPsychologyCollection, initialThoughts, safeInitialIndex, updateContentLibrary, updateIndex]);

  useEffect(() => {
    if (!preferencesReady || previewAppliedRef.current) return;

    const previewThoughtId = new URLSearchParams(window.location.search).get("preview");
    if (!previewThoughtId?.startsWith("economics-")) return;

    let active = true;
    void ensureEconomicsCatalog()
      .then((catalog) => {
        if (!active || previewAppliedRef.current) return;
        const previewEconomicsCollection = catalog.collectionForThought(previewThoughtId);
        if (!previewEconomicsCollection) return;

        const nextBlockedIds = blocked.filter((id) => id !== previewThoughtId);
        const previewThoughts = catalog.thoughtGroups[previewEconomicsCollection]
          .filter((item) => !nextBlockedIds.includes(item.id));
        const previewIndex = previewThoughts.findIndex((item) => item.id === previewThoughtId);
        if (previewIndex < 0) return;

        setBlocked(nextBlockedIds);
        window.localStorage.setItem(storageKeys.blocked, JSON.stringify(nextBlockedIds));
        setEconomicsCollection(previewEconomicsCollection);
        window.localStorage.setItem(
          storageKeys.economicsCollection,
          previewEconomicsCollection,
        );
        updateContentLibrary("economics");
        window.localStorage.setItem(storageKeys.contentLibrary, "economics");
        navigationHistoryRef.current = [previewIndex];
        navigationHistoryPositionRef.current = 0;
        updateIndex(previewIndex);
        previewAppliedRef.current = true;
      })
      .catch(() => undefined);

    return () => {
      active = false;
    };
  }, [blocked, ensureEconomicsCatalog, preferencesReady, updateContentLibrary, updateIndex]);

  useEffect(() => {
    if (!preferencesReady || economicsCatalogRef.current) return;

    const referencesDeferredEconomics = [...saved, ...blocked, ...recent].some(
      (thoughtId) => thoughtId.startsWith("economics-")
        && economicsCollectionForThought(thoughtId) === null,
    );
    if (contentLibrary !== "economics" && !referencesDeferredEconomics) return;

    void ensureEconomicsCatalog().catch(() => undefined);
  }, [blocked, contentLibrary, ensureEconomicsCatalog, preferencesReady, recent, saved]);

  useEffect(() => {
    if (!preferencesReady || !customKnowledgeReady || customLibraryRestoredRef.current) return;
    const timer = window.setTimeout(() => {
      if (customLibraryRestoredRef.current) return;
      customLibraryRestoredRef.current = true;
      const storedLibrary = window.localStorage.getItem(storageKeys.contentLibrary);
      if (storedLibrary !== "custom" || customThoughts.length === 0) return;
      const nextThoughts = customThoughts.filter((item) => !blocked.includes(item.id));
      if (nextThoughts.length === 0) return;
      const nextIndex = contentLibraryThoughtIndex(nextThoughts, "custom", {
        currentId: thought.id,
        recentIds: recent,
        savedIds: saved,
      });
      updateContentLibrary("custom");
      navigationHistoryRef.current = [nextIndex];
      navigationHistoryPositionRef.current = 0;
      updateIndex(nextIndex);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [blocked, customKnowledgeReady, customThoughts, preferencesReady, recent, saved, thought.id, updateContentLibrary, updateIndex]);

  useEffect(() => {
    if (filtered.length === 0) return;

    const safeIndex = Math.abs(indexRef.current) % filtered.length;
    navigationHistoryRef.current = [safeIndex];
    navigationHistoryPositionRef.current = 0;
    if (safeIndex !== indexRef.current) updateIndex(safeIndex);
  }, [filtered, updateIndex]);

  useEffect(() => {
    if (!preferencesReady) return;
    const timer = window.setTimeout(() => {
      setRecent((current) => {
        const nextRecent = [...current.filter((id) => id !== thought.id), thought.id].slice(-100);
        window.localStorage.setItem(storageKeys.recent, JSON.stringify(nextRecent));
        return nextRecent;
      });
    }, 0);
    return () => window.clearTimeout(timer);
  }, [preferencesReady, thought.id]);

  useEffect(() => {
    if (languageMode !== "zh-hant" || traditionalConverter) return;

    let active = true;
    void loadTraditionalConverter()
      .then((converter) => {
        if (active) {
          setTraditionalConverter(() => converter);
          setTraditionalLoadFailed(false);
        }
      })
      .catch(() => {
        if (active) setTraditionalLoadFailed(true);
      });
    return () => {
      active = false;
    };
  }, [languageMode, traditionalConverter]);

  useEffect(() => {
    document.documentElement.lang = languageMode === "en"
      ? "en"
      : languageMode === "zh-hant"
        ? "zh-Hant"
        : "zh-Hans";
  }, [languageMode]);

  const completeOnboarding = useCallback(() => {
    window.localStorage.setItem(storageKeys.onboardingComplete, onboardingVersion);
    setOnboardingHints({ quote: false, navigate: false, menu: false });
    setOnboardingOpen(false);
  }, []);

  const dismissOnboardingHint = useCallback((hint: OnboardingHint) => {
    if (!onboardingOpen || !onboardingHints[hint]) return;

    const nextHints = { ...onboardingHints, [hint]: false };
    setOnboardingHints(nextHints);
    if (!Object.values(nextHints).some(Boolean)) {
      window.localStorage.setItem(storageKeys.onboardingComplete, onboardingVersion);
      setOnboardingOpen(false);
    }
  }, [onboardingHints, onboardingOpen]);

  const openOnboarding = useCallback(() => {
    setMenuOpen(false);
    setReadingUnitOpen(false);
    setDetailOpen(false);
    setShareOpen(false);
    setSavedOpen(false);
    setComparisonKey(null);
    setOnboardingHints(initialOnboardingHints);
    setOnboardingOpen(true);
  }, []);

  useEffect(() => {
    if (!onboardingOpen) return;
    const timer = window.setTimeout(completeOnboarding, 12000);
    return () => window.clearTimeout(timer);
  }, [completeOnboarding, onboardingHints, onboardingOpen]);

  const next = useCallback(() => {
    dismissOnboardingHint("navigate");
    setReadingUnitOpen(false);
    setDetailOpen(false);
    setMenuOpen(false);
    setComparisonKey(null);
    const history = navigationHistoryRef.current;
    const nextPosition = navigationHistoryPositionRef.current + 1;
    if (nextPosition < history.length) {
      navigationHistoryPositionRef.current = nextPosition;
      updateIndex(history[nextPosition]);
    } else {
      const nextIndex = contentLibraryThoughtIndex(filtered, contentLibrary, {
        currentId: thought.id,
        recentIds: recent,
        savedIds: saved,
      });
      history.push(nextIndex);
      navigationHistoryPositionRef.current = history.length - 1;
      updateIndex(nextIndex);
    }
    window.requestAnimationFrame(() => quoteStageRef.current?.focus({ preventScroll: true }));
  }, [contentLibrary, dismissOnboardingHint, filtered, recent, saved, thought.id, updateIndex]);

  const previous = useCallback(() => {
    dismissOnboardingHint("navigate");
    setReadingUnitOpen(false);
    setDetailOpen(false);
    setMenuOpen(false);
    setComparisonKey(null);
    const history = navigationHistoryRef.current;
    if (navigationHistoryPositionRef.current > 0) {
      navigationHistoryPositionRef.current -= 1;
      updateIndex(history[navigationHistoryPositionRef.current]);
    } else {
      const previousIndex = contentLibraryThoughtIndex(filtered, contentLibrary, {
        currentId: thought.id,
        recentIds: recent,
        savedIds: saved,
      });
      history.unshift(previousIndex);
      updateIndex(previousIndex);
    }
    window.requestAnimationFrame(() => quoteStageRef.current?.focus({ preventScroll: true }));
  }, [contentLibrary, dismissOnboardingHint, filtered, recent, saved, thought.id, updateIndex]);

  const closeKnowledgeStudio = useCallback(() => setKnowledgeStudioOpen(false), []);

  const openKnowledgeStudio = useCallback(() => {
    if (customKnowledgeLoadFailed) {
      window.alert(languageMode === "en"
        ? "NOTHING FINAL could not read your local knowledge library. To protect your data, editing and importing are temporarily disabled. Restart the browser and try again."
        : "未定稿暂时无法读取本机知识库。为保护已有内容，编辑与导入已暂停；请重启浏览器后再试。");
      return;
    }
    const activeElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    knowledgeStudioReturnFocusRef.current = activeElement?.closest(".corner-menu")
      ? menuButtonRef.current
      : activeElement && activeElement !== document.body
        ? activeElement
        : quoteStageRef.current;
    setMenuOpen(false);
    setReadingUnitOpen(false);
    setDetailOpen(false);
    setShareOpen(false);
    setSavedOpen(false);
    setOnboardingOpen(false);
    setComparisonKey(null);
    setKnowledgeStudioOpen(true);
  }, [customKnowledgeLoadFailed, languageMode]);

  const handleCustomCollectionsChange = useCallback(async (
    nextCollections: KnowledgeCollection[],
    options?: { preservePreferences?: boolean },
  ) => {
    if (customKnowledgeLoadFailed) {
      throw new Error(languageMode === "en"
        ? "Your local knowledge library could not be read, so this change was not saved."
        : "本机知识库读取失败，本次修改未保存。");
    }
    const saveTask = knowledgeSaveQueueRef.current
      .catch(() => undefined)
      .then(() => saveKnowledgeCollections(nextCollections));
    knowledgeSaveQueueRef.current = saveTask.catch(() => undefined);
    await saveTask;

    // Only reflect a mutation in the UI after IndexedDB confirms it. This keeps
    // the visible state, the undo snapshot, and the persisted library aligned.
    setCustomCollections(nextCollections);
    if (options?.preservePreferences) return;

    const selectedCollection = nextCollections.find((collection) => (
      collection.id === selectedKnowledgeCollectionId && collection.enabled && collection.cards.length > 0
    ));
    const fallbackCollection = selectedCollection
      ?? nextCollections.find((collection) => collection.enabled && collection.cards.length > 0)
      ?? null;
    setSelectedKnowledgeCollectionId(fallbackCollection?.id ?? null);
    try {
      if (fallbackCollection) {
        window.localStorage.setItem(storageKeys.selectedKnowledgeCollection, fallbackCollection.id);
      } else {
        window.localStorage.removeItem(storageKeys.selectedKnowledgeCollection);
      }
    } catch {
      // IndexedDB is the source of truth for the knowledge library. A blocked
      // preference write must not report the already-committed library save as failed.
    }
    const hasEnabledCards = nextCollections.some((collection) => (
      collection.enabled && collection.cards.length > 0
    ));
    if (!hasEnabledCards && contentLibrary === "custom") {
      const nextThoughts = thoughtsForContentLibraryMode("western")
        .filter((item) => !blocked.includes(item.id));
      const nextIndex = contentLibraryThoughtIndex(nextThoughts, "western", {
        currentId: thought.id,
        recentIds: recent,
        savedIds: saved,
      });
      updateContentLibrary("western");
      navigationHistoryRef.current = [nextIndex];
      navigationHistoryPositionRef.current = 0;
      updateIndex(nextIndex);
      try {
        window.localStorage.setItem(storageKeys.contentLibrary, "western");
      } catch {
        // Keep the in-memory fallback usable even when browser storage is unavailable.
      }
    }
  }, [blocked, contentLibrary, customKnowledgeLoadFailed, languageMode, recent, saved, selectedKnowledgeCollectionId, thought.id, updateContentLibrary, updateIndex]);

  const chooseContentLibrary = async (nextLibrary: ContentLibraryMode) => {
    if (nextLibrary === contentLibrary) return;

    if (nextLibrary === "custom" && customThoughts.length === 0) {
      openKnowledgeStudio();
      return;
    }

    let nextLibraryThoughts: Thought[];
    if (nextLibrary === "economics") {
      const catalog = await ensureEconomicsCatalog().catch(() => null);
      nextLibraryThoughts = (catalog?.thoughtGroups ?? activeEconomicsThoughtGroups)[economicsCollection];
    } else if (nextLibrary === "psychology") {
      nextLibraryThoughts = psychologyThoughtGroups[psychologyCollection];
    } else {
      nextLibraryThoughts = thoughtsForContentLibraryMode(
          nextLibrary,
          nextLibrary === "random" ? allCustomThoughts : customThoughts,
        );
    }
    const nextThoughts = nextLibraryThoughts.filter((item) => !blocked.includes(item.id));
    if (nextThoughts.length === 0) {
      showActionNotice("block-limit", 2600);
      return;
    }
    const nextIndex = contentLibraryThoughtIndex(nextThoughts, nextLibrary, {
      currentId: thought.id,
      recentIds: recent,
      savedIds: saved,
    });
    navigationHistoryRef.current = [nextIndex];
    navigationHistoryPositionRef.current = 0;
    updateContentLibrary(nextLibrary);
    updateIndex(nextIndex);
    setReadingUnitOpen(false);
    setDetailOpen(false);
    setComparisonKey(null);
    window.localStorage.setItem(storageKeys.contentLibrary, nextLibrary);
  };

  const chooseEconomicsCollection = async (nextCollection: EconomicsCollectionId) => {
    if (contentLibrary === "economics" && economicsCollection === nextCollection) return;

    const catalog = await ensureEconomicsCatalog().catch(() => null);
    const nextThoughts = (catalog?.thoughtGroups ?? activeEconomicsThoughtGroups)[nextCollection]
      .filter((item) => !blocked.includes(item.id));
    if (nextThoughts.length === 0) {
      showActionNotice("block-limit", 2600);
      return;
    }
    const nextIndex = contentLibraryThoughtIndex(nextThoughts, "economics", {
      currentId: thought.id,
      recentIds: recent,
      savedIds: saved,
    });
    setEconomicsCollection(nextCollection);
    navigationHistoryRef.current = [nextIndex];
    navigationHistoryPositionRef.current = 0;
    updateContentLibrary("economics");
    updateIndex(nextIndex);
    setReadingUnitOpen(false);
    setDetailOpen(false);
    setComparisonKey(null);
    window.localStorage.setItem(storageKeys.contentLibrary, "economics");
    window.localStorage.setItem(storageKeys.economicsCollection, nextCollection);
  };

  const choosePsychologyCollection = (nextCollection: PsychologyCollectionId) => {
    if (contentLibrary === "psychology" && psychologyCollection === nextCollection) return;

    const nextThoughts = psychologyThoughtGroups[nextCollection]
      .filter((item) => !blocked.includes(item.id));
    if (nextThoughts.length === 0) {
      showActionNotice("block-limit", 2600);
      return;
    }
    const nextIndex = contentLibraryThoughtIndex(nextThoughts, "psychology", {
      currentId: thought.id,
      recentIds: recent,
      savedIds: saved,
    });
    setPsychologyCollection(nextCollection);
    navigationHistoryRef.current = [nextIndex];
    navigationHistoryPositionRef.current = 0;
    updateContentLibrary("psychology");
    updateIndex(nextIndex);
    setReadingUnitOpen(false);
    setDetailOpen(false);
    setComparisonKey(null);
    window.localStorage.setItem(storageKeys.contentLibrary, "psychology");
    window.localStorage.setItem(storageKeys.psychologyCollection, nextCollection);
  };

  const chooseKnowledgeCollection = (collection: KnowledgeCollection) => {
    if (!collection.enabled || collection.cards.length === 0) {
      openKnowledgeStudio();
      return;
    }
    if (contentLibrary === "custom" && selectedKnowledgeCollectionId === collection.id) return;

    const nextThoughts = knowledgeCollectionsToThoughts([collection])
      .filter((item) => !blocked.includes(item.id));
    if (nextThoughts.length === 0) {
      showActionNotice("block-limit", 2600);
      return;
    }
    const nextIndex = contentLibraryThoughtIndex(nextThoughts, "custom", {
      currentId: thought.id,
      recentIds: recent,
      savedIds: saved,
    });
    setSelectedKnowledgeCollectionId(collection.id);
    window.localStorage.setItem(storageKeys.selectedKnowledgeCollection, collection.id);
    navigationHistoryRef.current = [nextIndex];
    navigationHistoryPositionRef.current = 0;
    updateContentLibrary("custom");
    updateIndex(nextIndex);
    setReadingUnitOpen(false);
    setDetailOpen(false);
    setComparisonKey(null);
    window.localStorage.setItem(storageKeys.contentLibrary, "custom");
  };

  const toggleSaved = useCallback(() => {
    setSaved((current) => {
      const nextSaved = current.includes(thought.id)
        ? current.filter((id) => id !== thought.id)
        : [...current, thought.id];
      window.localStorage.setItem(storageKeys.saved, JSON.stringify(nextSaved));
      return nextSaved;
    });
  }, [thought.id]);

  const removeSaved = useCallback((thoughtId: string) => {
    setSaved((current) => {
      const nextSaved = current.filter((id) => id !== thoughtId);
      window.localStorage.setItem(storageKeys.saved, JSON.stringify(nextSaved));
      return nextSaved;
    });
  }, []);

  const blockCurrentThought = useCallback(() => {
    if (filtered.length <= 1) {
      setMenuOpen(false);
      showActionNotice("block-limit", 2600);
      return;
    }

    const thoughtId = thought.id;
    const nextIndex = indexRef.current >= filtered.length - 1 ? 0 : indexRef.current;
    setBlocked((current) => {
      if (current.includes(thoughtId)) return current;
      const nextBlocked = [...current, thoughtId];
      window.localStorage.setItem(storageKeys.blocked, JSON.stringify(nextBlocked));
      return nextBlocked;
    });
    setSaved((current) => {
      if (!current.includes(thoughtId)) return current;
      const nextSaved = current.filter((id) => id !== thoughtId);
      window.localStorage.setItem(storageKeys.saved, JSON.stringify(nextSaved));
      return nextSaved;
    });
    navigationHistoryRef.current = [nextIndex];
    navigationHistoryPositionRef.current = 0;
    updateIndex(nextIndex);
    setMenuOpen(false);
    setReadingUnitOpen(false);
    setDetailOpen(false);
    setSavedOpen(false);
    setComparisonKey(null);
    showActionNotice("thought-blocked", 2400);
    window.requestAnimationFrame(() => quoteStageRef.current?.focus({ preventScroll: true }));
  }, [filtered.length, showActionNotice, thought.id, updateIndex]);

  const restoreBlocked = useCallback((thoughtId: string) => {
    const nextBlocked = blocked.filter((id) => id !== thoughtId);
    const nextThoughts = availableThoughts.filter((item) => !nextBlocked.includes(item.id));
    const preservedIndex = nextThoughts.findIndex((item) => item.id === thought.id);
    setBlocked(nextBlocked);
    window.localStorage.setItem(storageKeys.blocked, JSON.stringify(nextBlocked));
    if (preservedIndex >= 0) updateIndex(preservedIndex);
    showActionNotice("thought-restored", 2000);
  }, [availableThoughts, blocked, showActionNotice, thought.id, updateIndex]);

  const chooseVisualStyle = (nextStyle: VisualStyle) => {
    setVisualStyle(nextStyle);
    window.localStorage.setItem(storageKeys.visualStyle, nextStyle);
  };

  const chooseLanguageMode = (nextLanguage: LanguageMode) => {
    setLanguageMode(nextLanguage);
    window.localStorage.setItem(storageKeys.languageMode, nextLanguage);
  };

  const toggleEnglishQuote = () => {
    setIncludeEnglishQuote((current) => {
      const nextValue = !current;
      window.localStorage.setItem(storageKeys.includeEnglishQuote, String(nextValue));
      return nextValue;
    });
  };

  const openDetail = useCallback(() => {
    dismissOnboardingHint("quote");
    const activeElement = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
    returnFocusRef.current = activeElement?.closest(".corner-menu")
      ? menuButtonRef.current
      : activeElement && activeElement !== document.body
        ? activeElement
        : quoteStageRef.current;
    setMenuOpen(false);
    setComparisonKey(null);
    setInterpretationView("reading");
    setReadingUnitOpen(false);
    setDetailOpen(true);
  }, [dismissOnboardingHint]);

  const closeDetail = useCallback(() => {
    setComparisonKey(null);
    setReadingUnitOpen(false);
    setDetailOpen(false);
    window.requestAnimationFrame(() => {
      (returnFocusRef.current ?? quoteStageRef.current)?.focus({ preventScroll: true });
    });
  }, []);

  const openReadingUnit = useCallback(() => {
    setReadingUnitOpen(true);
  }, []);

  const closeReadingUnit = useCallback(() => {
    setReadingUnitOpen(false);
  }, []);

  useEffect(() => {
    if (!detailOpen) return;
    const frame = window.requestAnimationFrame(() => {
      detailCloseButtonRef.current?.focus({ preventScroll: true });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [detailOpen]);

  const onDetailKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key !== "Tab") return;
    const focusable = Array.from(detailSheetRef.current?.querySelectorAll<HTMLElement>(
      'button:not(:disabled), a[href], [tabindex]:not([tabindex="-1"])',
    ) ?? []).filter((element) => !element.hasAttribute("inert"));
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const onInterpretationTabKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    currentView: InterpretationView,
  ) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const currentIndex = Math.max(0, interpretationViews.indexOf(currentView));
    const nextIndex = event.key === "Home"
      ? 0
      : event.key === "End"
        ? interpretationViews.length - 1
        : event.key === "ArrowRight"
          ? (currentIndex + 1) % interpretationViews.length
          : (currentIndex - 1 + interpretationViews.length) % interpretationViews.length;
    const nextView = interpretationViews[nextIndex];
    setInterpretationView(nextView);
    document.getElementById(`interpretation-tab-${nextView}`)?.focus();
  };

  useEffect(() => {
    interpretationPanelRef.current?.scrollTo({ top: 0, behavior: "auto" });
  }, [interpretationView]);

  const onThoughtbookTabKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    currentTab: ThoughtbookTab,
  ) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const currentIndex = Math.max(0, thoughtbookTabs.indexOf(currentTab));
    const nextIndex = event.key === "Home"
      ? 0
      : event.key === "End"
        ? thoughtbookTabs.length - 1
        : event.key === "ArrowRight"
          ? (currentIndex + 1) % thoughtbookTabs.length
          : (currentIndex - 1 + thoughtbookTabs.length) % thoughtbookTabs.length;
    const nextTab = thoughtbookTabs[nextIndex];
    setThoughtbookTab(nextTab);
    document.getElementById(`thoughtbook-tab-${nextTab}`)?.focus();
  };

  const onQuoteKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();
      openDetail();
    } else if (event.key === " ") {
      event.preventDefault();
      event.stopPropagation();
      next();
    }
  };

  const createThoughtCardBlob = useCallback(async (format: ThoughtCardFormat) => {
    const [{ renderThoughtCard }, illustration] = await Promise.all([
      loadThoughtCardModule(),
      loadThoughtIllustrationContent(thought.id),
    ]);
    const illustrationUrl = illustration?.placement.includes("share")
      ? illustration.src
      : undefined;
    return renderThoughtCard({
      quoteEnglish: showEnglishQuote ? thought.english : undefined,
      quoteChinese: showChineseQuote ? localizeChinese(thought.text) : undefined,
      quoteChineseFirst: chineseQuoteFirst,
      author: shareAuthor,
      work: shareWork,
      natureLabel: shareNatureLabel,
      signature: localizedBrandName,
      palette: thought.palette,
      illustrationUrl,
      format,
      visualStyle,
    });
  }, [chineseQuoteFirst, localizeChinese, localizedBrandName, shareAuthor, shareNatureLabel, shareWork, showChineseQuote, showEnglishQuote, thought, visualStyle]);

  const openShareDialog = useCallback((preserveDetail: boolean) => {
    const activeElement = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
    shareReturnFocusRef.current = preserveDetail
      ? detailQuoteRef.current
      : activeElement?.closest(".corner-menu")
        ? menuButtonRef.current
        : activeElement && activeElement !== document.body
          ? activeElement
          : detailOpen
            ? detailCloseButtonRef.current
            : quoteStageRef.current;
    setMenuOpen(false);
    if (!preserveDetail) {
      setReadingUnitOpen(false);
      setDetailOpen(false);
    }
    setSavedOpen(false);
    if (!preserveDetail) setComparisonKey(null);
    setShareBlob(null);
    setSharePreviewUrl(null);
    setShareError(false);
    setShareLoading(true);
    setShareOpen(true);
  }, [detailOpen]);

  const openShare = useCallback(() => {
    openShareDialog(false);
  }, [openShareDialog]);

  const openShareFromDetail = useCallback(() => {
    openShareDialog(true);
  }, [openShareDialog]);

  const closeShare = useCallback(() => {
    setShareOpen(false);
    window.requestAnimationFrame(() => {
      (shareReturnFocusRef.current ?? quoteStageRef.current)?.focus({ preventScroll: true });
    });
  }, []);

  const openSavedLibrary = useCallback((tab: ThoughtbookTab = "saved") => {
    const activeElement = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
    savedReturnFocusRef.current = activeElement?.closest(".corner-menu")
      ? menuButtonRef.current
      : activeElement && activeElement !== document.body
        ? activeElement
        : quoteStageRef.current;
    setMenuOpen(false);
    setReadingUnitOpen(false);
    setDetailOpen(false);
    setShareOpen(false);
    setComparisonKey(null);
    setThoughtbookTab(tab);
    setSavedOpen(true);
  }, []);

  const closeSavedLibrary = useCallback(() => {
    setSavedOpen(false);
    window.requestAnimationFrame(() => {
      (savedReturnFocusRef.current ?? quoteStageRef.current)?.focus({ preventScroll: true });
    });
  }, []);

  useEffect(() => {
    if (!savedOpen) return;
    const frame = window.requestAnimationFrame(() => {
      savedDialogRef.current?.scrollTo({ top: 0 });
      savedCloseButtonRef.current?.focus({ preventScroll: true });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [savedOpen]);

  const onSavedKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key !== "Tab") return;
    const focusable = Array.from(savedDialogRef.current?.querySelectorAll<HTMLElement>(
      'button:not(:disabled), a[href], [tabindex]:not([tabindex="-1"])',
    ) ?? []).filter((element) => !element.hasAttribute("inert"));
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  useEffect(() => {
    if (!shareOpen) return;
    const frame = window.requestAnimationFrame(() => {
      shareDialogRef.current?.scrollTo({ top: 0 });
      shareCloseButtonRef.current?.focus({ preventScroll: true });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [shareOpen]);

  const onShareKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key !== "Tab") return;
    const focusable = Array.from(shareDialogRef.current?.querySelectorAll<HTMLElement>(
      'button:not(:disabled), a[href], [tabindex]:not([tabindex="-1"])',
    ) ?? []).filter((element) => !element.hasAttribute("inert"));
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const chooseShareFormat = (format: ThoughtCardFormat) => {
    if (format === shareFormat) return;
    setShareFormat(format);
    setShareBlob(null);
    setSharePreviewUrl(null);
    setShareLoading(true);
    setShareError(false);
    window.localStorage.setItem(storageKeys.shareFormat, format);
  };

  useEffect(() => {
    if (!shareOpen) return;

    const generation = ++shareGenerationRef.current;
    let objectUrl: string | null = null;

    void createThoughtCardBlob(shareFormat)
      .then((blob) => {
        if (shareGenerationRef.current !== generation) return;
        objectUrl = URL.createObjectURL(blob);
        setShareBlob(blob);
        setSharePreviewUrl(objectUrl);
      })
      .catch(() => {
        if (shareGenerationRef.current === generation) setShareError(true);
      })
      .finally(() => {
        if (shareGenerationRef.current === generation) setShareLoading(false);
      });

    return () => {
      shareGenerationRef.current += 1;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [createThoughtCardBlob, shareFormat, shareOpen, shareRenderVersion]);

  const copyThoughtText = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(thoughtCopyText);
      showActionNotice("thought-copied");
    } catch {
      setActionNotice(null);
    }
  }, [showActionNotice, thoughtCopyText]);

  const copyRecommendation = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(recommendationText);
      showActionNotice("recommendation-copied", 2400);
    } catch {
      setActionNotice(null);
    }
  }, [recommendationText, showActionNotice]);

  const shareViaSystem = useCallback(async () => {
    try {
      if (!navigator.share) {
        await navigator.clipboard.writeText(`${shareText}\n${brand.storeUrl}`);
        showActionNotice("copied");
        return;
      }

      const shareData: ShareData = {
        title: shareTitle,
        text: shareText,
        url: brand.storeUrl,
      };
      if (shareBlob) {
        const { thoughtCardFilename } = await loadThoughtCardModule();
        const file = new File(
          [shareBlob],
          thoughtCardFilename(localizedBrandName, displayedName, shareFormat),
          { type: "image/png" },
        );
        if (navigator.canShare?.({ files: [file] })) shareData.files = [file];
      }
      await navigator.share(shareData);
      closeShare();
    } catch (error) {
      if (!(error instanceof DOMException && error.name === "AbortError")) {
        setActionNotice(null);
      }
    }
  }, [closeShare, displayedName, localizedBrandName, shareBlob, shareFormat, shareText, shareTitle, showActionNotice]);

  const saveImage = useCallback(async (
    format: ThoughtCardFormat = "portrait45",
    prefetchedBlob?: Blob | null,
    closeMenuAfter = true,
  ) => {
    if (imageSavingRef.current) return;
    imageSavingRef.current = true;
    setImageSaving(true);
    const shouldReturnFocusToMenu = closeMenuAfter && menuOpen;
    if (closeMenuAfter) setMenuOpen(false);
    showActionNotice("image-saving", 8000);
    try {
      const blob = prefetchedBlob ?? await createThoughtCardBlob(format);
      const { downloadBlob, thoughtCardFilename } = await loadThoughtCardModule();
      downloadBlob(blob, thoughtCardFilename(localizedBrandName, displayedName, format));
      showActionNotice("image-saved", 2200);
    } catch {
      showActionNotice("image-error", 2600);
    } finally {
      imageSavingRef.current = false;
      setImageSaving(false);
    }
    if (shouldReturnFocusToMenu && !detailOpen) {
      window.requestAnimationFrame(() => menuButtonRef.current?.focus({ preventScroll: true }));
    }
  }, [createThoughtCardBlob, detailOpen, displayedName, localizedBrandName, menuOpen, showActionNotice]);

  const openComparison = useCallback((entry: ResolvedConnection) => {
    setComparisonKey(entry.key);
  }, []);

  const goToThought = useCallback(async (thoughtId: string) => {
    let catalog = economicsCatalogRef.current;
    let targetThought = thoughtById.get(thoughtId);
    if (!targetThought && thoughtId.startsWith("economics-")) {
      catalog = await ensureEconomicsCatalog().catch(() => null);
      targetThought = catalog?.thoughts.find((item) => item.id === thoughtId);
    }
    if (!targetThought) return;
    const sourceLibraryId = libraryModeForThought(targetThought);
    const nextLibraryMode = contentLibrary === "random" ? "random" : sourceLibraryId;
    const targetEconomicsCollection = sourceLibraryId === "economics"
      ? catalog?.collectionForThought(thoughtId)
        ?? activeEconomicsCollectionForThought(thoughtId)
      : null;
    const targetPsychologyCollection = sourceLibraryId === "psychology"
      ? psychologyCollectionForThought(thoughtId)
      : null;
    const targetCollectionId = targetThought.customKnowledge?.collectionId;
    const targetCollectionThoughts = targetCollectionId
      ? knowledgeCollectionsToThoughts(
          customCollections.filter((collection) => collection.id === targetCollectionId),
        )
      : customThoughts;
    let nextLibraryThoughts: Thought[];
    if (nextLibraryMode === "economics" && targetEconomicsCollection) {
      nextLibraryThoughts = (catalog?.thoughtGroups ?? activeEconomicsThoughtGroups)[targetEconomicsCollection];
    } else if (nextLibraryMode === "psychology" && targetPsychologyCollection) {
      nextLibraryThoughts = psychologyThoughtGroups[targetPsychologyCollection];
    } else if (nextLibraryMode === "random" && catalog) {
      nextLibraryThoughts = [
        ...allThoughts.filter((item) => !item.id.startsWith("economics-")),
        ...catalog.thoughts,
        ...allCustomThoughts,
      ];
    } else {
      nextLibraryThoughts = thoughtsForContentLibraryMode(
          nextLibraryMode,
          nextLibraryMode === "random" ? allCustomThoughts : targetCollectionThoughts,
        );
    }
    const nextThoughts = nextLibraryThoughts.filter((item) => !blocked.includes(item.id));
    const nextIndex = nextThoughts.findIndex((item) => item.id === thoughtId);
    if (nextIndex < 0) return;
    if (nextLibraryMode === "custom" && targetCollectionId) {
      setSelectedKnowledgeCollectionId(targetCollectionId);
      window.localStorage.setItem(storageKeys.selectedKnowledgeCollection, targetCollectionId);
    }
    if (nextLibraryMode === "economics" && targetEconomicsCollection) {
      setEconomicsCollection(targetEconomicsCollection);
      window.localStorage.setItem(
        storageKeys.economicsCollection,
        targetEconomicsCollection,
      );
    }
    if (nextLibraryMode === "psychology" && targetPsychologyCollection) {
      setPsychologyCollection(targetPsychologyCollection);
      window.localStorage.setItem(
        storageKeys.psychologyCollection,
        targetPsychologyCollection,
      );
    }
    navigationHistoryRef.current = [nextIndex];
    navigationHistoryPositionRef.current = 0;
    updateContentLibrary(nextLibraryMode);
    updateIndex(nextIndex);
    setInterpretationView("reading");
    setComparisonKey(null);
    setMenuOpen(false);
    setSavedOpen(false);
    setReadingUnitOpen(false);
    setDetailOpen(true);
    window.localStorage.setItem(storageKeys.contentLibrary, nextLibraryMode);
    window.requestAnimationFrame(() => {
      detailSheetRef.current?.scrollTo({ top: 0, behavior: preferredScrollBehavior() });
      detailCloseButtonRef.current?.focus({ preventScroll: true });
    });
  }, [
    activeEconomicsCollectionForThought,
    activeEconomicsThoughtGroups,
    allCustomThoughts,
    blocked,
    contentLibrary,
    customCollections,
    customThoughts,
    ensureEconomicsCatalog,
    thoughtById,
    updateContentLibrary,
    updateIndex,
  ]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (readingUnitOpen || knowledgeStudioOpen || onboardingOpen || shareOpen || savedOpen || detailOpen || menuOpen) {
          event.preventDefault();
        }
        if (readingUnitOpen) {
          closeReadingUnit();
        } else if (knowledgeStudioOpen) {
          setKnowledgeStudioOpen(false);
        } else if (onboardingOpen) {
          completeOnboarding();
        } else if (shareOpen) {
          closeShare();
        } else if (savedOpen) {
          closeSavedLibrary();
        } else if (detailOpen) {
          closeDetail();
        } else if (menuOpen) {
          setMenuOpen(false);
          window.requestAnimationFrame(() => menuButtonRef.current?.focus({ preventScroll: true }));
        }
        return;
      }

      if (readingUnitOpen || knowledgeStudioOpen || shareOpen || savedOpen) return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target instanceof HTMLElement ? event.target : null;
      if (target?.closest('input, textarea, select, [contenteditable]:not([contenteditable="false"])')) return;
      const isActivationTarget = Boolean(target?.closest("button, a, [role='button']"));
      if (isActivationTarget && (event.key === "Enter" || event.key === " ")) return;

      const lowerKey = event.key.toLowerCase();
      if (detailOpen) {
        if (!event.repeat && lowerKey === "f") {
          event.preventDefault();
          toggleSaved();
        } else if (!event.repeat && lowerKey === "b") {
          event.preventDefault();
          blockCurrentThought();
        } else if (!event.repeat && lowerKey === "s") {
          event.preventDefault();
          openShareFromDetail();
        } else if (!event.repeat && lowerKey === "d") {
          event.preventDefault();
          void saveImage();
        }
        return;
      }

      if (event.key === "ArrowRight" || event.key === " ") {
        event.preventDefault();
        next();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        previous();
      } else if (event.key === "Enter") {
        event.preventDefault();
        openDetail();
      } else if (!event.repeat && lowerKey === "f") {
        event.preventDefault();
        toggleSaved();
      } else if (!event.repeat && lowerKey === "b") {
        event.preventDefault();
        blockCurrentThought();
      } else if (!event.repeat && lowerKey === "s") {
        event.preventDefault();
        openShare();
      } else if (!event.repeat && lowerKey === "d") {
        event.preventDefault();
        void saveImage();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [blockCurrentThought, closeDetail, closeReadingUnit, closeSavedLibrary, closeShare, completeOnboarding, detailOpen, knowledgeStudioOpen, menuOpen, next, onboardingOpen, openDetail, openShare, openShareFromDetail, previous, readingUnitOpen, saveImage, savedOpen, shareOpen, toggleSaved]);

  const onTouchEnd = (event: React.TouchEvent) => {
    if (readingUnitOpen || knowledgeStudioOpen || shareOpen || savedOpen) {
      touchStart.current = null;
      return;
    }
    if (touchStart.current === null) return;
    const distance = event.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(distance) > 55) {
      if (distance < 0) next();
      else previous();
    }
    touchStart.current = null;
  };

  const style = {
    "--palette-paper": thought.palette[0],
    "--palette-wave-1": thought.palette[1],
    "--palette-wave-2": thought.palette[2],
    "--palette-ink": thought.palette[3],
    "--paper": thought.palette[0],
    "--wave-1": thought.palette[1],
    "--wave-2": thought.palette[2],
    "--ink": thought.palette[3],
  } as React.CSSProperties;

  return (
    <main className="app-shell" style={style}>
      <section
        className={`moment style-${visualStyle} ${detailOpen ? "detail-open" : ""} ${shareOpen ? "share-open" : ""} ${savedOpen ? "saved-open" : ""} ${knowledgeStudioOpen ? "knowledge-open" : ""}`}
        lang={languageMode === "en" ? "en" : languageMode === "zh-hant" ? "zh-Hant" : "zh-Hans"}
        onTouchStart={(event) => (touchStart.current = event.touches[0].clientX)}
        onTouchEnd={onTouchEnd}
        aria-label={menuLabel(`${brand.nameZhHans}思想卡片`, `${brand.nameEn} thought card`)}
      >
        <div className="thought-field" aria-hidden="true">
          <div className="orbit orbit-wide" />
          <div className="orbit orbit-mid" />
          <div className="orbit orbit-close" />
          <div className="orbit-node" />
        </div>
        <div className="manuscript-index" aria-hidden="true">
          <span>{languageMode === "en"
            ? `${thoughtTopic.englishLabel} Proposition`
            : localizeChinese(`${thoughtTopic.label}命题`)}</span>
          <strong>{String(thoughtNumber).padStart(2, "0")}</strong>
        </div>

        <div
          ref={quoteStageRef}
          className="quote-stage"
          key={thought.id}
          id="top"
          role="button"
          tabIndex={0}
          aria-keyshortcuts="Enter"
          aria-label={languageMode === "en"
            ? `Read the detailed interpretation of ${displayedName}`
            : localizeChinese(`查看${thought.name}思想的详细解读`)}
          onClick={openDetail}
          onKeyDown={onQuoteKeyDown}
        >
          <div className="quote-content">
            <PrimaryQuoteTag className={`primary-quote language-${languageMode}${showEnglishQuote && showChineseQuote ? " with-english" : ""}${chineseQuoteFirst ? " quote-chinese-first" : ""}`}>
              {chineseQuoteFirst && showChineseQuote ? (
                <span className="main-quote-line main-quote-chinese">
                  <PunctuatedQuote text={localizeChinese(thought.text)} />
                </span>
              ) : null}
              {showEnglishQuote ? (
                <span className="main-quote-line main-quote-english" lang="en">
                  {thought.english}
                </span>
              ) : null}
              {!chineseQuoteFirst && showChineseQuote ? (
                <span className="main-quote-line main-quote-chinese">
                  <PunctuatedQuote text={localizeChinese(thought.text)} />
                </span>
              ) : null}
            </PrimaryQuoteTag>
            <div className={`origin-stack language-${languageMode}`}>
              <div
                className={`origin-line ${languageMode === "en" ? "origin-english" : "origin-chinese"}`}
                lang={languageMode === "en" ? "en" : undefined}
              >
                <span className={`origin-nature nature-${thoughtPresentation.nature}`}>
                  {displayedPresentationLabel}
                </span>
                <span className="work-title">{displayedPresentationAttribution}</span>
              </div>
            </div>
          </div>
          <div
            className={`onboarding-hint onboarding-hint-quote ${onboardingOpen && onboardingHints.quote && !detailOpen && !shareOpen && !savedOpen && !menuOpen ? "visible" : ""}`}
            role="status"
            aria-hidden={!onboardingOpen || !onboardingHints.quote || detailOpen || shareOpen || savedOpen || menuOpen}
          >
            <span>{menuLabel("点击观点，读深一层", "Select the thought to read deeper")}</span>
            <kbd>Enter</kbd>
          </div>
        </div>

        <div
          className={`corner-menu-scrim ${menuOpen ? "open" : ""}`}
          aria-hidden="true"
          onClick={() => setMenuOpen(false)}
        />
        <div
          className={`corner-menu language-${languageMode} ${menuOpen ? "open" : ""}`}
          aria-hidden={!menuOpen}
          inert={!menuOpen ? true : undefined}
        >
          <div className="menu-heading">
            <strong>{menuLabel("设置", "Settings")}</strong>
            <span>{menuLabel("自动保存", "Saved automatically")}</span>
          </div>
          <div className="menu-content-picker">
            <div className="menu-content-heading">
              <span className="menu-label">{menuLabel("内容", "Content")}</span>
              <div className="menu-content-tools">
                <button type="button" className="menu-saved-review" onClick={() => openSavedLibrary("saved")}>
                  <span>{menuLabel("我的收藏", "Saved")}</span>
                  <small>{savedThoughts.length}</small>
                  <i aria-hidden="true">→</i>
                </button>
              </div>
            </div>
            <div
              className="menu-content-sections"
              role="tablist"
              aria-label={menuLabel("内容分类", "Content categories")}
            >
              {contentMenuSections.map((section) => (
                <button
                  key={section.id}
                  type="button"
                  role="tab"
                  aria-selected={contentMenuSection === section.id}
                  className={contentMenuSection === section.id ? "active" : ""}
                  onClick={() => setContentMenuSection(section.id)}
                >
                  {menuLabel(section.label, section.englishLabel)}
                </button>
              ))}
            </div>
            <div
              className={`content-options content-options-${contentMenuSection}`}
              role="group"
              aria-label={contentMenuSection === "mine"
                ? menuLabel("我的内容", "My content")
                : contentMenuSection === "economics"
                  ? menuLabel("选择经济内容", "Choose an economics collection")
                  : contentMenuSection === "psychology"
                    ? menuLabel("选择心理内容", "Choose a psychology collection")
                  : menuLabel("选择思想集", "Choose a collection")}
            >
              {contentMenuSection === "mine" ? (
                <>
                  {customCollections.map((collection) => {
                    const isSelectable = collection.enabled && collection.cards.length > 0;
                    const isActive = contentLibrary === "custom"
                      && selectedKnowledgeCollectionId === collection.id;
                    return (
                      <button
                        key={collection.id}
                        type="button"
                        aria-pressed={isActive}
                        aria-label={isSelectable
                          ? collection.title
                          : menuLabel(`${collection.title}，尚未启用`, `${collection.title}, not enabled`)}
                        className={`${isActive ? "active " : ""}menu-collection-option${isSelectable ? "" : " unavailable"}`}
                        onClick={() => chooseKnowledgeCollection(collection)}
                      >
                        <span>{collection.title}</span>
                        <small>{isSelectable
                          ? menuLabel(`${collection.cards.length} 张`, `${collection.cards.length} cards`)
                          : menuLabel("未启用", "Not enabled")}</small>
                      </button>
                    );
                  })}
                  <button type="button" className="menu-add-collection" onClick={openKnowledgeStudio}>
                    <span aria-hidden="true">＋</span>
                    {menuLabel("添加知识集", "Add collection")}
                  </button>
                </>
              ) : contentMenuSection === "economics" ? (
                economicsCollectionOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    aria-pressed={contentLibrary === "economics"
                      && economicsCollection === option.id}
                    className={contentLibrary === "economics"
                      && economicsCollection === option.id
                      ? "active"
                      : ""}
                    onClick={() => void chooseEconomicsCollection(option.id)}
                  >
                    {menuLabel(option.label, option.englishLabel)}
                  </button>
                ))
              ) : contentMenuSection === "psychology" ? (
                psychologyCollectionOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    aria-pressed={contentLibrary === "psychology"
                      && psychologyCollection === option.id}
                    className={contentLibrary === "psychology"
                      && psychologyCollection === option.id
                      ? "active"
                      : ""}
                    onClick={() => choosePsychologyCollection(option.id)}
                  >
                    {menuLabel(option.label, option.englishLabel)}
                  </button>
                ))
              ) : (
                (contentMenuSection === "philosophy"
                  ? philosophyLibraryIds
                  : thoughtLibraryIds
                ).map((libraryId) => {
                  const libraryLabel = languageMode === "en"
                    ? contentLibraries[libraryId].shortEnglishLabel
                    : localizeChinese(contentLibraries[libraryId].shortLabel);
                  return (
                    <button
                      key={libraryId}
                      type="button"
                      aria-pressed={contentLibrary === libraryId}
                      className={contentLibrary === libraryId ? "active" : ""}
                      onClick={() => void chooseContentLibrary(libraryId)}
                    >
                      {libraryLabel}
                    </button>
                  );
                })
              )}
            </div>
          </div>
          <details className="menu-disclosure" open>
            <summary><span>{menuLabel("显示", "Display")}</span><small>{menuLabel("样式、语言与双语", "Style, language, and bilingual quotes")}</small></summary>
            <div className="menu-disclosure-body">
              <div className="menu-style-picker">
                <span className="menu-label">{menuLabel("手稿样式", "Manuscript Style")}</span>
                <div className="style-options">
                  {visualStyles.map((item) => (
                    <button
                      key={item.id}
                      className={visualStyle === item.id ? "active" : ""}
                      onClick={() => chooseVisualStyle(item.id)}
                      aria-pressed={visualStyle === item.id}
                    >
                      {menuLabel(item.label, item.englishLabel)}
                    </button>
                  ))}
                </div>
              </div>
              <div className="menu-language-picker">
                <span className="menu-label">{menuLabel("主语言", "Primary Language")}</span>
                <div className="language-options">
                  {languageModes.map((item) => (
                    <button
                      key={item.id}
                      className={languageMode === item.id ? "active" : ""}
                      onClick={() => chooseLanguageMode(item.id)}
                      aria-pressed={languageMode === item.id}
                    >
                      {menuLabel(item.label, item.englishLabel)}
                    </button>
                  ))}
                </div>
                {isChineseLanguage ? (
                  <div className="quote-english-toggle">
                    <span>{menuLabel("句子同时带英文", "Show English with quotes")}</span>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={includeEnglishQuote}
                      aria-label={menuLabel("句子同时带英文", "Show English with quotes")}
                      onClick={toggleEnglishQuote}
                    >
                      <span aria-hidden="true" />
                    </button>
                  </div>
                ) : null}
                {languageMode === "zh-hant" && traditionalLoadFailed ? (
                  <p className="menu-language-note" role="status">
                    繁体转换暂时不可用，当前显示简体。
                  </p>
                ) : null}
              </div>
            </div>
          </details>
          <details className="menu-disclosure menu-shortcuts" open>
            <summary><span>{menuLabel("快捷键", "Shortcuts")}</span></summary>
            <div className="menu-actions">
              <button onClick={previous} aria-keyshortcuts="ArrowLeft">
                <span>{menuLabel("上一则", "Previous")}</span>
                <kbd>←</kbd>
              </button>
              <button onClick={next} aria-keyshortcuts="ArrowRight Space">
                <span>{menuLabel("换一则", "Next")}</span>
                <span className="shortcut-group"><kbd>→</kbd><kbd>Space</kbd></span>
              </button>
              <button onClick={openDetail} aria-keyshortcuts="Enter">
                <span>{menuLabel("读解", "Read")}</span>
                <kbd>Enter</kbd>
              </button>
              <button onClick={toggleSaved} aria-keyshortcuts="F">
                <span>{saved.includes(thought.id)
                  ? menuLabel("已收藏", "Saved")
                  : menuLabel("收藏", "Save")}</span>
                <kbd>F</kbd>
              </button>
              <button onClick={blockCurrentThought} aria-keyshortcuts="B">
                <span>{menuLabel("屏蔽当前", "Hide")}</span>
                <kbd>B</kbd>
              </button>
              <button onClick={openShare} aria-keyshortcuts="S">
                <span>{menuLabel("分享观点", "Share")}</span>
                <kbd>S</kbd>
              </button>
              <button
                onClick={() => void saveImage()}
                aria-keyshortcuts="D"
                aria-busy={imageSaving}
                disabled={imageSaving}
              >
                <span>{imageSaving
                  ? menuLabel("正在生成", "Creating")
                  : menuLabel("保存图片", "Save image")}</span>
                <kbd>D</kbd>
              </button>
              <p className="menu-dismiss-hint"><span>{menuLabel("关闭浮层", "Close")}</span><kbd>Esc</kbd></p>
            </div>
          </details>
          <div className="menu-project">
            <button type="button" onClick={openOnboarding}>
              <span>{menuLabel("新手引导", "Quick guide")}</span>
              <span aria-hidden="true">?</span>
            </button>
            <button
              type="button"
              onClick={() => void copyRecommendation()}
              aria-label={menuLabel(
                "复制推荐语和 Chrome 商店链接",
                "Copy recommendation and Chrome Web Store link",
              )}
            >
              <span>{menuLabel("推荐给好友", "Recommend to a friend")}</span>
              <span className="menu-project-action">{menuLabel("复制", "Copy")}</span>
            </button>
          </div>
        </div>
        <button
          ref={menuButtonRef}
          className={`corner-menu-button ${menuOpen ? "open" : ""}`}
          onClick={() => {
            if (!menuOpen) dismissOnboardingHint("menu");
            setMenuOpen((value) => !value);
          }}
          aria-label={menuOpen
            ? menuLabel("收起菜单", "Close menu")
            : menuLabel("打开菜单", "Open menu")}
          aria-expanded={menuOpen}
        >
          <span aria-hidden="true">•••</span>
        </button>

        <div
          className={`onboarding-hint onboarding-hint-navigation ${onboardingOpen && onboardingHints.navigate && !detailOpen && !shareOpen && !savedOpen && !menuOpen ? "visible" : ""}`}
          role="status"
          aria-hidden={!onboardingOpen || !onboardingHints.navigate || detailOpen || shareOpen || savedOpen || menuOpen}
        >
          <span className="onboarding-key-pair"><kbd>←</kbd><kbd>→</kbd></span>
          <span>{menuLabel("换一则", "Another thought")}</span>
        </div>
        <div
          className={`onboarding-hint onboarding-hint-menu ${onboardingOpen && onboardingHints.menu && !detailOpen && !shareOpen && !savedOpen && !menuOpen ? "visible" : ""}`}
          role="status"
          aria-hidden={!onboardingOpen || !onboardingHints.menu || detailOpen || shareOpen || savedOpen || menuOpen}
        >
          <span>{menuLabel("设置、分享与内容切换", "Settings, sharing and content")}</span>
        </div>

        <div
          className={`saved-scrim ${savedOpen ? "open" : ""}`}
          aria-hidden="true"
          onClick={closeSavedLibrary}
        />
        <section
          ref={savedDialogRef}
          className={`saved-dialog thoughtbook-dialog ${savedOpen ? "open" : ""}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="thoughtbook-title"
          aria-describedby="thoughtbook-description"
          aria-hidden={!savedOpen}
          inert={!savedOpen ? true : undefined}
          onKeyDown={onSavedKeyDown}
          onTouchStart={(event) => event.stopPropagation()}
          onTouchEnd={(event) => event.stopPropagation()}
        >
          <div className="saved-heading">
            <div>
              <span id="thoughtbook-title">{menuLabel("我的收藏", "My Collection")}</span>
              <small>{menuLabel(
                `${savedThoughts.length} 藏 · ${recentThoughts.length} 阅 · ${blockedThoughts.length} 屏蔽`,
                `${savedThoughts.length} saved · ${recentThoughts.length} read · ${blockedThoughts.length} hidden`,
              )}</small>
            </div>
            <button
              ref={savedCloseButtonRef}
              type="button"
              onClick={closeSavedLibrary}
              aria-label={menuLabel("关闭我的收藏", "Close my collection")}
              aria-keyshortcuts="Escape"
            >×</button>
          </div>
          <p id="thoughtbook-description" className="sr-only">{menuLabel(
            "在收藏、最近读过与已屏蔽内容中检索和管理观点。",
            "Search and manage saved, recently read, and hidden thoughts.",
          )}</p>

          <div className="thoughtbook-tabs" role="tablist" aria-label={menuLabel("我的收藏分类", "My collection sections")}>
            {([
              ["saved", menuLabel("收藏", "Saved"), savedThoughts.length],
              ["recent", menuLabel("最近读过", "Recent"), recentThoughts.length],
              ["blocked", menuLabel("已屏蔽", "Hidden"), blockedThoughts.length],
            ] as const).map(([tab, label, count]) => (
              <button
                key={tab}
                id={`thoughtbook-tab-${tab}`}
                type="button"
                role="tab"
                aria-selected={thoughtbookTab === tab}
                aria-controls="thoughtbook-panel"
                tabIndex={thoughtbookTab === tab ? 0 : -1}
                className={thoughtbookTab === tab ? "active" : ""}
                onKeyDown={(event) => onThoughtbookTabKeyDown(event, tab)}
                onClick={() => setThoughtbookTab(tab)}
              >
                <span>{label}</span><em>{count}</em>
              </button>
            ))}
          </div>

          <div className="thoughtbook-tools">
            <label className="thoughtbook-search">
              <span className="sr-only">{menuLabel("检索我的收藏", "Search my collection")}</span>
              <input
                type="search"
                value={thoughtbookSearch}
                onChange={(event) => setThoughtbookSearch(event.target.value)}
                placeholder={menuLabel("检索作者、书名或观点", "Search author, work, or thought")}
              />
            </label>
            <label>
              <span>{menuLabel("思想集", "Collection")}</span>
              <select
                value={thoughtbookLibrary}
                onChange={(event) => {
                  setThoughtbookLibrary(event.target.value as ThoughtbookLibraryFilter);
                  setThoughtbookTopic("all");
                }}
              >
                <option value="all">{menuLabel("全部思想集", "All collections")}</option>
                {Object.values(contentLibraries).map((library) => (
                  <option key={library.id} value={library.id}>
                    {menuLabel(library.label, library.englishLabel)}
                  </option>
                ))}
                <option value="custom">{menuLabel("我的知识", "My Knowledge")}</option>
              </select>
            </label>
            <label>
              <span>{menuLabel("主题", "Topic")}</span>
              <select value={thoughtbookTopic} onChange={(event) => setThoughtbookTopic(event.target.value)}>
                <option value="all">{menuLabel("全部主题", "All topics")}</option>
                {thoughtbookTopics.map((topicId) => {
                  const topicOption = Object.values(contentLibraries)
                    .flatMap((library) => library.topics)
                    .find((option) => option.id === topicId);
                  return <option key={topicId} value={topicId}>{topicOption
                    ? menuLabel(topicOption.label, topicOption.englishLabel)
                    : topicId}</option>;
                })}
              </select>
            </label>
          </div>

          <div
            id="thoughtbook-panel"
            className="thoughtbook-panel"
            role="tabpanel"
            aria-labelledby={`thoughtbook-tab-${thoughtbookTab}`}
          >
            {thoughtbookTab === "recent" && recentThoughts.length > 0 ? (
              <div className="thoughtbook-meta-row">
              <span>{menuLabel("仅保留最近 100 则", "Keeping the latest 100 thoughts")}</span>
              <button type="button" onClick={() => {
                setRecent([]);
                window.localStorage.removeItem(storageKeys.recent);
              }}>{menuLabel("清空记录", "Clear history")}</button>
              </div>
            ) : null}

            {thoughtbookThoughts.length > 0 ? (
              <div className="saved-list thoughtbook-list">
              {thoughtbookThoughts.map((item) => {
                const itemQuote = languageMode === "en"
                  ? item.english?.trim() || item.text
                  : localizeChinese(item.text);
                const itemPresentation = resolveThoughtPresentation(item);
                const itemPresentationLabel = presentationLabelFor(item);
                const itemAttribution = presentationAttributionFor(item);
                const itemLibraryId = libraryModeForThought(item);
                const itemLibrary = itemLibraryId === "custom"
                  ? menuLabel("我的知识", "My Knowledge")
                  : menuLabel(
                    contentLibraries[itemLibraryId].label,
                    contentLibraries[itemLibraryId].englishLabel,
                  );

                return (
                  <article className={`saved-card ${thoughtbookTab === "blocked" ? "blocked-card" : ""}`} key={item.id}>
                    {thoughtbookTab === "blocked" ? (
                      <div className="saved-card-main">
                        <span className="saved-card-library">{itemLibrary}</span>
                        <span className={`saved-card-nature nature-${itemPresentation.nature}`}>
                          {itemPresentationLabel}
                        </span>
                        {itemPresentation.useQuotationMarks
                          ? <q>{itemQuote}</q>
                          : <p className="saved-card-statement">{itemQuote}</p>}
                        <span className="saved-card-source">{itemAttribution}</span>
                      </div>
                    ) : (
                      <button
                        className="saved-card-main"
                        type="button"
                        onClick={() => void goToThought(item.id)}
                        aria-label={menuLabel(
                          `查看${item.name}思想的完整解读`,
                          `Read the full interpretation of ${item.englishName}`,
                        )}
                      >
                      <span className="saved-card-library">{itemLibrary}</span>
                      <span className={`saved-card-nature nature-${itemPresentation.nature}`}>
                        {itemPresentationLabel}
                      </span>
                      {itemPresentation.useQuotationMarks
                        ? <q>{itemQuote}</q>
                        : <p className="saved-card-statement">{itemQuote}</p>}
                      <span className="saved-card-source">{itemAttribution}</span>
                      </button>
                    )}
                    {thoughtbookTab === "saved" ? (
                      <button
                        className="saved-card-remove"
                        type="button"
                        onClick={() => removeSaved(item.id)}
                        aria-label={menuLabel(
                          `取消收藏${item.name}的观点`,
                          `Remove ${item.englishName} from saved thoughts`,
                        )}
                      >{menuLabel("移除", "Remove")}</button>
                    ) : thoughtbookTab === "blocked" ? (
                      <button
                        className="saved-card-remove blocked-card-restore"
                        type="button"
                        onClick={() => restoreBlocked(item.id)}
                        aria-label={menuLabel(
                          `恢复${item.name}的观点`,
                          `Restore the thought by ${item.englishName}`,
                        )}
                      >{menuLabel("恢复", "Restore")}</button>
                    ) : null}
                  </article>
                );
              })}
              </div>
            ) : (
              <div className="saved-empty">
              <span aria-hidden="true">{thoughtbookSearch || thoughtbookLibrary !== "all" || thoughtbookTopic !== "all" ? "⌕" : "○"}</span>
              <strong>{thoughtbookSearch || thoughtbookLibrary !== "all" || thoughtbookTopic !== "all"
                ? menuLabel("没有符合条件的观点", "No matching thoughts")
                : thoughtbookTab === "saved"
                  ? menuLabel("还没有收藏", "No saved thoughts yet")
                  : thoughtbookTab === "recent"
                    ? menuLabel("还没有阅读记录", "No reading history yet")
                    : menuLabel("没有屏蔽内容", "No hidden thoughts")}</strong>
              <p>{thoughtbookTab === "saved"
                ? menuLabel(
                  "遇到想留下的思想，按 F，或在“操作”中选择收藏。",
                  "When a thought stays with you, press F or choose Save under Actions.",
                )
                : thoughtbookTab === "recent"
                  ? menuLabel("读过的观点会自动出现在这里。", "Thoughts you open will appear here automatically.")
                  : menuLabel(
                    "不想再遇到某则观点，可按 B，或在“操作”中选择“屏蔽当前”。",
                    "To stop seeing a thought, press B or choose Hide under Actions.",
                  )}</p>
              </div>
            )}
          </div>
        </section>

        <div className={`detail-scrim ${detailOpen ? "open" : ""}`} onClick={closeDetail} />
        <aside
          ref={detailSheetRef}
          className={`detail-sheet ${detailOpen ? "open" : ""}`}
          role="dialog"
          aria-modal={detailOpen && !shareOpen && !savedOpen && !readingUnitOpen}
          aria-labelledby="detail-title"
          aria-hidden={!detailOpen || shareOpen || savedOpen || readingUnitOpen}
          inert={!detailOpen || shareOpen || savedOpen || readingUnitOpen ? true : undefined}
          onKeyDown={onDetailKeyDown}
        >
          <div className="sheet-handle" />
          <div className="detail-sheet-content">
            <div className="sheet-heading">
              <span id="detail-title">{menuLabel("读深一层", "Read Deeper")}</span>
              <button
                ref={detailCloseButtonRef}
                onClick={closeDetail}
                aria-label={menuLabel("关闭解读", "Close interpretation")}
                aria-keyshortcuts="Escape"
              >×</button>
            </div>
            <div className="detail-layout" data-lineage={hasLineage ? "present" : "empty"}>
              <div className="detail-primary">
                <p className="detail-topic">{languageMode === "en"
                  ? `${thoughtTopic.englishLabel} · ${displayedSchool}`
                  : `${localizeChinese(thoughtTopic.label)} · ${displayedSchool}`}</p>
                <div
                  ref={detailQuoteRef}
                  className={`detail-quote${detailIllustration ? " detail-quote-illustrated" : ""}`}
                >
                  <button
                    type="button"
                    className="detail-quote-share-cue"
                    onClick={openShareFromDetail}
                    aria-label={menuLabel("分享这张思想卡", "Share this thought card")}
                  >
                    {menuLabel("分享卡片", "Share card")}
                    <i aria-hidden="true">↗</i>
                  </button>
                  {detailIllustration ? (
                    <div className="detail-quote-art" aria-hidden="true">
                      {/* Static local artwork should keep its authored crop and bypass image optimization. */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={detailIllustration.src}
                        width={detailIllustration.width}
                        height={detailIllustration.height}
                        alt=""
                        loading="lazy"
                      />
                    </div>
                  ) : null}
                  <div className="detail-quote-copy">
                    <div className="detail-quote-chrome">
                      <span className={`detail-quote-label nature-${thoughtPresentation.nature}`}>
                        {displayedPresentationLabel}
                      </span>
                    </div>
                    {chineseQuoteFirst && showChineseQuote ? (
                      <div className="detail-quote-line">
                        <p>{thoughtPresentation.useQuotationMarks ? "「" : null}<PunctuatedQuote text={localizeChinese(thought.text)} />{thoughtPresentation.useQuotationMarks ? "」" : null}</p>
                      </div>
                    ) : null}
                    {showEnglishQuote ? (
                      <div className="detail-quote-line detail-quote-english" lang="en">
                        <p>{thoughtPresentation.useQuotationMarks ? `“${thought.english}”` : thought.english}</p>
                      </div>
                    ) : null}
                    {!chineseQuoteFirst && showChineseQuote ? (
                      <div className="detail-quote-line">
                        <p>{thoughtPresentation.useQuotationMarks ? "「" : null}<PunctuatedQuote text={localizeChinese(thought.text)} />{thoughtPresentation.useQuotationMarks ? "」" : null}</p>
                      </div>
                    ) : null}
                    <div className="detail-source-line">
                      <span className="detail-source-attribution">
                        {displayedPresentationAttribution}
                      </span>
                      <div
                        className="detail-source-verification"
                        aria-busy={!thought.customKnowledge && !sourceMetadata
                          && !(thoughtDepthState?.key === thoughtDepthKey
                            && thoughtDepthState.status === "error")}
                      >
                        <button
                          type="button"
                          className="detail-source-trigger"
                          aria-label={thought.customKnowledge
                            ? `${menuLabel("查看自定义内容来源", "View custom content source")}：${thought.customKnowledge.sourceStatus === "verified"
                              ? menuLabel("已记录", "Recorded")
                              : menuLabel("待核查", "Needs review")}`
                            : sourceCredibility
                            ? `${menuLabel("查看完整来源档案", "View full source record")}：${languageMode === "en"
                              ? sourceCredibility.reviewStatus.en
                              : localizeChinese(sourceCredibility.reviewStatus.zh)}`
                            : menuLabel("查看来源载入状态", "View source loading status")}
                        >
                          <span className="detail-source-check" aria-hidden="true">
                            {thought.customKnowledge
                              ? thought.customKnowledge.sourceStatus === "verified" ? "✓" : "○"
                              : sourceCredibility
                              ? sourceCredibility.reviewStatus.zh.includes("待复核") ? "○" : "✓"
                              : thoughtDepthState?.key === thoughtDepthKey
                                  && thoughtDepthState.status === "error" ? "!" : "…"}
                          </span>
                          <span>{thought.customKnowledge
                            ? thought.customKnowledge.sourceStatus === "verified"
                              ? menuLabel("已记录", "Recorded")
                              : menuLabel("待核查", "Needs review")
                            : sourceCredibility
                            ? languageMode === "en"
                              ? sourceCredibility.reviewStatus.en
                              : localizeChinese(sourceCredibility.reviewStatus.zh)
                            : thoughtDepthState?.key === thoughtDepthKey
                                && thoughtDepthState.status === "error"
                              ? menuLabel("来源暂不可用", "Source unavailable")
                              : menuLabel("来源载入中", "Loading source")}</span>
                        </button>
                        <section
                          className="detail-source-popover"
                          aria-labelledby="detail-source-popover-title"
                        >
                          <div className="detail-source-popover-heading">
                            <span>{menuLabel("来源档案", "SOURCE RECORD")}</span>
                            <strong id="detail-source-popover-title">{displayedPresentationLabel}</strong>
                          </div>
                          {thought.customKnowledge ? (
                            <>
                              <div className="source-trust-badges" aria-label={menuLabel("自定义内容说明", "Custom content notes")}>
                                <span>{menuLabel("方式", "Method")} · {thought.customKnowledge.provenance === "material"
                                  ? menuLabel("由材料整理", "From material")
                                  : thought.customKnowledge.provenance === "generated"
                                    ? menuLabel("由主题生成", "Topic-generated")
                                    : menuLabel("手动记录", "Manual")}</span>
                                <span>{menuLabel("状态", "Status")} · {thought.customKnowledge.sourceStatus === "verified"
                                  ? menuLabel("已记录", "Recorded")
                                  : menuLabel("待核查", "Needs review")}</span>
                                <span>{menuLabel("存储", "Storage")} · {menuLabel("仅此设备", "This device only")}</span>
                              </div>
                              <dl>
                                <div>
                                  <dt>{menuLabel("知识集", "Collection")}</dt>
                                  <dd>{thought.customKnowledge.collectionTitle}</dd>
                                </div>
                                <div>
                                  <dt>{menuLabel("作者", "Author")}</dt>
                                  <dd>{displayedName}</dd>
                                </div>
                                <div>
                                  <dt>{menuLabel("作品 / 来源", "Work / source")}</dt>
                                  <dd>{displayedWork}</dd>
                                </div>
                              </dl>
                              <p>{thought.customKnowledge.sourceStatus === "verified"
                                ? menuLabel(
                                  "这张卡保存在本机；“已记录”表示导入时存在材料定位或由你手动确认，不代表未定稿已独立核验其事实。",
                                  "This card is stored locally. “Recorded” means it had a material locator or was confirmed manually; NOTHING FINAL has not independently fact-checked it.",
                                )
                                : menuLabel(
                                  "这张卡的出处仍待核查。请在引用、分享或据此作出判断前回到原始材料确认。",
                                  "This card still needs source review. Return to the original material before quoting, sharing, or relying on it.",
                                )}</p>
                            </>
                          ) : sourceMetadata && sourceCredibility ? (
                            <>
                              <div className="source-trust-badges" aria-label={menuLabel("来源可信度说明", "Source credibility notes")}>
                                <span>{menuLabel("定位", "Locator")} · {languageMode === "en"
                                  ? sourceCredibility.reviewStatus.en
                                  : localizeChinese(sourceCredibility.reviewStatus.zh)}</span>
                                <span>{menuLabel("文本", "Text")} · {languageMode === "en"
                                  ? sourceCredibility.textNature.en
                                  : localizeChinese(sourceCredibility.textNature.zh)}</span>
                                <span>{menuLabel("译文", "Translation")} · {languageMode === "en"
                                  ? sourceCredibility.translationNature.en
                                  : localizeChinese(sourceCredibility.translationNature.zh)}</span>
                                <span>{menuLabel("核验", "Verification")} · {languageMode === "en"
                                  ? sourceCredibility.verificationStatus.en
                                  : localizeChinese(sourceCredibility.verificationStatus.zh)}</span>
                              </div>
                              <dl>
                                <div>
                                  <dt>{menuLabel("定位", "Locator")}</dt>
                                  <dd>{languageMode === "en"
                                    ? sourceMetadata.englishLocator
                                    : localizeChinese(sourceMetadata.locator)}</dd>
                                </div>
                                <div>
                                  <dt>{menuLabel("原作语言", "Original language")}</dt>
                                  <dd>{languageMode === "en"
                                    ? sourceMetadata.englishSourceLanguage
                                    : localizeChinese(sourceMetadata.sourceLanguage)}</dd>
                                </div>
                                {sourceMetadata.referenceEdition ? (
                                  <div>
                                    <dt>{menuLabel("参照版本", "Reference edition")}</dt>
                                    <dd>{languageMode === "en"
                                      ? sourceMetadata.englishReferenceEdition
                                      : localizeChinese(sourceMetadata.referenceEdition)}</dd>
                                  </div>
                                ) : null}
                                {sourceMetadata.useBasis ? (
                                  <div>
                                    <dt>{menuLabel("使用依据", "Use basis")}</dt>
                                    <dd>{languageMode === "en"
                                      ? sourceMetadata.englishUseBasis
                                      : localizeChinese(sourceMetadata.useBasis)}</dd>
                                  </div>
                                ) : null}
                              </dl>
                              <p>{languageMode === "en"
                                ? sourceMetadata.englishProvenanceNote
                                : localizeChinese(sourceMetadata.provenanceNote)}</p>
                              <p className="source-scope-note">{languageMode === "en"
                                ? sourceCredibility.scopeNote.en
                                : localizeChinese(sourceCredibility.scopeNote.zh)}</p>
                              <div className="detail-source-popover-links">
                                {sourceMetadata.referenceLinks?.map((link) => (
                                  <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                                    {languageMode === "en" ? link.englishLabel : localizeChinese(link.label)}
                                    <span aria-hidden="true">↗</span>
                                  </a>
                                ))}
                                <a
                                  href={`https://github.com/NorthGateChat/agora-philosophy/issues/new?title=${encodeURIComponent(`Source correction: ${thought.id}`)}`}
                                  target="_blank"
                                  rel="noreferrer"
                                >{menuLabel("发现出处或翻译问题？提交校订", "Found a source or translation issue? Suggest a correction")}<span aria-hidden="true">↗</span></a>
                              </div>
                            </>
                          ) : (
                            <div className="detail-source-popover-loading" role="status">
                              {thoughtDepthState?.key === thoughtDepthKey
                                && thoughtDepthState.status === "error"
                                ? menuLabel("来源档案暂时无法载入", "The source record could not be loaded")
                                : menuLabel("正在载入出处与版本记录…", "Loading source and edition notes…")}
                            </div>
                          )}
                        </section>
                      </div>
                    </div>
                  </div>
                </div>
                {displayedPlainText && isChineseLanguage ? (
                  <div className="plain-language-reading">
                    <span>{menuLabel("今译", "PLAIN-LANGUAGE READING")}</span>
                    <p>{displayedPlainText}</p>
                  </div>
                ) : null}
                {displayedEditorialSummary ? (
                  <div className="editorial-summary-reading">
                    <span>{menuLabel("命题整理", "EDITORIAL SUMMARY")}</span>
                    <p>{displayedEditorialSummary}</p>
                  </div>
                ) : null}
                <div
                  className="interpretation-tabs"
                  role="tablist"
                  aria-label={menuLabel("解读层次", "Interpretation layers")}
                >
                  {interpretationViews.map((view) => {
                    const label = view === "reading"
                      ? menuLabel("核心解读", "Core reading")
                      : view === "context"
                        ? menuLabel("放回语境", "In context")
                        : menuLabel("辨析边界", "Distinctions");
                    return (
                      <button
                        key={view}
                        id={`interpretation-tab-${view}`}
                        type="button"
                        role="tab"
                        aria-selected={interpretationView === view}
                        aria-controls="interpretation-panel"
                        tabIndex={interpretationView === view ? 0 : -1}
                        className={interpretationView === view ? "active" : ""}
                        onClick={() => setInterpretationView(view)}
                        onKeyDown={(event) => onInterpretationTabKeyDown(event, view)}
                      >{label}</button>
                    );
                  })}
                </div>
                <div
                  id="interpretation-panel"
                  className="interpretation-panel"
                  role="tabpanel"
                  aria-labelledby={`interpretation-tab-${interpretationView}`}
                  aria-busy={!thoughtDepth
                    && !(thoughtDepthState?.key === thoughtDepthKey
                      && thoughtDepthState.status === "error")}
                  ref={interpretationPanelRef}
                >
                  <span className="interpretation-kicker">{interpretationView === "reading"
                    ? menuLabel("命题本身", "THE CLAIM")
                    : interpretationView === "context"
                      ? menuLabel("主题与论证语境", "THEMATIC AND ARGUMENT CONTEXT")
                      : menuLabel("避免过度简化", "AVOID OVERREADING")}</span>
                  {interpretationView === "reading" ? (
                    <p className="reflection">{displayedReflection}</p>
                  ) : interpretationView === "context" ? (
                    <>
                      <p className="reflection interpretation-copy">{displayedContext}</p>
                      {displayedSourceLocator || contextSourceLinks.length > 0 ? (
                        <aside
                          className="interpretation-source-route"
                          aria-label={menuLabel("原文定位与入口", "Source locator and links")}
                        >
                          {sourceMetadata?.verificationStatus === "primary-text-checked" ? (
                            <button
                              ref={readingUnitTriggerRef}
                              type="button"
                              className={readingUnitStyles.trigger}
                              onClick={openReadingUnit}
                              aria-haspopup="dialog"
                            >
                              {menuLabel("读所在篇章", "Read containing passage")}
                              <span className={readingUnitStyles.triggerArrow} aria-hidden="true">→</span>
                            </button>
                          ) : null}
                          {displayedSourceLocator ? (
                            <p className="interpretation-source-locator">
                              <span>{menuLabel("精确定位", "Exact locator")}</span>
                              <cite>{displayedSourceLocator}</cite>
                            </p>
                          ) : null}
                          {contextSourceLinks.length > 0 ? (
                            <div className="interpretation-source-links">
                              <span>{menuLabel("原文 / 扫描入口", "SOURCE / SCAN")}</span>
                              <nav
                                className="detail-source-popover-links"
                                aria-label={menuLabel("打开原文或扫描版本", "Open source text or scan")}
                              >
                                {contextSourceLinks.map((link) => (
                                  <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                                    {languageMode === "en" ? link.englishLabel : localizeChinese(link.label)}
                                    <span aria-hidden="true">↗</span>
                                  </a>
                                ))}
                              </nav>
                            </div>
                          ) : null}
                        </aside>
                      ) : null}
                    </>
                  ) : (
                    <p className="reflection interpretation-copy">{displayedDistinction}</p>
                  )}
                </div>
                <div className="question-card">
                  <h3>{menuLabel("留给此刻的问题", "A question for this moment")}</h3>
                  <p>{displayedQuestion}</p>
                  {showEnglishQuestion ? (
                    <p className="question-card-english" lang="en">{englishQuestion}</p>
                  ) : null}
                </div>
              </div>

              {hasLineage ? (
                <section className="lineage-section" aria-labelledby="lineage-title">
                  <div className="lineage-heading">
                    <div>
                      <span>{menuLabel("思想邻域", "IDEA NEIGHBORHOOD")}</span>
                      <h3 id="lineage-title">{menuLabel(
                        "与这则观点相连的思想",
                        "Ideas connected to this thought",
                      )}</h3>
                    </div>
                    <small>{menuLabel("选择节点，对照着读", "Select a node to compare")}</small>
                  </div>

                  <ThoughtNeighborhood
                    currentName={displayedName}
                    currentWork={displayedWork}
                    lineage={lineage}
                    selectedKey={selectedComparisonKey}
                    labels={{
                      ariaLabel: menuLabel("当前命题的一跳思想邻域", "One-hop idea neighborhood for the current claim"),
                      current: menuLabel("当前命题", "Current claim"),
                      selectHint: menuLabel("选择节点，比较两种回答", "Select a node to compare two answers"),
                      count: (visible, total) => menuLabel(
                        `图中 ${visible} / 共 ${total}`,
                        `${visible} of ${total} shown`,
                      ),
                    }}
                    viewLabel={(view) => lineageViewLabel(view, true)}
                    relationLabel={relationLabel}
                    basisLabel={relationBasisLabel}
                    relatedLabel={(entry) => relatedThoughtLabel(entry.related)}
                    onSelect={openComparison}
                  />

                  <div className="lineage-comparison-scroll">
                    {comparison ? (
                      <div
                        key={comparison.key}
                        className="comparison-panel"
                        id="comparison-panel"
                        role="region"
                        aria-labelledby="comparison-title"
                        aria-live="polite"
                      >
                        <div className="comparison-heading">
                          <span>{menuLabel("观点对读", "POINT / COUNTERPOINT")}</span>
                        </div>
                        <h4 id="comparison-title">
                          {displayedName}<i>×</i>{relatedThoughtLabel(comparison.related)}
                        </h4>
                        <p className="comparison-summary">{languageMode === "en"
                          ? comparison.connection.englishSummary
                          : localizeChinese(comparison.connection.summary)}</p>

                        <div className="comparison-quotes">
                          <article>
                            <div className="comparison-card-heading">
                              <span>{displayedName}</span>
                              <em className={`comparison-nature nature-${thoughtPresentation.nature}`}>
                                {displayedPresentationLabel}
                              </em>
                            </div>
                            {chineseQuoteFirst && showChineseQuote ? (
                              <p>{thoughtPresentation.useQuotationMarks
                                ? `「${localizeChinese(thought.text)}」`
                                : localizeChinese(thought.text)}</p>
                            ) : null}
                            {showEnglishQuote ? (
                              <p className="comparison-quote-english" lang="en">
                                {thoughtPresentation.useQuotationMarks
                                  ? `“${thought.english}”`
                                  : thought.english}
                              </p>
                            ) : null}
                            {!chineseQuoteFirst && showChineseQuote ? (
                              <p>{thoughtPresentation.useQuotationMarks
                                ? `「${localizeChinese(thought.text)}」`
                                : localizeChinese(thought.text)}</p>
                            ) : null}
                            <small>{displayedPresentationAttribution}</small>
                          </article>
                          <div className={`comparison-relation kind-${comparison.connection.kind}`}>
                            <span>{relationLabel(comparison.connection.kind)}</span>
                          </div>
                          <article>
                            <div className="comparison-card-heading">
                              <span>{relatedThoughtLabel(comparison.related)}</span>
                              <em className={`comparison-nature nature-${comparisonPresentation?.nature}`}>
                                {presentationLabelFor(comparison.related)}
                              </em>
                            </div>
                            {comparisonChineseQuoteFirst && showComparisonChineseQuote ? (
                              <p>{comparisonPresentation?.useQuotationMarks
                                ? `「${localizeChinese(comparison.related.text)}」`
                                : localizeChinese(comparison.related.text)}</p>
                            ) : null}
                            {showComparisonEnglishQuote ? (
                              <p className="comparison-quote-english" lang="en">
                                {comparisonPresentation?.useQuotationMarks
                                  ? `“${comparison.related.english}”`
                                  : comparison.related.english}
                              </p>
                            ) : null}
                            {!comparisonChineseQuoteFirst && showComparisonChineseQuote ? (
                              <p>{comparisonPresentation?.useQuotationMarks
                                ? `「${localizeChinese(comparison.related.text)}」`
                                : localizeChinese(comparison.related.text)}</p>
                            ) : null}
                            <small>{presentationAttributionFor(comparison.related)}</small>
                          </article>
                        </div>

                        <div className="comparison-actions">
                          <button type="button" onClick={() => void goToThought(comparison.related.id)}>
                            <span>{menuLabel("转到", "Go to")} {relatedThoughtLabel(comparison.related)}</span>
                            <span aria-hidden="true">→</span>
                          </button>
                        </div>
                      </div>
                    ) : null}

                    <p className="lineage-disclaimer">{menuLabel(
                      "这里只显示明确连接到当前观点的编辑性关系；关系仍可继续校订，“呼应 / 分歧”不等于直接影响或明确引用。",
                      "Only editorial relationships explicitly attached to this thought are shown. These remain open to revision; an echo or contrast does not imply direct influence or explicit citation.",
                    )}</p>
                  </div>
                </section>
              ) : null}

            </div>
          </div>
        </aside>

        <div
          className={`share-scrim ${shareOpen ? "open" : ""}`}
          aria-hidden="true"
          onClick={closeShare}
        />
        <section
          ref={shareDialogRef}
          className={`share-dialog ${shareOpen ? "open" : ""}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="share-title"
          aria-describedby="share-description"
          aria-hidden={!shareOpen}
          inert={!shareOpen ? true : undefined}
          onKeyDown={onShareKeyDown}
          onTouchStart={(event) => event.stopPropagation()}
          onTouchEnd={(event) => event.stopPropagation()}
        >
          <div className="share-heading">
            <div>
              <span id="share-title">{menuLabel("分享这张思想卡", "Share this thought card")}</span>
              <small>{shareNatureLabel} · {displayedPresentationAttribution}</small>
            </div>
            <button
              ref={shareCloseButtonRef}
              type="button"
              onClick={closeShare}
              aria-label={menuLabel("关闭分享", "Close share dialog")}
              aria-keyshortcuts="Escape"
            >×</button>
          </div>
          <p id="share-description" className="sr-only">{menuLabel(
            "预览并选择 1:1、3:4、4:5、9:16 或 16:9 画幅，然后使用系统分享、保存图片或复制观点文本。",
            "Preview the thought in a 1:1, 3:4, 4:5, 9:16, or 16:9 layout, then share, save, or copy it.",
          )}</p>

          <div
            className={`share-preview share-preview-${shareFormat}`}
            aria-busy={shareLoading}
          >
            {sharePreviewUrl ? (
              // Blob URLs are generated locally and should not pass through an image optimizer.
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={sharePreviewUrl}
                alt={menuLabel(
                  `${shareNatureLabel}分享图预览`,
                  `${shareNatureLabel} card preview`,
                )}
              />
            ) : shareError ? (
              <div className="share-preview-state" role="status">
                <span>{menuLabel("预览生成失败", "Could not create preview")}</span>
                <button
                  type="button"
                  onClick={() => {
                    setShareLoading(true);
                    setShareError(false);
                    setShareRenderVersion((version) => version + 1);
                  }}
                >{menuLabel("重试", "Try again")}</button>
              </div>
            ) : (
              <div className="share-preview-state" role="status">
                <span className="share-spinner" aria-hidden="true" />
                <span>{menuLabel("正在生成预览…", "Creating preview…")}</span>
              </div>
            )}
          </div>

          <div className="share-format-row">
            <span className="share-section-label">{menuLabel("分享图版式", "Image layout")}</span>
            <div
              className="share-format-options"
              role="radiogroup"
              aria-label={menuLabel("分享图版式", "Share image layout")}
            >
              <button
                type="button"
                role="radio"
                aria-checked={shareFormat === "square"}
                className={shareFormat === "square" ? "active" : ""}
                onClick={() => chooseShareFormat("square")}
              >
                <span>1:1</span>
                <small>{menuLabel("方形", "Square")}</small>
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={shareFormat === "portrait"}
                className={shareFormat === "portrait" ? "active" : ""}
                onClick={() => chooseShareFormat("portrait")}
              >
                <span>3:4</span>
                <small>{menuLabel("竖版", "Portrait")}</small>
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={shareFormat === "portrait45"}
                className={shareFormat === "portrait45" ? "active" : ""}
                onClick={() => chooseShareFormat("portrait45")}
              >
                <span>4:5</span>
                <small>{menuLabel("竖版", "Portrait")}</small>
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={shareFormat === "story"}
                className={shareFormat === "story" ? "active" : ""}
                onClick={() => chooseShareFormat("story")}
              >
                <span>9:16</span>
                <small>{menuLabel("长竖版", "Story")}</small>
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={shareFormat === "landscape"}
                className={shareFormat === "landscape" ? "active" : ""}
                onClick={() => chooseShareFormat("landscape")}
              >
                <span>16:9</span>
                <small>{menuLabel("横版", "Landscape")}</small>
              </button>
            </div>
          </div>

          <div className="share-actions-section">
            <span className="share-section-label">{menuLabel("分享到", "Share")}</span>
            <div className="share-actions">
              <button
                type="button"
                className="share-action-secondary"
                onClick={() => void saveImage(shareFormat, shareBlob, false)}
                disabled={shareLoading || shareError || imageSaving}
                aria-busy={imageSaving}
              >
                <span aria-hidden="true">↓</span>
                <span>{imageSaving
                  ? menuLabel("正在保存", "Saving")
                  : menuLabel("保存图片", "Save image")}</span>
              </button>
              <button
                type="button"
                className="share-action-secondary"
                onClick={() => void copyThoughtText()}
              >
                <span aria-hidden="true">“”</span>
                <span>{menuLabel("复制文本", "Copy text")}</span>
              </button>
              <button
                type="button"
                className="share-action-primary"
                onClick={() => void shareViaSystem()}
                disabled={shareLoading || shareError}
              >
                <span aria-hidden="true">↗</span>
                <span>{menuLabel("系统分享", "System share")}</span>
              </button>
            </div>
          </div>

        </section>

        {readingUnitOpen ? (
          <Suspense fallback={null}>
            <ReadingUnitReader
              thoughtId={thought.id}
              languageMode={languageMode}
              fallbackSourceUrl={contextSourceLinks[0]?.href}
              fallbackTitle={displayedWork}
              fallbackEnglishTitle={thought.englishWork}
              fallbackLocator={sourceMetadata?.locator}
              fallbackEnglishLocator={sourceMetadata?.englishLocator}
              returnFocusRef={readingUnitTriggerRef}
              onClose={closeReadingUnit}
            />
          </Suspense>
        ) : null}

        {knowledgeStudioOpen ? (
          <Suspense fallback={null}>
            <KnowledgeStudio
              open
              collections={customCollections}
              language={languageMode}
              returnFocusRef={knowledgeStudioReturnFocusRef}
              onClose={closeKnowledgeStudio}
              onChange={handleCustomCollectionsChange}
            />
          </Suspense>
        ) : null}

        <div
          className={`toast ${actionNotice ? "show" : ""}`}
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          {actionNotice === "copied"
            ? menuLabel("分享文案已复制", "Share text copied")
            : actionNotice === "thought-copied"
              ? menuLabel("观点文本已复制", "Thought copied")
              : actionNotice === "recommendation-copied"
                ? menuLabel("推荐语和商店链接已复制", "Recommendation and store link copied")
                : actionNotice === "thought-blocked"
                  ? menuLabel("已屏蔽，可在设置中恢复", "Hidden. Restore it anytime in Settings.")
                  : actionNotice === "thought-restored"
                    ? menuLabel("已恢复到内容库", "Restored to the library")
                    : actionNotice === "block-limit"
                      ? menuLabel("当前范围没有其他内容，请先恢复一则", "No other thoughts are available here. Restore one first.")
                      : actionNotice === "image-saving"
                        ? menuLabel("正在生成图片…", "Creating image…")
                        : actionNotice === "image-saved"
                          ? menuLabel("图片已保存", "Image saved")
                          : actionNotice === "image-error"
                            ? menuLabel("图片生成失败", "Could not create image")
                            : null}
        </div>
      </section>
    </main>
  );
}
