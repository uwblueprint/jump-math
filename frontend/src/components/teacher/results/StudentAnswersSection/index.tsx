import React from "react";
import { Flex, Text } from "@chakra-ui/react";

const StudentAnswersSection = () => {
  return (
    <Flex direction="column" gap={6}>
      <Text color="grey.300" textStyle="eyebrow">
        ANSWERS
      </Text>
      <Flex direction="column" gap={10}>
        TBD
      </Flex>
    </Flex>
  );
};

export default StudentAnswersSection;
