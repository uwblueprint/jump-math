import React from "react";
import { Center, useStyleConfig } from "@chakra-ui/react";

import { PlusOutlineIcon } from "../../../../assets/icons";
import DisplayAssessmentsIllustration from "../../../../assets/illustrations/display-assessments.svg";
import MessageContainer from "../MessageContainer";

type EmptyDistributeClassroomsStateProps = {
  onClick?: () => void;
};

const EmptyDistributeClassroomsMessage = ({
  onClick,
}: EmptyDistributeClassroomsStateProps): React.ReactElement => {
  const styles = useStyleConfig("Center", { variant: "emptyMessage" });
  return (
    <Center __css={styles} pb={14}>
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
