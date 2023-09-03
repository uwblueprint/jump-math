import React, { type ReactElement } from "react";
import { Button } from "@chakra-ui/react";

interface PopverButtonProps {
  "aria-label"?: string;
  name: string;
  onClick: (() => Promise<unknown>) | (() => unknown);
}
const PopverButton = ({
  name,
  "aria-label": ariaLabel,
  onClick,
}: PopverButtonProps): ReactElement => {
  return (
    <Button
      aria-label={ariaLabel}
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

export default PopverButton;
