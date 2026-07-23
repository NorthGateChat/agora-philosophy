import { createRoot } from "react-dom/client";
import { PhilosophyMoment } from "../app/PhilosophyMoment";
import "../app/globals.css";
import brand from "../brand.json";
import {
  contentLibraries,
  contentLibraryStorageKey,
  isContentLibraryId,
  type ContentLibraryId,
} from "../content/libraries";
import { nextRandomThoughtIndex } from "../lib/randomThoughtIndex";

const lastThoughtIndexKey = "agora-last-new-tab-thought-index";

function freshContentSelection(): { library: ContentLibraryId; index: number } {
  let library: ContentLibraryId = "western";
  let previousIndex: number | null = null;

  try {
    const storedLibrary = window.localStorage.getItem(contentLibraryStorageKey);
    if (isContentLibraryId(storedLibrary)) library = storedLibrary;

    const storedIndex = window.localStorage.getItem(`${lastThoughtIndexKey}-${library}`);
    const parsedIndex = storedIndex === null ? Number.NaN : Number(storedIndex);

    if (Number.isInteger(parsedIndex)) previousIndex = parsedIndex;
  } catch {
    // A fresh thought still works when browser storage is unavailable.
  }

  const nextIndex = nextRandomThoughtIndex(contentLibraries[library].thoughts.length, previousIndex);

  try {
    window.localStorage.setItem(`${lastThoughtIndexKey}-${library}`, String(nextIndex));
  } catch {
    // Storage is only used to avoid an immediate repeat between new tabs.
  }

  return { library, index: nextIndex };
}

document.title = brand.storeNameZhHans;

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
