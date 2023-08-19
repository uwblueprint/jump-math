import { useContext, useMemo } from "react";
import { useQuery } from "@apollo/client";

import { GET_CLASSES_BY_TEACHER } from "../../../../APIClients/queries/ClassQueries";
import type { ClassResponse } from "../../../../APIClients/types/ClassClientTypes";
import AuthContext from "../../../../contexts/AuthContext";
import { getSessionStatus } from "../../../../utils/TestSessionUtils";

export type QueryOptions = {
  limit?: number;
  skip?: number;
  sort?: {
    updatedAt?: "ASC" | "DESC";
  };
};

const useClassDataQuery = (queryOptions?: QueryOptions) => {
  const { authenticatedUser } = useContext(AuthContext);
  const { id: teacherId } = authenticatedUser ?? {};

  const { loading, error, data } = useQuery<{
    classesByTeacher: ClassResponse[];
  }>(GET_CLASSES_BY_TEACHER, {
    fetchPolicy: "cache-and-network",
    variables: { teacherId, queryOptions },
    skip: !teacherId,
  });

  const classCards = useMemo(() => {
    const now = new Date();
    return data?.classesByTeacher.map(
      ({ testSessions, students, ...classCard }) => {
        let activeAssessments = 0;
        testSessions.forEach((session) => {
          if (
            getSessionStatus(session.startDate, session.endDate, now) ===
            "active"
          ) {
            activeAssessments += 1;
          }
        });

        return {
          ...classCard,
          activeAssessments,
          assessmentCount: testSessions.length,
          studentCount: students.length,
        };
      },
    );
  }, [data]);

  return { loading, error, data: classCards };
};

export default useClassDataQuery;
