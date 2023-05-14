import React, { useContext } from "react";
import { Button, HStack, Spacer } from "@chakra-ui/react";

import StudentContext from "../../../contexts/StudentContext";

const NavButtons = (): React.ReactElement => {
  const { test, currentQuestion, setCurrentQuestion } = useContext(
    StudentContext,
  );

  return (
    <>
      {test && (
        <HStack paddingBottom="12">
          {currentQuestion !== 0 && (
            <Button
              onClick={() => setCurrentQuestion(currentQuestion - 1)}
              variant="secondary"
            >
              Previous Question
            </Button>
          )}
          <Spacer />
          {currentQuestion === test.questions.length - 1 ? (
            <Button variant="primary">Submit</Button>
          ) : (
            <Button
              onClick={() => setCurrentQuestion(currentQuestion + 1)}
              variant="primary"
            >
              Next Question
            </Button>
          )}
        </HStack>
      )}
    </>
  );
};

export default NavButtons;
