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
}: CorrectedFractionProps) => (
  <CorrectedInputWrapper
    isWrongAnswer={
      !studentAnswer ||
      studentAnswer[0] !== correctAnswer.numerator ||
      studentAnswer[1] !== correctAnswer.denominator
    }
    w={400}
  >
    <VStack alignItems="center">
      <CorrectedTextField
        correctAnswer={correctAnswer.numerator}
        studentAnswer={studentAnswer?.[0]}
      />
      <Divider borderBottomWidth="2px" borderColor="grey.300" />
      <CorrectedTextField
        correctAnswer={correctAnswer.denominator}
        studentAnswer={studentAnswer?.[1]}
      />
    </VStack>
  </CorrectedInputWrapper>
);

export default CorrectedFraction;
