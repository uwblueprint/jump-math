import {
  Button,
  Text,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { CloseOutlineIcon } from "../icons";

interface RemoveUserModalProps {
  name: string;
  email: string;
}

const RemoveUserModal = ({
  name,
  email,
}: RemoveUserModalProps): React.ReactElement => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [removeUser, setRemoveUser] = React.useState(false);

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
          {removeUser ? (
            <>
              <>
                <ModalHeader>
                  <Text textStyle="subtitle1" align="center" color="grey.400">
                    The user has been removed from the Jump Math Database
                  </Text>
                </ModalHeader>
                <ModalBody>
                  <Text textStyle="paragraph" align="center" color="grey.300">
                    The data has been removed securely.
                  </Text>
                </ModalBody>
                <ModalFooter my={3}>
                  <Button variant="primary" mr={2} onClick={onClose}>
                    Return to Database
                  </Button>
                </ModalFooter>
              </>
            </>
          ) : (
            <>
              <ModalHeader>
                <Text textStyle="subtitle1" align="center" color="grey.400">
                  Are you sure you want to remove {name}?
                </Text>
              </ModalHeader>
              <ModalBody>
                <Text textStyle="paragraph" align="center" color="grey.300">
                  NOTE
                  <br />
                  This user is an admin.
                </Text>
              </ModalBody>
              <ModalFooter my={3}>
                <Button variant="primary" mr={2} isActive onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  rightIcon={<CloseOutlineIcon />}
                  variant="primary"
                  onClick={() => {
                    console.log("Remove user with email: ", email);
                    setRemoveUser(true);
                  }}
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
