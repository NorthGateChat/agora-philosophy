import type {
  ReadingUnitIndex,
  ReadingUnitInventoryEntry,
  ReadingUnitThoughtRoute,
} from "./readingUnitTypes";

export type { ReadingUnitIndex } from "./readingUnitTypes";

export type ReadingLanguageMode = "zh-hans" | "zh-hant" | "en";

export type ReadingUnitSource = Readonly<{
  url?: string;
  retrievalUrl?: string;
  label?: string;
  englishLabel?: string;
  localPath?: string;
  contentType?: string;
  sha256?: string;
}>;

/** Metadata embedded in a lazily loaded unit body, not the compact inventory. */
export type ReadingUnitDocumentMetadata = Readonly<{
  title?: string;
  traditionalTitle?: string;
  englishTitle?: string;
  author?: string;
  traditionalAuthor?: string;
  englishAuthor?: string;
  work?: string;
  traditionalWork?: string;
  englishWork?: string;
  locator?: string;
  traditionalLocator?: string;
  englishLocator?: string;
  version?: string;
  traditionalVersion?: string;
  englishVersion?: string;
  language?: string;
  sourceUrl?: string;
  preparedSourceUrl?: string;
  externalUrl?: string;
  source?: ReadingUnitSource;
  selectionMethod?: string;
  contentHash?: string;
  inputHash?: string;
}>;

export type ReadingUnitParagraph = Readonly<{
  id: string;
  text: string;
}>;

export type ReadingUnitAnchorSegment = Readonly<{
  paragraphId: string;
  start: number;
  end: number;
  text?: string;
}>;

export type ReadingUnitAnchor = Readonly<{
  paragraphId?: string;
  anchorId?: string;
  start?: number;
  end?: number;
  quote?: string;
  match?: string | boolean;
  segments?: readonly ReadingUnitAnchorSegment[];
}>;

export type ReadingUnitDocument = ReadingUnitDocumentMetadata & Readonly<{
  id: string;
  schemaVersion: number;
  paragraphs: readonly ReadingUnitParagraph[];
  anchors: Readonly<Record<string, ReadingUnitAnchor | string>>;
}>;

export type ResolvedReadingAnchor = Readonly<{
  paragraphId: string;
  start?: number;
  end?: number;
  quote?: string;
  segments?: readonly ReadingUnitAnchorSegment[];
}>;

export type IntegratedReadingUnit = Readonly<{
  kind: "integrated";
  thoughtId: string;
  mapping: ReadingUnitThoughtRoute;
  metadata: ReadingUnitInventoryEntry;
  unit: ReadingUnitDocument;
  anchor?: ResolvedReadingAnchor;
  registeredSourceUrl?: string;
  preparedSourceUrl?: string;
  sourceSha256?: string;
  /** @deprecated Prefer registeredSourceUrl. */
  sourceUrl?: string;
}>;

export type ExternalReadingUnit = Readonly<{
  kind: "external";
  thoughtId: string;
  mapping: ReadingUnitThoughtRoute;
  metadata: ReadingUnitInventoryEntry;
  reason: "external-only" | "unit-unavailable";
  sourceUrl?: string;
  error?: Error;
}>;

export type ReadingUnitResolution = IntegratedReadingUnit | ExternalReadingUnit;

export type ReadingUnitLoadErrorCode =
  | "fetch-unavailable"
  | "http-error"
  | "invalid-index"
  | "invalid-unit"
  | "thought-unmapped"
  | "unit-unregistered";

export class ReadingUnitLoadError extends Error {
  readonly code: ReadingUnitLoadErrorCode;
  readonly url?: string;

  constructor(
    code: ReadingUnitLoadErrorCode,
    message: string,
    options: { cause?: unknown; url?: string } = {},
  ) {
    super(message, options.cause === undefined ? undefined : { cause: options.cause });
    this.name = "ReadingUnitLoadError";
    this.code = code;
    this.url = options.url;
  }
}

type FetchLike = (
  input: RequestInfo | URL,
  init?: RequestInit,
) => Promise<Response>;

export type ReadingUnitLoadOptions = Readonly<{
  basePath?: string;
  fetchImpl?: FetchLike;
  signal?: AbortSignal;
  cache?: boolean;
}>;

const defaultBasePath = "/readings";
const indexCache = new Map<string, Promise<ReadingUnitIndex>>();
const unitCache = new Map<string, Promise<ReadingUnitDocument>>();

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function optionalString(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function optionalSourceText(value: unknown) {
  return typeof value === "string" && value.trim() ? value : undefined;
}

function optionalNumber(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

function anchorSegmentFrom(
  value: unknown,
  thoughtId: string,
  index: number,
): ReadingUnitAnchorSegment {
  if (!isRecord(value)) {
    throw new ReadingUnitLoadError(
      "invalid-unit",
      `Reading anchor ${thoughtId} segment ${index + 1} is not an object.`,
    );
  }
  const paragraphId = optionalString(value.paragraphId);
  const start = optionalNumber(value.start);
  const end = optionalNumber(value.end);
  const text = optionalSourceText(value.text);
  if (
    !paragraphId
    || !Number.isInteger(start)
    || !Number.isInteger(end)
    || start === undefined
    || end === undefined
    || start < 0
    || end <= start
  ) {
    throw new ReadingUnitLoadError(
      "invalid-unit",
      `Reading anchor ${thoughtId} segment ${index + 1} has an invalid source range.`,
    );
  }
  return { paragraphId, start, end, text };
}

function normalizeBasePath(basePath = defaultBasePath) {
  const normalized = basePath.trim() || defaultBasePath;
  return normalized.endsWith("/") ? normalized.slice(0, -1) : normalized;
}

function assetUrl(basePath: string, path: string) {
  if (/^(?:https?:)?\/\//i.test(path)) return path;
  if (path.startsWith("/")) return path;
  return `${normalizeBasePath(basePath)}/${path.replace(/^\.\//, "")}`;
}

function bilingualTextIsValid(value: unknown) {
  return isRecord(value)
    && Boolean(optionalString(value.zh))
    && Boolean(optionalString(value.en));
}

/** Validates the public inventory without duplicating its domain enums here. */
export function parseReadingUnitIndex(value: unknown): ReadingUnitIndex {
  if (
    !isRecord(value)
    || value.schemaVersion !== 1
    || !isRecord(value.thoughtMap)
    || !Array.isArray(value.units)
  ) {
    throw new ReadingUnitLoadError(
      "invalid-index",
      "Reading index must contain a schema-v1 thoughtMap and units array.",
    );
  }
  for (const [thoughtId, rawRoute] of Object.entries(value.thoughtMap)) {
    if (
      !isRecord(rawRoute)
      || !optionalString(rawRoute.unitId)
      || !bilingualTextIsValid(rawRoute.locator)
    ) {
      throw new ReadingUnitLoadError(
        "invalid-index",
        `Reading route ${thoughtId} is incomplete.`,
      );
    }
  }
  for (const rawUnit of value.units) {
    if (
      !isRecord(rawUnit)
      || !optionalString(rawUnit.id)
      || !bilingualTextIsValid(rawUnit.work)
      || !isRecord(rawUnit.source)
      || !optionalString(rawUnit.source.url)
      || !isRecord(rawUnit.expectedUnitFile)
      || !optionalString(rawUnit.expectedUnitFile.href)
    ) {
      throw new ReadingUnitLoadError(
        "invalid-index",
        "Reading inventory contains an incomplete unit entry.",
      );
    }
  }
  return value as unknown as ReadingUnitIndex;
}

function sourceFrom(value: unknown): ReadingUnitSource | undefined {
  if (!isRecord(value)) return undefined;
  const source: ReadingUnitSource = {
    url: optionalString(value.url),
    retrievalUrl: optionalString(value.retrievalUrl),
    label: optionalString(value.label),
    englishLabel: optionalString(value.englishLabel),
    localPath: optionalString(value.localPath),
    contentType: optionalString(value.contentType),
    sha256: optionalString(value.sha256),
  };
  return Object.values(source).some(Boolean) ? source : undefined;
}

function documentMetadataFrom(value: Record<string, unknown>) {
  return {
    title: optionalString(value.title),
    traditionalTitle: optionalString(value.traditionalTitle),
    englishTitle: optionalString(value.englishTitle),
    author: optionalString(value.author),
    traditionalAuthor: optionalString(value.traditionalAuthor),
    englishAuthor: optionalString(value.englishAuthor),
    work: optionalString(value.work),
    traditionalWork: optionalString(value.traditionalWork),
    englishWork: optionalString(value.englishWork),
    locator: optionalString(value.locator),
    traditionalLocator: optionalString(value.traditionalLocator),
    englishLocator: optionalString(value.englishLocator),
    version: optionalString(value.version),
    traditionalVersion: optionalString(value.traditionalVersion),
    englishVersion: optionalString(value.englishVersion),
    language: optionalString(value.language),
    sourceUrl: optionalString(value.sourceUrl),
    preparedSourceUrl: optionalString(value.preparedSourceUrl),
    externalUrl: optionalString(value.externalUrl),
    source: sourceFrom(value.source),
    selectionMethod: optionalString(value.selectionMethod),
    contentHash: optionalString(value.contentHash),
    inputHash: optionalString(value.inputHash),
  } satisfies ReadingUnitDocumentMetadata;
}

function paragraphFrom(value: unknown, index: number): ReadingUnitParagraph {
  if (!isRecord(value)) {
    throw new ReadingUnitLoadError(
      "invalid-unit",
      `Reading paragraph ${index + 1} is not an object.`,
    );
  }
  const id = optionalString(value.id);
  const text = optionalSourceText(value.text);
  if (!id || !text) {
    throw new ReadingUnitLoadError(
      "invalid-unit",
      `Reading paragraph ${index + 1} must have non-empty id and text fields.`,
    );
  }
  return { id, text };
}

function anchorFrom(
  value: unknown,
  thoughtId: string,
): ReadingUnitAnchor | string | undefined {
  if (typeof value === "string") return optionalString(value);
  if (!isRecord(value)) return undefined;
  const paragraphId = optionalString(value.paragraphId);
  const anchorId = optionalString(value.anchorId);
  const quote = optionalSourceText(value.quote);
  let segments: readonly ReadingUnitAnchorSegment[] | undefined;
  if (Object.hasOwn(value, "segments")) {
    if (!Array.isArray(value.segments) || value.segments.length === 0) {
      throw new ReadingUnitLoadError(
        "invalid-unit",
        `Reading anchor ${thoughtId} has an empty or invalid segments array.`,
      );
    }
    segments = value.segments.map((segment, index) => (
      anchorSegmentFrom(segment, thoughtId, index)
    ));
  }
  if (!paragraphId && !anchorId && !quote && !segments) return undefined;
  return {
    paragraphId,
    anchorId,
    start: optionalNumber(value.start),
    end: optionalNumber(value.end),
    quote,
    match: typeof value.match === "boolean"
      ? value.match
      : optionalString(value.match),
    ...(segments ? { segments } : {}),
  };
}

function anchorsFrom(value: unknown, legacyValue: unknown) {
  const anchors: Record<string, ReadingUnitAnchor | string> = {};
  if (isRecord(value)) {
    Object.entries(value).forEach(([thoughtId, rawAnchor]) => {
      const anchor = anchorFrom(rawAnchor, thoughtId);
      if (anchor) anchors[thoughtId] = anchor;
    });
  }

  // Early extraction scripts used cardAnchors arrays. Retaining this reader-side
  // compatibility lets archived batches migrate without rewriting source text.
  if (Array.isArray(legacyValue)) {
    legacyValue.forEach((rawAnchor) => {
      if (!isRecord(rawAnchor)) return;
      const thoughtId = optionalString(rawAnchor.thoughtId)
        ?? optionalString(rawAnchor.cardId);
      const anchor = thoughtId ? anchorFrom(rawAnchor, thoughtId) : undefined;
      if (thoughtId && anchor && !anchors[thoughtId]) anchors[thoughtId] = anchor;
    });
  }
  return anchors;
}

function validateAnchors(
  anchors: Readonly<Record<string, ReadingUnitAnchor | string>>,
  paragraphs: readonly ReadingUnitParagraph[],
) {
  const paragraphById = new Map(paragraphs.map((paragraph) => [paragraph.id, paragraph]));
  const paragraphIndexById = new Map(paragraphs.map((paragraph, index) => [paragraph.id, index]));

  for (const [thoughtId, anchor] of Object.entries(anchors)) {
    if (typeof anchor === "string") {
      if (!paragraphById.has(anchor)) {
        throw new ReadingUnitLoadError(
          "invalid-unit",
          `Reading anchor ${thoughtId} points to missing paragraph ${anchor}.`,
        );
      }
      continue;
    }

    const segments = anchor.segments;
    if (segments?.length) {
      const first = segments[0];
      const primaryParagraphId = anchor.paragraphId ?? anchor.anchorId;
      if (primaryParagraphId && primaryParagraphId !== first.paragraphId) {
        throw new ReadingUnitLoadError(
          "invalid-unit",
          `Reading anchor ${thoughtId} primary paragraph does not match its first segment.`,
        );
      }
      if (
        (anchor.start !== undefined && anchor.start !== first.start)
        || (anchor.end !== undefined && anchor.end !== first.end)
      ) {
        throw new ReadingUnitLoadError(
          "invalid-unit",
          `Reading anchor ${thoughtId} primary range does not match its first segment.`,
        );
      }

      let previousParagraphIndex = -1;
      let previousEnd = -1;
      for (const [segmentIndex, segment] of segments.entries()) {
        const paragraph = paragraphById.get(segment.paragraphId);
        const paragraphIndex = paragraphIndexById.get(segment.paragraphId);
        if (!paragraph || paragraphIndex === undefined || segment.end > paragraph.text.length) {
          throw new ReadingUnitLoadError(
            "invalid-unit",
            `Reading anchor ${thoughtId} segment ${segmentIndex + 1} falls outside its paragraph.`,
          );
        }
        if (
          paragraphIndex < previousParagraphIndex
          || (paragraphIndex === previousParagraphIndex && segment.start < previousEnd)
        ) {
          throw new ReadingUnitLoadError(
            "invalid-unit",
            `Reading anchor ${thoughtId} segments are out of order or overlap.`,
          );
        }
        if (
          segment.text !== undefined
          && paragraph.text.slice(segment.start, segment.end) !== segment.text
        ) {
          throw new ReadingUnitLoadError(
            "invalid-unit",
            `Reading anchor ${thoughtId} segment ${segmentIndex + 1} text does not match its range.`,
          );
        }
        previousParagraphIndex = paragraphIndex;
        previousEnd = segment.end;
      }
      continue;
    }

    const paragraphId = anchor.paragraphId ?? anchor.anchorId;
    if (!paragraphId) continue;
    const paragraph = paragraphById.get(paragraphId);
    if (!paragraph) {
      throw new ReadingUnitLoadError(
        "invalid-unit",
        `Reading anchor ${thoughtId} points to missing paragraph ${paragraphId}.`,
      );
    }
    if (anchor.start === undefined && anchor.end === undefined) continue;
    if (
      !Number.isInteger(anchor.start)
      || !Number.isInteger(anchor.end)
      || anchor.start === undefined
      || anchor.end === undefined
      || anchor.start < 0
      || anchor.end <= anchor.start
      || anchor.end > paragraph.text.length
    ) {
      throw new ReadingUnitLoadError(
        "invalid-unit",
        `Reading anchor ${thoughtId} has an invalid source range.`,
      );
    }
  }
}

export function parseReadingUnit(value: unknown, fallbackId?: string): ReadingUnitDocument {
  if (!isRecord(value) || !Array.isArray(value.paragraphs)) {
    throw new ReadingUnitLoadError(
      "invalid-unit",
      "A reading unit must contain a paragraphs array.",
    );
  }
  const id = optionalString(value.id) ?? fallbackId;
  if (!id) {
    throw new ReadingUnitLoadError("invalid-unit", "A reading unit must have an id.");
  }
  const paragraphs = value.paragraphs.map(paragraphFrom);
  if (paragraphs.length === 0) {
    throw new ReadingUnitLoadError(
      "invalid-unit",
      `Reading unit ${id} contains no readable paragraphs.`,
    );
  }
  if (new Set(paragraphs.map((paragraph) => paragraph.id)).size !== paragraphs.length) {
    throw new ReadingUnitLoadError(
      "invalid-unit",
      `Reading unit ${id} contains duplicate paragraph ids.`,
    );
  }

  const anchors = anchorsFrom(value.anchors, value.cardAnchors);
  validateAnchors(anchors, paragraphs);

  return {
    ...documentMetadataFrom(value),
    id,
    schemaVersion: optionalNumber(value.schemaVersion) ?? 1,
    paragraphs,
    anchors,
  };
}

function fetcherFor(options: ReadingUnitLoadOptions) {
  const fetchImpl = options.fetchImpl ?? globalThis.fetch;
  if (!fetchImpl) {
    throw new ReadingUnitLoadError(
      "fetch-unavailable",
      "This environment cannot load reading units.",
    );
  }
  return fetchImpl.bind(globalThis) as FetchLike;
}

async function fetchJson(
  url: string,
  options: ReadingUnitLoadOptions,
): Promise<unknown> {
  const response = await fetcherFor(options)(url, {
    headers: { Accept: "application/json" },
    signal: options.signal,
  });
  if (!response.ok) {
    throw new ReadingUnitLoadError(
      "http-error",
      `Reading asset returned HTTP ${response.status}.`,
      { url },
    );
  }
  try {
    return await response.json();
  } catch (error) {
    throw new ReadingUnitLoadError(
      url.endsWith("/index.json") ? "invalid-index" : "invalid-unit",
      "Reading asset is not valid JSON.",
      { cause: error, url },
    );
  }
}

function shouldCache(options: ReadingUnitLoadOptions) {
  return options.cache !== false && !options.fetchImpl && !options.signal;
}

export async function loadReadingUnitIndex(
  options: ReadingUnitLoadOptions = {},
): Promise<ReadingUnitIndex> {
  const url = `${normalizeBasePath(options.basePath)}/index.json`;
  const cached = shouldCache(options) ? indexCache.get(url) : undefined;
  if (cached) return cached;

  const pending = fetchJson(url, options).then(parseReadingUnitIndex);
  if (shouldCache(options)) {
    indexCache.set(url, pending);
    void pending.catch(() => {
      if (indexCache.get(url) === pending) indexCache.delete(url);
    });
  }
  return pending;
}

async function loadUnitDocument(
  metadata: ReadingUnitInventoryEntry,
  options: ReadingUnitLoadOptions,
) {
  const basePath = normalizeBasePath(options.basePath);
  const url = assetUrl(basePath, metadata.expectedUnitFile.href);
  const cached = shouldCache(options) ? unitCache.get(url) : undefined;
  if (cached) return cached;

  const pending = fetchJson(url, options)
    .then((value) => parseReadingUnit(value, metadata.id));
  if (shouldCache(options)) {
    unitCache.set(url, pending);
    void pending.catch(() => {
      if (unitCache.get(url) === pending) unitCache.delete(url);
    });
  }
  return pending;
}

function resolveAnchor(
  thoughtId: string,
  unit: ReadingUnitDocument,
): ResolvedReadingAnchor | undefined {
  const unitAnchor = unit.anchors[thoughtId];
  const normalized = typeof unitAnchor === "string"
    ? { paragraphId: unitAnchor }
    : unitAnchor;
  const registeredParagraphId = normalized?.segments?.[0]?.paragraphId
    ?? normalized?.paragraphId
    ?? normalized?.anchorId;
  const registeredParagraphExists = registeredParagraphId
    ? unit.paragraphs.some((paragraph) => paragraph.id === registeredParagraphId)
    : false;
  const quoteParagraph = !registeredParagraphExists && normalized?.quote
    ? unit.paragraphs.find((paragraph) => paragraph.text.includes(normalized.quote ?? ""))
    : undefined;
  const paragraphId = registeredParagraphExists
    ? registeredParagraphId
    : quoteParagraph?.id;
  if (!paragraphId) return undefined;
  const quoteStart = quoteParagraph && normalized?.quote
    ? quoteParagraph.text.indexOf(normalized.quote)
    : -1;
  return {
    paragraphId,
    start: normalized?.start ?? (quoteStart >= 0 ? quoteStart : undefined),
    end: normalized?.end ?? (quoteStart >= 0 && normalized?.quote
      ? quoteStart + normalized.quote.length
      : undefined),
    quote: normalized.quote,
    ...(normalized.segments ? { segments: normalized.segments } : {}),
  };
}

function readablePreparedSourceUrl(value?: string) {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" && url.protocol !== "http:") return undefined;
    if (url.pathname === "/w/api.php" && url.searchParams.has("page")) {
      const page = url.searchParams.get("page");
      if (!page) return undefined;
      const path = page
        .split("/")
        .map((segment) => encodeURIComponent(segment.replaceAll(" ", "_")))
        .join("/");
      return `${url.origin}/wiki/${path}`;
    }
    return url.href;
  } catch {
    return undefined;
  }
}

function equivalentSourceUrls(left?: string, right?: string) {
  if (!left || !right) return false;
  try {
    const normalize = (value: string) => {
      const url = new URL(value);
      url.hash = "";
      return url.href.replace(/\/$/u, "");
    };
    return normalize(left) === normalize(right);
  } catch {
    return left === right;
  }
}

export async function loadReadingUnitForThought(
  thoughtId: string,
  options: ReadingUnitLoadOptions = {},
): Promise<ReadingUnitResolution> {
  const index = await loadReadingUnitIndex(options);
  const mapping = index.thoughtMap[thoughtId];
  if (!mapping) {
    throw new ReadingUnitLoadError(
      "thought-unmapped",
      `No reading unit is registered for thought ${thoughtId}.`,
    );
  }
  const metadata = index.units.find((unit) => unit.id === mapping.unitId);
  if (!metadata) {
    throw new ReadingUnitLoadError(
      "unit-unregistered",
      `Reading unit ${mapping.unitId} is missing from the inventory.`,
    );
  }
  const sourceUrl = metadata.source.url;
  if (metadata.availability === "source-route") {
    return {
      kind: "external",
      thoughtId,
      mapping,
      metadata,
      reason: "external-only",
      sourceUrl,
    };
  }

  try {
    const unit = await loadUnitDocument(metadata, options);
    const registeredSourceUrl = unit.sourceUrl
      ?? unit.externalUrl
      ?? metadata.source.url;
    const preparedCandidate = readablePreparedSourceUrl(
      unit.preparedSourceUrl ?? unit.source?.url,
    );
    const preparedSourceUrl = equivalentSourceUrls(
      registeredSourceUrl,
      preparedCandidate,
    ) ? undefined : preparedCandidate;
    return {
      kind: "integrated",
      thoughtId,
      mapping,
      metadata,
      unit,
      anchor: resolveAnchor(thoughtId, unit),
      registeredSourceUrl,
      preparedSourceUrl,
      sourceSha256: unit.source?.sha256,
      sourceUrl: registeredSourceUrl,
    };
  } catch (error) {
    return {
      kind: "external",
      thoughtId,
      mapping,
      metadata,
      reason: "unit-unavailable",
      sourceUrl,
      error: error instanceof Error ? error : new Error(String(error)),
    };
  }
}

export function clearReadingUnitCache() {
  indexCache.clear();
  unitCache.clear();
}
