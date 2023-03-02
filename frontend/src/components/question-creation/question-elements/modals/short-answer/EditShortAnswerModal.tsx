import React, { useContext } from "react";
import { useDisclosure } from "@chakra-ui/react";

import QuestionEditorContext from "../../../../../contexts/QuestionEditorContext";
import ShortAnswerModal from "./ShortAnswerModal";
import { updatedQuestionElement } from "../../../../../utils/QuestionUtils";

interface EditShortAnswerModalProps {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  data: string;
}

const EditShortAnswerModal = ({
  isOpen,
  setOpen,
  id,
  data,
}: EditShortAnswerModalProps): React.ReactElement => {
  const { onClose } = useDisclosure();

  const closeModal = () => {
    setOpen(false);
    onClose();
  };

  const { setQuestionElements } = useContext(QuestionEditorContext);
  const updateShortAnswerElement = (updatedAnswer: string) => {
    const error = "";
    setQuestionElements((prevElements) => {
      return updatedQuestionElement(id, updatedAnswer, error, prevElements);
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
