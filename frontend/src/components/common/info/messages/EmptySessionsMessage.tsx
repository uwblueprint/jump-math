import React from "react";
import { Center } from "@chakra-ui/react";

import { PlusOutlineIcon } from "../../../../assets/icons";
import DistributeAssessmentsIllustration from "../../../../assets/illustrations/distribute-assessments.svg";
import { DISTRIBUTE_ASSESSMENT_PAGE } from "../../../../constants/Routes";
import MessageContainer from "../MessageContainer";

const EmptySessionsMessage = ({
  classId,
}: {
  classId?: string;
}): React.ReactElement => {
  return (
    <Center
      backgroundColor="blue.50"
      borderRadius="1rem"
      color="blue.300"
      minWidth="100%"
      pb={14}
    >
      <MessageContainer
        buttonIcon={<PlusOutlineIcon />}
        buttonRoute={{
          pathname: DISTRIBUTE_ASSESSMENT_PAGE,
          state: classId ? { classId } : {},
        }}
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
