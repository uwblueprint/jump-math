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
import { JUMP_MATH_LOGO } from "../../assets/images";

const DashboardLinks = (): React.ReactElement => {
  const history = useHistory();
  const navigateToAdminLogin = () => history.push(Routes.ADMIN_LOGIN);
  const navigateToTeacherLogin = () => history.push(Routes.TEACHER_LOGIN);

  return (
    <VStack gap={1.5} mx={2}>
      <Button
        onClick={navigateToAdminLogin}
        width={{ base: "10em", md: "20em" }}
        variant="primary"
      >
        Admin
      </Button>
      <Button
        onClick={navigateToTeacherLogin}
        width={{ base: "10em", md: "20em" }}
        variant="primary"
      >
        Teacher
      </Button>
      {/* TODO: change to navigateToStudentPage */}
      <Button
        onClick={navigateToTeacherLogin}
        width={{ base: "10em", md: "20em" }}
        variant="primary"
      >
        Student
      </Button>
    </VStack>
  );
};

const Landing = (): React.ReactElement => {
  return (
    <Box>
      <Stack p={8} justifyContent="left">
        <Link
          _hover={{ color: "blue.200", textDecoration: "none" }}
          textStyle="subtitle2"
          href="https://jumpmath.org/"
        >
          {"< Back to Home"}
        </Link>
      </Stack>
      <Center pt={10} pb={24}>
        <Box
          p={10}
          width="60%"
          borderColor="grey.200"
          borderWidth="1px"
          borderRadius="12px"
        >
          <VStack gap={6}>
            <Image src={JUMP_MATH_LOGO.src} alt={JUMP_MATH_LOGO.alt} h={90} />
            <Text textStyle="header4" textAlign="center">
              Welcome to the Online Assessment Platform
            </Text>
            <Text textStyle="subtitle1">To begin, are you a...</Text>
            <DashboardLinks />
          </VStack>
        </Box>
      </Center>
    </Box>
  );
};

export default Landing;
