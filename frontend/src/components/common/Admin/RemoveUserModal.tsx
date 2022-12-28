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
import React from "react";
import { CloseOutlineIcon } from "../icons";
import ModalText from "./ModalText";
import RemoveUserConfirmationModal from "./RemoveUserConfirmationModal";
import RemoveUserErrorModal from "./RemoveUserErrorModal";
import GET_USERS_BY_ROLE from "../../../APIClients/queries/UserQueries";
import { REMOVE_USER } from "../../../APIClients/mutations/UserMutations";

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
        rightIcon={<CloseOutlineIcon />}
        variant="primary"
        my={2}
        onClick={onOpen}
      >
        Remove User
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent alignItems="center" p={2} maxW="600px">
          {showError && <RemoveUserErrorModal />}
          {showConfirmation && <RemoveUserConfirmationModal />}
          {!showConfirmation && !showError && (
            <>
              <ModalText
                header={`Are you sure you want to remove ${name}?`}
                body={["NOTE:", "This user is an admin."]}
              />
              <Divider style={{ marginTop: "1.5em" }} />
              <ModalFooter my={0.5}>
                <Button
                  variant="secondary"
                  mr={2}
                  onClick={() => {
                    onCloseParent();
                    onClose();
                  }}
                >
                  Cancel
                </Button>
                <Button variant="primary" onClick={onRemoveUserClick}>
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
