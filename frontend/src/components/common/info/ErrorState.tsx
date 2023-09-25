import React from "react";
import { Center } from "@chakra-ui/react";

import ErrorIllustration from "../../../assets/illustrations/error.svg";

import MessageContainer from "./MessageContainer";

const ErrorState = ({
  fullPage,
}: {
  fullPage?: boolean;
}): React.ReactElement => (
  <Center
    backgroundColor={fullPage ? "" : "blue.50"}
    borderRadius="1rem"
    color="blue.300"
    flex="1"
    height={fullPage ? "100vh" : "auto"}
    minWidth="100%"
    my={fullPage ? 0 : 6}
  >
    <MessageContainer
      image={ErrorIllustration}
      paragraphs={["Please refresh your page and try again"]}
      subtitle="Sorry, something went wrong."
      textColor="blue.300"
    />
  </Center>
);

export default ErrorState;
