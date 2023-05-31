import React, { useContext } from "react";
import { Center } from "@chakra-ui/react";

import TestSubmissionIllustration from "../../../assets/illustrations/test-submission.svg";
import AuthContext from "../../../contexts/AuthContext";
import MessageContainer from "../MessageContainer";

const TestSubmissionMessage = (): React.ReactElement => {
  const { setAuthenticatedUser } = useContext(AuthContext);

  const handleClick = () => {
    setAuthenticatedUser(null);
  };

  return (
    <Center minHeight="100vh">
      <MessageContainer
        buttonText="Go to Home Page"
        image={TestSubmissionIllustration}
        onClick={handleClick}
        paragraphs={[]}
        subtitle="Great job! We've saved your answers.
        Now that you got it out of the way, please turn your attention to your teacher for future instructions."
        textColor="blue.300"
      />
    </Center>
  );
};

export default TestSubmissionMessage;
