import React from "react";
import { AssessmentType } from "../../types/AssessmentType";
import { TableRow, Table } from "./Table";
import EditAssessmentPopover from "./EditAssessmentPopover";

interface AssessmentTableProps {
  assessments: AssessmentType[];
}

const AssessmentTable = ({
  assessments,
}: AssessmentTableProps): React.ReactElement => {
  const headers = ["Status", "Name", "Grade", "Type", "Country", "Region"];
  const rows: TableRow[] = assessments.map((assessment) => ({
    values: [
      assessment.status,
      assessment.name,
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
