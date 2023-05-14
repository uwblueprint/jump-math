import React from "react";
import { Button } from "@chakra-ui/react";

interface PopoverButtonProps {
  name: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}
const PopoverButton = ({
  name,
  onClick,
}: PopoverButtonProps): React.ReactElement => {
  return (
    <Button
      color="black"
      fontSize="18px"
      fontWeight="0"
      minWidth="200%"
      onClick={onClick}
      size="md"
      textAlign="left"
    >
      {name}
    </Button>
  );
};

export default PopoverButton;
