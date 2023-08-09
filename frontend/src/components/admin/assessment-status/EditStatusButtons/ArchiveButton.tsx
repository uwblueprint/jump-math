import React from "react";
import { useMutation } from "@apollo/client";
import { useDisclosure } from "@chakra-ui/react";

import { ARCHIVE_TEST } from "../../../../APIClients/mutations/TestMutations";
import { GET_ALL_TESTS } from "../../../../APIClients/queries/TestQueries";
import Toast from "../../../common/info/Toast";
import PopoverButton from "../../../common/popover/PopoverButton";
import ArchiveModal from "../EditStatusModals/ArchiveModal";

interface ArchiveModalProps {
  assessmentId: string;
}

const ArchiveButton = ({
  assessmentId,
}: ArchiveModalProps): React.ReactElement => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const [archiveAssessment, { error }] = useMutation<{
    archiveAssessment: string;
  }>(ARCHIVE_TEST, {
    refetchQueries: [{ query: GET_ALL_TESTS }],
  });

  const { showToast } = Toast();

  const handleArchiveAssessment = async () => {
    await archiveAssessment({ variables: { id: assessmentId } });
    if (error) {
      showToast({
        message: "Assessment failed to archive. Please try again.",
        status: "error",
      });
    } else {
      showToast({
        message: "Assessment archived.",
        status: "success",
      });
    }
  };
  return (
    <>
      <PopoverButton name="Archive" onClick={onOpen} />
      <ArchiveModal
        archiveAssessment={handleArchiveAssessment}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};

export default ArchiveButton;
