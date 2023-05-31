import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Text,
} from "@chakra-ui/react";

import { ADD_USER } from "../../../APIClients/mutations/UserMutations";
import { GET_USERS_BY_ROLE } from "../../../APIClients/queries/UserQueries";
import type {
  UserRequest,
  UserResponse,
} from "../../../APIClients/types/UserClientTypes";
import { randomNumber } from "../../../utils/GeneralUtils";
import ErrorToast from "../../common/ErrorToast";
import AddAdminConfirmationMessage from "../../common/messages/AddAdminConfirmationMessage";
import ModalFooterButtons from "../../common/ModalFooterButtons";

type AddAdminModalProps = {
  onClose: () => void;
  isOpen: boolean;
};

const AddAdminModal = ({
  onClose,
  isOpen,
}: AddAdminModalProps): React.ReactElement => {
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
  const [addAdmin] = useMutation<{ addAdmin: UserResponse }>(ADD_USER, {
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

    const user: UserRequest = {
      firstName,
      lastName,
      email,
      password: randomNumber().toString(),
      role: "Admin",
    };
    await addAdmin({ variables: { user } })
      .then(() => {
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
    <Modal isCentered isOpen={isOpen} onClose={onModalClose} size="3xl">
      <ModalOverlay />
      <ModalContent borderRadius="12px" maxW="80vw" p={2}>
        {showRequestConfirmation ? (
          <>
            <ModalBody>
              <AddAdminConfirmationMessage />
            </ModalBody>
            <ModalFooter>
              <Button
                mt={10}
                onClick={() => window.location.reload()}
                variant="primary"
              >
                Return to database
              </Button>
            </ModalFooter>
          </>
        ) : (
          <>
            <ModalHeader>
              <Text color="grey.400" textStyle="subtitle1">
                Add Admin
              </Text>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {showRequestError && (
                <ErrorToast errorMessage={requestErrorMessage as string} />
              )}
              <FormControl isRequired marginTop={showRequestError ? "10" : "0"}>
                <FormLabel color="grey.300">Name of Admin</FormLabel>
                <HStack direction="row" mt={6}>
                  <Input
                    isInvalid={requiredFieldEmpty && firstName.length === 0}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                    type="text"
                    width="320px"
                  />
                  <Input
                    isInvalid={requiredFieldEmpty && lastName.length === 0}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                    type="text"
                    width="320px"
                  />
                </HStack>
              </FormControl>
              <FormControl as="fieldset" isRequired mt={8}>
                <FormLabel color="grey.300">
                  Does the user already have a Jump Math email address?
                </FormLabel>
                <RadioGroup
                  color="grey.300"
                  mt={5}
                  onChange={(val) => setHasJumpMathEmail(val === "yes")}
                >
                  <HStack alignItems="flex-start" spacing="24px">
                    <Radio
                      isInvalid={
                        requiredFieldEmpty && hasJumpMathEmail === null
                      }
                      size="lg"
                      value="no"
                    >
                      No
                    </Radio>
                    <Radio
                      isInvalid={
                        requiredFieldEmpty && hasJumpMathEmail === null
                      }
                      size="lg"
                      value="yes"
                    >
                      Yes
                    </Radio>
                  </HStack>
                </RadioGroup>
              </FormControl>
              {hasJumpMathEmail !== null && (
                <>
                  <FormControl isInvalid={isInvalidEmail} isRequired mt={6}>
                    <FormLabel color="grey.300">{`Please enter their ${
                      hasJumpMathEmail ? "Jump Math" : ""
                    } email address`}</FormLabel>
                    <Input
                      isInvalid={requiredFieldEmpty && email.length === 0}
                      mt={4}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email Address"
                      type="email"
                      width="320px"
                    />
                    <FormErrorMessage>
                      The email does not end in @jumpmath.org. Please ensure the
                      email address is correct.
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={isInvalidConfirmationEmail}
                    isRequired
                    mt={6}
                  >
                    <FormLabel color="grey.300">
                      Confirm email address
                    </FormLabel>
                    <Input
                      isInvalid={
                        requiredFieldEmpty && confirmEmail.length === 0
                      }
                      mt={4}
                      onChange={(e) => setConfirmEmail(e.target.value)}
                      placeholder="Email Address"
                      type="email"
                      width="320px"
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
              <ModalFooterButtons onDiscard={onModalClose} onSave={onSubmit} />
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AddAdminModal;
