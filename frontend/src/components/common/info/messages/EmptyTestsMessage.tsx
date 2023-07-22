import React from "react";
import { Center, useStyleConfig } from "@chakra-ui/react";

import DisplayAssessmentsIllustration from "../../../../assets/illustrations/display-assessments.svg";
import { ASSESSMENT_EDITOR_PAGE } from "../../../../constants/Routes";
import MessageContainer from "../MessageContainer";

const EmptyTestsMessage = (): React.ReactElement => {
  const styles = useStyleConfig("Center", { variant: "emptyMessage" });
  return (
    <Center __css={styles} pb={14}>
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

export default EmptyTestsMessage;
