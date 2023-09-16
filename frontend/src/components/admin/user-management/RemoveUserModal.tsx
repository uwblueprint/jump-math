import React from "react";
import { useMutation } from "@apollo/client";
import { useDisclosure } from "@chakra-ui/react";

import { REMOVE_USER } from "../../../APIClients/mutations/UserMutations";
import {
  GET_ALL_TEACHERS,
  GET_USERS_BY_ROLE,
} from "../../../APIClients/queries/UserQueries";
import { getQueryName } from "../../../utils/GeneralUtils";
import Modal from "../../common/modal/Modal";
import PopoverButton from "../../common/popover/PopoverButton";

interface RemoveUserModalProps {
  name: string;
  email: string;
}

const RemoveUserModal = ({
  name,
  email,
}: RemoveUserModalProps): React.ReactElement => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [removeUser] = useMutation<{ removeUser: null }>(REMOVE_USER, {
    variables: { email },
    refetchQueries: [
      getQueryName(GET_USERS_BY_ROLE),
      getQueryName(GET_ALL_TEACHERS),
    ],
  });

  return (
    <>
      <PopoverButton name="Remove" onClick={onOpen} />
      <Modal
        body={`Are you sure you want to remove ${name}?`}
        header="Remove User"
        isOpen={isOpen}
        messageOnError="Failed to remove the user. Please try again."
        messageOnSuccess="User removed."
        onClose={onClose}
        onSubmit={removeUser}
      />
    </>
  );
};

export default RemoveUserModal;
