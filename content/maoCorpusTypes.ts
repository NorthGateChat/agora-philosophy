import type { Thought } from "./philosophy";

/**
 * A Mao corpus card is an editorial study note grounded in a passage-level
 * source. Identity, palette and the explicit paraphrase marker are added when
 * the public catalog is assembled.
 */
export type MaoCorpusSeed = Pick<
  Thought,
  | "id"
  | "authorId"
  | "topic"
  | "text"
  | "english"
  | "work"
  | "englishWork"
  | "reflection"
  | "englishReflection"
  | "question"
  | "englishQuestion"
  | "sourceLocator"
> & {
  authorId: string;
  sourceLocator: [string, string];
};
