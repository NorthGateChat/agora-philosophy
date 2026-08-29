import type {
  ResolvedThoughtConnection,
  ResolvedThoughtLineage,
  ThoughtLineageView,
} from "./thoughtLineage";

export type ThoughtNeighborhoodNode = {
  entry: ResolvedThoughtConnection;
  slot: number;
  x: number;
  y: number;
};

export type ThoughtNeighborhood = {
  nodes: ThoughtNeighborhoodNode[];
  total: number;
};

const viewOrder: readonly ThoughtLineageView[] = [
  "upstream",
  "dialogue",
  "downstream",
];

// The first two slots preserve a left / top / right reading of origins,
// dialogue, and afterlives. Remaining slots let a dense single category fill
// the graph without introducing random or force-directed layout movement.
const preferredSlots: Record<ThoughtLineageView, readonly number[]> = {
  upstream: [5, 4, 0, 3, 1, 2],
  dialogue: [0, 3, 5, 1, 4, 2],
  downstream: [1, 2, 0, 3, 5, 4],
};

const slotCoordinates = [
  { x: 48, y: 22 },
  { x: 82, y: 30 },
  { x: 85, y: 70 },
  { x: 53, y: 78 },
  { x: 15, y: 69 },
  { x: 18, y: 31 },
] as const;

export const thoughtNeighborhoodLimit = slotCoordinates.length;

function orderThoughtNeighborhoodEntries(lineage: ResolvedThoughtLineage) {
  const ordered: ResolvedThoughtConnection[] = [];
  const selectedRelatedIds = new Set<string>();
  const cursors: Record<ThoughtLineageView, number> = {
    upstream: 0,
    dialogue: 0,
    downstream: 0,
  };

  while (true) {
    let foundInRound = false;

    for (const view of viewOrder) {
      const entries = lineage[view];
      while (cursors[view] < entries.length) {
        const entry = entries[cursors[view]];
        cursors[view] += 1;
        if (selectedRelatedIds.has(entry.related.id)) continue;

        ordered.push(entry);
        selectedRelatedIds.add(entry.related.id);
        foundInRound = true;
        break;
      }
    }

    if (!foundInRound) break;
  }

  return ordered;
}

/**
 * Build a deterministic one-hop neighborhood from the already-resolved
 * lineage. Related thoughts are de-duplicated for the graph. The page argument
 * keeps dense neighborhoods deterministic while allowing every relationship
 * to remain reachable through the compact graph itself.
 */
export function buildThoughtNeighborhood(
  lineage: ResolvedThoughtLineage,
  limit = thoughtNeighborhoodLimit,
  page = 0,
): ThoughtNeighborhood {
  const ordered = orderThoughtNeighborhoodEntries(lineage);
  const maxNodes = Math.max(0, Math.min(Math.trunc(limit), thoughtNeighborhoodLimit));
  const pageCount = maxNodes > 0 ? Math.ceil(ordered.length / maxNodes) : 0;
  const normalizedPage = pageCount > 0
    ? ((Math.trunc(page) % pageCount) + pageCount) % pageCount
    : 0;
  const pageStart = normalizedPage * maxNodes;
  const selected = maxNodes > 0
    ? ordered.slice(pageStart, pageStart + maxNodes)
    : [];

  const occupiedSlots = new Set<number>();
  const nodes = selected.map((entry) => {
    const slot = preferredSlots[entry.view].find((candidate) => !occupiedSlots.has(candidate))
      ?? slotCoordinates.findIndex((_, candidate) => !occupiedSlots.has(candidate));
    occupiedSlots.add(slot);
    const coordinates = slotCoordinates[slot];

    return {
      entry,
      slot,
      ...coordinates,
    };
  });

  return { nodes, total: ordered.length };
}

/** Return the zero-based graph page containing a relationship key. */
export function findThoughtNeighborhoodPage(
  lineage: ResolvedThoughtLineage,
  key: string | null,
  limit = thoughtNeighborhoodLimit,
) {
  const maxNodes = Math.max(0, Math.min(Math.trunc(limit), thoughtNeighborhoodLimit));
  if (!key || maxNodes === 0) return -1;

  const index = orderThoughtNeighborhoodEntries(lineage)
    .findIndex((entry) => entry.key === key);

  return index < 0 ? -1 : Math.floor(index / maxNodes);
}
