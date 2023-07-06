import React from "react";
import { Box, Radio } from "@chakra-ui/react";

interface FormRadioProps {
  text: string;
  value: string;
  isSelected: boolean;
}

const FormRadio = ({
  text,
  value,
  isSelected,
}: FormRadioProps): React.ReactElement => {
  return (
    <Box
      alignItems="center"
      border={isSelected ? "2px" : "1px"}
      borderRadius="12px"
      color={isSelected ? "blue.300" : "grey.200"}
    >
      <Radio
        marginBottom={0}
        paddingTop="4"
        paddingX="3"
        value={value}
        variant={isSelected ? "selected" : "default"}
      >
        {text}
      </Radio>
    </Box>
  );
};

export default FormRadio;
