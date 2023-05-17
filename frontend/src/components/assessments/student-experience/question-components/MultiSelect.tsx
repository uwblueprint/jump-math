import React, { useContext, useMemo } from "react";
import { Checkbox, CheckboxGroup, VStack } from "@chakra-ui/react";

import StudentContext from "../../../../contexts/StudentContext";
import { answerValues, updatedAnswer } from "../../../../utils/StudentUtils";

interface MultiSelectProps {
  answerElementIndex: number;
  options: string[];
}

const MultiSelect = ({
  answerElementIndex,
  options,
}: MultiSelectProps): React.ReactElement => {
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

  return (
    <CheckboxGroup
      onChange={(e) => updateAnswer(e as number[])}
      value={currentAnswer}
    >
      <VStack alignItems="left" gap={3} ml={5}>
        {options.map((option, index) => {
          return (
            <Checkbox key={index} size="lg" value={index.toString()}>
              {option}
            </Checkbox>
          );
        })}
      </VStack>
    </CheckboxGroup>
  );
};

export default MultiSelect;
