import React from "react";
import { Flex } from "@chakra-ui/react";

type CorrectedTextFieldProps = {
  studentAnswer?: number;
  correctAnswer: number;
};

const CorrectedTextField = ({
  studentAnswer,
  correctAnswer,
}: CorrectedTextFieldProps) => {
  const isWrongAnswer = studentAnswer !== correctAnswer;

  return (
    <Flex
      bg="white"
      borderColor={isWrongAnswer ? "red.200" : "green.400"}
      borderWidth={2}
      fontSize={20}
      gap={2.5}
      h={10}
      p={2}
    >
      {isWrongAnswer && (
        <Flex
          align="center"
          color="red.200"
          textDecoration={studentAnswer && "line-through"}
        >
          {studentAnswer || "No Response"}
        </Flex>
      )}
      <Flex align="center" flex={1}>
        {correctAnswer}
      </Flex>
    </Flex>
  );
};

export default CorrectedTextField;
