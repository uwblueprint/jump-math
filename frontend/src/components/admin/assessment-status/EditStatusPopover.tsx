import React from "react";
import { Divider, VStack } from "@chakra-ui/react";

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
}: EditStatusPopoverProps): React.ReactElement => (
  <Popover>
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
          {assessmentStatus === Status.PUBLISHED && (
            <>
              <ArchiveButton assessmentId={assessmentId} />
              <Divider />
            </>
          )}
          <DuplicateButton assessmentId={assessmentId} />
        </>
      )}
      <DeleteButton assessmentId={assessmentId} />
    </VStack>
  </Popover>
);

export default EditStatusPopover;
