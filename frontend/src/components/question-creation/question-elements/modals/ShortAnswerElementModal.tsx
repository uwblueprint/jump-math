import React, { useContext, useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  useDisclosure,
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
import { v4 as uuidv4 } from "uuid";

import QuestionEditorContext from "../../../../contexts/QuestionEditorContext";
import { QuestionElementType } from "../../../../types/QuestionTypes";

const ShortAnswerElementModal = (): React.ReactElement => {
  const { onClose } = useDisclosure();
  const { setShowShortAnswerModal, showShortAnswerModal } = useContext(
    QuestionEditorContext,
  );
  const closeModal = () => {
    setShowShortAnswerModal(false);
    onClose();
  };

  const { setQuestionElements } = useContext(QuestionEditorContext);
  const addShortAnswerElement = (data: string) => {
    setQuestionElements((prevElements) => [
      ...prevElements,
      {
        id: uuidv4(),
        type: QuestionElementType.SHORT_ANSWER,
        data,
      },
    ]);
  };

  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    if (answer) {
      setError(false);
      addShortAnswerElement(answer);
      closeModal();
    } else {
      setError(true);
    }
  };

  return (
    <>
      <Modal isOpen={showShortAnswerModal} onClose={closeModal} isCentered>
        <ModalOverlay />
        <ModalContent minWidth="42vw">
          <ModalHeader>
            <Text textStyle="subtitle2">Create multi-select question</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired isInvalid={error}>
              <FormLabel color="grey.300" style={{ fontSize: "18px" }}>
                Enter correct answer
              </FormLabel>
              <Input
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
            <Button
              variant="secondary"
              onClick={closeModal}
              minWidth="10%"
              mr={2}
            >
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSubmit} minWidth="10%">
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ShortAnswerElementModal;
