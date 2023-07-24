import React from "react";

import type { FractionMetadata } from "../../../../../types/QuestionMetadataTypes";

import CorrectedInputWrapper from "./CorrectedInputWrapper";

type CorrectedFractionProps = {
  studentAnswer?: number[];
  correctAnswer: FractionMetadata;
};

const CorrectedFraction = ({
  studentAnswer,
  correctAnswer,
}: CorrectedFractionProps) => (
  <CorrectedInputWrapper
    isWrongAnswer={
      !studentAnswer ||
      studentAnswer[0] !== correctAnswer.numerator ||
      studentAnswer[1] !== correctAnswer.denominator
    }
    w="34%"
  >
    <>TODO</>
  </CorrectedInputWrapper>
);

export default CorrectedFraction;
