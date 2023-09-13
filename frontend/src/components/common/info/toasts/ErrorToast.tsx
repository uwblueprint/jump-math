import React, { type ReactElement } from "react";
import { Alert, AlertIcon, type AlertProps } from "@chakra-ui/react";

type ErrorToastProps = AlertProps & {
  errorMessage: string;
};

const ErrorToast = ({
  errorMessage,
  ...props
}: ErrorToastProps): ReactElement => {
  return (
    <Alert {...props} status="error">
      <AlertIcon />
      {errorMessage}
    </Alert>
  );
};

export default ErrorToast;
