import React from "react";
import { useMutation } from "@apollo/client";
import { useDisclosure } from "@chakra-ui/react";

import { UNARCHIVE_TEST } from "../../../../APIClients/mutations/TestMutations";
import { GET_ALL_TESTS } from "../../../../APIClients/queries/TestQueries";
import { getQueryName } from "../../../../utils/GeneralUtils";
import PopoverButton from "../../../common/popover/PopoverButton";
import UnarchiveAssessmentModal from "../EditStatusModals/UnarchiveAssessmentModal";

interface UnarchiveButtonProps {
  assessmentId: string;
}

const UnarchiveButton = ({
  assessmentId,
}: UnarchiveButtonProps): React.ReactElement => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const [unarchiveAssessment] = useMutation<{
    unarchiveAssessment: string;
  }>(UNARCHIVE_TEST, {
    variables: { id: assessmentId },
    refetchQueries: [getQueryName(GET_ALL_TESTS)],
  });

  return (
    <>
      <PopoverButton name="Unarchive" onClick={onOpen} />
      <UnarchiveAssessmentModal
        isOpen={isOpen}
        onClose={onClose}
        unarchiveAssessment={unarchiveAssessment}
      />
    </>
  );
};

export default UnarchiveButton;
