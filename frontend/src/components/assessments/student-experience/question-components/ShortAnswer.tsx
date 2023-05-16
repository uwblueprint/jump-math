import React, { useContext, useMemo } from "react";
import { Input } from "@chakra-ui/react";
import update from "immutability-helper";

import StudentContext from "../../../../contexts/StudentContext";

interface ShortAnswersProps {
  number: number;
}

const ShortAnswer = ({ number }: ShortAnswersProps): React.ReactElement => {
  const { currentQuestion, answers, setAnswers } = useContext(StudentContext);
  const currentAnswer = useMemo(() => {
    const answer = answers.find((a) => a.index === currentQuestion);
    const answerElement = answer?.elements[0].elementAnswers;
    if (answer && answerElement && answerElement.length) {
      return answerElement[0];
    }
    return undefined;
  }, [currentQuestion, answers]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = parseFloat(event.target.value);
    const updatedAnswer = Number.isNaN(input) ? undefined : [input];
    setAnswers((prevAnswers) => {
      return update(prevAnswers, {
        [currentQuestion]: {
          elements: {
            0: {
              elementAnswers: { $set: updatedAnswer ?? [] },
            },
          },
        },
      });
    });
  };

  return (
    <Input
      borderColor="grey.300"
      borderRadius="8px"
      focusBorderColor="grey.300"
      onChange={(e) => handleInputChange(e)}
      placeholder="Write your answer here"
      type="number"
      value={currentAnswer}
      variant="outline"
      width="34%"
    />
  );
};

export default ShortAnswer;
