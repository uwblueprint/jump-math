import React from "react";
import { Checkbox, CheckboxGroup } from "@chakra-ui/react";

import CorrectedMultiOptionElements from "./CorrectedMultiOptionElements";

type CorrectedMultiSelectProps = {
  studentAnswerIndices: number[];
  correctAnswerIndices: number[];
  options: string[];
};

const CorrectedMultiSelect = ({
  studentAnswerIndices,
  correctAnswerIndices,
  options,
}: CorrectedMultiSelectProps) => {
  return (
    <CheckboxGroup defaultValue={studentAnswerIndices.map(String)}>
      <CorrectedMultiOptionElements
        correctAnswerIndices={correctAnswerIndices}
        inputComponent={Checkbox}
        options={options}
        studentAnswerIndices={studentAnswerIndices}
      />
    </CheckboxGroup>
  );
};

export default CorrectedMultiSelect;
