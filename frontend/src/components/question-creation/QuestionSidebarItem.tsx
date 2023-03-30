import React, { useContext } from "react";
import { useDrag } from "react-dnd";
import { Box, Icon, Text, VStack, WrapItem } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";

import QuestionEditorContext from "../../contexts/QuestionEditorContext";
import { DragTypes } from "../../types/DragTypes";
import {
  QuestionElement,
  QuestionElementType,
} from "../../types/QuestionTypes";

interface QuestionSidebarItemProps {
  type: QuestionElementType;
  icon: () => React.ReactElement;
}

interface DropResult {
  name: string;
}

const QuestionSidebarItem = ({
  type,
  icon,
}: QuestionSidebarItemProps): React.ReactElement => {
  const {
    setQuestionElements,
    setShowAddShortAnswerModal,
    setShowAddMultipleChoiceModal,
    setShowEditorError,
  } = useContext(QuestionEditorContext);

  const addQuestionElement = (newQuestionElement: QuestionElement) => {
    setQuestionElements((prevElements) => [
      ...prevElements,
      newQuestionElement,
    ]);
  };

  const [{ isDragging }, drag] = useDrag(() => ({
    type: DragTypes.QUESTION_SIDEBAR_ITEM,
    item: { type },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>();
      if (item && dropResult) {
        switch (item.type) {
          case QuestionElementType.SHORT_ANSWER:
            setShowAddShortAnswerModal(true);
            break;
          case QuestionElementType.MULTIPLE_CHOICE:
            setShowAddMultipleChoiceModal(true);
            break;
          case QuestionElementType.QUESTION:
            setShowEditorError(false);
            addQuestionElement({ id: uuidv4(), type: item.type, data: "" });
            break;
          default:
            addQuestionElement({ id: uuidv4(), type: item.type, data: "" });
        }
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  const opacity = isDragging ? 0.4 : 1;
  return (
    <Box ref={drag} style={{ opacity }}>
      <WrapItem cursor="grab">
        <VStack>
          <Icon as={icon} />
          <Text textStyle="caption">{type.valueOf()}</Text>
        </VStack>
      </WrapItem>
    </Box>
  );
};

export default QuestionSidebarItem;
