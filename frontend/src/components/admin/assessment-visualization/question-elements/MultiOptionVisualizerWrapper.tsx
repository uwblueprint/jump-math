import React from "react";
import { Box, Flex, Progress, Text, VStack } from "@chakra-ui/react";

type MultiOptionVisualizerWrapperProps = {
  percentCorrectByOption?: number[];
  isSelected: (index: number) => boolean;
  inputComponent: React.ComponentType<{
    children: React.ReactNode;
    isReadOnly: true;
    size: string;
    value: string;
    variant: string;
  }>;
  options: number[];
};

const MultiOptionVisualizerWrapper = ({
  percentCorrectByOption,
  isSelected,
  inputComponent,
  options,
}: MultiOptionVisualizerWrapperProps) => {
  const noResponse = percentCorrectByOption == undefined;
  const InputComponent = inputComponent;

  return (
    <>
      {noResponse && (
        <Text color="grey.300" pl={4}>
          No responses to show
        </Text>
      )}
      <VStack align="left" gap={1} spacing={0}>
        {options.map((option, i) => {
          const selected = isSelected(i);
          const color = selected ? "green.300" : "grey.300";
          const fontWeight = selected ? "bold" : "normal";
          return (
            <Box key={i} p={4} w={300}>
              <InputComponent
                isReadOnly
                size="lg"
                value={i.toString()}
                variant="green"
              >
                <Flex
                  color={color}
                  fontWeight={fontWeight}
                  justifyContent="space-between"
                  pb={1}
                  w={235}
                >
                  <Text>{option}</Text>
                  {!noResponse && <Text>{percentCorrectByOption[i]}%</Text>}
                </Flex>
                <Progress
                  max={100}
                  min={0}
                  size="sm"
                  value={noResponse ? undefined : percentCorrectByOption[i]}
                  variant={selected ? "green" : "grey"}
                />
              </InputComponent>
            </Box>
          );
        })}
      </VStack>
    </>
  );
};

export default MultiOptionVisualizerWrapper;
