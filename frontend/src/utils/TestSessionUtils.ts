import { TestSessionStatus } from "../types/TestSessionTypes";

import { includesIgnoreCase } from "./GeneralUtils";

export const getSessionTargetDate = (
  startDate: string | Date,
  endDate: string | Date,
  status: TestSessionStatus,
): Date =>
  status === TestSessionStatus.ACTIVE ? new Date(endDate) : new Date(startDate);

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

export const getCountFromStatusSummary = (
  statusSummary: Record<TestSessionStatus, number>,
  status: TestSessionStatus,
  limit: number,
): string =>
  statusSummary[status] >= limit
    ? `${limit - 1}+`
    : statusSummary[status].toString();
