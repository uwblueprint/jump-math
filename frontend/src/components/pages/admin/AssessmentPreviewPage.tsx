import React, { useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Box } from "@chakra-ui/react";

import { GET_TEST } from "../../../APIClients/queries/TestQueries";
import type { TestResponse } from "../../../APIClients/types/TestClientTypes";
import { formatQuestionsResponse } from "../../../utils/QuestionUtils";
import AssessmentPreview from "../../admin/assessment-creation/AssessmentPreview";
import QueryStateHandler from "../../common/QueryStateHandler";

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

  return (
    <Box mx={4}>
      <QueryStateHandler error={error} loading={loading}>
        <AssessmentPreview
          backButtonText="Back"
          goBack={() => history.goBack()}
          questions={state?.questions || []}
        />
      </QueryStateHandler>
    </Box>
  );
};

export default AssessmentPreviewPage;
