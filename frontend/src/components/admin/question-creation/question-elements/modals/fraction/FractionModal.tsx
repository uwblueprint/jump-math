import React, { useEffect, useState } from "react";
import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react";

import type { FractionMetadata } from "../../../../../../types/QuestionMetadataTypes";
import type { FractionType } from "../../../../../../types/QuestionTypes";
import {
  FormValidationError,
  stringToInt,
} from "../../../../../../utils/GeneralUtils";
import Modal from "../../../../../common/modal/Modal";
import FractionInput from "../../../../../common/question-elements/fraction/FractionInput";

interface FractionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBack?: () => void;
  onConfirm: (data: FractionMetadata) => void;
  data?: FractionMetadata;
  fractionType: FractionType;
}

const FractionModal = ({
  isOpen,
  onClose,
  onBack,
  onConfirm,
  data,
  fractionType,
}: FractionModalProps): React.ReactElement => {
  const [wholeNumber, setWholeNumber] = useState<string>("");
  const [numerator, setNumerator] = useState<string>("");
  const [denominator, setDenominator] = useState<string>("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setWholeNumber(String(data?.wholeNumber ?? ""));
    setNumerator(String(data?.numerator ?? ""));
    setDenominator(String(data?.denominator ?? ""));
  }, [data, isOpen]);

  const handleClose = () => {
    setError(false);
    onClose();
  };

  const handleConfirm = () => {
    const castedWholeNumber =
      fractionType === "regular" ? null : stringToInt(wholeNumber);
    const castedNumerator = stringToInt(numerator);
    const castedDenominator = stringToInt(denominator);
    if (
      typeof castedWholeNumber === "undefined" ||
      typeof castedNumerator === "undefined" ||
      typeof castedDenominator === "undefined"
    ) {
      setError(true);
      throw new FormValidationError("One or more fields are invalid");
    }
    onConfirm({
      wholeNumber: castedWholeNumber,
      numerator: castedNumerator,
      denominator: castedDenominator,
    });
  };

  return (
    <Modal
      cancelButtonText={onBack ? "Back" : "Cancel"}
      header="Create fraction question"
      isOpen={isOpen}
      onBack={onBack}
      onClose={handleClose}
      onSubmit={handleConfirm}
      showDefaultToasts={false}
    >
      <FormControl isInvalid={error} isRequired>
        <FormLabel color="grey.300" style={{ fontSize: "18px" }}>
          Enter correct answer
        </FormLabel>
        <FractionInput
          denominator={denominator}
          numerator={numerator}
          onDenominatorChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setDenominator(e.target.value)
          }
          onNumeratorChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNumerator(e.target.value)
          }
          onWholeNumberChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setWholeNumber(e.target.value)
          }
          wholeNumber={fractionType === "mixed" ? wholeNumber : null}
        />
        <FormErrorMessage>Enter a value before confirming.</FormErrorMessage>
      </FormControl>
    </Modal>
  );
};

export default FractionModal;
