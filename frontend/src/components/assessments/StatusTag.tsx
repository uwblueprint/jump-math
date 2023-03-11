import React from "react";
import { Tag } from "@chakra-ui/react";
import { Status } from "../../types/AssessmentTypes";

interface StatusTagProps {
  status: Status;
}

const StatusTag = ({ status }: StatusTagProps): React.ReactElement => {
  let color;
  let backgroundColor;

  switch (status) {
    case Status.DRAFT: {
      color = "yellow.300";
      backgroundColor = "yellow.50";
      break;
    }
    case Status.PUBLISHED: {
      color = "green.400";
      backgroundColor = "green.50";
      break;
    }
    case Status.ARCHIVED: {
      color = "grey.300";
      backgroundColor = "grey.100";
      break;
    }
    default: {
      color = "grey.300";
      backgroundColor = "grey.300";
      break;
    }
  }
  return (
    <Tag
      size="lg"
      backgroundColor={backgroundColor}
      color={color}
      borderRadius="full"
    >
      {status.valueOf()}
    </Tag>
  );
};

export default StatusTag;
