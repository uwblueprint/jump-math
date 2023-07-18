import React from "react";
import { Text } from "@chakra-ui/react";

import { getLetterFromNumber } from "../../../../utils/GeneralUtils";

interface QuestionTextProps {
  index: number | undefined;
  questionText: string;
}
const QuestionText = ({
  index,
  questionText,
}: QuestionTextProps): React.ReactElement => {
  return (
    <Text textStyle="subtitle1">
      {index != undefined && `${getLetterFromNumber(index)}. `} {questionText}
    </Text>
  );
};

export default QuestionText;
