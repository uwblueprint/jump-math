import React from "react";
import { Radio, RadioGroup } from "@chakra-ui/react";

import CorrectedMultiOptionElements from "./CorrectedMultiOptionElements";

type CorrectedMultipleChoiceProps = {
  studentAnswerIndex?: number;
  correctAnswerIndex: number;
  options: string[];
};

const CorrectedMultipleChoice = ({
  studentAnswerIndex,
  correctAnswerIndex,
  options,
}: CorrectedMultipleChoiceProps) => {
  return (
    <RadioGroup defaultValue={studentAnswerIndex?.toString()}>
      <CorrectedMultiOptionElements
        correctAnswerIndices={[correctAnswerIndex]}
        inputComponent={Radio}
        options={options}
        studentAnswerIndices={studentAnswerIndex ? [studentAnswerIndex] : []}
      />
    </RadioGroup>
  );
};

export default CorrectedMultipleChoice;
