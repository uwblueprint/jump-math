import React from "react";
import { useHistory } from "react-router-dom";
import { HStack, Text, VStack } from "@chakra-ui/react";

import * as Routes from "../../../constants/Routes";
import HeaderWithButton from "../../common/HeaderWithButton";
import SimplePopover from "../../common/popover/SimplePopover";
import AssessmentsSection from "../../teacher/dashboard/AssessmentsSection";
import ClassroomsSection from "../../teacher/dashboard/ClassroomsSection";

const SECTION_CONFIG = [
  {
    title: "Classrooms",
    bodyComponent: <ClassroomsSection />,
    headerGap: 8,
  },
  {
    title: "Assessments",
    bodyComponent: <AssessmentsSection />,
    headerGap: 0,
  },
];

const TeacherDashboardPage = (): React.ReactElement => {
  const history = useHistory();

  const popoverItems = [
    {
      name: "Assessment",
      onClick: () => history.push(Routes.DISTRIBUTE_ASSESSMENT_PAGE),
    },
    {
      name: "Classroom",
      onClick: () =>
        history.push(Routes.CLASSROOMS_PAGE, {
          isAddClassroomModalOpen: true,
        }),
    },
  ];

  return (
    <>
      <HeaderWithButton
        button={<SimplePopover items={popoverItems} text="Add New" />}
        title="Dashboard"
      />
      <HStack align="start" gap={20} mt={9}>
        {SECTION_CONFIG.map(({ title, bodyComponent, headerGap }) => (
          <VStack key={title} align="left" flex="1" gap={headerGap}>
            <Text as="h2" color="blue.300" textStyle="subtitle1">
              {title}
            </Text>
            {bodyComponent}
          </VStack>
        ))}
      </HStack>
    </>
  );
};

export default TeacherDashboardPage;
