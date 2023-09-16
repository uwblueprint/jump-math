import React, { type ReactElement } from "react";

import type { ActionButtonProps } from "../form/ActionButton";
import ActionButton from "../form/ActionButton";

type PopoverButtonProps = ActionButtonProps<false> & {
  name: string;
};
const PopoverButton = ({
  name,
  ...props
}: PopoverButtonProps): ReactElement => {
  return (
    <ActionButton
      fontSize="18px"
      fontWeight="0"
      minWidth="200%"
      showDefaultToasts={false}
      size="md"
      variant="popover"
      {...props}
    >
      {name}
    </ActionButton>
  );
};

export default PopoverButton;
