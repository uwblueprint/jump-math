import React, { useContext } from "react";

import QuestionEditorContext from "../../../../../../contexts/QuestionEditorContext";
import type { ShortAnswerMetadata } from "../../../../../../types/QuestionMetadataTypes";
import { updatedQuestionElement } from "../../../../../../utils/QuestionUtils";

import ShortAnswerModal from "./ShortAnswerModal";

interface EditShortAnswerModalProps {
  id: string;
  data: number;
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditShortAnswerModal = ({
  id,
  data,
  isOpen,
  setOpen,
}: EditShortAnswerModalProps): React.ReactElement => {
  const closeModal = () => {
    setOpen(false);
  };

  const { setQuestionElements } = useContext(QuestionEditorContext);
  const updateShortAnswerElement = (updatedAnswer: ShortAnswerMetadata) => {
    setQuestionElements((prevElements) => {
      return updatedQuestionElement(id, updatedAnswer, prevElements);
    });
  };

  return (
    <ShortAnswerModal
      data={data}
      isOpen={isOpen}
      onClose={closeModal}
      onConfirm={updateShortAnswerElement}
    />
  );
};

export default EditShortAnswerModal;
