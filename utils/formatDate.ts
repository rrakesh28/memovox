export const formatDate = (
  isoString: string,
  type: "short" | "long" = "short"
) => {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: type,
    weekday: type,
  }).format(date);
};
