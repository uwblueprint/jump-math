import React, { useState } from "react";
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

import ActionButton from "../form/ActionButton";
import ErrorToast from "../info/toasts/ErrorToast";

import ModalText from "./ModalText";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  body?: React.ReactNode;
  header: React.ReactNode;
  children?: React.ReactNode;
  submitButtonText?: string;
  cancelButtonText?: string;
  submitButtonVariant?: string;
  cancelButtonVariant?: string;
  onBack?: () => void;
  messageOnSuccess?: string;
  messageOnError?: string | (<T>(e: T) => string);
  onSubmit: (() => Promise<unknown>) | (() => unknown);
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
  messageOnSuccess,
  messageOnError: generateErrorMessage,
  onSubmit,
}: ModalProps): React.ReactElement => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleClose = () => {
    if (loading) {
      return;
    }
    setErrorMessage("");
    onClose();
  };

  return (
    <ChakraModal isCentered isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent borderRadius="12px" minW="42vw">
        {errorMessage && <ErrorToast errorMessage={errorMessage} />}
        <ModalText body={body} header={header} />
        <ModalCloseButton />
        {children && <ModalBody>{children}</ModalBody>}
        <Divider mt="1.5em" />
        <ModalFooter>
          <Button
            isDisabled={loading}
            minWidth="10%"
            mr={2}
            onClick={onBack ?? handleClose}
            variant={cancelButtonVariant || "secondary"}
          >
            {cancelButtonText}
          </Button>
          <ActionButton
            isLoading={loading}
            messageOnError={generateErrorMessage}
            messageOnSuccess={messageOnSuccess}
            minWidth="10%"
            onAfterSuccess={handleClose}
            onClick={onSubmit}
            onError={setErrorMessage}
            setLoading={setLoading}
            showDefaultToasts
            variant={submitButtonVariant || "primary"}
          >
            {submitButtonText}
          </ActionButton>
        </ModalFooter>
      </ModalContent>
    </ChakraModal>
  );
};

export default Modal;
