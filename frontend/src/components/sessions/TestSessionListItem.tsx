import React from "react";
import {
  HStack,
  Spacer,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";

import { BookIcon } from "../../assets/icons";
import type {
  TestSessionItemStats,
  TestSessionStatus,
} from "../../types/TestSessionTypes";
import { formatDate } from "../../utils/GeneralUtils";
import Copyable from "../common/Copyable";

import TestSessionListItemPopover from "./TestSessionListItemPopover";

export type TestSessionListItemProps = {
  testSessionId: string;
  classroomName: string;
  testName: string;
  // Target date should be the start date of the session UNLESS
  // the session is active, in which case it should be the end date
  targetDate: Date;
  accessCode: string;
  status: TestSessionStatus;
  stats?: TestSessionItemStats;
};

const STATUS_LABELS = {
  active: "Until",
  upcoming: "Scheduled",
  past: "Assigned",
};
const ACCESS_CODE_GROUP_SIZE = 3;

const TestSessionListItem = ({
  testSessionId,
  classroomName,
  testName,
  targetDate,
  accessCode,
  status,
  stats,
}: TestSessionListItemProps): React.ReactElement => {
  const formattedAccessCode = `${accessCode.slice(
    0,
    ACCESS_CODE_GROUP_SIZE,
  )} ${accessCode.slice(ACCESS_CODE_GROUP_SIZE)}`;

  return (
    <Tooltip
      bg="blue.300"
      borderRadius={4}
      hasArrow
      isDisabled={status !== "past"}
      label="Click to view statistics of this assessment and each student's performance."
      p={2}
      placement="bottom"
    >
      <HStack
        _hover={{ bg: status === "past" ? "grey.100" : undefined }}
        as={status === "past" ? "button" : undefined}
        borderRadius={16}
        gap={2}
        p={4}
        w="100%"
      >
        <Tooltip
          bg="blue.300"
          borderRadius={4}
          hasArrow
          label={classroomName}
          p={2}
          placement="left"
        >
          <Tag
            bg="blue.50"
            borderRadius="full"
            maxWidth={40}
            overflow="hidden"
            size="lg"
          >
            <TagLeftIcon aria-hidden="true" as={BookIcon} color="blue.300" />
            <TagLabel>
              <Text
                color="blue.300"
                overflow="hidden"
                textOverflow="ellipsis"
                textStyle="smallerParagraph"
                whiteSpace="nowrap"
              >
                {classroomName}
              </Text>
            </TagLabel>
          </Tag>
        </Tooltip>
        <VStack align="start">
          <Text
            color={status === "past" ? "grey.300" : "blue.300"}
            textStyle="subtitle2"
          >
            {testName}
          </Text>
          <Text
            color={status === "past" ? "grey.200" : "blue.200"}
            textStyle="mobileParagraph"
          >
            {STATUS_LABELS[status]} {formatDate(targetDate)}
          </Text>
        </VStack>
        {status !== "past" && (
          <Copyable label="Access Code" value={formattedAccessCode} />
        )}
        <Spacer />
        {stats && (
          <>
            <Text color="grey.300" textStyle="mobileParagraph">
              Mean: {stats.mean}%
            </Text>
            <Text color="grey.300" textStyle="mobileParagraph">
              Median: {stats.median}%
            </Text>
            <Text color="grey.300" textStyle="mobileParagraph">
              Completion Rate: {stats.completionRate}%
            </Text>
            <Text color="grey.300" textStyle="mobileParagraph">
              Submissions: {stats.submissions}
            </Text>
          </>
        )}
        <TestSessionListItemPopover
          status={status}
          testSessionId={testSessionId}
        />
      </HStack>
    </Tooltip>
  );
};

export default TestSessionListItem;
