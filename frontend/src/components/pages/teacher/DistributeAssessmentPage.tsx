/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  HStack,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";

import { ChevronRightIcon } from "../../../assets/icons";
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

  const canVisit = (p: number) => {
    switch (p) {
      case 0:
        return true;
      case 1:
        return Boolean(testId);
      case 2:
        return Boolean(classId);
      case 3:
        return Boolean(startDate && endDate);
      default:
        return false;
    }
  };

  type BreadcrumbType = {
    header: string;
    page: number;
  };

  const breadcrumbs: BreadcrumbType[] = [
    { header: "Choose an assessment", page: 0 },
    { header: "Choose a classroom", page: 1 },
    { header: "Add Information", page: 2 },
    { header: "Review", page: 3 },
  ];

  return (
    <VStack align="left">
      <Breadcrumb
        color="grey.300"
        separator={<ChevronRightIcon />}
        spacing="8px"
      >
        {breadcrumbs.map((breadcrumb) => {
          const isCurrentPage = page === breadcrumb.page;
          return (
            <BreadcrumbItem
              key={breadcrumb.header}
              color={isCurrentPage ? "blue.300" : ""}
              isCurrentPage={isCurrentPage}
            >
              {canVisit(breadcrumb.page) ? (
                <BreadcrumbLink onClick={() => setPage(breadcrumb.page)}>
                  {breadcrumb.header}
                </BreadcrumbLink>
              ) : (
                <Text>{breadcrumb.header}</Text>
              )}
            </BreadcrumbItem>
          );
        })}
      </Breadcrumb>
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
            isDisabled={!canVisit(page + 1)}
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
