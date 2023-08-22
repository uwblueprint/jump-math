import React, { useEffect, useState } from "react";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";

import type { ShortAnswerMetadata } from "../../../../../../types/QuestionMetadataTypes";
import {
  preventNonNumericKeys,
  stringToFloat,
} from "../../../../../../utils/GeneralUtils";
import Modal from "../../../../../common/modal/Modal";

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
  const [answer, setAnswer] = useState<string>("");
  const [error, setError] = useState(false);

  useEffect(() => {
    setAnswer(data == null ? "" : String(data));
  }, [data]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(event.target.value);
  };

  const handleClose = () => {
    setAnswer(data == null ? "" : String(data));
    setError(false);
    onClose();
  };

  const handleConfirm = () => {
    const castedAnswer = stringToFloat(answer);
    if (typeof castedAnswer !== "undefined") {
      onConfirm({ answer: castedAnswer });
      handleClose();
    } else {
      setError(true);
    }
  };

  return (
    <Modal
      header="Create short answer question"
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleConfirm}
    >
      <FormControl isInvalid={error} isRequired>
        <FormLabel color="grey.300" style={{ fontSize: "18px" }}>
          Enter correct answer
        </FormLabel>
        <Input
          onChange={handleInputChange}
          onKeyDown={(e) => preventNonNumericKeys(e, answer)}
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
