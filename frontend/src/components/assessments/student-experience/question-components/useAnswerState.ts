import { useContext, useMemo } from "react";

import StudentContext from "../../../../contexts/StudentContext";
import { answerValues, updatedAnswer } from "../../../../utils/StudentUtils";

type AnswerStateResult = {
  currentAnswer: number[];
  updateAnswer: (input: string) => void;
};

const useAnswerState = (answerElementIndex: number): AnswerStateResult => {
  const { currentQuestionIndex, answers, setAnswers } = useContext(
    StudentContext,
  );

  const currentAnswer = useMemo(() => {
    return answerValues(currentQuestionIndex, answerElementIndex, answers);
  }, [currentQuestionIndex, answers, answerElementIndex]);

  const updateAnswer = (input: string) => {
    const value = parseFloat(input);
    const validValue = Number.isNaN(value) ? [] : [value];
    setAnswers((prevAnswers) => {
      return updatedAnswer(
        answerElementIndex,
        currentQuestionIndex,
        validValue,
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
