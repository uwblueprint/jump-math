import React from "react";

import { stringToFloat } from "../../../../utils/GeneralUtils";
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
        updateAnswer([wholeNumber, numerator, stringToFloat(e.target.value)])
      }
      onNumeratorChange={(e) =>
        updateAnswer([wholeNumber, stringToFloat(e.target.value), denominator])
      }
      onWholeNumberChange={(e) =>
        updateAnswer([stringToFloat(e.target.value), numerator, denominator])
      }
      wholeNumber={String(wholeNumber ?? "")}
    />
  );
};

export default MixedFraction;
