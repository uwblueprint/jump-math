import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Box } from "@chakra-ui/react";

import { GET_TEST } from "../../../../APIClients/queries/TestQueries";
import type { TestResponse } from "../../../../APIClients/types/TestClientTypes";
import { formatQuestionsResponse } from "../../../../utils/QuestionUtils";
import QueryStateHandler from "../../../common/QueryStateHandler";

import AssessmentEditor from "./AssessmentEditor";

const AssessmentEditorPage = () => {
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
  const state = test && {
    ...test,
    questions: formatQuestionsResponse(test.questions),
  };

  return (
    <Box mx={4}>
      <QueryStateHandler error={error} loading={loading}>
        <AssessmentEditor state={state} />
      </QueryStateHandler>
    </Box>
  );
};

export default AssessmentEditorPage;
