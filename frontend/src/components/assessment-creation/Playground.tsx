import React from "react";
import { Box, Text, VStack } from "@chakra-ui/react";
import { useDrop } from "react-dnd";

import { ItemTypes } from "./ItemTypes";
import TextInput from "./TextInput";

const Playground = (): React.ReactElement => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.SQUARE,
    drop: () => ({ name: "Playground" }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const isActive = canDrop && isOver;

  return (
    <div ref={drop}>
      <Box flex="1">
        <VStack margin="3em 5em" align="left" color="grey.400">
          <TextInput />
          <Text textStyle="subtitle1" marginBottom={5}>
            Welcome to the question creation module.
          </Text>
          <Text textStyle="paragraph" marginBottom={3}>
            Click on any of the elements in the left-side and drag them into the
            creation area.
          </Text>
          <Text textStyle="paragraph">
            Select any of the blocks to reorder them. Hover over a block to
            delete it.
          </Text>
        </VStack>
      </Box>
    </div>
  );
};

export default Playground;
