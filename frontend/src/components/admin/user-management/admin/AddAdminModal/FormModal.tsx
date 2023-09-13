import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";

import { ADD_USER } from "../../../../../APIClients/mutations/UserMutations";
import { GET_USERS_BY_ROLE } from "../../../../../APIClients/queries/UserQueries";
import type {
  UserRequest,
  UserResponse,
} from "../../../../../APIClients/types/UserClientTypes";
import {
  FormValidationError,
  getQueryName,
  randomNumber,
} from "../../../../../utils/GeneralUtils";
import Modal from "../../../../common/modal/Modal";

type FormModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
};

const FormModal = ({ isOpen, onClose, onSubmit }: FormModalProps) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [hasJumpMathEmail, setHasJumpMathEmail] = useState<boolean | null>(
    null,
  );
  const [requiredFieldEmpty, setRequiredFieldEmpty] = useState(false);

  const isInvalidEmail =
    !!hasJumpMathEmail && email.length > 0 && !/@jumpmath.org$/.test(email);

  const isInvalidConfirmationEmail =
    confirmEmail.length > 0 && email !== confirmEmail;

  const [addAdmin] = useMutation<{ addAdmin: UserResponse }>(ADD_USER, {
    refetchQueries: [getQueryName(GET_USERS_BY_ROLE)],
  });

  const handleSubmit = async () => {
    if (
      firstName.length === 0 ||
      lastName.length === 0 ||
      hasJumpMathEmail === null ||
      email.length === 0 ||
      confirmEmail.length === 0
    ) {
      setRequiredFieldEmpty(true);
      throw new FormValidationError(
        "Please ensure all required components are filled out",
      );
    }

    if (isInvalidEmail || isInvalidConfirmationEmail) {
      throw new FormValidationError("Please ensure all emails are valid");
    }

    const user: UserRequest = {
      firstName,
      lastName,
      email,
      password: randomNumber().toString(),
      role: "Admin",
    };
    await addAdmin({ variables: { user } });

    onSubmit();
  };

  const handleClose = () => {
    setFirstName("");
    setLastName("");
    setHasJumpMathEmail(null);
    setEmail("");
    setConfirmEmail("");
    setRequiredFieldEmpty(false);
    onClose();
  };

  return (
    <Modal
      cancelButtonText="Discard"
      header="Add Admin"
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
      showDefaultToasts={false}
      submitButtonText="Save"
      variant="large"
    >
      <FormControl isRequired>
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
              isInvalid={requiredFieldEmpty && hasJumpMathEmail === null}
              size="lg"
              value="no"
            >
              No
            </Radio>
            <Radio
              isInvalid={requiredFieldEmpty && hasJumpMathEmail === null}
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
              The email does not end in @jumpmath.org. Please ensure the email
              address is correct.
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={isInvalidConfirmationEmail} isRequired mt={6}>
            <FormLabel color="grey.300">Confirm email address</FormLabel>
            <Input
              isInvalid={requiredFieldEmpty && confirmEmail.length === 0}
              mt={4}
              onChange={(e) => setConfirmEmail(e.target.value)}
              placeholder="Email Address"
              type="email"
              width="320px"
            />
            <FormErrorMessage>
              The email addresses do not currently match. Please check them
              again.
            </FormErrorMessage>
          </FormControl>
        </>
      )}
    </Modal>
  );
};

export default FormModal;
