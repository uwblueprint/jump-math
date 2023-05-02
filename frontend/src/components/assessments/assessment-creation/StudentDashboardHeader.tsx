import React from "react";
import { Box, HStack, Text, VStack } from "@chakra-ui/react";

import HeaderWrapper from "../../common/HeaderWrapper";

interface StudentDashboardHeaderProps {
  assessmentName: string;
  classroomName: string;
  estimatedTime: string;
}

const StudentDashboardHeader = ({
  assessmentName,
  classroomName,
  estimatedTime,
}: StudentDashboardHeaderProps): React.ReactElement => {
  const content: React.ReactElement = (
    <VStack align="left" marginLeft="2rem">
      <Box>
        <Text textStyle="subtitle1">{assessmentName}</Text>
      </Box>
      <HStack gap={16}>
        <Text textStyle="smallerParagraph">{classroomName}</Text>
        <Text textStyle="smallerParagraph">Est. Length: {estimatedTime}</Text>
      </HStack>
    </VStack>
  );
  return <HeaderWrapper content={content} />;
};

export default StudentDashboardHeader;
