import type { Thought } from "./philosophy";

export type ScienceTopic =
  | "方法"
  | "证据"
  | "模型"
  | "不确定"
  | "生命"
  | "宇宙"
  | "责任";

export type ScienceAuthorProfile = Pick<
  Thought,
  | "name"
  | "englishName"
  | "life"
  | "englishLife"
  | "school"
  | "englishSchool"
  | "palette"
>;

export type ScienceThoughtSeed = Pick<
  Thought,
  | "id"
  | "text"
  | "english"
  | "editorialSummary"
  | "englishEditorialSummary"
  | "work"
  | "englishWork"
  | "reflection"
  | "englishReflection"
  | "question"
  | "englishQuestion"
  | "presentationNature"
  | "sourceLocator"
  | "context"
  | "englishContext"
  | "distinction"
  | "englishDistinction"
> & {
  authorId: string;
  topic: ScienceTopic;
};

/**
 * Science cards are source-led study notes rather than free-floating quotes.
 * A seed may carry either a verified source excerpt or an editorial synthesis;
 * every card identifies a passage-level source in the public catalog.
 */
export function buildScienceThoughts(
  profiles: Readonly<Record<string, ScienceAuthorProfile>>,
  seeds: readonly ScienceThoughtSeed[],
): Thought[] {
  return seeds.map((seed) => {
    const profile = profiles[seed.authorId];
    if (!profile) {
      throw new Error(`Missing science profile for ${seed.authorId}`);
    }

    return {
      ...profile,
      ...seed,
      rendering:
        seed.presentationNature === "source-excerpt"
          ? "short-quote"
          : "paraphrase",
    };
  });
}
