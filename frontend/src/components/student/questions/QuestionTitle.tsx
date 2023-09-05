import React, { useContext } from "react";
import { HStack, Text } from "@chakra-ui/react";

import AssessmentExperienceContext from "../../../contexts/AssessmentExperienceContext";
import {
  getAnswerElements,
  getAnswerElementsTest,
} from "../../../utils/StudentUtils";

const QuestionTitle = (): React.ReactElement => {
  const { questions, currentQuestionIndex } = useContext(
    AssessmentExperienceContext,
  );

  const pointCount = getAnswerElementsTest(
    questions[currentQuestionIndex],
  ).length;

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
