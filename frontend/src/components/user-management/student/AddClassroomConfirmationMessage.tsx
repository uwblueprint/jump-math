import React from "react";

import { ReactComponent as EnvelopePaperIllustration } from "../../../assets/illustrations/envelope-paper.svg";
import MessageContainer from "../../common/MessageContainer";

const AddClassroomConfirmationMessage = (): React.ReactElement => {
  return (
    <MessageContainer
      illustration={EnvelopePaperIllustration}
      paragraphs={["Classroom created"]}
      subtitle="Thank you for your submission."
      textColor="blue.300"
    />
  );
};

export default AddClassroomConfirmationMessage;
