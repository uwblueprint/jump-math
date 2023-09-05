import React, { useState } from "react";
import { Box, HStack, Spacer, Text, VStack } from "@chakra-ui/react";

import AssessmentExperienceContext from "../../contexts/AssessmentExperienceContext";
import type { Answers } from "../../types/AnswerTypes";
import type { Question as QuestionType } from "../../types/QuestionTypes";
import { initializeAnswers } from "../../utils/StudentUtils";
import useReloadPrompt from "../common/navigation/useReloadPrompt";

import Question from "./questions/Question";
import QuestionTitle from "./questions/QuestionTitle";
import Instructions from "./Instructions";
import NavButtons from "./NavButtons";
import QuestionNumbers from "./QuestionNumbers";
import StudentDashboardHeader from "./StudentDashboardHeader";

interface AssessmentExperienceProps {
  title: string;
  subtitle?: string;
  questions: QuestionType[];
  headerButton?: React.ReactElement;
  isPreviewMode?: boolean;
}

const AssessmentExperience = ({
  title,
  subtitle = "",
  questions,
  headerButton,
  isPreviewMode = false,
}: AssessmentExperienceProps): React.ReactElement => {
  useReloadPrompt();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers[]>(
    initializeAnswers(questions),
  );

  return (
    <AssessmentExperienceContext.Provider
      value={{
        questions,
        currentQuestionIndex,
        setCurrentQuestionIndex,
        answers,
        setAnswers,
      }}
    >
      <VStack align="center" flex="1" spacing="8">
        <StudentDashboardHeader assessmentName={title} classroomName={subtitle}>
          {headerButton}
        </StudentDashboardHeader>
        <Box width="90%">
          <HStack align="top" spacing="10%">
            <VStack align="left" minWidth="233" spacing="6">
              <Text textStyle="subtitle1">Questions</Text>
              <QuestionNumbers />
            </VStack>
            <VStack align="left" minHeight="83vh" spacing={8}>
              <Instructions />
              <QuestionTitle />
              <Question elements={questions[currentQuestionIndex].elements} />
              <Spacer />
              <NavButtons isPreviewMode={isPreviewMode} />
            </VStack>
          </HStack>
        </Box>
      </VStack>
    </AssessmentExperienceContext.Provider>
  );
};
export default AssessmentExperience;
