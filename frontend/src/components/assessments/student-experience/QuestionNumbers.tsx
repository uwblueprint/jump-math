import React, { useContext } from "react";
import { GridItem, SimpleGrid } from "@chakra-ui/react";

import StudentContext from "../../../contexts/StudentContext";
import WriteAssessmentContext from "../../../contexts/WriteAssessmentContext";
import { questionStatus } from "../../../utils/StudentUtils";

import QuestionNumber from "./QuestionNumber";

const QuestionNumbers = (): React.ReactElement => {
  const { test } = useContext(StudentContext);
  const { answers, currentQuestionIndex, setCurrentQuestionIndex } = useContext(
    WriteAssessmentContext,
  );

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
