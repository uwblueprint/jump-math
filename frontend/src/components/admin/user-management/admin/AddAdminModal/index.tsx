import React from "react";
import { useDisclosure } from "@chakra-ui/react";

import ConfirmationModal from "./ConfirmationModal";
import FormModal from "./FormModal";

type AddAdminModalProps = {
  onClose: () => void;
  isOpen: boolean;
};

const AddAdminModal = ({
  onClose: onFormModalClose,
  isOpen: isFormModalOpen,
}: AddAdminModalProps): React.ReactElement => {
  const {
    onOpen: onConfirmationModalOpen,
    isOpen: isConfirmationModalOpen,
    onClose: onConfirmationModalClose,
  } = useDisclosure();

  return (
    <>
      <FormModal
        isOpen={isFormModalOpen}
        onClose={onFormModalClose}
        onSubmit={onConfirmationModalOpen}
      />
      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={onConfirmationModalClose}
      />
    </>
  );
};

export default AddAdminModal;
