import React, { useContext, useRef } from "react";
import update from "immutability-helper";
import { Button, IconButton, Text, HStack, Box } from "@chakra-ui/react";
import { useDrag, useDrop } from "react-dnd";
import type { Identifier, XYCoord } from "dnd-core";
import { DeleteOutlineIcon, HamburgerMenuIcon } from "../../assets/icons";
import {
  QuestionElement,
  QuestionElementType,
} from "../../types/QuestionTypes";
import TextElement from "./question-elements/TextElement";
import QuestionEditorContext from "../../contexts/QuestionEditorContext";
import { DragTypes } from "../../types/DragTypes";

export interface QuestionElementItemProps {
  content: QuestionElement;
  index: number;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
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
      prevElements.filter((item) => item.id !== id),
    );
  };

  const ref = useRef<HTMLDivElement>(null);
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
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      reorderQuestionElements(dragIndex, hoverIndex);

      /* eslint-disable no-param-reassign */
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: DragTypes.QUESTION_ELEMENT_ITEM,
    item: () => {
      return { id, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <Box ref={ref} data-handler-id={handlerId}>
      <HStack spacing="6" fontSize="24px" alignItems="flex-start">
        <Box color="grey.300" cursor="grab">
          <HamburgerMenuIcon />
        </Box>
        {renderQuestionContent(content)}
        {/* NOTE TO JOYCE: verify hover behaviour with design */}
        <Box color="grey.300" _hover={{ color: "blue.100" }}>
          <Button
            onClick={removeQuestionElement}
            as={IconButton}
            icon={<DeleteOutlineIcon />}
            color="currentColor"
            fontSize="24px"
          />
        </Box>
      </HStack>
      {error && <Text color="red.200">{error}</Text>}
    </Box>
  );
};

export default QuestionElementItem;
