import type { ReactElement } from "react";
import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";

import { VERIFY_EMAIL } from "../../../APIClients/mutations/AuthMutations";
import { GET_USER_VERIFICATION_STATUS } from "../../../APIClients/queries/UserQueries";
import type { UserVerificationStatus } from "../../../APIClients/types/UserClientTypes";
import LoadingState from "../../common/info/LoadingState";
import AdminSignupConfirmation from "../AdminSignupConfirmation";
import TeacherSignupConfirmation from "../teacher-signup/steps/TeacherSignupConfirmation";

import EmailActionError from "./EmailActionError";

type VerifyEmailHandlerProps = {
  verifyEmailOobCode: string;
  resetPasswordOobCode: string;
  userId: string;
};

const VerifyEmailHandler = ({
  verifyEmailOobCode,
  resetPasswordOobCode,
  userId,
}: VerifyEmailHandlerProps): ReactElement => {
  const [email, setEmail] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);

  const [verifyEmail, { loading: isVerifyLoading }] = useMutation<{
    verifyEmail: string;
  }>(VERIFY_EMAIL, {
    onCompleted(data) {
      setEmail(data.verifyEmail);
      setEmailVerified(true);
    },
  });

  const { loading: isUserQueryLoading } = useQuery<{
    userVerificationStatus: UserVerificationStatus;
  }>(GET_USER_VERIFICATION_STATUS, {
    variables: { id: userId },
    onCompleted: (data) => {
      setEmail(data.userVerificationStatus.email);
      if (data.userVerificationStatus.isVerified) {
        setEmailVerified(true);
      } else {
        verifyEmail({ variables: { oobCode: verifyEmailOobCode } });
      }
    },
  });

  const isLoading = isUserQueryLoading || isVerifyLoading;
  if (isLoading)
    return (
      <LoadingState
        fullPage
        text="Please wait while we check your account..."
      />
    );
  if (!emailVerified) return <EmailActionError mode="verifyEmail" />;

  return resetPasswordOobCode ? (
    <AdminSignupConfirmation
      email={email}
      resetPasswordOobCode={resetPasswordOobCode}
    />
  ) : (
    <TeacherSignupConfirmation />
  );
};
export default VerifyEmailHandler;
