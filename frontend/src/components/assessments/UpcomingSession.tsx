import React from "react";
import {
  Divider,
  HStack,
  Spacer,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  Tooltip,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";

import { BookIcon } from "../../assets/icons";
import { formatDate } from "../../utils/GeneralUtils";
import Copyable from "../common/Copyable";
import Popover from "../common/Popover";
import PopoverButton from "../common/PopoverButton";

export type UpcomingSessionProps = {
  classroomName: string;
  sessionName: string;
  // Target date should be the start date of the session UNLESS
  // the session is active, in which case it should be the end date
  targetDate: Date;
  accessCode: string;
  status: "active" | "upcoming" | "past";
};

const STATUS_LABELS = {
  active: "Until",
  upcoming: "Scheduled",
  past: "Assigned",
};

const UpcomingSession = ({
  classroomName,
  sessionName,
  targetDate,
  accessCode,
  status,
}: UpcomingSessionProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <HStack gap={2} pb={8}>
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
          overflow="hidden"
          size="lg"
          w={36}
        >
          <TagLeftIcon as={BookIcon} color="blue.300" />
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
          {sessionName}
        </Text>
        <Text
          color={status === "past" ? "grey.200" : "blue.200"}
          textStyle="mobileParagraph"
        >
          {STATUS_LABELS[status]} {formatDate(targetDate)}
        </Text>
      </VStack>
      {status !== "past" && <Copyable label="Access Code" value={accessCode} />}
      <Spacer />
      <Popover isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
        <VStack divider={<Divider borderColor="grey.200" />} spacing="0em">
          <PopoverButton name="Edit" onClick={() => {}} />
          <PopoverButton name="Delete" onClick={() => {}} />
        </VStack>
      </Popover>
    </HStack>
  );
};

export default UpcomingSession;