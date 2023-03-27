import React, { useContext } from "react";
import { useDisclosure } from "@chakra-ui/react";

import QuestionEditorContext from "../../../../../contexts/QuestionEditorContext";
import { MultiSelectData } from "../../../../../types/QuestionTypes";
import { updatedQuestionElement } from "../../../../../utils/QuestionUtils";

import MultiSelectModal from "./MultiSelectModal";

interface EditMultiSelectModalProps {
  id: string;
  data: MultiSelectData;
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditMultiSelectModal = ({
  id,
  data,
  isOpen,
  setOpen,
}: EditMultiSelectModalProps): React.ReactElement => {
  const { onClose } = useDisclosure();
  const closeModal = () => {
    setOpen(false);
    onClose();
  };

  const { setQuestionElements } = useContext(QuestionEditorContext);
  const updateMultiSelectElement = (updatedMultiSelect: MultiSelectData) => {
    setQuestionElements((prevElements) => {
      return updatedQuestionElement(id, updatedMultiSelect, prevElements);
    });
  };

  return (
    <MultiSelectModal
      data={data}
      isOpen={isOpen}
      onClose={closeModal}
      onConfirm={updateMultiSelectElement}
    />
  );
};

export default EditMultiSelectModal;
