import React from "react";

import type {
  MultiData,
  MultiOptionData,
} from "../../../../types/QuestionTypes";
import MultipleChoiceInput from "../../../common/question-elements/multi-option/MultipleChoiceInput";

interface MultipleChoiceProps {
  data: MultiData;
}

const MultipleChoice = ({ data }: MultipleChoiceProps): React.ReactElement => (
  <MultipleChoiceInput
    getOption={(option) => (option as MultiOptionData).value}
    getOptionValue={(option) => (option as MultiOptionData).id}
    options={data.options}
    value={data.options.find((option) => option.isCorrect)?.id}
  />
);

export default MultipleChoice;
