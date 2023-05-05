import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "@chakra-ui/react";

import { PlusOutlineIcon } from "../../../assets/icons";
import { CREATE_ASSESSMENT_PAGE } from "../../../constants/Routes";

const CreateAssessmentButton = (): React.ReactElement => {
  const history = useHistory();
  return (
    <Button
      my={2}
      onClick={() => history.push(CREATE_ASSESSMENT_PAGE)}
      rightIcon={<PlusOutlineIcon />}
      variant="primary"
    >
      Create Assessment
    </Button>
  );
};

export default CreateAssessmentButton;
