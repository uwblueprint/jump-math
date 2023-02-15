import React from "react";
import { Alert, AlertIcon } from "@chakra-ui/react";

interface ErrorToastProps {
  errorMessage: string;
}

const ErrorToast = ({ errorMessage }: ErrorToastProps): React.ReactElement => {
  return (
    <Alert status="error">
      <AlertIcon />
      {errorMessage}
    </Alert>
  );
};

export default ErrorToast;
