import React from "react";
import { Checkbox, CheckboxGroup, VStack } from "@chakra-ui/react";

import { stringOrNumberArrayToFloatArray } from "../../../../utils/StudentUtils";

import useAnswerState from "./useAnswerState";

interface MultiSelectProps {
  answerElementIndex: number;
  options: string[];
}

const MultiSelect = ({
  answerElementIndex,
  options,
}: MultiSelectProps): React.ReactElement => {
  const { currentAnswer, updateAnswer } = useAnswerState(answerElementIndex);

  return (
    <CheckboxGroup
      onChange={(e) => updateAnswer(stringOrNumberArrayToFloatArray(e))}
      value={currentAnswer.map(String)}
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
