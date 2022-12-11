import React, { useContext, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import {
  Box,
  Flex,
  Image,
  Text,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Button,
} from "@chakra-ui/react";

import authAPIClient from "../../APIClients/AuthAPIClient";
import { LOGIN } from "../../APIClients/mutations/AuthMutations";
import { HOME_PAGE, SIGNUP_PAGE } from "../../constants/Routes";
import AuthContext from "../../contexts/AuthContext";
import { AuthenticatedUser } from "../../types/AuthTypes";
import JumpMathLogo from "../../assets/jump-math-logo.png";
import KidsPicture from "../../assets/group-kids.png";
import { AlertCircle } from "../../assets/icons";

const Login = (): React.ReactElement => {
  const { authenticatedUser, setAuthenticatedUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const history = useHistory();

  const [login] = useMutation<{ login: AuthenticatedUser }>(LOGIN);

  const onLogInClick = async () => {
    if (!(email && password)) {
      setLoginError("Please ensure fields are filled");
      return;
    }
    const user: AuthenticatedUser = await authAPIClient.login(
      email,
      password,
      login,
    );

    setAuthenticatedUser(user);
  };

  const onSignUpClick = () => {
    history.push(SIGNUP_PAGE);
  };

  if (authenticatedUser) {
    return <Redirect to={HOME_PAGE} />;
  }

  return (
    <Flex h="100vh">
      <Box w="50%">
        <Image src={KidsPicture} />
      </Box>
      <Flex w="50%" justifyContent="center">
        <Flex
          direction="column"
          alignItems="center"
          justifyContent="center"
          maxWidth="450px"
        >
          <Image src={JumpMathLogo} alt="Jump Math Logo" w="296px" mb="24px" />
          <Text textStyle="header4" mb="24px">
            Admin Login
          </Text>
          <Text textStyle="subtitle2" mb={loginError ? "12px" : "48px"}>
            Enter your login credentials below to continue
          </Text>
          {loginError && (
            <Flex alignItems="center" pb="12px">
              <AlertCircle />{" "}
              <Text color="red.200" pl="5px">
                Please ensure fields are filled
              </Text>
            </Flex>
          )}
          <FormControl textStyle="subtitle2" isRequired>
            <Flex>
              <Text textStyle="subtitle2">Email Address</Text>
              <FormLabel />
            </Flex>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              mb="24px"
              placeholder="Enter Jump Math email address"
              variant="filled"
            />
            <Flex>
              <Text textStyle="subtitle2">Password</Text>
              <FormLabel />
            </Flex>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              mb="32px"
              placeholder="Enter Password"
              variant="filled"
            />
          </FormControl>
          <Checkbox
            colorScheme="gray"
            defaultChecked
            mb="24px"
            alignSelf="start"
          >
            <Text textStyle="paragraph">Remember me</Text>
          </Checkbox>
          <Button onClick={onLogInClick} variant="primary" w="full" mb="24px">
            Login
          </Button>
          {loginError ? (
            <Text onClick={onSignUpClick}>
              Don&apos;t have an account?{" "}
              <Text
                as="u"
                onClick={onSignUpClick}
                color="blue.300"
                cursor="pointer"
              >
                Sign Up
              </Text>
            </Text>
          ) : (
            <Text color="blue.300">Forgot Password?</Text>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Login;
