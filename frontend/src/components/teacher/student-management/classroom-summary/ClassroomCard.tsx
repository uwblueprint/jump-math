import React, { type ReactElement } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";
import {
  HStack,
  LinkBox,
  LinkOverlay,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";

import type { Grade } from "../../../../APIClients/types/UserClientTypes";
import {
  BarChartIcon,
  BookOpenIcon,
  PeopleIcon,
} from "../../../../assets/icons";
import * as Routes from "../../../../constants/Routes";
import type { ClassroomForm } from "../../../../types/ClassroomTypes";
import { removeUnderscore, titleCase } from "../../../../utils/GeneralUtils";

import ClassroomPopover from "./ClassroomPopover";

interface ClassroomCardProps {
  id: string;
  isDashboardVariant?: boolean;
  name: string;
  startDate?: Date;
  studentCount: number;
  assessmentCount: number;
  grade: Grade;
  isActive: boolean;
  activeAssessments: number;
  clickDisabled?: boolean;
  selected?: boolean;
}

interface ClassroomCardBodyProps {
  icon: ReactElement;
  text: string;
}

export const CLASSROOM_CARD_STYLES = {
  HEIGHT: "256px",
  BORDER_RADIUS: "16px",
};

const ClassroomCard = ({
  id,
  name,
  startDate,
  studentCount,
  assessmentCount,
  grade,
  isActive,
  activeAssessments,
  clickDisabled = false,
  selected = false,
  isDashboardVariant = false,
}: ClassroomCardProps): ReactElement => {
  const classroomFormMethods = useForm<ClassroomForm>({
    defaultValues: {
      className: name,
      startDate: startDate ? new Date(startDate) : undefined,
      gradeLevel: grade,
    },
    mode: "onChange",
  });

  const classroomTitle = (
    <Text color="grey.400" textStyle="mobileHeader3">
      {name}
    </Text>
  );
  const classroomCardBody: ClassroomCardBodyProps[] = [
    {
      icon: <PeopleIcon />,
      text: `${studentCount} Students`,
    },
    {
      icon: <BookOpenIcon />,
      text: `${assessmentCount} Assessments`,
    },
    {
      icon: <BarChartIcon />,
      text: `${titleCase(removeUnderscore(grade))}`,
    },
  ];

  return (
    <LinkBox
      h={CLASSROOM_CARD_STYLES.HEIGHT}
      w={isDashboardVariant ? undefined : "240px"}
    >
      <VStack
        _hover={{ backgroundColor: "grey.100" }}
        alignItems="flex-start"
        border="2.5px solid"
        borderColor={selected ? "blue.200" : "blue.50"}
        borderRadius={CLASSROOM_CARD_STYLES.BORDER_RADIUS}
        h="100%"
        p="1em"
        spacing="12px"
        w="100%"
      >
        <HStack alignItems="flex-start" justifyContent="space-between" w="100%">
          {clickDisabled ? (
            classroomTitle
          ) : (
            <>
              <LinkOverlay
                as={RouterLink}
                to={{
                  pathname: Routes.DISPLAY_CLASSROOM_PAGE({ classroomId: id }),
                  state: {
                    className: name,
                    startDate,
                    gradeLevel: grade,
                    isActive,
                  },
                }}
              >
                {classroomTitle}
              </LinkOverlay>

              {!isDashboardVariant && (
                <FormProvider {...classroomFormMethods}>
                  <ClassroomPopover classId={id} isArchived={!isActive} />
                </FormProvider>
              )}
            </>
          )}
        </HStack>
        {classroomCardBody.map(({ icon, text }, i) => {
          return (
            <HStack key={i}>
              {icon}
              <Text color="blue.300" textStyle="mobileParagraph">
                {text}
              </Text>
            </HStack>
          );
        })}
        {!!activeAssessments && (
          <Tag bgColor="green.50" color="green.300" size="lg">
            <Text textStyle="mobileParagraph">
              {activeAssessments} active test
              {activeAssessments === 1 ? "" : "s"}
            </Text>
          </Tag>
        )}
      </VStack>
    </LinkBox>
  );
};

export default ClassroomCard;
