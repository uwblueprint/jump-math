import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "@chakra-ui/react";

import { ArrowBackOutlineIcon } from "../../assets/icons";

interface BackButtonProps {
  size?: string;
  text?: string;
}

const BackButton = ({
  size = "sm",
  text = "Back",
}: BackButtonProps): React.ReactElement => {
  const history = useHistory();
  return (
    <Button
      leftIcon={<ArrowBackOutlineIcon />}
      onClick={() => history.goBack()}
      size={size || "sm"}
      variant="tertiary"
    >
      {text || "Back"}
    </Button>
  );
};

export default BackButton;
