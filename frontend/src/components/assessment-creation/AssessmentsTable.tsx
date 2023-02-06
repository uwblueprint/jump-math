import React from "react";
import { Text } from "@chakra-ui/react";
import { AssessmentType } from "../../types/AssessmentType";
import EditAssessmentPopover from "./EditAssessmentPopover";
import StatusTag from "./StatusTag";
import { TableRow, Table } from "../common/Table";

interface AssessmentTableProps {
  assessments: AssessmentType[];
}

type StatusProperty = "Draft" | "Published" | "Archived" | "Deleted";

const AssessmentTable = ({
  assessments,
}: AssessmentTableProps): React.ReactElement => {
  const headers = ["Status", "Name", "Grade", "Type", "Country", "Region"];
  const rows: TableRow[] = assessments.map((assessment) => ({
    values: [
      <StatusTag key={1} status={assessment.status as StatusProperty} />,
      <Text key={2} fontWeight="bold">
        {assessment.name}
      </Text>,
      assessment.grade,
      assessment.type,
      assessment.country,
      assessment.region,
    ],
    menu: <EditAssessmentPopover />,
  }));

  return <Table headers={headers} rows={rows} />;
};
export default AssessmentTable;
