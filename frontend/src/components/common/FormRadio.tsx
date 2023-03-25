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
      border={isSelected ? "2px solid #154472" : "1px solid #BEBEBE"}
      borderRadius="12px"
    >
      <Radio
        marginBottom={0}
        paddingTop="4"
        paddingX="3"
        value={value}
        variant={isSelected ? "blue" : "grey"}
      >
        {text}
      </Radio>
    </Box>
  );
};

export default FormRadio;
