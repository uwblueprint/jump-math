import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { Divider, useDisclosure, VStack } from "@chakra-ui/react";

import { DELETE_TEST_SESSION } from "../../../APIClients/mutations/TestSessionMutations";
import { GET_TEST_SESSIONS_BY_TEACHER_ID } from "../../../APIClients/queries/TestSessionQueries";
import type { TestSessionEditingData } from "../../../APIClients/types/TestSessionClientTypes";
import * as Routes from "../../../constants/Routes";
import AuthContext from "../../../contexts/AuthContext";
import { TestSessionStatus } from "../../../types/TestSessionTypes";
import DeleteModal from "../../admin/assessment-status/EditStatusModals/DeleteModal";
import useToast from "../../common/info/useToast";
import Popover from "../../common/popover/Popover";
import PopoverButton from "../../common/popover/PopoverButton";

type TestSessionPopoverProps = {
  testSessionEditingData: TestSessionEditingData;
};

const TestSessionListItemPopover = ({
  testSessionEditingData,
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
    variables: { id: testSessionEditingData.testSessionId },
    refetchQueries: [
      { query: GET_TEST_SESSIONS_BY_TEACHER_ID, variables: { teacherId } },
    ],
  });

  const onEditTestSession = () => {
    history.push(Routes.DISTRIBUTE_ASSESSMENT_PAGE, testSessionEditingData);
  };

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
      <VStack divider={<Divider />} spacing={0}>
        <PopoverButton name="Edit" onClick={onEditTestSession} />
        {testSessionEditingData.status === TestSessionStatus.UPCOMING && (
          <PopoverButton name="Delete" onClick={openDeleteModal} />
        )}
      </VStack>
      <DeleteModal
        deleteAssessment={deleteTestSession}
        isOpen={isDeleteModalOpen}
        onClose={onDeleteModalClose}
      />
    </Popover>
  );
};

export default TestSessionListItemPopover;
