import React from "react";
import { Button, Divider, useDisclosure, VStack } from "@chakra-ui/react";

import { PlusOutlineIcon } from "../../../../assets/icons";
import Popover from "../../../common/popover/Popover";
import PopoverButton from "../../../common/popover/PopoverButton";

const AddClassroomOrStudentPopover = ({ disabled }: { disabled: boolean }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Popover
      isOpen={isOpen}
      onClose={onClose}
      onOpen={onOpen}
      placement="bottom"
      trigger={
        <Button
          isDisabled={disabled}
          minW={0}
          rightIcon={<PlusOutlineIcon />}
          variant="primary"
        >
          Add
        </Button>
      }
    >
      <VStack divider={<Divider />} spacing={0}>
        <PopoverButton
          aria-label="Add assessment"
          name="Assessment"
          onClick={() => {}}
        />
        <PopoverButton
          aria-label="Add student"
          name="Student"
          onClick={() => {}}
        />
      </VStack>
    </Popover>
  );
};

export default AddClassroomOrStudentPopover;
