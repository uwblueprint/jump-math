import { useQuery } from "@apollo/client";
import React from "react";
import { GET_USER_BY_EMAIL } from "../../../APIClients/queries/UserQueries";
import { Role } from "../../../types/AuthTypes";
import LoadingState from "../../common/LoadingState";
import AdminSignupConfirmation from "./AdminSignupConfirmation";
import TeacherSignupConfirmation from "./TeacherSignupConfirmation";

const SignupConfirmation = ({
  email,
}: {
  email: string;
}): React.ReactElement => {
  const [role, setRole] = React.useState<Role | null>(null);
  useQuery(GET_USER_BY_EMAIL, {
    variables: { email },
    onCompleted: (data) => {
      setRole(data.userByEmail.role);
    },
  });

  switch (role) {
    case "Admin":
      return <AdminSignupConfirmation email={email} />;
    case "Teacher":
      return <TeacherSignupConfirmation />;
    default:
      return <LoadingState fullPage />;
  }
};

export default SignupConfirmation;
