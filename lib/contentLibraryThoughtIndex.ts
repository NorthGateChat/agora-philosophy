import {
  contentLibraryForThought,
  contentLibraryIds,
  type ContentLibraryMode,
} from "../content/libraries";
import {
  smartThoughtIndex,
  type SmartThoughtCandidate,
  type SmartThoughtContext,
} from "./smartThoughtIndex";

function normalizedRandom(random: () => number) {
  const value = random();
  return Number.isFinite(value)
    ? Math.min(Math.max(value, 0), 1 - Number.EPSILON)
    : 0;
}

/**
 * Selects a thought inside one collection, or first chooses an available
 * collection with equal probability in cross-collection mode. This prevents
 * larger catalogs from overwhelming smaller ones while preserving smart
 * anti-repetition and author/topic weighting within the chosen collection.
 */
export function contentLibraryThoughtIndex<T extends SmartThoughtCandidate>(
  candidates: readonly T[],
  mode: ContentLibraryMode,
  context: SmartThoughtContext = {},
) {
  if (mode !== "random" || candidates.length <= 1) {
    return smartThoughtIndex(candidates, context);
  }

  const random = context.random ?? Math.random;
  const selectableCandidates = context.currentId
    ? candidates.filter((candidate) => candidate.id !== context.currentId)
    : candidates;

  // The current thought must not keep an otherwise exhausted collection in
  // the draw. If another collection still has content, choose from that
  // collection instead of immediately repeating the lone current thought.
  if (selectableCandidates.length === 0) {
    return smartThoughtIndex(candidates, context);
  }

  const availableLibraries = [...contentLibraryIds, "custom" as const]
    .map((libraryId) => ({
      libraryId,
      candidates: candidates.filter(
        (candidate) => libraryId === "custom"
          ? candidate.id.startsWith("custom:")
          : contentLibraryForThought(candidate.id) === libraryId,
      ),
    }))
    .filter((entry) => entry.candidates.some(
      (candidate) => candidate.id !== context.currentId,
    ));

  if (availableLibraries.length <= 1) {
    return smartThoughtIndex(candidates, context);
  }

  const libraryIndex = Math.floor(normalizedRandom(random) * availableLibraries.length);
  const libraryCandidates = availableLibraries[libraryIndex].candidates;
  const localIndex = smartThoughtIndex(libraryCandidates, { ...context, random });
  const selectedId = libraryCandidates[localIndex]?.id;

  return Math.max(0, candidates.findIndex((candidate) => candidate.id === selectedId));
}
