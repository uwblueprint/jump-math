import React from "react";
import { Center } from "@chakra-ui/react";

import TestSubmissionIllustration from "../../../assets/illustrations/test-submission.svg";
import { HOME_PAGE } from "../../../constants/Routes";
import MessageContainer from "../../common/MessageContainer";

const TestSubmissionMessage = (): React.ReactElement => {
  return (
    <Center minHeight="100vh">
      <MessageContainer
        buttonRoute={HOME_PAGE}
        buttonText="Go to Home Page"
        image={TestSubmissionIllustration}
        paragraphs={[]}
        subtitle="Great Job! Your test submission was a success. 
        Now that you got it out of the way, please turn your attention to your teacher for future instructions."
        textColor="blue.300"
      />
    </Center>
  );
};

export default TestSubmissionMessage;
