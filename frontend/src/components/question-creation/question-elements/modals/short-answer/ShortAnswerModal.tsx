import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalCloseButton,
  Text,
  Divider,
  ModalBody,
  FormLabel,
  FormControl,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";

interface ShortAnswerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: string) => void;
  data?: string;
}

const ShortAnswerModal = ({
  isOpen,
  onClose,
  onConfirm,
  data,
}: ShortAnswerModalProps): React.ReactElement => {
  const [answer, setAnswer] = useState(data);
  const [error, setError] = useState(false);

  const handleConfirm = () => {
    if (answer) {
      setError(false);
      onConfirm(answer);
      onClose();
    } else {
      setError(true);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent minWidth="42vw">
          <ModalHeader>
            <Text textStyle="subtitle2">Create short answer question</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired isInvalid={error}>
              <FormLabel color="grey.300" style={{ fontSize: "18px" }}>
                Enter correct answer
              </FormLabel>
              <Input
                value={answer}
                placeholder="Input Field"
                onChange={(e) => setAnswer(e.target.value)}
                type="number"
                width="50%"
              />
              <FormErrorMessage>
                Enter a value before confirming.
              </FormErrorMessage>
            </FormControl>
          </ModalBody>
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
    </>
  );
};

export default ShortAnswerModal;
