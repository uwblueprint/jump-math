import React from "react";

import { Input } from "@chakra-ui/react";

const EmailInput = ({
  placeholder,
  handleChange,
  pattern,
}: {
  placeholder: string;
  handleChange: (val: string) => void;
  pattern?: string;
}): React.ReactElement => {
  return (
    <Input
      type="email"
      placeholder={placeholder}
      onChange={(e) => handleChange(e.target.value.trim())}
      fontSize="18px"
      width="320px"
      height="48px"
      textAlign="center"
      variant="filled"
      pattern={pattern}
    />
  );
};

export default EmailInput;
