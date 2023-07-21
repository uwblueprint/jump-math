import React from "react";
import { Center, useStyleConfig } from "@chakra-ui/react";

import { PlusOutlineIcon } from "../../../../assets/icons";
import DisplayAssessmentsIllustration from "../../../../assets/illustrations/display-assessments.svg";
import MessageContainer from "../MessageContainer";

type EmptyClassroomsStateProps = {
  onClick?: () => void;
};

const EmptyClassroomsMessage = ({
  onClick,
}: EmptyClassroomsStateProps): React.ReactElement => {
  const styles = useStyleConfig("Center", { variant: "emptyMessage" });
  return (
    <Center __css={styles} height="100%" pb={14}>
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

export default EmptyClassroomsMessage;
