import React from "react";
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

import { MoreVerticalOutlineIcon } from "../../assets/icons";

import EditStatusButton from "./EditStatusButton";

const EditStatusPopover = (): React.ReactElement => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const names = ["Publish", "Edit", "Archive", "Delete"];
  const buttons = names.map((name, i) => (
    <>
      <EditStatusButton name={name} />
      {name !== "Delete" && <Divider key={i} borderColor="grey.200" px="17%" />}
    </>
  ));
  return (
    <Popover
      closeOnBlur={false}
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
        <PopoverBody>
          <VStack spacing="0em">{buttons}</VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default EditStatusPopover;
