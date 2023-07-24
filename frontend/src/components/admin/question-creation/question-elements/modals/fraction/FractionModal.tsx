import React, { useEffect, useState } from "react";
import {
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";

import type { FractionMetadata } from "../../../../../../types/QuestionMetadataTypes";
import { stringToFloat } from "../../../../../../utils/GeneralUtils";
import Modal from "../../../../../common/modal/Modal";

interface FractionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: FractionMetadata) => void;
  data?: FractionMetadata;
}

export const getFractionInputWidth = (value: string): number => {
  return value.length > 1 ? 48 + 8 * value.length : 48;
};

export const getDividerWidth = (width1: number, width2: number) => {
  return Math.max(width1, width2) + 12;
};

const FractionModal = ({
  isOpen,
  onClose,
  onConfirm,
  data,
}: FractionModalProps): React.ReactElement => {
  const [numerator, setNumerator] = useState<string>("");
  const [denominator, setDenominator] = useState<string>("");
  const [error, setError] = useState(false);

  const numeratorWidth = getFractionInputWidth(numerator);
  const denominatorWidth = getFractionInputWidth(denominator);

  useEffect(() => {
    setNumerator(data == null ? "" : String(data.numerator));
    setDenominator(data == null ? "" : String(data.denominator));
  }, [data]);

  const handleClose = () => {
    setNumerator(data == null ? "" : String(data.numerator));
    setDenominator(data == null ? "" : String(data.denominator));
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
        <VStack
          alignItems="center"
          border="1px solid #636363"
          borderRadius={8}
          px={8}
          py={4}
        >
          <Input
            border="2px solid #636363"
            borderRadius={2}
            ml={1}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNumerator(e.target.value)
            }
            textAlign="center"
            type="number"
            value={numerator}
            width={`${numeratorWidth}px`}
          />
          <Divider
            borderBottomWidth="2px"
            borderColor="grey.300"
            w={`${getDividerWidth(numeratorWidth, denominatorWidth)}px`}
          />
          <Input
            border="2px solid #636363"
            borderRadius={2}
            ml={1}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setDenominator(e.target.value)
            }
            textAlign="center"
            type="number"
            value={denominator}
            width={`${denominatorWidth}px`}
          />
        </VStack>
        <FormErrorMessage>Enter a value before confirming.</FormErrorMessage>
      </FormControl>
    </Modal>
  );
};

export default FractionModal;
