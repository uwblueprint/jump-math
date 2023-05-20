import React, { useContext } from "react";
import { useMutation } from "@apollo/client";
import { Divider, useDisclosure, VStack } from "@chakra-ui/react";

import { DELETE_TEST_SESSION } from "../../APIClients/mutations/TestSessionMutations";
import { GET_TEST_SESSIONS_BY_TEACHER_ID } from "../../APIClients/queries/TestSessionQueries";
import AuthContext from "../../contexts/AuthContext";
import type { TestSessionStatus } from "../../types/TestSessionTypes";
import DeleteModal from "../assessments/assessment-status/EditStatusModals/DeleteModal";
import Popover from "../common/Popover";
import PopoverButton from "../common/PopoverButton";
import Toast from "../common/Toast";

type TestSessionPopoverProps = {
  status: TestSessionStatus;
  testSessionId: string;
};

const TestSessionListItemPopover = ({
  status,
  testSessionId,
}: TestSessionPopoverProps): React.ReactElement => {
  const {
    isOpen: isPopoverOpen,
    onOpen: onPopoverOpen,
    onClose: onPopoverClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteModalOpen,
    onOpen: openDeleteModal,
    onClose: onDeleteModalClose,
  } = useDisclosure();

  const { showToast } = Toast();

  const { authenticatedUser } = useContext(AuthContext);
  const { id: teacherId } = authenticatedUser ?? {};

  const [deleteTestSessionMutation] = useMutation(DELETE_TEST_SESSION, {
    variables: { id: testSessionId },
    refetchQueries: [
      { query: GET_TEST_SESSIONS_BY_TEACHER_ID, variables: { teacherId } },
    ],
  });

  const deleteTestSession = async () => {
    try {
      await deleteTestSessionMutation();
      onPopoverClose();
      showToast({
        message: "Assessment deleted.",
        status: "success",
      });
    } catch (e) {
      showToast({
        message: "Failed to delete the assessment. Please try again later.",
        status: "error",
      });
    }
  };

  return (
    <Popover
      isOpen={isPopoverOpen}
      onClose={onPopoverClose}
      onOpen={onPopoverOpen}
    >
      <VStack spacing={0}>
        {status !== "past" && (
          <>
            <PopoverButton name="Edit" onClick={() => {}} />
            <Divider borderColor="grey.200" />
          </>
        )}
        <PopoverButton name="Delete" onClick={openDeleteModal} />
        <DeleteModal
          deleteAssessment={deleteTestSession}
          isOpen={isDeleteModalOpen}
          onClose={onDeleteModalClose}
        />
      </VStack>
    </Popover>
  );
};

export default TestSessionListItemPopover;
