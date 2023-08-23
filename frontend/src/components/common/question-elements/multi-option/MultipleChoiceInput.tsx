import React from "react";
import { Radio, RadioGroup, VStack } from "@chakra-ui/react";

import type { MultiOptionData } from "../../../../types/QuestionTypes";

interface MultipleChoiceInputProps {
  onChange?: (nextValue: string) => void;
  value: string | undefined;
  options: MultiOptionData[] | string[];
  getOption: (option: MultiOptionData | string) => string;
  getOptionValue: (option: MultiOptionData | string, index: number) => string;
}

const MultipleChoiceInput = ({
  onChange,
  value,
  options,
  getOption,
  getOptionValue,
}: MultipleChoiceInputProps): React.ReactElement => (
  <RadioGroup onChange={onChange} value={value}>
    <VStack alignItems="left" gap={3} ml={5}>
      {options.map((option, index) => {
        return (
          <Radio key={index} size="lg" value={getOptionValue(option, index)}>
            {getOption(option)}
          </Radio>
        );
      })}
    </VStack>
  </RadioGroup>
);

export default MultipleChoiceInput;
