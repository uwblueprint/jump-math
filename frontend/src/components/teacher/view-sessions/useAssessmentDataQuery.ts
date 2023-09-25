import { useContext, useMemo } from "react";
import type { ApolloError } from "@apollo/client";
import { useQuery } from "@apollo/client";

import {
  GET_TEST_SESSION_STATUS_SUMMARY,
  GET_TEST_SESSIONS_BY_TEACHER_ID,
} from "../../../APIClients/queries/TestSessionQueries";
import type { TestSessionOverviewData } from "../../../APIClients/types/TestSessionClientTypes";
import AuthContext from "../../../contexts/AuthContext";
import type { TestSessionStatus } from "../../../types/TestSessionTypes";
import { getSessionTargetDate } from "../../../utils/TestSessionUtils";

export type FormattedAssessmentData = {
  testSessionId: string;
  testId: string;
  testName: string;
  classroomId: string;
  classroomName: string;
  startDate: Date;
  endDate: Date;
  // Target date is the start date of the session UNLESS the session is
  // active, in which case it is the end date
  targetDate: Date;
  status: TestSessionStatus;
  accessCode: string;
  notes?: string;
};

type AssessmentDataQueryResult = {
  loading: boolean;
  error?: ApolloError;
  data?: FormattedAssessmentData[];
  statusSummary?: Record<TestSessionStatus, number>;
};

const useAssessmentDataQuery = (limit?: number): AssessmentDataQueryResult => {
  const { authenticatedUser } = useContext(AuthContext);
  const { id: teacherId } = authenticatedUser ?? {};

  const {
    loading: dataLoading,
    error: dataError,
    data,
  } = useQuery<{
    testSessionsByTeacherId: TestSessionOverviewData[];
  }>(GET_TEST_SESSIONS_BY_TEACHER_ID, {
    fetchPolicy: "cache-and-network",
    variables: { teacherId, limit },
    skip: !teacherId,
  });

  const formattedData = useMemo(
    () =>
      data?.testSessionsByTeacherId?.map(
        ({ id, startDate, endDate, test, class: classroom, ...session }) => ({
          ...session,
          testSessionId: id,
          testId: test.id,
          testName: test.name,
          classroomId: classroom.id,
          classroomName: classroom.className,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          targetDate: getSessionTargetDate(startDate, endDate, session.status),
        }),
      ),
    [data],
  );

  const {
    loading: summaryLoading,
    error: summaryError,
    data: statusData,
  } = useQuery<{
    testSessionStatusSummary: { status: TestSessionStatus; count: number }[];
  }>(GET_TEST_SESSION_STATUS_SUMMARY, {
    fetchPolicy: "cache-and-network",
    variables: { teacherId },
    skip: !teacherId,
  });

  const statusSummary = useMemo(
    () =>
      statusData?.testSessionStatusSummary?.reduce(
        (acc, { status, count }) => ({ ...acc, [status]: count }),
        {} as Record<TestSessionStatus, number>,
      ),
    [statusData],
  );

  return {
    loading: dataLoading || summaryLoading,
    error: dataError || summaryError,
    data: formattedData,
    statusSummary,
  };
};

export default useAssessmentDataQuery;
