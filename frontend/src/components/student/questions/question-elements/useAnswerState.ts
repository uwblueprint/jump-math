import { useContext, useMemo } from "react";

import WriteAssessmentContext from "../../../../contexts/WriteAssessmentContext";
import {
  getAnswerValues,
  getUpdatedAnswer,
} from "../../../../utils/StudentUtils";

type AnswerStateResult = {
  currentAnswer: (number | undefined)[];
  updateAnswer: (value: (number | undefined)[]) => void;
};

const useAnswerState = (answerElementIndex: number): AnswerStateResult => {
  const { currentQuestionIndex, answers, setAnswers } = useContext(
    WriteAssessmentContext,
  );

  const currentAnswer = useMemo(() => {
    return getAnswerValues(currentQuestionIndex, answerElementIndex, answers);
  }, [currentQuestionIndex, answers, answerElementIndex]);

  const updateAnswer = (value: (number | undefined)[]) => {
    setAnswers((prevAnswers) => {
      return getUpdatedAnswer(
        answerElementIndex,
        currentQuestionIndex,
        value,
        prevAnswers,
      );
    });
  };

  return {
    currentAnswer,
    updateAnswer,
  };
};

export default useAnswerState;
