/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Text } from "@chakra-ui/react";

interface AddInformationProps {
  setStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
  setEndDate: React.Dispatch<React.SetStateAction<Date | null>>;
  setNotes: React.Dispatch<React.SetStateAction<string>>;
}

const AddInformation = ({
  setStartDate,
  setEndDate,
  setNotes,
}: AddInformationProps): React.ReactElement => {
  return (
    <Text color="blue.300" textAlign="left" textStyle="header4">
      Add Information
    </Text>
  );
};

export default AddInformation;
