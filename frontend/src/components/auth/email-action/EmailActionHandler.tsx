import React from "react";
import LoadingState from "../../common/LoadingState";
import NotFound from "../../pages/NotFound";
import VerifyEmailHandler from "./VerifyEmailHandler";
import ResetPasswordHandler from "./ResetPasswordHandler";

const EmailActionHandler = (): React.ReactElement => {
  const urlParams = new URLSearchParams(window.location.search);
  const mode = urlParams.get("mode");
  const oobCode: string = urlParams.get("oobCode") ?? "";

  switch (mode) {
    case "verifyEmail":
      return <VerifyEmailHandler oobCode={oobCode} />;
    case "resetPassword":
      return <ResetPasswordHandler oobCode={oobCode} />;
    case null:
      return <LoadingState />;
    default:
      return <NotFound />;
  }
};

export default EmailActionHandler;
