import React from "react";
import { Text, VStack } from "@chakra-ui/react";

import HeaderWrapper from "../common/HeaderWrapper";

interface StudentDashboardHeaderProps {
  assessmentName: string;
  classroomName: string;
}

const StudentDashboardHeader = ({
  assessmentName,
  classroomName,
}: StudentDashboardHeaderProps): React.ReactElement => {
  return (
    <HeaderWrapper>
      <VStack align="left" marginLeft="2rem">
        <Text textStyle="subtitle1">{assessmentName}</Text>
        <Text textStyle="smallerParagraph">{classroomName}</Text>
      </VStack>
    </HeaderWrapper>
  );
};

export default StudentDashboardHeader;
