import React from "react";

import FractionInput from "../../../common/fraction/FractionInput";

import useAnswerState from "./useAnswerState";

interface MixedFractionProps {
  answerElementIndex: number;
}

const MixedFraction = ({
  answerElementIndex,
}: MixedFractionProps): React.ReactElement => {
  const { currentAnswer, updateAnswer } = useAnswerState(answerElementIndex);
  const [wholeNumber, numerator, denominator] = currentAnswer;

  return (
    <FractionInput
      denominator={String(denominator ?? "")}
      numerator={String(numerator ?? "")}
      onDenominatorChange={(e) =>
        updateAnswer([wholeNumber, numerator, Number(e.target.value)])
      }
      onNumeratorChange={(e) =>
        updateAnswer([wholeNumber, Number(e.target.value), denominator])
      }
      onWholeNumberChange={(e) =>
        updateAnswer([Number(e.target.value), numerator, denominator])
      }
      wholeNumber={String(wholeNumber ?? "")}
    />
  );
};

export default MixedFraction;
