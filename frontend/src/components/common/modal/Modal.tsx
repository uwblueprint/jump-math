import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  Modal as ChakraModal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from "@chakra-ui/react";

import type { ActionButtonPropsRestricted } from "../form/ActionButton";
import ActionButton from "../form/ActionButton";
import ErrorToast from "../info/toasts/ErrorToast";

import ModalText from "./ModalText";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  variant?: "default" | "large";
  body?: React.ReactNode;
  header: React.ReactNode;
  children?: React.ReactNode;
  submitButtonText?: string;
  cancelButtonText?: string;
  submitButtonVariant?: string;
  cancelButtonVariant?: string;
  onBack?: () => void;
  onSubmit?: (() => Promise<unknown>) | (() => unknown);
} & ActionButtonPropsRestricted<true>;

const Modal = ({
  isOpen,
  onBack,
  onClose,
  body,
  header,
  children,
  submitButtonText = "Confirm",
  cancelButtonText = "Cancel",
  submitButtonVariant,
  cancelButtonVariant,
  onSubmit,
  variant = "default",
  ...toastProps
}: ModalProps): React.ReactElement => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleClose = () => {
    if (loading) {
      return;
    }
    setErrorMessage("");
    onClose();
  };

  return (
    <ChakraModal isCentered isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent
        borderRadius="12px"
        maxW={variant === "large" ? "80vw" : undefined}
        minW="42vw"
      >
        {errorMessage && (
          <ErrorToast borderTopRadius="12px" errorMessage={errorMessage} />
        )}
        <Box p={variant === "large" ? 2 : 0}>
          {header && (
            <>
              <ModalText
                body={body}
                header={header}
                isLargeVariant={variant === "large"}
              />
              <ModalCloseButton isDisabled={loading} />
            </>
          )}
          {children && <ModalBody pb={0}>{children}</ModalBody>}
          {variant !== "large" && <Divider mt="1.5em" />}
          <ModalFooter>
            {cancelButtonText && (
              <Button
                isDisabled={loading}
                minWidth="10%"
                mr={2}
                onClick={onBack ?? handleClose}
                variant={cancelButtonVariant || "secondary"}
              >
                {cancelButtonText}
              </Button>
            )}
            <ActionButton
              isLoading={loading}
              minWidth="10%"
              onAfterSuccess={handleClose}
              onClick={() => onSubmit?.()}
              onError={setErrorMessage}
              setLoading={setLoading}
              {...toastProps}
              variant={submitButtonVariant || "primary"}
            >
              {submitButtonText}
            </ActionButton>
          </ModalFooter>
        </Box>
      </ModalContent>
    </ChakraModal>
  );
};

export default Modal;
