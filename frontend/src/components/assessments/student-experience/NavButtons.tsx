import React, { useContext } from "react";
import { Button, HStack, Spacer } from "@chakra-ui/react";

import StudentContext from "../../../contexts/StudentContext";

const NavButtons = (): React.ReactElement => {
  const { test, currentQuestionIndex, setCurrentQuestionIndex } = useContext(
    StudentContext,
  );

  const questionCount = test?.questions.length ?? 0;

  const onFirstQuestion = currentQuestionIndex === 0;
  const onLastQuestion = currentQuestionIndex === questionCount - 1;

  const previousQuestion = currentQuestionIndex - 1;
  const nextQuestion = currentQuestionIndex + 1;

  return (
    <HStack paddingBottom="12">
      {!onFirstQuestion && (
        <Button
          onClick={() => setCurrentQuestionIndex(previousQuestion)}
          variant="secondary"
        >
          Previous Question
        </Button>
      )}
      <Spacer />
      {onLastQuestion ? (
        <Button variant="primary">Submit</Button>
      ) : (
        <Button
          onClick={() => setCurrentQuestionIndex(nextQuestion)}
          variant="primary"
        >
          Next Question
        </Button>
      )}
    </HStack>
  );
};

export default NavButtons;
