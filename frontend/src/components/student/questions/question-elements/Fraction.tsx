import React from "react";

import { stringToNumberArray } from "../../../../utils/StudentUtils";
import FractionWrapper from "../../../common/FractionWrapper";

import useAnswerState from "./useAnswerState";

interface FractionProps {
  answerElementIndex: number;
}

const Fraction = ({
  answerElementIndex,
}: FractionProps): React.ReactElement => {
  const { currentAnswer, updateAnswer } = useAnswerState(answerElementIndex);

  return (
    <FractionWrapper
      denominator={String(currentAnswer[1] ?? "")}
      numerator={String(currentAnswer[0] ?? "")}
      onDenominatorChange={(e) =>
        updateAnswer(
          [currentAnswer[0]].concat(stringToNumberArray(e.target.value)),
        )
      }
      onNumeratorChange={(e) =>
        updateAnswer(
          stringToNumberArray(e.target.value).concat(currentAnswer[1]),
        )
      }
    />
  );
};

export default Fraction;
