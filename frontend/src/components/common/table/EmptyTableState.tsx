import React from "react";
import { Center } from "@chakra-ui/react";

import DisplayAssessmentsIllustration from "../../../assets/illustrations/display-assessments.svg";
import { ASSESSMENT_EDITOR_PAGE } from "../../../constants/Routes";
import MessageContainer from "../MessageContainer";

const EmptyTableState = (): React.ReactElement => {
  return (
    <Center
      backgroundColor="blue.50"
      borderRadius="1rem"
      color="blue.300"
      minWidth="100%"
      pb={14}
    >
      <MessageContainer
        buttonRoute={ASSESSMENT_EDITOR_PAGE}
        buttonText="Create assessment"
        image={DisplayAssessmentsIllustration}
        paragraphs={["Create your first assessment"]}
        subtitle="You currently have no assessments."
        textColor="blue.300"
      />
    </Center>
  );
};

export default EmptyTableState;
