import React from "react";

import { FormLabel } from "@chakra-ui/react";

type InputLabelProps = {
  children: React.ReactNode;
};

const InputLabel = ({ children }: InputLabelProps): React.ReactElement => {
  return (
    <FormLabel
      as="legend"
      color="blue.300"
      mb={0}
      fontSize="20px"
      lineHeight="26px"
    >
      {children}
    </FormLabel>
  );
};

export default InputLabel;
