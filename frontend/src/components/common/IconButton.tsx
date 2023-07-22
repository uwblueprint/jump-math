import React from "react";
import { Box, Button, IconButton as ChakraIconButton } from "@chakra-ui/react";

interface IconButtonProps {
  color: string;
  hoverColor: string;
  onClick: () => void;
  icon: React.ReactElement;
}

const IconButton = ({
  onClick,
  color,
  hoverColor,
  icon,
}: IconButtonProps): React.ReactElement => {
  return (
    <Box _hover={{ color: hoverColor }} color={color}>
      <Button
        as={ChakraIconButton}
        color="currentColor"
        fontSize="24px"
        icon={icon}
        onClick={onClick}
        size="icon"
      />
    </Box>
  );
};

export default IconButton;
