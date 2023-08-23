import React, { useContext } from "react";
import { Button, HStack, Spacer } from "@chakra-ui/react";

import {
  ArrowBackOutlineIcon,
  ArrowForwardOutlineIcon,
} from "../../assets/icons";
import StudentContext from "../../contexts/StudentContext";
import WriteAssessmentContext from "../../contexts/WriteAssessmentContext";

import SubmitButton from "./SubmitButton";

const NavButtons = (): React.ReactElement => {
  const { test } = useContext(StudentContext);
  const { currentQuestionIndex, setCurrentQuestionIndex } = useContext(
    WriteAssessmentContext,
  );

  const questionCount = test?.questions.length ?? 0;

  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === questionCount - 1;

  const previousQuestion = currentQuestionIndex - 1;
  const nextQuestion = currentQuestionIndex + 1;

  return (
    <HStack paddingBottom="12">
      {!isFirstQuestion && (
        <Button
          leftIcon={<ArrowBackOutlineIcon />}
          onClick={() => setCurrentQuestionIndex(previousQuestion)}
          variant="secondary"
        >
          Previous Question
        </Button>
      )}
      <Spacer />
      {isLastQuestion ? (
        <SubmitButton />
      ) : (
        <Button
          onClick={() => setCurrentQuestionIndex(nextQuestion)}
          rightIcon={<ArrowForwardOutlineIcon />}
          variant="primary"
        >
          Next Question
        </Button>
      )}
    </HStack>
  );
};

export default NavButtons;
