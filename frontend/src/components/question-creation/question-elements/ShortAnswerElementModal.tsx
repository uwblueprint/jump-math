import React, { useContext } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import ModalText from "../../common/ModalText";
import QuestionEditorContext from "../../../contexts/QuestionEditorContext";

const ShortAnswerElementModal = (): React.ReactElement => {
  const { showShortAnswerModal } = useContext(QuestionEditorContext);
  const { onOpen, onClose } = useDisclosure();
  return (
    <>
      <Modal isOpen={showShortAnswerModal} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent alignItems="center" p={2} maxW="600px">
          <ModalText
            header="Unable to remove user at this moment. Please try again."
            textColor="red.200"
          />
          <ModalFooter my={3}>
            <Button variant="primary" mr={2}>
              Return to Database
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ShortAnswerElementModal;
