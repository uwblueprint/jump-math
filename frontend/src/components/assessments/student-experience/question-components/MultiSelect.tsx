import React, { useContext, useMemo } from "react";
import { Checkbox, CheckboxGroup, VStack } from "@chakra-ui/react";

import StudentContext from "../../../../contexts/StudentContext";
import { getCurrentAnswer, updateAnswer } from "../../../../utils/StudentUtils";

interface MultiSelectProps {
  answerIndex: number;
  options: string[];
}
const MultiSelect = ({
  answerIndex,
  options,
}: MultiSelectProps): React.ReactElement => {
  const { currentQuestion, answers, setAnswers } = useContext(StudentContext);

  const currentAnswer = useMemo(() => {
    return getCurrentAnswer(currentQuestion, answerIndex, answers);
  }, [currentQuestion, answers, answerIndex]);

  const handleInputChange = (value: number[]) => {
    setAnswers((prevAnswers) => {
      return updateAnswer(answerIndex, currentQuestion, value, prevAnswers);
    });
  };

  return (
    <CheckboxGroup
      onChange={(e) => handleInputChange(e as number[])}
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
