import React from "react";
import {
  Button,
  Divider,
  Modal,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from "@chakra-ui/react";

import ModalText from "./ModalText";

interface GenericModalProps {
  header: string;
  body?: string;
  onClose: () => void;
  isOpen: boolean;
  onCancel?: () => void;
  backButtonText?: string;
  submitButtonText?: string;
  onSubmit: (() => Promise<void>) | (() => void);
}

const GenericModal = ({
  header,
  body,
  onClose,
  isOpen,
  onCancel,
  backButtonText = "Cancel",
  submitButtonText = "Confirm",
  onSubmit,
}: GenericModalProps): React.ReactElement => {
  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW="600px" p={2}>
        <ModalText body={body} header={header} />
        <Divider style={{ marginTop: "1em" }} />
        <ModalFooter justifyContent="center" my={0.5}>
          {onCancel && (
            <Button mr={2} onClick={onCancel} variant="secondary">
              {backButtonText}
            </Button>
          )}
          <Button onClick={onSubmit} variant="primary">
            {submitButtonText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default GenericModal;
