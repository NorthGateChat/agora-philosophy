import type { ContentLibraryId } from "./libraries";
import type {
  VerifiedSourceOriginalField,
  VerifiedSourceUseBasis,
} from "./verifiedSourcePassages";

export type ReadingUnitAvailability =
  | "integrated-candidate"
  | "source-route";

export type ReadingUnitBilingualText = Readonly<{
  zh: string;
  en: string;
}>;

export type ReadingUnitSourceLink = Readonly<{
  url: string;
  label: string;
  englishLabel: string;
}>;

export type ReadingUnitSourceSegment = Readonly<{
  /** One complete natural division; segment order is reading order. */
  url: string;
  startHeading?: string;
  startPattern?: string;
  endPattern?: string;
}>;

export type ReadingUnitThoughtRoute = Readonly<{
  unitId: string;
  locator: ReadingUnitBilingualText;
  originalField: VerifiedSourceOriginalField;
  useBasis: VerifiedSourceUseBasis["kind"];
}>;

export type ReadingUnitInventoryEntry = Readonly<{
  id: string;
  work: ReadingUnitBilingualText;
  libraryIds: readonly ContentLibraryId[];
  availability: ReadingUnitAvailability;
  /** A stable, machine-derived boundary such as `chapter-4` or `whole-work`. */
  locator: Readonly<{
    structureKey: string;
    zh: string;
    en: string;
  }>;
  source: Readonly<{
    url: string;
    label: string;
    englishLabel: string;
    additionalLinks: readonly ReadingUnitSourceLink[];
    /** Present only when one verified excerpt crosses multiple natural divisions. */
    segments?: readonly ReadingUnitSourceSegment[];
  }>;
  edition: ReadingUnitBilingualText;
  useBasisKinds: readonly VerifiedSourceUseBasis["kind"][];
  thoughtIds: readonly string[];
  expectedUnitFile: Readonly<{
    publicPath: string;
    href: string;
  }>;
}>;

/**
 * The compact route table shipped with the reader. It contains no source text:
 * reading-unit bodies are separate, lazily loaded files.
 */
export type ReadingUnitIndex = Readonly<{
  schemaVersion: 1;
  generatedOn: string;
  catalogThoughtCount: number;
  verifiedThoughtCount: number;
  unitCount: number;
  thoughtMap: Readonly<Record<string, ReadingUnitThoughtRoute>>;
  units: readonly ReadingUnitInventoryEntry[];
}>;
