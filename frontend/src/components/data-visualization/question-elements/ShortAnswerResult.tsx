import React from "react";
import { Box, Flex, Progress, Text } from "@chakra-ui/react";

type ShortAnswerResultProps = {
  percentCorrect?: number;
  correctAnswer: number;
};

const ShortAnswerResult = ({
  percentCorrect,
  correctAnswer,
}: ShortAnswerResultProps) => {
  const noResponse = percentCorrect == null;

  return (
    <Box borderRadius={8} borderWidth={1} p={4} w={300}>
      {noResponse ? (
        <Text>No responses to show</Text>
      ) : (
        <Text>view responses</Text>
      )}
      <Flex
        bg="white"
        borderColor="grey.300"
        borderWidth={2}
        fontSize={20}
        gap={2.5}
        h={10}
        p={2}
      >
        <Flex align="center" flex={1}>
          {correctAnswer}
        </Flex>
      </Flex>
      <Progress value={percentCorrect} />
    </Box>
  );
};

export default ShortAnswerResult;
