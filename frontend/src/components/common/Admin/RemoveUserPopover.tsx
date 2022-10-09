import {
  Button,
  IconButton,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { MoreVerticalOutlineIcon } from "../icons";
import RemoveUserModal from "./RemoveUserModal";

interface RemoveUserPopoverProps {
  name: string;
  email: string;
}

const RemoveUserPopover = ({
  name,
  email,
}: RemoveUserPopoverProps): React.ReactElement => {
  const { onOpen, onClose, isOpen } = useDisclosure();

  return (
    <Popover
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      placement="right"
      closeOnBlur={false}
    >
      <PopoverTrigger>
        <IconButton
          icon={<MoreVerticalOutlineIcon />}
          aria-label="more-vertical-outline"
        />
      </PopoverTrigger>
      <PopoverContent width="3xs" borderColor="grey.300" borderRadius="12px">
        <PopoverBody>
          <RemoveUserModal name={name} email={email} />
          <Button variant="primary" mb={2} isActive onClick={onClose}>
            Cancel
          </Button>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default RemoveUserPopover;
