export const getNumberOfWeeksInMonth = (year: number, month: number) => {
  const nextMonth = new Date(year, month);
  nextMonth.setDate(0);
  const daysInMonth = nextMonth.getDate();
  return Math.ceil(daysInMonth / 7);
};
