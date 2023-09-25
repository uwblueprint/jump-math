import React from "react";
import { useHistory } from "react-router-dom";
import { Button, Container, Image, Text } from "@chakra-ui/react";
import { type LocationDescriptor } from "history";

interface MessageContainerProps {
  buttonIcon?: React.ReactElement;
  buttonRoute?: LocationDescriptor;
  buttonText?: string;
  onClick?: () => void;
  image: string;
  paragraphs: string[];
  subtitle: string;
  textColor: string;
}

const MessageContainer = ({
  buttonIcon,
  buttonRoute = "",
  buttonText,
  image,
  onClick,
  paragraphs,
  textColor,
  subtitle,
}: MessageContainerProps): React.ReactElement => {
  const history = useHistory();
  return (
    <Container
      borderRadius="3xl"
      centerContent
      maxW={["80%", "50%"]}
      mx="auto"
      my={10}
      py={12}
      textAlign="center"
    >
      <Image m="auto" pb="1.5em" src={image} />
      <Text color={textColor} pb="0.5em" textStyle="subtitle1">
        {subtitle}
      </Text>
      {paragraphs.map((paragraph, i) => (
        <Text
          key={i}
          color={textColor}
          pb={i < paragraphs.length - 1 ? "0.5em" : "0"}
          textStyle="paragraph"
        >
          {paragraph}
        </Text>
      ))}
      {buttonText && (
        <Button
          mt={10}
          onClick={buttonRoute ? () => history.push(buttonRoute) : onClick}
          rightIcon={buttonIcon}
          variant="primary"
        >
          {buttonText}
        </Button>
      )}
    </Container>
  );
};

export default MessageContainer;
