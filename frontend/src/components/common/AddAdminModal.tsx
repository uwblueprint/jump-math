import React, { useState } from "react";
import {
  Button,
  FormControl,
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
  const [requiredFieldEmpty, setRequiredFieldEmpty] = useState(false);

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
    onClose();
  };

  const onSubmit = () => {
    if (
      firstName.length === 0 ||
      lastName.length === 0 ||
      hasJumpMathEmail === null ||
      email.length === 0 ||
      confirmEmail.length === 0
    ) {
      setRequiredFieldEmpty(true);
      return;
    }
    if (isInvalidEmail || isInvalidConfirmationEmail) {
      return;
    }
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
                  isInvalid={requiredFieldEmpty && firstName.length === 0}
                />
                <TextInput
                  placeholder="Last Name"
                  handleChange={setLastName}
                  isInvalid={requiredFieldEmpty && lastName.length === 0}
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
                  <Radio
                    value="no"
                    mt={2}
                    size="lg"
                    isInvalid={requiredFieldEmpty && hasJumpMathEmail === null}
                  >
                    No
                  </Radio>
                  <Radio
                    value="yes"
                    size="lg"
                    isInvalid={requiredFieldEmpty && hasJumpMathEmail === null}
                  >
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
                    isInvalid={requiredFieldEmpty && email.length === 0}
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
                    isInvalid={requiredFieldEmpty && confirmEmail.length === 0}
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
            {requiredFieldEmpty && (
              <Text textStyle="paragraph" mr="auto" color="red.200">
                Enter mandatory fields before saving.
              </Text>
            )}
            <ModalFooterButtons onDiscard={onModalClose} onSave={onSubmit} />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddAdminModal;
