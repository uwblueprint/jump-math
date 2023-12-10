import React, { useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Box, Button } from "@chakra-ui/react";

import { GET_TEST } from "../../../APIClients/queries/TestQueries";
import type { TestResponse } from "../../../APIClients/types/TestClientTypes";
import { ArrowBackOutlineIcon } from "../../../assets/icons";
import { formatQuestionsResponse } from "../../../utils/QuestionUtils";
import usePageTitle from "../../auth/usePageTitle";
import QueryStateHandler from "../../common/QueryStateHandler";
import AssessmentExperience from "../../student/AssessmentExperience";

const AssessmentPreviewPage = () => {
  const history = useHistory();

  // Data could come from the previous page.
  const { state: locationState } = useLocation<TestResponse | undefined>();

  // If data is not available from the previous page, then we have to fetch it.
  const { assessmentId } = useParams<{ assessmentId?: string }>();
  const {
    data: testData,
    loading,
    error,
  } = useQuery<{
    test: TestResponse;
  }>(GET_TEST, {
    variables: { id: assessmentId },
    skip: !!locationState || !assessmentId,
  });

  const test = locationState || testData?.test;
  const state = useMemo(
    () =>
      test && {
        ...test,
        questions: formatQuestionsResponse(test.questions),
      },
    [test],
  );

  const assessmentName = state?.name;
  usePageTitle(`Previewing "${assessmentName || "assesssment"}`);

  const closeAssessmentPreviewButton = (
    <Button
      leftIcon={<ArrowBackOutlineIcon />}
      onClick={() => history.goBack()}
      variant="tertiary"
    >
      Back
    </Button>
  );

  return (
    <Box mx={4}>
      <QueryStateHandler error={error} loading={loading}>
        <AssessmentExperience
          headerButton={closeAssessmentPreviewButton}
          isPreviewMode
          questions={state?.questions || []}
          title="Preview Assessment"
        />
      </QueryStateHandler>
    </Box>
  );
};

export default AssessmentPreviewPage;
