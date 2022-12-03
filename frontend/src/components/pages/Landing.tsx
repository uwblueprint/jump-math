import React from "react";
import { useHistory } from "react-router-dom";
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
import * as Routes from "../../constants/Routes";

import JumpMathLogo from "../../assets/jump-math-logo.png";

const PageLinks = (): React.ReactElement => {
  const history = useHistory();
  const navigateTo = () => history.push(Routes.LOGIN_PAGE);

  return (
    <VStack gap={1.5}>
      <Button onClick={navigateTo} width={300} variant="primary">
        Admin
      </Button>
      <Button onClick={navigateTo} width={300} variant="primary">
        Teacher
      </Button>
      <Button onClick={navigateTo} width={300} variant="primary">
        Student
      </Button>
    </VStack>
  );
};

const Landing = (): React.ReactElement => {
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
            <Text textStyle="header4">
              Welcome to the Online Assessment Platform
            </Text>
            <Text textStyle="subtitle1">To begin, are you a...</Text>
            <PageLinks />
          </VStack>
        </Box>
      </Center>
    </Box>
  );
};

export default Landing;
