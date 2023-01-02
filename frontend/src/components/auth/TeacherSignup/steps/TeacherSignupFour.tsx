import React from "react";
import PasswordInputs from "../../PasswordInputs";
import { TeacherSignupProps } from "../types";

const TeacherSignupFour = ({
  setPage,
  handleSubmit,
  setValue,
}: TeacherSignupProps): React.ReactElement => {
  return (
    <PasswordInputs
      subtitle="Please set a secure password for your account"
      setValue={setValue}
      callBackFunction={(_) => handleSubmit((data) => console.log(data))}
      onBackClick={() => setPage(3)}
    />
  );
};

export default TeacherSignupFour;
