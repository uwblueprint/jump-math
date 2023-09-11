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
  const isPast = status === TestSessionStatus.PAST;

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

  return (
    <Tooltip
      bg="blue.300"
      borderRadius={4}
      hasArrow
      isDisabled={!isPast}
      label="Click to view statistics of this assessment and each student's performance."
      p={2}
      placement="bottom"
    >
      <HStack
        gap={6}
        p={4}
        w="100%"
        {...(isPast && {
          _hover: { bg: "grey.100" },
          as: "button",
          borderRadius: 16,
          onClick: onViewStatistics,
        })}
      >
        <TestSessionListItemBody
          classroomName={classroomName}
          inClassroomPage={inClassroomPage}
          status={status}
          targetDate={targetDate}
          testName={testName}
        />
        <Spacer />
        {isPast ? (
          stats && <TestSessionListItemStatistics stats={stats} />
        ) : (
          <>
            <Copyable
              displayedValue={formattedAccessCode}
              label="Access Code"
              value={accessCode}
            />
            {!isReadOnly && (
              <TestSessionListItemPopover
                testSessionEditingData={testSessionEditingData}
              />
            )}
          </>
        )}
      </HStack>
    </Tooltip>
  );
};

export default TestSessionListItem;
