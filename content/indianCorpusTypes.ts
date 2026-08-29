import type { Thought } from "./philosophy";

export type IndianTopic =
  | "自我"
  | "认识"
  | "因果"
  | "解脱"
  | "伦理"
  | "辩证"
  | "政治";

export type IndianAuthorProfile = Pick<
  Thought,
  | "name"
  | "englishName"
  | "life"
  | "englishLife"
  | "school"
  | "englishSchool"
  | "palette"
>;

export type IndianThoughtSeed = Pick<
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
  topic: IndianTopic;
};

/**
 * Indian-philosophy cards are bilingual source-led study notes. A seed can
 * carry a verified excerpt from a rights-compatible historical translation or
 * an editorial synthesis; every card points back to a named text and passage.
 */
export function buildIndianThoughts(
  profiles: Readonly<Record<string, IndianAuthorProfile>>,
  seeds: readonly IndianThoughtSeed[],
): Thought[] {
  return seeds.map((seed) => {
    const profile = profiles[seed.authorId];
    if (!profile) {
      throw new Error(`Missing Indian-philosophy profile for ${seed.authorId}`);
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
