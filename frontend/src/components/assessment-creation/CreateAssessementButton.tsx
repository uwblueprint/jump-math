import React from "react";
import { Button } from "@chakra-ui/react";
import { PlusOutlineIcon } from "../../assets/icons";

const CreateAssessementButton = (): React.ReactElement => {
  return (
    <>
      <Button rightIcon={<PlusOutlineIcon />} variant="primary" my={2}>
        Create Assessment
      </Button>
    </>
  );
};

export default CreateAssessementButton;
