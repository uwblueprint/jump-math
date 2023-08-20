import React, { useEffect, useState } from "react";
import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react";

import type { FractionMetadata } from "../../../../../../types/QuestionMetadataTypes";
import type { FractionType } from "../../../../../../types/QuestionTypes";
import { stringToFloat } from "../../../../../../utils/GeneralUtils";
import FractionInput from "../../../../../common/fraction/FractionInput";
import Modal from "../../../../../common/modal/Modal";

interface FractionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: FractionMetadata) => void;
  data?: FractionMetadata;
  fractionType: FractionType;
}

const FractionModal = ({
  isOpen,
  onClose,
  onConfirm,
  data,
  fractionType,
}: FractionModalProps): React.ReactElement => {
  const [wholeNumber, setWholeNumber] = useState<string | null>("");
  const [numerator, setNumerator] = useState<string>("");
  const [denominator, setDenominator] = useState<string>("");
  const [error, setError] = useState(false);

  useEffect(() => {
    setWholeNumber(String(data?.wholeNumber ?? ""));
    setNumerator(String(data?.numerator ?? ""));
    setDenominator(String(data?.denominator ?? ""));
  }, [data]);

  const handleClose = () => {
    setWholeNumber(String(data?.wholeNumber ?? ""));
    setNumerator(String(data?.numerator ?? ""));
    setDenominator(String(data?.denominator ?? ""));
    setError(false);
    onClose();
  };

  const handleConfirm = () => {
    const castedWholeNumber =
      fractionType === "regular" || wholeNumber == null
        ? null
        : stringToFloat(wholeNumber);
    const castedNumerator = stringToFloat(numerator);
    const castedDenominator = stringToFloat(denominator);
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
      console.log(
        "typeof castedWholeNumber !== 'undefined'",
        castedWholeNumber,
        castedNumerator,
        castedDenominator,
      );
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
          onWholeNumberChange={
            fractionType === "mixed"
              ? (e: React.ChangeEvent<HTMLInputElement>) =>
                  setWholeNumber(e.target.value)
              : undefined
          }
          wholeNumber={fractionType === "mixed" ? wholeNumber : null}
        />
        <FormErrorMessage>Enter a value before confirming.</FormErrorMessage>
      </FormControl>
    </Modal>
  );
};

export default FractionModal;
