export function getWeekNumberOfMonth(
  day: number,
  month: number,
  year: number
): number {
  const firstDayOfMonth = new Date(year, month - 1, 1);

  const firstDayWeekday = firstDayOfMonth.getDay();

  const offset = firstDayWeekday === 0 ? 0 : 7 - firstDayWeekday;

  return Math.ceil((day + offset) / 7);
}
