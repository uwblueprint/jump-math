import React from "react";
import { Text } from "@chakra-ui/react";

import { AssessmentProperties, Status } from "../../types/AssessmentTypes";
import { removeUnderscore, titleCase } from "../../utils/GeneralUtils";
import { Table, TableRow } from "../common/table/Table";

import EditStatusPopover from "./EditStatusPopover";
import StatusTag from "./StatusTag";

interface AssessmentsTableProps {
  assessments: AssessmentProperties[];
  setConfirmationMessage: React.Dispatch<React.SetStateAction<string>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}

const AssessmentsTable = ({
  assessments,
  setConfirmationMessage,
  setErrorMessage,
}: AssessmentsTableProps): React.ReactElement => {
  const headers = ["Status", "Name", "Grade", "Type", "Country", "Region"];
  const rows: TableRow[] = assessments.map((assessment, i) => ({
    values: [
      <StatusTag key={i} status={assessment.status as Status} />,
      <Text key={i} fontWeight="bold">
        {assessment.name}
      </Text>,
      assessment.grade === "K"
        ? "Kindergarten"
        : titleCase(removeUnderscore(assessment.grade)),
      titleCase(assessment.assessmentType),
      assessment.curriculumCountry,
      assessment.curriculumRegion,
    ],
    menu: (
      <EditStatusPopover
        assessmentId={assessment.id}
        setConfirmationMessage={setConfirmationMessage}
        setErrorMessage={setErrorMessage}
      />
    ),
  }));

  return <Table headers={headers} rows={rows} />;
};
export default AssessmentsTable;
