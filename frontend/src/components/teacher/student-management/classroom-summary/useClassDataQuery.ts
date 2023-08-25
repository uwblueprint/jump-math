import { useContext, useMemo } from "react";
import { useQuery } from "@apollo/client";

import { GET_CLASSES_BY_TEACHER } from "../../../../APIClients/queries/ClassQueries";
import type { ClassResponse } from "../../../../APIClients/types/ClassClientTypes";
import AuthContext from "../../../../contexts/AuthContext";
import { TestSessionStatus } from "../../../../types/TestSessionTypes";

export type QueryOptions = {
  limit?: number;
  skip?: number;
  sort?: {
    updatedAt?: "ASC" | "DESC";
  };
  excludeArchived?: boolean;
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

  const classCards = useMemo(
    () =>
      data?.classesByTeacher.map(
        ({ testSessions, students, ...classCard }) => ({
          ...classCard,
          activeAssessments: testSessions.filter(
            ({ status }) => status === TestSessionStatus.ACTIVE,
          ).length,
          assessmentCount: testSessions.length,
          studentCount: students.length,
        }),
      ),
    [data],
  );

  return { loading, error, data: classCards };
};

export default useClassDataQuery;
