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

const AddAdminModal = (): React.ReactElement => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [inputVals, setInputVals] = useState({
    firstName: "",
    lastName: "",
    email: "",
    confirmEmail: "",
  });
  const [hasJumpMathEmail, setHasJumpMathEmail] = useState<boolean | null>(
    null,
  );

  const handleSelect = (value: string) => {
    setHasJumpMathEmail(value === "yes");
  };

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInputVals({
      ...inputVals,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const onModalClose = () => {
    setHasJumpMathEmail(null);
    onClose();
  };

  const onAddAdminClick = () => {};

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
      <Modal isOpen={isOpen} onClose={onModalClose} size="2xl" isCentered>
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
              <FormLabel textStyle="subtitle2" color="blue.300">
                Name of Admin
              </FormLabel>
              <HStack direction="row">
                <Input
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  onChange={handleInputChange}
                />
                <Input
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  onChange={handleInputChange}
                />
              </HStack>
            </FormControl>
            <FormControl as="fieldset" mt={8}>
              <FormLabel as="legend" textStyle="subtitle2" color="blue.300">
                Does the user already have a Jump Math email address?
              </FormLabel>
              <RadioGroup onChange={handleSelect}>
                <HStack spacing="24px">
                  <Radio value="no" mt={2}>
                    No
                  </Radio>
                  <Radio value="yes">Yes</Radio>
                </HStack>
              </RadioGroup>
            </FormControl>
            {hasJumpMathEmail !== null && (
              <>
                <FormControl isRequired mt={6}>
                  <FormLabel textStyle="subtitle2" color="blue.300">
                    {`Please enter their ${
                      hasJumpMathEmail ? "Jump Math" : ""
                    } email address`}
                  </FormLabel>
                  <Input
                    type="text"
                    placeholder="Email Address"
                    name="email"
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl isRequired mt={6}>
                  <FormLabel textStyle="subtitle2" color="blue.300">
                    Confirm email address
                  </FormLabel>
                  <Input
                    type="text"
                    placeholder="Email Address"
                    name="confirmEmail"
                    onChange={handleInputChange}
                  />
                </FormControl>
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              variant="secondary"
              onClick={onModalClose}
              mr={3}
              borderColor="blue.50"
            >
              Discard
            </Button>
            <Button variant="primary" onClick={onAddAdminClick}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddAdminModal;
