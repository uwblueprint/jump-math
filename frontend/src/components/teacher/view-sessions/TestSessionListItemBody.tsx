import React from "react";
import { Text, VStack } from "@chakra-ui/react";

import { TestSessionStatus } from "../../../types/TestSessionTypes";
import { formatDate } from "../../../utils/GeneralUtils";

import TestSessionListItemClassNameTag from "./TestSessionListItemClassNameTag";

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
  return (
    <>
      {!inClassroomPage && (
        <TestSessionListItemClassNameTag classroomName={classroomName} />
      )}
      <VStack align="start">
        <Text
          color={status === TestSessionStatus.PAST ? "grey.300" : "blue.300"}
          noOfLines={1}
          textStyle="subtitle2"
        >
          {testName}
        </Text>
        <Text
          color={status === TestSessionStatus.PAST ? "grey.200" : "blue.200"}
          noOfLines={1}
          textStyle="mobileParagraph"
        >
          {STATUS_LABELS[status]} {formatDate(targetDate)}
        </Text>
      </VStack>
    </>
  );
};

export default TestSessionListItemBody;
