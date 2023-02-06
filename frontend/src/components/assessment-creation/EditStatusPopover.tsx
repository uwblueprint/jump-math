import {
  Divider,
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
import EditStatusButton from "./EditStatusButton";

const EditStatusPopover = (): React.ReactElement => {
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
      <PopoverContent
        backgroundColor="grey.100"
        maxHeight="50%"
        width="80%"
        borderRadius="15%"
      >
        <PopoverBody>
          <VStack spacing="0em">
            <EditStatusButton buttonName="Publish" />
            <Divider px="17%" borderColor="grey.200" />
            <EditStatusButton buttonName="Edit" />
            <Divider px="17%" borderColor="grey.200" />
            <EditStatusButton buttonName="Archive" />
            <Divider px="17%" borderColor="grey.200" />
            <EditStatusButton buttonName="Delete" />
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default EditStatusPopover;
