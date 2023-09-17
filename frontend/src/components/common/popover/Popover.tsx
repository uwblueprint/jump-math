import React from "react";
import {
  IconButton,
  Popover as ChakraPopover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from "@chakra-ui/react";

import { MoreVerticalOutlineIcon } from "../../../assets/icons";

import { PopoverContext } from "./PopoverContext";

interface PopoverProps {
  children: React.ReactNode;
  placement?: "bottom" | "right";
  trigger?: React.ReactElement;
}

const Popover = ({
  children,
  placement = "right",
  trigger,
}: PopoverProps): React.ReactElement => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const triggerButton = trigger ?? (
    <IconButton
      aria-label="Show more"
      icon={<MoreVerticalOutlineIcon boxSize={5} />}
      size="sm"
    />
  );

  return (
    <ChakraPopover
      isOpen={isOpen}
      onClose={onClose}
      onOpen={onOpen}
      placement={placement}
      size="status"
    >
      <PopoverTrigger>{triggerButton}</PopoverTrigger>
      <PopoverContent
        backgroundColor="grey.100"
        border="none"
        borderRadius="16px"
        boxShadow="4px 4px 40px 5px rgba(0, 0, 0, 0.08)"
        maxHeight="50%"
        overflow="hidden"
        width="100%"
      >
        <PopoverContext.Provider value={{ onClose }}>
          <PopoverBody>{children}</PopoverBody>
        </PopoverContext.Provider>
      </PopoverContent>
    </ChakraPopover>
  );
};

export default Popover;
