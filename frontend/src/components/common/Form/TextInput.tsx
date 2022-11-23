import React from "react";

import { Input } from "@chakra-ui/react";

type TextInputProps = {
  placeholder: string;
  handleChange: (val: string) => void;
  isInvalid?: boolean;
};

const TextInput = ({
  placeholder,
  handleChange,
  isInvalid,
}: TextInputProps): React.ReactElement => {
  return (
    <Input
      type="text"
      placeholder={placeholder}
      onChange={(e) => handleChange(e.target.value.trim())}
      fontSize="18px"
      width="320px"
      height="48px"
      textAlign="center"
      variant="filled"
      isInvalid={isInvalid ?? false}
      _invalid={{ borderColor: "red.200" }}
    />
  );
};

export default TextInput;
