import React from "react";
import { Text } from "@chakra-ui/react";

const QuestionText = ({ questionText }: { questionText: string }) => {
  return <Text textStyle="subtitle1">{questionText}</Text>;
};

export default QuestionText;
