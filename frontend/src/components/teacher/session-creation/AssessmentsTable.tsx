import React from "react";
import { useHistory } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import { Radio, RadioGroup, Text } from "@chakra-ui/react";

import { GET_TEST } from "../../../APIClients/queries/TestQueries";
import type { TestResponse } from "../../../APIClients/types/TestClientTypes";
import type { Grade } from "../../../APIClients/types/UserClientTypes";
import { EyeOutlineIcon } from "../../../assets/icons";
import * as Routes from "../../../constants/Routes";
import type { UseCase } from "../../../types/AssessmentTypes";
import { removeUnderscore, titleCase } from "../../../utils/GeneralUtils";
import ActionButton from "../../common/form/ActionButton";
import useToast from "../../common/info/useToast";
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
  const history = useHistory();
  const { showToast } = useToast();

  const [previewAssessmentQuery] = useLazyQuery<{
    test: TestResponse;
  }>(GET_TEST);

  const previewAssessment = async (assessmentId: string) => {
    const { data } = await previewAssessmentQuery({
      variables: { id: assessmentId },
    });
    if (data) {
      history.push({
        pathname: Routes.TEACHER_ASSESSMENT_PREVIEW_PAGE({
          assessmentId,
        }),
        state: data.test,
      });
    } else {
      showToast({
        message:
          "This assessment cannot be previewed at this time. Please try again.",
        status: "error",
      });
    }
  };

  const headers = ["", "Name", "Grade", "Type", "Country", "Region"];
  const rows: TableRow[] = assessments.map((assessment, i) => ({
    id: assessment.id,
    values: [
      <Radio
        key={i}
        isDisabled={isDisabled}
        value={assessment.id}
        variant="table"
      />,
      <Text key={i} fontWeight="bold">
        {assessment.name}
      </Text>,
      titleCase(removeUnderscore(assessment.grade)),
      titleCase(assessment.assessmentType),
      assessment.curriculumCountry,
      assessment.curriculumRegion,
    ],
    menu: (
      <ActionButton
        aria-label="preview-assessment"
        leftIcon={<EyeOutlineIcon boxSize={5} />}
        onClick={() => previewAssessment(assessment.id)}
        showDefaultToasts={false}
        size="sm"
      />
    ),
    onClick: () => {
      setTestId(assessment.id);
      if (setTestName) {
        setTestName(assessment.name);
      }
    },
    isDisabled: isDisabled,
  }));

  return (
    <RadioGroup
      onChange={(e) => setTestId(e)}
      value={selectedTestId}
      width="100%"
    >
      <Table headers={headers} rows={rows} />
    </RadioGroup>
  );
};
export default AssessmentsTable;
