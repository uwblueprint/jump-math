import React from "react";
import { Alert, AlertIcon } from "@chakra-ui/react";

interface WarningToastProps {
  warningMessage: string;
}

const ErrorToast = ({
  warningMessage,
}: WarningToastProps): React.ReactElement => {
  return (
    <Alert status="warning">
      <AlertIcon />
      {warningMessage}
    </Alert>
  );
};

export default ErrorToast;
