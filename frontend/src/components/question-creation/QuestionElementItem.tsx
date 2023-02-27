import React, { useContext, useRef } from "react";
import update from "immutability-helper";
import { IconButton, Button, Text, HStack, Box } from "@chakra-ui/react";
import { useDrag, useDrop } from "react-dnd";
import type { Identifier } from "dnd-core";
import { DeleteOutlineIcon, HamburgerMenuIcon } from "../../assets/icons";
import {
  QuestionElement,
  QuestionElementType,
} from "../../types/QuestionTypes";
import TextElement from "./question-elements/TextElement";
import QuestionEditorContext from "../../contexts/QuestionEditorContext";
import { DragTypes } from "../../types/DragTypes";
import { shouldReorder, DragItem } from "../../utils/QuestionUtils";

interface QuestionElementItemProps {
  content: QuestionElement;
  index: number;
}

const renderQuestionContent = (content: QuestionElement) => {
  const { id, type, data } = content;
  switch (type) {
    case QuestionElementType.QUESTION:
      return <Text key={id}>this is a question element.</Text>;
    case QuestionElementType.TEXT:
      return <TextElement key={id} id={id} data={data} />;
    case QuestionElementType.IMAGE:
      return <Text key={id}>this is an image element.</Text>;
    case QuestionElementType.MULTIPLE_CHOICE:
      return <Text key={id}>this is a multiple choice element.</Text>;
    case QuestionElementType.SHORT_ANSWER:
      return <Text key={id}>this is a short answer element.</Text>;
    case QuestionElementType.MULTI_SELECT:
      return <Text key={id}>this is a multi select element.</Text>;
    default:
      return null;
  }
};

const QuestionElementItem = ({
  content,
  index,
}: QuestionElementItemProps): React.ReactElement => {
  const { id, error } = content;
  const { setQuestionElements } = useContext(QuestionEditorContext);

  const reorderQuestionElements = (hoverIndex: number, dragIndex: number) => {
    setQuestionElements((prevElements) =>
      update(prevElements, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevElements[dragIndex]],
        ],
      }),
    );
  };

  const removeQuestionElement = () => {
    setQuestionElements((prevElements) =>
      prevElements.filter((element) => element.id !== id),
    );
  };

  const dragRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: DragTypes.QUESTION_ELEMENT_ITEM,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!previewRef.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (shouldReorder(dragIndex, hoverIndex, previewRef, monitor)) {
        reorderQuestionElements(dragIndex, hoverIndex);
        /* eslint-disable no-param-reassign */
        item.index = hoverIndex;
      }
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    type: DragTypes.QUESTION_ELEMENT_ITEM,
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
    <Box ref={previewRef} data-handler-id={handlerId} style={{ opacity }}>
      <HStack spacing="6" fontSize="24px" alignItems="flex-start">
        <Box ref={dragRef} color="grey.300" cursor="grab">
          <HamburgerMenuIcon />
        </Box>
        {renderQuestionContent(content)}
        <Box color="grey.300" _hover={{ color: "blue.100" }}>
          <Button
            onClick={removeQuestionElement}
            as={IconButton}
            icon={<DeleteOutlineIcon />}
            color="currentColor"
            fontSize="24px"
            size="icon"
          />
        </Box>
      </HStack>
      {error && <Text color="red.200">{error}</Text>}
    </Box>
  );
};

export default QuestionElementItem;
