import React, { useMemo } from "react";
import { Box } from "@chakra-ui/react";

import type { QuestionComponentResponse } from "../../../../APIClients/types/TestClientTypes";
import type {
  MultipleChoiceMetadata,
  MultiSelectMetadata,
  ShortAnswerMetadata,
} from "../../../../types/QuestionMetadataTypes";
import { QuestionElementType } from "../../../../types/QuestionTypes";
import { getAnswerElements } from "../../../../utils/StudentUtils";

import CorrectedQuestion from "./CorrectedQuestion";
import QuestionTitle from "./QuestionTitle";

type QuestionListProps = {
  answers: number[][];
  currentQuestionIndex: number;
  questions: QuestionComponentResponse[];
};

const isAnswerCorrect = (
  answer: number[],
  answerElement: QuestionComponentResponse,
) => {
  switch (answerElement.type) {
    case QuestionElementType.MULTIPLE_CHOICE:
      return (
        answer[0] ===
        (answerElement.metadata as MultipleChoiceMetadata).answerIndex
      );
    case QuestionElementType.MULTI_SELECT:
      return (
        new Set(answer) ===
        new Set((answerElement.metadata as MultiSelectMetadata).answerIndices)
      );
    case QuestionElementType.SHORT_ANSWER:
      return (
        answer[0] === (answerElement.metadata as ShortAnswerMetadata).answer
      );
    default:
      return false;
  }
};

const QuestionList = ({
  answers,
  currentQuestionIndex,
  questions,
}: QuestionListProps) => {
  const answerElements = useMemo(
    () => getAnswerElements(questions),
    [questions],
  );
  const pointsAchieved = useMemo(
    () =>
      answers.reduce(
        (total, answer, i) =>
          isAnswerCorrect(answer, answerElements[i]) ? total + 1 : total,
        0,
      ),
    [answers, answerElements],
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
