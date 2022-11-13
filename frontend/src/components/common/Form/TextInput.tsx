import React from "react";

import { Input } from "@chakra-ui/react";

const TextInput = ({
  placeholder,
  handleChange,
}: {
  placeholder: string;
  handleChange: (val: string) => void;
}): React.ReactElement => {
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
    />
  );
};

export default TextInput;
