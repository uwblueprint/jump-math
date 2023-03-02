import React from "react";
import { Button } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { CREATE_ASSESSMENT } from "../../constants/Routes";
import { PlusOutlineIcon } from "../../assets/icons";

const CreateAssessementButton = (): React.ReactElement => {
  const history = useHistory();
  const date = new Date();
  const options = { month: "long", day: "numeric", year: "numeric" };
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
