import React from "react";
import { Radio, RadioGroup, Text } from "@chakra-ui/react";

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
  selectedTestId: string;
  setTestId: React.Dispatch<React.SetStateAction<string>>;
  setTestName?: React.Dispatch<React.SetStateAction<string>>;
  isDisabled: boolean;
}

const AssessmentsTable = ({
  assessments,
  selectedTestId,
  setTestId,
  setTestName,
  isDisabled = false,
}: AssessmentsTableProps): React.ReactElement => {
  const headers = ["", "Name", "Grade", "Type", "Country", "Region"];
  const rows: TableRow[] = assessments.map((assessment, i) => ({
    id: assessment.id,
    values: [
      <Radio key={i} value={assessment.id} variant="table" />,
      <Text key={i} fontWeight="bold">
        {assessment.name}
      </Text>,
      titleCase(removeUnderscore(assessment.grade)),
      titleCase(assessment.assessmentType),
      assessment.curriculumCountry,
      assessment.curriculumRegion,
    ],
    onClick: () => {
      setTestId(assessment.id);
      if (setTestName) {
        setTestName(assessment.name);
      }
    },
  }));

  return (
    <RadioGroup
      onChange={(e) => setTestId(e)}
      value={selectedTestId}
      width="100%"
    >
      <Table headers={headers} isDisabled={isDisabled} rows={rows} />
    </RadioGroup>
  );
};
export default AssessmentsTable;
