import React from "react";
import { Box, Container, Text } from "@chakra-ui/react";

import IllustrationWrapper from "./IllustrationWrapper";

interface MessageContainerProps {
  illustration: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  subtitle: string;
  paragraphs: string[];
  textColor: string;
}

const MessageContainer = ({
  illustration,
  subtitle,
  paragraphs,
  textColor,
}: MessageContainerProps): React.ReactElement => {
  return (
    <Container
      maxW="3xl"
      pt={12}
      mx="auto"
      my={10}
      borderRadius="3xl"
      centerContent
    >
      <Box maxW="sm" textAlign="center">
        <IllustrationWrapper Illustration={illustration} pb="1.5em" m="auto" />
        <Text textStyle="subtitle1" color={textColor} pb="0.5em">
          {subtitle}
        </Text>
        {paragraphs.map((paragraph, i) => (
          <Text
            key={i}
            textStyle="paragraph"
            color={textColor}
            pb={i < paragraphs.length - 1 ? "0.5em" : "0"}
          >
            {paragraph}
          </Text>
        ))}
      </Box>
    </Container>
  );
};

export default MessageContainer;
