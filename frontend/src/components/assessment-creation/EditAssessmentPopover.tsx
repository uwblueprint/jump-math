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
      <PopoverContent
        backgroundColor="#F4F4F4"
        height="220px"
        width="104px"
        borderRadius="20px"
      >
        <PopoverBody>
          <VStack spacing="0em">
            <Button
              fontSize="18px"
              minWidth="120px"
              fontWeight="0"
              py="1"
              color="black"
              size="md"
            >
              Publish
            </Button>
            <Divider px="3" borderColor="#BEBEBE" />
            <Button
              fontSize="18px"
              textAlign="left"
              minWidth="120px"
              fontWeight="0"
              py="1.6rem"
              color="black"
              size="md"
              pl="1"
            >
              Edit
            </Button>
            <Divider px="3" borderColor="#BEBEBE" />
            <Button
              fontSize="18px"
              minWidth="120px"
              fontWeight="0"
              py="1.6rem"
              color="black"
              size="md"
            >
              Archive
            </Button>
            <Divider px="3" borderColor="#BEBEBE" />
            <Button
              fontSize="18px"
              minWidth="120px"
              fontWeight="0"
              py="1"
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
