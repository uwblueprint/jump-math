import React, { useState } from "react";
import {
  Select,
  FormControl,
  FormLabel,
  FormErrorMessage,
  VStack,
} from "@chakra-ui/react";
import ResponseTypeModal from "../ResponseTypeModal";
import MultipleChoiceOption from "./MultipleChoiceOption";

interface MultipleChoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: string) => void;
}

const MultipleChoiceModal = ({
  isOpen,
  onClose,
  onConfirm,
}: MultipleChoiceModalProps): React.ReactElement => {
  const [answer, setAnswer] = useState("");
  const [optionCount, setOptionCount] = useState(0);
  const [error, setError] = useState(false);

  const handleSelectCount = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setOptionCount(parseInt(event.target.value, 10));
  };

  const resetState = () => {
    setAnswer("");
    setOptionCount(0);
    setError(false);
  };

  const handleConfirm = () => {
    if (answer) {
      onConfirm(answer);
      resetState();
      onClose();
    } else {
      setError(true);
    }
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  return (
    <ResponseTypeModal
      isOpen={isOpen}
      onClose={handleClose}
      handleConfirm={handleConfirm}
      title="Create multiple choice question"
    >
      <VStack width="100%" spacing="10">
        <FormControl isRequired isInvalid={error}>
          <FormLabel color="grey.300" style={{ fontSize: "18px" }}>
            How many options would you like?
          </FormLabel>
          <Select onChange={(e) => handleSelectCount(e)} width="50%">
            <option selected hidden disabled>
              Select Input
            </option>
            {[...Array(4)].map((i, count) => (
              <option key={i} value={count + 1}>
                {count + 1}
              </option>
            ))}
          </Select>
          <FormErrorMessage>Select a value before confirming.</FormErrorMessage>
        </FormControl>
        <VStack width="100%" spacing="6">
          {[...Array(optionCount)].map((i) => (
            <MultipleChoiceOption key={i} />
          ))}
        </VStack>
      </VStack>
    </ResponseTypeModal>
  );
};

export default MultipleChoiceModal;
