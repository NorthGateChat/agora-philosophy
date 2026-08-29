import { createRoot } from "react-dom/client";
import { PhilosophyMoment } from "../app/PhilosophyMoment";
import "../app/globals.css";
import brand from "../brand.json";
import {
  contentLibraryStorageKey,
  isContentLibraryMode,
  thoughtsForContentLibraryMode,
  type ContentLibraryMode,
} from "../content/libraries";
import {
  economicsThoughtGroups,
  isEconomicsCollectionId,
  type EconomicsCollectionId,
} from "../content/economics";
import {
  isPsychologyCollectionId,
  psychologyThoughtGroups,
  type PsychologyCollectionId,
} from "../content/psychology";
import { contentLibraryThoughtIndex } from "../lib/contentLibraryThoughtIndex";

const lastThoughtIdKey = "agora-last-new-tab-thought-id";
const legacyLastThoughtIndexKey = "agora-last-new-tab-thought-index";
const economicsCollectionStorageKey = "agora-economics-collection";
const psychologyCollectionStorageKey = "agora-psychology-collection";

function freshContentSelection(): { library: ContentLibraryMode; index: number } {
  let library: ContentLibraryMode = "western";
  let previousId: string | null = null;
  let legacyPreviousIndex: number | null = null;
  let recentIds: string[] = [];
  let savedIds: string[] = [];
  let blockedIds: string[] = [];
  let economicsCollection: EconomicsCollectionId = "principles";
  let psychologyCollection: PsychologyCollectionId = "foundations";

  try {
    const storedLibrary = window.localStorage.getItem(contentLibraryStorageKey);
    if (isContentLibraryMode(storedLibrary)) library = storedLibrary;

    const storedEconomicsCollection = window.localStorage.getItem(
      economicsCollectionStorageKey,
    );
    if (isEconomicsCollectionId(storedEconomicsCollection)) {
      economicsCollection = storedEconomicsCollection;
    }

    const storedPsychologyCollection = window.localStorage.getItem(
      psychologyCollectionStorageKey,
    );
    if (isPsychologyCollectionId(storedPsychologyCollection)) {
      psychologyCollection = storedPsychologyCollection;
    }

    previousId = window.localStorage.getItem(`${lastThoughtIdKey}-${library}`);
    const storedIndex = window.localStorage.getItem(`${legacyLastThoughtIndexKey}-${library}`);
    const parsedIndex = storedIndex === null ? Number.NaN : Number(storedIndex);

    if (Number.isInteger(parsedIndex)) legacyPreviousIndex = parsedIndex;

    const storedRecent = JSON.parse(window.localStorage.getItem("agora-recent") ?? "[]");
    const storedSaved = JSON.parse(window.localStorage.getItem("agora-saved") ?? "[]");
    const storedBlocked = JSON.parse(window.localStorage.getItem("agora-blocked") ?? "[]");
    if (Array.isArray(storedRecent)) {
      recentIds = storedRecent.filter((item): item is string => typeof item === "string");
    }
    if (Array.isArray(storedSaved)) {
      savedIds = storedSaved.filter((item): item is string => typeof item === "string");
    }
    if (Array.isArray(storedBlocked)) {
      blockedIds = storedBlocked.filter((item): item is string => typeof item === "string");
    }
  } catch {
    // A fresh thought still works when browser storage is unavailable.
  }

  const libraryThoughts = thoughtsForContentLibraryMode(library);
  const scopedThoughts = library === "economics"
    ? economicsThoughtGroups[economicsCollection]
    : library === "psychology"
      ? psychologyThoughtGroups[psychologyCollection]
      : libraryThoughts;
  const selectableThoughts = scopedThoughts.filter((thought) => !blockedIds.includes(thought.id));
  const candidates = selectableThoughts.length > 0 ? selectableThoughts : scopedThoughts;
  const previousThoughtId = previousId
    ?? (legacyPreviousIndex === null ? undefined : libraryThoughts[legacyPreviousIndex]?.id);
  const candidateIndex = contentLibraryThoughtIndex(candidates, library, {
    currentId: previousThoughtId,
    recentIds,
    savedIds,
  });
  const selectedThought = candidates[candidateIndex] ?? scopedThoughts[0];
  const nextIndex = Math.max(
    0,
    libraryThoughts.findIndex((thought) => thought.id === selectedThought?.id),
  );

  try {
    if (selectedThought) {
      window.localStorage.setItem(`${lastThoughtIdKey}-${library}`, selectedThought.id);
    }
  } catch {
    // Storage is only used to avoid an immediate repeat between new tabs.
  }

  return { library, index: nextIndex };
}

function localizedExtensionTitle() {
  let preferredLanguage: string | null = null;
  try {
    preferredLanguage = window.localStorage.getItem("agora-language-mode");
  } catch {
    // Browser locale remains a safe fallback when storage is unavailable.
  }

  if (preferredLanguage === "en") return brand.storeNameEn;
  if (preferredLanguage === "zh-hant") return brand.storeNameZhHant;
  if (preferredLanguage === "zh-hans") return brand.storeNameZhHans;

  const locale = window.navigator.language.trim().toLowerCase();
  if (!locale.startsWith("zh")) return brand.storeNameEn;
  return locale.startsWith("zh-hant") || /^zh-(tw|hk|mo)(?:-|$)/.test(locale)
    ? brand.storeNameZhHant
    : brand.storeNameZhHans;
}

document.title = localizedExtensionTitle();

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Missing extension root element");
}

const initialContent = freshContentSelection();

createRoot(rootElement).render(
  <PhilosophyMoment
    initialLibrary={initialContent.library}
    initialIndex={initialContent.index}
  />,
);
