import React from "react";

import type { MultiOptionData } from "../../../../types/QuestionTypes";
import { stringOrNumberArrayToFloatArray } from "../../../../utils/StudentUtils";
import MultiSelectInput from "../../../common/question-elements/multi-option/MultiSelectInput";

import useAnswerState from "./useAnswerState";

interface MultiSelectProps {
  answerElementIndex: number;
  options: MultiOptionData[];
}

const MultiSelect = ({
  answerElementIndex,
  options,
}: MultiSelectProps): React.ReactElement => {
  const { currentAnswer, updateAnswer } = useAnswerState(answerElementIndex);

  return (
    <MultiSelectInput
      getOption={(option) => (option as MultiOptionData).value}
      getOptionValue={(_, index) => index.toString()}
      onChange={(e) => updateAnswer(stringOrNumberArrayToFloatArray(e))}
      options={options}
      value={currentAnswer.map(String)}
    />
  );
};

export default MultiSelect;
