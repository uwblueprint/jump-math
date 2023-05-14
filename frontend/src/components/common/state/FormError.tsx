import React from "react";
import { Alert, AlertIcon } from "@chakra-ui/react";

interface FormErrorProps {
  message: string;
}

const FormError = ({ message }: FormErrorProps): React.ReactElement => {
  return (
    <Alert status="error">
      <AlertIcon />
      {message}
    </Alert>
  );
};

export default FormError;
