import React, { useContext } from "react";
import { GridItem, SimpleGrid } from "@chakra-ui/react";

import StudentContext from "../../../contexts/StudentContext";
import QuestionNumberTypes from "../../../types/QuestionNumberTypes";

import QuestionNumber from "./QuestionNumber";

const QuestionNumbers = (): React.ReactElement => {
  const { test, answers, currentQuestion, setCurrentQuestion } = useContext(
    StudentContext,
  );

  const getStatus = (index: number) => {
    if (index === currentQuestion) {
      return QuestionNumberTypes.CURRENT;
    }
    if (answers[index]) {
      return QuestionNumberTypes.COMPLETED; // come back to this
    }
    return QuestionNumberTypes.UNATTEMPTED;
  };

  return (
    <>
      {test && (
        <SimpleGrid columns={3} spacing={4}>
          {test.questions.map((_, index) => {
            return (
              <GridItem key={index}>
                <QuestionNumber
                  number={index + 1}
                  onClick={() => setCurrentQuestion(index)}
                  status={getStatus(index)}
                />
              </GridItem>
            );
          })}
        </SimpleGrid>
      )}
    </>
  );
};

export default QuestionNumbers;
