import React from "react";

import { stringToNumberArray } from "../../../../utils/StudentUtils";
import FractionInput from "../../../common/question-elements/fraction/FractionInput";

import useAnswerState from "./useAnswerState";

interface FractionProps {
  answerElementIndex: number;
}

const Fraction = ({
  answerElementIndex,
}: FractionProps): React.ReactElement => {
  const { currentAnswer, updateAnswer } = useAnswerState(answerElementIndex);
  const [numerator, denominator] = currentAnswer;

  return (
    <FractionInput
      denominator={String(denominator ?? "")}
      numerator={String(numerator ?? "")}
      onDenominatorChange={(e) =>
        updateAnswer([numerator].concat(stringToNumberArray(e.target.value)))
      }
      onNumeratorChange={(e) =>
        updateAnswer(stringToNumberArray(e.target.value).concat(denominator))
      }
    />
  );
};

export default Fraction;
