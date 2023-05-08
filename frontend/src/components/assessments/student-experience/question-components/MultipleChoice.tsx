import React from "react";
import { Radio, RadioGroup, VStack } from "@chakra-ui/react";

const MultipleChoice = ({ options }: { options: string[] }) => {
  return (
    <RadioGroup>
      <VStack alignItems="left" gap={3} ml={5}>
        {options.map((option, index) => {
          return (
            <Radio key={index} size="lg" value={option}>
              {option}
            </Radio>
          );
        })}
      </VStack>
    </RadioGroup>
  );
};

export default MultipleChoice;
