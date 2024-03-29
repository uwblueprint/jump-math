import React from "react";
import { Alert, AlertIcon } from "@chakra-ui/react";

interface FormErrorProps {
  message: string;
}
const FormError = ({ message }: FormErrorProps): React.ReactElement => {
  return (
    <Alert justifyContent="center" status="error" variant="no-background">
      <AlertIcon color="red.200" />
      {message}
    </Alert>
  );
};

export default FormError;
