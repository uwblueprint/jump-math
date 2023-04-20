import React from "react";
import { Center } from "@chakra-ui/react";

import { ReactComponent as DisplayAssessmentsIllustration } from "../../../assets/illustrations/display-assessments.svg";
import { CREATE_ASSESSMENT_PAGE } from "../../../constants/Routes";
import MessageContainer from "../MessageContainer";

const EmptyTableState = (): React.ReactElement => {
  return (
    <Center
      backgroundColor="blue.50"
      borderRadius="1rem"
      color="blue.300"
      minWidth="100%"
      pb={12}
    >
      <MessageContainer
        buttonRoute={CREATE_ASSESSMENT_PAGE}
        buttonText="Create assessment"
        illustration={DisplayAssessmentsIllustration}
        paragraphs={["Create your first assessment"]}
        subtitle="You currently have no assessments."
        textColor="blue.300"
      />
    </Center>
  );
};

export default EmptyTableState;
