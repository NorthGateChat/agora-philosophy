import { maoThoughtConnections, maoThoughts } from "./mao";
import { thoughtConnections, thoughts, type Thought, type ThoughtConnection } from "./philosophy";

export type ContentLibraryId = "western" | "mao";

export type TopicOption = {
  id: "all" | Thought["topic"];
  label: string;
  englishLabel: string;
};

type ContentLibrary = {
  id: ContentLibraryId;
  label: string;
  englishLabel: string;
  shortEnglishLabel: string;
  thoughts: Thought[];
  topics: TopicOption[];
};

const allTopic: TopicOption = { id: "all", label: "全部", englishLabel: "All" };

export const contentLibraries: Record<ContentLibraryId, ContentLibrary> = {
  western: {
    id: "western",
    label: "西方哲学",
    englishLabel: "Western Philosophy",
    shortEnglishLabel: "Western",
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
  mao: {
    id: "mao",
    label: "毛选",
    englishLabel: "Selected Works of Mao",
    shortEnglishLabel: "Mao",
    thoughts: maoThoughts,
    topics: [
      allTopic,
      { id: "实践", label: "实践", englishLabel: "Practice" },
      { id: "矛盾", label: "矛盾", englishLabel: "Contradiction" },
      { id: "群众", label: "群众", englishLabel: "The People" },
      { id: "方法", label: "方法", englishLabel: "Method" },
      { id: "文化", label: "文化", englishLabel: "Culture" },
      { id: "战略", label: "战略", englishLabel: "Strategy" },
    ],
  },
};

export const contentLibraryOptions = [contentLibraries.western, contentLibraries.mao] as const;
export const allThoughts = [...thoughts, ...maoThoughts];
export const allThoughtConnections: ThoughtConnection[] = [
  ...thoughtConnections,
  ...maoThoughtConnections,
];
export const contentLibraryStorageKey = "agora-content-library";

export function isContentLibraryId(value: string | null): value is ContentLibraryId {
  return value === "western" || value === "mao";
}

export function contentLibraryForThought(thoughtId: string): ContentLibraryId | null {
  if (thoughts.some((thought) => thought.id === thoughtId)) return "western";
  if (maoThoughts.some((thought) => thought.id === thoughtId)) return "mao";
  return null;
}
