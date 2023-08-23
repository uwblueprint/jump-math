import React from "react";
import { Checkbox, CheckboxGroup, VStack } from "@chakra-ui/react";

import type { MultiOptionData } from "../../../../types/QuestionTypes";

interface MultiSelectInputProps {
  onChange?: (value: string[]) => void;
  value?: string[];
  options: MultiOptionData[] | string[];
  getOption: (option: MultiOptionData | string) => string;
  getOptionValue: (option: MultiOptionData | string, index: number) => string;
}

const MultiSelectInput = ({
  onChange,
  value,
  options,
  getOption,
  getOptionValue,
}: MultiSelectInputProps): React.ReactElement => (
  <CheckboxGroup onChange={onChange} value={value}>
    <VStack alignItems="left" gap={3}>
      {options.map((option, index) => {
        return (
          <Checkbox key={index} size="lg" value={getOptionValue(option, index)}>
            {getOption(option)}
          </Checkbox>
        );
      })}
    </VStack>
  </CheckboxGroup>
);

export default MultiSelectInput;
