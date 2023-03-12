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
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent minWidth="42vw">
        <ModalHeader>
          <Text textStyle="subtitle2">{title}</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
        <Divider color="grey.200" mt="1.5em" />
        <ModalFooter>
          <Button variant="secondary" onClick={onClose} minWidth="10%" mr={2}>
            Cancel
          </Button>
          <Button variant="primary" onClick={onConfirm} minWidth="10%">
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ResponseTypeModal;
