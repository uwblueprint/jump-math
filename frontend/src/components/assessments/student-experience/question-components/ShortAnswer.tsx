import React, { useContext } from "react";
import { Input } from "@chakra-ui/react";
import update from "immutability-helper";

import StudentContext from "../../../../contexts/StudentContext";

interface ShortAnswersProps {
  number: number;
}

const ShortAnswer = ({ number }: ShortAnswersProps): React.ReactElement => {
  const { currentQuestion, setAnswers } = useContext(StudentContext);
  return (
    <Input
      borderColor="grey.300"
      borderRadius="8px"
      focusBorderColor="grey.300"
      onChange={(e) => console.log(e)}
      placeholder="Write your answer here"
      type="number"
      variant="outline"
      width="34%"
    />
  );
};

export default ShortAnswer;
