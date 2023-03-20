import React from "react";
import { Center, Text, VStack } from "@chakra-ui/react";

import { SadFaceIcon } from "../../../assets/icons";

interface EmptyStateProps {
  items: string;
}
const EmptyTableState = ({ items }: EmptyStateProps): React.ReactElement => (
  <Center
    borderColor="#DFDFDF"
    borderRadius={0}
    borderWidth="1px"
    flex="1"
    padding={20}
    width="100%"
  >
    <VStack spacing={6} textAlign="center">
      <Text color="grey.300" textStyle="paragraph">
        No {items} match the filter criteria
      </Text>
      <SadFaceIcon />
    </VStack>
  </Center>
);

export default EmptyTableState;
