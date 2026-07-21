"use client";

import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from "react";
import brand from "../brand.json";
import {
  downloadBlob,
  renderThoughtCard,
  thoughtCardFilename,
} from "./exportThoughtCard";

import {
  thoughts,
  thoughtConnections,
  type ConnectionKind,
  type Thought,
  type ThoughtConnection,
} from "../content/philosophy";

const thoughtById = new Map(thoughts.map((item) => [item.id, item]));
type LineageView = "upstream" | "dialogue" | "downstream";
const lineageViews: LineageView[] = ["upstream", "dialogue", "downstream"];

type ResolvedConnection = {
  connection: ThoughtConnection;
  related: Thought;
  view: LineageView;
  key: string;
};

const topics = ["全部", "存在", "伦理", "知识", "政治", "语言"] as const;
type Topic = (typeof topics)[number];
const topicEnglish: Record<Topic, string> = {
  全部: "All",
  存在: "Existence",
  伦理: "Ethics",
  知识: "Knowledge",
  政治: "Politics",
  语言: "Language",
};
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
type ActionNotice = "copied" | "image-saving" | "image-saved" | "image-error";
let cachedTraditionalConverter: TextConverter | null = null;
let traditionalConverterPromise: Promise<TextConverter> | null = null;
const storageKeys = {
  saved: "agora-saved",
  visualStyle: "agora-visual-style",
  languageMode: "agora-language-mode",
  includeEnglishQuote: "agora-include-english-quote",
} as const;

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

export function PhilosophyMoment({ initialIndex = 0 }: { initialIndex?: number }) {
  const safeInitialIndex = Number.isFinite(initialIndex)
    ? Math.abs(Math.trunc(initialIndex)) % thoughts.length
    : 0;
  const [activeTopic, setActiveTopic] = useState<Topic>("全部");
  const [index, setIndex] = useState(safeInitialIndex);
  const [saved, setSaved] = useState<string[]>([]);
  const [detailOpen, setDetailOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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
  const comparisonRef = useRef<HTMLDivElement | null>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const noticeTimerRef = useRef<number | null>(null);
  const imageSavingRef = useRef(false);

  const filtered = useMemo(
    () => (activeTopic === "全部" ? thoughts : thoughts.filter((item) => item.topic === activeTopic)),
    [activeTopic],
  );
  const thought = filtered[index % filtered.length] ?? thoughts[0];
  const lineage = useMemo(() => {
    const resolved: Record<LineageView, ResolvedConnection[]> = {
      upstream: [],
      dialogue: [],
      downstream: [],
    };

    thoughtConnections.forEach((connection) => {
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
  const thoughtNumber = thoughts.findIndex((item) => item.id === thought.id) + 1;
  const isChineseLanguage = languageMode !== "en";
  const showEnglishQuote = languageMode === "en" || (isChineseLanguage && includeEnglishQuote);
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

  const next = useCallback(() => {
    setDetailOpen(false);
    setMenuOpen(false);
    setComparisonKey(null);
    setLineageView("upstream");
    setIndex((value) => (value + 1) % filtered.length);
    window.requestAnimationFrame(() => quoteStageRef.current?.focus({ preventScroll: true }));
  }, [filtered.length]);

  const previous = useCallback(() => {
    setDetailOpen(false);
    setMenuOpen(false);
    setComparisonKey(null);
    setLineageView("upstream");
    setIndex((value) => (value - 1 + filtered.length) % filtered.length);
    window.requestAnimationFrame(() => quoteStageRef.current?.focus({ preventScroll: true }));
  }, [filtered.length]);

  const chooseTopic = (topic: Topic) => {
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
  }, []);

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

  const share = useCallback(async () => {
    const chineseQuote = `${localizeChinese("命题译写：")}${localizeChinese(thought.text)}`;
    const englishQuote = `Interpretive rendering: ${thought.english}`;
    const quote = languageMode === "en"
      ? englishQuote
      : includeEnglishQuote
        ? `${englishQuote}\n${chineseQuote}`
        : chineseQuote;
    const attribution = languageMode === "en"
      ? `— ${thought.englishName} · ${thought.englishWork}`
      : `—— ${displayedName} · ${displayedWork}`;
    const content = `${quote}\n${attribution}`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: languageMode === "en" ? brand.nameEn : brand.nameZhHans,
          text: content,
        });
        setMenuOpen(false);
        if (!detailOpen) {
          window.requestAnimationFrame(() => menuButtonRef.current?.focus({ preventScroll: true }));
        }
        return;
      }
      await navigator.clipboard.writeText(content);
      showActionNotice("copied");
      setMenuOpen(false);
      if (!detailOpen) {
        window.requestAnimationFrame(() => menuButtonRef.current?.focus({ preventScroll: true }));
      }
    } catch (error) {
      if (!(error instanceof DOMException && error.name === "AbortError")) {
        setActionNotice(null);
      }
    }
  }, [detailOpen, displayedName, displayedWork, includeEnglishQuote, languageMode, localizeChinese, showActionNotice, thought]);

  const saveImage = useCallback(async () => {
    if (imageSavingRef.current) return;
    imageSavingRef.current = true;
    setImageSaving(true);
    const shouldReturnFocusToMenu = menuOpen;
    setMenuOpen(false);
    showActionNotice("image-saving", 8000);
    try {
      const localizedBrandName = languageMode === "en"
        ? brand.nameEn
        : languageMode === "zh-hant"
          ? brand.nameZhHant
          : brand.nameZhHans;
      const slogan = languageMode === "en"
        ? brand.sloganEn
        : languageMode === "zh-hant"
          ? brand.sloganZhHant
          : brand.sloganZhHans;
      const blob = await renderThoughtCard({
        brandName: localizedBrandName,
        brandNameEnglish: brand.nameEn,
        slogan,
        topic: languageMode === "en"
          ? topicEnglish[thought.topic]
          : localizeChinese(thought.topic),
        sequence: `${String(thoughtNumber).padStart(2, "0")} / ${thoughts.length}`,
        quoteEnglish: showEnglishQuote ? thought.english : undefined,
        quoteChinese: isChineseLanguage ? localizeChinese(thought.text) : undefined,
        author: displayedName,
        work: displayedWork,
        palette: thought.palette,
        style: visualStyle,
        language: languageMode,
      });
      downloadBlob(blob, thoughtCardFilename(localizedBrandName, displayedName));
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
  }, [detailOpen, displayedName, displayedWork, isChineseLanguage, languageMode, localizeChinese, menuOpen, showActionNotice, showEnglishQuote, thought, thoughtNumber, visualStyle]);

  const openComparison = useCallback((entry: ResolvedConnection) => {
    setComparisonKey(entry.key);
    window.requestAnimationFrame(() => {
      comparisonRef.current?.focus({ preventScroll: true });
      comparisonRef.current?.scrollIntoView({ behavior: preferredScrollBehavior(), block: "nearest" });
    });
  }, []);

  const goToThought = useCallback((thoughtId: string) => {
    const nextIndex = thoughts.findIndex((item) => item.id === thoughtId);
    if (nextIndex < 0) return;
    setActiveTopic("全部");
    setIndex(nextIndex);
    setLineageView("upstream");
    setComparisonKey(null);
    setMenuOpen(false);
    setDetailOpen(true);
    window.requestAnimationFrame(() => {
      detailSheetRef.current?.scrollTo({ top: 0, behavior: preferredScrollBehavior() });
      detailCloseButtonRef.current?.focus({ preventScroll: true });
    });
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (comparisonKey || detailOpen || menuOpen) {
          event.preventDefault();
        }
        if (comparisonKey) {
          setComparisonKey(null);
        } else if (detailOpen) {
          closeDetail();
        } else if (menuOpen) {
          setMenuOpen(false);
          window.requestAnimationFrame(() => menuButtonRef.current?.focus({ preventScroll: true }));
        }
        return;
      }

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
          void share();
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
        void share();
      } else if (!event.repeat && lowerKey === "d") {
        event.preventDefault();
        void saveImage();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeDetail, comparisonKey, detailOpen, menuOpen, next, openDetail, previous, saveImage, share, toggleSaved]);

  const onTouchEnd = (event: React.TouchEvent) => {
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
        className={`moment style-${visualStyle} ${detailOpen ? "detail-open" : ""}`}
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
            ? `${topicEnglish[thought.topic]} Proposition`
            : localizeChinese(`${thought.topic}命题`)}</span>
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
            <blockquote className={`primary-quote language-${languageMode}${isChineseLanguage && includeEnglishQuote ? " with-english" : ""}`}>
              {showEnglishQuote ? (
                <span className="main-quote-line main-quote-english" lang="en">
                  {thought.english}
                </span>
              ) : null}
              {isChineseLanguage ? (
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
        </div>

        <div
          className={`corner-menu language-${languageMode} ${menuOpen ? "open" : ""}`}
          aria-hidden={!menuOpen}
          inert={!menuOpen ? true : undefined}
        >
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
            {topics.map((topic) => (
              <button
                key={topic}
                className={activeTopic === topic ? "active" : ""}
                onClick={() => chooseTopic(topic)}
              >
                {menuLabel(topic, topicEnglish[topic])}
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
            <button onClick={share} aria-keyshortcuts="S">
              <span>{menuLabel("分享", "Share")}</span>
              <kbd>S</kbd>
            </button>
            <button
              onClick={saveImage}
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
            <a href={brand.repositoryUrl} target="_blank" rel="noreferrer">
              <span>{menuLabel("开源代码与反馈", "Source & feedback")}</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
        <button
          ref={menuButtonRef}
          className={`corner-menu-button ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen((value) => !value)}
          aria-label={menuOpen
            ? menuLabel("收起菜单", "Close menu")
            : menuLabel("打开菜单", "Open menu")}
          aria-expanded={menuOpen}
        >
          <span aria-hidden="true">•••</span>
        </button>

        <div className={`detail-scrim ${detailOpen ? "open" : ""}`} onClick={closeDetail} />
        <aside
          ref={detailSheetRef}
          className={`detail-sheet ${detailOpen ? "open" : ""}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="detail-title"
          aria-hidden={!detailOpen}
          inert={!detailOpen ? true : undefined}
          onKeyDown={onDetailKeyDown}
        >
          <div className="sheet-handle" />
          <div className="sheet-heading">
            <span id="detail-title">{menuLabel("读深一层", "Read Deeper")}</span>
            <button
              ref={detailCloseButtonRef}
              onClick={closeDetail}
              aria-label={menuLabel("关闭解读", "Close interpretation")}
              aria-keyshortcuts="Escape"
            >×</button>
          </div>
          <p className="detail-topic">{languageMode === "en"
            ? `${topicEnglish[thought.topic]} · ${displayedSchool}`
            : `${localizeChinese(thought.topic)} · ${displayedSchool}`}</p>
          <div className="detail-quote" aria-label={menuLabel("这一则命题译写", "Interpretive rendering of this thought")}>
            <span className="detail-quote-label">{menuLabel("命题译写", "INTERPRETIVE RENDERING")}</span>
            {showEnglishQuote ? (
              <div className="detail-quote-line detail-quote-english" lang="en">
                <p>“{thought.english}”</p>
              </div>
            ) : null}
            {isChineseLanguage ? (
              <div className="detail-quote-line">
                <p>「<PunctuatedQuote text={localizeChinese(thought.text)} />」</p>
              </div>
            ) : null}
          </div>
          <h2>{languageMode === "en"
            ? `What might ${displayedName} ask us to notice?`
            : `${displayedName}${localizeChinese("想提醒我们什么？")}`}</h2>
          <p className="reflection">{displayedReflection}</p>

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
                    }}
                  >
                    <span>{viewLabel}</span>
                    <em>{lineage[view].length}</em>
                  </button>
                );
              })}
            </div>

            <div
              className="lineage-list"
              id="lineage-panel"
              role="tabpanel"
              aria-labelledby={`lineage-tab-${effectiveLineageView}`}
            >
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
                  <strong>{languageMode === "en"
                    ? entry.related.englishName
                    : localizeChinese(entry.related.name)}</strong>
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
                <h4 id="comparison-title">{displayedName}<i>×</i>{languageMode === "en"
                  ? comparison.related.englishName
                  : localizeChinese(comparison.related.name)}</h4>
                <p className="comparison-summary">{languageMode === "en"
                  ? comparison.connection.englishSummary
                  : localizeChinese(comparison.connection.summary)}</p>

                <div className="comparison-quotes">
                  <article>
                    <span>{displayedName}</span>
                    {showEnglishQuote ? <p className="comparison-quote-english" lang="en">“{thought.english}”</p> : null}
                    {isChineseLanguage ? <p>「{localizeChinese(thought.text)}」</p> : null}
                    <small>{displayedWork}</small>
                  </article>
                  <div className={`comparison-relation kind-${comparison.connection.kind}`}>
                    <span>{relationLabel(comparison.connection.kind)}</span>
                  </div>
                  <article>
                    <span>{languageMode === "en"
                      ? comparison.related.englishName
                      : localizeChinese(comparison.related.name)}</span>
                    {showEnglishQuote ? (
                      <p className="comparison-quote-english" lang="en">“{comparison.related.english}”</p>
                    ) : null}
                    {isChineseLanguage ? <p>「{localizeChinese(comparison.related.text)}」</p> : null}
                    <small>{languageMode === "en"
                      ? comparison.related.englishWork
                      : localizeChinese(comparison.related.work)}</small>
                  </article>
                </div>

                <div className="comparison-actions">
                  <button type="button" onClick={() => goToThought(comparison.related.id)}>
                    <span>{menuLabel("转到", "Go to")} {languageMode === "en"
                      ? comparison.related.englishName
                      : localizeChinese(comparison.related.name)}</span>
                    <span aria-hidden="true">→</span>
                  </button>
                  <button type="button" onClick={() => setComparisonKey(null)}>
                    {menuLabel("收起对读", "Collapse")}
                  </button>
                </div>
              </div>
            ) : null}

            <p className="lineage-disclaimer">{menuLabel(
              "上下游包含直接影响、传统中介与编辑性重构；“呼应 / 分歧”不等于直接影响或明确引用。",
              "Origins and afterlives may reflect direct influence, mediated traditions, or editorial reframing; an echo or contrast does not imply direct influence or explicit citation.",
            )}</p>
          </section>

          <div className="question-card">
            <span>{menuLabel("留给此刻的问题", "A question for this moment")}</span>
            <p>{displayedQuestion}</p>
          </div>
          <p className="source-note">{languageMode === "en"
            ? `Source: ${displayedWork} · Interpretive rendering and paraphrase for readability; not a verbatim quotation`
            : `${localizeChinese("思想线索：")}${displayedWork} · ${localizeChinese("内容为便于阅读的命题译写与转述，并非逐字引文")}`}</p>
        </aside>

        <div
          className={`toast ${actionNotice ? "show" : ""}`}
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          {actionNotice === "copied"
            ? menuLabel("已复制", "Thought copied")
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
