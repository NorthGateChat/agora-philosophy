import type { ContentLibraryId } from "./libraries";
import type { ResolvedInterpretation } from "./interpretation";
import type { ThoughtIllustration } from "./illustrations";
import type { Thought } from "./philosophy";
import type { BilingualSourceLabel, SourceMetadata } from "./sourceMetadata";

export type SourceCredibilityLabels = {
  reviewStatus: BilingualSourceLabel;
  textNature: BilingualSourceLabel;
  translationNature: BilingualSourceLabel;
  verificationStatus: BilingualSourceLabel;
  scopeNote: BilingualSourceLabel;
};

export type ThoughtDepth = {
  sourceMetadata: SourceMetadata;
  sourceCredibility: SourceCredibilityLabels;
  interpretation: ResolvedInterpretation;
  illustration?: ThoughtIllustration;
};

/**
 * Illustration loading is deliberately independent from the heavier reading
 * bundle. Sharing can therefore keep working without waiting for source notes
 * or long-form interpretation chunks, and can fall back to a text-only card.
 */
export async function loadThoughtIllustration(
  thoughtId: string,
): Promise<ThoughtIllustration | undefined> {
  const { illustrationForThought } = await import("./illustrations");
  return illustrationForThought(thoughtId);
}

/**
 * Loads material that is only needed after a reader opens a thought's depth view.
 * Every runtime dependency stays behind a dynamic-import boundary so importing this
 * small coordinator never pulls the source archive, illustrations, or editorial
 * interpretation catalog into the initial screen.
 */
export async function loadThoughtDepth(
  thought: Thought,
  libraryId: ContentLibraryId,
): Promise<ThoughtDepth> {
  const detailPromise = import("./interpretationDetailLoader")
    .then(({ loadInterpretationDetailForThought }) => (
      loadInterpretationDetailForThought(thought.id, libraryId)
    ));

  const [
    { sourceCredibilityLabelsFor, sourceMetadataForThought },
    { interpretationForThought },
    bespoke,
  ] = await Promise.all([
    import("./sourceMetadata"),
    import("./interpretation"),
    detailPromise.catch(() => undefined),
  ]);

  const sourceMetadata = sourceMetadataForThought(thought);
  const illustration = await loadThoughtIllustration(thought.id).catch(() => undefined);
  return {
    sourceMetadata,
    sourceCredibility: sourceCredibilityLabelsFor(sourceMetadata),
    interpretation: interpretationForThought(
      thought,
      sourceMetadata,
      libraryId,
      bespoke,
    ),
    illustration,
  };
}
