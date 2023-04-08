import React, { useContext, useState } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { Button, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";

import authAPIClient from "../../APIClients/AuthAPIClient";
import { LOGIN } from "../../APIClients/mutations/AuthMutations";
import { ADMIN_SIGNUP_IMAGE, TEACHER_SIGNUP_IMAGE } from "../../assets/images";
import * as Routes from "../../constants/Routes";
import { HOME_PAGE } from "../../constants/Routes";
import AuthContext from "../../contexts/AuthContext";
import { AuthenticatedUser } from "../../types/AuthTypes";
import RouterLink from "../common/RouterLink";

import ForgotPassword from "./reset-password/ForgotPassword";
import AuthWrapper from "./AuthWrapper";

const Login = (): React.ReactElement => {
  const { authenticatedUser, setAuthenticatedUser } = useContext(AuthContext);
  const location = useLocation();

  const isAdmin = location.pathname.includes(Routes.ADMIN_LOGIN_PAGE);
  const isTeacher = location.pathname.includes(Routes.TEACHER_LOGIN_PAGE);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const [forgotPassword, setForgotPassword] = useState(false);

  const [login] = useMutation<{ login: AuthenticatedUser }>(LOGIN);

  const onLogInClick = async () => {
    setLoginError(false);
    setErrorMessage(false);

    if (!(email && password)) {
      setLoginError(true);
      return;
    }

    try {
      const user: AuthenticatedUser = await authAPIClient.login(
        email,
        password,
        login,
      );
      setAuthenticatedUser(user);
    } catch (error) {
      setErrorMessage(true);
    }
  };

  if (authenticatedUser) {
    return <Redirect to={HOME_PAGE} />;
  }

  const title = isAdmin ? "Admin Login" : "Teacher Login";
  const subtitle = "Enter your login credentials below to continue";
  const image = isAdmin ? ADMIN_SIGNUP_IMAGE : TEACHER_SIGNUP_IMAGE;
  const form = (
    <>
      <FormControl isInvalid={loginError && !email} isRequired>
        <FormLabel color="grey.400">Email Address</FormLabel>
        <Input
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email Address"
          type="email"
          value={email}
        />
      </FormControl>

      <FormControl isInvalid={loginError && !password} isRequired>
        <FormLabel color="grey.400">Password</FormLabel>
        <Input
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Password"
          type="password"
          value={password}
        />
      </FormControl>

      <Button
        color="blue.300"
        onClick={() => setForgotPassword(true)}
        textAlign="left"
      >
        Forgot Password?
      </Button>
      <Button onClick={onLogInClick} variant="primary" width="100%">
        Login
      </Button>

      {isTeacher && (
        <Text>
          Don&apos;t have an account?{" "}
          <RouterLink
            color="blue.300"
            cursor="pointer"
            textDecoration="underline"
            to={Routes.TEACHER_SIGNUP_PAGE}
          >
            Sign Up
          </RouterLink>
        </Text>
      )}
    </>
  );

  let error = "";
  if (loginError) {
    error = "Please ensure fields are filled";
  }

  if (errorMessage) {
    error = "Failed to login";
  }

  if (forgotPassword) return <ForgotPassword isAdmin={isAdmin} />;
  return (
    <AuthWrapper
      error={error}
      form={form}
      image={image}
      subtitle={subtitle}
      title={title}
    />
  );
};

export default Login;
