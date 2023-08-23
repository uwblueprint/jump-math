import React from "react";

import { stringToFloat } from "../../../../utils/GeneralUtils";
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
        updateAnswer([numerator, stringToFloat(e.target.value)])
      }
      onNumeratorChange={(e) =>
        updateAnswer([stringToFloat(e.target.value), denominator])
      }
      wholeNumber={null}
    />
  );
};

export default Fraction;
