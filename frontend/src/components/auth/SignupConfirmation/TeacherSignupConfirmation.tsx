import React from "react";
import TeacherWrapper from "../../common/TeacherWrapper";
import FinalSignupConfirmation from "./FinalSignupConfirmation";

const TeacherSignupConfirmation = (): React.ReactElement => {
  return (
    <TeacherWrapper
      header="Teacher Sign Up Confirmation"
      paddingTop
      component={FinalSignupConfirmation}
    />
  );
};

export default TeacherSignupConfirmation;
