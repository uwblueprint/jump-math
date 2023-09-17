import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "@chakra-ui/react";

import { ArrowBackOutlineIcon } from "../../../assets/icons";

interface BackButtonProps {
  size?: string;
  text?: string;
  onClick?: () => void;
  returnTo?: string;
}

const BackButton = ({
  onClick,
  returnTo,
  size = "xl",
  text = "",
}: BackButtonProps): React.ReactElement => {
  const history = useHistory();
  return (
    <Button
      leftIcon={text ? <ArrowBackOutlineIcon /> : undefined}
      onClick={
        onClick
          ? onClick
          : () => (returnTo ? history.push(returnTo) : history.goBack())
      }
      size={size}
      variant="tertiary"
    >
      {text || <ArrowBackOutlineIcon />}
    </Button>
  );
};

export default BackButton;
