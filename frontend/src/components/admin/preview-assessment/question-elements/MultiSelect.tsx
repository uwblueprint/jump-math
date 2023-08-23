import React from "react";

import type {
  MultiData,
  MultiOptionData,
} from "../../../../types/QuestionTypes";
import MultiSelectInput from "../../../common/question-elements/multi-option/MultiSelectInput";

interface MultiSelectProps {
  data: MultiData;
}

const MultiSelect = ({ data }: MultiSelectProps): React.ReactElement => (
  <MultiSelectInput
    getOption={(option) => (option as MultiOptionData).value}
    getOptionValue={(option) => (option as MultiOptionData).id}
    options={data.options}
    value={data.options
      .filter((option) => option.isCorrect)
      .map((option) => option.id)}
  />
);

export default MultiSelect;
