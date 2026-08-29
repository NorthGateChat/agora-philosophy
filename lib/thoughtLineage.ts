import type {
  ConnectionKind,
  Thought,
  ThoughtLevelConnection,
} from "../content/philosophy";

export type ThoughtLineageView = "upstream" | "dialogue" | "downstream";

export type ResolvedThoughtConnection = {
  connection: ThoughtLevelConnection;
  related: Thought;
  view: ThoughtLineageView;
  key: string;
};

export type ResolvedThoughtLineage = Record<
  ThoughtLineageView,
  ResolvedThoughtConnection[]
>;

const dialogueKinds: ReadonlySet<ConnectionKind> = new Set([
  "dialogues",
  "resonates",
  "contrasts",
]);

const emptyBlockedThoughtIds: ReadonlySet<string> = new Set();

/**
 * Resolve the lineage for one exact thought-card ID.
 *
 * This intentionally knows nothing about authors, keywords, or representative
 * cards. A card participates only when its own ID is an explicit endpoint.
 */
export function resolveThoughtLineage(
  thoughtId: string,
  connections: readonly ThoughtLevelConnection[],
  thoughtById: ReadonlyMap<string, Thought>,
  blockedThoughtIds: ReadonlySet<string> = emptyBlockedThoughtIds,
): ResolvedThoughtLineage {
  const resolved: ResolvedThoughtLineage = {
    upstream: [],
    dialogue: [],
    downstream: [],
  };

  for (const connection of connections) {
    if (connection.scope !== "thought") continue;

    const sourceMatches = connection.source === thoughtId;
    const targetMatches = connection.target === thoughtId;
    if (!sourceMatches && !targetMatches) continue;

    let view: ThoughtLineageView;
    let relatedId: string;

    if (dialogueKinds.has(connection.kind)) {
      view = "dialogue";
      relatedId = sourceMatches ? connection.target : connection.source;
    } else if (targetMatches) {
      view = "upstream";
      relatedId = connection.source;
    } else {
      view = "downstream";
      relatedId = connection.target;
    }

    const related = thoughtById.get(relatedId);
    if (!related || blockedThoughtIds.has(related.id)) continue;

    resolved[view].push({
      connection,
      related,
      view,
      key: connection.id,
    });
  }

  return resolved;
}
