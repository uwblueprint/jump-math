import React from "react";
import { useHistory } from "react-router-dom";
import {
  Box,
  Button,
  Center,
  Image,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";

import { JUMP_MATH_LOGO } from "../../assets/images";
import * as Routes from "../../constants/Routes";
import usePageTitle from "../auth/usePageTitle";

const DashboardLinks = (): React.ReactElement => {
  const history = useHistory();
  const navigateToAdminLogin = () => history.push(Routes.ADMIN_LOGIN_PAGE);
  const navigateToTeacherLogin = () => history.push(Routes.TEACHER_LOGIN_PAGE);
  const navigateToStudentLogin = () => history.push(Routes.STUDENT_LOGIN_PAGE);

  return (
    <VStack gap={1.5} mx={2}>
      <Button
        onClick={navigateToAdminLogin}
        variant="primary"
        width={{ base: "10em", md: "20em" }}
      >
        Admin
      </Button>
      <Button
        onClick={navigateToTeacherLogin}
        variant="primary"
        width={{ base: "10em", md: "20em" }}
      >
        Teacher
      </Button>
      <Button
        onClick={navigateToStudentLogin}
        variant="primary"
        width={{ base: "10em", md: "20em" }}
      >
        Student
      </Button>
    </VStack>
  );
};

const Landing = (): React.ReactElement => {
  usePageTitle("Welcome");

  return (
    <VStack align="start" alignItems="stretch" height="100vh">
      <Link
        _hover={{ color: "blue.200", textDecoration: "none" }}
        href="https://jumpmath.org/"
        justifyContent="left"
        p={8}
        textStyle="subtitle2"
      >
        {"< Back to Home"}
      </Link>
      <Center flex="1" pb={24}>
        <Box
          borderColor="grey.200"
          borderRadius="12px"
          borderWidth="1px"
          p={10}
          width="60%"
        >
          <VStack gap={6}>
            <Image alt={JUMP_MATH_LOGO.alt} h={90} src={JUMP_MATH_LOGO.src} />
            <Text textAlign="center" textStyle="header4">
              Welcome to the Online Assessment Platform
            </Text>
            <Text textStyle="subtitle1">To begin, are you a...</Text>
            <DashboardLinks />
          </VStack>
        </Box>
      </Center>
    </VStack>
  );
};

export default Landing;
