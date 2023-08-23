import { useContext, useMemo } from "react";
import { useQuery } from "@apollo/client";

import { GET_TEST_SESSIONS_BY_TEACHER_ID } from "../../../APIClients/queries/TestSessionQueries";
import type { TestSessionOverviewData } from "../../../APIClients/types/TestSessionClientTypes";
import AuthContext from "../../../contexts/AuthContext";
import {
  getSessionStatus,
  getSessionTargetDate,
} from "../../../utils/TestSessionUtils";

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

  const formattedData = useMemo(() => {
    const now = new Date();
    return data?.testSessionsByTeacherId?.map(
      ({ id, startDate, endDate, test, class: classroom, ...session }) => ({
        ...session,
        testSessionId: id,
        testName: test.name,
        classroomName: classroom.className,
        status: getSessionStatus(startDate, endDate, now),
        targetDate: getSessionTargetDate(startDate, endDate, now),
      }),
    );
  }, [data]);

  return {
    loading,
    error,
    data: formattedData,
  };
};

export default useAssessmentDataQuery;
