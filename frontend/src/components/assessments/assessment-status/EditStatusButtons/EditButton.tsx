import React from "react";
import { useHistory } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { GET_TEST } from "../../../../APIClients/queries/TestQueries";
import { TestResponse } from "../../../../APIClients/types/TestClientTypes";
import { ASSESSMENT_PAGE } from "../../../../constants/Routes";
import { formatQuestionsResponse } from "../../../../utils/QuestionUtils";
import EditStatusButton from "../EditStatusButton";

interface EditButtonProps {
  assessmentId: string;
  closePopover: () => void;
}

const EditButton = ({
  assessmentId,
  closePopover,
}: EditButtonProps): React.ReactElement => {
  const history = useHistory();
  const { data } = useQuery<{ test: TestResponse }>(GET_TEST, {
    fetchPolicy: "cache-and-network",
    variables: { id: assessmentId },
  });

  return (
    <EditStatusButton
      name="Edit"
      onClick={async () => {
        closePopover();
        if (data) {
          history.push({
            pathname: ASSESSMENT_PAGE,
            state: {
              ...data.test,
              questions: formatQuestionsResponse(data.test.questions),
            },
          });
        }
      }}
    />
  );
};

export default EditButton;
