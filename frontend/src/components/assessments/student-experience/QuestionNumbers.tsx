import React, { useContext } from "react";
import { GridItem, SimpleGrid } from "@chakra-ui/react";

import StudentContext from "../../../contexts/StudentContext";
import QuestionNumberTypes from "../../../types/QuestionNumberTypes";

import QuestionNumber from "./QuestionNumber";

const QuestionNumbers = (): React.ReactElement => {
  const { test, answers, currentQuestion, setCurrentQuestion } = useContext(
    StudentContext,
  );

  const isCompletedQuestion = (index: number) => {
    return answers[index].elements.every(
      (element) => element.elementAnswers.length !== 0,
    );
  };

  const questionStatus = (index: number) => {
    if (index === currentQuestion) {
      return QuestionNumberTypes.CURRENT;
    }
    if (isCompletedQuestion(index)) {
      return QuestionNumberTypes.COMPLETED;
    }
    return QuestionNumberTypes.UNATTEMPTED;
  };

  return (
    <SimpleGrid columns={3} spacing={4}>
      {test!.questions.map((_, index) => {
        return (
          <GridItem key={index}>
            <QuestionNumber
              number={index + 1}
              onClick={() => setCurrentQuestion(index)}
              status={questionStatus(index)}
            />
          </GridItem>
        );
      })}
    </SimpleGrid>
  );
};

export default QuestionNumbers;
