const DEFAULT_THOUGHT_COUNT = 27;

export function dailyThoughtIndex(
  date = new Date(),
  thoughtCount = DEFAULT_THOUGHT_COUNT,
) {
  const parts = new Intl.DateTimeFormat("en", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  const year = Number(values.year);
  const month = Number(values.month);
  const day = Number(values.day);
  return (year * 372 + month * 31 + day) % thoughtCount;
}
