import React, { useContext } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";

import QuestionEditorContext from "../../../../../../contexts/QuestionEditorContext";
import type { ShortAnswerMetadata } from "../../../../../../types/QuestionMetadataTypes";
import { QuestionElementType } from "../../../../../../types/QuestionTypes";

import ShortAnswerModal from "./ShortAnswerModal";

const AddShortAnswerModal = (): React.ReactElement => {
  const { onClose } = useDisclosure();
  const { showAddShortAnswerModal, setShowAddShortAnswerModal } = useContext(
    QuestionEditorContext,
  );
  const closeModal = () => {
    setShowAddShortAnswerModal(false);
    onClose();
  };

  const { setQuestionElements } = useContext(QuestionEditorContext);
  const addShortAnswerElement = (data: ShortAnswerMetadata) => {
    setQuestionElements((prevElements) => [
      ...prevElements,
      {
        id: uuidv4(),
        type: QuestionElementType.SHORT_ANSWER,
        data,
      },
    ]);
  };

  return (
    <ShortAnswerModal
      isOpen={showAddShortAnswerModal}
      onClose={closeModal}
      onConfirm={addShortAnswerElement}
    />
  );
};

export default AddShortAnswerModal;
