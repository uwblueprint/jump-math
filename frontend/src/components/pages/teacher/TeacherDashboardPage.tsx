import React from "react";
import { useHistory } from "react-router-dom";
import { HStack, Spacer, Text, VStack } from "@chakra-ui/react";

import * as Routes from "../../../constants/Routes";
import HeaderWithButton from "../../common/HeaderWithButton";
import RouterLink from "../../common/navigation/RouterLink";
import SimplePopover from "../../common/popover/SimplePopover";
import AssessmentsSection from "../../teacher/dashboard/AssessmentsSection";
import ClassroomsSection from "../../teacher/dashboard/ClassroomsSection";

const TeacherDashboardPage = (): React.ReactElement => {
  const history = useHistory();

  return (
    <>
      <HeaderWithButton
        button={
          <SimplePopover
            items={[
              {
                name: "Assessment",
                onClick: () => history.push(Routes.DISTRIBUTE_ASSESSMENT_PAGE),
              },
              {
                name: "Classroom",
                onClick: () =>
                  history.push(Routes.CLASSROOMS_PAGE, {
                    openAddClassroomModal: true,
                  }),
              },
            ]}
            text="Add New"
          />
        }
        title="Dashboard"
      />
      <HStack align="start" gap={20} mt={9}>
        <VStack flex="1" gap={8}>
          <HStack w="100%">
            <Text as="h2" color="blue.300" textStyle="subtitle1">
              Classrooms
            </Text>
            <Spacer />
            <RouterLink
              color="blue.300"
              fontWeight="bold"
              textDecor="none"
              to={Routes.CLASSROOMS_PAGE}
            >
              View All
            </RouterLink>
          </HStack>
          <ClassroomsSection />
        </VStack>
        <VStack align="left" flex="1" gap={0}>
          <HStack w="100%">
            <Text as="h2" color="blue.300" textStyle="subtitle1">
              Assessments
            </Text>
            <Spacer />
            <RouterLink
              color="blue.300"
              fontWeight="bold"
              textDecor="none"
              to={Routes.DISPLAY_ASSESSMENTS_PAGE}
            >
              View All
            </RouterLink>
          </HStack>
          <AssessmentsSection />
        </VStack>
      </HStack>
    </>
  );
};

export default TeacherDashboardPage;
