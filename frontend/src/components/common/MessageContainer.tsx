import React from "react";
import { useHistory } from "react-router-dom";
import { Button, Container, Image, Text } from "@chakra-ui/react";

interface MessageContainerProps {
  buttonRoute?: string;
  buttonText?: string;
  image: string;
  paragraphs: string[];
  subtitle: string;
  textColor: string;
}

const MessageContainer = ({
  buttonRoute = "",
  buttonText,
  image,
  paragraphs,
  textColor,
  subtitle,
}: MessageContainerProps): React.ReactElement => {
  const history = useHistory();
  return (
    <Container
      borderRadius="3xl"
      centerContent
      maxW="50%"
      mx="auto"
      my={10}
      pt={12}
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
          onClick={() => history.push(buttonRoute)}
          variant="primary"
        >
          {buttonText}
        </Button>
      )}
    </Container>
  );
};

export default MessageContainer;
