import React, { type ReactElement } from "react";

import NotFound from "../../pages/NotFound";

import ResetPasswordHandler from "./ResetPasswordHandler";
import VerifyEmailHandler from "./VerifyEmailHandler";

const EmailActionHandler = (): ReactElement => {
  const urlParams = new URLSearchParams(window.location.search);
  const verifyEmailOobCode = urlParams.get("verifyEmailOobCode") ?? "";
  const resetPasswordOobCode = urlParams.get("resetPasswordOobCode") ?? "";
  const userId = urlParams.get("userId") ?? "";

  if (verifyEmailOobCode && userId)
    return (
      <VerifyEmailHandler
        resetPasswordOobCode={resetPasswordOobCode}
        userId={userId}
        verifyEmailOobCode={verifyEmailOobCode}
      />
    );
  if (resetPasswordOobCode && !verifyEmailOobCode)
    return <ResetPasswordHandler oobCode={resetPasswordOobCode} />;
  return <NotFound />;
};

export default EmailActionHandler;
