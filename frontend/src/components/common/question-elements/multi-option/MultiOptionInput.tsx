import React from "react";

import type {
  MultiData,
  MultiOptionData,
} from "../../../../types/QuestionTypes";
import { QuestionElementType } from "../../../../types/QuestionTypes";

import MultipleChoiceInput from "./MultipleChoiceInput";
import MultiSelectInput from "./MultiSelectInput";

interface MultiOptionProps {
  data: MultiData;
  type: QuestionElementType;
}

const MultiOptionInput = ({
  data,
  type,
}: MultiOptionProps): React.ReactElement => {
  const getOption = (option: MultiOptionData | string) =>
    (option as MultiOptionData).value;
  const getOptionValue = (option: MultiOptionData | string) =>
    (option as MultiOptionData).id;

  return type === QuestionElementType.MULTIPLE_CHOICE ? (
    <MultipleChoiceInput
      getOption={getOption}
      getOptionValue={getOptionValue}
      options={data.options}
      value={data.options.find((option) => option.isCorrect)?.id}
    />
  ) : (
    <MultiSelectInput
      getOption={getOption}
      getOptionValue={getOptionValue}
      options={data.options}
      value={data.options
        .filter((option) => option.isCorrect)
        .map((option) => option.id)}
    />
  );
};

export default MultiOptionInput;
