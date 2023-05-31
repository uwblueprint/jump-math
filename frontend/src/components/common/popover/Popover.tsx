import React from "react";
import {
  IconButton,
  Popover as ChakraPopover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";

import { MoreVerticalOutlineIcon } from "../../../assets/icons";

interface PopoverProps {
  children: React.ReactChild;
  onOpen: () => void;
  isOpen: boolean;
  onClose: () => void;
}

const Popover = ({
  children,
  onOpen,
  isOpen,
  onClose,
}: PopoverProps): React.ReactElement => {
  return (
    <ChakraPopover
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
      <PopoverContent
        backgroundColor="grey.100"
        borderRadius="15%"
        maxHeight="50%"
        width="80%"
      >
        <PopoverBody>{children}</PopoverBody>
      </PopoverContent>
    </ChakraPopover>
  );
};

export default Popover;
