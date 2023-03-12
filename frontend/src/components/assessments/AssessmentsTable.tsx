import React from "react";
import { Text } from "@chakra-ui/react";

import { AssessmentTypes, Status } from "../../types/AssessmentTypes";
import titleCase from "../../utils/GeneralUtils";
import { Table, TableRow } from "../common/table/Table";

import EditStatusPopover from "./EditStatusPopover";
import StatusTag from "./StatusTag";

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
      titleCase(assessment.grade),
      titleCase(assessment.type),
      assessment.country,
      assessment.region,
    ],
    menu: <EditStatusPopover />,
  }));

  return <Table headers={headers} rows={rows} />;
};
export default AssessmentsTable;
