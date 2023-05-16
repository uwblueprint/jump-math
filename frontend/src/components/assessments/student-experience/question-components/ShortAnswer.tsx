import React, { useContext } from "react";
import { Input } from "@chakra-ui/react";
import update from "immutability-helper";

import StudentContext from "../../../../contexts/StudentContext";

interface ShortAnswersProps {
  number: number;
}

const ShortAnswer = ({ number }: ShortAnswersProps): React.ReactElement => {
  const { currentQuestion, answers, setAnswers } = useContext(StudentContext);
  const currentAnswer = answers.find(
    (answer) => answer.index === currentQuestion,
  );
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = parseFloat(event.target.value);
    const updatedAnswer = Number.isNaN(input) ? undefined : [input];
    if (updatedAnswer) {
      setAnswers((prevAnswers) => {
        return update(prevAnswers, {
          [currentQuestion]: {
            elements: {
              0: {
                elementAnswers: { $set: updatedAnswer },
              },
            },
          },
        });
      });
    } else {
      setAnswers((prevAnswers) => {
        return update(prevAnswers, {
          [currentQuestion]: {
            elements: {
              0: {
                elementAnswers: { $set: [] },
              },
            },
          },
        });
      });
    }
  };

  const getValue = () => {
    console.log(currentAnswer);
    if (currentAnswer) {
      if (currentAnswer.elements[0]) {
        return currentAnswer.elements[0].elementAnswers[0];
      }
      return undefined;
    }
    return undefined;
  };

  return (
    <Input
      borderColor="grey.300"
      borderRadius="8px"
      focusBorderColor="grey.300"
      onChange={(e) => handleInputChange(e)}
      placeholder="Write your answer here"
      type="number"
      value={getValue()}
      variant="outline"
      width="34%"
    />
  );
};

export default ShortAnswer;
