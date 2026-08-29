import type { ContentLibraryId } from "./libraries";
import type { InterpretationDetail } from "./interpretationTypes";

type InterpretationDetailRegistry = Readonly<Record<string, InterpretationDetail>>;
type InterpretationDetailChunk =
  | "west-chinese"
  | "mao-science"
  | "indian"
  | "economics"
  | "psychology";

const detailChunkLoaders: Record<
  InterpretationDetailChunk,
  () => Promise<InterpretationDetailRegistry>
> = {
  "west-chinese": () => import("./interpretationDetailsWestChinese")
    .then((module) => module.westChineseInterpretationDetails),
  "mao-science": () => import("./interpretationDetailsMaoScience")
    .then((module) => module.maoScienceInterpretationDetails),
  indian: () => import("./interpretationDetailsIndian")
    .then((module) => module.indianInterpretationDetails),
  economics: () => import("./interpretationDetailsEconomics")
    .then((module) => module.economicsInterpretationDetails),
  psychology: () => import("./interpretationDetailsPsychology")
    .then((module) => module.psychologyInterpretationDetails),
};

const loadedDetailChunks: Partial<
  Record<InterpretationDetailChunk, Promise<InterpretationDetailRegistry>>
> = {};

function detailChunkForLibrary(
  libraryId: ContentLibraryId,
): InterpretationDetailChunk {
  if (libraryId === "western" || libraryId === "chinese") {
    return "west-chinese";
  }
  if (libraryId === "mao" || libraryId === "science") {
    return "mao-science";
  }
  if (libraryId === "indian") {
    return "indian";
  }
  if (libraryId === "psychology") {
    return "psychology";
  }
  return "economics";
}

export function loadInterpretationDetailsForLibrary(
  libraryId: ContentLibraryId,
): Promise<InterpretationDetailRegistry> {
  const chunk = detailChunkForLibrary(libraryId);
  const cached = loadedDetailChunks[chunk];
  if (cached) {
    return cached;
  }

  const pending = detailChunkLoaders[chunk]();
  loadedDetailChunks[chunk] = pending;
  void pending.catch(() => {
    if (loadedDetailChunks[chunk] === pending) {
      delete loadedDetailChunks[chunk];
    }
  });
  return pending;
}

export async function loadInterpretationDetailForThought(
  thoughtId: string,
  libraryId: ContentLibraryId,
): Promise<InterpretationDetail | undefined> {
  const details = await loadInterpretationDetailsForLibrary(libraryId);
  return details[thoughtId];
}
