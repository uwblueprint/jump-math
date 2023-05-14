import React, { useContext, useMemo, useState } from "react";
import { Box, Button, HStack, Spacer, Text, VStack } from "@chakra-ui/react";

import StudentContext from "../../../contexts/StudentContext";
import { QuestionElementType } from "../../../types/QuestionTypes";
import StudentDashboardHeader from "../../assessments/assessment-creation/StudentDashboardHeader";
import Question from "../../assessments/student-experience/Question";
import QuestionNumbers from "../../assessments/student-experience/QuestionNumbers";

const AssessmentExperiencePage = (): React.ReactElement => {
  const { test, className } = useContext(StudentContext);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const questionPoints = useMemo(() => {
    if (!test) {
      return 0;
    }
    const question = test.questions[currentQuestion];
    return question.filter(
      (questionElement) =>
        questionElement.type === QuestionElementType.QUESTION_TEXT,
    ).length;
  }, [test, currentQuestion]);

  return (
    <>
      {test && className && (
        <VStack align="center" flex="1" spacing="8">
          <StudentDashboardHeader
            assessmentName={test.name}
            classroomName={className}
          />
          <Box width="90%">
            <HStack align="top" spacing="10%">
              <VStack align="left" spacing="6" width="25%">
                <QuestionNumbers />
              </VStack>
              <VStack align="left" spacing={4}>
                <Text color="grey.300" textStyle="subtitle1">
                  All responses will be autosaved. Make sure you answer all the
                  questions before submitting your test. You can also do the
                  questions in ANY order meaning that can skip a question and
                  come back to it later!
                </Text>
                <HStack>
                  <Text textStyle="mobileHeader2">
                    Question {currentQuestion + 1}
                  </Text>
                  <Text textStyle="subtitle1">
                    ({questionPoints} Point{questionPoints > 1 ? "s" : ""})
                  </Text>
                </HStack>
                <Question
                  questionComponents={test.questions[currentQuestion]}
                />
                <HStack>
                  {currentQuestion !== 0 && (
                    <Button variant="secondary">Previous Question</Button>
                  )}
                  <Spacer />
                  {currentQuestion === test.questions.length ? (
                    <Button variant="primary">Submit</Button>
                  ) : (
                    <Button variant="primary">Next Question</Button>
                  )}
                </HStack>
              </VStack>
            </HStack>
          </Box>
        </VStack>
      )}
    </>
  );
};

export default AssessmentExperiencePage;
