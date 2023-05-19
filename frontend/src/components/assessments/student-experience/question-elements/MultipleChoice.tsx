import React from "react";
import { Radio, RadioGroup, VStack } from "@chakra-ui/react";

import { stringToNumberArray } from "../../../../utils/StudentUtils";

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
      onChange={(e) => updateAnswer(stringToNumberArray(e))}
      value={currentAnswer[0]?.toString() ?? ""}
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
