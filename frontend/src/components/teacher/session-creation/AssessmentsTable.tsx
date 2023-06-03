import React from "react";
import { Radio, Text } from "@chakra-ui/react";

import type { Grade } from "../../../APIClients/types/UserClientTypes";
import type { UseCase } from "../../../types/AssessmentTypes";
import { removeUnderscore, titleCase } from "../../../utils/GeneralUtils";
import type { TableRow } from "../../common/table/Table";
import { Table } from "../../common/table/Table";

type AssessmentProperties = {
  id: string;
  name: string;
  grade: Grade;
  assessmentType: UseCase;
  curriculumCountry: string;
  curriculumRegion: string;
};

interface AssessmentsTableProps {
  assessments: AssessmentProperties[];
}

const AssessmentsTable = ({
  assessments,
}: AssessmentsTableProps): React.ReactElement => {
  const headers = ["", "Name", "Grade", "Type", "Country", "Region"];
  const rows: TableRow[] = assessments.map((assessment, i) => ({
    values: [
      <Radio key={i} variant="table" />,
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
  }));

  return <Table headers={headers} rows={rows} />;
};
export default AssessmentsTable;
