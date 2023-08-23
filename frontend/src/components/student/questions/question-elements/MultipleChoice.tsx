import React from "react";

import { stringToNumberArray } from "../../../../utils/StudentUtils";
import MultipleChoiceInput from "../../../common/question-elements/multi-option/MultipleChoiceInput";

import useAnswerState from "./useAnswerState";

interface MultipleChoiceProps {
  answerElementIndex: number;
  options: string[];
}

const MultipleChoice = ({
  answerElementIndex,
  options,
}: MultipleChoiceProps): React.ReactElement => {
  const { currentAnswer, updateAnswer } = useAnswerState(answerElementIndex);

  return (
    <MultipleChoiceInput
      getOption={(option) => option as string}
      getOptionValue={(_, index) => index.toString()}
      onChange={(e) => updateAnswer(stringToNumberArray(e))}
      options={options}
      value={currentAnswer[0]?.toString() ?? ""}
    />
  );
};

export default MultipleChoice;
