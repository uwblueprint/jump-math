import React from "react";
import { Text, VStack } from "@chakra-ui/react";

import type { QuestionComponentResponse } from "../../../APIClients/types/TestClientTypes";
import {
  QuestionElementType,
  ResponseElementType,
} from "../../../types/QuestionTypes";
import QuestionSummary from "../../assessments/assessment-creation/QuestionSummary";

import QuestionTypeImages from "./QuestionTypeImages";

interface AssessmentInfoProps {
  questions: QuestionComponentResponse[][];
}

const AssessmentInfo = ({
  questions,
}: AssessmentInfoProps): React.ReactElement => {
  const totalPointCount = questions
    .flat()
    .filter(
      (question) => question.type === QuestionElementType.QUESTION_TEXT,
    ).length;

  const questionTypes = () => {
    const types: ResponseElementType[] = [];
    Object.values(ResponseElementType).forEach((responseType) => {
      if (questions.flat().some((question) => question.type === responseType)) {
        types.push(responseType);
      }
    });
    return types;
  };

  return (
    <QuestionSummary
      pointCount={totalPointCount}
      questionCount={questions.length}
    >
      <VStack align="left" width="100%">
        <br />
        <Text paddingBottom="2" textStyle="smaller-paragraph">
          Question Types:
        </Text>
        <QuestionTypeImages questionTypes={questionTypes()} />
      </VStack>
    </QuestionSummary>
  );
};

export default AssessmentInfo;
