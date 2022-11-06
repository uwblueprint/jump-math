import React, { useState } from "react";
import {
  Button,
  FormControl,
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
import { PlusOutlineIcon } from "./icons";

const AddAdminFormLabel = ({ text }: { text: string }): React.ReactElement => {
  return (
    <FormLabel
      as="legend"
      color="blue.300"
      mb={0}
      fontSize="20px"
      lineHeight="26px"
    >
      {text}
    </FormLabel>
  );
};

const AddAdminTextInput = ({
  validationType,
  placeholder,
  handleChange,
}: {
  validationType: string;
  placeholder: string;
  handleChange: (val: string) => void;
}): React.ReactElement => {
  return (
    <Input
      type={validationType}
      placeholder={placeholder}
      onChange={(e) => handleChange(e.target.value)}
      fontSize="18px"
      width="320px"
      height="48px"
      textAlign="center"
      backgroundColor="grey.100"
      borderColor="grey.100"
    />
  );
};

const AddAdminModal = (): React.ReactElement => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [hasJumpMathEmail, setHasJumpMathEmail] = useState<boolean | null>(
    null,
  );

  const onModalClose = () => {
    setHasJumpMathEmail(null);
    onClose();
  };

  const onAddAdminClick = () => {
    if (email !== confirmEmail) {
      console.log("emails don't match");
      return;
    }
    console.log("creating admin with data");
    console.log(
      `first name: ${firstName}\nlast name: ${lastName}\nemail: ${email}`,
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
              <AddAdminFormLabel text="Name of Admin" />
              <HStack direction="row" mt={6}>
                <AddAdminTextInput
                  validationType="text"
                  placeholder="First Name"
                  handleChange={setFirstName}
                />
                <AddAdminTextInput
                  validationType="text"
                  placeholder="Last Name"
                  handleChange={setLastName}
                />
              </HStack>
            </FormControl>
            <FormControl isRequired as="fieldset" mt={8}>
              <AddAdminFormLabel text="Does the user already have a Jump Math email address?" />
              <RadioGroup
                onChange={(val) => setHasJumpMathEmail(val === "yes")}
                mt={5}
              >
                <HStack spacing="24px">
                  <Radio value="no" mt={2} outlineColor="grey.300" size="lg">
                    No
                  </Radio>
                  <Radio value="yes" outlineColor="grey.300" size="lg">
                    Yes
                  </Radio>
                </HStack>
              </RadioGroup>
            </FormControl>
            {hasJumpMathEmail !== null && (
              <>
                <FormControl isRequired mt={6}>
                  <AddAdminFormLabel
                    text={`Please enter their ${
                      hasJumpMathEmail ? "Jump Math" : ""
                    } email address`}
                  />
                  <AddAdminTextInput
                    validationType="email"
                    placeholder="Email Address"
                    handleChange={setEmail}
                  />
                </FormControl>
                <FormControl isRequired mt={6}>
                  <AddAdminFormLabel text="Confirm email address" />
                  <AddAdminTextInput
                    validationType="email"
                    placeholder="Email Address"
                    handleChange={setConfirmEmail}
                  />
                </FormControl>
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              variant="secondary"
              onClick={onModalClose}
              mr={2}
              borderColor="blue.50"
              minWidth="108px"
              width="108px"
            >
              Discard
            </Button>
            <Button
              variant="primary"
              onClick={onAddAdminClick}
              minWidth="108px"
              width="108px"
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddAdminModal;
