import { TestSessionStatus } from "../types/TestSessionTypes";

export const getSessionStatus = (
  startDate: string | Date,
  endDate: string | Date,
  now?: Date,
): TestSessionStatus => {
  const nowDate = now ?? new Date();
  if (new Date(endDate) < nowDate) return "past";
  if (new Date(startDate) > nowDate) return "upcoming";
  return "active";
};

export const getSessionTargetDate = (
  startDate: string | Date,
  endDate: string | Date,
  now?: Date,
): Date =>
  getSessionStatus(startDate, endDate, now) === "active"
    ? new Date(endDate)
    : new Date(startDate);
