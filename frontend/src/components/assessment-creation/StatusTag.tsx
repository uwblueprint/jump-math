import React from "react";
import { Tag } from "@chakra-ui/react";

type StatusProperty = "Draft" | "Published" | "Archived" | "Deleted";
interface Status {
  status: StatusProperty;
}

const StatusTag = ({ status }: Status): React.ReactElement => {
  let color;
  let backgroundColor;

  switch (status) {
    case "Draft": {
      color = "#766C0D";
      backgroundColor = "#FEFCE8";
      break;
    }
    case "Published": {
      color = "white";
      backgroundColor = "green";
      break;
    }
    case "Archived": {
      color = "black";
      backgroundColor = "orange";
      break;
    }
    case "Deleted": {
      color = "white";
      backgroundColor = "purple";
      break;
    }

    default: {
      color = "#766C0D";
      backgroundColor = "#FEFCE8";
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
