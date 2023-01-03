import { VStack, Text, Button, Image, HStack } from "@chakra-ui/react";
import React from "react";
import { useHistory } from "react-router-dom";
import { LOGIN_PAGE } from "../../../constants/Routes";

const TeacherSignupConfirmation = (): React.ReactElement => {
  const history = useHistory();

  return (
    <HStack>
      <Image
        src="https://storage.googleapis.com/jump-math-98edf.appspot.com/teacher-signup.png"
        alt="Teacher-Signup"
        fit="cover"
        width="50%"
        height="100vh"
      />
      <VStack width="50%" height="100vh" padding={6}>
        <Image
          src="https://storage.googleapis.com/jump-math-98edf.appspot.com/jump_math_logo_short_ver.png"
          alt="Jump-Math-Logo"
          py={5}
        />
        <VStack pt={28}>
          <Text textStyle="header4" textAlign="center" pb={4}>
            Teacher Sign Up Confirmation
          </Text>
          <Text textStyle="subtitle2" textAlign="center" pb={8}>
            You have finalized your account credientials!
            <br />
            Use the link below to login
          </Text>
          {/* TODO: Update to teacher login page */}
          <Button
            variant="primary"
            width="100%"
            onClick={() => history.push(LOGIN_PAGE)}
          >
            Login
          </Button>
        </VStack>
      </VStack>
    </HStack>
  );
};

export default TeacherSignupConfirmation;
