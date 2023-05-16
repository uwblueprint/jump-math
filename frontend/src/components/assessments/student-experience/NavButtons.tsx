import React, { useContext } from "react";
import { Button, HStack, Spacer } from "@chakra-ui/react";

import StudentContext from "../../../contexts/StudentContext";

const NavButtons = (): React.ReactElement => {
  const { test, currentQuestion, setCurrentQuestion } = useContext(
    StudentContext,
  );

  const onFirstQuestion = currentQuestion === 0;
  const onLastQuestion = currentQuestion === test!.questions.length - 1;

  const previousQuestion = currentQuestion - 1;
  const nextQuestion = currentQuestion + 1;

  return (
    <HStack paddingBottom="12">
      {!onFirstQuestion && (
        <Button
          onClick={() => setCurrentQuestion(previousQuestion)}
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
          onClick={() => setCurrentQuestion(nextQuestion)}
          variant="primary"
        >
          Next Question
        </Button>
      )}
    </HStack>
  );
};

export default NavButtons;
