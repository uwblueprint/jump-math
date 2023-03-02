import React, { useContext } from "react";
import { useDisclosure } from "@chakra-ui/react";

import QuestionEditorContext from "../../../../../contexts/QuestionEditorContext";
import ShortAnswerModal from "./ShortAnswerModal";
import { updatedQuestionElement } from "../../../../../utils/QuestionUtils";

interface EditShortAnswerModalProps {
  id: string;
  data: string;
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditShortAnswerModal = ({
  id,
  data,
  isOpen,
  setOpen,
}: EditShortAnswerModalProps): React.ReactElement => {
  const { onClose } = useDisclosure();
  const closeModal = () => {
    setOpen(false);
    onClose();
  };

  const { setQuestionElements } = useContext(QuestionEditorContext);
  const updateShortAnswerElement = (updatedAnswer: string) => {
    setQuestionElements((prevElements) => {
      return updatedQuestionElement(id, updatedAnswer, prevElements);
    });
  };

  return (
    <ShortAnswerModal
      isOpen={isOpen}
      onClose={closeModal}
      onConfirm={updateShortAnswerElement}
      data={data}
    />
  );
};

export default EditShortAnswerModal;
