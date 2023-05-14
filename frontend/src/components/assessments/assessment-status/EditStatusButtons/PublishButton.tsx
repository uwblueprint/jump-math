import React from "react";
import { useMutation } from "@apollo/client";

import { PUBLISH_TEST } from "../../../../APIClients/mutations/TestMutations";
import { GET_ALL_TESTS } from "../../../../APIClients/queries/TestQueries";
import PopoverButton from "../../../common/PopoverButton";
import Toast from "../../../common/Toast";
import PublishModal from "../EditStatusModals/PublishModal";

interface PublishButtonProps {
  assessmentId: string;
  closePopover: () => void;
}

const PublishButton = ({
  assessmentId,
  closePopover,
}: PublishButtonProps): React.ReactElement => {
  const [showPublishModal, setShowPublishModal] = React.useState(false);
  const [publishAssessment, { error }] = useMutation<{
    publishAssessment: string;
  }>(PUBLISH_TEST, {
    refetchQueries: [{ query: GET_ALL_TESTS }],
  });

  const { showToast } = Toast();

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
      <PopoverButton
        name="Publish"
        onClick={() => {
          closePopover();
          setShowPublishModal(true);
        }}
      />
      <PublishModal
        isOpen={showPublishModal}
        onClose={() => setShowPublishModal(false)}
        publishAssessment={handlePublishAssessment}
      />
    </>
  );
};

export default PublishButton;
