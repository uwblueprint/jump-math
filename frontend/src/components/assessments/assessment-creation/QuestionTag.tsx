import * as React from "react";
import { Tag, TagLeftIcon, Text } from "@chakra-ui/react";

import {
  MultipleChoiceTagIcon,
  MultiSelectTagIcon,
  ShortAnswerTagIcon,
} from "../../../assets/icons";
import { ResponseType } from "../../../types/QuestionTypes";

export type QuestionTagProps = {
  type: ResponseType;
  count: number;
};

const QuestionTag = ({ type, count }: QuestionTagProps): React.ReactElement => {
  let color: string;
  let bgColor: string;
  let icon;

  switch (type) {
    case ResponseType.MULTIPLE_CHOICE:
      color = "green.400";
      bgColor = "green.50";
      icon = MultipleChoiceTagIcon;
      break;
    case ResponseType.SHORT_ANSWER:
      color = "yellow.300";
      bgColor = "yellow.50";
      icon = ShortAnswerTagIcon;
      break;
    case ResponseType.MULTI_SELECT:
      color = "blue.300";
      bgColor = "blue.50";
      icon = MultiSelectTagIcon;
      break;
    default:
      color = "grey.400";
      bgColor = "grey.50";
      icon = MultipleChoiceTagIcon;
  }

  return (
    <Tag
      bgColor={bgColor}
      borderRadius="full"
      color={color}
      fontSize="16px"
      minWidth="fitContent"
      padding="10px 14px"
      whiteSpace="nowrap"
    >
      <TagLeftIcon as={icon} boxSize="20px" />
      <Text ml={2} textStyle="caption">
        {type.valueOf()} x {count}
      </Text>
    </Tag>
  );
};

export default QuestionTag;
