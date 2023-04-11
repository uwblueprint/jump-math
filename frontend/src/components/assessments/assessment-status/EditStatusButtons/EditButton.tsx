import React from "react";
import { useHistory } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { GET_TEST } from "../../../../APIClients/queries/TestQueries";
import { ASSESSMENT_PAGE } from "../../../../constants/Routes";
import { AssessmentResponse } from "../../../../types/AssessmentTypes";
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
  const { data } = useQuery<{ test: AssessmentResponse }>(GET_TEST, {
    fetchPolicy: "cache-and-network",
    variables: { id: assessmentId },
  });

  if (data) {
    return (
      <EditStatusButton
        name="Edit"
        onClick={async () => {
          closePopover();
          history.push({
            pathname: ASSESSMENT_PAGE,
            state: {
              ...data.test,
              question: formatQuestionsResponse(data.test.questions),
            },
          });
        }}
      />
    );
  }

  return <></>;
};

export default EditButton;
