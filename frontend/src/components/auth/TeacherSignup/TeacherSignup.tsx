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
  currentlyTeachingJM: false,
  school: "",
  newSchoolName: "",
  newSchoolCountry: "",
  newSchoolCity: "",
  newSchoolDistrict: "",
  newSchoolAddress: "",
  password: "",
};

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
    formState: { errors },
  } = useForm<TeacherSignupForm>({ defaultValues });
  const [page, setPage] = React.useState(1);

  if (authenticatedUser) return <Redirect to={HOME_PAGE} />;

  return (
    <HStack>
      <Image
        src="https://storage.googleapis.com/staging.jump-math-98edf.appspot.com/teacher-signup.png"
        alt="Teacher-Signup"
        fit="cover"
        width="50%"
        height="100vh"
      />
      <VStack width="50%" height="100vh" padding={6}>
        <Image
          src="https://storage.googleapis.com/jump-math-98edf.appspot.com/jump-math-logo.png"
          alt="Jump-Math-Logo"
          paddingBottom={5}
        />
        <Text textStyle="header4" textAlign="center" pb={4}>
          Teacher Sign Up
        </Text>
        {renderPageComponent(page, { setPage, register, handleSubmit, errors })}
      </VStack>
    </HStack>
  );
};

export default TeacherSignup;
