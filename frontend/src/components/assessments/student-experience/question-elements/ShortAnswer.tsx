import React from "react";
import { Input } from "@chakra-ui/react";

import { stringToNumberArray } from "../../../../utils/StudentUtils";

import useAnswerState from "./useAnswerState";

interface ShortAnswersProps {
  answerElementIndex: number;
}

const ShortAnswer = ({
  answerElementIndex,
}: ShortAnswersProps): React.ReactElement => {
  const { currentAnswer, updateAnswer } = useAnswerState(answerElementIndex);

  return (
    <Input
      borderColor="grey.300"
      borderRadius="8px"
      focusBorderColor="grey.300"
      onChange={(e) => updateAnswer(stringToNumberArray(e.target.value))}
      placeholder="Write your answer here"
      type="number"
      value={currentAnswer[0] ?? ""}
      variant="outline"
      width="34%"
    />
  );
};

export default ShortAnswer;
