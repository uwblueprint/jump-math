/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { Image, HStack, Text, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { HOME_PAGE } from "../../../constants/Routes";
import AuthContext from "../../../contexts/AuthContext";
import { TeacherSignupForm, TeacherSignupProps } from "./types";

import TeacherSignupOne from "./steps/TeacherSignUpOne";
import TeacherSignupTwo from "./steps/TeacherSignupTwo";
import TeacherSignupThree from "./steps/TeacherSignupThree";
import TeacherSignupFour from "./steps/TeacherSignupFour";
import NotFound from "../../pages/NotFound";
import TeacherWrapper from "../../common/TeacherWrapper";

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
      return <NotFound />;
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
    <TeacherWrapper
      header="Teacher Sign Up"
      component={renderPageComponent(page, {
        setPage,
        register,
        handleSubmit,
        watch,
        setValue,
        errors,
      })}
    />
  );
};

export default TeacherSignup;
