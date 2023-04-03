import React, { useContext, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import {
  Box,
  Button,
  HStack,
  IconButton,
  List,
  ListItem,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import type { Identifier } from "dnd-core";
import update from "immutability-helper";

import {
  DeleteOutlineIcon,
  EditOutlineIcon,
  HamburgerMenuIcon,
} from "../../../assets/icons";
import AssessmentContext from "../../../contexts/AssessmentContext";
import { DragQuestionItem, DragTypes } from "../../../types/DragTypes";
import { Question } from "../../../types/QuestionTypes";
import { shouldReorder } from "../../../utils/QuestionUtils";

import QuestionTag, { QuestionTagProps } from "./QuestionTag";

interface QuestionCardProps {
  id: string;
  index: number;
  tags: QuestionTagProps[];
  questionNumber: number;
  questionInfo: Question;
  questions: string[];
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
}

const QuestionCard = ({
  id,
  index,
  questionNumber,
  questionInfo,
  questions,
  setQuestions,
  tags,
}: QuestionCardProps): React.ReactElement => {
  const { setShowQuestionEditor, setEditorQuestion } = useContext(
    AssessmentContext,
  );
  const removeQuestionCard = () => {
    setQuestions((prevQuestions) =>
      prevQuestions.filter((question) => question.id !== id),
    );
  };

  const reorderQuestionCards = (hoverIndex: number, dragIndex: number) => {
    setQuestions((prevQuestions) =>
      update(prevQuestions, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevQuestions[dragIndex]],
        ],
      }),
    );
  };

  const dragRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<
    DragQuestionItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: DragTypes.QUESTION_CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragQuestionItem, monitor) {
      if (!previewRef.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (shouldReorder(dragIndex, hoverIndex, previewRef, monitor)) {
        reorderQuestionCards(dragIndex, hoverIndex);
        /* eslint-disable no-param-reassign */
        item.index = hoverIndex;
      }
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    type: DragTypes.QUESTION_CARD,
    item: () => {
      return { id, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(dragRef);
  drop(preview(previewRef));

  const opacity = isDragging ? 0 : 1;
  return (
    <Box
      ref={previewRef}
      background="white"
      border="1px"
      borderColor="grey.200"
      borderRadius="22px"
      color="grey.300"
      data-handler-id={handlerId}
      style={{ opacity }}
      width="100%"
    >
      <HStack alignItems="left" padding="6">
        <Box
          ref={dragRef}
          aria-label="reorder"
          cursor="grab"
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
              _hover={{ color: "grey.300" }}
              color="blue.300"
              cursor="pointer"
              fontSize="24px"
              paddingRight="1"
            >
              <Button
                as={IconButton}
                color="currentColor"
                fontSize="24px"
                icon={<EditOutlineIcon />}
                onClick={() => {
                  setShowQuestionEditor(true);
                  setEditorQuestion(questionInfo);
                }}
                size="icon"
              />
            </Box>
            <Box _hover={{ color: "grey.300" }} color="blue.300">
              <Button
                as={IconButton}
                color="currentColor"
                fontSize="24px"
                icon={<DeleteOutlineIcon />}
                onClick={removeQuestionCard}
                size="icon"
              />
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
