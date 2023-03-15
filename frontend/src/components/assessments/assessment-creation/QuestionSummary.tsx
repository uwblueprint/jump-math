import React from "react";
import { Box, HStack, Spacer, Text, VStack } from "@chakra-ui/react";

interface QuestionSummaryProps {
  questionCount: number;
  totalPoints: number;
}

const QuestionSummary = ({
  questionCount,
  totalPoints,
}: QuestionSummaryProps): React.ReactElement => {
  return (
    <Box
      backgroundColor="rgba(232, 237, 241, 0.2)"
      borderRadius="16px"
      padding="8"
      width="33%"
    >
      <VStack align="left" spacing="2">
        <Text color="blue.300" paddingBottom="7" textStyle="subtitle2">
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
          <Text>{totalPoints}</Text>
        </HStack>
      </VStack>
    </Box>
  );
};

export default QuestionSummary;
