import React, { useContext, useState } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { useLazyQuery, useMutation } from "@apollo/client";
import { Button, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";

import authAPIClient from "../../APIClients/AuthAPIClient";
import { LOGIN } from "../../APIClients/mutations/AuthMutations";
import { GET_SCHOOL_BY_TEACHER_ID } from "../../APIClients/queries/SchoolQueries";
import type { SchoolResponse } from "../../APIClients/types/SchoolClientTypes";
import { ADMIN_SIGNUP_IMAGE, TEACHER_SIGNUP_IMAGE } from "../../assets/images";
import * as Routes from "../../constants/Routes";
import { HOME_PAGE } from "../../constants/Routes";
import AuthContext from "../../contexts/AuthContext";
import type {
  AuthenticatedTeacher,
  VerifiableUser,
} from "../../types/AuthTypes";
import ActionButton from "../common/form/ActionButton";
import BackButton from "../common/navigation/BackButton";
import RouterLink from "../common/navigation/RouterLink";

import ForgotPassword from "./reset-password/ForgotPassword";
import AuthWrapper from "./AuthWrapper";
import UnverifiedUsers from "./UnverifiedUsers";
import usePageTitle from "./usePageTitle";

const Login = (): React.ReactElement => {
  const { authenticatedUser, setAuthenticatedUser } = useContext(AuthContext);
  const location = useLocation();

  const isAdmin = location.pathname.includes(Routes.ADMIN_LOGIN_PAGE);
  const isTeacher = location.pathname.includes(Routes.TEACHER_LOGIN_PAGE);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invalidFormError, setInvalidFormError] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const [forgotPassword, setForgotPassword] = useState(false);
  const [unverifiedUser, setUnverifiedUser] = useState(false);

  const [login] = useMutation<{
    login: VerifiableUser;
  }>(LOGIN);

  const [getSchool] = useLazyQuery<{
    schoolByTeacherId: Partial<SchoolResponse>;
  }>(GET_SCHOOL_BY_TEACHER_ID);

  const onLogInClick = async () => {
    setInvalidFormError(false);
    setLoginError(false);

    if (!(email && password)) {
      setInvalidFormError(true);
      return;
    }

    try {
      const user: VerifiableUser | null = await authAPIClient.login(
        email,
        password,
        login,
      );
      if (user?.emailVerified === false) {
        setUnverifiedUser(true);
        return;
      }
      if (user?.role === "Teacher") {
        const { data } = await getSchool({
          variables: { teacherId: user.id },
        });
        const school = data?.schoolByTeacherId.id ?? "";
        setAuthenticatedUser({ ...user, school } as AuthenticatedTeacher);
      } else {
        setAuthenticatedUser(user);
      }
    } catch (error) {
      setLoginError(true);
    }
  };

  const title = isAdmin ? "Admin Login" : "Teacher Login";
  const subtitle = "Enter your login credentials below to continue";
  const image = isAdmin ? ADMIN_SIGNUP_IMAGE : TEACHER_SIGNUP_IMAGE;
  const form = (
    <>
      <FormControl isInvalid={invalidFormError && !email} isRequired>
        <FormLabel color="grey.400">Email Address</FormLabel>
        <Input
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email Address"
          type="email"
          value={email}
        />
      </FormControl>

      <FormControl isInvalid={invalidFormError && !password} isRequired>
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
      <ActionButton
        onClick={onLogInClick}
        showDefaultToasts={false}
        variant="primary"
        width="100%"
      >
        Login
      </ActionButton>

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

      <BackButton size="md" text="Back to Home" />
    </>
  );

  let error = "";
  if (invalidFormError) {
    error = "Please ensure fields are filled";
  }

  if (loginError) {
    error = "Failed to login";
  }

  usePageTitle(title);

  if (authenticatedUser) return <Redirect to={HOME_PAGE} />;
  if (forgotPassword) return <ForgotPassword isAdmin={isAdmin} />;
  if (unverifiedUser) return <UnverifiedUsers email={email} />;
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
