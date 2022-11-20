import React from "react";

import { Input } from "@chakra-ui/react";

type EmailInputProps = {
  id?: string;
  placeholder: string;
  handleChange: (val: string) => void;
  isInvalid?: boolean;
};

const EmailInput = ({
  id,
  placeholder,
  handleChange,
  isInvalid,
}: EmailInputProps): React.ReactElement => {
  return (
    <Input
      id={id}
      type="email"
      placeholder={placeholder}
      onChange={(e) => handleChange(e.target.value.trim())}
      backgroundColor="grey.100"
      color="grey.300"
      fontSize="18px"
      width="320px"
      height="48px"
      variant="filled"
      _invalid={{ borderColor: "red.200" }}
      isInvalid={isInvalid ?? false}
    />
  );
};

export default EmailInput;
