import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { ArrowBackOutlineIcon } from "../../assets/icons";

const BackButton = (): React.ReactElement => {
  const history = useHistory();
  return (
    <Button
      size="sm"
      variant="tertiary"
      leftIcon={<ArrowBackOutlineIcon />}
      onClick={() => history.goBack()}
    >
      Back
    </Button>
  );
};

export default BackButton;
