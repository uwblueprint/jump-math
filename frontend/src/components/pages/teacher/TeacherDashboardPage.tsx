import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { HStack, Text, useDisclosure, VStack } from "@chakra-ui/react";

import { classroomFormDefaultValues } from "../../../constants/ClassroomConstants";
import * as Routes from "../../../constants/Routes";
import HeaderWithButton from "../../common/HeaderWithButton";
import SimplePopover from "../../common/popover/SimplePopover";
import AssessmentsSection from "../../teacher/dashboard/AssessmentsSection";
import ClassroomsSection from "../../teacher/dashboard/ClassroomsSection";
import AddOrEditClassroomModal from "../../teacher/student-management/classroom-summary/AddOrEditClassroomModal";

const SECTION_CONFIG = [
  {
    title: "Classrooms",
    bodyComponent: <ClassroomsSection />,
    headerGap: 8,
  },
  {
    title: "Assessments",
    bodyComponent: <AssessmentsSection />,
    headerGap: 2,
  },
];

const TeacherDashboardPage = (): React.ReactElement => {
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();
  const history = useHistory();

  const popoverItems = [
    {
      name: "Assessment",
      onClick: () => history.push(Routes.DISTRIBUTE_ASSESSMENT_PAGE),
    },
    {
      name: "Classroom",
      onClick: onModalOpen,
    },
  ];

  const methods = useForm({
    defaultValues: classroomFormDefaultValues,
    mode: "onChange",
  });

  return (
    <>
      <HeaderWithButton
        button={<SimplePopover items={popoverItems} text="Add New" />}
        title="Dashboard"
      />
      <FormProvider {...methods}>
        <AddOrEditClassroomModal isOpen={isModalOpen} onClose={onModalClose} />
      </FormProvider>
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
