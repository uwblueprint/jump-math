import React, { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";

import authAPIClient from "../../../APIClients/AuthAPIClient";
import { REGISTER_TEACHER } from "../../../APIClients/mutations/AuthMutations";
import AuthContext from "../../../contexts/AuthContext";
import { AuthenticatedUser } from "../../../types/AuthTypes";
import {
  TeacherSignupForm,
  TeacherSignupProps,
} from "../../../types/TeacherSignupTypes";

import TeacherSignupFive from "./steps/TeacherSignupFive";
import TeacherSignupFour from "./steps/TeacherSignupFour";
import TeacherSignupOne from "./steps/TeacherSignUpOne";
import TeacherSignupThree from "./steps/TeacherSignupThree";
import TeacherSignupTwo from "./steps/TeacherSignupTwo";

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
        [...data.grades],
        data.currentlyTeachingJM ?? false,
        data.school,
        registerTeacher,
      );
    })(e);
  };

  const {
    formState: { errors },
  } = methods; // Retrieve form errors

  return (
    <FormProvider {...methods}>
      {renderPageComponent(page, {
        setPage,
        handleSubmitCallback,
      })}
      {errors?.email && (
        <span style={{ color: "red" }}>Invalid email address</span>
      )}
    </FormProvider>
  );
};

export default TeacherSignup;
