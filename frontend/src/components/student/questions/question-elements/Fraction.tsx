import React from "react";

import FractionInput from "../../../common/fraction/FractionInput";

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
        updateAnswer([numerator, Number(e.target.value)])
      }
      onNumeratorChange={(e) =>
        updateAnswer([Number(e.target.value), denominator])
      }
      wholeNumber={null}
    />
  );
};

export default Fraction;
