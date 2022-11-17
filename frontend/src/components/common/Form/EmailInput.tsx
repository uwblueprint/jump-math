import React from "react";

import { Input } from "@chakra-ui/react";

type EmailInputProps = {
  placeholder: string;
  handleChange: (val: string) => void;
  isInvalid?: boolean;
  pattern?: string;
};

const EmailInput = ({
  placeholder,
  handleChange,
  isInvalid,
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
      pattern={pattern ?? ".+"}
      _invalid={{ borderColor: "red.200" }}
      isInvalid={isInvalid ?? false}
    />
  );
};

export default EmailInput;
