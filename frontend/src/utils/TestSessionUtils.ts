import type { TestSessionStatus } from "../types/TestSessionTypes";

import { includesIgnoreCase } from "./GeneralUtils";

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

type SearchableTestSession = {
  testName: string;
  status: TestSessionStatus;
};

export const filterTestSessionsBySearch = <T extends SearchableTestSession>(
  sessions: T[],
  search: string,
): T[] =>
  search
    ? sessions.filter(
        (session: SearchableTestSession) =>
          includesIgnoreCase(session.testName, search) ||
          includesIgnoreCase(session.status, search),
      )
    : sessions;

export const generateAccessCode = () => {
  const minm = 100000;
  const maxm = 999999;
  return String(Math.floor(Math.random() * (maxm - minm + 1)) + minm);
};
