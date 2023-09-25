export const enum TestSessionStatus {
  ACTIVE = "ACTIVE",
  UPCOMING = "UPCOMING",
  PAST = "PAST",
}

export const TEST_SESSION_STATUSES = [
  TestSessionStatus.ACTIVE,
  TestSessionStatus.UPCOMING,
  TestSessionStatus.PAST,
];

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
