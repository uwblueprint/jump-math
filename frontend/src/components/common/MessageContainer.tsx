import React from "react";
import { useHistory } from "react-router-dom";
import { Box, Button, Container, Text } from "@chakra-ui/react";

interface MessageContainerProps {
  illustration: React.ReactNode;
  subtitle: string;
  paragraphs: string[];
  buttonText: string;
  pageToNavigate: string;
}

const MessageContainer = ({
  illustration,
  subtitle,
  paragraphs,
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
      <Box maxW="md">
        {illustration}
        <Text textStyle="subtitle1">{subtitle}</Text>
        {paragraphs.map((paragraph, index) => (
          <Text key={index} textStyle="paragraph">
            {paragraph}
          </Text>
        ))}
        <Button onClick={navigateTo} mt={10} variant="primary">
          {buttonText}
        </Button>
      </Box>
    </Container>
  );
};

export default MessageContainer;
