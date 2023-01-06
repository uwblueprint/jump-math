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
import React from "react";
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
      onOpen={onOpen}
      onClose={onClose}
      placement="right"
      closeOnBlur={false}
    >
      <PopoverTrigger>
        <IconButton
          icon={<MoreVerticalOutlineIcon boxSize={5} />}
          aria-label="more-vertical-outline"
          size="sm"
        />
      </PopoverTrigger>
      <PopoverContent width="3xs" borderColor="grey.300" borderRadius="12px">
        <PopoverBody>
          <VStack spacing="0em">
            <RemoveUserModal
              name={name}
              email={email}
              onCloseParent={onClose}
            />
            <Button
              variant="primary"
              mb={2}
              bg="blue.200"
              opacity="0.6"
              onClick={onClose}
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
