export type SmartThoughtCandidate = {
  id: string;
  authorId?: string;
  name: string;
  topic: string;
  editorialWeight?: number;
};

export type SmartThoughtContext = {
  currentId?: string;
  recentIds?: readonly string[];
  savedIds?: readonly string[];
  random?: () => number;
};

function normalizedRandom(random: () => number) {
  const value = random();
  return Number.isFinite(value)
    ? Math.min(Math.max(value, 0), 1 - Number.EPSILON)
    : 0;
}

function authorKey(item: SmartThoughtCandidate) {
  return item.authorId ?? item.id;
}

/**
 * Selects a fresh thought while keeping the result varied and still personal.
 * Recent items are removed whenever the remaining pool is large enough. A very
 * small preference boost is then applied to authors and topics represented in
 * the reader's saved thoughts; this never overrides the anti-repetition rules.
 * Inventory size is softened by a square-root author weight: a thinker with
 * more strong material can appear more often, but not in direct proportion to
 * the number of cards currently stored for that thinker.
 */
export function smartThoughtIndex<T extends SmartThoughtCandidate>(
  candidates: readonly T[],
  context: SmartThoughtContext = {},
) {
  if (candidates.length <= 1) return 0;

  const random = context.random ?? Math.random;
  const current = candidates.find((item) => item.id === context.currentId);
  const recentSet = new Set((context.recentIds ?? []).slice(-12));
  const savedSet = new Set(context.savedIds ?? []);
  const savedThoughts = candidates.filter((item) => savedSet.has(item.id));
  const recentThoughts = (context.recentIds ?? [])
    .slice(-4)
    .map((id) => candidates.find((item) => item.id === id))
    .filter((item): item is T => Boolean(item));
  const lastTwo = recentThoughts.slice(-2);
  const repeatedRecentAuthor = lastTwo.length === 2
    && authorKey(lastTwo[0]) === authorKey(lastTwo[1])
    ? authorKey(lastTwo[0])
    : null;
  const repeatedRecentTopic = lastTwo.length === 2 && lastTwo[0].topic === lastTwo[1].topic
    ? lastTwo[0].topic
    : null;
  const savedTopics = new Set(savedThoughts.map((item) => item.topic));
  const savedAuthors = new Set(savedThoughts.map(authorKey));
  const authorCardCounts = new Map<string, number>();
  for (const item of candidates) {
    const key = authorKey(item);
    authorCardCounts.set(key, (authorCardCounts.get(key) ?? 0) + 1);
  }

  let pool = candidates.filter((item) => item.id !== context.currentId && !recentSet.has(item.id));
  if (pool.length < Math.min(4, candidates.length - 1)) {
    pool = candidates.filter((item) => item.id !== context.currentId);
  }

  const weighted = pool.map((item) => {
    const itemAuthor = authorKey(item);
    const inventoryCount = authorCardCounts.get(itemAuthor) ?? 1;
    let weight = Math.max(0.05, item.editorialWeight ?? 1) / Math.sqrt(inventoryCount);
    if (current && itemAuthor === authorKey(current)) weight *= 0.18;
    if (current && item.topic === current.topic) weight *= 0.42;
    if (repeatedRecentAuthor && itemAuthor === repeatedRecentAuthor) weight *= 0.12;
    if (repeatedRecentTopic && item.topic === repeatedRecentTopic) weight *= 0.28;
    if (savedTopics.has(item.topic)) weight *= 1.16;
    if (savedAuthors.has(itemAuthor)) weight *= 1.08;
    return { item, weight };
  });
  const total = weighted.reduce((sum, entry) => sum + entry.weight, 0);
  let cursor = normalizedRandom(random) * total;
  const selected = weighted.find((entry) => {
    cursor -= entry.weight;
    return cursor < 0;
  })?.item ?? weighted[weighted.length - 1]?.item;

  return Math.max(0, candidates.findIndex((item) => item.id === selected?.id));
}
