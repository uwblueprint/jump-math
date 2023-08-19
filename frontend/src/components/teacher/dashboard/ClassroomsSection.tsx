import type { ReactElement } from "react";
import React from "react";
import { Box, Center, Grid } from "@chakra-ui/react";

import ErrorState from "../../common/info/ErrorState";
import LoadingState from "../../common/info/LoadingState";
import EmptyClassroomsMessage from "../../common/info/messages/EmptyClassroomsMessage";
import ClassroomCard from "../student-management/classroom-summary/ClassroomCard";
import useClassDataQuery from "../student-management/classroom-summary/useClassDataQuery";

const QUERY_DATA_LIMIT = 6;

const ClassroomsSection = ({
  handleAddClassroom,
}: {
  handleAddClassroom: () => void;
}): ReactElement => {
  const { loading, error, data } = useClassDataQuery(QUERY_DATA_LIMIT);

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
          <EmptyClassroomsMessage onClick={handleAddClassroom} />
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
