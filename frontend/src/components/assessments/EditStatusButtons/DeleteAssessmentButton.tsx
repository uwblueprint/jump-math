import React from "react";
import { useMutation } from "@apollo/client";
import { useToast } from "@chakra-ui/react";

import { DELETE_TEST } from "../../../APIClients/mutations/TestMutations";
import GET_ALL_TESTS from "../../../APIClients/queries/TestQueries";
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

  const toast = useToast();
  const showSuccessToast = (message: string) => {
    toast({
      description: message,
      variant: "successToast",
      status: "success",
      duration: 9000,
      isClosable: true,
      position: "top",
    });
  };

  const showErrorToast = (message: string) => {
    toast({
      description: message,
      variant: "errorToast",
      status: "error",
      duration: 9000,
      isClosable: true,
      position: "top",
    });
  };

  const onDeleteAssessment = async () => {
    await deleteAssessment({ variables: { id: assessmentId } });
    if (error) {
      showErrorToast("Assessment failed to delete. Please try again.");
    } else {
      showSuccessToast("Assessment deleted.");
    }
  };

  return <EditStatusButton name="Delete" onClick={onDeleteAssessment} />;
};

export default DeleteAssessmentButton;
