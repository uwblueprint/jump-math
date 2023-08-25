export const enum TestSessionStatus {
  PAST = "PAST",
  UPCOMING = "UPCOMING",
  ACTIVE = "ACTIVE",
}

export const getSessionStatus = (
  startDate: string | Date,
  endDate: string | Date,
  now?: Date,
): TestSessionStatus => {
  const nowDate = now ?? new Date();
  if (new Date(endDate) < nowDate) return TestSessionStatus.PAST;
  if (new Date(startDate) > nowDate) return TestSessionStatus.UPCOMING;
  return TestSessionStatus.ACTIVE;
};
