/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Text } from "@chakra-ui/react";

interface ChooseClassProps {
  setClassId: React.Dispatch<React.SetStateAction<string>>;
}

const ChooseClass = ({ setClassId }: ChooseClassProps): React.ReactElement => {
  return (
    <Text color="blue.300" textAlign="left" textStyle="header4">
      Choose an Assessment
    </Text>
  );
};

export default ChooseClass;
