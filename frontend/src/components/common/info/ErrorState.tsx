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
    height={fullPage ? "100vh" : "100%"}
    minWidth="100%"
    pb={14}
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
