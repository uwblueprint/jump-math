import React from "react";
import {
  Button,
  Button as ChakraButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  Radio,
  Stack,
  useDisclosure,
  Text,
  RadioGroup,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "../icons";

const SortTablePopover = (): React.ReactElement => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <ChakraButton
        onClick={onOpen}
        rightIcon={<ChevronDownIcon />}
        variant="secondary"
      >
        Sort
      </ChakraButton>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalBody maxW="350px">
            <Stack direction="row" spacing={120} sx={{ pt: "2" }}>
              <RadioGroup defaultValue="1">
                <Stack>
                  <Text textStyle="subtitle2">Type</Text>
                  <Radio defaultChecked value="1">
                    Name
                  </Radio>
                  <Radio value="2">Email</Radio>
                </Stack>
              </RadioGroup>
              <RadioGroup defaultValue="1">
                <Stack>
                  <Text textStyle="subtitle2">Order</Text>
                  <Radio defaultChecked value="1">
                    Ascending
                  </Radio>
                  <Radio value="2">Descending</Radio>
                </Stack>
              </RadioGroup>
            </Stack>
          </ModalBody>

          <ModalFooter pt={2} pl={0}>
            <Button
              variant="ghost"
              colorScheme="blue"
              mt={0}
              pl={0}
              ml={0}
              pt={0}
              mr={3}
              onClick={onClose}
            >
              Apply
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SortTablePopover;
