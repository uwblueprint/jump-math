import React from "react";
import {
  Box,
  Text,
  VStack,
  Image,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";

import RouterLink from "../common/RouterLink";
import JumpMathLogo from "../../assets/jump-math-logo.png";

const LandingPage = (): React.ReactElement => {
  return (
    <VStack gap={3}>
      <RouterLink to="jumpmath.org">Back to Home</RouterLink>
      <Box
        p={10}
        width="80%"
        borderColor="grey.200"
        borderWidth="1px"
        borderRadius="12px"
      >
        <Image src={JumpMathLogo} alt="Jump Math Logo" h="100px" />
        <Text textStyle="header4" textAlign="center">
          Welcome to the Online Assessment Platform
        </Text>
        <Text textStyle="subtitle1" textAlign="center">
          To begin, are you a...
        </Text>
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
      </Box>
    </VStack>
  );
};

export default LandingPage;
