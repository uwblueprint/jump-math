import { useMutation } from "@apollo/client";
import {
  Alert,
  AlertIcon,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalHeader,
  ModalCloseButton,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalOverlay,
  Radio,
  RadioGroup,
  HStack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import AdminConfirmationMessage from "./Admin/AdminConfirmationMessage";
import ModalFooterButtons from "./ModalFooterButtons";
import { PlusOutlineIcon } from "./icons";
import { ADMIN_PAGE } from "../../constants/Routes";
import { AddUserRequest, AddUserResponse } from "../../types/UserTypes";
import ADD_USER from "../../APIClients/mutations/UserMutations";
import GET_USERS_BY_ROLE from "../../APIClients/queries/UserQueries";

const AddAdminModal = (): React.ReactElement => {
  const history = useHistory();
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [hasJumpMathEmail, setHasJumpMathEmail] = useState<boolean | null>(
    null,
  );
  const [requiredFieldEmpty, setRequiredFieldEmpty] = useState(false);
  const [showRequestError, setShowRequestError] = useState(false);
  const [requestErrorMessage, setRequestErrorMessage] = useState<string | null>(
    null,
  );
  const [addAdmin] = useMutation<{ addAdmin: null }>(ADD_USER, {
    refetchQueries: [
      { query: GET_USERS_BY_ROLE, variables: { role: "Admin" } },
    ],
  });
  const [showRequestConfirmation, setShowRequestConfirmation] = useState(false);

  const isInvalidEmail =
    !!hasJumpMathEmail && email.length > 0 && !/@jumpmath.org$/.test(email);

  const isInvalidConfirmationEmail =
    confirmEmail.length > 0 && email !== confirmEmail;

  const onModalClose = () => {
    setFirstName("");
    setLastName("");
    setHasJumpMathEmail(null);
    setEmail("");
    setConfirmEmail("");
    setRequiredFieldEmpty(false);
    setShowRequestError(false);
    setRequestErrorMessage("");
    setShowRequestConfirmation(false);
    onClose();
  };

  const onSubmit = async () => {
    if (
      firstName.length === 0 ||
      lastName.length === 0 ||
      hasJumpMathEmail === null ||
      email.length === 0 ||
      confirmEmail.length === 0
    ) {
      setShowRequestError(true);
      setRequiredFieldEmpty(true);
      setRequestErrorMessage(
        "Please ensure all required components are filled out before submitting your application.",
      );
      return;
    }
    if (isInvalidEmail || isInvalidConfirmationEmail) {
      return;
    }
    console.log(
      `creating admin with first name: ${firstName}\nlast name: ${lastName}\nemail: ${email}`,
    );
    const password = Math.random().toString(36).substring(2, 10);
    const user: AddUserRequest = {
      firstName,
      lastName,
      email,
      password,
      role: "Admin",
    };
    await addAdmin({ variables: { user } })
      .then((data) => {
        console.log("response data: ", data);
        if (showRequestError) setShowRequestError(false);
        setShowRequestConfirmation(true);
      })
      .catch(() => {
        setRequestErrorMessage(
          "There is an error in processing your information. Please refresh the page and enter your information again. Contact Jump Math support for help.",
        );
        setShowRequestError(true);
      });
  };

  return (
    <>
      <Button
        rightIcon={<PlusOutlineIcon />}
        variant="primary"
        my={2}
        onClick={onOpen}
      >
        Add Admin
      </Button>
      <Modal isOpen={isOpen} onClose={onModalClose} size="xl" isCentered>
        <ModalOverlay />
        <ModalContent p={2} maxW="1297px">
          {showRequestConfirmation ? (
            <>
              <ModalBody>
                <AdminConfirmationMessage />
              </ModalBody>
              <ModalFooter>
                <Button
                  onClick={() => history.push(ADMIN_PAGE)}
                  mt={10}
                  variant="primary"
                >
                  Return to database
                </Button>
              </ModalFooter>
            </>
          ) : (
            <>
              <ModalHeader>
                <Text textStyle="subtitle1" color="grey.400">
                  Add Admin
                </Text>
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {showRequestError && (
                  <Alert status="error" mb={10}>
                    <AlertIcon />
                    {requestErrorMessage}
                  </Alert>
                )}
                <FormControl isRequired>
                  <FormLabel>Name of Admin</FormLabel>
                  <HStack direction="row" mt={6}>
                    <Input
                      type="text"
                      placeholder="First Name"
                      onChange={(e) => setFirstName(e.target.value)}
                      width="320px"
                      isInvalid={requiredFieldEmpty && firstName.length === 0}
                    />
                    <Input
                      type="text"
                      placeholder="Last Name"
                      onChange={(e) => setLastName(e.target.value)}
                      width="320px"
                      isInvalid={requiredFieldEmpty && lastName.length === 0}
                    />
                  </HStack>
                </FormControl>
                <FormControl isRequired as="fieldset" mt={8}>
                  <FormLabel>
                    Does the user already have a Jump Math email address?
                  </FormLabel>
                  <RadioGroup
                    onChange={(val) => setHasJumpMathEmail(val === "yes")}
                    mt={5}
                  >
                    <HStack spacing="24px">
                      <Radio
                        value="no"
                        mt={2}
                        size="lg"
                        isInvalid={
                          requiredFieldEmpty && hasJumpMathEmail === null
                        }
                      >
                        No
                      </Radio>
                      <Radio
                        value="yes"
                        size="lg"
                        isInvalid={
                          requiredFieldEmpty && hasJumpMathEmail === null
                        }
                      >
                        Yes
                      </Radio>
                    </HStack>
                  </RadioGroup>
                </FormControl>
                {hasJumpMathEmail !== null && (
                  <>
                    <FormControl isRequired mt={6} isInvalid={isInvalidEmail}>
                      <FormLabel>{`Please enter their ${
                        hasJumpMathEmail ? "Jump Math" : ""
                      } email address`}</FormLabel>
                      <Input
                        type="email"
                        placeholder="Email Address"
                        onChange={(e) => setEmail(e.target.value)}
                        width="320px"
                        mt={4}
                        isInvalid={requiredFieldEmpty && email.length === 0}
                      />
                      <FormErrorMessage>
                        The email does not end in @jumpmath.org. Please ensure
                        the email address is correct.
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isRequired
                      mt={6}
                      isInvalid={isInvalidConfirmationEmail}
                    >
                      <FormLabel>Confirm email address</FormLabel>
                      <Input
                        type="email"
                        placeholder="Email Address"
                        onChange={(e) => setConfirmEmail(e.target.value)}
                        width="320px"
                        mt={4}
                        isInvalid={
                          requiredFieldEmpty && confirmEmail.length === 0
                        }
                      />
                      <FormErrorMessage>
                        The email addresses do not currently match. Please check
                        them again.
                      </FormErrorMessage>
                    </FormControl>
                  </>
                )}
              </ModalBody>
              <ModalFooter>
                <ModalFooterButtons
                  onDiscard={onModalClose}
                  onSave={onSubmit}
                />
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddAdminModal;
