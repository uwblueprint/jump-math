import { Text } from "@chakra-ui/react";
import React from "react";
import { AlertCircleFilledIcon } from "../../common/icons";

interface ErrorMessageProps {
  message: string;
}
const ErrorMessage = ({ message }: ErrorMessageProps): React.ReactElement => {
  return (
    <Text textStyle="mobileSubtitle1" color="red.200">
      <AlertCircleFilledIcon />
      &nbsp;{message}
    </Text>
  );
};

export default ErrorMessage;
