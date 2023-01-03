import { HStack, VStack, Image, Text } from "@chakra-ui/react";
import React from "react";

const TeacherWrapper = ({
  header,
  paddingTop,
  component,
}: {
  header: string;
  paddingTop?: boolean;
  component: any;
}): React.ReactElement => {
  return (
    <HStack>
      <Image
        src="https://storage.googleapis.com/jump-math-98edf.appspot.com/teacher-signup.png"
        alt="Teacher-Signup"
        fit="cover"
        width="50%"
        height="120vh"
      />
      <VStack width="50%" padding={6} height="120vh">
        <Image
          src="https://storage.googleapis.com/jump-math-98edf.appspot.com/jump_math_logo_short_ver.png"
          alt="Jump-Math-Logo"
          py={5}
        />
        <Text
          textStyle="header4"
          textAlign="center"
          pt={paddingTop ? "20" : "auto"}
          pb={4}
        >
          {header}
        </Text>
        {component}
      </VStack>
    </HStack>
  );
};

export default TeacherWrapper;
