import { Alert, AlertIcon } from "@chakra-ui/react";
import React from "react";

interface FormErrorProps {
  message: string;
}
const FormError = ({ message }: FormErrorProps): React.ReactElement => {
  return (
    <Alert status="error" variant="no-background" justifyContent="center">
      <AlertIcon color="red.200" />
      {message}
    </Alert>
  );
};

export default FormError;
