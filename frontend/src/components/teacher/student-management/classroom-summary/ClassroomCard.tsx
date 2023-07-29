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
  clickDisabled?: boolean;
  selected?: boolean;
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
  clickDisabled = false,
  selected = false,
}: ClassroomCardProps): React.ReactElement => {
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
    <LinkBox h="256px" w="240px">
      <VStack
        _hover={{ backgroundColor: "grey.100" }}
        alignItems="flex-start"
        backgroundColor={selected ? "grey.100" : ""}
        border="2.5px solid"
        borderColor="blue.50"
        borderRadius="16px"
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
                  state: { className: name, startDate, gradeLevel: grade },
                }}
              >
                {classroomTitle}
              </LinkOverlay>
              <ClassroomPopover classId={id} />
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
