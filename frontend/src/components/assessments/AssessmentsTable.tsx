import React from "react";
import { Text } from "@chakra-ui/react";
import { AssessmentTypes, Status } from "../../types/AssessmentTypes";
import EditStatusPopover from "./EditStatusPopover";
import StatusTag from "./StatusTag";
import { TableRow, Table } from "../common/table/Table";

interface AssessmentsTableProps {
  assessments: AssessmentTypes[];
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
      assessment.grade,
      assessment.type,
      assessment.country,
      assessment.region,
    ],
    menu: <EditStatusPopover />,
  }));

  return <Table headers={headers} rows={rows} />;
};
export default AssessmentsTable;
