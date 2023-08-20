import React from "react";
import { useDisclosure } from "@chakra-ui/react";

import PopoverButton from "../../../common/popover/PopoverButton";
import UnarchiveModal from "../EditStatusModals/UnarchiveModal";

interface UnarchiveButtonProps {
  assessmentId: string;
}

const UnarchiveButton = ({
  assessmentId,
}: UnarchiveButtonProps): React.ReactElement => {
  const { onOpen, isOpen, onClose } = useDisclosure();

  return (
    <>
      <PopoverButton name="Unarchive" onClick={onOpen} />
      <UnarchiveModal
        assessmentId={assessmentId}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};

export default UnarchiveButton;
