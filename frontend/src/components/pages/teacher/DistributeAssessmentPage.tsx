/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button, HStack, Spacer, VStack } from "@chakra-ui/react";

import type { BreadcrumbType } from "../../common/navigation/FormBreadcrumb";
import FormBreadcrumb from "../../common/navigation/FormBreadcrumb";
import AddInformation from "../../teacher/session-creation/steps/AddInformation";
import ChooseAssessment from "../../teacher/session-creation/steps/ChooseAssessment";
import ChooseClass from "../../teacher/session-creation/steps/ChooseClass";
import Review from "../../teacher/session-creation/steps/Review";

const BREADCRUMB_CONFIG: BreadcrumbType[] = [
  { header: "Choose an assessment", page: 0 },
  { header: "Choose a classroom", page: 1 },
  { header: "Add Information", page: 2 },
  { header: "Review", page: 3 },
];

const getLocationState = (state: unknown): { classroomId: string } => ({
  classroomId: "",
  ...(typeof state === "object" ? state : {}),
});

const DistributeAssessmentPage = (): React.ReactElement => {
  const { state } = useLocation();
  const { classroomId: initialClassId } = getLocationState(state);

  const [page, setPage] = useState(0);

  const [testId, setTestId] = useState("");
  const [classId, setClassId] = useState(initialClassId);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [notes, setNotes] = useState("");

  const [validDates, setValidDates] = useState(false);

  const renderPageContent = () => {
    switch (page) {
      case 0:
        return <ChooseAssessment setTestId={setTestId} testId={testId} />;
      case 1:
        return (
          <ChooseClass selectedClassId={classId} setClassId={setClassId} />
        );
      case 2:
        return (
          <AddInformation
            endDate={endDate}
            notes={notes}
            setEndDate={setEndDate}
            setNotes={setNotes}
            setStartDate={setStartDate}
            setValidDates={setValidDates}
            startDate={startDate}
          />
        );
      case 3:
        return <Review />;
      default:
        return <></>;
    }
  };

  const validPage = (p: number) => {
    switch (p) {
      case 0:
        return true;
      case 1:
        return Boolean(testId);
      case 2:
        return Boolean(classId);
      case 3:
        return Boolean(startDate && endDate) && validDates;
      default:
        return false;
    }
  };

  return (
    <VStack align="left" gap={2} minHeight="100%" paddingBottom="4">
      <FormBreadcrumb
        breadcrumbs={BREADCRUMB_CONFIG}
        page={page}
        setPage={setPage}
        validPage={validPage}
      />
      {renderPageContent()}
      <Spacer />
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
            isDisabled={!validPage(page + 1)}
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
