import React, { useContext, useState } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { Text, FormControl, FormLabel, Input, Button } from "@chakra-ui/react";

import RouterLink from "../common/RouterLink";
import AuthWrapper from "./AuthWrapper";
import * as Routes from "../../constants/Routes";
import authAPIClient from "../../APIClients/AuthAPIClient";
import { LOGIN } from "../../APIClients/mutations/AuthMutations";
import { HOME_PAGE } from "../../constants/Routes";
import { ADMIN_SIGNUP_IMAGE, TEACHER_SIGNUP_IMAGE } from "../../assets/images";
import AuthContext from "../../contexts/AuthContext";
import { AuthenticatedUser } from "../../types/AuthTypes";
import ForgotPassword from "./ForgotPassword";

const Login = (): React.ReactElement => {
  const { authenticatedUser, setAuthenticatedUser } = useContext(AuthContext);
  const location = useLocation();

  const isAdmin = location.pathname.includes(Routes.ADMIN_LOGIN);
  const isTeacher = location.pathname.includes(Routes.TEACHER_LOGIN);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  const [forgotPassword, setForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [forgotPasswordError, setForgotPasswordError] = useState(false);
  const [emailNotFoundError, setEmailNotFoundError] = useState(false);
  const [forgotPasswordStep, setForgotPasswordStep] = useState(1);

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

  let title: string;
  let subtitle: string;
  if (forgotPassword) {
    if (forgotPasswordStep === 1) {
      title = "Forgot Password?";
      subtitle = "Don’t worry about it, we will send you instructions!";
    } else {
      title = "Check your email";
      subtitle = `We sent a password reset link to ${forgotPasswordEmail}`;
    }
  } else {
    title = isAdmin ? "Admin Login" : "Teacher Login";
    subtitle = "Enter your login credentials below to continue";
  }

  const image = isAdmin ? ADMIN_SIGNUP_IMAGE : TEACHER_SIGNUP_IMAGE;
  const loginForm = (
    <>
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

      <Button
        onClick={() => setForgotPassword(true)}
        textAlign="left"
        color="blue.300"
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
            textDecoration="underline"
            color="blue.300"
            cursor="pointer"
            to={Routes.TEACHER_SIGNUP}
          >
            Sign Up
          </RouterLink>
        </Text>
      )}
    </>
  );

  let error: string;
  if (emailNotFoundError) {
    error = "Email is not in our database. Please re-enter it.";
  } else if (forgotPasswordError || loginError) {
    error = "Please ensure fields are filled";
  } else {
    error = "";
  }

  return (
    <AuthWrapper
      title={title}
      subtitle={subtitle}
      image={image}
      form={
        forgotPassword ? (
          <ForgotPassword
            role={isAdmin ? "Admin" : "Teacher"}
            hasError={forgotPasswordError || emailNotFoundError}
            email={forgotPasswordEmail}
            step={forgotPasswordStep}
            setEmail={setForgotPasswordEmail}
            setEmailError={setForgotPasswordError}
            setEmailNotFoundError={setEmailNotFoundError}
            setStep={setForgotPasswordStep}
          />
        ) : (
          loginForm
        )
      }
      error={error}
    />
  );
};

export default Login;
