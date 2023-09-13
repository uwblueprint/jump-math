import React from "react";
import { Spacer, Text, VStack } from "@chakra-ui/react";

import HeaderWrapper from "../common/HeaderWrapper";

interface StudentDashboardHeaderProps {
  assessmentName: string;
  classroomName: string;
  children?: React.ReactNode;
}

const StudentDashboardHeader = ({
  assessmentName,
  classroomName,
  children,
}: StudentDashboardHeaderProps): React.ReactElement => {
  return (
    <HeaderWrapper>
      <VStack align="left" justifyContent="center" marginLeft="2rem">
        <Text textStyle="subtitle1">{assessmentName}</Text>
        {classroomName && (
          <Text textStyle="smallerParagraph">{classroomName}</Text>
        )}
      </VStack>
      <Spacer />
      {children}
    </HeaderWrapper>
  );
};

export default StudentDashboardHeader;
