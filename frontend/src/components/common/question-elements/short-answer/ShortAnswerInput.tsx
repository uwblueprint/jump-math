import React from "react";
import { Input } from "@chakra-ui/react";

interface ShortAnswerProps {
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ShortAnswerInput = ({
  value,
  onChange,
}: ShortAnswerProps): React.ReactElement => {
  return (
    <Input
      borderColor="grey.300"
      borderRadius="8px"
      focusBorderColor="grey.300"
      onChange={onChange}
      onWheel={(e) => (e.target as HTMLElement).blur()}
      placeholder="Write your answer here"
      type="number"
      value={value}
      variant="outline"
      width="34%"
    />
  );
};

export default ShortAnswerInput;
