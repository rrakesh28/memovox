export function getWeekDateRange(year: number, month: number, weekNumber: number) {
    const firstDayOfMonth = new Date(year, month, 1);

    const firstDayWeekday = firstDayOfMonth.getDay();

    const startDay = (weekNumber - 1) * 7 - firstDayWeekday + 1;

    const startDate = new Date(year, month - 1, startDay);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);

    return { startDate, endDate };
}