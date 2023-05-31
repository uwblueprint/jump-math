import React, { useContext, useState } from "react";
import { Prompt } from "react-router-dom";
import { Box, HStack, Spacer, Text, VStack } from "@chakra-ui/react";

import confirmUnsavedChangesText from "../../../constants/GeneralConstants";
import StudentContext from "../../../contexts/StudentContext";
import WriteAssessmentContext from "../../../contexts/WriteAssessmentContext";
import type { Answers } from "../../../types/AnswerTypes";
import { initializeAnswers } from "../../../utils/StudentUtils";
import StudentDashboardHeader from "../../assessments/assessment-creation/StudentDashboardHeader";
import Instructions from "../../assessments/write-assessment/Instructions";
import NavButtons from "../../assessments/write-assessment/NavButtons";
import Question from "../../assessments/write-assessment/Question";
import QuestionNumbers from "../../assessments/write-assessment/QuestionNumbers";
import QuestionTitle from "../../assessments/write-assessment/QuestionTitle";
import LoadingState from "../../common/LoadingState";
import TestSubmissionMessage from "../../common/messages/TestSubmissionMessage";
import useReloadPrompt from "../../common/useReloadPrompt";

const WriteAssessmentPage = (): React.ReactElement => {
  useReloadPrompt();
  const { test, className } = useContext(StudentContext);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers[]>(
    test ? initializeAnswers(test.questions) : [],
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <WriteAssessmentContext.Provider
      value={{
        currentQuestionIndex,
        setCurrentQuestionIndex,
        answers,
        setAnswers,
        isLoading,
        setIsLoading,
        isSubmitted,
        setIsSubmitted,
      }}
    >
      {isLoading ? (
        <LoadingState
          fullPage
          text="Please wait while we submit your assessment."
        />
      ) : isSubmitted ? (
        <TestSubmissionMessage />
      ) : (
        <>
          <Prompt message={confirmUnsavedChangesText} />
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
                  <Instructions />
                  <QuestionTitle />
                  <Question
                    elements={test?.questions[currentQuestionIndex] ?? []}
                  />
                  <Spacer />
                  <NavButtons />
                </VStack>
              </HStack>
            </Box>
          </VStack>
        </>
      )}
    </WriteAssessmentContext.Provider>
  );
};

export default WriteAssessmentPage;
