import React from "react";
import { useHistory } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { GET_TEST } from "../../../../APIClients/queries/TestQueries";
import { TestResponse } from "../../../../APIClients/types/TestClientTypes";
import { ASSESSMENT_EDITOR_PAGE } from "../../../../constants/Routes";
import { formatQuestionsResponse } from "../../../../utils/QuestionUtils";
import PopoverButton from "../../../common/PopoverButton";
import Toast from "../../../common/Toast";

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
  const { showToast } = Toast();

  return (
    <PopoverButton
      name="Edit"
      onClick={async () => {
        closePopover();
        if (data) {
          history.push({
            pathname: ASSESSMENT_EDITOR_PAGE,
            state: {
              ...data.test,
              questions: formatQuestionsResponse(data.test.questions),
            },
          });
        } else {
          showToast({
            message:
              "This assessment cannot be edited at this time. Please try again.",
            status: "error",
          });
        }
      }}
    />
  );
};

export default EditButton;
