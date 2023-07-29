import React from "react";
import { Divider, Input, VStack } from "@chakra-ui/react";

interface FractionWrapperProps {
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

const FractionWrapper = ({
  denominator,
  numerator,
  onNumeratorChange,
  onDenominatorChange,
  readOnly = false,
}: FractionWrapperProps): React.ReactElement => {
  const numeratorWidth = getFractionInputWidth(numerator);
  const denominatorWidth = getFractionInputWidth(denominator);

  const FractionInput = ({
    value,
    onChange,
    width,
  }: {
    value: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    width: number;
  }): React.ReactElement => (
    <Input
      border="2px solid #636363"
      borderRadius={2}
      ml={1}
      onChange={onChange} // CHECK
      readOnly={readOnly}
      textAlign="center" // CHECK
      type="number" // CHECK
      value={value}
      width={`${width}px`}
    />
  );

  return (
    <VStack
      alignItems="center"
      border={readOnly ? "none" : "1px solid #636363"}
      borderRadius={readOnly ? 0 : 8}
      px={8}
      py={4}
    >
      <FractionInput
        onChange={onNumeratorChange}
        value={numerator}
        width={numeratorWidth}
      />
      <Divider
        borderBottomWidth="2px"
        borderColor="grey.300"
        w={`${getDividerWidth(numeratorWidth, denominatorWidth)}px`}
      />
      <FractionInput
        onChange={onDenominatorChange}
        value={denominator}
        width={denominatorWidth}
      />
    </VStack>
  );
};

export default FractionWrapper;
