import React from "react";
import { Icon, Text, VStack, WrapItem } from "@chakra-ui/react";
import { useDrag } from "react-dnd";

import { ItemTypes } from "./ItemTypes";

interface QuestionElementProps {
  key: number;
  icon: () => React.ReactElement;
  caption: string;
}

interface DropResult {
  name: string;
}

const QuestionElement = ({
  key,
  icon,
  caption,
}: QuestionElementProps): React.ReactElement => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.SQUARE,
    item: { caption },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>();
      if (item && dropResult) {
        alert(`You dropped ${item.caption} into ${dropResult.name}!`);
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
      <WrapItem key={key}>
        <VStack>
          <Icon as={icon} />
          <Text textStyle="caption">{caption}</Text>
        </VStack>
      </WrapItem>
    </div>
  );
};

export default QuestionElement;
