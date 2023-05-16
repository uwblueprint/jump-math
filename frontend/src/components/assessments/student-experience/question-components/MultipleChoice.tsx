import React, { useContext, useMemo } from "react";
import { Radio, RadioGroup, VStack } from "@chakra-ui/react";

import StudentContext from "../../../../contexts/StudentContext";
import { getCurrentAnswer, updateAnswer } from "../../../../utils/StudentUtils";

interface MultipleChoiceProps {
  answerIndex: number;
  options: string[];
}
const MultipleChoice = ({
  answerIndex,
  options,
}: MultipleChoiceProps): React.ReactElement => {
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
    <RadioGroup
      onChange={(e) => handleInputChange(e)}
      value={currentAnswer ? currentAnswer[0].toString() : undefined}
    >
      <VStack alignItems="left" gap={3} ml={5}>
        {options.map((option, index) => {
          return (
            <Radio key={index} size="lg" value={index.toString()}>
              {option}
            </Radio>
          );
        })}
      </VStack>
    </RadioGroup>
  );
};

export default MultipleChoice;
