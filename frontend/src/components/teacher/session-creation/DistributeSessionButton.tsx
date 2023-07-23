import React from "react";
import { Button } from "@chakra-ui/react";

import { PaperPlaneOutlineIcon } from "../../../assets/icons";

const DistributeSessionButton = (): React.ReactElement => {
  return (
    <Button
      leftIcon={<PaperPlaneOutlineIcon />}
      minWidth="10"
      onClick={() => console.log("Distribute assessment.")}
      variant="primary"
    >
      Distribute
    </Button>
  );
};

export default DistributeSessionButton;
