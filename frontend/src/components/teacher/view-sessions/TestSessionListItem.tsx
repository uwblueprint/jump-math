import React from "react";
import { useHistory } from "react-router-dom";
import { HStack, Spacer, Tooltip } from "@chakra-ui/react";

import type { TestSessionEditingData } from "../../../APIClients/types/TestSessionClientTypes";
import * as Routes from "../../../constants/Routes";
import type { TestSessionItemStats } from "../../../types/TestSessionTypes";
import { TestSessionStatus } from "../../../types/TestSessionTypes";
import Copyable from "../../common/Copyable";

import TestSessionListItemBody from "./TestSessionListItemBody";
import TestSessionListItemPopover from "./TestSessionListItemPopover";
import TestSessionListItemStatistics from "./TestSessionListItemStatistics";
import TestSessionListItemStatusTag from "./TestSessionListItemStatusTag";

export type TestSessionListItemProps = {
  session: TestSessionEditingData & {
    // Target date should be the start date of the session UNLESS
    // the session is active, in which case it should be the end date
    targetDate: Date;
    accessCode: string;
  };
  isReadOnly?: boolean;
  stats?: TestSessionItemStats;
  inClassroomPage?: boolean;
};

const ACCESS_CODE_GROUP_SIZE = 3;

const TestSessionListItem = ({
  session,
  isReadOnly = false,
  stats,
  inClassroomPage = false,
}: TestSessionListItemProps): React.ReactElement => {
  const history = useHistory();
  const { testSessionId, classroomName, testName, status } = session;
  const { targetDate, accessCode, ...testSessionEditingData } = session;

  const formattedAccessCode = `${accessCode.slice(
    0,
    ACCESS_CODE_GROUP_SIZE,
  )} ${accessCode.slice(ACCESS_CODE_GROUP_SIZE)}`;

  const onViewStatistics = () =>
    history.push(
      Routes.DISPLAY_ASSESSMENT_RESULTS_PAGE({
        sessionId: testSessionId,
      }),
      {
        returnTo: {
          pathname: history.location.pathname,
          state: history.location.state,
        },
        sessionTitle: testName,
      },
    );

  return status === TestSessionStatus.PAST ? (
    <Tooltip
      bg="blue.300"
      borderRadius={4}
      hasArrow
      label="Click to view statistics of this assessment and each student's performance."
      p={2}
      placement="bottom"
    >
      <HStack
        _hover={{ bg: "grey.100" }}
        as="button"
        borderRadius={16}
        gap={6}
        onClick={onViewStatistics}
        p={4}
        w="100%"
      >
        <TestSessionListItemBody
          classroomName={classroomName}
          inClassroomPage={inClassroomPage}
          status={status}
          targetDate={targetDate}
          testName={testName}
        />
        <Spacer />
        {stats && <TestSessionListItemStatistics stats={stats} />}
      </HStack>
    </Tooltip>
  ) : (
    <HStack gap={6} p={4} w="100%">
      <TestSessionListItemBody
        classroomName={classroomName}
        inClassroomPage={inClassroomPage}
        status={status}
        targetDate={targetDate}
        testName={testName}
      />
      <Copyable
        displayedValue={formattedAccessCode}
        label="Access Code"
        value={accessCode}
      />
      <Spacer />
      {inClassroomPage && <TestSessionListItemStatusTag status={status} />}
      {!isReadOnly && (
        <TestSessionListItemPopover
          testSessionEditingData={testSessionEditingData}
        />
      )}
    </HStack>
  );
};

export default TestSessionListItem;
