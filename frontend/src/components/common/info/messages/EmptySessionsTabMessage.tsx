import React, { type ReactElement } from "react";
import { Center, useStyleConfig } from "@chakra-ui/react";

import DistributeAssessmentsIllustration from "../../../../assets/illustrations/distribute-assessments.svg";
import type { TestSessionStatus } from "../../../../types/TestSessionTypes";
import MessageContainer from "../MessageContainer";

const BODY_PARAGRAPHS_BY_STATUS: Record<TestSessionStatus, string[]> = {
  UPCOMING: ["Assessments that haven't started yet will appear here."],
  ACTIVE: ["Assessments that have started will appear here."],
  PAST: ["Assessments that have ended will appear here."],
};

const EmptySessionsTabMessage = ({
  status,
}: {
  status: TestSessionStatus;
}): ReactElement => {
  const styles = useStyleConfig("Center", { variant: "emptyMessage" });
  return (
    <Center __css={styles}>
      <MessageContainer
        image={DistributeAssessmentsIllustration}
        paragraphs={BODY_PARAGRAPHS_BY_STATUS[status]}
        subtitle={`You have no ${status.toLowerCase()} assessments.`}
        textColor="blue.300"
      />
    </Center>
  );
};

export default EmptySessionsTabMessage;
