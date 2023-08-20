import React from "react";
import { Divider, HStack, VStack } from "@chakra-ui/react";

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
  const isMixedFraction = correctAnswer.wholeNumber !== null;

  let studentAnswerWholeNumber,
    studentAnswerNumerator,
    studentAnswerDenominator;
  if (isMixedFraction) {
    [
      studentAnswerWholeNumber,
      studentAnswerNumerator,
      studentAnswerDenominator,
    ] = studentAnswer ?? [];
  } else {
    [studentAnswerNumerator, studentAnswerDenominator] = studentAnswer ?? [];
  }

  return (
    <CorrectedInputWrapper
      isWrongAnswer={
        !studentAnswer ||
        (isMixedFraction &&
          studentAnswerWholeNumber !== correctAnswer.wholeNumber) ||
        studentAnswerNumerator !== correctAnswer.numerator ||
        studentAnswerDenominator !== correctAnswer.denominator
      }
      w={400}
    >
      <HStack justifyContent="center">
        {isMixedFraction && (
          <CorrectedTextField
            correctAnswer={correctAnswer.wholeNumber as number}
            studentAnswer={studentAnswerWholeNumber}
          />
        )}
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
      </HStack>
    </CorrectedInputWrapper>
  );
};

export default CorrectedFraction;
