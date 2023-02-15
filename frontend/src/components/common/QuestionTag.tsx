import * as React from "react";
import { Tag, Text, TagLeftIcon } from "@chakra-ui/react";
import {
  MultiSelectTagIcon,
  MultipleChoiceTagIcon,
  ShortAnswerTagIcon,
} from "../../assets/icons";
import QuestionType from "../../types/QuestionTypes";

type QuestionTypeProps = {
  type: QuestionType;
  count: number;
};

const QuestionTag = ({
  type,
  count,
}: QuestionTypeProps): React.ReactElement => {
  let color: string;
  let bgColor: string;
  let icon;

  switch (type) {
    case QuestionType.MULTIPLE_CHOICE:
      color = "green.400";
      bgColor = "green.50";
      icon = MultipleChoiceTagIcon;
      break;
    case QuestionType.SHORT_ANSWER:
      color = "yellow.300";
      bgColor = "yellow.50";
      icon = ShortAnswerTagIcon;
      break;
    case QuestionType.MULTI_SELECT:
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
      color={color}
      bgColor={bgColor}
      padding="10px 14px"
      whiteSpace="nowrap"
      minWidth="fitContent"
      borderRadius="full"
      fontSize="16px"
    >
      <TagLeftIcon boxSize="20px" as={icon} />
      <Text ml={2} textStyle="caption">
        {type.valueOf()} x {count}
      </Text>
    </Tag>
  );
};

export default QuestionTag;
