import React from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { Button, useDisclosure } from "@chakra-ui/react";

import { REMOVE_USER } from "../../APIClients/mutations/UserMutations";
import {
  GET_ALL_TEACHERS,
  GET_USERS_BY_ROLE,
} from "../../APIClients/queries/UserQueries";
import { CloseOutlineIcon } from "../../assets/icons";
import { USER_DATABASE } from "../../constants/Routes";
import Modal from "../common/Modal";

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
  const history = useHistory();
  const navigateTo = () => history.push(USER_DATABASE);

  const { onOpen, onClose, isOpen } = useDisclosure();
  const [showConfirmation, setShowConfirmation] = React.useState(false);
  const [showError, setShowError] = React.useState(false);
  const [removeUser, { error }] = useMutation<{ removeUser: null }>(
    REMOVE_USER,
    {
      refetchQueries: [
        { query: GET_USERS_BY_ROLE, variables: { role: "Admin" } },
        { query: GET_ALL_TEACHERS },
      ],
    },
  );

  const onRemoveUserClick = async () => {
    await removeUser({ variables: { email } });
    if (error) {
      setShowError(true);
    } else {
      setShowConfirmation(true);
    }
  };

  const renderComponent = () => {
    if (showConfirmation) {
      return (
        <Modal
          body="The data has been removed securely."
          header="The user has been removed from the Jump Math Database"
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={navigateTo}
          submitButtonText="Return to Database"
        />
      );
    }
    if (showError) {
      return (
        <Modal
          header="Unable to remove user at this moment. Please try again."
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={navigateTo}
          submitButtonText="Return to Database"
        />
      );
    }

    return (
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
    );
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
      {renderComponent()}
    </>
  );
};

export default RemoveUserModal;
