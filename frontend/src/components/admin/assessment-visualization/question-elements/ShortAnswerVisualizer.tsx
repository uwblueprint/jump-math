import React from "react";
import { Box, Flex, Progress, Text } from "@chakra-ui/react";

type ShortAnswerVisualizerProps = {
  percentCorrect?: number;
  correctAnswer: number;
};

const ShortAnswerVisualizer = ({
  percentCorrect,
  correctAnswer,
}: ShortAnswerVisualizerProps) => {
  const noResponse = percentCorrect == undefined;

  return (
    <Box p={4} w={300}>
      {noResponse ? (
        <Text color="grey.300">No responses to show</Text>
      ) : (
        <Text color="blue.300" textAlign="right" textStyle="link">
          view responses
        </Text>
      )}
      <Flex
        bg="white"
        borderColor="grey.300"
        borderWidth={2}
        fontSize={20}
        gap={2.5}
        h={10}
        my={3}
        p={2}
      >
        <Flex align="center" flex={1}>
          {correctAnswer}
        </Flex>
      </Flex>
      <Progress
        max={100}
        min={0}
        size="sm"
        value={percentCorrect}
        variant="green"
      />
      {!noResponse && (
        <Flex justifyContent="space-between">
          <Text color="green.300">
            <strong>{percentCorrect}%</strong> answered correctly
          </Text>
          <Text color="grey.300">{100 - percentCorrect}%</Text>
        </Flex>
      )}
    </Box>
  );
};

export default ShortAnswerVisualizer;
