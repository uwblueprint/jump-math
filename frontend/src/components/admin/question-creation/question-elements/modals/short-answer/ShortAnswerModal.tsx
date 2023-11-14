import React, { useEffect, useState } from "react";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";

import type { ShortAnswerMetadata } from "../../../../../../types/QuestionMetadataTypes";
import {
  FormValidationError,
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
    if (!isOpen) {
      return;
    }

    setAnswer(data == null ? "" : String(data));
  }, [data, isOpen]);

  const handleClose = () => {
    setError(false);
    onClose();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(event.target.value);
  };

  const handleConfirm = () => {
    const castedAnswer = stringToFloat(answer);
    if (typeof castedAnswer !== "undefined") {
      onConfirm({ answer: castedAnswer });
    } else {
      setError(true);
      throw new FormValidationError("Please enter a correct answer");
    }
  };

  return (
    <Modal
      header="Create short answer question"
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleConfirm}
      showDefaultToasts={false}
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
      </FormControl>
    </Modal>
  );
};

export default ShortAnswerModal;
