import React from "react";
import { useMutation } from "@apollo/client";
import {
  Button,
  Divider,
  Modal,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

import { REMOVE_USER } from "../../APIClients/mutations/UserMutations";
import {
  GET_ALL_TEACHERS,
  GET_USERS_BY_ROLE,
} from "../../APIClients/queries/UserQueries";
import { CloseOutlineIcon } from "../../assets/icons";
import ModalText from "../common/ModalText";

import RemoveUserConfirmationModal from "./RemoveUserConfirmationModal";
import RemoveUserErrorModal from "./RemoveUserErrorModal";

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
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent alignItems="center" maxW="600px" p={2}>
          {showError && <RemoveUserErrorModal />}
          {showConfirmation && <RemoveUserConfirmationModal />}
          {!showConfirmation && !showError && (
            <>
              <ModalText
                body={["NOTE:", "This user is an admin."]}
                header={`Are you sure you want to remove ${name}?`}
              />
              <Divider style={{ marginTop: "1.5em" }} />
              <ModalFooter my={0.5}>
                <Button
                  mr={2}
                  onClick={() => {
                    onCloseParent();
                    onClose();
                  }}
                  variant="secondary"
                >
                  Cancel
                </Button>
                <Button onClick={onRemoveUserClick} variant="primary">
                  Confirm
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
