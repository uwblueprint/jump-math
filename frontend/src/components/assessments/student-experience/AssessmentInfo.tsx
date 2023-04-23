import React from "react";
import { Text, VStack } from "@chakra-ui/react";

import { QuestionComponentResponse } from "../../../APIClients/types/TestClientTypes";
import { QuestionElementType } from "../../../types/QuestionTypes";
import QuestionSummary from "../assessment-creation/QuestionSummary";

import QuestionTypeImages from "./QuestionTypeImages";

interface AssessmentInfoProps {
  questions: QuestionComponentResponse[][];
}

const AssessmentInfo = ({
  questions,
}: AssessmentInfoProps): React.ReactElement => {
  return (
    <QuestionSummary pointCount={10} questionCount={questions.length}>
      <VStack align="left" width="100%">
        <br />
        <Text paddingBottom="2" textStyle="smaller-paragraph">
          Question Types:
        </Text>
        <QuestionTypeImages
          questionTypes={[
            QuestionElementType.MULTIPLE_CHOICE,
            QuestionElementType.MULTI_SELECT,
          ]}
        />
      </VStack>
    </QuestionSummary>
  );
};

export default AssessmentInfo;
