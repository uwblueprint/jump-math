import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "@chakra-ui/react";

import { ArrowBackOutlineIcon } from "../../../assets/icons";

interface BackButtonProps {
  size?: string;
  text?: string;
  returnTo?: string;
}

const BackButton = ({
  returnTo,
  size = "sm",
  text = "Back",
}: BackButtonProps): React.ReactElement => {
  const history = useHistory();
  return (
    <Button
      leftIcon={text ? <ArrowBackOutlineIcon /> : undefined}
      onClick={() => (returnTo ? history.push(returnTo) : history.goBack())}
      size={size}
      variant="tertiary"
    >
      {text || <ArrowBackOutlineIcon />}
    </Button>
  );
};

export default BackButton;
