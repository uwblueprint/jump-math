import React, { type ReactElement } from "react";
import { Center, useStyleConfig } from "@chakra-ui/react";

import DistributeAssessmentsIllustration from "../../../../assets/illustrations/distribute-assessments.svg";
import type { TestSessionStatus } from "../../../../types/TestSessionTypes";
import MessageContainer from "../MessageContainer";

const BODY_PARAGRAPHS_BY_STATUS: Record<TestSessionStatus, string[]> = {
  UPCOMING: ["Create an assessment to view it here."],
  ACTIVE: [
    "Upcoming assessments will appear here once they are open for students to take.",
  ],
  PAST: ["Active assessments will appear here once they are closed."],
};

const EmptySessionsTabMessage = ({
  status,
}: {
  status: TestSessionStatus;
}): ReactElement => {
  const styles = useStyleConfig("Center", { variant: "emptyMessage" });
  return (
    <Center __css={styles} pb={14} pt={4}>
      <MessageContainer
        image={DistributeAssessmentsIllustration}
        paragraphs={BODY_PARAGRAPHS_BY_STATUS[status]}
        subtitle={`You currently have no ${status.toLowerCase()} assessments.`}
        textColor="blue.300"
      />
    </Center>
  );
};

export default EmptySessionsTabMessage;
