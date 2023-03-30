import React, { useContext, useEffect, useState } from "react";
import { VStack } from "@chakra-ui/react";

import QuestionEditorContext from "../../../../../contexts/QuestionEditorContext";
import {
  MultipleChoiceData,
  MultipleChoiceOptionData,
  QuestionElementType,
} from "../../../../../types/QuestionTypes";
import { exceedsMaxLength } from "../../../../../utils/QuestionUtils";
import ErrorToast from "../../../../common/ErrorToast";
import ResponseTypeModal from "../ResponseTypeModal";

import MultipleChoiceOption from "./MultipleChoiceOption";
import SelectOptionCount from "./SelectOptionCount";

interface MultipleChoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: MultipleChoiceData) => void;
  type: QuestionElementType;
  data?: MultipleChoiceData;
}

const MultipleChoiceModal = ({
  isOpen,
  onClose,
  onConfirm,
  data,
  type,
}: MultipleChoiceModalProps): React.ReactElement => {
  const [optionCount, setOptionCount] = useState(0);
  const [options, setOptions] = useState<MultipleChoiceOptionData[]>([]);
  const [optionCountError, setOptionCountError] = useState(false);
  const [noCorrectOptionError, setNoCorrectOptionError] = useState(false);
  const [manyCorrectOptionsError, setManyCorrectOptionsError] = useState(false);
  const [emptyOptionError, setEmptyOptionError] = useState(false);

  useEffect(() => {
    setOptionCount(data ? data.optionCount : 0);
    setOptions(data ? data.options : []);
  }, [data]);

  const resetErrors = () => {
    setOptionCountError(false);
    setNoCorrectOptionError(false);
    setManyCorrectOptionsError(false);
    setEmptyOptionError(false);
  };

  const handleClose = () => {
    setOptionCount(data ? data.optionCount : 0);
    setOptions(data ? data.options : []);
    resetErrors();
    onClose();
  };

  const correctOptionCount = options.filter((option) => option.isCorrect)
    .length;
  const lengthError = options.some((option) => exceedsMaxLength(option.value));

  const handleConfirm = () => {
    resetErrors();
    if (optionCount === 0) {
      setOptionCountError(true);
    } else if (correctOptionCount === 0) {
      setNoCorrectOptionError(true);
    } else if (
      type === QuestionElementType.MULTIPLE_CHOICE &&
      correctOptionCount > 1
    ) {
      setManyCorrectOptionsError(true);
    } else if (!options.every((option) => option.value)) {
      setEmptyOptionError(true);
    } else if (!lengthError) {
      onConfirm({ optionCount, options });
      handleClose();
    }
  };

  return (
    <ResponseTypeModal
      isOpen={isOpen}
      onClose={handleClose}
      onConfirm={handleConfirm}
      title={
        type === QuestionElementType.MULTIPLE_CHOICE
          ? "Create multiple choice question"
          : "Create multi-select question"
      }
    >
      <VStack spacing="10" width="100%">
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
        <VStack spacing="6" width="100%">
          {options.map((option) => (
            <MultipleChoiceOption
              key={option.id}
              data={option}
              isCorrectError={noCorrectOptionError}
              isEmptyError={emptyOptionError}
              setOptionCount={setOptionCount}
              setOptions={setOptions}
            />
          ))}
        </VStack>
      </VStack>
    </ResponseTypeModal>
  );
};

export default MultipleChoiceModal;
