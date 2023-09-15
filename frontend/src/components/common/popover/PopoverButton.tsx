import React, { type ReactElement, useContext } from "react";

import type { ActionButtonProps } from "../form/ActionButton";
import ActionButton from "../form/ActionButton";

import { PopoverContext } from "./PopoverContext";

type PopoverButtonProps = ActionButtonProps<false> & {
  name: string;
};
const PopoverButton = ({
  name,
  onClick,
  ...props
}: PopoverButtonProps): ReactElement => {
  const { onClose } = useContext(PopoverContext);

  const handleClick = async () => {
    await onClick();
    onClose();
  };

  return (
    <ActionButton
      color="black"
      fontSize="18px"
      fontWeight="0"
      minWidth="200%"
      onClick={handleClick}
      showDefaultToasts={false}
      size="md"
      textAlign="left"
      {...props}
    >
      {name}
    </ActionButton>
  );
};

export default PopoverButton;
