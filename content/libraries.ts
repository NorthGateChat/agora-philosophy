import {
  chineseThoughtConnections,
  chineseThoughts,
  chineseTopicOptions,
} from "./chinese";
import {
  economicsThoughtConnections,
  economicsThoughts,
  economicsTopicOptions,
} from "./economics";
import { maoThoughtConnections, maoThoughts } from "./mao";
import {
  thoughts,
  type Thought,
  type ThoughtConnection,
  type ThoughtLevelConnection,
} from "./philosophy";
import {
  indianThoughtConnections,
  indianThoughts,
  indianTopicOptions,
} from "./indian";
import {
  scienceThoughtConnections,
  scienceThoughts,
  scienceTopicOptions,
} from "./science";
import {
  psychologyThoughtConnections,
  psychologyThoughts,
  psychologyTopicOptions,
} from "./psychology";
import { westernThoughtConnections } from "./westernThoughtConnections";

export type ContentLibraryId =
  | "western"
  | "chinese"
  | "mao"
  | "science"
  | "economics"
  | "psychology"
  | "indian";
export type ContentLibraryMode = ContentLibraryId | "custom" | "random";

export type TopicOption = {
  id: "all" | Thought["topic"];
  label: string;
  englishLabel: string;
};

type ContentLibrary = {
  id: ContentLibraryId;
  label: string;
  shortLabel: string;
  englishLabel: string;
  shortEnglishLabel: string;
  quoteOrder: "original-first" | "english-first";
  relatedLabel: "author" | "work";
  thoughts: Thought[];
  topics: readonly TopicOption[];
};

type ContentLibraryOption = {
  id: ContentLibraryMode;
  label: string;
  shortLabel: string;
  englishLabel: string;
  shortEnglishLabel: string;
};

const allTopic: TopicOption = { id: "all", label: "全部", englishLabel: "All" };

export const contentLibraries: Record<ContentLibraryId, ContentLibrary> = {
  western: {
    id: "western",
    label: "西方哲学",
    shortLabel: "西方",
    englishLabel: "Western Philosophy",
    shortEnglishLabel: "Western",
    quoteOrder: "english-first",
    relatedLabel: "author",
    thoughts,
    topics: [
      allTopic,
      { id: "存在", label: "存在", englishLabel: "Existence" },
      { id: "伦理", label: "伦理", englishLabel: "Ethics" },
      { id: "知识", label: "知识", englishLabel: "Knowledge" },
      { id: "政治", label: "政治", englishLabel: "Politics" },
      { id: "语言", label: "语言", englishLabel: "Language" },
    ],
  },
  chinese: {
    id: "chinese",
    label: "中国哲学",
    shortLabel: "中国",
    englishLabel: "Chinese Philosophy",
    shortEnglishLabel: "Chinese",
    quoteOrder: "original-first",
    relatedLabel: "author",
    thoughts: chineseThoughts,
    topics: chineseTopicOptions,
  },
  mao: {
    id: "mao",
    label: "毛选",
    shortLabel: "毛选",
    englishLabel: "Writings of Mao Zedong",
    shortEnglishLabel: "Mao",
    quoteOrder: "original-first",
    relatedLabel: "work",
    thoughts: maoThoughts,
    topics: [
      allTopic,
      { id: "实践", label: "实践", englishLabel: "Practice" },
      { id: "矛盾", label: "矛盾", englishLabel: "Contradiction" },
      { id: "群众", label: "群众", englishLabel: "The People" },
      { id: "方法", label: "方法", englishLabel: "Method" },
      { id: "文化", label: "文化", englishLabel: "Culture" },
      { id: "战略", label: "战略", englishLabel: "Strategy" },
      { id: "政治", label: "政治", englishLabel: "Politics" },
    ],
  },
  science: {
    id: "science",
    label: "科学思想",
    shortLabel: "科学",
    englishLabel: "Scientific Thought",
    shortEnglishLabel: "Science",
    quoteOrder: "english-first",
    relatedLabel: "author",
    thoughts: scienceThoughts,
    topics: scienceTopicOptions,
  },
  economics: {
    id: "economics",
    label: "经济思想",
    shortLabel: "经济",
    englishLabel: "Economic Thought",
    shortEnglishLabel: "Economics",
    quoteOrder: "english-first",
    relatedLabel: "author",
    thoughts: economicsThoughts,
    topics: economicsTopicOptions,
  },
  psychology: {
    id: "psychology",
    label: "心理学",
    shortLabel: "心理",
    englishLabel: "Psychology",
    shortEnglishLabel: "Psychology",
    quoteOrder: "english-first",
    relatedLabel: "author",
    thoughts: psychologyThoughts,
    topics: psychologyTopicOptions,
  },
  indian: {
    id: "indian",
    label: "印度哲学",
    shortLabel: "印度",
    englishLabel: "Indian Philosophy",
    shortEnglishLabel: "Indian",
    quoteOrder: "english-first",
    relatedLabel: "author",
    thoughts: indianThoughts,
    topics: indianTopicOptions,
  },
};

export const allThoughts = [
  ...thoughts,
  ...chineseThoughts,
  ...maoThoughts,
  ...scienceThoughts,
  ...economicsThoughts,
  ...psychologyThoughts,
  ...indianThoughts,
];
export const contentLibraryIds = [
  "western",
  "chinese",
  "mao",
  "science",
  "economics",
  "psychology",
  "indian",
] as const satisfies readonly ContentLibraryId[];
export const contentLibraryOptions: readonly ContentLibraryOption[] = [
  contentLibraries.western,
  contentLibraries.chinese,
  contentLibraries.mao,
  contentLibraries.science,
  contentLibraries.economics,
  contentLibraries.psychology,
  contentLibraries.indian,
  {
    id: "custom",
    label: "我的知识",
    shortLabel: "我的",
    englishLabel: "My Knowledge",
    shortEnglishLabel: "Mine",
  },
  {
    id: "random",
    label: "跨集随机",
    shortLabel: "跨集",
    englishLabel: "Across Collections",
    shortEnglishLabel: "Across",
  },
];

const allThoughtIds = new Set(allThoughts.map((thought) => thought.id));
const maoThoughtIds = new Set(maoThoughts.map((thought) => thought.id));

const maoToMaoThoughtConnections = maoThoughtConnections.filter(
  (connection) => maoThoughtIds.has(connection.source) && maoThoughtIds.has(connection.target),
);

const curatedThoughtConnections: readonly ThoughtConnection[] = [
  ...westernThoughtConnections,
  ...chineseThoughtConnections,
  ...maoToMaoThoughtConnections,
  ...scienceThoughtConnections,
  ...economicsThoughtConnections,
  ...psychologyThoughtConnections,
  ...indianThoughtConnections,
];

function asThoughtLevelConnection(connection: ThoughtConnection): ThoughtLevelConnection {
  if (!allThoughtIds.has(connection.source) || !allThoughtIds.has(connection.target)) {
    throw new Error(
      `Thought-level connection has an unresolved endpoint: ${connection.source} -> ${connection.target}`,
    );
  }

  return {
    ...connection,
    id: `${connection.source}:${connection.kind}:${connection.target}`,
    scope: "thought",
    basis: connection.basis ?? "editorial",
  };
}

/**
 * Curated quote-to-quote relationships only.
 *
 * Western author-level `thoughtConnections` remain excluded. Their curated
 * replacement uses explicit quote IDs from `westernThoughtConnections`. Mao
 * relations are included only when both endpoints are concrete cards inside the
 * Mao collection; no prefix or keyword inference manufactures additional links.
 */
export const thoughtLevelConnections: ThoughtLevelConnection[] =
  curatedThoughtConnections.map(asThoughtLevelConnection);

/** @deprecated Prefer `thoughtLevelConnections`; retained for UI compatibility. */
export const allThoughtConnections: ThoughtLevelConnection[] = thoughtLevelConnections;
export const contentLibraryStorageKey = "agora-content-library";

export function isContentLibraryMode(value: string | null): value is ContentLibraryMode {
  return value === "western"
    || value === "chinese"
    || value === "mao"
    || value === "science"
    || value === "economics"
    || value === "psychology"
    || value === "indian"
    || value === "custom"
    || value === "random";
}

export function thoughtsForContentLibraryMode(
  mode: ContentLibraryMode,
  customThoughts: Thought[] = [],
): Thought[] {
  if (mode === "custom") return customThoughts;
  return mode === "random" ? [...allThoughts, ...customThoughts] : contentLibraries[mode].thoughts;
}

export function contentLibraryForThought(thoughtId: string): ContentLibraryId | null {
  if (thoughts.some((thought) => thought.id === thoughtId)) return "western";
  if (chineseThoughts.some((thought) => thought.id === thoughtId)) return "chinese";
  if (maoThoughts.some((thought) => thought.id === thoughtId)) return "mao";
  if (scienceThoughts.some((thought) => thought.id === thoughtId)) return "science";
  if (thoughtId.startsWith("economics-")) return "economics";
  if (thoughtId.startsWith("psychology-")) return "psychology";
  if (indianThoughts.some((thought) => thought.id === thoughtId)) return "indian";
  return null;
}
