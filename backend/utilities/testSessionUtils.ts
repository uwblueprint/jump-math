export type TestSessionStatus = "PAST" | "UPCOMING" | "ACTIVE";

export const getSessionStatus = (
  startDate: string | Date,
  endDate: string | Date,
  now?: Date,
): TestSessionStatus => {
  const nowDate = now ?? new Date();
  if (new Date(endDate) < nowDate) return "PAST";
  if (new Date(startDate) > nowDate) return "UPCOMING";
  return "ACTIVE";
};
