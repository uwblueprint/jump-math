import React, { useMemo } from "react";
import { Box } from "@chakra-ui/react";

import type { QuestionComponentResponse } from "../../../../APIClients/types/TestClientTypes";
import { getAnswerElements } from "../../../../utils/StudentUtils";

import CorrectedQuestion from "./CorrectedQuestion";
import QuestionTitle from "./QuestionTitle";

type QuestionListProps = {
  answers: number[][];
  breakdown: boolean[];
  currentQuestionIndex: number;
  questions: QuestionComponentResponse[];
};

const QuestionList = ({
  answers,
  breakdown,
  currentQuestionIndex,
  questions,
}: QuestionListProps) => {
  const answerElements = useMemo(
    () => getAnswerElements(questions),
    [questions],
  );
  const pointsAchieved = breakdown.reduce(
    (total, isCorrect) => (isCorrect ? total + 1 : total),
    0,
  );

  return (
    <Box mt={currentQuestionIndex === 0 ? 0 : 10}>
      <QuestionTitle
        currentQuestionIndex={currentQuestionIndex}
        pointsAchieved={pointsAchieved}
        pointsPossible={answerElements.length}
      />
      <CorrectedQuestion elements={questions} studentAnswers={answers} />
    </Box>
  );
};

export default QuestionList;
