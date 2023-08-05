import React from "react";
import { Divider, VStack } from "@chakra-ui/react";

import FractionFieldInput from "./FractionFieldInput";

interface FractionInputProps {
  denominator: string;
  numerator: string;
  onNumeratorChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDenominatorChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
}

const getFractionInputWidth = (value: string): number => {
  return value.length > 1 ? 48 + 8 * value.length : 48;
};

const getDividerWidth = (width1: number, width2: number) => {
  return Math.max(width1, width2) + 12;
};

const FractionInput = ({
  denominator,
  numerator,
  onNumeratorChange,
  onDenominatorChange,
  readOnly = false,
}: FractionInputProps): React.ReactElement => {
  const numeratorWidth = getFractionInputWidth(numerator);
  const denominatorWidth = getFractionInputWidth(denominator);

  return (
    <VStack
      alignItems="center"
      border={readOnly ? "none" : "1px solid"}
      borderColor="grey.300"
      borderRadius={readOnly ? 0 : 8}
      px={8}
      py={4}
    >
      <FractionFieldInput
        onChange={onNumeratorChange}
        readOnly={readOnly}
        value={numerator}
        width={numeratorWidth}
      />
      <Divider
        borderBottomWidth="2px"
        borderColor="grey.300"
        w={`${getDividerWidth(numeratorWidth, denominatorWidth)}px`}
      />
      <FractionFieldInput
        onChange={onDenominatorChange}
        readOnly={readOnly}
        value={denominator}
        width={denominatorWidth}
      />
    </VStack>
  );
};

export default FractionInput;
