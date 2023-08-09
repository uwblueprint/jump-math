import React from "react";
import { useDisclosure } from "@chakra-ui/react";

import PopoverButton from "../../../common/popover/PopoverButton";
import DuplicateModal from "../EditStatusModals/DuplicateModal";

interface DuplicateButtonProps {
  assessmentId: string;
}

const DuplicateButton = ({
  assessmentId,
}: DuplicateButtonProps): React.ReactElement => {
  const { onOpen, isOpen, onClose } = useDisclosure();

  return (
    <>
      <PopoverButton name="Duplicate" onClick={onOpen} />
      <DuplicateModal
        assessmentId={assessmentId}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};

export default DuplicateButton;
