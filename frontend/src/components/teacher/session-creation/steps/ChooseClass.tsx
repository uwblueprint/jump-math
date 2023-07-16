import React, { useContext, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Box, Center, Flex, Text, VStack } from "@chakra-ui/react";

import { GET_CLASSES_BY_TEACHER } from "../../../../APIClients/queries/ClassQueries";
import type { ClassResponse } from "../../../../APIClients/types/ClassClientTypes";
import { CLASSROOMS_PAGE } from "../../../../constants/Routes";
import AuthContext from "../../../../contexts/AuthContext";
import { getSessionStatus } from "../../../../utils/TestSessionUtils";
import ErrorState from "../../../common/info/ErrorState";
import LoadingState from "../../../common/info/LoadingState";
import EmptyDistributeClassroomsMessage from "../../../common/info/messages/EmptyDistributeClassroomsMessage";
import Pagination from "../../../common/table/Pagination";
import usePaginatedData from "../../../common/table/usePaginatedData";
import ClassroomCard from "../../student-management/classrooms/ClassroomCard";

interface ChooseClassProps {
  setClassId: React.Dispatch<React.SetStateAction<string>>;
}

const ChooseClass = ({ setClassId }: ChooseClassProps): React.ReactElement => {
  const { authenticatedUser } = useContext(AuthContext);
  const { id: teacherId } = authenticatedUser ?? {};

  const { loading, error, data } = useQuery<{
    classesByTeacher: ClassResponse[];
  }>(GET_CLASSES_BY_TEACHER, {
    fetchPolicy: "cache-and-network",
    variables: { teacherId },
    skip: !teacherId,
  });

  const history = useHistory();
  const navigateToClassrooms = () => history.push(CLASSROOMS_PAGE);

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

  const { paginatedData, totalPages, currentPage, setCurrentPage } =
    usePaginatedData(classCards);

  return (
    <VStack align="left" spacing="2">
      <Text color="blue.300" textAlign="left" textStyle="header4">
        Choose a Classroom
      </Text>
      <Text color="grey.300" textStyle="paragraph">
        Please choose classrooms you want this assessment to be distributed to.
      </Text>
      <Box pt="6">
        {loading && (
          <Center flex="1" margin="15%">
            <LoadingState />
          </Center>
        )}
        {error && (
          <Box height="100%" mt={10}>
            <ErrorState />
          </Box>
        )}
        {classCards?.length !== 0 ? (
          <Box alignItems="left">
            <Flex flexWrap="wrap">
              {paginatedData?.map(
                ({
                  id,
                  activeAssessments,
                  assessmentCount,
                  gradeLevel,
                  className,
                  startDate,
                  studentCount,
                }) => (
                  <Flex key={id} paddingRight="4" paddingTop="4">
                    <ClassroomCard
                      key={id}
                      activeAssessments={activeAssessments}
                      assessmentCount={assessmentCount}
                      disabledMenu={true}
                      grade={gradeLevel}
                      id={id}
                      name={className}
                      startDate={startDate}
                      studentCount={studentCount}
                    />
                  </Flex>
                ),
              )}
            </Flex>
            <VStack
              alignItems="center"
              paddingBottom="6"
              paddingTop="6"
              spacing="6"
              width="100%"
            >
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  onPageChange={setCurrentPage}
                  pagesCount={totalPages}
                />
              )}
            </VStack>
          </Box>
        ) : (
          <EmptyDistributeClassroomsMessage onClick={navigateToClassrooms} />
        )}
      </Box>
    </VStack>
  );
};

export default ChooseClass;
