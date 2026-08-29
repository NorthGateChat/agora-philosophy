export function dailyThoughtIndex(
  thoughtCount: number,
  date = new Date(),
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
  const count = Math.max(1, Math.trunc(thoughtCount));
  return (year * 372 + month * 31 + day) % count;
}
