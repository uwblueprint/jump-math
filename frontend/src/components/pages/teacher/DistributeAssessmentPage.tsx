/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Button, HStack, Spacer, VStack } from "@chakra-ui/react";

import AddInformation from "../../sessions/distribute/steps/AddInformation";
import ChooseAssessment from "../../sessions/distribute/steps/ChooseAssessment";
import ChooseClass from "../../sessions/distribute/steps/ChooseClass";
import Review from "../../sessions/distribute/steps/Review";

const DistributeAssessmentPage = (): React.ReactElement => {
  const [page, setPage] = useState(0);

  const [testId, setTestId] = useState("");
  const [classId, setClassId] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [notes, setNotes] = useState("");

  const renderPageContent = () => {
    switch (page) {
      case 0:
        return <ChooseAssessment setTestId={setTestId} />;
      case 1:
        return <ChooseClass setClassId={setClassId} />;
      case 2:
        return (
          <AddInformation
            setEndDate={setEndDate}
            setNotes={setNotes}
            setStartDate={setStartDate}
          />
        );
      case 3:
        return <Review />;
      default:
        return <></>;
    }
  };

  return (
    <VStack align="left">
      {renderPageContent()}
      <HStack>
        {page !== 0 && (
          <Button
            minWidth="10"
            onClick={() => setPage(page - 1)}
            variant="secondary"
          >
            Back
          </Button>
        )}
        <Spacer />
        {page !== 3 && (
          <Button
            minWidth="10"
            onClick={() => setPage(page + 1)}
            variant="secondary"
          >
            Next
          </Button>
        )}
      </HStack>
    </VStack>
  );
};

export default DistributeAssessmentPage;
