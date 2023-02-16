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
  const names = ["Publish", "Edit", "Archive", "Delete"];
  const buttons = names.map((name, i) => (
    <>
      <EditStatusButton name={name} />
      <Divider key={i} px="17%" borderColor="grey.200" />
    </>
  ));
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
          <VStack spacing="0em">{buttons}</VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default EditStatusPopover;
