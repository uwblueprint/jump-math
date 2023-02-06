import React from "react";
import { Tag } from "@chakra-ui/react";
import { StatusProperty } from "../../types/AssessmentTypes";

interface Status {
  status: StatusProperty;
}

const StatusTag = ({ status }: Status): React.ReactElement => {
  let color;
  let backgroundColor;

  switch (status) {
    case "Draft": {
      color = "yellow.300";
      backgroundColor = "yellow.50";
      break;
    }
    case "Published": {
      color = "green.400";
      backgroundColor = "green.50";
      break;
    }
    case "Archived": {
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
      {status}
    </Tag>
  );
};

export default StatusTag;
