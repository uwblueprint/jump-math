import React, { useContext, useRef } from "react";
import type { DragSourceMonitor } from "react-dnd";
import { useDrag, useDrop } from "react-dnd";
import { Box, HStack, IconButton, Text } from "@chakra-ui/react";
import type { Identifier } from "dnd-core";
import update from "immutability-helper";

import { DeleteOutlineIcon, HamburgerMenuIcon } from "../../../assets/icons";
import QuestionEditorContext from "../../../contexts/QuestionEditorContext";
import type { DragQuestionItem } from "../../../types/DragTypes";
import { DragTypes } from "../../../types/DragTypes";
import type {
  FractionMetadata,
  ImageMetadataRequest,
  QuestionTextMetadata,
  ShortAnswerMetadata,
  TextMetadata,
} from "../../../types/QuestionMetadataTypes";
import type { MultiData, QuestionElement } from "../../../types/QuestionTypes";
import { QuestionElementType } from "../../../types/QuestionTypes";
import { shouldReorder } from "../../../utils/QuestionUtils";

import FractionElement from "./question-elements/FractionElement";
import ImageElement from "./question-elements/ImageElement";
import MultiOptionElement from "./question-elements/MultiOptionElement";
import QuestionTextElement from "./question-elements/QuestionTextElement";
import ShortAnswerElement from "./question-elements/ShortAnswerElement";
import TextElement from "./question-elements/TextElement";

interface QuestionElementItemProps {
  content: QuestionElement;
  index: number;
}

const renderQuestionContent = (content: QuestionElement) => {
  const { id, type, data } = content;
  switch (type) {
    case QuestionElementType.QUESTION_TEXT:
      return (
        <QuestionTextElement
          key={id}
          data={data as QuestionTextMetadata}
          id={id}
        />
      );
    case QuestionElementType.TEXT:
      return <TextElement key={id} data={data as TextMetadata} id={id} />;
    case QuestionElementType.IMAGE:
      return (
        <ImageElement key={id} data={data as ImageMetadataRequest} id={id} />
      );
    case QuestionElementType.MULTIPLE_CHOICE:
      return (
        <MultiOptionElement
          key={id}
          data={data as MultiData}
          id={id}
          type={QuestionElementType.MULTIPLE_CHOICE}
        />
      );
    case QuestionElementType.MULTI_SELECT:
      return (
        <MultiOptionElement
          key={id}
          data={data as MultiData}
          id={id}
          type={QuestionElementType.MULTI_SELECT}
        />
      );
    case QuestionElementType.SHORT_ANSWER:
      return (
        <ShortAnswerElement
          key={id}
          data={data as ShortAnswerMetadata}
          id={id}
        />
      );
    case QuestionElementType.FRACTION:
      return (
        <FractionElement key={id} data={data as FractionMetadata} id={id} />
      );
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
    DragQuestionItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: DragTypes.QUESTION_ELEMENT_ITEM,
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
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(dragRef);
  drop(preview(previewRef));

  const opacity = isDragging ? 0 : 1;
  return (
    <Box ref={previewRef} data-handler-id={handlerId} style={{ opacity }}>
      <HStack alignItems="flex-start" fontSize="24px" spacing="6">
        <Box ref={dragRef} color="grey.300" cursor="grab">
          <HamburgerMenuIcon />
        </Box>
        {renderQuestionContent(content)}
        <IconButton
          _hover={{ color: "blue.100" }}
          aria-label="Delete question element"
          color="grey.300"
          icon={<DeleteOutlineIcon />}
          onClick={removeQuestionElement}
          size="icon"
        />
      </HStack>
      {error && <Text color="red.200">{error}</Text>}
    </Box>
  );
};

export default QuestionElementItem;
