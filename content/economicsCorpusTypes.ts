import type { Thought } from "./philosophy";

export type EconomicsTopic =
  | "市场"
  | "制度"
  | "增长"
  | "货币"
  | "行为"
  | "分配"
  | "投资";

export type EconomicsAuthorProfile = Pick<
  Thought,
  | "name"
  | "englishName"
  | "life"
  | "englishLife"
  | "school"
  | "englishSchool"
  | "palette"
>;

export type EconomicsThoughtSeed = Pick<
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
  | "presentationNature"
  | "editorialSummary"
  | "englishEditorialSummary"
  | "sourceLocator"
  | "context"
  | "englishContext"
  | "distinction"
  | "englishDistinction"
> & {
  authorId: string;
  topic: EconomicsTopic;
};

/**
 * Economic-thought cards are source-led study notes, not detached quotations.
 * A seed may carry either a verified source excerpt or an editorial synthesis;
 * every card carries a passage-level locator so readers can return to context.
 */
export function buildEconomicsThoughts(
  profiles: Readonly<Record<string, EconomicsAuthorProfile>>,
  seeds: readonly EconomicsThoughtSeed[],
): Thought[] {
  return seeds.map((seed) => {
    const profile = profiles[seed.authorId];
    if (!profile) {
      throw new Error(`Missing economics profile for ${seed.authorId}`);
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
