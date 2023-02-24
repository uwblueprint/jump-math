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
  element: QuestionElementType;
  icon: () => React.ReactElement;
}

interface DropResult {
  name: string;
}

const QuestionSidebarItem = ({
  element,
  icon,
}: QuestionSidebarItemProps): React.ReactElement => {
  const { questionElements, setQuestionElements } = useContext(
    QuestionEditorContext,
  );

  const handleAddElement = (newElement: QuestionElement) => {
    setQuestionElements((prevElements) => [...prevElements, newElement]);
  };

  const [{ isDragging }, drag] = useDrag(() => ({
    type: DragTypes.QUESTION_ELEMENT,
    item: { element },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>();
      if (item && dropResult) {
        handleAddElement({ type: item.element, data: "" });
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
          <Text textStyle="caption">{element.valueOf()}</Text>
        </VStack>
      </WrapItem>
    </Box>
  );
};

export default QuestionSidebarItem;
