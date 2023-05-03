import React from "react";
import { Box, HStack, Tag, Text } from "@chakra-ui/react";

import { Grade } from "../../../../APIClients/types/UserClientTypes";
import {
  BarChart2Icon,
  BookOpenIcon,
  MoreVerticalOutlineIcon,
  PeopleIcon,
} from "../../../../assets/icons";
import { removeUnderscore, titleCase } from "../../../../utils/GeneralUtils";

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
      icon: <BarChart2Icon />,
      text: `${titleCase(removeUnderscore(grade))}`,
    },
  ];

  return (
    <Box
      border="2.5px solid"
      borderColor="blue.50"
      borderRadius="16px"
      h="256px"
      p="1em"
      w="240px"
    >
      <HStack alignItems="flex-start">
        <Text color="grey.400" pb="0.2em" textStyle="mobileHeader3">
          {name}
        </Text>
        <MoreVerticalOutlineIcon boxSize="1.5em" />
      </HStack>
      {classroomCardBody.map(({ icon, text }, i) => {
        return (
          <HStack key={i} pt="0.65em">
            {icon}
            <Text color="blue.300" textStyle="mobileParagraph">
              {text}
            </Text>
          </HStack>
        );
      })}
      {!!activeAssessments && (
        <Tag
          bg="grey.100"
          borderRadius="1000px"
          color="grey.300"
          mt="0.65em"
          p="0.5em 1em"
        >
          <Text textStyle="mobileParagraph">
            {activeAssessments} Coming Tests
          </Text>
        </Tag>
      )}
    </Box>
  );
};

export default ClassroomCard;
