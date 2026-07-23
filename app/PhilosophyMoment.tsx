"use client";

import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from "react";
import brand from "../brand.json";
import {
  downloadBlob,
  renderThoughtCard,
  thoughtCardFilename,
  type ThoughtCardFormat,
} from "./exportThoughtCard";

import {
  type ConnectionKind,
  type Thought,
  type ThoughtConnection,
} from "../content/philosophy";
import {
  allThoughtConnections,
  allThoughts,
  contentLibraries,
  contentLibraryForThought,
  contentLibraryOptions,
  contentLibraryStorageKey,
  isContentLibraryId,
  type ContentLibraryId,
  type TopicOption,
} from "../content/libraries";
import { nextRandomThoughtIndex } from "../lib/randomThoughtIndex";

const thoughtById = new Map(allThoughts.map((item) => [item.id, item]));
type LineageView = "upstream" | "dialogue" | "downstream";
const lineageViews: LineageView[] = ["upstream", "dialogue", "downstream"];

type ResolvedConnection = {
  connection: ThoughtConnection;
  related: Thought;
  view: LineageView;
  key: string;
};

type ActiveTopic = TopicOption["id"];
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
type TextConverter = (text: string) => string;
type ActionNotice =
  | "copied"
  | "thought-copied"
  | "recommendation-copied"
  | "image-saving"
  | "image-saved"
  | "image-error";
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
  visualStyle: "agora-visual-style",
  languageMode: "agora-language-mode",
  includeEnglishQuote: "agora-include-english-quote",
  shareFormat: "agora-share-format",
  onboardingComplete: "agora-onboarding-complete",
  contentLibrary: contentLibraryStorageKey,
} as const;
const onboardingVersion = "2";

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

export function PhilosophyMoment({
  initialIndex = 0,
  initialLibrary = "western",
}: {
  initialIndex?: number;
  initialLibrary?: ContentLibraryId;
}) {
  const initialThoughts = contentLibraries[initialLibrary].thoughts;
  const safeInitialIndex = Number.isFinite(initialIndex)
    ? Math.abs(Math.trunc(initialIndex)) % initialThoughts.length
    : 0;
  const [contentLibrary, setContentLibrary] = useState<ContentLibraryId>(initialLibrary);
  const [activeTopic, setActiveTopic] = useState<ActiveTopic>("all");
  const [index, setIndex] = useState(safeInitialIndex);
  const [saved, setSaved] = useState<string[]>([]);
  const [detailOpen, setDetailOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [onboardingHints, setOnboardingHints] = useState<OnboardingHints>(initialOnboardingHints);
  const [shareFormat, setShareFormat] = useState<ThoughtCardFormat>("mobile");
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
  const [lineageView, setLineageView] = useState<LineageView>("upstream");
  const [comparisonKey, setComparisonKey] = useState<string | null>(null);
  const touchStart = useRef<number | null>(null);
  const quoteStageRef = useRef<HTMLDivElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const detailSheetRef = useRef<HTMLElement | null>(null);
  const detailCloseButtonRef = useRef<HTMLButtonElement | null>(null);
  const shareDialogRef = useRef<HTMLElement | null>(null);
  const shareCloseButtonRef = useRef<HTMLButtonElement | null>(null);
  const shareReturnFocusRef = useRef<HTMLElement | null>(null);
  const shareGenerationRef = useRef(0);
  const comparisonRef = useRef<HTMLDivElement | null>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const noticeTimerRef = useRef<number | null>(null);
  const imageSavingRef = useRef(false);
  const lineageContentRef = useRef<HTMLDivElement | null>(null);

  const activeLibrary = contentLibraries[contentLibrary];
  const filtered = useMemo(
    () => activeTopic === "all"
      ? activeLibrary.thoughts
      : activeLibrary.thoughts.filter((item) => item.topic === activeTopic),
    [activeLibrary, activeTopic],
  );
  const thought = filtered[index % filtered.length] ?? activeLibrary.thoughts[0] ?? allThoughts[0];
  const thoughtTopic = activeLibrary.topics.find((topic) => topic.id === thought.topic)
    ?? { id: thought.topic, label: thought.topic, englishLabel: thought.topic };
  const lineage = useMemo(() => {
    const resolved: Record<LineageView, ResolvedConnection[]> = {
      upstream: [],
      dialogue: [],
      downstream: [],
    };

    allThoughtConnections.forEach((connection) => {
      const key = `${connection.source}:${connection.target}:${connection.kind}`;
      const isDialogue = connection.kind === "dialogues"
        || connection.kind === "resonates"
        || connection.kind === "contrasts";

      if (isDialogue && (connection.source === thought.id || connection.target === thought.id)) {
        const relatedId = connection.source === thought.id ? connection.target : connection.source;
        const related = thoughtById.get(relatedId);
        if (related) resolved.dialogue.push({ connection, related, view: "dialogue", key });
        return;
      }

      if (connection.target === thought.id) {
        const related = thoughtById.get(connection.source);
        if (related) resolved.upstream.push({ connection, related, view: "upstream", key });
      } else if (connection.source === thought.id) {
        const related = thoughtById.get(connection.target);
        if (related) resolved.downstream.push({ connection, related, view: "downstream", key });
      }
    });

    return resolved;
  }, [thought.id]);
  const effectiveLineageView = lineage[lineageView].length > 0
    ? lineageView
    : lineageViews.find((view) => lineage[view].length > 0) ?? "upstream";
  const comparison = useMemo(
    () => lineageViews
      .flatMap((view) => lineage[view])
      .find((entry) => entry.key === comparisonKey) ?? null,
    [comparisonKey, lineage],
  );
  const thoughtNumber = activeLibrary.thoughts.findIndex((item) => item.id === thought.id) + 1;
  const isChineseLanguage = languageMode !== "en";
  const showEnglishQuote = languageMode === "en" || (isChineseLanguage && includeEnglishQuote);
  const chineseQuoteFirst = contentLibrary === "mao" && isChineseLanguage;
  const comparisonChineseQuoteFirst = comparison
    ? contentLibraryForThought(comparison.related.id) === "mao" && isChineseLanguage
    : false;
  const localizeChinese = useCallback(
    (text: string) => languageMode === "zh-hant" && traditionalConverter
      ? traditionalConverter(text)
      : text,
    [languageMode, traditionalConverter],
  );
  const displayedName = languageMode === "en"
    ? thought.englishName
    : localizeChinese(thought.name);
  const displayedWork = languageMode === "en"
    ? thought.englishWork
    : localizeChinese(thought.work);
  const displayedSchool = languageMode === "en"
    ? thought.englishSchool
    : localizeChinese(thought.school);
  const displayedReflection = languageMode === "en"
    ? thought.englishReflection
    : localizeChinese(thought.reflection);
  const displayedQuestion = languageMode === "en"
    ? thought.englishQuestion
    : localizeChinese(thought.question);
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
  const shareQuote = languageMode === "en"
    ? thought.english
    : includeEnglishQuote
      ? chineseQuoteFirst
        ? `${localizeChinese(thought.text)}\n${thought.english}`
        : `${thought.english}\n${localizeChinese(thought.text)}`
      : localizeChinese(thought.text);
  const shareAttribution = languageMode === "en"
    ? `— ${thought.englishName} · ${thought.englishWork}`
    : `—— ${displayedName} · ${displayedWork}`;
  const shareSignature = languageMode === "en"
    ? `${localizedBrandName} — ${localizedSlogan}`
    : `${localizedBrandName}｜${localizedSlogan}`;
  const thoughtCopyText = `${shareQuote}\n\n${shareAttribution}`;
  const shareText = `${thoughtCopyText}\n\n${shareSignature}`;
  const recommendationText = languageMode === "en"
    ? `Try AGORA, a philosophy new tab for Chrome. Each new tab opens a thought you can trace through its source, lineage, and related ideas.\n\n${brand.storeUrl}`
    : `${localizeChinese("推荐你试试 AGORA：把每次打开 Chrome 新标签页，变成一次与思想的短暂相遇。每则观点都可以继续读解它的来源、思想脉络与相似观点。")}\n\n${brand.storeUrl}`;
  const shareTitle = `${localizedBrandName} · ${displayedName}`;
  const menuLabel = (chinese: string, english: string) => {
    if (languageMode === "en") return english;
    return localizeChinese(chinese);
  };
  const relationLabel = (kind: ConnectionKind) => {
    const labels: Record<ConnectionKind, [string, string]> = {
      inherits: ["史实源流", "Historical line"],
      reframes: ["批判重构", "Critical reframing"],
      challenges: ["问题反转", "Critical turn"],
      dialogues: ["双向对话", "Two-way dialogue"],
      resonates: ["主题呼应", "Thematic echo"],
      contrasts: ["核心分歧", "Core contrast"],
    };
    return menuLabel(...labels[kind]);
  };
  const relatedThoughtLabel = (related: Thought) => contentLibraryForThought(related.id) === "mao"
    ? languageMode === "en"
      ? related.englishWork
      : localizeChinese(related.work)
    : languageMode === "en"
      ? related.englishName
      : localizeChinese(related.name);

  const showActionNotice = useCallback((notice: ActionNotice, duration = 1800) => {
    if (noticeTimerRef.current !== null) window.clearTimeout(noticeTimerRef.current);
    setActionNotice(notice);
    noticeTimerRef.current = window.setTimeout(() => {
      setActionNotice(null);
      noticeTimerRef.current = null;
    }, duration);
  }, []);

  useEffect(() => () => {
    if (noticeTimerRef.current !== null) window.clearTimeout(noticeTimerRef.current);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const storedSaved = readStoredPreference(storageKeys.saved, legacyStorageKeys.saved);
      if (storedSaved !== null) setSaved(parseSavedIds(storedSaved));

      const storedLibrary = window.localStorage.getItem(storageKeys.contentLibrary);
      if (isContentLibraryId(storedLibrary)) {
        setContentLibrary(storedLibrary);
        setActiveTopic("all");
        setIndex((current) => current % contentLibraries[storedLibrary].thoughts.length);
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
      if (storedShareFormat === "mobile" || storedShareFormat === "desktop") {
        setShareFormat(storedShareFormat);
      }

      if (window.localStorage.getItem(storageKeys.onboardingComplete) !== onboardingVersion) {
        setOnboardingHints(initialOnboardingHints);
        setOnboardingOpen(true);
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

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
    setDetailOpen(false);
    setShareOpen(false);
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
    setDetailOpen(false);
    setMenuOpen(false);
    setComparisonKey(null);
    setLineageView("upstream");
    setIndex((value) => (value + 1) % filtered.length);
    window.requestAnimationFrame(() => quoteStageRef.current?.focus({ preventScroll: true }));
  }, [dismissOnboardingHint, filtered.length]);

  const previous = useCallback(() => {
    dismissOnboardingHint("navigate");
    setDetailOpen(false);
    setMenuOpen(false);
    setComparisonKey(null);
    setLineageView("upstream");
    setIndex((value) => (value - 1 + filtered.length) % filtered.length);
    window.requestAnimationFrame(() => quoteStageRef.current?.focus({ preventScroll: true }));
  }, [dismissOnboardingHint, filtered.length]);

  const chooseContentLibrary = (nextLibrary: ContentLibraryId) => {
    if (nextLibrary === contentLibrary) return;

    const nextThoughts = contentLibraries[nextLibrary].thoughts;
    const nextIndex = nextRandomThoughtIndex(nextThoughts.length, null);
    setContentLibrary(nextLibrary);
    setActiveTopic("all");
    setIndex(nextIndex);
    setDetailOpen(false);
    setMenuOpen(false);
    setComparisonKey(null);
    setLineageView("upstream");
    window.localStorage.setItem(storageKeys.contentLibrary, nextLibrary);
    window.requestAnimationFrame(() => quoteStageRef.current?.focus({ preventScroll: true }));
  };

  const chooseTopic = (topic: ActiveTopic) => {
    setActiveTopic(topic);
    setIndex(0);
    setDetailOpen(false);
    setMenuOpen(false);
    setComparisonKey(null);
    setLineageView("upstream");
    window.requestAnimationFrame(() => quoteStageRef.current?.focus({ preventScroll: true }));
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
    setDetailOpen(true);
  }, [dismissOnboardingHint]);

  const closeDetail = useCallback(() => {
    setComparisonKey(null);
    setDetailOpen(false);
    window.requestAnimationFrame(() => {
      (returnFocusRef.current ?? quoteStageRef.current)?.focus({ preventScroll: true });
    });
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

  const onLineageTabKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    currentView: LineageView,
  ) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const enabledViews = lineageViews.filter((view) => lineage[view].length > 0);
    const currentIndex = Math.max(0, enabledViews.indexOf(currentView));
    const nextIndex = event.key === "Home"
      ? 0
      : event.key === "End"
        ? enabledViews.length - 1
        : event.key === "ArrowRight"
          ? (currentIndex + 1) % enabledViews.length
          : (currentIndex - 1 + enabledViews.length) % enabledViews.length;
    const nextView = enabledViews[nextIndex];
    if (!nextView) return;
    setLineageView(nextView);
    setComparisonKey(null);
    lineageContentRef.current?.scrollTo({ top: 0, behavior: "auto" });
    document.getElementById(`lineage-tab-${nextView}`)?.focus();
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

  const createThoughtCardBlob = useCallback((format: ThoughtCardFormat) => renderThoughtCard({
    quoteEnglish: showEnglishQuote ? thought.english : undefined,
    quoteChinese: isChineseLanguage ? localizeChinese(thought.text) : undefined,
    quoteChineseFirst: chineseQuoteFirst,
    author: displayedName,
    work: displayedWork,
    palette: thought.palette,
    format,
  }), [chineseQuoteFirst, displayedName, displayedWork, isChineseLanguage, localizeChinese, showEnglishQuote, thought]);

  const openShare = useCallback(() => {
    const activeElement = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
    shareReturnFocusRef.current = activeElement?.closest(".corner-menu")
      ? menuButtonRef.current
      : activeElement && activeElement !== document.body
        ? activeElement
        : detailOpen
          ? detailCloseButtonRef.current
          : quoteStageRef.current;
    setMenuOpen(false);
    setDetailOpen(false);
    setComparisonKey(null);
    setShareBlob(null);
    setSharePreviewUrl(null);
    setShareError(false);
    setShareLoading(true);
    setShareOpen(true);
  }, [detailOpen]);

  const closeShare = useCallback(() => {
    setShareOpen(false);
    window.requestAnimationFrame(() => {
      (shareReturnFocusRef.current ?? quoteStageRef.current)?.focus({ preventScroll: true });
    });
  }, []);

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
    format: ThoughtCardFormat = "mobile",
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
    window.requestAnimationFrame(() => {
      comparisonRef.current?.focus({ preventScroll: true });
      comparisonRef.current?.scrollIntoView({ behavior: preferredScrollBehavior(), block: "nearest" });
    });
  }, []);

  const goToThought = useCallback((thoughtId: string) => {
    const nextLibraryId = contentLibraryForThought(thoughtId);
    if (!nextLibraryId) return;
    const nextLibrary = contentLibraries[nextLibraryId];
    const nextIndex = nextLibrary.thoughts.findIndex((item) => item.id === thoughtId);
    if (nextIndex < 0) return;
    setContentLibrary(nextLibraryId);
    setActiveTopic("all");
    setIndex(nextIndex);
    setLineageView("upstream");
    setComparisonKey(null);
    setMenuOpen(false);
    setDetailOpen(true);
    window.localStorage.setItem(storageKeys.contentLibrary, nextLibraryId);
    window.requestAnimationFrame(() => {
      detailSheetRef.current?.scrollTo({ top: 0, behavior: preferredScrollBehavior() });
      detailCloseButtonRef.current?.focus({ preventScroll: true });
    });
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (onboardingOpen || shareOpen || comparisonKey || detailOpen || menuOpen) {
          event.preventDefault();
        }
        if (onboardingOpen) {
          completeOnboarding();
        } else if (shareOpen) {
          closeShare();
        } else if (comparisonKey) {
          setComparisonKey(null);
        } else if (detailOpen) {
          closeDetail();
        } else if (menuOpen) {
          setMenuOpen(false);
          window.requestAnimationFrame(() => menuButtonRef.current?.focus({ preventScroll: true }));
        }
        return;
      }

      if (shareOpen) return;
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
        } else if (!event.repeat && lowerKey === "s") {
          event.preventDefault();
          openShare();
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
  }, [closeDetail, closeShare, comparisonKey, completeOnboarding, detailOpen, menuOpen, next, onboardingOpen, openDetail, openShare, previous, saveImage, shareOpen, toggleSaved]);

  const onTouchEnd = (event: React.TouchEvent) => {
    if (shareOpen) {
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
    "--paper": thought.palette[0],
    "--wave-1": thought.palette[1],
    "--wave-2": thought.palette[2],
    "--ink": thought.palette[3],
  } as React.CSSProperties;

  return (
    <main className="app-shell" style={style}>
      <section
        className={`moment style-${visualStyle} ${detailOpen ? "detail-open" : ""} ${shareOpen ? "share-open" : ""}`}
        lang={languageMode === "en" ? "en" : languageMode === "zh-hant" ? "zh-Hant" : "zh-Hans"}
        onTouchStart={(event) => (touchStart.current = event.touches[0].clientX)}
        onTouchEnd={onTouchEnd}
        aria-label={menuLabel(`${brand.nameZhHans}哲学卡片`, `${brand.nameEn} philosophy card`)}
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
            <blockquote className={`primary-quote language-${languageMode}${isChineseLanguage && includeEnglishQuote ? " with-english" : ""}${chineseQuoteFirst ? " quote-chinese-first" : ""}`}>
              {chineseQuoteFirst && isChineseLanguage ? (
                <span className="main-quote-line main-quote-chinese">
                  <PunctuatedQuote text={localizeChinese(thought.text)} />
                </span>
              ) : null}
              {showEnglishQuote ? (
                <span className="main-quote-line main-quote-english" lang="en">
                  {thought.english}
                </span>
              ) : null}
              {!chineseQuoteFirst && isChineseLanguage ? (
                <span className="main-quote-line main-quote-chinese">
                  <PunctuatedQuote text={localizeChinese(thought.text)} />
                </span>
              ) : null}
            </blockquote>
            <div className={`origin-stack language-${languageMode}`}>
              {languageMode === "en" ? (
                <div className="origin-line origin-english" lang="en">
                  <span className="author-tag">{thought.englishName}</span>
                  <span className="work-title">{thought.englishWork}</span>
                </div>
              ) : (
                <div className="origin-line origin-chinese">
                  <span className="author-tag">{localizeChinese(thought.name)}</span>
                  <span className="work-title">{localizeChinese(thought.work)}</span>
                </div>
              )}
            </div>
          </div>
          <div
            className={`onboarding-hint onboarding-hint-quote ${onboardingOpen && onboardingHints.quote && !detailOpen && !shareOpen && !menuOpen ? "visible" : ""}`}
            role="status"
            aria-hidden={!onboardingOpen || !onboardingHints.quote || detailOpen || shareOpen || menuOpen}
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
          <div className="menu-content-picker">
            <span className="menu-label">{menuLabel("内容库", "Content Library")}</span>
            <div
              className="content-options"
              role="radiogroup"
              aria-label={menuLabel("内容库", "Content Library")}
            >
              {contentLibraryOptions.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  role="radio"
                  aria-checked={contentLibrary === item.id}
                  className={contentLibrary === item.id ? "active" : ""}
                  onClick={() => chooseContentLibrary(item.id)}
                >
                  {languageMode === "en" ? item.shortEnglishLabel : localizeChinese(item.label)}
                </button>
              ))}
            </div>
          </div>
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
          <nav className="menu-topics" aria-label={menuLabel("思想主题", "Thought themes")}>
            <span className="menu-label">{menuLabel("思想类型", "Thought Type")}</span>
            {activeLibrary.topics.map((topic) => (
              <button
                key={topic.id}
                className={activeTopic === topic.id ? "active" : ""}
                onClick={() => chooseTopic(topic.id)}
              >
                {menuLabel(topic.label, topic.englishLabel)}
              </button>
            ))}
          </nav>
          <div className="menu-actions">
            <span className="menu-label">{menuLabel("操作", "Actions")}</span>
            <button onClick={previous} aria-keyshortcuts="ArrowLeft">
              <span>{menuLabel("上一则", "Previous")}</span>
              <kbd>←</kbd>
            </button>
            <button onClick={next} aria-keyshortcuts="ArrowRight Space">
              <span>{menuLabel("换一则", "Next Thought")}</span>
              <span className="shortcut-group"><kbd>→</kbd><kbd>Space</kbd></span>
            </button>
            <button onClick={openDetail} aria-keyshortcuts="Enter">
              <span>{menuLabel("读解", "Read More")}</span>
              <kbd>Enter</kbd>
            </button>
            <button onClick={toggleSaved} aria-keyshortcuts="F">
              <span>{saved.includes(thought.id)
                ? menuLabel("已收藏", "Saved")
                : menuLabel("收藏", "Save")}</span>
              <kbd>F</kbd>
            </button>
            <button onClick={openShare} aria-keyshortcuts="S">
              <span>{menuLabel("分享观点", "Share Thought")}</span>
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
                : menuLabel("保存图片", "Save Image")}</span>
              <kbd>D</kbd>
            </button>
            <p className="menu-dismiss-hint"><kbd>Esc</kbd><span>{menuLabel("关闭浮层", "Close overlay")}</span></p>
          </div>
          <div className="menu-project">
            <span className="menu-label">{menuLabel("项目", "Project")}</span>
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
          className={`onboarding-hint onboarding-hint-navigation ${onboardingOpen && onboardingHints.navigate && !detailOpen && !shareOpen && !menuOpen ? "visible" : ""}`}
          role="status"
          aria-hidden={!onboardingOpen || !onboardingHints.navigate || detailOpen || shareOpen || menuOpen}
        >
          <span className="onboarding-key-pair"><kbd>←</kbd><kbd>→</kbd></span>
          <span>{menuLabel("换一则", "Another thought")}</span>
        </div>
        <div
          className={`onboarding-hint onboarding-hint-menu ${onboardingOpen && onboardingHints.menu && !detailOpen && !shareOpen && !menuOpen ? "visible" : ""}`}
          role="status"
          aria-hidden={!onboardingOpen || !onboardingHints.menu || detailOpen || shareOpen || menuOpen}
        >
          <span>{menuLabel("设置、分享与内容切换", "Settings, sharing and content")}</span>
        </div>

        <div className={`detail-scrim ${detailOpen ? "open" : ""}`} onClick={closeDetail} />
        <aside
          ref={detailSheetRef}
          className={`detail-sheet ${detailOpen ? "open" : ""}`}
          role="dialog"
          aria-modal={detailOpen && !shareOpen}
          aria-labelledby="detail-title"
          aria-hidden={!detailOpen || shareOpen}
          inert={!detailOpen || shareOpen ? true : undefined}
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
            <div className="detail-layout">
              <div className="detail-primary">
                <p className="detail-topic">{languageMode === "en"
                  ? `${thoughtTopic.englishLabel} · ${displayedSchool}`
                  : `${localizeChinese(thoughtTopic.label)} · ${displayedSchool}`}</p>
                <div className="detail-quote" aria-label={thought.rendering === "short-quote"
                  ? menuLabel("这一则原文短句", "Short passage from the source")
                  : menuLabel("这一则命题译写", "Interpretive rendering of this thought")}>
                  <span className="detail-quote-label">{thought.rendering === "short-quote"
                    ? menuLabel("原文短句", "SOURCE PASSAGE")
                    : menuLabel("命题译写", "INTERPRETIVE RENDERING")}</span>
                  {chineseQuoteFirst && isChineseLanguage ? (
                    <div className="detail-quote-line">
                      <p>「<PunctuatedQuote text={localizeChinese(thought.text)} />」</p>
                    </div>
                  ) : null}
                  {showEnglishQuote ? (
                    <div className="detail-quote-line detail-quote-english" lang="en">
                      <p>“{thought.english}”</p>
                    </div>
                  ) : null}
                  {!chineseQuoteFirst && isChineseLanguage ? (
                    <div className="detail-quote-line">
                      <p>「<PunctuatedQuote text={localizeChinese(thought.text)} />」</p>
                    </div>
                  ) : null}
                </div>
                <h2>{languageMode === "en"
                  ? `What might ${displayedName} ask us to notice?`
                  : `${displayedName}${localizeChinese("想提醒我们什么？")}`}</h2>
                <p className="reflection">{displayedReflection}</p>
                <div className="question-card">
                  <span>{menuLabel("留给此刻的问题", "A question for this moment")}</span>
                  <p>{displayedQuestion}</p>
                </div>
                <p className="source-note">{thought.rendering === "short-quote"
                  ? languageMode === "en"
                    ? `Source: ${displayedWork} · Short source passage; English is an editorial translation`
                    : `${localizeChinese("原文出处：")}${displayedWork} · ${localizeChinese("英文为编辑性翻译")}`
                  : languageMode === "en"
                    ? `Source: ${displayedWork} · Interpretive rendering and paraphrase for readability; not a verbatim quotation`
                    : `${localizeChinese("思想线索：")}${displayedWork} · ${localizeChinese("内容为便于阅读的命题译写与转述，并非逐字引文")}`}</p>
              </div>

              <section className="lineage-section" aria-labelledby="lineage-title">
            <div className="lineage-heading">
              <div>
                <span>{menuLabel("思想脉络", "IDEAS IN CONTEXT")}</span>
                <h3 id="lineage-title">{menuLabel("它从哪里来，又走向哪里", "Where this idea comes from — and where it goes")}</h3>
              </div>
              <small>{menuLabel("点开对读", "Tap to compare")}</small>
            </div>

            <div className="lineage-tabs" role="tablist" aria-label={menuLabel("思想关系", "Idea relationships")}>
              {lineageViews.map((view) => {
                const viewLabel = view === "upstream"
                  ? menuLabel("思想来处", "Origins")
                  : view === "dialogue"
                    ? menuLabel("同题异答", "Dialogue")
                    : menuLabel("后续回响", "Afterlives");
                return (
                  <button
                    key={view}
                    id={`lineage-tab-${view}`}
                    type="button"
                    role="tab"
                    aria-selected={effectiveLineageView === view}
                    aria-controls="lineage-panel"
                    tabIndex={effectiveLineageView === view ? 0 : -1}
                    className={effectiveLineageView === view ? "active" : ""}
                    disabled={lineage[view].length === 0}
                    onKeyDown={(event) => onLineageTabKeyDown(event, view)}
                    onClick={() => {
                      setLineageView(view);
                      setComparisonKey(null);
                      lineageContentRef.current?.scrollTo({ top: 0, behavior: "auto" });
                    }}
                  >
                    <span>{viewLabel}</span>
                    <em>{lineage[view].length}</em>
                  </button>
                );
              })}
            </div>

            <div
              ref={lineageContentRef}
              className="lineage-tab-content"
              id="lineage-panel"
              role="tabpanel"
              aria-labelledby={`lineage-tab-${effectiveLineageView}`}
            >
              <div className="lineage-list">
                {lineage[effectiveLineageView].map((entry) => (
                  <button
                    type="button"
                    key={entry.key}
                    className={`lineage-card ${comparisonKey === entry.key ? "active" : ""}`}
                    aria-expanded={comparisonKey === entry.key}
                    aria-controls={comparisonKey === entry.key ? "comparison-panel" : undefined}
                    onClick={() => openComparison(entry)}
                  >
                    <span className="lineage-card-meta">
                      <span className={`relation-kind kind-${entry.connection.kind}`}>
                        {relationLabel(entry.connection.kind)}
                      </span>
                      <span aria-hidden="true">↗</span>
                    </span>
                    <strong>{relatedThoughtLabel(entry.related)}</strong>
                    <p>{languageMode === "en"
                      ? entry.connection.englishSummary
                      : localizeChinese(entry.connection.summary)}</p>
                    <span className="lineage-card-quote">{languageMode === "en"
                      ? `“${entry.related.english}”`
                      : `「${localizeChinese(entry.related.text)}」`}</span>
                  </button>
                ))}
              </div>

              {comparison ? (
                <div
                className="comparison-panel"
                id="comparison-panel"
                ref={comparisonRef}
                role="region"
                aria-labelledby="comparison-title"
                tabIndex={-1}
              >
                <div className="comparison-heading">
                  <span>{menuLabel("观点对读", "POINT / COUNTERPOINT")}</span>
                  <button
                    type="button"
                    onClick={() => setComparisonKey(null)}
                    aria-label={menuLabel("收起观点对读", "Close comparison")}
                  >×</button>
                </div>
                <h4 id="comparison-title">{displayedName}<i>×</i>{relatedThoughtLabel(comparison.related)}</h4>
                <p className="comparison-summary">{languageMode === "en"
                  ? comparison.connection.englishSummary
                  : localizeChinese(comparison.connection.summary)}</p>

                <div className="comparison-quotes">
                  <article>
                    <span>{displayedName}</span>
                    {chineseQuoteFirst && isChineseLanguage ? <p>「{localizeChinese(thought.text)}」</p> : null}
                    {showEnglishQuote ? <p className="comparison-quote-english" lang="en">“{thought.english}”</p> : null}
                    {!chineseQuoteFirst && isChineseLanguage ? <p>「{localizeChinese(thought.text)}」</p> : null}
                    <small>{displayedWork}</small>
                  </article>
                  <div className={`comparison-relation kind-${comparison.connection.kind}`}>
                    <span>{relationLabel(comparison.connection.kind)}</span>
                  </div>
                  <article>
                    <span>{relatedThoughtLabel(comparison.related)}</span>
                    {comparisonChineseQuoteFirst && isChineseLanguage ? (
                      <p>「{localizeChinese(comparison.related.text)}」</p>
                    ) : null}
                    {showEnglishQuote ? (
                      <p className="comparison-quote-english" lang="en">“{comparison.related.english}”</p>
                    ) : null}
                    {!comparisonChineseQuoteFirst && isChineseLanguage ? (
                      <p>「{localizeChinese(comparison.related.text)}」</p>
                    ) : null}
                    <small>{languageMode === "en"
                      ? comparison.related.englishWork
                      : localizeChinese(comparison.related.work)}</small>
                  </article>
                </div>

                <div className="comparison-actions">
                  <button type="button" onClick={() => goToThought(comparison.related.id)}>
                    <span>{menuLabel("转到", "Go to")} {relatedThoughtLabel(comparison.related)}</span>
                    <span aria-hidden="true">→</span>
                  </button>
                  <button type="button" onClick={() => setComparisonKey(null)}>
                    {menuLabel("收起对读", "Collapse")}
                  </button>
                </div>
                </div>
              ) : null}
            </div>

            <p className="lineage-disclaimer">{menuLabel(
              "上下游包含直接影响、传统中介与编辑性重构；“呼应 / 分歧”不等于直接影响或明确引用。",
              "Origins and afterlives may reflect direct influence, mediated traditions, or editorial reframing; an echo or contrast does not imply direct influence or explicit citation.",
            )}</p>
              </section>

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
              <span id="share-title">{menuLabel("分享这则思想", "Share this thought")}</span>
              <small>{displayedName} · {displayedWork}</small>
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
            "预览并选择移动端或 PC 端分享图，然后使用系统分享、保存图片或复制观点文本。",
            "Preview a mobile or desktop share image, then use system share, save the image, or copy the thought.",
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
                  `${displayedName}观点分享图预览`,
                  `Preview of ${displayedName} thought card`,
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
                aria-checked={shareFormat === "mobile"}
                className={shareFormat === "mobile" ? "active" : ""}
                onClick={() => chooseShareFormat("mobile")}
              >
                <span>{menuLabel("移动端", "Mobile")}</span>
                <small>4:5</small>
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={shareFormat === "desktop"}
                className={shareFormat === "desktop" ? "active" : ""}
                onClick={() => chooseShareFormat("desktop")}
              >
                <span>{menuLabel("PC 端", "Desktop")}</span>
                <small>16:9</small>
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
