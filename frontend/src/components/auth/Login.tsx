import React, { useContext, useState } from "react";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { Text, FormControl, FormLabel, Input, Button } from "@chakra-ui/react";

import authAPIClient from "../../APIClients/AuthAPIClient";
import { LOGIN } from "../../APIClients/mutations/AuthMutations";
import { HOME_PAGE, SIGNUP_PAGE } from "../../constants/Routes";
import AuthContext from "../../contexts/AuthContext";
import { AuthenticatedUser } from "../../types/AuthTypes";
import ErrorMessage from "./TeacherSignup/ErrorMessage";
import * as Routes from "../../constants/Routes";
import RouterLink from "../common/RouterLink";
import AuthTemplate from "./AuthTemplate";
import { TEACHER_SIGNUP_IMAGE } from "../../assets/Images";

const Login = (): React.ReactElement => {
  const { authenticatedUser, setAuthenticatedUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const history = useHistory();
  const location = useLocation();
  const isAdmin = location.pathname.includes(Routes.ADMIN_LOGIN);
  const isTeacher = location.pathname.includes(Routes.TEACHER_LOGIN);

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

  /* eslint-disable no-nested-ternary */
  const header = (): string => {
    return isAdmin ? "Admin Login" : isTeacher ? "Teacher Login" : "";
  };

  const fields = (): React.ReactElement => {
    return (
      <>
        <Text textStyle="subtitle2" mb={loginError ? "12px" : "48px"}>
          Enter your login credentials below to continue
        </Text>
        {loginError && (
          <ErrorMessage message="Please ensure fields are filled" />
        )}
        <FormControl textStyle="subtitle2" isRequired>
          <FormLabel color="grey.400">Email Address</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            mb="24px"
            placeholder="Enter Email Address"
          />
          <FormLabel color="grey.400">Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            mb="32px"
            placeholder="Enter Password"
          />
        </FormControl>
        <RouterLink color="blue.300" to="/">
          Forgot Password?
        </RouterLink>
        <Button onClick={onLogInClick} variant="primary" w="full" mb="24px">
          Login
        </Button>

        {isTeacher && (
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
        )}
      </>
    );
  };

  return (
    <AuthTemplate
      title={header()}
      image={TEACHER_SIGNUP_IMAGE}
      fields={fields()}
    />
  );
};

export default Login;
