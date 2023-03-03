import React, { useState } from "react";
import {
  Select,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Text,
} from "@chakra-ui/react";
import ResponseTypeModal from "../ResponseTypeModal";

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
  const [error, setError] = useState(false);
  const handleConfirm = () => {
    if (answer) {
      setError(false);
      onConfirm(answer);
      onClose();
    } else {
      setError(true);
    }
  };

  const [optionCount, setOptionCount] = useState(0);
  const handleSelectCount = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setOptionCount(parseInt(event.target.value, 10));
  };

  return (
    <ResponseTypeModal
      isOpen={isOpen}
      onClose={onClose}
      handleConfirm={handleConfirm}
      title="Create multiple choice question"
    >
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
        <Text>{optionCount}</Text>
        <FormErrorMessage>Select a value before confirming.</FormErrorMessage>
      </FormControl>
    </ResponseTypeModal>
  );
};

export default MultipleChoiceModal;
