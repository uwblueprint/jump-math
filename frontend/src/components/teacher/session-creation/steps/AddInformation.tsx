import React from "react";
import {
  FormControl,
  FormLabel,
  HStack,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";

import DatePicker from "../../../common/DatePicker";

interface AddInformationProps {
  startDate: Date | null;
  endDate: Date | null;
  notes: string;
  setStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
  setEndDate: React.Dispatch<React.SetStateAction<Date | null>>;
  setNotes: React.Dispatch<React.SetStateAction<string>>;
}

const AddInformation = ({
  startDate,
  endDate,
  notes,
  setStartDate,
  setEndDate,
  setNotes,
}: AddInformationProps): React.ReactElement => {
  return (
    <VStack align="left" maxWidth="50%" spacing="2">
      <Text color="blue.300" textAlign="left" textStyle="header4">
        Add Information
      </Text>
      <Text color="grey.300" textStyle="paragraph">
        Please choose start and end dates and write any notes for this
        assessment.
      </Text>
      <VStack alignItems="left" gap="8" paddingBottom="6" paddingTop="2">
        <HStack gap="15" pt="4">
          <FormControl isRequired>
            <FormLabel color="blue.300">Start date</FormLabel>
            <DatePicker
              onChange={(e) => setStartDate(e)}
              value={startDate ?? undefined}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel color="blue.300">End date</FormLabel>
            <DatePicker
              onChange={(e) => setEndDate(e)}
              value={endDate ?? undefined}
            />
          </FormControl>
        </HStack>
        <FormControl>
          <FormLabel color="blue.300">Additional Notes</FormLabel>
          <Textarea
            onChange={(e) => setNotes(e.target.value)}
            placeholder="(Optional)"
            value={notes}
          />
        </FormControl>
      </VStack>
    </VStack>
  );
};

export default AddInformation;
