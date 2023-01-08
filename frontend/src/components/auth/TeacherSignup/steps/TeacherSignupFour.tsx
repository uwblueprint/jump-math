import React from "react";
import { useFormContext } from "react-hook-form";
import {
  TeacherSignupForm,
  TeacherSignupProps,
} from "../../../../types/TeacherSignupTypes";
import AuthWrapper from "../../AuthWrapper";
import { TEACHER_SIGNUP_IMAGE } from "../../../../assets/images";
import PasswordForm from "../../Password/PasswordForm";

const TeacherSignupFour = ({
  setPage,
  handleSubmitCallback,
}: TeacherSignupProps): React.ReactElement => {
  const { setValue } = useFormContext<TeacherSignupForm>();

  const title = "Teacher Sign Up";
  const subtitle = "Please set a secure password for your account";
  const image = TEACHER_SIGNUP_IMAGE;
  const form = (
    <PasswordForm
      version="TeacherSignup"
      userRole="Teacher"
      setValue={setValue}
      setStep={setPage}
      handleSubmitCallback={handleSubmitCallback}
    />
  );

  return (
    <AuthWrapper title={title} subtitle={subtitle} image={image} form={form} />
  );
};

export default TeacherSignupFour;
