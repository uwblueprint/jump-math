import React from "react";
import { Checkbox, CheckboxGroup, VStack } from "@chakra-ui/react";

interface MultiSelectProps {
  options: string[];
}
const MultiSelect = ({ options }: MultiSelectProps): React.ReactElement => {
  return (
    <CheckboxGroup>
      <VStack alignItems="left" gap={3} ml={5}>
        {options.map((option, index) => {
          return (
            <Checkbox key={index} size="lg" value={option}>
              {option}
            </Checkbox>
          );
        })}
      </VStack>
    </CheckboxGroup>
  );
};

export default MultiSelect;
