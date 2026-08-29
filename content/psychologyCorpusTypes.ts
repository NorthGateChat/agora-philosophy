import type { Thought } from "./philosophy";

export type PsychologyTopic =
  | "感知"
  | "记忆"
  | "学习"
  | "决策"
  | "情绪"
  | "动机"
  | "人格"
  | "自我"
  | "关系"
  | "群体"
  | "发展"
  | "行为";

export type PsychologyAuthorProfile = Pick<
  Thought,
  | "name"
  | "englishName"
  | "life"
  | "englishLife"
  | "school"
  | "englishSchool"
  | "palette"
>;

export type PsychologyThoughtSeed = Pick<
  Thought,
  | "id"
  | "text"
  | "english"
  | "work"
  | "englishWork"
  | "reflection"
  | "englishReflection"
  | "question"
  | "englishQuestion"
  | "editorialSummary"
  | "englishEditorialSummary"
  | "presentationNature"
  | "sourceLocator"
  | "context"
  | "englishContext"
  | "distinction"
  | "englishDistinction"
> & {
  authorId: string;
  topic: PsychologyTopic;
};

/**
 * Psychology cards are bilingual study notes anchored to a named source. A
 * seed may carry either a verified source excerpt or an editorial synthesis,
 * with the rendering mode reflecting that distinction.
 */
export function buildPsychologyThoughts(
  profiles: Readonly<Record<string, PsychologyAuthorProfile>>,
  seeds: readonly PsychologyThoughtSeed[],
): Thought[] {
  return seeds.map((seed) => {
    const profile = profiles[seed.authorId];
    if (!profile) {
      throw new Error(`Missing psychology profile for ${seed.authorId}`);
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
