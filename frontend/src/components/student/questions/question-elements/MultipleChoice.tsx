import React from "react";

import type { MultiOptionData } from "../../../../types/QuestionTypes";
import { stringToFloatArray } from "../../../../utils/StudentUtils";
import MultipleChoiceInput from "../../../common/question-elements/multi-option/MultipleChoiceInput";

import useAnswerState from "./useAnswerState";

interface MultipleChoiceProps {
  answerElementIndex: number;
  options: MultiOptionData[];
}

const MultipleChoice = ({
  answerElementIndex,
  options,
}: MultipleChoiceProps): React.ReactElement => {
  const { currentAnswer, updateAnswer } = useAnswerState(answerElementIndex);

  return (
    <MultipleChoiceInput
      getOption={(option) => (option as MultiOptionData).value}
      getOptionValue={(_, index) => index.toString()}
      onChange={(e) => updateAnswer(stringToFloatArray(e))}
      options={options}
      value={currentAnswer[0]?.toString() ?? ""}
    />
  );
};

export default MultipleChoice;
