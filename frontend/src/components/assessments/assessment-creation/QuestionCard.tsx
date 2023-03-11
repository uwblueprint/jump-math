import * as React from "react";
import {
  Box,
  HStack,
  List,
  ListItem,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";

import {
  DeleteOutlineIcon,
  EditOutlineIcon,
  HamburgerMenuIcon,
} from "../../../assets/icons";
import { QuestionType } from "../../../types/QuestionTypes";

import QuestionTag from "./QuestionTag";

interface QuestionCardProps {
  tags: { type: QuestionType; count: number }[];
  questionNumber: number;
  questions: string[];
}

const QuestionCard = ({
  tags,
  questionNumber,
  questions,
}: QuestionCardProps): React.ReactElement => {
  return (
    <Box
      background="white"
      border="1px"
      borderColor="grey.200"
      borderRadius="22px"
      color="grey.300"
      width="100%"
    >
      <HStack alignItems="left" padding="6">
        <Box
          aria-label="reorder"
          cursor="pointer"
          fontSize="24px"
          paddingRight="6"
        >
          <HamburgerMenuIcon />
        </Box>
        <VStack alignItems="left" paddingRight="4" spacing="6" width="94%">
          <HStack>
            <Text color="grey.400" textStyle="subtitle1">
              Question {questionNumber}
            </Text>
            <Spacer />
            <Box
              color="blue.300"
              cursor="pointer"
              fontSize="24px"
              paddingRight="4"
            >
              <EditOutlineIcon />
            </Box>
            <Box color="blue.300" cursor="pointer" fontSize="24px">
              <DeleteOutlineIcon />
            </Box>
          </HStack>
          <List
            fontWeight="700"
            spacing={4}
            stylePosition="inside"
            styleType={questions.length > 1 ? "lower-alpha" : "none"}
            textStyle="paragraph"
          >
            {questions.map((question, key) => (
              <ListItem
                key={key}
                color="grey.400"
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
              >
                <Text as="span" textStyle="paragraph">
                  {question}
                </Text>
              </ListItem>
            ))}
          </List>
          <Text color="grey.300" textStyle="caption">
            Total: {questions.length} points
          </Text>
          <HStack overflow="hidden">
            {tags.map((tag, key) => (
              <QuestionTag key={key} count={tag.count} type={tag.type} />
            ))}
          </HStack>
        </VStack>
      </HStack>
    </Box>
  );
};

export default QuestionCard;
