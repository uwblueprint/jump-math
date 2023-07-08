import React from "react";
import { Radio, RadioGroup, Text } from "@chakra-ui/react";

import CorrectedMultiOptionElements from "./CorrectedMultiOptionElements";

type CorrectedMultipleChoiceProps = {
  correctAnswerIndex: number;
  options: string[];
  statisticallySignificant: boolean;
  performanceByQuestion?: number[];
};

const CorrectedMultipleChoice = ({
  correctAnswerIndex,
  options,
  statisticallySignificant,
  performanceByQuestion,
}: CorrectedMultipleChoiceProps) => {
  return (
    <>
      {!statisticallySignificant && <Text>No responses to show</Text>}
      <RadioGroup defaultValue={correctAnswerIndex.toString()}>
        <CorrectedMultiOptionElements
          correctAnswerIndices={[correctAnswerIndex]}
          inputComponent={Radio}
          options={options}
          performanceByQuestion={performanceByQuestion ?? []}
        />
      </RadioGroup>
    </>
  );
};

export default CorrectedMultipleChoice;
