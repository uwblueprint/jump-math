import type { ReactElement } from "react";
import React from "react";
import { Box } from "@chakra-ui/react";

import type { TestSessionStatus } from "../../../types/TestSessionTypes";
import EmptySessionsTabMessage from "../../common/info/messages/EmptySessionsTabMessage";

import TestSessionListItem from "./TestSessionListItem";
import type { FormattedAssessmentData } from "./useAssessmentDataQuery";

type TestSessionTabContentsProps = {
  data?: FormattedAssessmentData[];
  status: TestSessionStatus;
};

const TestSessionTabContents = ({
  data,
  status,
}: TestSessionTabContentsProps): ReactElement => (
  <Box py={4} w="100%">
    {data?.length ? (
      data.map((session) => (
        <TestSessionListItem key={session.testSessionId} session={session} />
      ))
    ) : (
      <EmptySessionsTabMessage status={status} />
    )}
  </Box>
);

export default TestSessionTabContents;
