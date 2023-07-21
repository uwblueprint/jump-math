import React, { useContext, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Box, Flex, VStack } from "@chakra-ui/react";

import { GET_CLASSES_BY_TEACHER } from "../../../../APIClients/queries/ClassQueries";
import type { ClassResponse } from "../../../../APIClients/types/ClassClientTypes";
import { CLASSROOMS_PAGE } from "../../../../constants/Routes";
import AuthContext from "../../../../contexts/AuthContext";
import { getSessionStatus } from "../../../../utils/TestSessionUtils";
import EmptyDistributeClassroomsMessage from "../../../common/info/messages/EmptyDistributeClassroomsMessage";
import Pagination from "../../../common/table/Pagination";
import usePaginatedData from "../../../common/table/usePaginatedData";
import ClassroomCard from "../../student-management/classroom-summary/ClassroomCard";
import DistributeAssessmentWrapper from "../DistributeAsessmentWrapper";

interface ChooseClassProps {
  selectedClassId: string;
  setClassId: React.Dispatch<React.SetStateAction<string>>;
}

const ChooseClass = ({
  selectedClassId,
  setClassId,
}: ChooseClassProps): React.ReactElement => {
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
    <DistributeAssessmentWrapper
      emptyState={
        <EmptyDistributeClassroomsMessage onClick={navigateToClassrooms} />
      }
      isEmpty={classCards?.length === 0}
      isError={Boolean(error)}
      isLoading={Boolean(loading)}
      subtitle="Please choose classrooms you want this assessment to be distributed to."
      title="Choose a classroom"
    >
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
              <Flex
                key={id}
                cursor="pointer"
                onClick={() => setClassId(id)}
                paddingRight="4"
                paddingTop="4"
              >
                <ClassroomCard
                  key={id}
                  activeAssessments={activeAssessments}
                  assessmentCount={assessmentCount}
                  clickDisabled={true}
                  grade={gradeLevel}
                  id={id}
                  name={className}
                  selected={selectedClassId === id}
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
    </DistributeAssessmentWrapper>
  );
};

export default ChooseClass;
