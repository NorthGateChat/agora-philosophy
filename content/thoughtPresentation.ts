import type { Thought, ThoughtPresentationNature } from "./philosophy";

export type ThoughtAttributionMode = "direct" | "based-on" | "unverified";

export type ThoughtPresentationLabel = Readonly<{
  zh: string;
  en: string;
}>;

export const thoughtPresentationNatureLabels: Readonly<
  Record<ThoughtPresentationNature, ThoughtPresentationLabel>
> = {
  "source-excerpt": {
    zh: "原文节选",
    en: "Source excerpt",
  },
  "editorial-synthesis": {
    zh: "命题整理",
    en: "Editorial synthesis",
  },
  "unverified-excerpt": {
    zh: "待核摘录",
    en: "Unverified excerpt",
  },
};

export const useQuotationMarks: Readonly<
  Record<ThoughtPresentationNature, boolean>
> = {
  "source-excerpt": true,
  "editorial-synthesis": false,
  "unverified-excerpt": false,
};

export const attributionMode: Readonly<
  Record<ThoughtPresentationNature, ThoughtAttributionMode>
> = {
  "source-excerpt": "direct",
  "editorial-synthesis": "based-on",
  "unverified-excerpt": "unverified",
};

export type ThoughtPresentation = Readonly<{
  nature: ThoughtPresentationNature;
  useQuotationMarks: boolean;
  attributionMode: ThoughtAttributionMode;
  label: ThoughtPresentationLabel;
}>;

type ThoughtPresentationInput = Pick<
  Thought,
  "presentationNature" | "rendering" | "customKnowledge"
>;

/**
 * Resolves legacy cards and newly imported cards into the public three-state
 * presentation model. Explicit metadata always wins over compatibility hints.
 */
export function resolveThoughtPresentationNature(
  thought: ThoughtPresentationInput,
): ThoughtPresentationNature {
  if (thought.presentationNature) {
    return thought.presentationNature;
  }

  if (thought.customKnowledge) {
    if (thought.customKnowledge.cardType !== "quote") {
      return "editorial-synthesis";
    }

    return thought.customKnowledge.sourceStatus === "verified"
      ? "source-excerpt"
      : "unverified-excerpt";
  }

  return thought.rendering === "short-quote"
    ? "source-excerpt"
    : "editorial-synthesis";
}

export function resolveThoughtPresentation(
  thought: ThoughtPresentationInput,
): ThoughtPresentation {
  const nature = resolveThoughtPresentationNature(thought);
  return {
    nature,
    useQuotationMarks: useQuotationMarks[nature],
    attributionMode: attributionMode[nature],
    label: thoughtPresentationNatureLabels[nature],
  };
}
