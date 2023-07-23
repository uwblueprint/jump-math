import React from "react";
import { Checkbox, CheckboxGroup } from "@chakra-ui/react";

import MultiOptionVisualizerWrapper from "./MultiOptionVisualizerWrapper";

type MultiSelectVisualizerProps = {
  percentCorrectByOption?: number[];
  options: number[];
  correctAnswerIndices: number[];
};

const MultiSelectVisualizer = ({
  percentCorrectByOption,
  options,
  correctAnswerIndices,
}: MultiSelectVisualizerProps) => {
  return (
    <CheckboxGroup defaultValue={correctAnswerIndices.map(String)}>
      <MultiOptionVisualizerWrapper
        inputComponent={Checkbox}
        isSelected={(i: number) => correctAnswerIndices.includes(i)}
        options={options}
        percentCorrectByOption={percentCorrectByOption}
      />
    </CheckboxGroup>
  );
};

export default MultiSelectVisualizer;
