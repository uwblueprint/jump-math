import React from "react";
import { Button } from "@chakra-ui/react";

interface ButtonName {
  name: string;
}
const EditStatusButton = ({ name }: ButtonName): React.ReactElement => {
  return (
    <Button
      color="black"
      fontSize="18px"
      fontWeight="0"
      minWidth="200%"
      size="md"
      textAlign="left"
    >
      {name}
    </Button>
  );
};

export default EditStatusButton;
