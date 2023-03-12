import React from "react";

import AuthWrapper from "../../AuthWrapper";
import { TEACHER_SIGNUP_IMAGE } from "../../../../assets/images";

const TeacherSignupFive = (): React.ReactElement => {
  const title = "Teacher Sign Up Confirmation";
  const subtitle =
    "Please check your inbox for a confirmation email so that you are able to login";
  const image = TEACHER_SIGNUP_IMAGE;

  return <AuthWrapper title={title} subtitle={subtitle} image={image} />;
};

export default TeacherSignupFive;
