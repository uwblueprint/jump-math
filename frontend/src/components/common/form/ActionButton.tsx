import type { Dispatch, ReactElement, SetStateAction } from "react";
import React, { useState } from "react";
import type { ButtonProps } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

import { FormValidationError } from "../../../utils/GeneralUtils";
import useToast from "../info/useToast";

export type ActionButtonProps = Omit<ButtonProps, "onClick" | "onError"> & {
  onClick: (() => Promise<unknown>) | (() => unknown);
  messageOnSuccess?: string;
  messageOnError?: string | (<T>(e: T) => string);
  onAfterSuccess?: () => void;
  onError?: (message: string) => void;
  setLoading?: Dispatch<SetStateAction<boolean>>;
  // If showDefaultToasts is true, the button will show a toast for a success or validation error.
  // Otherwise, it will only show a toast for a non-validation error.
  showDefaultToasts?: boolean;
};

// TODO(julian): enable this type checking once all modals are converted to use ActionButton
/* & (
    | {
        showDefaultToasts?: true | undefined;
        messageOnSuccess: string;
        messageOnError: string | (<T>(e: T) => string);
      }
    | { showDefaultToasts: false }
  );*/

const ActionButton = ({
  onClick,
  messageOnSuccess,
  messageOnError: generateErrorMessage,
  onAfterSuccess,
  onError,
  isLoading: controlledIsLoading,
  setLoading: controlledSetLoading,
  showDefaultToasts = true,
  ...props
}: ActionButtonProps): ReactElement => {
  const { showToast } = useToast();
  const [isLoading, setLoading] = useState(false);

  const handleError =
    onError ?? ((message: string) => showToast({ message, status: "error" }));

  const handleClick = async () => {
    setLoading(true);
    controlledSetLoading?.(true);
    try {
      await onClick();
      if (showDefaultToasts) {
        showToast({
          message: messageOnSuccess ?? "Operation successful.",
          status: "success",
        });
      }
      onAfterSuccess?.();
    } catch (e) {
      if (!showDefaultToasts && e instanceof FormValidationError) {
        return;
      }
      console.log(e);
      handleError(
        (typeof generateErrorMessage === "function"
          ? generateErrorMessage(e)
          : generateErrorMessage) ?? "Operation failed.",
      );
    } finally {
      setLoading(false);
      controlledSetLoading?.(false);
    }
  };
  return (
    <Button
      {...props}
      isLoading={controlledIsLoading || isLoading}
      onClick={handleClick}
    />
  );
};

export default ActionButton;
