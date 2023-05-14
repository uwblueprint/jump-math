import React from "react";
import { Alert, AlertIcon } from "@chakra-ui/react";

interface FormFieldErrorProps {
  message: string;
}
const FormFieldError = ({
  message,
}: FormFieldErrorProps): React.ReactElement => {
  return (
    <Alert justifyContent="center" status="error" variant="no-background">
      <AlertIcon color="red.200" />
      {message}
    </Alert>
  );
};

export default FormFieldError;
