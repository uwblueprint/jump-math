import React from "react";
import { useMutation } from "@apollo/client";
import { useDisclosure } from "@chakra-ui/react";

import { DUPLICATE_TEST } from "../../../../APIClients/mutations/TestMutations";
import { GET_ALL_TESTS } from "../../../../APIClients/queries/TestQueries";
import { getQueryName } from "../../../../utils/GeneralUtils";
import PopoverButton from "../../../common/popover/PopoverButton";
import DuplicateAssessmentModal from "../EditStatusModals/DuplicateAssessmentModal";

interface DuplicateButtonProps {
  assessmentId: string;
}

const DuplicateButton = ({
  assessmentId,
}: DuplicateButtonProps): React.ReactElement => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const [duplicateAssessment] = useMutation<{
    duplicateAssessment: string;
  }>(DUPLICATE_TEST, {
    variables: { id: assessmentId },
    refetchQueries: [getQueryName(GET_ALL_TESTS)],
  });

  return (
    <>
      <PopoverButton name="Duplicate" onClick={onOpen} />
      <DuplicateAssessmentModal
        duplicateAssessment={duplicateAssessment}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};

export default DuplicateButton;
