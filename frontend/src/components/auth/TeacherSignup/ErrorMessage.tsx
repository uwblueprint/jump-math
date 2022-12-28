import { Alert, AlertIcon } from "@chakra-ui/react";
import React from "react";

interface ErrorMessageProps {
  message: string;
}
const ErrorMessage = ({ message }: ErrorMessageProps): React.ReactElement => {
  return (
    <Alert status="error" variant="no-background" justifyContent="center">
      <AlertIcon color="red.200" />
      {message}
    </Alert>
  );
};

export default ErrorMessage;
