import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "@chakra-ui/react";

import { PlusOutlineIcon } from "../../../assets/icons";
import * as Routes from "../../../constants/Routes";

const CreateAssessmentButton = (): React.ReactElement => {
  const history = useHistory();
  return (
    <Button
      my={2}
      onClick={() => history.push(Routes.ASSESSMENT_EDITOR_PAGE({}))}
      rightIcon={<PlusOutlineIcon />}
      variant="primary"
    >
      Create Assessment
    </Button>
  );
};

export default CreateAssessmentButton;
