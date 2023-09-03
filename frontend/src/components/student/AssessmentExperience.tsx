import React from "react";
import { Box, HStack, Spacer, Text, VStack } from "@chakra-ui/react";

import type { QuestionComponentResponse } from "../../APIClients/types/TestClientTypes";

import Question from "./questions/Question";
import QuestionTitle from "./questions/QuestionTitle";
import Instructions from "./Instructions";
import StudentDashboardHeader from "./StudentDashboardHeader";

interface AssessmentExperienceProps {
  title: string;
  subtitle?: string;
  questionNumber: number;
  pointCount: number;
  questionElements: QuestionComponentResponse[];
  questionNumbers: React.ReactElement;
  navButtons: React.ReactElement;
  headerButton?: React.ReactElement;
}

const AssessmentExperience = ({
  title,
  subtitle,
  questionNumber,
  pointCount,
  questionElements,
  questionNumbers,
  navButtons,
  headerButton,
}: AssessmentExperienceProps): React.ReactElement => {
  return (
    <VStack align="center" flex="1" spacing="8">
      <StudentDashboardHeader
        assessmentName={title}
        classroomName={subtitle || ""}
      >
        {headerButton}
      </StudentDashboardHeader>
      <Box width="90%">
        <HStack align="top" spacing="10%">
          <VStack align="left" minWidth="233" spacing="6">
            <Text textStyle="subtitle1">Questions</Text>
            {questionNumbers}
          </VStack>
          <VStack align="left" minHeight="83vh" spacing={8}>
            <Instructions />
            <QuestionTitle
              pointCount={pointCount}
              questionNumber={questionNumber}
            />
            <Question elements={questionElements} />
            <Spacer />
            <HStack paddingBottom="12">{navButtons}</HStack>
          </VStack>
        </HStack>
      </Box>
    </VStack>
  );
};

export default AssessmentExperience;
