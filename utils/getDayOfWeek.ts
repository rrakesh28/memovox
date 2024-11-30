export function getDayOfWeek(day: number, month: number, year: number): string {
  const date = new Date(year, month, day);

  const days: string[] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const dayIndex: number = date.getDay();

  return days[dayIndex];
}
