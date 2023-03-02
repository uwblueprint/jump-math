import React from "react";
import { Input, Box } from "@chakra-ui/react";

interface ShortAnswerElementProps {
  id: string;
  data: string;
}

const ShortAnswerElement = ({
  id,
  data,
}: ShortAnswerElementProps): React.ReactElement => {
  return (
    <Box width="100%" paddingLeft="6">
      <Input
        value={data}
        readOnly
        variant="outline"
        borderRadius="0"
        borderColor="grey.300"
        focusBorderColor="grey.300"
        width="34%"
      />
    </Box>
  );
};

export default ShortAnswerElement;
