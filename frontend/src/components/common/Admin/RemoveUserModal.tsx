import { gql, useMutation } from "@apollo/client";
import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { CloseOutlineIcon } from "../icons";
import ModalText from "./ModalText";
import RemoveUserConfirmationModal from "./RemoveUserConfirmationModal";
import RemoveUserErrorModal from "./RemoveUserErrorModal";

interface RemoveUserModalProps {
  name: string;
  email: string;
  onCloseParent: () => void;
}

const REMOVE_USER = gql`
  mutation RemoveUserModal_DeleteUserByEmail($email: String!) {
    deleteUserByEmail(email: $email)
  }
`;

const RemoveUserModal = ({
  name,
  email,
  onCloseParent,
}: RemoveUserModalProps): React.ReactElement => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [showConfirmation, setShowConfirmation] = React.useState(false);
  const [showError, setShowError] = React.useState(false);
  const [removeUser, { loading, error }] = useMutation<{ removeUser: null }>(
    REMOVE_USER,
  );

  const onRemoveUserClick = async () => {
    await removeUser({ variables: { email } });
    if (error) {
      setShowError(true);
    } else {
      setShowConfirmation(true);
    }
  };

  return (
    <>
      <Button
        rightIcon={<CloseOutlineIcon />}
        variant="primary"
        my={2}
        onClick={onOpen}
      >
        Remove User
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent alignItems="center" p={2}>
          {showError && <RemoveUserErrorModal />}
          {showConfirmation && <RemoveUserConfirmationModal />}
          {loading && <ModalText body={["Loading..."]} />}
          {!loading && !showConfirmation && !showError && (
            <>
              <ModalText
                header={`Are you sure you want to remove ${name}?`}
                body={["NOTE", "This user is an admin."]}
              />
              <ModalFooter my={3}>
                <Button
                  variant="primary"
                  mr={2}
                  bg="blue.200"
                  opacity="0.6"
                  onClick={() => {
                    onCloseParent();
                    onClose();
                  }}
                >
                  Cancel
                </Button>
                <Button
                  rightIcon={<CloseOutlineIcon />}
                  variant="primary"
                  onClick={onRemoveUserClick}
                >
                  Remove User
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default RemoveUserModal;
