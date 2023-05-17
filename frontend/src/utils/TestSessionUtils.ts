import { TestSessionStatus } from "../types/TestSessionTypes";

export const getSessionStatus = (
  startDate: Date,
  endDate: Date,
  now?: Date,
): TestSessionStatus => {
  const nowDate = now ?? new Date();
  if (endDate < nowDate) return "past";
  if (startDate > nowDate) return "upcoming";
  return "active";
};

export const getSessionTargetDate = (
  startDate: Date,
  endDate: Date,
  now?: Date,
): Date => {
  const status = getSessionStatus(startDate, endDate, now);
  return status === "active" ? endDate : startDate;
};
