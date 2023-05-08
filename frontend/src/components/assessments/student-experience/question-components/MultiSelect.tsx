import React from "react";
import { Checkbox, CheckboxGroup, VStack } from "@chakra-ui/react";

const MultiSelect = ({ options }: { options: string[] }) => {
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
