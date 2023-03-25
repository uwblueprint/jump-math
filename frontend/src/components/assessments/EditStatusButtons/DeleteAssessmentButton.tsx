import React from "react";
import { useMutation } from "@apollo/client";

import { DELETE_TEST } from "../../../APIClients/mutations/TestMutations";
import GET_ALL_TESTS from "../../../APIClients/queries/TestQueries";
import Toast from "../../common/Toast";
import EditStatusButton from "../EditStatusButton";

interface DeleteAssessmentButtonProps {
  assessmentId: string;
}

const DeleteAssessmentButton = ({
  assessmentId,
}: DeleteAssessmentButtonProps): React.ReactElement => {
  const [deleteAssessment, { error }] = useMutation<{
    deleteAssessment: string;
  }>(DELETE_TEST, {
    refetchQueries: [{ query: GET_ALL_TESTS }],
  });

  const { showToast } = Toast();

  const onDeleteAssessment = async () => {
    await deleteAssessment({ variables: { id: assessmentId } });
    if (error) {
      showToast({
        message: "Assessment failed to delete. Please try again.",
        status: "error",
      });
    } else {
      showToast({
        message: "Assessment deleted.",
        status: "success",
      });
    }
  };

  return <EditStatusButton name="Delete" onClick={onDeleteAssessment} />;
};

export default DeleteAssessmentButton;
