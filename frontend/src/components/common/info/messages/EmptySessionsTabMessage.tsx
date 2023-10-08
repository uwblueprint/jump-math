import React, { type ReactElement } from "react";
import { Center, useStyleConfig } from "@chakra-ui/react";

import DistributeAssessmentsIllustration from "../../../../assets/illustrations/distribute-assessments.svg";
import type { TestSessionStatus } from "../../../../types/TestSessionTypes";
import MessageContainer from "../MessageContainer";

const BODY_PARAGRAPHS_BY_STATUS: Record<TestSessionStatus, string[]> = {
  UPCOMING: ["Assessments will appear here before they have started."],
  ACTIVE: ["Assessments will appear here once they have started."],
  PAST: ["Assessments will appear here after they have ended."],
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
