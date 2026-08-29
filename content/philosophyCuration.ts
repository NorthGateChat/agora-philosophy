import type { Thought } from "./philosophy";

/**
 * Editorial targets for the original 27-author archive.
 *
 * These numbers are deliberately uneven. They reflect the amount of
 * source-verifiable material that is useful in a short-card format, not a
 * ranking of philosophers. Authors added by later canon modules do not need
 * to appear here: this is a curation layer for the legacy archive, not a
 * closed list of who belongs in the library.
 */
export const legacyAuthorTargetCounts = {
  socrates: 12,
  plato: 17,
  aristotle: 17,
  epicurus: 17,
  epictetus: 17,
  augustine: 15,
  descartes: 15,
  spinoza: 15,
  locke: 17,
  hume: 17,
  rousseau: 15,
  kant: 17,
  hegel: 17,
  kierkegaard: 15,
  marx: 17,
  nietzsche: 17,
  husserl: 15,
  heidegger: 15,
  wittgenstein: 17,
  arendt: 15,
  sartre: 12,
  beauvoir: 10,
  camus: 8,
  foucault: 15,
  rawls: 15,
  derrida: 11,
  nussbaum: 9,
} as const satisfies Record<string, number>;

// Keep superseded restatements in the archive without letting them displace a
// source-checked card from the same author's fixed public allocation. Deferred
// cards remain eligible if an author would otherwise fall short of its target.
const legacyDeferredCardIds = new Set([
  "rousseau-born-free",
  "rousseau-general-will",
]);

export function thoughtAuthorId(thought: Pick<Thought, "id" | "authorId">) {
  return thought.authorId ?? thought.id;
}

function selectWorkDiverseCards(
  authorId: string,
  cards: readonly Thought[],
  targetCount: number,
) {
  if (cards.length < targetCount) {
    throw new Error(
      `Legacy curation target for ${authorId} is ${targetCount}, but only ${cards.length} cards exist.`,
    );
  }

  const profile = cards.find((card) => card.id === authorId);
  if (!profile) throw new Error(`Missing profile card for legacy author: ${authorId}`);

  const selectedIds = new Set([profile.id]);
  const workBuckets = new Map<string, Thought[]>();
  for (const card of cards) {
    if (card.id === profile.id) continue;
    const workKey = `${card.englishWork}\u0000${card.work}`;
    const bucket = workBuckets.get(workKey) ?? [];
    bucket.push(card);
    workBuckets.set(workKey, bucket);
  }

  // Take one card from each work before taking a second from the same work.
  // This keeps a smaller allocation representative rather than merely early.
  while (selectedIds.size < targetCount) {
    let addedThisRound = false;
    for (const bucket of workBuckets.values()) {
      const next = bucket.shift();
      if (!next) continue;
      selectedIds.add(next.id);
      addedThisRound = true;
      if (selectedIds.size === targetCount) break;
    }
    if (!addedThisRound) break;
  }

  if (selectedIds.size !== targetCount) {
    throw new Error(`Could not satisfy legacy curation target for ${authorId}.`);
  }
  return selectedIds;
}

export function curateLegacyThoughts(archive: readonly Thought[]) {
  const cardsByAuthor = new Map<string, Thought[]>();
  for (const thought of archive) {
    const authorId = thoughtAuthorId(thought);
    const cards = cardsByAuthor.get(authorId) ?? [];
    cards.push(thought);
    cardsByAuthor.set(authorId, cards);
  }

  const selectedIds = new Set<string>();
  for (const [authorId, cards] of cardsByAuthor) {
    const target = legacyAuthorTargetCounts[
      authorId as keyof typeof legacyAuthorTargetCounts
    ];

    // An author absent from this legacy-only table is kept in full. Expansion
    // therefore remains open and never requires joining a global whitelist.
    if (target === undefined) {
      for (const card of cards) selectedIds.add(card.id);
      continue;
    }

    const preferredCards = cards.filter((card) => !legacyDeferredCardIds.has(card.id));
    const deferredCards = cards.filter((card) => legacyDeferredCardIds.has(card.id));
    const curationCandidates = preferredCards.length >= target
      ? preferredCards
      : [...preferredCards, ...deferredCards];

    for (const id of selectWorkDiverseCards(authorId, curationCandidates, target)) {
      selectedIds.add(id);
    }
  }

  return archive.filter((thought) => selectedIds.has(thought.id));
}
