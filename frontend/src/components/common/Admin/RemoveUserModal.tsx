import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useHistory } from "react-router-dom";
import { ADMIN_PAGE } from "../../../constants/Routes";
import { CloseOutlineIcon } from "../icons";
import ModalText from "./ModalText";

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
  const [removed, setRemoved] = React.useState(false);

  const history = useHistory();
  const navigateTo = () => history.push(ADMIN_PAGE);

  const removeUser = () => {
    console.log("Remove user with email: ", email);
    setRemoved(true);
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
          {removed ? (
            <>
              <ModalText
                header="The user has been removed from the Jump Math Database"
                body={["The data has been removed securely."]}
              />
              <ModalFooter my={3}>
                <Button variant="primary" mr={2} onClick={navigateTo}>
                  Return to Database
                </Button>
              </ModalFooter>
            </>
          ) : (
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
                  onClick={removeUser}
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
