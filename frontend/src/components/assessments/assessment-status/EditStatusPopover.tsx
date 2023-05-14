import React from "react";
import { Divider, useDisclosure, VStack } from "@chakra-ui/react";

import { Status } from "../../../types/AssessmentTypes";
import Popover from "../../common/popover/Popover";

import ArchiveButton from "./EditStatusButtons/ArchiveButton";
import DeleteButton from "./EditStatusButtons/DeleteButton";
import DuplicateButton from "./EditStatusButtons/DuplicateButton";
import EditButton from "./EditStatusButtons/EditButton";
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
  const { onOpen, isOpen, onClose } = useDisclosure();
  return (
    <Popover isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
      <VStack divider={<Divider borderColor="grey.200" />} spacing="0em">
        {assessmentStatus === Status.DRAFT && (
          <>
            <PublishButton assessmentId={assessmentId} closePopover={onClose} />
            <Divider borderColor="grey.200" />
            <EditButton assessmentId={assessmentId} closePopover={onClose} />
          </>
        )}
        {assessmentStatus === Status.ARCHIVED ? (
          <UnarchiveButton assessmentId={assessmentId} closePopover={onClose} />
        ) : (
          <>
            <ArchiveButton assessmentId={assessmentId} closePopover={onClose} />
            <Divider borderColor="grey.200" />
            <DuplicateButton
              assessmentId={assessmentId}
              closePopover={onClose}
            />
          </>
        )}
        <DeleteButton assessmentId={assessmentId} closePopover={onClose} />
      </VStack>
    </Popover>
  );
};

export default EditStatusPopover;
