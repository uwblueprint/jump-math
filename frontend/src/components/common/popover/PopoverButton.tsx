import React, { type ReactElement } from "react";

import type { ActionButtonProps } from "../form/ActionButton";
import ActionButton from "../form/ActionButton";

type PopverButtonProps = ActionButtonProps & {
  name: string;
};
const PopverButton = ({ name, ...props }: PopverButtonProps): ReactElement => {
  return (
    <ActionButton
      color="black"
      fontSize="18px"
      fontWeight="0"
      minWidth="200%"
      showDefaultToasts={false}
      size="md"
      textAlign="left"
      {...props}
    >
      {name}
    </ActionButton>
  );
};

export default PopverButton;
