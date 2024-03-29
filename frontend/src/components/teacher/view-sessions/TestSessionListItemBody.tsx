import React from "react";
import { Text, VStack } from "@chakra-ui/react";

import { TestSessionStatus } from "../../../types/TestSessionTypes";
import { formatDate } from "../../../utils/GeneralUtils";

import TestSessionListItemClassNameTag from "./TestSessionListItemClassNameTag";
import TestSessionListItemStatusTag from "./TestSessionListItemStatusTag";

const STATUS_LABELS = {
  ACTIVE: "Until",
  UPCOMING: "Scheduled",
  PAST: "Assigned",
};

const TestSessionListItemBody = ({
  inClassroomPage,
  classroomName,
  status,
  testName,
  targetDate,
}: {
  inClassroomPage: boolean;
  classroomName: string;
  status: TestSessionStatus;
  testName: string;
  targetDate: Date;
}): React.ReactElement => {
  const isPast = status === TestSessionStatus.PAST;
  return (
    <>
      {inClassroomPage ? (
        !isPast && <TestSessionListItemStatusTag status={status} />
      ) : (
        <TestSessionListItemClassNameTag classroomName={classroomName} />
      )}
      <VStack align="start">
        <Text color={isPast ? "grey.300" : "blue.300"} textStyle="subtitle2">
          {testName}
        </Text>
        <Text
          color={isPast ? "grey.200" : "blue.200"}
          textStyle="mobileParagraph"
        >
          {STATUS_LABELS[status]} {formatDate(targetDate)}
        </Text>
      </VStack>
    </>
  );
};

export default TestSessionListItemBody;
