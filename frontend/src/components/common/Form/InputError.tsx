import React from "react";

import { FormErrorMessage } from "@chakra-ui/react";

type InputErrorProps = {
  children: React.ReactNode;
};

const InputError = ({ children }: InputErrorProps): React.ReactElement => {
  return (
    <FormErrorMessage color="red.200" fontSize="18px" fontWeight="400">
      {children}
    </FormErrorMessage>
  );
};

export default InputError;
