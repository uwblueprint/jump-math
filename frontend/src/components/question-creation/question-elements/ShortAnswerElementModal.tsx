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
} from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";

import ModalText from "../../common/ModalText";
import QuestionEditorContext from "../../../contexts/QuestionEditorContext";
import QuestionEditor from "../QuestionEditor";
import { QuestionElementType } from "../../../types/QuestionTypes";

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

  const handleSubmit = () => {
    addShortAnswerElement(answer);
    closeModal();
  };

  return (
    <>
      <Modal isOpen={showShortAnswerModal} onClose={closeModal} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text textStyle="subtitle2">Create multi-select question</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel color="grey.300">Enter correct answer</FormLabel>
              <Input
                placeholder="Input Field"
                onChange={(e) => setAnswer(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <Divider color="grey.200" style={{ marginTop: "1.5em" }} />
          <ModalFooter>
            <Button variant="secondary" onClick={closeModal}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ShortAnswerElementModal;
