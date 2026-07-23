export function nextRandomThoughtIndex(
  thoughtCount: number,
  previousIndex: number | null = null,
  random: () => number = Math.random,
) {
  const count = Math.max(0, Math.trunc(thoughtCount));

  if (count <= 1) return 0;

  const rawRandom = random();
  const normalizedRandom = Number.isFinite(rawRandom)
    ? Math.min(Math.max(rawRandom, 0), 1 - Number.EPSILON)
    : 0;
  const normalizedPrevious =
    previousIndex !== null &&
    Number.isInteger(previousIndex) &&
    previousIndex >= 0 &&
    previousIndex < count
      ? previousIndex
      : null;

  if (normalizedPrevious === null) {
    return Math.floor(normalizedRandom * count);
  }

  const candidate = Math.floor(normalizedRandom * (count - 1));
  return candidate >= normalizedPrevious ? candidate + 1 : candidate;
}
