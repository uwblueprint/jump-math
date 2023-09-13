import React, { useEffect, useState } from "react";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Textarea,
  VStack,
} from "@chakra-ui/react";

import { isPastDate } from "../../../../utils/GeneralUtils";
import DatePicker from "../../../common/form/DatePicker";
import DistributeAssessmentWrapper from "../DistributeAssessmentWrapper";

interface AddInformationProps {
  isEditDisabled: boolean;
  startDate: Date | null;
  endDate: Date | null;
  notes: string;
  setStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
  setEndDate: React.Dispatch<React.SetStateAction<Date | null>>;
  setNotes: React.Dispatch<React.SetStateAction<string>>;
  setValidDates: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddInformation = ({
  isEditDisabled,
  startDate,
  endDate,
  notes,
  setStartDate,
  setEndDate,
  setNotes,
  setValidDates,
}: AddInformationProps): React.ReactElement => {
  const [invalidStartDate, setInvalidStartDate] = useState(false);
  const [invalidEndDate, setInvalidEndDate] = useState(false);

  useEffect(() => {
    if (startDate && endDate) {
      setInvalidStartDate(
        (!isEditDisabled && isPastDate(startDate)) || endDate <= startDate,
      );
      setInvalidEndDate(isPastDate(endDate) || endDate <= startDate);
      setValidDates(!invalidStartDate && !invalidEndDate);
      return;
    }
    if (startDate) {
      setInvalidStartDate(!isEditDisabled && isPastDate(startDate));
    }
    if (endDate) {
      setInvalidEndDate(isPastDate(endDate));
    }
  }, [
    startDate,
    endDate,
    invalidStartDate,
    invalidEndDate,
    setValidDates,
    isEditDisabled,
  ]);

  return (
    <DistributeAssessmentWrapper
      subtitle="Please choose start and end dates and write any notes for this assessment."
      title="Add Information"
    >
      <VStack alignItems="left" gap="8" maxWidth="50%" paddingBottom="6">
        <HStack alignItems="flex-start" gap="15" pt="4">
          <FormControl isInvalid={invalidStartDate} isRequired>
            <FormLabel color="blue.300">Start date</FormLabel>
            <DatePicker
              isDisabled={isEditDisabled}
              onChange={(e) => {
                setStartDate(e);
              }}
              value={startDate ?? undefined}
            />
            <FormErrorMessage>Invalid start date.</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={invalidEndDate} isRequired>
            <FormLabel color="blue.300">End date</FormLabel>
            <DatePicker
              onChange={(e) => {
                setEndDate(e);
              }}
              value={endDate ?? undefined}
            />
            <FormErrorMessage>Invalid end date.</FormErrorMessage>
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
    </DistributeAssessmentWrapper>
  );
};

export default AddInformation;
