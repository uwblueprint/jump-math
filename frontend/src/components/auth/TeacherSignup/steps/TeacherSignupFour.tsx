import React from "react";
import { useFormContext } from "react-hook-form";
import PasswordForm from "../../Password/PasswordForm";
import { TeacherSignupForm, TeacherSignupProps } from "../types";

const TeacherSignupFour = ({
  setPage,
  handleSubmitCallback,
}: TeacherSignupProps): React.ReactElement => {
  const { setValue } = useFormContext<TeacherSignupForm>();

  return (
    <PasswordForm
      version="TeacherSignup"
      subtitle="Please set a secure password for your account"
      setValue={setValue}
      setStep={setPage}
      handleSubmitCallback={handleSubmitCallback}
    />
  );
};

export default TeacherSignupFour;
