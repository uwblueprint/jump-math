import React from "react";
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
import { removeUnderscore, titleCase } from "../../../../utils/GeneralUtils";

import ClassroomPopover from "./ClassroomPopover";

interface ClassroomCardProps {
  id: string;
  name: string;
  startDate?: Date;
  studentCount: number;
  assessmentCount: number;
  grade: Grade;
  activeAssessments: number;
}

interface ClassroomCardBodyProps {
  icon: React.ReactElement;
  text: string;
}

const ClassroomCard = ({
  id,
  name,
  startDate,
  studentCount,
  assessmentCount,
  grade,
  activeAssessments,
}: ClassroomCardProps): React.ReactElement => {
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
    <LinkBox h="256px" w="240px">
      <VStack
        alignItems="flex-start"
        border="2.5px solid"
        borderColor="blue.50"
        borderRadius="16px"
        h="100%"
        p="1em"
        spacing="12px"
        w="100%"
      >
        <HStack alignItems="flex-start" justifyContent="space-between" w="100%">
          <LinkOverlay
            as={RouterLink}
            to={{
              pathname: Routes.DISPLAY_CLASSROOM_PAGE(id),
              state: { className: name, startDate, grade },
            }}
          >
            <Text color="grey.400" textStyle="mobileHeader3">
              {name}
            </Text>
          </LinkOverlay>
          <ClassroomPopover />
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
          <Tag bgColor="grey.100" color="grey.300" size="lg">
            <Text textStyle="mobileParagraph">
              {activeAssessments} Coming Tests
            </Text>
          </Tag>
        )}
      </VStack>
    </LinkBox>
  );
};

export default ClassroomCard;
