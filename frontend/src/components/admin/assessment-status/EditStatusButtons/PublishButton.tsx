import React from "react";
import { useMutation } from "@apollo/client";
import { useDisclosure } from "@chakra-ui/react";

import { PUBLISH_TEST } from "../../../../APIClients/mutations/TestMutations";
import { GET_ALL_TESTS } from "../../../../APIClients/queries/TestQueries";
import useToast from "../../../common/info/useToast";
import PopoverButton from "../../../common/popover/PopoverButton";
import PublishModal from "../EditStatusModals/PublishModal";

interface PublishButtonProps {
  assessmentId: string;
}

const PublishButton = ({
  assessmentId,
}: PublishButtonProps): React.ReactElement => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const [publishAssessment, { error }] = useMutation<{
    publishAssessment: string;
  }>(PUBLISH_TEST, {
    refetchQueries: [{ query: GET_ALL_TESTS }],
  });

  const { showToast } = useToast();

  const handlePublishAssessment = async () => {
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
  };

  return (
    <>
      <PopoverButton name="Publish" onClick={onOpen} />
      <PublishModal
        isOpen={isOpen}
        onClose={onClose}
        publishAssessment={handlePublishAssessment}
      />
    </>
  );
};

export default PublishButton;
