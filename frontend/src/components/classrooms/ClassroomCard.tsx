import React from "react";
import { HStack, Tag, Text, VStack } from "@chakra-ui/react";

import type { Grade } from "../../APIClients/types/UserClientTypes";
import {
  BarChartIcon,
  BookOpenIcon,
  MoreVerticalOutlineIcon,
  PeopleIcon,
} from "../../assets/icons";
import { removeUnderscore, titleCase } from "../../utils/GeneralUtils";

interface ClassroomCardProps {
  name: string;
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
  name,
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
    <VStack
      alignItems="flex-start"
      border="2.5px solid"
      borderColor="blue.50"
      borderRadius="16px"
      h="256px"
      p="1em"
      spacing="12px"
      w="240px"
    >
      <HStack alignItems="flex-start">
        <Text color="grey.400" textStyle="mobileHeader3">
          {name}
        </Text>
        <MoreVerticalOutlineIcon boxSize="1.5em" />
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
  );
};

export default ClassroomCard;
