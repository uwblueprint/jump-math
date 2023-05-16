import React, { useContext, useMemo } from "react";
import { Input } from "@chakra-ui/react";
import update from "immutability-helper";

import StudentContext from "../../../../contexts/StudentContext";

interface ShortAnswersProps {
  answerIndex: number;
}

const ShortAnswer = ({
  answerIndex,
}: ShortAnswersProps): React.ReactElement => {
  const { currentQuestion, answers, setAnswers } = useContext(StudentContext);
  const currentAnswer = useMemo(() => {
    const answer = answers.find((a) => a.index === currentQuestion);
    const answerElement = answer?.elements[answerIndex].elementAnswers;
    if (answer && answerElement && answerElement.length) {
      return answerElement[0];
    }
    return undefined;
  }, [currentQuestion, answers, answerIndex]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = parseFloat(event.target.value);
    const updatedAnswer = Number.isNaN(input) ? undefined : [input];
    setAnswers((prevAnswers) => {
      return update(prevAnswers, {
        [currentQuestion]: {
          elements: {
            [answerIndex]: {
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
