import React from "react";

import { TEACHER_SIGNUP_IMAGE } from "../../../../assets/images";
import AuthWrapper from "../../AuthWrapper";

const TeacherSignupFive = (): React.ReactElement => {
  const title = "Teacher Sign Up Confirmation";
  const subtitle =
    "Please check your inbox for a confirmation email so that you are able to login";
  const image = TEACHER_SIGNUP_IMAGE;

  return <AuthWrapper image={image} subtitle={subtitle} title={title} />;
};

export default TeacherSignupFive;
