import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "@chakra-ui/react";

import { ArrowBackOutlineIcon } from "../../assets/icons";

const BackButton = (): React.ReactElement => {
  const history = useHistory();
  return (
    <Button
      leftIcon={<ArrowBackOutlineIcon />}
      onClick={() => history.goBack()}
      size="sm"
      variant="tertiary"
    >
      Back
    </Button>
  );
};

export default BackButton;
