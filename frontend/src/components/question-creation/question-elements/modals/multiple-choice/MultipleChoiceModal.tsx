import React, { useState } from "react";
import { VStack } from "@chakra-ui/react";
import ResponseTypeModal from "../ResponseTypeModal";
import MultipleChoiceOption from "./MultipleChoiceOption";
import {
  MultipleChoiceOptionData,
  MultipleChoiceData,
} from "../../../../../types/QuestionTypes";
import SelectOptionCount from "./SelectOptionCount";
import ErrorToast from "../../../../common/ErrorToast";

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
  const [options, setOptions] = useState<MultipleChoiceOptionData[]>([]);

  const [optionCountError, setOptionCountError] = useState(false);
  const [noCorrectOptionError, setNoCorrectOptionError] = useState(false);
  const [manyCorrectOptionsError, setManyCorrectOptionsError] = useState(false);
  const [emptyOptionError, setEmptyOptionError] = useState(false);

  const correctOptionCount = options.filter((option) => option.isCorrect)
    .length;

  const resetErrors = () => {
    setOptionCountError(false);
    setNoCorrectOptionError(false);
    setManyCorrectOptionsError(false);
    setEmptyOptionError(false);
  };

  const handleClose = () => {
    resetErrors();
    onClose();
  };

  const handleConfirm = () => {
    resetErrors();
    if (optionCount === 0) {
      setOptionCountError(true);
    } else if (correctOptionCount === 0) {
      setNoCorrectOptionError(true);
    } else if (correctOptionCount > 1) {
      setManyCorrectOptionsError(true);
    } else if (!options.every((option) => option.value)) {
      setEmptyOptionError(true);
    } else {
      onConfirm({ optionCount, options });
      handleClose();
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
        {noCorrectOptionError && (
          <ErrorToast errorMessage="Mark a correct answer before confirming" />
        )}
        {manyCorrectOptionsError && (
          <ErrorToast errorMessage="Please mark only ONE correct answer before confirming" />
        )}
        {emptyOptionError && (
          <ErrorToast errorMessage="Please ensure all fields are filled before confirming" />
        )}
        <SelectOptionCount
          optionCount={optionCount}
          optionCountError={optionCountError}
          setOptionCount={setOptionCount}
          setOptions={setOptions}
        />
        <VStack width="100%" spacing="6">
          {options.map((option) => (
            <MultipleChoiceOption
              key={option.id}
              data={option}
              isEmptyError={emptyOptionError}
              isCorrectError={noCorrectOptionError}
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
