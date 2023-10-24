import React, { type ReactElement } from "react";
import { useHistory } from "react-router-dom";
import { useLazyQuery, useMutation } from "@apollo/client";
import { Divider, useDisclosure, VStack } from "@chakra-ui/react";

import { DELETE_TEST_SESSION } from "../../../APIClients/mutations/TestSessionMutations";
import { GET_TEST } from "../../../APIClients/queries/TestQueries";
import { GET_TEST_SESSIONS_BY_TEACHER_ID } from "../../../APIClients/queries/TestSessionQueries";
import type { TestResponse } from "../../../APIClients/types/TestClientTypes";
import * as Routes from "../../../constants/Routes";
import { TestSessionStatus } from "../../../types/TestSessionTypes";
import { getQueryName } from "../../../utils/GeneralUtils";
import DeleteAssessmentModal from "../../admin/assessment-status/EditStatusModals/DeleteAssessmentModal";
import useToast from "../../common/info/useToast";
import Popover from "../../common/popover/Popover";
import PopoverButton from "../../common/popover/PopoverButton";

import type { FormattedAssessmentData } from "./useAssessmentDataQuery";

type TestSessionPopoverProps = {
  session: FormattedAssessmentData;
};

const TestSessionListItemPopover = ({
  session,
}: TestSessionPopoverProps): ReactElement => {
  const {
    isOpen: isDeleteModalOpen,
    onOpen: openDeleteModal,
    onClose: onDeleteModalClose,
  } = useDisclosure();
  const history = useHistory();
  const { showToast } = useToast();

  const [deleteTestSession] = useMutation(DELETE_TEST_SESSION, {
    variables: { id: session.testSessionId },
    refetchQueries: [getQueryName(GET_TEST_SESSIONS_BY_TEACHER_ID)],
  });

  const onEditTestSession = () => {
    history.push(Routes.DISTRIBUTE_ASSESSMENT_PAGE, session);
  };

  const [previewTest] = useLazyQuery<{
    test: TestResponse;
  }>(GET_TEST);

  const onPreviewTest = async () => {
    const { data } = await previewTest({
      variables: { id: session.testId },
    });
    if (data) {
      history.push({
        pathname: Routes.TEACHER_ASSESSMENT_PREVIEW_PAGE({
          assessmentId: session.testId,
        }),
        state: data.test,
      });
    } else {
      showToast({
        message:
          "This assessment cannot be previewed at this time. Please try again.",
        status: "error",
      });
    }
  };

  return (
    <Popover>
      <VStack divider={<Divider />} spacing={0}>
        <PopoverButton name="Edit" onClick={onEditTestSession} />
        {session.status !== TestSessionStatus.PAST && (
          <>
            <PopoverButton name="Delete" onClick={openDeleteModal} />
            <Divider />
            <PopoverButton name="Preview" onClick={onPreviewTest} />
          </>
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
