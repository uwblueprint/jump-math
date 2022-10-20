import { gql, useMutation, useQuery } from "@apollo/client";
import {
  Button,
  Divider,
  Modal,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import AuthContext from "../../../contexts/AuthContext";
import { CloseOutlineIcon } from "../icons";
import ModalText from "./ModalText";
import RemoveUserConfirmationModal from "./RemoveUserConfirmationModal";
import RemoveUserErrorModal from "./RemoveUserErrorModal";
import { Role } from "../../../types/AuthTypes";

interface RemoveUserModalProps {
  name: string;
  email: string;
  onCloseParent: () => void;
}

interface UserGQLObject {
  userByEmail: { id: string };
}

const GET_USER = gql`
  query RemoveUserModal_UserByEmail($email: String!) {
    userByEmail(email: $email) {
      id
    }
  }
`;

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
  const [removeUser, { error }] = useMutation<{ removeUser: null }>(
    REMOVE_USER,
  );
  const [user, setUser] = React.useState<string | null>("");
  const { authenticatedUser } = useContext(AuthContext);

  useQuery(GET_USER, {
    variables: { email },
    fetchPolicy: "cache-and-network",
    onCompleted: (data: UserGQLObject) => setUser(data.userByEmail.id),
  });

  const onRemoveUserClick = async () => {
    if (user && authenticatedUser?.role === Role.ADMIN) {
      await removeUser({ variables: { email } });
      if (error) {
        setShowError(true);
      } else {
        setShowConfirmation(true);
      }
    } else {
      setShowError(true);
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
