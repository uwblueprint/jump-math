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

import { PUBLISH_TEST } from "../../../APIClients/mutations/TestMutations";
import GET_ALL_TESTS from "../../../APIClients/queries/TestQueries";
import Toast from "../../common/Toast";

interface PublishAssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  assessmentId: string;
}

const PublishAssessment = ({
  isOpen,
  onClose,
  assessmentId,
}: PublishAssessmentModalProps): React.ReactElement => {
  const [publishAssessment, { error }] = useMutation<{
    publishAssessment: string;
  }>(PUBLISH_TEST, {
    refetchQueries: [{ query: GET_ALL_TESTS }],
  });

  const { showToast } = Toast();

  const onPublishAssessment = async () => {
    await publishAssessment({ variables: { id: assessmentId } });
    if (error) {
      showToast({
        message: "Assessment failed to publish. Please try again.",
        status: "error",
      });
    } else {
      showToast({
        message: "Assessment published.",
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
          <Text textStyle="subtitle2">Publish Assessment</Text>
        </ModalHeader>
        <ModalBody color="grey.300">
          Once this is published, teachers will be able to distribute this
          assessment to their students.
        </ModalBody>
        <ModalCloseButton />
        <Divider color="grey.200" mt="1.5em" />
        <ModalFooter justifyContent="center">
          <Button mr={2} onClick={onClose} variant="secondary">
            Cancel
          </Button>
          <Button onClick={onPublishAssessment} variant="primary">
            Publish
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PublishAssessment;
