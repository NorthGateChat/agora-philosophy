import { retiredEconomicsThoughtIds } from "./economicsCuration2026";
import { indianCurationRemovedIds } from "./indianCuration2026";
import { retiredMaoThoughtIds } from "./maoCuration2026";
import { westernRetiredThoughtIds } from "./philosophyStructuralExpansion";
import { psychologyCurationRemovedIds } from "./psychologyCuration2026";
import { retiredScienceThoughtIds } from "./scienceCuration2026";

/**
 * IDs preserved in their historical source modules but removed from the live
 * catalog by the 2026-08-30 structural curation pass. Shared registries use
 * this one set so source, emphasis, illustration, and reading-unit cleanup
 * cannot drift apart.
 */
export const curation2026RetiredThoughtIds = new Set<string>([
  ...westernRetiredThoughtIds,
  ...retiredEconomicsThoughtIds,
  ...retiredMaoThoughtIds,
  ...retiredScienceThoughtIds,
  ...psychologyCurationRemovedIds,
  ...indianCurationRemovedIds,
]);
