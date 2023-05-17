import React, { useContext } from "react";
import { Box, HStack, Spacer, Text, VStack } from "@chakra-ui/react";

import StudentContext from "../../../contexts/StudentContext";
import StudentDashboardHeader from "../../assessments/assessment-creation/StudentDashboardHeader";
import NavButtons from "../../assessments/student-experience/NavButtons";
import Question from "../../assessments/student-experience/Question";
import QuestionNumbers from "../../assessments/student-experience/QuestionNumbers";
import QuestionTitle from "../../assessments/student-experience/QuestionTitle";

const AssessmentExperiencePage = (): React.ReactElement => {
  const { test, className, currentQuestionIndex } = useContext(StudentContext);

  return (
    <VStack align="center" flex="1" spacing="8">
      <StudentDashboardHeader
        assessmentName={test?.name ?? ""}
        classroomName={className}
      />
      <Box width="90%">
        <HStack align="top" spacing="10%">
          <VStack align="left" minWidth="233" spacing="6">
            <Text textStyle="subtitle1">Questions</Text>
            <QuestionNumbers />
          </VStack>
          <VStack align="left" minHeight="83vh" spacing={8}>
            <Text color="grey.300" textStyle="subtitle1">
              All responses will be autosaved. Make sure you answer all the
              questions before submitting your test. You can also do the
              questions in ANY order meaning that can skip a question and come
              back to it later!
            </Text>
            <QuestionTitle />
            <Question elements={test?.questions[currentQuestionIndex] ?? []} />
            <Spacer />
            <NavButtons />
          </VStack>
        </HStack>
      </Box>
    </VStack>
  );
};

export default AssessmentExperiencePage;
