import React, { useContext } from "react";
import { HStack, Text } from "@chakra-ui/react";

import StudentContext from "../../../contexts/StudentContext";
import { answerElements } from "../../../utils/StudentUtils";

const QuestionTitle = (): React.ReactElement => {
  const { test, currentQuestionIndex } = useContext(StudentContext);
  const pointCount = answerElements(test?.questions[currentQuestionIndex] ?? [])
    .length;

  return (
    <HStack>
      <Text textStyle="mobileHeader2">Question {currentQuestionIndex + 1}</Text>
      <Text textStyle="subtitle1">
        ({pointCount} {pointCount === 1 ? "Point" : "Points"})
      </Text>
    </HStack>
  );
};

export default QuestionTitle;
