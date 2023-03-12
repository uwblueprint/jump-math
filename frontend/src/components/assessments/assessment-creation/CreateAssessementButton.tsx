import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "@chakra-ui/react";

import { PlusOutlineIcon } from "../../../assets/icons";
import { CREATE_ASSESSMENT } from "../../../constants/Routes";

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
        my={2}
        onClick={navigateToCreateAssessmentPage}
        rightIcon={<PlusOutlineIcon />}
        variant="primary"
      >
        Create Assessment
      </Button>
    </>
  );
};

export default CreateAssessementButton;
