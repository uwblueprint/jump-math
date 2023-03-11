import React from "react";
import { Radio, Box } from "@chakra-ui/react";

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
      border={isSelected ? "2px solid #154472" : "1px solid #BEBEBE"}
      borderRadius="12px"
      alignItems="center"
    >
      <Radio
        variant={isSelected ? "blue" : "grey"}
        value={value}
        marginBottom={0}
        paddingTop="3"
        paddingX="3"
      >
        {text}
      </Radio>
    </Box>
  );
};

export default FormRadio;
