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
import AuthContext from "../../../contexts/AuthContext";
import type { Classroom } from "../../../types/ClassroomTypes";
import { TabEnumClassroom } from "../../../types/ClassroomTypes";
import HeaderWithButton from "../../common/HeaderWithButton";
import LoadingState from "../../common/LoadingState";
import EmptyClassroomsState from "../../common/messages/EmptyClassroomsMessage";
import ErrorState from "../../common/messages/ErrorMessage";
import Pagination from "../../common/table/Pagination";
import usePaginatedData from "../../common/table/usePaginatedData";
import AddClassroomModal from "../../user-management/student/classrooms/AddClassroomModal";
import ClassroomCard from "../../user-management/student/classrooms/ClassroomCard";

const ClassroomsPage = (): React.ReactElement => {
  const unselectedTabColor = "#727278";
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

  const classrooms: Classroom[] = data?.classesByTeacher;

  const { paginatedData, totalPages, currentPage, setCurrentPage } =
    usePaginatedData(classrooms);

  const handleTabChange = (index: TabEnumClassroom) => {
    setTabIndex(index);
  };

  const handleAddClassroom = () => {
    setIsModalOpen(true);
  };

  if (!teacherId) {
    return <Redirect to="/teacher-login" />;
  }

  return (
    <FormProvider {...methods}>
      <Box>
        <HeaderWithButton
          buttonText="Add New Classroom"
          onClick={handleAddClassroom}
          showButton={classrooms?.length !== 0}
          title="Classroom"
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
      {classrooms && !error && !loading && (
        <Box flex="1">
          {classrooms.length !== 0 ? (
            <>
              <Tabs index={tabIndex} marginTop={3} onChange={handleTabChange}>
                <TabList>
                  <Tab color={unselectedTabColor}>Active</Tab>
                  <Tab color={unselectedTabColor}>Archived</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel padding="0">
                    <Grid gap={4} templateColumns="repeat(4, 1fr)">
                      {paginatedData?.map(({ id, gradeLevel, className }) => (
                        <GridItem key={id} flex="1" paddingTop="4">
                          <ClassroomCard
                            key={id}
                            activeAssessments={100}
                            assessmentCount={200}
                            grade={gradeLevel}
                            name={className}
                            studentCount={200}
                          />
                        </GridItem>
                      ))}
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
            <EmptyClassroomsState onClick={handleAddClassroom} />
          )}
        </Box>
      )}
    </FormProvider>
  );
};

export default ClassroomsPage;
