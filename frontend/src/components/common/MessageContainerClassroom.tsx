import React from "react";
import { Container, Image, Text } from "@chakra-ui/react";

import AddClassroomModal from "../user-management/student/AddClassroomModal";

interface MessageContainerProps {
  image: string;
  paragraphs: string[];
  subtitle: string;
  textColor: string;
}

const MessageContainerClassroom = ({
  image,
  paragraphs,
  textColor,
  subtitle,
}: MessageContainerProps): React.ReactElement => {
  return (
    <Container
      borderRadius="3xl"
      centerContent
      maxW={["80%", "50%"]}
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
      <AddClassroomModal />
    </Container>
  );
};

export default MessageContainerClassroom;
