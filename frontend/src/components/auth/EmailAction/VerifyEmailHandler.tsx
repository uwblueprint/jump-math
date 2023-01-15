import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { VERIFY_EMAIL } from "../../../APIClients/mutations/AuthMutations";
import { GET_USER_BY_EMAIL } from "../../../APIClients/queries/UserQueries";
import { Role } from "../../../types/AuthTypes";
import LoadingState from "../../common/LoadingState";
import AdminSignupConfirmation from "../AdminSignupConfirmation";
import TeacherSignupConfirmation from "../TeacherSignup/steps/TeacherSignupConfirmation";
import EmailActionError from "./EmailActionError";

const VerifyEmailHandler = ({
  oobCode,
}: {
  oobCode: string;
}): React.ReactElement => {
  const [emailVerified, setEmailVerified] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [role, setRole] = React.useState<Role | null>(null);

  useQuery(GET_USER_BY_EMAIL, {
    variables: { email },
    onCompleted: (data) => {
      setRole(data.userByEmail.role);
    },
    skip: !!role || !email,
  });

  const [verifyEmail] = useMutation<{ verifyEmail: string }>(VERIFY_EMAIL, {
    onCompleted(data: { verifyEmail: string }) {
      setEmail(data.verifyEmail);
      setEmailVerified(true);
      setLoading(false);
    },
  });

  useEffect(() => {
    const handleVerifyEmail = async () => {
      await verifyEmail({ variables: { oobCode } });
    };

    handleVerifyEmail();
  }, [oobCode]);

  return (
    <>
      {loading && <LoadingState fullPage />}
      {emailVerified && role === "Teacher" && <TeacherSignupConfirmation />}
      {emailVerified && role === "Admin" && (
        <AdminSignupConfirmation email={email} />
      )}
      {!loading && !emailVerified && <EmailActionError mode="verifyEmail" />}
    </>
  );
};
export default VerifyEmailHandler;
