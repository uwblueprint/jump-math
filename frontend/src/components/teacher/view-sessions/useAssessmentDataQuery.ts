import { useContext, useMemo } from "react";
import { useQuery } from "@apollo/client";

import { GET_TEST_SESSIONS_BY_TEACHER_ID } from "../../../APIClients/queries/TestSessionQueries";
import type { TestSessionOverviewData } from "../../../APIClients/types/TestSessionClientTypes";
import AuthContext from "../../../contexts/AuthContext";
import { getSessionTargetDate } from "../../../utils/TestSessionUtils";

const useAssessmentDataQuery = (limit?: number) => {
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
          startDate,
          endDate,
          testSessionId: id,
          testId: test.id,
          testName: test.name,
          classId: classroom.id,
          classroomName: classroom.className,
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
