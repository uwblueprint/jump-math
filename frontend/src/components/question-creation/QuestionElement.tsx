import React from "react";
import { Text, HStack, Box } from "@chakra-ui/react";
import { DeleteOutlineIcon, HamburgerMenuIcon } from "../../assets/icons";

export interface QuestionElementProps {
  children: React.ReactNode;
  error?: string;
}

const QuestionElement = ({
  children,
  error,
}: QuestionElementProps): React.ReactElement => {
  return (
    <>
      <HStack spacing="6" fontSize="24px" alignItems="flex-start">
        <Box color="grey.300">
          <HamburgerMenuIcon />
        </Box>
        {children}
        <Box color="grey.300" fontSize="24px">
          <DeleteOutlineIcon />
        </Box>
      </HStack>
      {error && <Text color="red.200">{error}</Text>}
    </>
  );
};

export default QuestionElement;
