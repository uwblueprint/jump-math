import React from "react";
import { useMutation } from "@apollo/client";

import { DELETE_TEST } from "../../APIClients/mutations/TestMutations";
import GET_ALL_TESTS from "../../APIClients/queries/TestQueries";

import EditStatusButton from "./EditStatusButton";

interface DeleteAssessmentButtonProps {
  assessmentId: string;
  setConfirmationMessage: React.Dispatch<React.SetStateAction<string>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}

const DeleteAssessmentButton = ({
  assessmentId,
  setConfirmationMessage,
  setErrorMessage,
}: DeleteAssessmentButtonProps): React.ReactElement => {
  const [deleteAssessment] = useMutation<{ deleteAssessment: string }>(
    DELETE_TEST,
    {
      refetchQueries: [{ query: GET_ALL_TESTS }],
    },
  );

  const onDeleteAssessment = async () => {
    await deleteAssessment({ variables: { id: assessmentId } });
  };

  return <EditStatusButton name="Delete" onClick={onDeleteAssessment} />;
};

export default DeleteAssessmentButton;
