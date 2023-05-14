import React from "react";
import { Text, VStack } from "@chakra-ui/react";

import Header from "../common/Header";

interface StudentDashboardHeaderProps {
  assessmentName: string;
  classroomName: string;
}

const StudentDashboardHeader = ({
  assessmentName,
  classroomName,
}: StudentDashboardHeaderProps): React.ReactElement => {
  return (
    <Header>
      <VStack align="left" marginLeft="2rem">
        <Text textStyle="subtitle1">{assessmentName}</Text>
        <Text textStyle="smallerParagraph">{classroomName}</Text>
      </VStack>
    </Header>
  );
};

export default StudentDashboardHeader;
