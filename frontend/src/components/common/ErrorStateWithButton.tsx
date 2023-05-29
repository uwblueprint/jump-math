import React from "react";
import { Center } from "@chakra-ui/react";

import MessageContainer from "./MessageContainer";

type ErrorStateWithButtonProps = {
  buttonText: string;
  image: string;
  onClick?: () => void;
  paragraphs: string[];
  subtitle: string;
};

const ErrorStateWithButton = ({
  buttonText,
  image,
  onClick,
  paragraphs,
  subtitle,
}: ErrorStateWithButtonProps): React.ReactElement => {
  return (
    <Center
      backgroundColor="blue.50"
      borderRadius="1rem"
      color="blue.300"
      minWidth="100%"
      pb={14}
    >
      <MessageContainer
        buttonText={buttonText}
        image={image}
        onClick={onClick}
        paragraphs={paragraphs}
        subtitle={subtitle}
        textColor="blue.300"
      />
    </Center>
  );
};

export default ErrorStateWithButton;
