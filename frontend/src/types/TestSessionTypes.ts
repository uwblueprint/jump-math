export const enum TestSessionStatus {
  ACTIVE = "ACTIVE",
  UPCOMING = "UPCOMING",
  PAST = "PAST",
}
export const TEST_SESSION_STATUSES = [
  TestSessionStatus.ACTIVE,
  TestSessionStatus.UPCOMING,
  TestSessionStatus.PAST,
] as const;

export type TestSessionItemStats = {
  mean: number;
  median: number;
  completionRate: number;
  submissions: number;
};
