import { Button } from "@chakra-ui/react";
import React from "react";

interface ButtonName {
  name: string;
}
const EditStatusButton = ({ name }: ButtonName): React.ReactElement => {
  return (
    <Button
      fontSize="18px"
      textAlign="left"
      minWidth="200%"
      fontWeight="0"
      color="black"
      size="md"
    >
      {name}
    </Button>
  );
};

export default EditStatusButton;
