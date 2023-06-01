import React from "react";
import { Text } from "@chakra-ui/react";

import type {
  AssessmentProperties,
  Status,
} from "../../../types/AssessmentTypes";
import { removeUnderscore, titleCase } from "../../../utils/GeneralUtils";
import type { TableRow } from "../../common/table/Table";
import { Table } from "../../common/table/Table";
import EditStatusPopover from "../assessment-status/EditStatusPopover";
import StatusTag from "../assessment-status/StatusTag";

interface AssessmentsTableProps {
  assessments: AssessmentProperties[];
}

const AssessmentsTable = ({
  assessments,
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
        assessmentStatus={assessment.status}
      />
    ),
  }));

  return <Table headers={headers} rows={rows} />;
};
export default AssessmentsTable;