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

const FractionInput = ({
  denominator,
  numerator,
  onNumeratorChange,
  onDenominatorChange,
  readOnly = false,
}: FractionInputProps): React.ReactElement => {
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
      />
      <Divider
        borderBottomWidth="2px"
        borderColor="grey.300"
        w={`${Math.max(numerator.length, denominator.length) + 4}ch`}
      />
      <FractionFieldInput
        onChange={onDenominatorChange}
        readOnly={readOnly}
        value={denominator}
      />
    </VStack>
  );
};

export default FractionInput;
