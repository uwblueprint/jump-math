import React from "react";
import { HStack, Input, Text, Textarea, VStack } from "@chakra-ui/react";

import { formatDate } from "../../../../utils/GeneralUtils";
import DistributeAssessmentWrapper from "../DistributeAssessmentWrapper";
import ReviewItem from "../ReviewItem";

interface ReviewProps {
  className: string;
  testName: string;
  startDate: Date | null;
  endDate: Date | null;
  notes: string;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  isEditDisabled: boolean;
}

const Review = ({
  className,
  testName,
  startDate,
  endDate,
  notes,
  setPage,
  isEditDisabled,
}: ReviewProps): React.ReactElement => {
  return (
    <DistributeAssessmentWrapper
      subtitle="Please review the following information before distributing the assessment."
      title="Review"
    >
      <VStack alignItems="flex-start" gap={6} maxWidth="50%">
        <ReviewItem
          handleEdit={() => setPage(0)}
          isEditDisabled={isEditDisabled}
          label="Assessment Name"
          value={<Text textStyle="paragraph">{testName}</Text>}
        />
        <ReviewItem
          handleEdit={() => setPage(1)}
          isEditDisabled={isEditDisabled}
          label="Classroom"
          value={<Text textStyle="paragraph">{className}</Text>}
        />
        <HStack alignItems="flex-start" gap="15">
          <ReviewItem
            handleEdit={() => setPage(2)}
            isEditDisabled={isEditDisabled}
            label="Start date"
            value={
              <Input
                isDisabled
                value={startDate ? formatDate(startDate) : ""}
                width={80}
              />
            }
          />
          <ReviewItem
            handleEdit={() => setPage(2)}
            label="End date"
            value={
              <Input
                isDisabled
                value={endDate ? formatDate(endDate) : ""}
                width={80}
              />
            }
          />
        </HStack>
        <ReviewItem
          handleEdit={() => setPage(2)}
          isRequired={false}
          label="Additional Notes"
          value={<Textarea isDisabled value={notes} />}
        />
      </VStack>
    </DistributeAssessmentWrapper>
  );
};

export default Review;
