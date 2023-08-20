import React from "react";
import { Divider, useDisclosure, VStack } from "@chakra-ui/react";

import Popover from "../../../common/popover/Popover";
import PopoverButton from "../../../common/popover/PopoverButton";

const ClassroomPopover = (): React.ReactElement => {
  const {
    isOpen: isPopoverOpen,
    onOpen: onPopoverOpen,
    onClose: onPopoverClose,
  } = useDisclosure();

  return (
    <Popover
      isOpen={isPopoverOpen}
      onClose={onPopoverClose}
      onOpen={onPopoverOpen}
    >
      <VStack spacing={0}>
        <PopoverButton name="Edit" onClick={() => {}} />
        <Divider />
        <PopoverButton name="Delete" onClick={() => {}} />
      </VStack>
    </Popover>
  );
};

export default ClassroomPopover;
