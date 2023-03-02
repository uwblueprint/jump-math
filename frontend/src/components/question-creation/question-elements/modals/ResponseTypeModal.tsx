import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Divider,
  Text,
  Button,
} from "@chakra-ui/react";

interface ResponseTypeModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  handleConfirm: () => void;
  children: React.ReactChild;
}

const ResponseTypeModal = ({
  title,
  isOpen,
  onClose,
  handleConfirm,
  children,
}: ResponseTypeModalProps): React.ReactElement => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent minWidth="42vw">
        <ModalHeader>
          <Text textStyle="subtitle2">{title}</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
        <Divider color="grey.200" style={{ marginTop: "1.5em" }} />
        <ModalFooter>
          <Button variant="secondary" onClick={onClose} minWidth="10%" mr={2}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirm} minWidth="10%">
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ResponseTypeModal;
