import React from "react";
import { Input } from "@chakra-ui/react";

interface FractionFieldInputProps {
  readOnly: boolean;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  width: number;
}

const FractionFieldInput = ({
  readOnly,
  value,
  onChange,
  width,
}: FractionFieldInputProps): React.ReactElement => (
  <Input
    border="2px solid"
    borderColor="grey.300"
    borderRadius={2}
    ml={1}
    onChange={onChange}
    readOnly={readOnly}
    textAlign="center"
    type="number"
    value={value}
    width={`${width}px`}
  />
);

export default FractionFieldInput;
