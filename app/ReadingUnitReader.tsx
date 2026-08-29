"use client";

import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
  type RefObject,
} from "react";
import {
  loadReadingUnitForThought,
  type ExternalReadingUnit,
  type IntegratedReadingUnit,
  type ReadingLanguageMode,
  type ReadingUnitAnchor,
} from "../content/readingUnitLoader";
import styles from "./ReadingUnitReader.module.css";

type ReaderState =
  | { requestKey: string; thoughtId: string; status: "loading" }
  | { requestKey: string; thoughtId: string; status: "ready"; resolution: IntegratedReadingUnit }
  | { requestKey: string; thoughtId: string; status: "external"; resolution: ExternalReadingUnit }
  | { requestKey: string; thoughtId: string; status: "error"; error: Error };

export type ReadingUnitReaderProps = Readonly<{
  thoughtId: string;
  languageMode: ReadingLanguageMode;
  onClose: () => void;
  open?: boolean;
  basePath?: string;
  fallbackSourceUrl?: string;
  fallbackTitle?: string;
  fallbackEnglishTitle?: string;
  fallbackLocator?: string;
  fallbackEnglishLocator?: string;
  returnFocusRef?: RefObject<HTMLElement | null>;
}>;

type ReaderCopy = Readonly<{
  dialog: string;
  eyebrow: string;
  defaultTitle: string;
  close: string;
  version: string;
  locator: string;
  loading: string;
  loadingDetail: string;
  externalTitle: string;
  externalDetail: string;
  unavailableTitle: string;
  unavailableDetail: string;
  retry: string;
  registeredSource: string;
  preparedSource: string;
  fingerprint: string;
  sourceScope: string;
  anchoredParagraph: string;
}>;

const copyByLanguage: Record<ReadingLanguageMode, ReaderCopy> = {
  "zh-hans": {
    dialog: "阅读所在篇章",
    eyebrow: "所在篇章",
    defaultTitle: "原典阅读",
    close: "关闭篇章阅读",
    version: "版本",
    locator: "定位",
    loading: "正在载入篇章",
    loadingDetail: "只在打开时载入经过整理的篇章文本。",
    externalTitle: "这篇原文在原站阅读",
    externalDetail: "当前版本不内置这一篇章，你仍可回到登记的原始来源继续阅读。",
    unavailableTitle: "篇章暂时无法载入",
    unavailableDetail: "可以稍后重试；如果登记了原始来源，也可以直接前往原站。",
    retry: "重新载入",
    registeredSource: "登记原始来源",
    preparedSource: "本篇正文来源",
    fingerprint: "正文指纹",
    sourceScope: "篇章文本用于回到论证现场；版本、译文与解读仍可能继续校订。",
    anchoredParagraph: "当前思想所在段落",
  },
  "zh-hant": {
    dialog: "閱讀所在篇章",
    eyebrow: "所在篇章",
    defaultTitle: "原典閱讀",
    close: "關閉篇章閱讀",
    version: "版本",
    locator: "定位",
    loading: "正在載入篇章",
    loadingDetail: "只在開啟時載入經過整理的篇章文本。",
    externalTitle: "這篇原文在原站閱讀",
    externalDetail: "目前版本不內建這一篇章，你仍可回到登記的原始來源繼續閱讀。",
    unavailableTitle: "篇章暫時無法載入",
    unavailableDetail: "可以稍後重試；如果登記了原始來源，也可以直接前往原站。",
    retry: "重新載入",
    registeredSource: "登記原始來源",
    preparedSource: "本篇正文來源",
    fingerprint: "正文指紋",
    sourceScope: "篇章文本用於回到論證現場；版本、譯文與解讀仍可能繼續校訂。",
    anchoredParagraph: "目前思想所在段落",
  },
  en: {
    dialog: "Read the containing passage",
    eyebrow: "Containing passage",
    defaultTitle: "Primary-text reading",
    close: "Close passage reader",
    version: "Edition",
    locator: "Locator",
    loading: "Loading the passage",
    loadingDetail: "The prepared passage is loaded only when you open it.",
    externalTitle: "Read this passage at its source",
    externalDetail: "This passage is not embedded in the current edition, but you can continue at the registered primary source.",
    unavailableTitle: "The passage could not be loaded",
    unavailableDetail: "Try again later, or continue at the primary source when one is registered.",
    retry: "Try again",
    registeredSource: "Registered primary source",
    preparedSource: "Prepared-text source",
    fingerprint: "Text fingerprint",
    sourceScope: "The passage restores argumentative context; editions, translations, and commentary may still be revised.",
    anchoredParagraph: "Paragraph containing the current thought",
  },
};

function localizedValue(
  language: ReadingLanguageMode,
  simplified?: string,
  traditional?: string,
  english?: string,
) {
  if (language === "en") return english?.trim() || simplified?.trim();
  if (language === "zh-hant") {
    return traditional?.trim() || simplified?.trim() || english?.trim();
  }
  return simplified?.trim() || traditional?.trim() || english?.trim();
}

function safeExternalUrl(value?: string) {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url.href : undefined;
  } catch {
    return undefined;
  }
}

function textRange(
  text: string,
  anchor: Pick<ReadingUnitAnchor, "start" | "end" | "quote">,
) {
  const start = anchor.start;
  const end = anchor.end;
  if (
    Number.isInteger(start)
    && Number.isInteger(end)
    && start !== undefined
    && end !== undefined
    && start >= 0
    && end > start
    && end <= text.length
  ) {
    return { start, end };
  }
  const quote = anchor.quote;
  if (!quote?.trim()) return undefined;
  const quoteStart = text.indexOf(quote);
  return quoteStart >= 0
    ? { start: quoteStart, end: quoteStart + quote.length }
    : undefined;
}

function rangesForParagraph(
  text: string,
  paragraphId: string,
  anchor?: ReadingUnitAnchor,
) {
  if (!anchor) return [];
  if (anchor.segments?.length) {
    return anchor.segments
      .filter((segment) => segment.paragraphId === paragraphId)
      .map(({ start, end }) => ({ start, end }));
  }
  if (anchor.paragraphId !== paragraphId) return [];
  const range = textRange(text, anchor);
  return range ? [range] : [];
}

function highlightedText(
  text: string,
  ranges: readonly Readonly<{ start: number; end: number }>[],
) {
  const result: ReactNode[] = [];
  let cursor = 0;
  ranges.forEach((range, index) => {
    if (range.start > cursor) result.push(text.slice(cursor, range.start));
    result.push(
      <mark className={styles.mark} key={`${range.start}-${range.end}-${index}`}>
        {text.slice(range.start, range.end)}
      </mark>,
    );
    cursor = range.end;
  });
  if (cursor < text.length) result.push(text.slice(cursor));
  return result;
}

function focusableElements(container: HTMLElement) {
  return Array.from(container.querySelectorAll<HTMLElement>(
    "a[href], button:not([disabled]), [tabindex]:not([tabindex='-1'])",
  )).filter((element) => !element.hasAttribute("inert"));
}

export function ReadingUnitReader({
  thoughtId,
  languageMode,
  onClose,
  open = true,
  basePath,
  fallbackSourceUrl,
  fallbackTitle,
  fallbackEnglishTitle,
  fallbackLocator,
  fallbackEnglishLocator,
  returnFocusRef,
}: ReadingUnitReaderProps) {
  const [attempt, setAttempt] = useState(0);
  const requestKey = `${thoughtId}\u0000${basePath ?? ""}\u0000${attempt}`;
  const [state, setState] = useState<ReaderState>({
    requestKey,
    thoughtId,
    status: "loading",
  });
  const dialogRef = useRef<HTMLElement | null>(null);
  const anchorRef = useRef<HTMLParagraphElement | null>(null);
  const titleId = useId();
  const descriptionId = useId();
  const copy = copyByLanguage[languageMode];

  useEffect(() => {
    if (!open) return;
    let current = true;
    void loadReadingUnitForThought(thoughtId, { basePath }).then(
      (resolution) => {
        if (!current) return;
        setState(resolution.kind === "integrated"
          ? { requestKey, thoughtId, status: "ready", resolution }
          : { requestKey, thoughtId, status: "external", resolution });
      },
      (error: unknown) => {
        if (!current) return;
        setState({
          requestKey,
          thoughtId,
          status: "error",
          error: error instanceof Error ? error : new Error(String(error)),
        });
      },
    );
    return () => {
      current = false;
    };
  }, [basePath, open, requestKey, thoughtId]);

  useEffect(() => {
    if (!open) return;
    const returnTarget = returnFocusRef?.current
      ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null);
    const frame = window.requestAnimationFrame(() => dialogRef.current?.focus());
    return () => {
      window.cancelAnimationFrame(frame);
      returnTarget?.focus();
    };
  }, [open, returnFocusRef]);

  const effectiveState = useMemo<ReaderState>(() => (
    state.requestKey === requestKey
      ? state
      : { requestKey, thoughtId, status: "loading" }
  ), [requestKey, state, thoughtId]);
  const resolution = effectiveState.status === "ready"
    || effectiveState.status === "external"
    ? effectiveState.resolution
    : undefined;

  const display = useMemo(() => {
    const unit = resolution?.kind === "integrated" ? resolution.unit : undefined;
    const inventory = resolution?.metadata;
    const title = localizedValue(
      languageMode,
      unit?.title ?? inventory?.work.zh ?? fallbackTitle,
      unit?.traditionalTitle,
      unit?.englishTitle ?? inventory?.work.en ?? fallbackEnglishTitle,
    ) ?? copy.defaultTitle;
    const author = localizedValue(
      languageMode,
      unit?.author,
      unit?.traditionalAuthor,
      unit?.englishAuthor,
    );
    const work = localizedValue(
      languageMode,
      unit?.work ?? inventory?.work.zh,
      unit?.traditionalWork,
      unit?.englishWork ?? inventory?.work.en,
    );
    const mapping = resolution?.mapping;
    const locator = localizedValue(
      languageMode,
      mapping?.locator.zh ?? unit?.locator ?? fallbackLocator,
      unit?.traditionalLocator,
      mapping?.locator.en
        ?? unit?.englishLocator
        ?? fallbackEnglishLocator,
    );
    const version = localizedValue(
      languageMode,
      unit?.version ?? inventory?.edition.zh,
      unit?.traditionalVersion,
      unit?.englishVersion ?? inventory?.edition.en,
    );
    return {
      title,
      author,
      work: work === title ? undefined : work,
      locator,
      version,
      sourceDigest: unit?.source?.sha256,
    };
  }, [
    copy.defaultTitle,
    fallbackEnglishLocator,
    fallbackEnglishTitle,
    fallbackLocator,
    fallbackTitle,
    languageMode,
    resolution,
  ]);

  const registeredSourceUrl = safeExternalUrl(
    resolution?.kind === "integrated"
      ? resolution.registeredSourceUrl ?? resolution.sourceUrl ?? fallbackSourceUrl
      : resolution?.sourceUrl ?? fallbackSourceUrl,
  );
  const preparedSourceUrl = resolution?.kind === "integrated"
    ? safeExternalUrl(resolution.preparedSourceUrl)
    : undefined;

  useEffect(() => {
    if (!open || effectiveState.status !== "ready" || !anchorRef.current) return;
    const frame = window.requestAnimationFrame(() => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      anchorRef.current?.scrollIntoView({
        block: "center",
        behavior: reducedMotion ? "auto" : "smooth",
      });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [effectiveState, open]);

  if (!open) return null;

  const onDialogKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      onClose();
      return;
    }
    if (event.key !== "Tab" || !dialogRef.current) return;
    const focusable = focusableElements(dialogRef.current);
    if (focusable.length === 0) {
      event.preventDefault();
      dialogRef.current.focus();
      return;
    }
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

  const header = (
    <header className={styles.header}>
      <div className={styles.heading}>
        <span className={styles.eyebrow}>{copy.eyebrow}</span>
        <h2 className={styles.title} id={titleId}>{display.title}</h2>
        {display.author || display.work ? (
          <p className={styles.byline}>
            {[display.author, display.work].filter(Boolean).join(" · ")}
          </p>
        ) : null}
      </div>
      <button
        type="button"
        className={styles.close}
        aria-label={copy.close}
        aria-keyshortcuts="Escape"
        onClick={onClose}
      >×</button>
    </header>
  );

  const registeredSourceLink = registeredSourceUrl ? (
    <a
      className={styles.sourceLink}
      href={registeredSourceUrl}
      target="_blank"
      rel="noreferrer noopener"
    >
      {copy.registeredSource}<span aria-hidden="true">↗</span>
    </a>
  ) : null;
  const preparedSourceLink = preparedSourceUrl ? (
    <a
      className={styles.sourceLink}
      href={preparedSourceUrl}
      target="_blank"
      rel="noreferrer noopener"
    >
      {copy.preparedSource}<span aria-hidden="true">↗</span>
    </a>
  ) : null;

  return (
    <div
      className={styles.backdrop}
      onMouseDown={(event) => {
        if (event.currentTarget === event.target) onClose();
      }}
    >
      <section
        ref={dialogRef}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-label={copy.dialog}
        aria-labelledby={titleId}
        aria-describedby={effectiveState.status === "ready" ? undefined : descriptionId}
        aria-busy={effectiveState.status === "loading"}
        tabIndex={-1}
        onKeyDown={onDialogKeyDown}
      >
        <div className={styles.shell}>
          {header}
          <div className={styles.scroller}>
            {effectiveState.status === "loading" ? (
              <div className={styles.state} id={descriptionId} role="status">
                <div className={styles.stateBody}>
                  <span className={`${styles.stateGlyph} ${styles.loadingGlyph}`} aria-hidden="true">◌</span>
                  <h3>{copy.loading}</h3>
                  <p>{copy.loadingDetail}</p>
                </div>
              </div>
            ) : effectiveState.status === "ready" ? (
              <div className={styles.content}>
                {display.locator || display.version || display.sourceDigest ? (
                  <dl className={styles.metadata}>
                    {display.locator ? (
                      <div><dt>{copy.locator}</dt><dd>{display.locator}</dd></div>
                    ) : null}
                    {display.version ? (
                      <div><dt>{copy.version}</dt><dd>{display.version}</dd></div>
                    ) : null}
                    {display.sourceDigest ? (
                      <div>
                        <dt>{copy.fingerprint}</dt>
                        <dd>
                          <code title={`SHA-256 ${display.sourceDigest}`}>
                            {display.sourceDigest.slice(0, 12)}…
                          </code>
                        </dd>
                      </div>
                    ) : null}
                  </dl>
                ) : null}
                <article className={styles.article} aria-label={display.title}>
                  {effectiveState.resolution.unit.paragraphs.map((paragraph) => {
                    const anchor = effectiveState.resolution.anchor;
                    const firstAnchorParagraphId = anchor?.segments?.[0]?.paragraphId
                      ?? anchor?.paragraphId;
                    const currentAnchor = firstAnchorParagraphId === paragraph.id;
                    const ranges = rangesForParagraph(paragraph.text, paragraph.id, anchor);
                    return (
                      <p
                        key={paragraph.id}
                        ref={currentAnchor ? anchorRef : undefined}
                        className={`${styles.paragraph}${currentAnchor ? ` ${styles.anchored}` : ""}`}
                        aria-current={currentAnchor ? "location" : undefined}
                        aria-label={currentAnchor ? copy.anchoredParagraph : undefined}
                        tabIndex={currentAnchor ? -1 : undefined}
                        data-reading-paragraph={paragraph.id}
                      >
                        {ranges.length > 0
                          ? highlightedText(paragraph.text, ranges)
                          : currentAnchor
                            ? <mark className={styles.mark}>{paragraph.text}</mark>
                            : paragraph.text}
                      </p>
                    );
                  })}
                </article>
                <footer className={styles.footer}>
                  <p className={styles.scopeNote}>{copy.sourceScope}</p>
                  <div className={styles.sourceLinks}>
                    {registeredSourceLink}
                    {preparedSourceLink}
                  </div>
                </footer>
              </div>
            ) : effectiveState.status === "external" ? (
              <div className={styles.state} id={descriptionId} role="status">
                <div className={styles.stateBody}>
                  <span className={styles.stateGlyph} aria-hidden="true">↗</span>
                  <h3>{effectiveState.resolution.reason === "unit-unavailable"
                    ? copy.unavailableTitle
                    : copy.externalTitle}</h3>
                  <p>{effectiveState.resolution.reason === "unit-unavailable"
                    ? copy.unavailableDetail
                    : copy.externalDetail}</p>
                  <div className={styles.stateActions}>
                    {effectiveState.resolution.reason === "unit-unavailable" ? (
                      <button className={styles.action} type="button" onClick={() => setAttempt((value) => value + 1)}>
                        {copy.retry}
                      </button>
                    ) : null}
                    {registeredSourceLink}
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.state} id={descriptionId} role="alert">
                <div className={styles.stateBody}>
                  <span className={styles.stateGlyph} aria-hidden="true">!</span>
                  <h3>{copy.unavailableTitle}</h3>
                  <p>{copy.unavailableDetail}</p>
                  <div className={styles.stateActions}>
                    <button className={styles.action} type="button" onClick={() => setAttempt((value) => value + 1)}>
                      {copy.retry}
                    </button>
                    {registeredSourceLink}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
