import React from "react";
import { Tag, TagLabel, TagLeftIcon, Text, Tooltip } from "@chakra-ui/react";

import { BookIcon } from "../../../assets/icons";

const TestSessionListItemClassNameTag = ({
  classroomName,
}: {
  classroomName: string;
}): React.ReactElement => {
  return (
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
        maxWidth={36}
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
  );
};

export default TestSessionListItemClassNameTag;
