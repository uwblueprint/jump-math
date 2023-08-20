import React from "react";
import {
  Button,
  Divider,
  Modal as ChakraModal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from "@chakra-ui/react";

import ModalText from "./ModalText";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  body?: string;
  header: React.ReactNode;
  children?: React.ReactNode;
  submitButtonText?: string;
  cancelButtonText?: string;
  submitButtonVariant?: string;
  cancelButtonVariant?: string;
  onBack?: () => void;
  onSubmit: (() => Promise<void>) | (() => void);
}

const Modal = ({
  isOpen,
  onBack,
  onClose,
  body,
  header,
  children,
  submitButtonText = "Confirm",
  cancelButtonText = "Cancel",
  submitButtonVariant,
  cancelButtonVariant,
  onSubmit,
}: ModalProps): React.ReactElement => {
  return (
    <ChakraModal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent borderRadius="12px" minW="42vw">
        <ModalText body={body} header={header} />
        <ModalCloseButton />
        {children && <ModalBody>{children}</ModalBody>}
        <Divider mt="1.5em" />
        <ModalFooter>
          <Button
            minWidth="10%"
            mr={2}
            onClick={onBack ?? onClose}
            variant={cancelButtonVariant || "secondary"}
          >
            {cancelButtonText}
          </Button>
          <Button
            minWidth="10%"
            onClick={onSubmit}
            variant={submitButtonVariant || "primary"}
          >
            {submitButtonText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </ChakraModal>
  );
};

export default Modal;
