import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { Divider, useDisclosure, VStack } from "@chakra-ui/react";

import { DELETE_TEST_SESSION } from "../../../APIClients/mutations/TestSessionMutations";
import { GET_TEST_SESSIONS_BY_TEACHER_ID } from "../../../APIClients/queries/TestSessionQueries";
import * as Routes from "../../../constants/Routes";
import AuthContext from "../../../contexts/AuthContext";
import { TestSessionStatus } from "../../../types/TestSessionTypes";
import DeleteModal from "../../admin/assessment-status/EditStatusModals/DeleteModal";
import useToast from "../../common/info/useToast";
import Popover from "../../common/popover/Popover";
import PopoverButton from "../../common/popover/PopoverButton";

type TestSessionPopoverProps = {
  status: TestSessionStatus;
  testSessionId: string;
  testId: string;
  testName: string;
  classId: string;
  className?: string;
  startDate: Date;
  endDate: Date;
  notes?: string;
};

const TestSessionListItemPopover = ({
  status,
  testSessionId,
  testId,
  testName,
  classId,
  className,
  startDate,
  endDate,
  notes,
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

  const { showToast } = useToast();
  const history = useHistory();

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

  const onEditTestSession = () => {
    history.push(Routes.DISTRIBUTE_ASSESSMENT_PAGE, {
      testSessionId,
      testId,
      testName,
      classId,
      className,
      startDate,
      endDate,
      notes,
    });
  };

  return (
    <Popover
      isOpen={isPopoverOpen}
      onClose={onPopoverClose}
      onOpen={onPopoverOpen}
    >
      <VStack spacing={0}>
        {status !== TestSessionStatus.PAST && (
          <>
            <PopoverButton name="Edit" onClick={onEditTestSession} />
            <Divider />
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
