import React from "react";
import {
  Button,
  IconButton,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";

import { MoreVerticalOutlineIcon } from "../../assets/icons";

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
      onClose={onClose}
      onOpen={onOpen}
      placement="right"
    >
      <PopoverTrigger>
        <IconButton
          aria-label="more-vertical-outline"
          icon={<MoreVerticalOutlineIcon boxSize={5} />}
          size="sm"
        />
      </PopoverTrigger>
      <PopoverContent borderColor="grey.300" borderRadius="12px" width="3xs">
        <PopoverBody>
          <VStack spacing="0em">
            <RemoveUserModal email={email} name={name} />
            <Button
              bg="blue.200"
              mb={2}
              onClick={onClose}
              opacity="0.6"
              variant="primary"
            >
              Cancel
            </Button>
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default RemoveUserPopover;
