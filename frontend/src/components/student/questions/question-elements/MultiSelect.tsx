import React from "react";

import { stringOrNumberArrayToNumberArray } from "../../../../utils/StudentUtils";
import MultiSelectInput from "../../../common/question-elements/multi-option/MultiSelectInput";

import useAnswerState from "./useAnswerState";

interface MultiSelectProps {
  answerElementIndex: number;
  options: string[];
}

const MultiSelect = ({
  answerElementIndex,
  options,
}: MultiSelectProps): React.ReactElement => {
  const { currentAnswer, updateAnswer } = useAnswerState(answerElementIndex);

  return (
    <MultiSelectInput
      getOption={(option) => option as string}
      getOptionValue={(_, index) => index.toString()}
      onChange={(e) => updateAnswer(stringOrNumberArrayToNumberArray(e))}
      options={options}
      value={currentAnswer.map(String)}
    />
  );
};

export default MultiSelect;
