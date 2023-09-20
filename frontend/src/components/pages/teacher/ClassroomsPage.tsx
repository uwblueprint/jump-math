import React, { type ReactElement, useContext, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Redirect, useLocation } from "react-router-dom";
import {
  Box,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from "@chakra-ui/react";

import checkFeatureFlag from "../../../checkFeatureFlag";
import { classroomFormDefaultValues } from "../../../constants/ClassroomConstants";
import * as Routes from "../../../constants/Routes";
import AuthContext from "../../../contexts/AuthContext";
import {
  TabEnumClassroom,
  TABS_CLASSROOM,
} from "../../../types/ClassroomTypes";
import HeaderWithButton from "../../common/HeaderWithButton";
import EmptyClassroomsMessage from "../../common/info/messages/EmptyClassroomsMessage";
import QueryStateHandler from "../../common/QueryStateHandler";
import Pagination from "../../common/table/Pagination";
import usePaginatedData from "../../common/table/usePaginatedData";
import AddOrEditClassroomModal from "../../teacher/student-management/classroom-summary/AddOrEditClassroomModal";
import ClassroomCard from "../../teacher/student-management/classroom-summary/ClassroomCard";
import useClassDataQuery from "../../teacher/student-management/classroom-summary/useClassDataQuery";

const getLocationState = (
  state: unknown,
): { isAddClassroomModalOpen?: boolean } => ({
  isAddClassroomModalOpen: undefined,
  ...(typeof state === "object" ? state : {}),
});

const ClassroomsPage = (): ReactElement => {
  const { state } = useLocation();
  const { isAddClassroomModalOpen } = getLocationState(state);

  const [tabIndex, setTabIndex] = useState<TabEnumClassroom>(
    TabEnumClassroom.ACTIVE,
  );
  const methods = useForm({
    defaultValues: classroomFormDefaultValues,
    mode: "onChange",
  });

  const [isModalOpen, setIsModalOpen] = useState(
    isAddClassroomModalOpen ?? false,
  );

  const { authenticatedUser } = useContext(AuthContext);
  const { id: teacherId } = authenticatedUser ?? {};

  const { loading, error, data } = useClassDataQuery();

  const filteredData = data?.filter(({ isActive }) => isActive === !tabIndex);

  const { paginatedData, totalPages, currentPage, setCurrentPage } =
    usePaginatedData(filteredData);

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
          showButton={data?.length !== 0}
          title="Classrooms"
        />
        <AddOrEditClassroomModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </Box>
      <QueryStateHandler error={error} loading={loading}>
        {!!data && data.length ? (
          <>
            <Tabs index={tabIndex} mt={3} onChange={handleTabChange}>
              <TabList>
                <Tab>Active</Tab>
                {checkFeatureFlag("ENABLE_CLASSROOM_ARCHIVING") && (
                  <Tab>Archived</Tab>
                )}
              </TabList>
              <TabPanels>
                {TABS_CLASSROOM.map((tab) => (
                  <TabPanel key={tab} padding="0">
                    <Flex alignItems="left" flexWrap="wrap">
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
                          <Flex key={id} paddingRight="4" paddingTop="4">
                            <ClassroomCard
                              key={id}
                              activeAssessments={activeAssessments}
                              assessmentCount={assessmentCount}
                              grade={gradeLevel}
                              id={id}
                              isActive={isActive}
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
                ))}
              </TabPanels>
            </Tabs>
          </>
        ) : (
          <EmptyClassroomsMessage onClick={handleAddClassroom} />
        )}
      </QueryStateHandler>
    </FormProvider>
  );
};

export default ClassroomsPage;
