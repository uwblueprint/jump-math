/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { Image, HStack, Text, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { HOME_PAGE } from "../../../constants/Routes";
import AuthContext from "../../../contexts/AuthContext";
import TeacherSignupOne from "./TeacherSignUpOne";
import { TeacherSignupForm, TeacherSignupProps } from "./types";
import TeacherSignupFour from "./TeacherSignupFour";
import TeacherSignupThree from "./TeacherSignupThree";
import TeacherSignupTwo from "./TeacherSignupTwo";

const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  grades: [],
  currentlyTeachingJM: null,
  school: {
    name: "",
    id: "",
    country: "",
    city: "",
    district: "",
    address: "",
  },
  password: "",
} as TeacherSignupForm;

const renderPageComponent = (
  page: number,
  teacherSignupProps: TeacherSignupProps,
) => {
  switch (page) {
    case 1:
      return <TeacherSignupOne {...teacherSignupProps} />;
    case 2:
      return <TeacherSignupTwo {...teacherSignupProps} />;
    case 3:
      return <TeacherSignupThree {...teacherSignupProps} />;
    case 4:
      return <TeacherSignupFour {...teacherSignupProps} />;
    default:
      return <></>;
  }
};
const TeacherSignup = (): React.ReactElement => {
  const { authenticatedUser } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TeacherSignupForm>({ defaultValues, mode: "onChange" });
  const [page, setPage] = React.useState(1);

  if (authenticatedUser) return <Redirect to={HOME_PAGE} />;

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
        <Text textStyle="header4" textAlign="center" pb={4}>
          Teacher Sign Up
        </Text>
        {renderPageComponent(page, {
          setPage,
          register,
          handleSubmit,
          watch,
          setValue,
          errors,
        })}
      </VStack>
    </HStack>
  );
};

export default TeacherSignup;
