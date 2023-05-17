import React, { useContext, useMemo } from "react";
import { Input } from "@chakra-ui/react";

import StudentContext from "../../../../contexts/StudentContext";
import { answerValues, updatedAnswer } from "../../../../utils/StudentUtils";

interface ShortAnswersProps {
  answerElementIndex: number;
}

const ShortAnswer = ({
  answerElementIndex,
}: ShortAnswersProps): React.ReactElement => {
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

  return (
    <Input
      borderColor="grey.300"
      borderRadius="8px"
      focusBorderColor="grey.300"
      onChange={(e) => updateAnswer(e.target.value)}
      placeholder="Write your answer here"
      type="number"
      value={currentAnswer[0] ?? undefined}
      variant="outline"
      width="34%"
    />
  );
};

export default ShortAnswer;
