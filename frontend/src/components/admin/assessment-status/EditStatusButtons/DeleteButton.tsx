import React from "react";
import { useMutation } from "@apollo/client";
import { useDisclosure } from "@chakra-ui/react";

import { DELETE_TEST } from "../../../../APIClients/mutations/TestMutations";
import { GET_ALL_TESTS } from "../../../../APIClients/queries/TestQueries";
import useToast from "../../../common/info/useToast";
import PopoverButton from "../../../common/popover/PopoverButton";
import DeleteModal from "../EditStatusModals/DeleteModal";

interface DeleteButtonProps {
  assessmentId: string;
}

const DeleteButton = ({
  assessmentId,
}: DeleteButtonProps): React.ReactElement => {
  const { onOpen, isOpen, onClose } = useDisclosure();

  const [deleteAssessment, { error }] = useMutation<{
    deleteAssessment: string;
  }>(DELETE_TEST, {
    refetchQueries: [{ query: GET_ALL_TESTS }],
  });

  const { showToast } = useToast();

  const handleDeleteAssessment = async () => {
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

  return (
    <>
      <PopoverButton name="Delete" onClick={onOpen} />
      <DeleteModal
        deleteAssessment={handleDeleteAssessment}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};

export default DeleteButton;
