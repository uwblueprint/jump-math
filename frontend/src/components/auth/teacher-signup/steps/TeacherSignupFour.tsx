import React from "react";
import { useFormContext } from "react-hook-form";

import { TEACHER_SIGNUP_IMAGE } from "../../../../assets/images";
import type {
  TeacherSignupForm,
  TeacherSignupProps,
} from "../../../../types/TeacherSignupTypes";
import AuthWrapper from "../../AuthWrapper";
import PasswordForm from "../../password/PasswordForm";

const TeacherSignupFour = ({
  setPage,
  handleSubmitCallback,
}: TeacherSignupProps): React.ReactElement => {
  const { setValue, watch } = useFormContext<TeacherSignupForm>();
  const title = "Teacher Sign Up";
  const subtitle = "Please set a secure password for your account";
  const image = TEACHER_SIGNUP_IMAGE;
  const form = (
    <PasswordForm
      handleSubmitCallback={handleSubmitCallback}
      setStep={() => {
        if (watch("school.name")) {
          setPage(3);
        } else {
          setPage(2);
        }
      }}
      setValue={setValue}
      version="TeacherSignup"
    />
  );

  return (
    <AuthWrapper form={form} image={image} subtitle={subtitle} title={title} />
  );
};

export default TeacherSignupFour;
