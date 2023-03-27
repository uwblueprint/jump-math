import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "@chakra-ui/react";

import { PlusOutlineIcon } from "../../../assets/icons";
import { CREATE_ASSESSMENT } from "../../../constants/Routes";

const CreateAssessementButton = (): React.ReactElement => {
  const history = useHistory();
  return (
    <Button
      my={2}
      onClick={() => history.push(CREATE_ASSESSMENT)}
      rightIcon={<PlusOutlineIcon />}
      variant="primary"
    >
      Create Assessment
    </Button>
  );
};

export default CreateAssessementButton;
