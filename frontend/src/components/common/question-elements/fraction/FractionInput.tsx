import React from "react";
import { Divider, HStack, VStack } from "@chakra-ui/react";

import FractionFieldInput from "./FractionFieldInput";

interface FractionInputProps {
  wholeNumber: string | null;
  denominator: string;
  numerator: string;
  onWholeNumberChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNumeratorChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDenominatorChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  hideBorder?: boolean;
}

const FractionInput = ({
  denominator,
  numerator,
  onWholeNumberChange,
  onNumeratorChange,
  onDenominatorChange,
  readOnly = false,
  hideBorder = false,
  wholeNumber,
}: FractionInputProps): React.ReactElement => {
  return (
    <HStack
      border={hideBorder ? "none" : "1px solid"}
      borderColor="grey.300"
      borderRadius={hideBorder ? 0 : 8}
      px={8}
      py={4}
    >
      {wholeNumber !== null && (
        <FractionFieldInput
          onChange={onWholeNumberChange}
          readOnly={readOnly}
          value={wholeNumber}
        />
      )}
      <VStack>
        <FractionFieldInput
          onChange={onNumeratorChange}
          readOnly={readOnly}
          value={numerator}
        />
        <Divider
          borderBottomWidth="1px"
          borderColor="black"
          w={`${Math.max(
            Math.max(numerator.length, denominator.length) + 1,
            3,
          )}rem`}
        />
        <FractionFieldInput
          onChange={onDenominatorChange}
          readOnly={readOnly}
          value={denominator}
        />
      </VStack>
    </HStack>
  );
};

export default FractionInput;
