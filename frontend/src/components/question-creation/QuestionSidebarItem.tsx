import React, { useContext } from "react";
import { Box, Icon, Text, VStack, WrapItem } from "@chakra-ui/react";
import { useDrag } from "react-dnd";

import {
  QuestionElement,
  QuestionElementType,
} from "../../types/QuestionTypes";
import { DragTypes } from "../../types/DragTypes";
import QuestionEditorContext from "../../contexts/QuestionEditorContext";

interface QuestionSidebarItemProps {
  elementType: QuestionElementType;
  icon: () => React.ReactElement;
}

interface DropResult {
  name: string;
}

const QuestionSidebarItem = ({
  elementType,
  icon,
}: QuestionSidebarItemProps): React.ReactElement => {
  const { setQuestionElements } = useContext(QuestionEditorContext);

  const addQuestionElement = (newQuestionElement: QuestionElement) => {
    setQuestionElements((prevElements) => [
      ...prevElements,
      newQuestionElement,
    ]);
  };

  const [{ isDragging }, drag] = useDrag(() => ({
    type: DragTypes.QUESTION_ELEMENT,
    item: { elementType },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>();
      if (item && dropResult) {
        addQuestionElement({ type: item.elementType, data: "" });
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
          <Text textStyle="caption">{elementType.valueOf()}</Text>
        </VStack>
      </WrapItem>
    </Box>
  );
};

export default QuestionSidebarItem;
