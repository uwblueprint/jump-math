import React from "react";
import { Button } from "@chakra-ui/react";

interface EditStatusButtonProps {
  "aria-label"?: string;
  name: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}
const EditStatusButton = ({
  name,
  "aria-label": ariaLabel,
  onClick,
}: EditStatusButtonProps): React.ReactElement => {
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

export default EditStatusButton;
