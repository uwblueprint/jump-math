import React from "react";
import { Divider, useDisclosure, VStack } from "@chakra-ui/react";

import Popover from "../../../common/popover/Popover";
import PopoverButton from "../../../common/popover/PopoverButton";

const EditStudentPopover = (): React.ReactElement => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  return (
    <Popover isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
      <VStack divider={<Divider />} spacing="0em">
        <PopoverButton name="Edit" onClick={() => {}} />
        <PopoverButton name="Delete" onClick={() => {}} />
      </VStack>
    </Popover>
  );
};

export default EditStudentPopover;
