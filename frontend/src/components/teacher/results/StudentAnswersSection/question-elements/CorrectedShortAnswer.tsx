import React from "react";

import CorrectedInputWrapper from "./CorrectedInputWrapper";
import CorrectedTextField from "./CorrectedTextField";

type CorrectedShortAnswerProps = {
  studentAnswer?: number;
  correctAnswer: number;
};

const CorrectedShortAnswer = ({
  studentAnswer,
  correctAnswer,
}: CorrectedShortAnswerProps) => (
  <CorrectedInputWrapper
    isWrongAnswer={studentAnswer !== correctAnswer}
    w={400}
  >
    <CorrectedTextField
      correctAnswer={correctAnswer}
      studentAnswer={studentAnswer}
    />
  </CorrectedInputWrapper>
);

export default CorrectedShortAnswer;
