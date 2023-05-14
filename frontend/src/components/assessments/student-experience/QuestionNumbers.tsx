import React, { useContext } from "react";
import { GridItem, SimpleGrid } from "@chakra-ui/react";

import StudentContext from "../../../contexts/StudentContext";
import QuestionNumberTypes from "../../../types/QuestionNumberTypes";

import QuestionNumber from "./QuestionNumber";

const QuestionNumbers = (): React.ReactElement => {
  const { test, currentQuestion, setCurrentQuestion } = useContext(
    StudentContext,
  );
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
                  status={
                    index === currentQuestion
                      ? QuestionNumberTypes.CURRENT
                      : QuestionNumberTypes.UNATTEMPTED
                  }
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
