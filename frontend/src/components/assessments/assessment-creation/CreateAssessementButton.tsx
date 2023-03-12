import React from "react";
import { useHistory } from "react-router-dom";
<<<<<<< HEAD:frontend/src/components/assessments/assessment-creation/CreateAssessementButton.tsx
import { CREATE_ASSESSMENT } from "../../../constants/Routes";
import { PlusOutlineIcon } from "../../../assets/icons";
=======
import { Button } from "@chakra-ui/react";

import { PlusOutlineIcon } from "../../assets/icons";
import { CREATE_ASSESSMENT } from "../../constants/Routes";
>>>>>>> c800334 (add import sorting):frontend/src/components/assessment-creation/CreateAssessementButton.tsx

const CreateAssessementButton = (): React.ReactElement => {
  const history = useHistory();
  const date = new Date();
  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  const formattedDate = date.toLocaleDateString("en-US", options);
  const navigateToCreateAssessmentPage = () =>
    history.push(CREATE_ASSESSMENT, { date: formattedDate });

  return (
    <>
      <Button
        rightIcon={<PlusOutlineIcon />}
        variant="primary"
        my={2}
        onClick={navigateToCreateAssessmentPage}
      >
        Create Assessment
      </Button>
    </>
  );
};

export default CreateAssessementButton;
