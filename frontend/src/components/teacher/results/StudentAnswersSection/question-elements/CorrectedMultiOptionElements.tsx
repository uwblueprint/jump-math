import React, { type ComponentType, type ReactNode } from "react";
import { VStack } from "@chakra-ui/react";

import CorrectedInputWrapper from "./CorrectedInputWrapper";

type CorrectedMultiOptionElementsProps = {
  correctAnswerIndices: number[];
  inputComponent: ComponentType<{
    children: ReactNode;
    isReadOnly: boolean;
    size: string;
    value: string;
    variant: string;
  }>;
  options: string[];
  studentAnswerIndices: number[];
};

const CorrectedMultiOptionElements = ({
  correctAnswerIndices,
  inputComponent,
  options,
  studentAnswerIndices,
}: CorrectedMultiOptionElementsProps) => {
  const studentAnswerSet = new Set(studentAnswerIndices);
  const correctAnswerSet = new Set(correctAnswerIndices);
  const wrongAnswerIndices = new Set(
    studentAnswerIndices.filter((index) => !correctAnswerSet.has(index)),
  );

  const InputComponent = inputComponent;
  return (
    <VStack align="left" gap={1} spacing={0}>
      {options.map((option, index) => (
        <CorrectedInputWrapper
          key={index}
          isUnstyled={
            !correctAnswerSet.has(index) && !studentAnswerSet.has(index)
          }
          isWrongAnswer={wrongAnswerIndices.has(index)}
          p="7px"
        >
          <InputComponent
            isReadOnly
            size="lg"
            value={index.toString()}
            variant="bold"
          >
            {option}
          </InputComponent>
        </CorrectedInputWrapper>
      ))}
    </VStack>
  );
};

export default CorrectedMultiOptionElements;
