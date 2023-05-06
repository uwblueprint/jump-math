import React from "react";
import { Box, Stack, Text } from "@chakra-ui/react";

interface AssessmentRulesProps {
  body: string;
}

const AssessmentRules = ({
  body,
}: AssessmentRulesProps): React.ReactElement => {
  return (
    <Box
      backgroundColor="rgba(232, 237, 241, 0.2)"
      borderRadius="10px"
      padding="2em"
    >
      <Text color="blue.300" marginBottom="3" textStyle="subtitle2">
        Rules
      </Text>
      <Stack gap={3}>
        <Text textStyle="paragraph">{body}</Text>
      </Stack>
    </Box>
  );
};

export default AssessmentRules;
