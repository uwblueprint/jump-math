import React, { useContext } from "react";
import { useMutation } from "@apollo/client";
import { Divider, useDisclosure, VStack } from "@chakra-ui/react";

import { DELETE_TEST_SESSION } from "../../APIClients/mutations/TestSessionMutations";
import { GET_TEST_SESSIONS_BY_TEACHER_ID } from "../../APIClients/queries/TestSessionQueries";
import AuthContext from "../../contexts/AuthContext";
import Popover from "../common/Popover";
import PopoverButton from "../common/PopoverButton";
import Toast from "../common/Toast";

type TestSessionPopoverProps = {
  testSessionId: string;
};

const TestSessionListItemPopover = ({
  testSessionId,
}: TestSessionPopoverProps): React.ReactElement => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
      onClose();
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
    <Popover isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
      <VStack divider={<Divider borderColor="grey.200" />} spacing="0em">
        <PopoverButton name="Edit" onClick={() => {}} />
        <PopoverButton name="Delete" onClick={deleteTestSession} />
      </VStack>
    </Popover>
  );
};

export default TestSessionListItemPopover;
