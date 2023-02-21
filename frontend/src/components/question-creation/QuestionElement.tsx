import React from "react";
import { HStack, Box } from "@chakra-ui/react";
import { DeleteOutlineIcon, HamburgerMenuIcon } from "../../assets/icons";

export interface QuestionElementProps {
  children: React.ReactNode;
}

const QuestionElement = ({
  children,
}: QuestionElementProps): React.ReactElement => {
  return (
    <HStack spacing="6">
      <Box color="grey.300">
        <HamburgerMenuIcon />
      </Box>
      {children}
      <Box color="grey.300">
        <DeleteOutlineIcon />
      </Box>
    </HStack>
  );
};

export default QuestionElement;
