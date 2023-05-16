import React, { useContext, useMemo } from "react";
import { Input } from "@chakra-ui/react";

import StudentContext from "../../../../contexts/StudentContext";
import { getCurrentAnswer, updateAnswer } from "../../../../utils/StudentUtils";

interface ShortAnswersProps {
  answerIndex: number;
}

const ShortAnswer = ({
  answerIndex,
}: ShortAnswersProps): React.ReactElement => {
  const { currentQuestion, answers, setAnswers } = useContext(StudentContext);
  const currentAnswer = useMemo(() => {
    return getCurrentAnswer(currentQuestion, answerIndex, answers);
  }, [currentQuestion, answers, answerIndex]);

  const handleInputChange = (value: string) => {
    const input = parseFloat(value);
    const updatedAnswer = Number.isNaN(input) ? undefined : [input];
    setAnswers((prevAnswers) => {
      return updateAnswer(
        answerIndex,
        currentQuestion,
        updatedAnswer,
        prevAnswers,
      );
    });
  };

  return (
    <Input
      borderColor="grey.300"
      borderRadius="8px"
      focusBorderColor="grey.300"
      onChange={(e) => handleInputChange(e.target.value)}
      placeholder="Write your answer here"
      type="number"
      value={currentAnswer ? currentAnswer[0] : undefined}
      variant="outline"
      width="34%"
    />
  );
};

export default ShortAnswer;
