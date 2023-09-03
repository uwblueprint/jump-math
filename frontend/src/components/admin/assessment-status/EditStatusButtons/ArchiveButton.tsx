import React from "react";
import { useMutation } from "@apollo/client";
import { useDisclosure } from "@chakra-ui/react";

import { ARCHIVE_TEST } from "../../../../APIClients/mutations/TestMutations";
import { GET_ALL_TESTS } from "../../../../APIClients/queries/TestQueries";
import { getQueryName } from "../../../../utils/GeneralUtils";
import PopoverButton from "../../../common/popover/PopoverButton";
import ArchiveAssessmentModal from "../EditStatusModals/ArchiveAssessmentModal";

interface ArchiveModalProps {
  assessmentId: string;
}

const ArchiveButton = ({
  assessmentId,
}: ArchiveModalProps): React.ReactElement => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const [archiveAssessment] = useMutation<{
    archiveAssessment: string;
  }>(ARCHIVE_TEST, {
    variables: { id: assessmentId },
    refetchQueries: [getQueryName(GET_ALL_TESTS)],
  });

  return (
    <>
      <PopoverButton name="Archive" onClick={onOpen} />
      <ArchiveAssessmentModal
        archiveAssessment={archiveAssessment}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};

export default ArchiveButton;
