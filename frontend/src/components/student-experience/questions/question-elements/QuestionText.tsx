import React from "react";
import { Text } from "@chakra-ui/react";

interface QuestionTextProps {
  questionText: string;
}
const QuestionText = ({
  questionText,
}: QuestionTextProps): React.ReactElement => {
  return <Text textStyle="subtitle1">{questionText}</Text>;
};

export default QuestionText;
