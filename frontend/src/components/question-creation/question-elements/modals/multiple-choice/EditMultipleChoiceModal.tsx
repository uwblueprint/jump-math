import React, { useContext } from "react";
import { useDisclosure } from "@chakra-ui/react";

import QuestionEditorContext from "../../../../../contexts/QuestionEditorContext";
import {
  MultipleChoiceData,
  QuestionElementType,
} from "../../../../../types/QuestionTypes";
import { updatedQuestionElement } from "../../../../../utils/QuestionUtils";

import MultipleChoiceModal from "./MultipleChoiceModal";

interface EditMultipleChoiceModalProps {
  id: string;
  data: MultipleChoiceData;
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  type: QuestionElementType;
}

const EditMultipleChoiceModal = ({
  id,
  data,
  isOpen,
  setOpen,
  type,
}: EditMultipleChoiceModalProps): React.ReactElement => {
  const { onClose } = useDisclosure();
  const closeModal = () => {
    setOpen(false);
    onClose();
  };

  const { setQuestionElements } = useContext(QuestionEditorContext);
  const updateMultipleChoiceElement = (
    updatedMultipleChoice: MultipleChoiceData,
  ) => {
    setQuestionElements((prevElements) => {
      return updatedQuestionElement(id, updatedMultipleChoice, prevElements);
    });
  };

  return (
    <MultipleChoiceModal
      data={data}
      isOpen={isOpen}
      onClose={closeModal}
      onConfirm={updateMultipleChoiceElement}
      type={type}
    />
  );
};

export default EditMultipleChoiceModal;
