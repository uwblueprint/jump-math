import React from "react";

import { Input } from "@chakra-ui/react";

type EmailInputProps = {
  placeholder: string;
  handleChange: (val: string) => void;
  pattern?: string;
};

const EmailInput = ({
  placeholder,
  handleChange,
  pattern,
}: EmailInputProps): React.ReactElement => {
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
      _invalid={{ borderColor: "red.200" }}
    />
  );
};

export default EmailInput;
