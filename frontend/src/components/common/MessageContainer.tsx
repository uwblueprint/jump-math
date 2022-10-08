import React from "react";
import { useHistory } from "react-router-dom";
import { Box, Button, Container, Text } from "@chakra-ui/react";
import IllustrationWrapper from "./IllustrationWrapper";

interface MessageContainerProps {
  illustration: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  subtitle: string;
  paragraph: string;
  textColor: string;
  buttonText: string;
  pageToNavigate: string;
}

const MessageContainer = ({
  illustration,
  subtitle,
  paragraph,
  textColor,
  buttonText,
  pageToNavigate,
}: MessageContainerProps): React.ReactElement => {
  const history = useHistory();
  const navigateTo = () => history.push(pageToNavigate);
  return (
    <Container
      bg="blue.50"
      maxW="3xl"
      pt={32}
      pb={20}
      px={24}
      mx="auto"
      my={10}
      borderRadius="3xl"
      centerContent
    >
      <Box maxW="sm">
        <IllustrationWrapper Illustration={illustration} pb="1.5em" m="auto" />
        <Text textStyle="subtitle1" color={textColor} pb="0.5em">
          {subtitle}
        </Text>
        <Text textStyle="paragraph" color={textColor}>
          {paragraph}
        </Text>
        <Button onClick={navigateTo} mt={10} variant="primary">
          {buttonText}
        </Button>
      </Box>
    </Container>
  );
};

export default MessageContainer;
