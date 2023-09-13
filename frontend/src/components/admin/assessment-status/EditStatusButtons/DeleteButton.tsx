import React from "react";
import { useMutation } from "@apollo/client";
import { useDisclosure } from "@chakra-ui/react";

import { DELETE_TEST } from "../../../../APIClients/mutations/TestMutations";
import { GET_ALL_TESTS } from "../../../../APIClients/queries/TestQueries";
import { getQueryName } from "../../../../utils/GeneralUtils";
import PopoverButton from "../../../common/popover/PopoverButton";
import DeleteAssessmentModal from "../EditStatusModals/DeleteAssessmentModal";

interface DeleteButtonProps {
  assessmentId: string;
}

const DeleteButton = ({
  assessmentId,
}: DeleteButtonProps): React.ReactElement => {
  const { onOpen, isOpen, onClose } = useDisclosure();

  const [deleteAssessment] = useMutation<{
    deleteAssessment: string;
  }>(DELETE_TEST, {
    variables: { id: assessmentId },
    refetchQueries: [getQueryName(GET_ALL_TESTS)],
  });

  return (
    <>
      <PopoverButton name="Delete" onClick={onOpen} />
      <DeleteAssessmentModal
        deleteAssessment={deleteAssessment}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};

export default DeleteButton;
