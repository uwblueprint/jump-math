import React from "react";
import { ReactComponent as EnvelopePaperIllustration } from "../../../assets/illustrations/envelope-paper.svg";
import MessageContainer from "../../common/MessageContainer";

const AddAdminConfirmationMessage = (): React.ReactElement => {
  return (
    <MessageContainer
      illustration={EnvelopePaperIllustration}
      paragraphs={[
        "The admin will receive an email shortly regarding their onboarding process for Jump Math.",
        "Changes will appear on the dashboard within 2-3 business days once the admin confirms their email.",
      ]}
      subtitle="Thank you for your submission."
      textColor="blue.300"
    />
  );
};

export default AddAdminConfirmationMessage;
