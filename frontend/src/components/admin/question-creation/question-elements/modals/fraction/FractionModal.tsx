import React, { useEffect, useState } from "react";
import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react";

import type { FractionMetadata } from "../../../../../../types/QuestionMetadataTypes";
import { stringToFloat } from "../../../../../../utils/GeneralUtils";
import FractionInput from "../../../../../common/fraction/FractionInput";
import Modal from "../../../../../common/modal/Modal";

interface FractionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: FractionMetadata) => void;
  data?: FractionMetadata;
}

const FractionModal = ({
  isOpen,
  onClose,
  onConfirm,
  data,
}: FractionModalProps): React.ReactElement => {
  const [numerator, setNumerator] = useState<string>("");
  const [denominator, setDenominator] = useState<string>("");
  const [error, setError] = useState(false);

  useEffect(() => {
    setNumerator(String(data?.numerator ?? ""));
    setDenominator(String(data?.denominator ?? ""));
  }, [data]);

  const handleClose = () => {
    setNumerator(String(data?.numerator ?? ""));
    setDenominator(String(data?.denominator ?? ""));
    setError(false);
    onClose();
  };

  const handleConfirm = () => {
    const castedNumerator = stringToFloat(numerator);
    const castedDenominator = stringToFloat(denominator);
    if (
      typeof castedNumerator !== "undefined" &&
      typeof castedDenominator !== "undefined"
    ) {
      onConfirm({ numerator: castedNumerator, denominator: castedDenominator });
      handleClose();
    } else {
      setError(true);
    }
  };

  return (
    <Modal
      header="Create fraction question"
      isOpen={isOpen}
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
        />
        <FormErrorMessage>Enter a value before confirming.</FormErrorMessage>
      </FormControl>
    </Modal>
  );
};

export default FractionModal;
