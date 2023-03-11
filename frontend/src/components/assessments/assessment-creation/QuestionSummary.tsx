import React from "react";
import { Box, Text, HStack, Spacer, VStack } from "@chakra-ui/react";

interface QuestionSummaryProps {
  questionCount: number;
  pointCount: number;
}

const QuestionSummary = ({
  questionCount,
  pointCount,
}: QuestionSummaryProps): React.ReactElement => {
  return (
    <Box
      backgroundColor="rgba(232, 237, 241, 0.2)"
      borderRadius="16px"
      width="33%"
      padding="8"
    >
      <VStack spacing="2" align="left">
        <Text textStyle="subtitle2" color="blue.300" paddingBottom="7">
          Assessment Question Summary
        </Text>
        <HStack>
          <Text textStyle="smallerParagraph">Number of Questions</Text>
          <Spacer />
          <Text>{questionCount}</Text>
        </HStack>
        <HStack>
          <Text textStyle="smallerParagraph">Number of Points</Text>
          <Spacer />
          <Text>{pointCount}</Text>
        </HStack>
      </VStack>
    </Box>
  );
};

export default QuestionSummary;
