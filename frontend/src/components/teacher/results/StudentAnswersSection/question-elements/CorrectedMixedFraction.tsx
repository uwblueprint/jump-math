import React from "react";
import { Divider, HStack, VStack } from "@chakra-ui/react";

import type { FractionMetadata } from "../../../../../types/QuestionMetadataTypes";

import CorrectedInputWrapper from "./CorrectedInputWrapper";
import CorrectedTextField from "./CorrectedTextField";

type CorrectedMixedFractionProps = {
  studentAnswer?: (number | undefined)[];
  correctAnswer: FractionMetadata;
};

const CorrectedMixedFraction = ({
  studentAnswer,
  correctAnswer,
}: CorrectedMixedFractionProps) => {
  const [
    studentAnswerWholeNumber,
    studentAnswerNumerator,
    studentAnswerDenominator,
  ] = studentAnswer ?? [];

  return (
    <CorrectedInputWrapper
      isWrongAnswer={
        !studentAnswer ||
        studentAnswerWholeNumber !== correctAnswer.wholeNumber ||
        studentAnswerNumerator !== correctAnswer.numerator ||
        studentAnswerDenominator !== correctAnswer.denominator
      }
      w={400}
    >
      <HStack justifyContent="center">
        <CorrectedTextField
          correctAnswer={correctAnswer.wholeNumber as number}
          studentAnswer={studentAnswerWholeNumber}
        />
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

export default CorrectedMixedFraction;
