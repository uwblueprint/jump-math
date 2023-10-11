import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button, HStack, Spacer, VStack } from "@chakra-ui/react";

import AuthContext from "../../../contexts/AuthContext";
import type { AuthenticatedTeacher } from "../../../types/AuthTypes";
import { TestSessionStatus } from "../../../types/TestSessionTypes";
import type { BreadcrumbType } from "../../common/navigation/FormBreadcrumb";
import FormBreadcrumb from "../../common/navigation/FormBreadcrumb";
import DistributeAssessmentButton from "../../teacher/session-creation/DistributeAssessmentButton";
import AddInformation from "../../teacher/session-creation/steps/AddInformation";
import ChooseAssessment from "../../teacher/session-creation/steps/ChooseAssessment";
import ChooseClass from "../../teacher/session-creation/steps/ChooseClass";
import Review from "../../teacher/session-creation/steps/Review";
import type { FormattedAssessmentData } from "../../teacher/view-sessions/useAssessmentDataQuery";

const BREADCRUMB_CONFIG: BreadcrumbType[] = [
  { header: "Choose an assessment", page: 0 },
  { header: "Choose a classroom", page: 1 },
  { header: "Add Information", page: 2 },
  { header: "Review", page: 3 },
];

const DistributeAssessmentPage = (): React.ReactElement => {
  const { state } = useLocation<FormattedAssessmentData>();

  const { authenticatedUser } = useContext(AuthContext);
  const { id: teacherId, school: schoolId } =
    (authenticatedUser as AuthenticatedTeacher) ?? {};

  const [page, setPage] = useState(state?.endDate !== undefined ? 3 : 2);

  const [testId, setTestId] = useState(state?.testId ?? "");
  const [testName, setTestName] = useState(state?.testName ?? "");

  const [classId, setClassId] = useState(state?.classroomId ?? "");
  const [className, setClassName] = useState(state?.classroomName ?? "");

  const [startDate, setStartDate] = useState<Date | null>(
    state?.startDate ?? null,
  );
  const [endDate, setEndDate] = useState<Date | null>(state?.endDate ?? null);
  const [notes, setNotes] = useState(state?.notes ?? "");

  const [validDates, setValidDates] = useState(false);
  const isEditDisabled =
    state?.status && state?.status !== TestSessionStatus.UPCOMING;

  const renderPageContent = () => {
    switch (page) {
      case 0:
        return (
          <ChooseAssessment
            isEditDisabled={isEditDisabled}
            setTestId={setTestId}
            setTestName={setTestName}
            testId={testId}
          />
        );
      case 1:
        return (
          <ChooseClass
            isEditDisabled={isEditDisabled}
            selectedClassId={classId}
            setClassId={setClassId}
            setClassName={setClassName}
          />
        );
      case 2:
        return (
          <AddInformation
            endDate={endDate}
            isEditDisabled={isEditDisabled}
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
            isEditDisabled={isEditDisabled}
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
    <VStack align="left" flex="1" gap={2}>
      <FormBreadcrumb
        breadcrumbs={BREADCRUMB_CONFIG}
        page={page}
        setPage={setPage}
        validPage={validPage}
      />
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
          <>
            {startDate && endDate && teacherId && (
              <DistributeAssessmentButton
                testSession={{
                  test: testId,
                  teacher: teacherId,
                  school: schoolId,
                  class: classId,
                  startDate,
                  endDate,
                  notes,
                }}
                testSessionId={state?.testSessionId}
              />
            )}
          </>
        )}
      </HStack>
    </VStack>
  );
};

export default DistributeAssessmentPage;
