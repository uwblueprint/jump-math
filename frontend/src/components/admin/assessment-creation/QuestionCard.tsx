import React, { useContext, useRef } from "react";
import type { DragSourceMonitor } from "react-dnd";
import { useDrag, useDrop } from "react-dnd";
import { useParams } from "react-router-dom";
import {
  Box,
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
import * as Routes from "../../../constants/Routes";
import AssessmentContext from "../../../contexts/AssessmentContext";
import type { DragQuestionItem } from "../../../types/DragTypes";
import { DragTypes } from "../../../types/DragTypes";
import type { Question } from "../../../types/QuestionTypes";
import {
  generateQuestionCardTags,
  getQuestionTexts,
  shouldReorder,
} from "../../../utils/QuestionUtils";

import QuestionTag from "./QuestionTag";

interface QuestionCardProps {
  index: number;
  question: Question;
}

const QuestionCard = ({
  index,
  question,
}: QuestionCardProps): React.ReactElement => {
  const { assessmentId } = useParams<{ assessmentId?: string }>();

  const { redirectableHistory, setQuestions, setQuestionEditorDirty } =
    useContext(AssessmentContext);

  const { id } = question;
  const questionTexts = getQuestionTexts(question.elements);
  const tags = generateQuestionCardTags(question.elements);

  const removeQuestionCard = () => {
    setQuestions((prevQuestions) =>
      prevQuestions.filter((prevQuestion) => prevQuestion.id !== question.id),
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
    collect: (monitor: DragSourceMonitor) => ({
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
          aria-label="Reorder question card"
          cursor="grab"
          fontSize="24px"
          paddingRight="6"
        >
          <HamburgerMenuIcon />
        </Box>
        <VStack alignItems="left" paddingRight="4" spacing="6" width="94%">
          <HStack>
            <Text color="grey.400" textStyle="subtitle1">
              Question {index + 1}
            </Text>
            <Spacer />
            <HStack spacing={4}>
              <IconButton
                aria-label="Edit question card"
                icon={<EditOutlineIcon />}
                onClick={() => {
                  setQuestionEditorDirty(false);
                  redirectableHistory.push(
                    assessmentId
                      ? Routes.ASSESSMENT_EDITOR_QUESTION_EDITOR_PAGE({
                          assessmentId,
                          questionIndex: String(index + 1),
                        })
                      : Routes.ASSESSMENT_CREATOR_QUESTION_EDITOR_PAGE({
                          questionIndex: String(index + 1),
                        }),
                  );
                }}
                size="icon"
                variant="icon"
              />
              <IconButton
                aria-label="Delete question card"
                icon={<DeleteOutlineIcon />}
                onClick={removeQuestionCard}
                size="icon"
                variant="icon"
              />
            </HStack>
          </HStack>
          <List
            fontWeight="700"
            spacing={4}
            stylePosition="inside"
            styleType={questionTexts.length > 1 ? "lower-alpha" : "none"}
            textStyle="paragraph"
          >
            {questionTexts.map((questionText, key) => (
              <ListItem
                key={key}
                color="grey.400"
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
              >
                <Text as="span" textStyle="paragraph">
                  {questionText}
                </Text>
              </ListItem>
            ))}
          </List>
          <Text color="grey.300" textStyle="caption">
            Total: {questionTexts.length} points
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
