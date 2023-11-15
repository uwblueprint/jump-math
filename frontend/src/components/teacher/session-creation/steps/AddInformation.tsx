import React, { type ReactElement, useState } from "react";
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  Textarea,
  VStack,
} from "@chakra-ui/react";

import { getEarliestValidDate } from "../../../../utils/DateUtils";
import DateTimePicker from "../../../common/form/DateTimePicker";
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
}: AddInformationProps): ReactElement => {
  const [invalidStartDate, setInvalidStartDate] = useState("");
  const [invalidEndDate, setInvalidEndDate] = useState("");

  const validateDates = (
    now: Date,
    newStartDate: Date | null,
    newEndDate: Date | null,
  ) => {
    const earliestValidDate = getEarliestValidDate(now);

    const isEndDateTooOld = !!newEndDate && newEndDate <= earliestValidDate;
    const isInvalidDateOrder =
      !!newStartDate && !!newEndDate && newStartDate >= newEndDate;

    setInvalidStartDate(
      isInvalidDateOrder ? "Start date must be before end date." : "",
    );
    setInvalidEndDate(
      isInvalidDateOrder
        ? "End date must be after start date."
        : isEndDateTooOld
        ? "End date must be at least 1 hour in the future."
        : "",
    );
    setValidDates(!isInvalidDateOrder && !isEndDateTooOld);
  };

  return (
    <DistributeAssessmentWrapper
      subtitle="Please choose start and end dates and write any notes for this assessment."
      title="Add Information"
    >
      <VStack
        alignItems="left"
        flex="1"
        gap="8"
        maxWidth="50%"
        paddingBottom="6"
      >
        <HStack alignItems="flex-start" gap="15" pt="4">
          <FormControl isInvalid={!!invalidStartDate} isRequired>
            <FormLabel color="blue.300">Start Date</FormLabel>
            <DateTimePicker
              isDisabled={isEditDisabled}
              name="startDate"
              onChange={(newDate: Date | null) => {
                setStartDate(newDate);

                const now = new Date();
                validateDates(now, newDate, endDate);
              }}
              value={startDate}
            />
            <FormErrorMessage>{invalidStartDate}</FormErrorMessage>
          </FormControl>
        </HStack>
        <HStack alignItems="flex-start" gap="15" pt="4">
          <FormControl isInvalid={!!invalidEndDate} isRequired>
            <FormLabel color="blue.300">End Date</FormLabel>
            <DateTimePicker
              name="endDate"
              onChange={(newDate: Date | null) => {
                setEndDate(newDate);

                const now = new Date();
                validateDates(now, startDate, newDate);
              }}
              value={endDate}
            />
            <FormErrorMessage>{invalidEndDate}</FormErrorMessage>
          </FormControl>
        </HStack>
        <FormControl>
          <FormLabel color="blue.300">Additional Notes</FormLabel>
          <Textarea
            onChange={(e) => setNotes(e.target.value)}
            placeholder="(Optional)"
            value={notes}
          />
          <FormHelperText>
            Notes will be shown to students before they start the assessment.
          </FormHelperText>
        </FormControl>
      </VStack>
    </DistributeAssessmentWrapper>
  );
};

export default AddInformation;
