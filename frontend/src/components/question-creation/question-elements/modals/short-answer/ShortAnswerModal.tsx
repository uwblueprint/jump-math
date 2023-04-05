import React, { useEffect, useState } from "react";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";

import { ShortAnswerMetadata } from "../../../../../types/QuestionMetadataTypes";
import Modal from "../../../../common/Modal";

interface ShortAnswerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: ShortAnswerMetadata) => void;
  data?: number;
}

const ShortAnswerModal = ({
  isOpen,
  onClose,
  onConfirm,
  data,
}: ShortAnswerModalProps): React.ReactElement => {
  const [answer, setAnswer] = useState<number>();
  const [error, setError] = useState(false);

  useEffect(() => {
    setAnswer(data);
  }, [data]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = parseFloat(event.target.value);
    const updatedAnswer = Number.isNaN(input) ? undefined : input;
    setAnswer(updatedAnswer);
  };

  const handleClose = () => {
    setAnswer(data);
    setError(false);
    onClose();
  };

  const handleConfirm = () => {
    if (typeof answer !== "undefined") {
      onConfirm({ answer });
      handleClose();
    } else {
      setError(true);
    }
  };

  return (
    <Modal
      header="Create short answer question"
      isOpen={isOpen}
      onCancel={handleClose}
      onClose={handleClose}
      onSubmit={handleConfirm}
    >
      <FormControl isInvalid={error} isRequired>
        <FormLabel color="grey.300" style={{ fontSize: "18px" }}>
          Enter correct answer
        </FormLabel>
        <Input
          onChange={handleInputChange}
          placeholder="Input Field"
          type="number"
          value={answer}
          width="50%"
        />
        <FormErrorMessage>Enter a value before confirming.</FormErrorMessage>
      </FormControl>
    </Modal>
  );
};

export default ShortAnswerModal;
