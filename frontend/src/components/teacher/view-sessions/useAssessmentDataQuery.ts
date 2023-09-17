import { useContext, useMemo } from "react";
import { useQuery } from "@apollo/client";

import { GET_TEST_SESSIONS_BY_TEACHER_ID } from "../../../APIClients/queries/TestSessionQueries";
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
};

type AssessmentDataQueryResult = {
  loading: boolean;
  error?: Error;
  data?: FormattedAssessmentData[];
};

const useAssessmentDataQuery = (limit?: number): AssessmentDataQueryResult => {
  const { authenticatedUser } = useContext(AuthContext);
  const { id: teacherId } = authenticatedUser ?? {};

  const { loading, error, data } = useQuery<{
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

  return {
    loading,
    error,
    data: formattedData,
  };
};

export default useAssessmentDataQuery;
