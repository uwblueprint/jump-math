import { useContext, useMemo } from "react";

import AssessmentExperienceContext from "../../../../contexts/AssessmentExperienceContext";
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
    AssessmentExperienceContext,
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
