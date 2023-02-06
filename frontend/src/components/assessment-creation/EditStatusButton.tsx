import { Button } from "@chakra-ui/react";
import React from "react";

interface ButtonName {
  buttonName: string;
}
const EditStatusButton = ({ buttonName }: ButtonName): React.ReactElement => {
  return (
    <Button
      fontSize="18px"
      textAlign="left"
      minWidth="200%"
      fontWeight="0"
      color="black"
      size="md"
    >
      {buttonName}
    </Button>
  );
};

export default EditStatusButton;
