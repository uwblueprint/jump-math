import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  Box,
  Center,
  Grid,
  GridItem,
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";

import { Grade } from "../../../APIClients/types/UserClientTypes";
import DisplayAssessmentsIllustration from "../../../assets/illustrations/display-assessments.svg";
import { TabEnum } from "../../../types/AuthTypes";
import ClassroomCard from "../../classrooms/ClassroomCard";
import MessageContainerClassroom from "../../common/MessageContainerClassroom";
import Pagination from "../../common/table/Pagination";
import AddClassroomModal from "../../user-management/student/AddClassroomModal";

const ClassroomsPage = (): React.ReactElement => {
  const unselectedTabColor = "#727278";
  const [tabIndex, setTabIndex] = React.useState<TabEnum>(TabEnum.ACTIVE);
  const methods = useForm();

  const classrooms = [
    {
      id: "1",
      name: "David",
      studentCount: 100,
      assessmentCount: 100,
      grade: Grade.GRADE_4,
      activeAssessments: 100,
    },
    {
      id: "2",
      name: "David 2",
      studentCount: 200,
      assessmentCount: 200,
      grade: Grade.GRADE_2,
      activeAssessments: 200,
    },
    {
      id: "3",
      name: "David 3",
      studentCount: 200,
      assessmentCount: 200,
      grade: Grade.GRADE_2,
      activeAssessments: 200,
    },
    {
      id: "4",
      name: "David 4",
      studentCount: 200,
      assessmentCount: 200,
      grade: Grade.GRADE_2,
      activeAssessments: 200,
    },
    {
      id: "5",
      name: "David 5",
      studentCount: 200,
      assessmentCount: 200,
      grade: Grade.GRADE_2,
      activeAssessments: 200,
    },
    {
      id: "6",
      name: "David 6",
      studentCount: 200,
      assessmentCount: 200,
      grade: Grade.GRADE_2,
      activeAssessments: 200,
    },
    {
      id: "7",
      name: "David 7",
      studentCount: 200,
      assessmentCount: 200,
      grade: Grade.GRADE_2,
      activeAssessments: 200,
    },
    {
      id: "8",
      name: "David 8",
      studentCount: 200,
      assessmentCount: 200,
      grade: Grade.GRADE_2,
      activeAssessments: 200,
    },
    {
      id: "9",
      name: "David 9",
      studentCount: 200,
      assessmentCount: 200,
      grade: Grade.GRADE_2,
      activeAssessments: 200,
    },
    {
      id: "10",
      name: "David 10",
      studentCount: 200,
      assessmentCount: 200,
      grade: Grade.GRADE_2,
      activeAssessments: 200,
    },
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalItems = classrooms.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const itemsToShow = classrooms.slice(startIndex, endIndex);

  const handleTabChange = (index: TabEnum) => {
    setTabIndex(index);
  };

  return (
    <FormProvider {...methods}>
      <Box>
        <HStack justifyContent="space-between">
          <Text
            color="blue.300"
            marginBottom="0.5em"
            style={{ textAlign: "left" }}
            textStyle="header4"
          >
            Classroom
          </Text>
          {classrooms.length === 0 && <AddClassroomModal />}
        </HStack>
      </Box>
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
                    {itemsToShow.map((classroom) => (
                      <GridItem key={classroom.id} flex="1" paddingTop="4">
                        <ClassroomCard
                          key={classroom.id}
                          activeAssessments={classroom.activeAssessments}
                          assessmentCount={classroom.assessmentCount}
                          grade={classroom.grade}
                          name={classroom.name}
                          studentCount={classroom.studentCount}
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
                    <Pagination
                      currentPage={currentPage}
                      onPageChange={setCurrentPage}
                      pagesCount={totalPages}
                    />
                  </VStack>
                </TabPanel>
                <TabPanel padding="0">
                  <h1>Coming soon!</h1>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </>
        ) : (
          <Center
            backgroundColor="blue.50"
            borderRadius="1rem"
            color="blue.300"
            minWidth="100%"
            pb={14}
          >
            <MessageContainerClassroom
              image={DisplayAssessmentsIllustration}
              paragraphs={[
                "Click on the below button to create your first classroom",
              ]}
              subtitle="You currently have no classrooom."
              textColor="blue.300"
            />
          </Center>
        )}
      </Box>
    </FormProvider>
  );
};

export default ClassroomsPage;
