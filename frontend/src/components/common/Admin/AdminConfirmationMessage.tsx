import React from "react";
import { ADMIN_PAGE } from "../../../constants/Routes";
import { ReactComponent as EnvelopePaperIllustration } from "../../../assets/illustrations/envelope-paper.svg";
import MessageContainer from "../MessageContainer";

const AdminConfirmationMessage = (): React.ReactElement => {
  return (
    <MessageContainer
      illustration={EnvelopePaperIllustration}
      subtitle="Thank you for your submission."
      paragraphs={[
        "The admin will receive an email shortly regarding their onboarding process for Jump Math.",
        "Changes will appear on the dashboard within 2-3 business days once the admin confirms their email.",
      ]}
      textColor="blue.300"
    />
  );
};

export default AdminConfirmationMessage;
