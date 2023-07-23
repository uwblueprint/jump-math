import React from "react";
import {
  Box,
  Flex,
  Progress,
  Radio,
  RadioGroup,
  Text,
  VStack,
} from "@chakra-ui/react";

type MultipleChoiceVisualizerProps = {
  percentCorrectByOption?: number[];
  options: number[];
  correctAnswerIndex: number;
};

const MultipleChoiceVisualizer = ({
  percentCorrectByOption,
  options,
  correctAnswerIndex,
}: MultipleChoiceVisualizerProps) => {
  const noResponse = percentCorrectByOption == undefined;

  return (
    <RadioGroup defaultValue={correctAnswerIndex?.toString()}>
      {noResponse && (
        <Text color="grey.300" pl={4}>
          No responses to show
        </Text>
      )}
      <VStack align="left" gap={1} spacing={0}>
        {options.map((option, i) => {
          const isSelected = i === correctAnswerIndex;
          const color = isSelected ? "green.300" : "grey.300";
          const fontWeight = isSelected ? "bold" : "normal";
          return (
            <Box key={i} p={4} w={300}>
              <Radio isReadOnly size="lg" value={i.toString()} variant="green">
                <Flex
                  color={color}
                  fontWeight={fontWeight}
                  justifyContent="space-between"
                  pb={1}
                  w={240}
                >
                  <Text>{option}</Text>
                  {!noResponse && <Text>{percentCorrectByOption[i]}%</Text>}
                </Flex>
                <Progress
                  max={100}
                  min={0}
                  size="sm"
                  value={noResponse ? undefined : percentCorrectByOption[i]}
                  variant={isSelected ? "green" : "grey"}
                />
              </Radio>
            </Box>
          );
        })}
      </VStack>
    </RadioGroup>
  );
};

export default MultipleChoiceVisualizer;
