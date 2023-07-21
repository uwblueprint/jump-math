import React, { type ReactElement } from "react";
import { HStack, Spacer, Text } from "@chakra-ui/react";

type QuestionTitleProps = {
  currentQuestionIndex: number;
  pointsAchieved: number;
  pointsPossible: number;
};

const QuestionTitle = ({
  currentQuestionIndex,
  pointsAchieved,
  pointsPossible,
}: QuestionTitleProps): ReactElement => (
  <HStack mb={6}>
    <Text textStyle="mobileHeader2">Question {currentQuestionIndex + 1}</Text>
    <Spacer />
    <Text textStyle="mobileEyebrow">
      {pointsPossible === 0
        ? "NOT GRADED"
        : `${pointsAchieved}/${pointsPossible} ${
            pointsPossible === 1 ? "MARK" : "MARKS"
          }`}
    </Text>
  </HStack>
);

export default QuestionTitle;
