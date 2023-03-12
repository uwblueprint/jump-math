import React, { useContext } from "react";
import { useDisclosure } from "@chakra-ui/react";

import QuestionEditorContext from "../../../../../contexts/QuestionEditorContext";
import { MultipleChoiceData } from "../../../../../types/QuestionTypes";
import { updatedQuestionElement } from "../../../../../utils/QuestionUtils";

import MultipleChoiceModal from "./MultipleChoiceModal";

interface EditMultipleChoiceModalProps {
  id: string;
  data: MultipleChoiceData;
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditMultipleChoiceModal = ({
  id,
  data,
  isOpen,
  setOpen,
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
      isOpen={isOpen}
      onClose={closeModal}
      onConfirm={updateMultipleChoiceElement}
      data={data}
    />
  );
};

export default EditMultipleChoiceModal;
