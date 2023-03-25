import React from "react";
import {
  IconButton,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";

import { MoreVerticalOutlineIcon } from "../../assets/icons";

import DeleteAssessmentButton from "./EditStatusButtons/DeleteAssessmentButton";

interface EditStatusPopoverProps {
  assessmentId: string;
}

const EditStatusPopover = ({
  assessmentId,
}: EditStatusPopoverProps): React.ReactElement => {
  const { onOpen, onClose, isOpen } = useDisclosure();

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
          <VStack spacing="0em">
            <DeleteAssessmentButton assessmentId={assessmentId} />
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default EditStatusPopover;
