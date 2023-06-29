import React, { useContext, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";
import { useQuery } from "@apollo/client";
import {
  Box,
  Center,
  Grid,
  GridItem,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from "@chakra-ui/react";

import { GET_CLASSES_BY_TEACHER } from "../../../APIClients/queries/ClassQueries";
import * as Routes from "../../../constants/Routes";
import AuthContext from "../../../contexts/AuthContext";
import type { ClassCard } from "../../../types/ClassroomTypes";
import { TabEnumClassroom } from "../../../types/ClassroomTypes";
import HeaderWithButton from "../../common/HeaderWithButton";
import ErrorState from "../../common/info/ErrorState";
import LoadingState from "../../common/info/LoadingState";
import EmptyClassroomsMessage from "../../common/info/messages/EmptyClassroomsMessage";
import Pagination from "../../common/table/Pagination";
import usePaginatedData from "../../common/table/usePaginatedData";
import AddOrEditClassroomModal from "../../teacher/student-management/classroom-summary/AddOrEditClassroomModal";
import ClassroomCard from "../../teacher/student-management/classroom-summary/ClassroomCard";

const ClassroomsPage = (): React.ReactElement => {
  const [tabIndex, setTabIndex] = React.useState<TabEnumClassroom>(
    TabEnumClassroom.ACTIVE,
  );
  const methods = useForm();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { authenticatedUser } = useContext(AuthContext);

  const { id: teacherId } = authenticatedUser ?? {};

  const { loading, error, data } = useQuery(GET_CLASSES_BY_TEACHER, {
    fetchPolicy: "cache-and-network",
    variables: { teacherId },
    skip: !teacherId,
  });

  const classCards: ClassCard[] = data?.classesByTeacher;

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
        <AddOrEditClassroomModal
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
                    <Grid gap={4} templateColumns="repeat(4, 1fr)">
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
                          <GridItem key={id} flex="1" paddingTop="4">
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
                          </GridItem>
                        ),
                      )}
                    </Grid>
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
