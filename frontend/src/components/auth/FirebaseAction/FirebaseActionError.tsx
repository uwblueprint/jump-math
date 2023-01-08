import { Center, Text } from "@chakra-ui/react";
import React from "react";

const FirebaseActionError = ({
  mode,
}: {
  mode: string;
}): React.ReactElement => {
  const header =
    mode === "verifyEmail"
      ? "Try verifying your email again"
      : "Try resetting your password again";
  const subtitle =
    mode === "verifyEmail"
      ? "Your request to verify your email has expired or the link has already been used."
      : "Your request to reset your password has expired or the link has already been used.";

  return (
    <Center height="100vh" flexDirection="column" textAlign="center">
      <Text textStyle="header4">{header}</Text>
      <Text textStyle="subtitle2">{subtitle}</Text>
    </Center>
  );
};

export default FirebaseActionError;
