import React, { useContext, useState } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { useMutation } from "@apollo/client";
import {
  Flex,
  VStack,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";

import RouterLink from "../common/RouterLink";
import AuthWrapper from "./AuthWrapper";
import * as Routes from "../../constants/Routes";
import authAPIClient from "../../APIClients/AuthAPIClient";
import { LOGIN } from "../../APIClients/mutations/AuthMutations";
import { HOME_PAGE } from "../../constants/Routes";
import { ADMIN_SIGNUP_IMAGE, TEACHER_SIGNUP_IMAGE } from "../../assets/images";
import AuthContext from "../../contexts/AuthContext";
import { AuthenticatedUser } from "../../types/AuthTypes";

const Login = (): React.ReactElement => {
  const { authenticatedUser, setAuthenticatedUser } = useContext(AuthContext);
  const location = useLocation();

  const isAdmin = location.pathname.includes(Routes.ADMIN_LOGIN);
  const isTeacher = location.pathname.includes(Routes.TEACHER_LOGIN);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  const [login] = useMutation<{ login: AuthenticatedUser }>(LOGIN);

  const onLogInClick = async () => {
    if (!(email && password)) {
      setLoginError(true);
      return;
    }
    const user: AuthenticatedUser = await authAPIClient.login(
      email,
      password,
      login,
    );
    setAuthenticatedUser(user);
  };

  if (authenticatedUser) {
    return <Redirect to={HOME_PAGE} />;
  }

  const title = isAdmin ? "Admin Login" : "Teacher Login";
  const subtitle = "Enter your login credentials below to continue";
  const image = isAdmin ? ADMIN_SIGNUP_IMAGE : TEACHER_SIGNUP_IMAGE;
  const form = (
    <VStack width="75%" gap={4}>
      <FormControl isRequired isInvalid={loginError && !email}>
        <FormLabel color="grey.400">Email Address</FormLabel>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email Address"
        />
      </FormControl>

      <FormControl isRequired isInvalid={loginError && !password}>
        <FormLabel color="grey.400">Password</FormLabel>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Password"
        />
      </FormControl>

      {/* TODO: add correct routing */}
      <Flex align="left">
        <RouterLink textAlign="left" color="blue.300" to="/">
          Forgot Password?
        </RouterLink>
      </Flex>
      <Button onClick={onLogInClick} variant="primary" width="100%">
        Login
      </Button>

      {isTeacher && (
        <Text>
          Don&apos;t have an account?{" "}
          <RouterLink
            textDecoration="underline"
            color="blue.300"
            cursor="pointer"
            to={Routes.TEACHER_SIGNUP}
          >
            Sign Up
          </RouterLink>
        </Text>
      )}
    </VStack>
  );
  const error = loginError ? "Please ensure fields are filled" : "";

  return (
    <AuthWrapper
      title={title}
      subtitle={subtitle}
      image={image}
      form={form}
      error={error}
    />
  );
};

export default Login;
