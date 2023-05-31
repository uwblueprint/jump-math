import React from "react";
import { Center } from "@chakra-ui/react";

import { PlusOutlineIcon } from "../../assets/icons";
import DisplayAssessmentsIllustration from "../../assets/illustrations/display-assessments.svg";
import MessageContainer from "../common/MessageContainer";

type EmptyClassroomsStateProps = {
  onClick?: () => void;
};

const EmptyClassroomsState = ({
  onClick,
}: EmptyClassroomsStateProps): React.ReactElement => {
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
        buttonText="Create a classroom"
        image={DisplayAssessmentsIllustration}
        onClick={onClick}
        paragraphs={[
          "Click on the button below to create your first classroom",
        ]}
        subtitle="You currently have no classroooms."
        textColor="blue.300"
      />
    </Center>
  );
};

export default EmptyClassroomsState;
