import React, { useState } from "react";
import { VStack } from "@chakra-ui/react";
import ResponseTypeModal from "../ResponseTypeModal";
import MultipleChoiceOption from "./MultipleChoiceOption";
import {
  MultipleChoiceOptionData,
  MultipleChoiceData,
} from "../../../../../types/QuestionTypes";
import SelectOptionCount from "./SelectOptionCount";

interface MultipleChoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: MultipleChoiceData) => void;
}

const MultipleChoiceModal = ({
  isOpen,
  onClose,
  onConfirm,
}: MultipleChoiceModalProps): React.ReactElement => {
  const [optionCount, setOptionCount] = useState(0);
  const [optionCountError, setOptionCountError] = useState(false);
  const [options, setOptions] = useState<MultipleChoiceOptionData[]>([]);

  const handleClose = () => {
    setOptionCount(0);
    setOptionCountError(false);
    onClose();
  };

  const handleConfirm = () => {
    if (optionCount !== 0) {
      onConfirm({ optionCount, options });
      handleClose();
    } else {
      setOptionCountError(true);
    }
  };

  return (
    <ResponseTypeModal
      isOpen={isOpen}
      onClose={handleClose}
      onConfirm={handleConfirm}
      title="Create multiple choice question"
    >
      <VStack width="100%" spacing="10">
        <SelectOptionCount
          optionCount={optionCount}
          setOptionCount={setOptionCount}
          setOptions={setOptions}
          optionCountError={optionCountError}
        />
        <VStack width="100%" spacing="6">
          {options.map((option) => (
            <MultipleChoiceOption
              key={option.id}
              data={option}
              setOptions={setOptions}
              setOptionCount={setOptionCount}
            />
          ))}
        </VStack>
      </VStack>
    </ResponseTypeModal>
  );
};

export default MultipleChoiceModal;
