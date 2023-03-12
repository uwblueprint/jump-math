import React from "react";
import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";

interface ResponseTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  children: React.ReactChild;
}

const ResponseTypeModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  children,
}: ResponseTypeModalProps): React.ReactElement => {
  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent minWidth="42vw">
        <ModalHeader>
          <Text textStyle="subtitle2">{title}</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
        <Divider color="grey.200" mt="1.5em" />
        <ModalFooter>
          <Button minWidth="10%" mr={2} onClick={onClose} variant="secondary">
            Cancel
          </Button>
          <Button minWidth="10%" onClick={onConfirm} variant="primary">
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ResponseTypeModal;
