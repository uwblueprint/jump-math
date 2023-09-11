import React from "react";
import { Tag, Text } from "@chakra-ui/react";

import type { TestSessionStatus } from "../../../types/TestSessionTypes";
import { titleCase } from "../../../utils/GeneralUtils";

const STATUS_BACKGROUND_COLORS = {
  ACTIVE: "green.50",
  UPCOMING: "yellow.50",
  PAST: "grey.100",
};
const STATUS_COLORS = {
  ACTIVE: "green.400",
  UPCOMING: "yellow.300",
  PAST: "grey.400",
};

const TestSessionListItemStatusTag = ({
  status,
}: {
  status: TestSessionStatus;
}): React.ReactElement => {
  return (
    <Tag
      bg={STATUS_BACKGROUND_COLORS[status]}
      borderRadius="full"
      maxWidth={40}
      overflow="hidden"
      size="lg"
    >
      <Text
        color={STATUS_COLORS[status]}
        overflow="hidden"
        textOverflow="ellipsis"
        textStyle="smallerParagraph"
        whiteSpace="nowrap"
      >
        {titleCase(status)}
      </Text>
    </Tag>
  );
};

export default TestSessionListItemStatusTag;
