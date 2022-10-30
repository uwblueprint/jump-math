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
      `first name: ${firstName}\nlast name: ${lastName}\n email: ${email}`,
    );
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
              <FormLabel color="blue.300" fontSize="20px" lineHeight="26px">
                Name of Admin
              </FormLabel>
              <HStack direction="row" mt={6}>
                <Input
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  onChange={(e) => setFirstName(e.target.value)}
                  fontSize="18px"
                  fontWeight="400"
                  width="320px"
                  height="48px"
                  textAlign="center"
                  backgroundColor="grey.100"
                  borderColor="grey.100"
                />
                <Input
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  onChange={(e) => setLastName(e.target.value)}
                  fontSize="18px"
                  width="320px"
                  height="48px"
                  textAlign="center"
                  backgroundColor="grey.100"
                  borderColor="grey.100"
                />
              </HStack>
            </FormControl>
            <FormControl isRequired as="fieldset" mt={8}>
              <FormLabel
                as="legend"
                textStyle="subtitle2"
                color="blue.300"
                mb={0}
                fontSize="20px"
                lineHeight="26px"
              >
                Does the user already have a Jump Math email address?
              </FormLabel>
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
                  <FormLabel
                    color="blue.300"
                    mb={0}
                    fontSize="20px"
                    lineHeight="26px"
                  >
                    {`Please enter their ${
                      hasJumpMathEmail ? "Jump Math" : ""
                    } email address`}
                  </FormLabel>
                  <Input
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    mt={6}
                    fontSize="18px"
                    width="320px"
                    height="48px"
                    textAlign="center"
                    backgroundColor="grey.100"
                    borderColor="grey.100"
                  />
                </FormControl>
                <FormControl isRequired mt={6}>
                  <FormLabel
                    color="blue.300"
                    mb={0}
                    fontSize="20px"
                    lineHeight="26px"
                  >
                    Confirm email address
                  </FormLabel>
                  <Input
                    type="email"
                    placeholder="Email Address"
                    name="confirmEmail"
                    onChange={(e) => setConfirmEmail(e.target.value)}
                    mt={6}
                    fontSize="18px"
                    width="320px"
                    height="48px"
                    textAlign="center"
                    backgroundColor="grey.100"
                    borderColor="grey.100"
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
