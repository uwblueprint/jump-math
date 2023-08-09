import React from "react";
import { Divider, VStack } from "@chakra-ui/react";

import type { FractionMetadata } from "../../../../../types/QuestionMetadataTypes";

import CorrectedInputWrapper from "./CorrectedInputWrapper";
import CorrectedTextField from "./CorrectedTextField";

type CorrectedFractionProps = {
  studentAnswer?: (number | undefined)[];
  correctAnswer: FractionMetadata;
};

const CorrectedFraction = ({
  studentAnswer,
  correctAnswer,
}: CorrectedFractionProps) => {
  const [studentAnswerNumerator, studentAnswerDenominator] =
    studentAnswer ?? [];

  return (
    <CorrectedInputWrapper
      isWrongAnswer={
        !studentAnswer ||
        studentAnswerNumerator !== correctAnswer.numerator ||
        studentAnswerDenominator !== correctAnswer.denominator
      }
      w={400}
    >
      <VStack alignItems="center">
        <CorrectedTextField
          correctAnswer={correctAnswer.numerator}
          studentAnswer={studentAnswerNumerator}
        />
        <Divider borderBottomWidth="2px" borderColor="grey.300" />
        <CorrectedTextField
          correctAnswer={correctAnswer.denominator}
          studentAnswer={studentAnswerDenominator}
        />
      </VStack>
    </CorrectedInputWrapper>
  );
};

export default CorrectedFraction;
