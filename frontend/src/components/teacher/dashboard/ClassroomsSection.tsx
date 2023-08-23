import type { ReactElement } from "react";
import React from "react";
import { Box, Center, Grid } from "@chakra-ui/react";

import ErrorState from "../../common/info/ErrorState";
import LoadingState from "../../common/info/LoadingState";
import EmptyClassroomsGoToPageMessage from "../../common/info/messages/EmptyClassroomsGoToPage";
import ClassroomCard from "../student-management/classroom-summary/ClassroomCard";
import type { QueryOptions } from "../student-management/classroom-summary/useClassDataQuery";
import useClassDataQuery from "../student-management/classroom-summary/useClassDataQuery";

const QUERY_DATA_OPTIONS: QueryOptions = {
  limit: 6,
  sort: {
    updatedAt: "DESC",
  },
  excludeArchived: true,
};

const ClassroomsSection = (): ReactElement => {
  const { loading, error, data } = useClassDataQuery(QUERY_DATA_OPTIONS);

  return (
    <Box flex="1" w="100%">
      {loading && (
        <Center flex="1" margin="15%" mt="calc(15% - 2rem)">
          <LoadingState />
        </Center>
      )}
      {error && (
        <Box height="100%" mt={2}>
          <ErrorState />
        </Box>
      )}
      {data &&
        !error &&
        !loading &&
        (data.length === 0 ? (
          <EmptyClassroomsGoToPageMessage />
        ) : (
          <Grid autoRows="1fr" gap={4} templateColumns="repeat(3, 1fr)">
            {data?.map(
              ({
                id,
                activeAssessments,
                assessmentCount,
                gradeLevel,
                className,
                startDate,
                studentCount,
              }) => (
                <ClassroomCard
                  key={id}
                  activeAssessments={activeAssessments}
                  assessmentCount={assessmentCount}
                  grade={gradeLevel}
                  id={id}
                  isDashboardVariant
                  name={className}
                  startDate={startDate}
                  studentCount={studentCount}
                />
              ),
            )}
          </Grid>
        ))}
    </Box>
  );
};

export default ClassroomsSection;
