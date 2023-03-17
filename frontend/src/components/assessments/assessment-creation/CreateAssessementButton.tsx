import React from "react";
import { Button } from "@chakra-ui/react";

import { PlusOutlineIcon } from "../../../assets/icons";
import { CREATE_ASSESSMENT } from "../../../constants/Routes";
import RouterLink from "../../common/RouterLink";

const CreateAssessementButton = (): React.ReactElement => {
  const date = new Date();
  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  const formattedDate = date.toLocaleDateString("en-US", options);

  return (
    <Button my={2} rightIcon={<PlusOutlineIcon />} variant="primary">
      <RouterLink to={`${CREATE_ASSESSMENT}/${formattedDate}`}>
        Create Assessment
      </RouterLink>
    </Button>
  );
};

export default CreateAssessementButton;
