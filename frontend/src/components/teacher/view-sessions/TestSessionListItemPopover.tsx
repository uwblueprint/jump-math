import React, { type ReactElement } from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { Divider, useDisclosure, VStack } from "@chakra-ui/react";

import { DELETE_TEST_SESSION } from "../../../APIClients/mutations/TestSessionMutations";
import { GET_TEST_SESSIONS_BY_TEACHER_ID } from "../../../APIClients/queries/TestSessionQueries";
import type { TestSessionEditingData } from "../../../APIClients/types/TestSessionClientTypes";
import * as Routes from "../../../constants/Routes";
import { TestSessionStatus } from "../../../types/TestSessionTypes";
import { getQueryName } from "../../../utils/GeneralUtils";
import DeleteAssessmentModal from "../../admin/assessment-status/EditStatusModals/DeleteAssessmentModal";
import Popover from "../../common/popover/Popover";
import PopoverButton from "../../common/popover/PopoverButton";

type TestSessionPopoverProps = {
  testSessionEditingData: TestSessionEditingData;
};

const TestSessionListItemPopover = ({
  testSessionEditingData,
}: TestSessionPopoverProps): ReactElement => {
  const {
    isOpen: isDeleteModalOpen,
    onOpen: openDeleteModal,
    onClose: onDeleteModalClose,
  } = useDisclosure();

  const history = useHistory();

  const [deleteTestSession] = useMutation(DELETE_TEST_SESSION, {
    variables: { id: testSessionEditingData.testSessionId },
    refetchQueries: [getQueryName(GET_TEST_SESSIONS_BY_TEACHER_ID)],
  });

  const onEditTestSession = () => {
    history.push(Routes.DISTRIBUTE_ASSESSMENT_PAGE, testSessionEditingData);
  };

  return (
    <Popover>
      <VStack divider={<Divider />} spacing={0}>
        <PopoverButton name="Edit" onClick={onEditTestSession} />
        {testSessionEditingData.status === TestSessionStatus.UPCOMING && (
          <PopoverButton name="Delete" onClick={openDeleteModal} />
        )}
      </VStack>
      <DeleteAssessmentModal
        deleteAssessment={deleteTestSession}
        isOpen={isDeleteModalOpen}
        onClose={onDeleteModalClose}
      />
    </Popover>
  );
};

export default TestSessionListItemPopover;
