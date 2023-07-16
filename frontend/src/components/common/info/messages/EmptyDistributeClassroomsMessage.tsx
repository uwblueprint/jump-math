import React from "react";
import { Center } from "@chakra-ui/react";

import { PlusOutlineIcon } from "../../../../assets/icons";
import DisplayAssessmentsIllustration from "../../../../assets/illustrations/display-assessments.svg";
import MessageContainer from "../MessageContainer";

type EmptyDistributeClassroomsStateProps = {
  onClick?: () => void;
};

const EmptyDistributeClassroomsMessage = ({
  onClick,
}: EmptyDistributeClassroomsStateProps): React.ReactElement => {
  return (
    <Center
      backgroundColor="blue.50"
      borderRadius="1rem"
      color="blue.300"
      height="100%"
      minWidth="100%"
      pb={14}
    >
      <MessageContainer
        buttonIcon={<PlusOutlineIcon />}
        buttonText="Go to Classrooms"
        image={DisplayAssessmentsIllustration}
        onClick={onClick}
        paragraphs={["You currently have no classrooms."]}
        subtitle="Please navigate to the Classrooms page to add a classroom."
        textColor="blue.300"
      />
    </Center>
  );
};

export default EmptyDistributeClassroomsMessage;
