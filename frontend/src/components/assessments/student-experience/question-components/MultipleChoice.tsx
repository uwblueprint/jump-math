import React, { useContext, useMemo } from "react";
import { Radio, RadioGroup, VStack } from "@chakra-ui/react";
import update from "immutability-helper";

import StudentContext from "../../../../contexts/StudentContext";

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
    const answer = answers.find((a) => a.index === currentQuestion);
    const answerElement = answer?.elements[answerIndex].elementAnswers;
    if (answer && answerElement && answerElement.length) {
      return answerElement[0];
    }
    return undefined;
  }, [currentQuestion, answers, answerIndex]);

  const handleInputChange = (event: string) => {
    const input = parseFloat(event);
    const updatedAnswer = Number.isNaN(input) ? undefined : [input];
    setAnswers((prevAnswers) => {
      return update(prevAnswers, {
        [currentQuestion]: {
          elements: {
            [answerIndex]: {
              elementAnswers: { $set: updatedAnswer ?? [] },
            },
          },
        },
      });
    });
  };

  return (
    <RadioGroup
      onChange={(e) => handleInputChange(e)}
      value={currentAnswer?.toString() || undefined}
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
