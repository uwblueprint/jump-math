import React from "react";

import { stringToFloatArray } from "../../../../utils/StudentUtils";
import ShortAnswerInput from "../../../common/question-elements/short-answer/ShortAnswerInput";

import useAnswerState from "./useAnswerState";

interface ShortAnswersProps {
  answerElementIndex: number;
}

const ShortAnswer = ({
  answerElementIndex,
}: ShortAnswersProps): React.ReactElement => {
  const { currentAnswer, updateAnswer } = useAnswerState(answerElementIndex);

  return (
    <ShortAnswerInput
      onChange={(e) => updateAnswer(stringToFloatArray(e.target.value))}
      value={currentAnswer[0] ?? ""}
    />
  );
};

export default ShortAnswer;
