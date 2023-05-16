import React, { useContext, useMemo } from "react";
import { HStack, Text } from "@chakra-ui/react";

import StudentContext from "../../../contexts/StudentContext";
import { answerElements } from "../../../utils/StudentUtils";

const QuestionTitle = (): React.ReactElement => {
  const { test, currentQuestion } = useContext(StudentContext);
  const points = useMemo(() => {
    const question = test!.questions[currentQuestion];
    return answerElements(question).length;
  }, [test, currentQuestion]);

  return (
    <HStack>
      <Text textStyle="mobileHeader2">Question {currentQuestion + 1}</Text>
      <Text textStyle="subtitle1">
        ({points} Point{points > 1 ? "s" : ""})
      </Text>
    </HStack>
  );
};

export default QuestionTitle;
