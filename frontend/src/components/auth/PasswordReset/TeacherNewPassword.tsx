import React, { useState } from "react";
import {
  Text,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  HStack,
  Image,
} from "@chakra-ui/react";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { RESET_PASSWORD } from "../../../APIClients/mutations/AuthMutations";
import ErrorMessage from "../TeacherSignup/ErrorMessage";
import { TEACHER_LOGIN_PAGE } from "../../../constants/Routes";
import PasswordInputs from "../PasswordInputs";

const TeacherNewPassword = ({
  oobCode,
}: {
  oobCode: string;
}): React.ReactElement => {
  const [step, setStep] = useState(1);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [resetPassword] = useMutation<{ resetPassword: boolean }>(
    RESET_PASSWORD,
  );
  const history = useHistory();

  const onResetPasswordClick = async () => {};

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
        {step === 1 && (
          <>
            <Text textStyle="header4" textAlign="center" pb={4}>
              Set New Password
            </Text>
            <PasswordInputs
              subtitle="Please ensure that your new password is different than your old one"
              callBackFunction={(pwd) => {
                // confirmPasswordReset(oobCode, pwd)
              }}
              firstPage
              onBackClick={() => history.push(TEACHER_LOGIN_PAGE)}
            />
          </>
        )}
        {step === 2 && (
          <>
            <Text textStyle="header4" textAlign="center" pb={4}>
              Password Reset Successful
            </Text>
            <VStack>
              <Text textStyle="subtitle2" textAlign="center">
                Your password has been successfully reset
                <br />
                Click below to log in
              </Text>
              <Button
                variant="primary"
                width="100%"
                onClick={() => history.push(TEACHER_LOGIN_PAGE)}
              >
                Continue
              </Button>
            </VStack>
          </>
        )}
      </VStack>
    </HStack>
  );
};

export default TeacherNewPassword;
