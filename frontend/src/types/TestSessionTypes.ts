export const STATUSES = ["ACTIVE", "UPCOMING", "PAST"] as const;
export type TestSessionStatus = (typeof STATUSES)[number];

export type TestSessionItemStats = {
  mean: number;
  median: number;
  completionRate: number;
  submissions: number;
};
