import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";

import { VERIFY_EMAIL } from "../../../APIClients/mutations/AuthMutations";
import { GET_USER_BY_EMAIL } from "../../../APIClients/queries/UserQueries";
import type { Role } from "../../../types/AuthTypes";
import LoadingState from "../../common/info/LoadingState";
import AdminSignupConfirmation from "../AdminSignupConfirmation";
import TeacherSignupConfirmation from "../teacher-signup/steps/TeacherSignupConfirmation";

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
    onError() {
      setLoading(false);
    },
  });

  useEffect(() => {
    verifyEmail({ variables: { oobCode } });
  }, [oobCode, verifyEmail]);

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
