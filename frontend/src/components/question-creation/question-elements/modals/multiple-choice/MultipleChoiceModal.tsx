import React, { useState } from "react";
import { Box, Text } from "@chakra-ui/react";
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

  return (
    <ResponseTypeModal
      isOpen={isOpen}
      onClose={onClose}
      handleConfirm={handleConfirm}
      title="Create multiple choice question"
    >
      <Text>hi</Text>
    </ResponseTypeModal>
  );
};

export default MultipleChoiceModal;
