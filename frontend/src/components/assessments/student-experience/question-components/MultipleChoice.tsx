import React from "react";
import { Radio, RadioGroup, VStack } from "@chakra-ui/react";

import useAnswerState from "./useAnswerState";

interface MultipleChoiceProps {
  answerElementIndex: number;
  options: string[];
}

const MultipleChoice = ({
  answerElementIndex,
  options,
}: MultipleChoiceProps): React.ReactElement => {
  const { currentAnswer, updateAnswer } = useAnswerState(answerElementIndex);

  return (
    <RadioGroup
      onChange={(e) => updateAnswer(e)}
      value={currentAnswer.length > 0 ? currentAnswer[0].toString() : ""}
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
