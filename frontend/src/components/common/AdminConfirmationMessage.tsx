import React from "react";
import { ADMIN_PAGE } from "../../constants/Routes";
import { ReactComponent as EnvelopePaperIllustration } from "../../assets/illustrations/envelope-paper.svg";
import MessageContainer from "./MessageContainer";

const AdminConfirmationMessage = (): React.ReactElement => {
  return (
    <MessageContainer
      illustration={EnvelopePaperIllustration}
      subtitle="Thank you for your submission."
      paragraph="The associate will shortly get emailed regarding their onboarding process for Jump Math. Changes will appear within 2-3 business days once the associate confirms the email."
      textColor="blue.300"
      buttonText="Return to Database"
      pageToNavigate={ADMIN_PAGE}
    />
  );
};

export default AdminConfirmationMessage;
