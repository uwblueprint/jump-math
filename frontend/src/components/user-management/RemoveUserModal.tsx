import React from "react";
import { useMutation } from "@apollo/client";
import { Button, useDisclosure } from "@chakra-ui/react";

import { REMOVE_USER } from "../../APIClients/mutations/UserMutations";
import {
  GET_ALL_TEACHERS,
  GET_USERS_BY_ROLE,
} from "../../APIClients/queries/UserQueries";
import { CloseOutlineIcon } from "../../assets/icons";
import Modal from "../common/Modal";
import Toast from "../common/Toast";

interface RemoveUserModalProps {
  name: string;
  email: string;
  onCloseParent: () => void;
}

const RemoveUserModal = ({
  name,
  email,
  onCloseParent,
}: RemoveUserModalProps): React.ReactElement => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [removeUser, { error }] = useMutation<{ removeUser: null }>(
    REMOVE_USER,
    {
      refetchQueries: [
        { query: GET_USERS_BY_ROLE, variables: { role: "Admin" } },
        { query: GET_ALL_TEACHERS },
      ],
    },
  );

  const { showToast } = Toast();

  const onRemoveUserClick = async () => {
    await removeUser({ variables: { email } });
    if (error) {
      showToast({
        message: "Unable to remove user. Please try again.",
        status: "error",
      });
    } else {
      showToast({
        message: "This user has been removed.",
        status: "success",
      });
    }
    onClose();
  };

  return (
    <>
      <Button
        my={2}
        onClick={onOpen}
        rightIcon={<CloseOutlineIcon />}
        variant="primary"
      >
        Remove User
      </Button>
      <Modal
        body="NOTE: This user is an admin."
        header={`Are you sure you want to remove ${name}?`}
        isOpen={isOpen}
        onCancel={() => {
          onCloseParent();
          onClose();
        }}
        onClose={onClose}
        onSubmit={onRemoveUserClick}
      />
    </>
  );
};

export default RemoveUserModal;
