import React from "react";
import {
  Box,
  Center,
  Text,
  Stack,
  VStack,
  Image,
  Button,
  Link,
} from "@chakra-ui/react";

import JumpMathLogo from "../../assets/jump-math-logo.png";

const NavOptions = (): React.ReactElement => (
  <VStack gap={1.5}>
    <Button width={300} variant="primary">
      Admin
    </Button>
    <Button width={300} variant="primary">
      Teacher
    </Button>
    <Button width={300} variant="primary">
      Student
    </Button>
  </VStack>
);

const LandingPage = (): React.ReactElement => {
  return (
    <Box>
      <Stack p={8} pb={20} justifyContent="left">
        <Link textStyle="subtitle2" href="https://jumpmath.org/">
          {"< Back to Home"}
        </Link>
      </Stack>
      <Center>
        <Box
          p={10}
          width="60%"
          borderColor="grey.200"
          borderWidth="1px"
          borderRadius="12px"
        >
          <VStack gap={6}>
            <Image src={JumpMathLogo} alt="Jump Math Logo" h={90} />
            <Text textStyle="header4" textAlign="center">
              Welcome to the Online Assessment Platform
            </Text>
            <Text textStyle="subtitle1" textAlign="center">
              To begin, are you a...
            </Text>
            <NavOptions />
          </VStack>
        </Box>
      </Center>
    </Box>
  );
};

export default LandingPage;
