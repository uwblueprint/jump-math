import React, { useContext, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";
import { useQuery } from "@apollo/client";
import {
  Box,
  Center,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from "@chakra-ui/react";

import { GET_CLASSES_BY_TEACHER } from "../../../APIClients/queries/ClassQueries";
import type { ClassResponse } from "../../../APIClients/types/ClassClientTypes";
import * as Routes from "../../../constants/Routes";
import AuthContext from "../../../contexts/AuthContext";
import { TabEnumClassroom } from "../../../types/ClassroomTypes";
import { getSessionStatus } from "../../../utils/TestSessionUtils";
import HeaderWithButton from "../../common/HeaderWithButton";
import ErrorState from "../../common/info/ErrorState";
import LoadingState from "../../common/info/LoadingState";
import EmptyClassroomsMessage from "../../common/info/messages/EmptyClassroomsMessage";
import Pagination from "../../common/table/Pagination";
import usePaginatedData from "../../common/table/usePaginatedData";
import AddClassroomModal from "../../teacher/student-management/classrooms/AddClassroomModal";
import ClassroomCard from "../../teacher/student-management/classrooms/ClassroomCard";

const ClassroomsPage = (): React.ReactElement => {
  const [tabIndex, setTabIndex] = React.useState<TabEnumClassroom>(
    TabEnumClassroom.ACTIVE,
  );
  const methods = useForm();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { authenticatedUser } = useContext(AuthContext);

  const { id: teacherId } = authenticatedUser ?? {};

  const { loading, error, data } = useQuery<{
    classesByTeacher: ClassResponse[];
  }>(GET_CLASSES_BY_TEACHER, {
    fetchPolicy: "cache-and-network",
    variables: { teacherId },
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

  const { paginatedData, totalPages, currentPage, setCurrentPage } =
    usePaginatedData(classCards);

  const handleTabChange = (index: TabEnumClassroom) => {
    setTabIndex(index);
  };

  const handleAddClassroom = () => {
    setIsModalOpen(true);
  };

  if (!teacherId) {
    return <Redirect to={Routes.TEACHER_LOGIN_PAGE} />;
  }

  return (
    <FormProvider {...methods}>
      <Box>
        <HeaderWithButton
          buttonText="Add Classroom"
          onClick={handleAddClassroom}
          showButton={classCards?.length !== 0}
          title="Classrooms"
        />
        <AddClassroomModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </Box>
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
      {classCards && !error && !loading && (
        <Box flex="1">
          {classCards.length !== 0 ? (
            <>
              <Tabs index={tabIndex} marginTop={3} onChange={handleTabChange}>
                <TabList>
                  <Tab>Active</Tab>
                  <Tab>Archived</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel padding="0">
                    <Flex alignItems="left" flexWrap="wrap">
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
                  </TabPanel>
                  <TabPanel padding="0">
                    <h1>Coming soon!</h1>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </>
          ) : (
            <EmptyClassroomsMessage onClick={handleAddClassroom} />
          )}
        </Box>
      )}
    </FormProvider>
  );
};

export default ClassroomsPage;
