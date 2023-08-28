import React, {
  type Dispatch,
  type ReactElement,
  type SetStateAction,
} from "react";
import { Box, Flex, VStack } from "@chakra-ui/react";

import EmptyClassroomsGoToPageMessage from "../../../common/info/messages/EmptyClassroomsGoToPage";
import Pagination from "../../../common/table/Pagination";
import usePaginatedData from "../../../common/table/usePaginatedData";
import ClassroomCard from "../../student-management/classroom-summary/ClassroomCard";
import useClassDataQuery from "../../student-management/classroom-summary/useClassDataQuery";
import DistributeAssessmentWrapper from "../DistributeAssessmentWrapper";

interface ChooseClassProps {
  selectedClassId: string;
  setClassId: Dispatch<SetStateAction<string>>;
  setClassName: Dispatch<SetStateAction<string>>;
}

const ChooseClass = ({
  selectedClassId,
  setClassId,
  setClassName,
}: ChooseClassProps): ReactElement => {
  const { loading, error, data } = useClassDataQuery({ excludeArchived: true });

  const { paginatedData, totalPages, currentPage, setCurrentPage } =
    usePaginatedData(data);

  return (
    <DistributeAssessmentWrapper
      emptyState={<EmptyClassroomsGoToPageMessage />}
      isEmpty={data?.length === 0}
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
              isActive,
              className,
              startDate,
              studentCount,
            }) => (
              <Flex
                key={id}
                cursor="pointer"
                onClick={() => {
                  setClassId(id);
                  setClassName(className);
                }}
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
                  isActive={isActive}
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
