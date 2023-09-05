import React from "react";
import { Divider, useDisclosure, VStack } from "@chakra-ui/react";

import { Status } from "../../../types/AssessmentTypes";
import Popover from "../../common/popover/Popover";

import ArchiveButton from "./EditStatusButtons/ArchiveButton";
import DeleteButton from "./EditStatusButtons/DeleteButton";
import DuplicateButton from "./EditStatusButtons/DuplicateButton";
import EditButton from "./EditStatusButtons/EditButton";
import PreviewButton from "./EditStatusButtons/PreviewButton";
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
      <VStack divider={<Divider />} spacing="0em">
        {assessmentStatus === Status.DRAFT && (
          <>
            <PublishButton assessmentId={assessmentId} />
            <Divider />
            <EditButton assessmentId={assessmentId} />
          </>
        )}
        {assessmentStatus === Status.ARCHIVED ? (
          <UnarchiveButton assessmentId={assessmentId} />
        ) : (
          <>
            <ArchiveButton assessmentId={assessmentId} />
            <Divider />
            <DuplicateButton assessmentId={assessmentId} />
          </>
        )}
        <PreviewButton assessmentId={assessmentId} />
        <DeleteButton assessmentId={assessmentId} />
      </VStack>
    </Popover>
  );
};

export default EditStatusPopover;
