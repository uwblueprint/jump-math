/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import { HOME_PAGE } from "../../../constants/Routes";
import AuthContext from "../../../contexts/AuthContext";
import { TeacherSignupForm, TeacherSignupProps } from "./types";
import AuthTemplate from "../AuthTemplate";
import { TEACHER_SIGNUP_IMAGE } from "../../../assets/Images";

import TeacherSignupOne from "./steps/TeacherSignUpOne";
import TeacherSignupTwo from "./steps/TeacherSignupTwo";
import TeacherSignupThree from "./steps/TeacherSignupThree";
import TeacherSignupFour from "./steps/TeacherSignupFour";

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

  const fields = renderPageComponent(page, {
    setPage,
    register,
    handleSubmit,
    watch,
    setValue,
    errors,
  });

  return (
    <AuthTemplate
      title="Teacher Sign Up"
      image={TEACHER_SIGNUP_IMAGE}
      fields={fields}
    />
  );
};

export default TeacherSignup;
