import React, { useState } from "react";
import { Button, HStack, Spacer, VStack } from "@chakra-ui/react";

import type { BreadcrumbType } from "../../common/navigation/FormBreadcrumb";
import FormBreadcrumb from "../../common/navigation/FormBreadcrumb";
import DistributeSessionButton from "../../teacher/session-creation/DistributeSessionButton";
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

const DistributeAssessmentPage = (): React.ReactElement => {
  const [page, setPage] = useState(0);

  const [testId, setTestId] = useState("");
  const [testName, setTestName] = useState("");

  const [classId, setClassId] = useState("");
  const [className, setClassName] = useState("");

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [notes, setNotes] = useState("");

  const [validDates, setValidDates] = useState(false);

  const renderPageContent = () => {
    switch (page) {
      case 0:
        return (
          <ChooseAssessment
            setTestId={setTestId}
            setTestName={setTestName}
            testId={testId}
          />
        );
      case 1:
        return (
          <ChooseClass
            selectedClassId={classId}
            setClassId={setClassId}
            setClassName={setClassName}
          />
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
        return (
          <Review
            className={className}
            endDate={endDate}
            notes={notes}
            setPage={setPage}
            startDate={startDate}
            testName={testName}
          />
        );
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
        {page !== 3 ? (
          <Button
            isDisabled={!validPage(page + 1)}
            minWidth="10"
            onClick={() => setPage(page + 1)}
            variant="secondary"
          >
            Next
          </Button>
        ) : (
          <DistributeSessionButton />
        )}
      </HStack>
    </VStack>
  );
};

export default DistributeAssessmentPage;
