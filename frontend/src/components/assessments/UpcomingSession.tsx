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
  startDate: Date;
  accessCode: string;
};

const UpcomingSession = ({
  classroomName,
  sessionName,
  startDate,
  accessCode,
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
        <Text color="blue.300" textStyle="subtitle2">
          {sessionName}
        </Text>
        <Text color="blue.200" textStyle="mobileParagraph">
          Scheduled {formatDate(startDate)}
        </Text>
      </VStack>
      <Copyable label="Access Code" value={accessCode} />
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
