import React from "react";
import {
  Input,
  Checkbox,
  Spacer,
  Box,
  Button,
  IconButton,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { DeleteOutlineIcon } from "../../../../../assets/icons";

const MultipleChoiceOption = (): React.ReactElement => {
  return (
    <VStack alignItems="left" width="100%" spacing="3">
      <HStack>
        <Input placeholder="Select Input" width="50%" />
        <Spacer />
        <Box color="grey.300" _hover={{ color: "blue.100" }}>
          <Button
            as={IconButton}
            icon={<DeleteOutlineIcon />}
            color="currentColor"
            fontSize="24px"
            size="icon"
          />
        </Box>
      </HStack>
      <Checkbox>Mark as Correct Answer</Checkbox>
    </VStack>
  );
};

export default MultipleChoiceOption;
