import React from "react";
import { Icon, Text, VStack, WrapItem } from "@chakra-ui/react";
import { useDrag } from "react-dnd";

import QuestionElement from "./types/QuestionTypes";
import { DragTypes } from "./types/DragTypes";

interface QuestionSidebarItemProps {
  element: QuestionElement;
  addItem: (newQuestionElement: QuestionElement) => void;
  icon: () => React.ReactElement;
}

interface DropResult {
  name: string;
}

const QuestionSidebarItem = ({
  element,
  addItem,
  icon,
}: QuestionSidebarItemProps): React.ReactElement => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: DragTypes.QUESTION_ELEMENT,
    item: { element },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>();
      if (item && dropResult) {
        addItem(element);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  const opacity = isDragging ? 0.4 : 1;
  return (
    <div ref={drag} style={{ opacity }}>
      <WrapItem>
        <VStack>
          <Icon as={icon} />
          <Text textStyle="caption">{element.valueOf()}</Text>
        </VStack>
      </WrapItem>
    </div>
  );
};

export default QuestionSidebarItem;
