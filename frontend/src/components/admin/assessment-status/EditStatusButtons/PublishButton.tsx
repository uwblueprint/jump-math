import React from "react";
import { useMutation } from "@apollo/client";
import { useDisclosure } from "@chakra-ui/react";

import { PUBLISH_TEST } from "../../../../APIClients/mutations/TestMutations";
import { GET_ALL_TESTS } from "../../../../APIClients/queries/TestQueries";
import { getQueryName } from "../../../../utils/GeneralUtils";
import PopoverButton from "../../../common/popover/PopoverButton";
import PublishAssessmentModal from "../EditStatusModals/PublishAssessmentModal";

interface PublishButtonProps {
  assessmentId: string;
}

const PublishButton = ({
  assessmentId,
}: PublishButtonProps): React.ReactElement => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const [publishAssessment] = useMutation<{
    publishAssessment: string;
  }>(PUBLISH_TEST, {
    variables: { id: assessmentId },
    refetchQueries: [getQueryName(GET_ALL_TESTS)],
  });

  return (
    <>
      <PopoverButton name="Publish" onClick={onOpen} />
      <PublishAssessmentModal
        isOpen={isOpen}
        onClose={onClose}
        publishAssessment={publishAssessment}
      />
    </>
  );
};

export default PublishButton;
