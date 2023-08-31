import React from "react";
import { HStack, Text } from "@chakra-ui/react";

interface QuestionTitleProps {
  questionNumber: number;
  pointCount: number;
}

const QuestionTitle = ({
  questionNumber,
  pointCount,
}: QuestionTitleProps): React.ReactElement => {
  return (
    <HStack>
      <Text textStyle="mobileHeader2">Question {questionNumber}</Text>
      <Text textStyle="subtitle1">
        ({pointCount} {pointCount === 1 ? "Point" : "Points"})
      </Text>
    </HStack>
  );
};

export default QuestionTitle;
