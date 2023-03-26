import React from "react";
import { useMutation } from "@apollo/client";
import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";

import { DELETE_TEST } from "../../../APIClients/mutations/TestMutations";
import GET_ALL_TESTS from "../../../APIClients/queries/TestQueries";
import Toast from "../../common/Toast";

interface DeleteAssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  assessmentId: string;
}

const DeleteAssessmentModal = ({
  isOpen,
  onClose,
  assessmentId,
}: DeleteAssessmentModalProps): React.ReactElement => {
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
    onClose();
  };

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent minWidth="42vw">
        <ModalHeader>
          <Text textStyle="subtitle2">Delete Assessment</Text>
        </ModalHeader>
        <ModalBody color="grey.300">
          Once you delete this assessment it cannot be recovered.
        </ModalBody>
        <ModalCloseButton />
        <Divider color="grey.200" mt="1.5em" />
        <ModalFooter justifyContent="center">
          <Button
            _hover={{ backgroundColor: "red.100" }}
            backgroundColor="red.50"
            color="red.200"
            mr={2}
            onClick={onClose}
            variant="secondary"
          >
            Cancel
          </Button>
          <Button
            _hover={{ backgroundColor: "red.100" }}
            backgroundColor="red.200"
            onClick={onDeleteAssessment}
            variant="primary"
          >
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteAssessmentModal;
