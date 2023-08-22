import React from "react";
import { Input } from "@chakra-ui/react";

import { preventNonNumericKeys } from "../../../utils/GeneralUtils";

interface FractionFieldInputProps {
  readOnly: boolean;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FractionFieldInput = ({
  readOnly,
  value,
  onChange,
}: FractionFieldInputProps): React.ReactElement => (
  <Input
    _focus={{ borderColor: readOnly ? "grey.300" : "blue.300" }}
    _hover={{ backgroundColor: readOnly ? "white" : "grey.100" }}
    backgroundColor="white"
    border="2px solid"
    borderColor="grey.300"
    borderRadius={2}
    color="blue.300"
    fontSize="16px"
    fontWeight="500"
    height="2rem"
    letterSpacing={0}
    lineHeight="21px"
    onChange={onChange}
    onKeyDown={(e) => preventNonNumericKeys(e, value, true)}
    padding={0}
    readOnly={readOnly}
    textAlign="center"
    type="number"
    value={value}
    width={`${Math.max(value.length, 2)}rem`}
  />
);

export default FractionFieldInput;
