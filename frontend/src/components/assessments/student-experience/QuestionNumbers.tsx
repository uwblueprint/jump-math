import React, { useContext } from "react";
import { GridItem, SimpleGrid } from "@chakra-ui/react";

import StudentContext from "../../../contexts/StudentContext";
import { questionStatus } from "../../../utils/StudentUtils";

import QuestionNumber from "./QuestionNumber";

const QuestionNumbers = (): React.ReactElement => {
  const {
    test,
    answers,
    currentQuestionIndex,
    setCurrentQuestionIndex,
  } = useContext(StudentContext);

  return (
    <SimpleGrid columns={3} spacing={4}>
      {test?.questions.map((_, index) => {
        return (
          <GridItem key={index}>
            <QuestionNumber
              number={index + 1}
              onClick={() => setCurrentQuestionIndex(index)}
              status={questionStatus(index, currentQuestionIndex, answers)}
            />
          </GridItem>
        );
      })}
    </SimpleGrid>
  );
};

export default QuestionNumbers;
