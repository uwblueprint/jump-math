import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormErrorMessage,
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
import EmailInput from "./Form/EmailInput";
import InputError from "./Form/InputError";
import InputLabel from "./Form/InputLabel";
import TextInput from "./Form/TextInput";
import ModalFooterButtons from "./ModalFooterButtons";
import { PlusOutlineIcon } from "./icons";

const AddAdminModal = (): React.ReactElement => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [hasJumpMathEmail, setHasJumpMathEmail] = useState<boolean | null>(
    null,
  );

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
    onClose();
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(
      `creating admin with first name: ${firstName}\nlast name: ${lastName}\nemail: ${email}`,
    );
    onModalClose();
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
      <Modal isOpen={isOpen} onClose={onModalClose} size="6xl" isCentered>
        <ModalOverlay />
        <ModalContent p={2}>
          <form onSubmit={onSubmit}>
            <ModalHeader>
              <Text textStyle="subtitle1" color="grey.400">
                Add Admin
              </Text>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl isRequired>
                <InputLabel>Name of Admin</InputLabel>
                <HStack direction="row" mt={6}>
                  <TextInput
                    placeholder="First Name"
                    handleChange={setFirstName}
                  />
                  <TextInput
                    placeholder="Last Name"
                    handleChange={setLastName}
                  />
                </HStack>
              </FormControl>
              <FormControl isRequired as="fieldset" mt={8}>
                <InputLabel>
                  Does the user already have a Jump Math email address?
                </InputLabel>
                <RadioGroup
                  onChange={(val) => setHasJumpMathEmail(val === "yes")}
                  mt={5}
                >
                  <HStack spacing="24px">
                    <Radio value="no" mt={2} size="lg">
                      No
                    </Radio>
                    <Radio value="yes" size="lg">
                      Yes
                    </Radio>
                  </HStack>
                </RadioGroup>
              </FormControl>
              {hasJumpMathEmail !== null && (
                <>
                  <FormControl isRequired mt={6} isInvalid={isInvalidEmail}>
                    <InputLabel>{`Please enter their ${
                      hasJumpMathEmail ? "Jump Math" : ""
                    } email address`}</InputLabel>
                    <EmailInput
                      placeholder="Email Address"
                      handleChange={setEmail}
                      pattern={hasJumpMathEmail ? ".+@jumpmath.org" : ".+"}
                    />
                    <InputError>
                      The email does not end in @jumpmath.org. Please ensure the
                      email address is correct.
                    </InputError>
                  </FormControl>
                  <FormControl
                    isRequired
                    mt={6}
                    isInvalid={isInvalidConfirmationEmail}
                  >
                    <InputLabel>Confirm email address</InputLabel>
                    <EmailInput
                      placeholder="Email Address"
                      handleChange={setConfirmEmail}
                      pattern={email}
                    />
                    <InputError>
                      The email addresses do not currently match. Please check
                      them again.
                    </InputError>
                  </FormControl>
                </>
              )}
            </ModalBody>
            <ModalFooter>
              <ModalFooterButtons onModalClose={onModalClose} />
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddAdminModal;
