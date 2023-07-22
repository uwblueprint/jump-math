import React from "react";
import {
  FormControl,
  FormLabel,
  HStack,
  Input,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";

import { formatDate } from "../../../../utils/GeneralUtils";
import EditIconButton from "../../../common/EditIconButton";
import DistributeAssessmentWrapper from "../DistributeAssessmentWrapper";

interface ReviewProps {
  className: string;
  testName: string;
  startDate: Date | null;
  endDate: Date | null;
  notes: string;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const Review = ({
  className,
  testName,
  startDate,
  endDate,
  notes,
  setPage,
}: ReviewProps): React.ReactElement => {
  return (
    <DistributeAssessmentWrapper
      subtitle="Please review the following information before distributing the assessment."
      title="Review"
    >
      <VStack alignItems="flex-start" gap={8} maxWidth="50%">
        <FormControl isRequired>
          <HStack alignItems="flex-end">
            <FormLabel color="blue.300" marginRight={0}>
              Assessment Name
            </FormLabel>
            <EditIconButton onClick={() => setPage(0)} />
          </HStack>
          <Text textStyle="paragraph">{testName}</Text>
        </FormControl>
        <FormControl isRequired>
          <HStack alignItems="flex-end">
            <FormLabel color="blue.300" marginRight={0}>
              Classroom
            </FormLabel>
            <EditIconButton onClick={() => setPage(1)} />
          </HStack>
          <Text textStyle="paragraph">{className}</Text>
        </FormControl>
        <HStack alignItems="flex-start" gap="15">
          <FormControl isRequired>
            <HStack alignItems="flex-end">
              <FormLabel color="blue.300" marginRight={0}>
                Start date
              </FormLabel>
              <EditIconButton onClick={() => setPage(2)} />
            </HStack>
            <Input
              isDisabled
              value={startDate ? formatDate(startDate) : ""}
              width={80}
            />
          </FormControl>
          <FormControl isRequired>
            <HStack alignItems="flex-end">
              <FormLabel color="blue.300" marginRight={0}>
                End date
              </FormLabel>
              <EditIconButton onClick={() => setPage(2)} />
            </HStack>
            <Input
              isDisabled
              value={endDate ? formatDate(endDate) : ""}
              width={80}
            />
          </FormControl>
        </HStack>
        <FormControl>
          <HStack alignItems="flex-end">
            <FormLabel color="blue.300" marginRight={0}>
              Additional Notes
            </FormLabel>
            <EditIconButton onClick={() => setPage(2)} />
          </HStack>
          <Textarea isDisabled value={notes} />
        </FormControl>
      </VStack>
    </DistributeAssessmentWrapper>
  );
};

export default Review;
