import React from "react";
import { Center, Text } from "@chakra-ui/react";

const EmailActionError = ({ mode }: { mode: string }): React.ReactElement => {
  const header =
    mode === "verifyEmail"
      ? "Try logging in"
      : "Try resetting your password again";
  const subtitle = `Your request to ${
    mode === "verifyEmail" ? "verify your email" : "reset your password"
  } has expired or the link has already been used.`;

  return (
    <Center flexDirection="column" height="100vh" textAlign="center">
      <Text textStyle="header4">{header}</Text>
      <Text textStyle="subtitle2">{subtitle}</Text>
    </Center>
  );
};

export default EmailActionError;
