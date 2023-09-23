import React, { type ReactElement } from "react";
import { Center, useStyleConfig } from "@chakra-ui/react";

import DisplayAssessmentsIllustration from "../../../../assets/illustrations/display-assessments.svg";
import MessageContainer from "../MessageContainer";

const EmptyArchivedClassroomsMessage = (): ReactElement => {
  const styles = useStyleConfig("Center", { variant: "emptyMessage" });
  return (
    <Center __css={styles} height="100%" mt={4} pb={14}>
      <MessageContainer
        image={DisplayAssessmentsIllustration}
        paragraphs={["Use the archive option on a classroom to view it here"]}
        subtitle="You currently have no archived classroooms."
        textColor="blue.300"
      />
    </Center>
  );
};

export default EmptyArchivedClassroomsMessage;
