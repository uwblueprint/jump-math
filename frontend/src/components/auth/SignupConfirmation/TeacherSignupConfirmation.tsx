import React from "react";
import { TEACHER_SIGNUP_IMAGE } from "../../../assets/images";
import AuthWrapper from "../AuthWrapper";
import FinalSignupConfirmation from "./FinalSignupConfirmation";

const TeacherSignupConfirmation = (): React.ReactElement => {
  return (
    <AuthWrapper
      title="Teacher Sign Up Confirmation"
      image={TEACHER_SIGNUP_IMAGE}
      form={<FinalSignupConfirmation />}
    />
  );
};

export default TeacherSignupConfirmation;
