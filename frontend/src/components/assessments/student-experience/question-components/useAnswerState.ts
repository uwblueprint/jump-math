import { useContext, useMemo } from "react";

import StudentContext from "../../../../contexts/StudentContext";
import { answerValues, updatedAnswer } from "../../../../utils/StudentUtils";

type AnswerStateResult = {
  currentAnswer: number[];
  updateAnswer: (value: number[]) => void;
};

const useAnswerState = (answerElementIndex: number): AnswerStateResult => {
  const { currentQuestionIndex, answers, setAnswers } = useContext(
    StudentContext,
  );

  const currentAnswer = useMemo(() => {
    return answerValues(currentQuestionIndex, answerElementIndex, answers);
  }, [currentQuestionIndex, answers, answerElementIndex]);

  const updateAnswer = (value: number[]) => {
    setAnswers((prevAnswers) => {
      return updatedAnswer(
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
