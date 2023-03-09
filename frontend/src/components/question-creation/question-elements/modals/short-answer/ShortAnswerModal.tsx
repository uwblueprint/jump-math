import React, { useEffect, useState } from "react";
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
  onConfirm: (data: number) => void;
  data?: number;
}

const ShortAnswerModal = ({
  isOpen,
  onClose,
  onConfirm,
  data,
}: ShortAnswerModalProps): React.ReactElement => {
  const [answer, setAnswer] = useState<number>();
  const [error, setError] = useState(false);

  useEffect(() => {
    setAnswer(data);
  }, [data]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = parseFloat(event.target.value);
    const updatedAnswer = Number.isNaN(input) ? undefined : input;
    setAnswer(updatedAnswer);
  };

  const handleClose = () => {
    setAnswer(data);
    setError(false);
    onClose();
  };

  const handleConfirm = () => {
    if (typeof answer !== "undefined") {
      onConfirm(answer);
      handleClose();
    } else {
      setError(true);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} isCentered>
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
              onChange={handleInputChange}
              type="number"
              width="50%"
            />
            <FormErrorMessage>
              Enter a value before confirming.
            </FormErrorMessage>
          </FormControl>
        </ModalBody>
        <Divider color="grey.200" mt="1.5em" />
        <ModalFooter>
          <Button
            variant="secondary"
            onClick={handleClose}
            minWidth="10%"
            mr={2}
          >
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

export default ShortAnswerModal;
