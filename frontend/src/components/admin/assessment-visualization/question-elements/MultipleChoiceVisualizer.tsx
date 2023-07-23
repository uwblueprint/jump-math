import React from "react";
import { Radio, RadioGroup } from "@chakra-ui/react";

import MultiOptionVisualizerWrapper from "./MultiOptionVisualizerWrapper";

type MultipleChoiceVisualizerProps = {
  percentCorrectByOption?: number[];
  options: number[];
  correctAnswerIndex: number;
};

const MultipleChoiceVisualizer = ({
  percentCorrectByOption,
  options,
  correctAnswerIndex,
}: MultipleChoiceVisualizerProps) => {
  return (
    <RadioGroup defaultValue={correctAnswerIndex?.toString()}>
      <MultiOptionVisualizerWrapper
        inputComponent={Radio}
        isSelected={(i: number) => i === correctAnswerIndex}
        options={options}
        percentCorrectByOption={percentCorrectByOption}
      />
    </RadioGroup>
  );
};

export default MultipleChoiceVisualizer;
