import React from "react";

import { FormLabel } from "@chakra-ui/react";

const InputLabel = ({ text }: { text: string }): React.ReactElement => {
  return (
    <FormLabel
      as="legend"
      color="blue.300"
      mb={0}
      fontSize="20px"
      lineHeight="26px"
    >
      {text}
    </FormLabel>
  );
};

export default InputLabel;
