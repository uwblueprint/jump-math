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
      borderRadius="3xl"
      centerContent
      maxW="3xl"
      mx="auto"
      my={10}
      pt={12}
    >
      <Box maxW="sm" textAlign="center">
        <IllustrationWrapper Illustration={illustration} m="auto" pb="1.5em" />
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
      </Box>
    </Container>
  );
};

export default MessageContainer;
