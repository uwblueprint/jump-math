/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import AuthContext from "../../../contexts/AuthContext";
import {
  TeacherSignupForm,
  TeacherSignupProps,
} from "../../../types/TeacherSignupTypes";

import { AuthenticatedUser } from "../../../types/AuthTypes";
import { REGISTER_TEACHER } from "../../../APIClients/mutations/AuthMutations";
import authAPIClient from "../../../APIClients/AuthAPIClient";

import TeacherSignupOne from "./steps/TeacherSignUpOne";
import TeacherSignupTwo from "./steps/TeacherSignupTwo";
import TeacherSignupThree from "./steps/TeacherSignupThree";
import TeacherSignupFour from "./steps/TeacherSignupFour";
import TeacherSignupFive from "./steps/TeacherSignupFive";

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
    case 5:
      return <TeacherSignupFive />;
    default:
      return <></>;
  }
};

const TeacherSignup = (): React.ReactElement => {
  const { setAuthenticatedUser } = useContext(AuthContext);
  const methods = useForm<TeacherSignupForm>({
    defaultValues,
    mode: "onChange",
  });
  const [page, setPage] = React.useState(1);
  const [registerTeacher] = useMutation<{ register: AuthenticatedUser }>(
    REGISTER_TEACHER,
    {
      onCompleted(data: { register: AuthenticatedUser }) {
        setAuthenticatedUser(data.register);
        setPage(5);
      },
    },
  );

  const handleSubmitCallback = (e: React.MouseEvent<HTMLButtonElement>) => {
    methods.handleSubmit(async (data: TeacherSignupForm) => {
      await authAPIClient.registerTeacher(
        data.firstName,
        data.lastName,
        data.email,
        data.password,
        data.grades,
        data.currentlyTeachingJM ?? false,
        data.school,
        registerTeacher,
      );
    })(e);
  };

  return (
    <FormProvider {...methods}>
      {renderPageComponent(page, {
        setPage,
        handleSubmitCallback,
      })}
    </FormProvider>
  );
};

export default TeacherSignup;
