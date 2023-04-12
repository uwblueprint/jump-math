import React from "react";
import {
  Divider,
  IconButton,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  StackDivider,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";

import { MoreVerticalOutlineIcon } from "../../../assets/icons";
import { Status } from "../../../types/AssessmentTypes";

import ArchiveButton from "./EditStatusButtons/ArchiveButton";
import DeleteButton from "./EditStatusButtons/DeleteButton";
import DuplicateButton from "./EditStatusButtons/DuplicateButton";
import PublishButton from "./EditStatusButtons/PublishButton";
import UnarchiveButton from "./EditStatusButtons/UnarchiveButton";

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
          <VStack divider={<Divider borderColor="grey.200" />} spacing="0em">
            {assessmentStatus === Status.DRAFT && (
              <PublishButton
                assessmentId={assessmentId}
                closePopover={onClose}
              />
            )}
            {assessmentStatus === Status.ARCHIVED ? (
              <UnarchiveButton
                assessmentId={assessmentId}
                closePopover={onClose}
              />
            ) : (
              <>
                <ArchiveButton
                  assessmentId={assessmentId}
                  closePopover={onClose}
                />
                <Divider borderColor="grey.200" />
                <DuplicateButton
                  assessmentId={assessmentId}
                  closePopover={onClose}
                />
              </>
            )}
            <DeleteButton assessmentId={assessmentId} closePopover={onClose} />
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default EditStatusPopover;
