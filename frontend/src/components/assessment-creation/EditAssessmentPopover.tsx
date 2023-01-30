import {
  Button,
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

const EditAssessmentPopover = (): React.ReactElement => {
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
      <PopoverContent width="6rem" borderColor="grey.300" borderRadius="12px">
        <PopoverBody width="6rem">
          <VStack spacing="0em">
            <Button
              minWidth="120px"
              fontWeight="0"
              pt="1"
              pb="1"
              color="black"
              size="md"
            >
              Publish
            </Button>
            <Divider px="3" color="#BEBEBE" />
            <Button
              minWidth="120px"
              fontWeight="0"
              pt="1"
              pb="1"
              color="black"
              size="md"
            >
              Edit
            </Button>
            <Divider />
            <Button
              minWidth="120px"
              fontWeight="0"
              pt="1"
              pb="1"
              color="black"
              size="md"
            >
              Archive
            </Button>
            <Divider />
            <Button
              minWidth="120px"
              fontWeight="0"
              pt="1"
              pb="1"
              color="black"
              size="md"
            >
              Delete
            </Button>
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default EditAssessmentPopover;
