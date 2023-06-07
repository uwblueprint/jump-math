import React from "react";
import { Text } from "@chakra-ui/react";

import { getLetterFromNumber } from "../../../../utils/GeneralUtils";

interface QuestionTextProps {
  index: number;
  questionText: string;
}
const QuestionText = ({
  index,
  questionText,
}: QuestionTextProps): React.ReactElement => {
  return (
    <Text textStyle="subtitle1">
      {`${getLetterFromNumber(index)}. ${questionText}`}
    </Text>
  );
};

export default QuestionText;
