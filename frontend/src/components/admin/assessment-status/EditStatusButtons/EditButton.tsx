import React from "react";
import { useHistory } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { GET_TEST } from "../../../../APIClients/queries/TestQueries";
import type { TestResponse } from "../../../../APIClients/types/TestClientTypes";
import * as Routes from "../../../../constants/Routes";
import useToast from "../../../common/info/useToast";
import PopoverButton from "../../../common/popover/PopoverButton";

interface EditButtonProps {
  assessmentId: string;
}

const EditButton = ({ assessmentId }: EditButtonProps): React.ReactElement => {
  const history = useHistory();
  const { data } = useQuery<{ test: TestResponse }>(GET_TEST, {
    fetchPolicy: "cache-and-network",
    variables: { id: assessmentId },
  });
  const { showToast } = useToast();

  return (
    <PopoverButton
      name="Edit"
      onClick={async () => {
        if (data) {
          history.push({
            pathname: Routes.ASSESSMENT_EDITOR_PAGE({ assessmentId }),
            state: data.test,
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
