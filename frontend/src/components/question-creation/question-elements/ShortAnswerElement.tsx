import React, { useContext } from "react";
import { Input } from "@chakra-ui/react";

interface ShortAnswerElementProps {
  id: string;
  data: string;
}

const ShortAnswerElement = ({
  id,
  data,
}: ShortAnswerElementProps): React.ReactElement => {
  return (
    <Input
      value={data}
      readOnly
      variant="outline"
      borderRadius="0"
      borderColor="grey.300"
      focusBorderColor="grey.300"
    />
  );
};

export default ShortAnswerElement;
