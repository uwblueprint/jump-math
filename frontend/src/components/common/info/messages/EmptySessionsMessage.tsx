import React from "react";
import { Center } from "@chakra-ui/react";

import { PlusOutlineIcon } from "../../../../assets/icons";
import DistributeAssessmentsIllustration from "../../../../assets/illustrations/distribute-assessments.svg";
import { DISTRIBUTE_ASSESSMENT_PAGE } from "../../../../constants/Routes";
import MessageContainer from "../MessageContainer";

const EmptySessionsMessage = (): React.ReactElement => {
  return (
    <Center
      backgroundColor="blue.50"
      borderRadius="1rem"
      color="blue.300"
      minWidth="100%"
      mt={10}
      pb={14}
    >
      <MessageContainer
        buttonIcon={<PlusOutlineIcon />}
        buttonRoute={DISTRIBUTE_ASSESSMENT_PAGE}
        buttonText="Create new assessment"
        image={DistributeAssessmentsIllustration}
        paragraphs={[
          "Click on the button below to create your first assessment.",
        ]}
        subtitle="You currently have no assessments."
        textColor="blue.300"
      />
    </Center>
  );
};

export default EmptySessionsMessage;
