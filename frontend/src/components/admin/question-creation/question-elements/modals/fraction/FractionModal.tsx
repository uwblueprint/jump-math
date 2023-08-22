import React, { useCallback, useEffect, useState } from "react";
import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react";

import type { FractionMetadata } from "../../../../../../types/QuestionMetadataTypes";
import type { FractionType } from "../../../../../../types/QuestionTypes";
import { stringToInt } from "../../../../../../utils/GeneralUtils";
import FractionInput from "../../../../../common/fraction/FractionInput";
import Modal from "../../../../../common/modal/Modal";

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

  const resetFieldValues = useCallback(() => {
    setWholeNumber(String(data?.wholeNumber ?? ""));
    setNumerator(String(data?.numerator ?? ""));
    setDenominator(String(data?.denominator ?? ""));
  }, [data]);

  useEffect(() => {
    resetFieldValues();
  }, [resetFieldValues]);

  const handleClose = () => {
    resetFieldValues();
    setError(false);
    onClose();
  };

  const handleBack = () => {
    resetFieldValues();
    setError(false);
    if (onBack) onBack();
  };

  const handleConfirm = () => {
    const castedWholeNumber =
      fractionType === "regular" ? null : stringToInt(wholeNumber);
    const castedNumerator = stringToInt(numerator);
    const castedDenominator = stringToInt(denominator);
    if (
      typeof castedWholeNumber !== "undefined" &&
      typeof castedNumerator !== "undefined" &&
      typeof castedDenominator !== "undefined"
    ) {
      onConfirm({
        wholeNumber: castedWholeNumber,
        numerator: castedNumerator,
        denominator: castedDenominator,
      });
      handleClose();
    } else {
      setError(true);
    }
  };

  return (
    <Modal
      cancelButtonText={onBack ? "Back" : "Cancel"}
      header="Create fraction question"
      isOpen={isOpen}
      onBack={handleBack}
      onClose={handleClose}
      onSubmit={handleConfirm}
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
