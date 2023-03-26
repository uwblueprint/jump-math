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
import { Status } from "../../types/AssessmentTypes";

import DeleteAssessmentButton from "./EditStatusButtons/DeleteAssessmentButton";
import PublishAssessmentButton from "./EditStatusButtons/PublishAssessmentButton";

interface EditStatusPopoverProps {
  assessmentId: string;
  assessmentStatus: Status;
}

const EditStatusPopover = ({
  assessmentId,
  assessmentStatus,
}: EditStatusPopoverProps): React.ReactElement => {
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
      <PopoverContent
        backgroundColor="grey.100"
        borderRadius="15%"
        maxHeight="50%"
        width="80%"
      >
        <PopoverBody>
          <VStack spacing="0em">
            {assessmentStatus === Status.DRAFT && (
              <>
                <PublishAssessmentButton
                  assessmentId={assessmentId}
                  closePopover={onClose}
                />
                <Divider borderColor="grey.200" px="17%" />
              </>
            )}
            <DeleteAssessmentButton
              assessmentId={assessmentId}
              closePopover={onClose}
            />
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default EditStatusPopover;
