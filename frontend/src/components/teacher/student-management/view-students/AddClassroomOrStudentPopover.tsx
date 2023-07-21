import React from "react";
import { Button, Divider, useDisclosure, VStack } from "@chakra-ui/react";

import { PlusOutlineIcon } from "../../../../assets/icons";
import Popover from "../../../common/popover/Popover";
import PopoverButton from "../../../common/popover/PopoverButton";

type AddClassroomOrStudentPopoverProps = {
  isDisabled: boolean;
  onCreateClassroom: () => void;
  onCreateStudent: () => void;
};

const AddClassroomOrStudentPopover = ({
  isDisabled,
  onCreateClassroom,
  onCreateStudent,
}: AddClassroomOrStudentPopoverProps) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Popover
      isOpen={isOpen}
      onClose={onClose}
      onOpen={onOpen}
      placement="bottom"
      trigger={
        <Button
          isDisabled={isDisabled}
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
          onClick={onCreateClassroom}
        />
        <PopoverButton
          aria-label="Add student"
          name="Student"
          onClick={onCreateStudent}
        />
      </VStack>
    </Popover>
  );
};

export default AddClassroomOrStudentPopover;
