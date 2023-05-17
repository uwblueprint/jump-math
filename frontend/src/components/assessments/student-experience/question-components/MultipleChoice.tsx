import React, { useContext, useMemo } from "react";
import { Radio, RadioGroup, VStack } from "@chakra-ui/react";

import StudentContext from "../../../../contexts/StudentContext";
import { answerValues, updatedAnswer } from "../../../../utils/StudentUtils";

interface MultipleChoiceProps {
  answerElementIndex: number;
  options: string[];
}

const MultipleChoice = ({
  answerElementIndex,
  options,
}: MultipleChoiceProps): React.ReactElement => {
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
    <RadioGroup
      onChange={(e) => updateAnswer(e)}
      value={currentAnswer[0] ?? undefined}
    >
      <VStack alignItems="left" gap={3} ml={5}>
        {options.map((option, index) => {
          return (
            <Radio key={index} size="lg" value={index}>
              {option}
            </Radio>
          );
        })}
      </VStack>
    </RadioGroup>
  );
};

export default MultipleChoice;
