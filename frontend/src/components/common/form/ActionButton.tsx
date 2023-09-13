import type { Dispatch, ReactElement, SetStateAction } from "react";
import React, { useState } from "react";
import type { ButtonProps } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

import { FormValidationError } from "../../../utils/GeneralUtils";
import useToast from "../info/useToast";

// TODO(juliands): re-enable later
/*
type ActionButtonPropsDefaultToasts =
  | {
      showDefaultToasts?: true | undefined;
      messageOnSuccess: string;
      messageOnError: string | (<T>(e: T) => string);
    }
  | { showDefaultToasts: false };

type ActionButtonPropsDefaultNoToasts =
  | {
      showDefaultToasts: true;
      messageOnSuccess: string;
      messageOnError: string | (<T>(e: T) => string);
    }
  | { showDefaultToasts?: false | undefined };
  */

export type ActionButtonPropsRestricted<Default extends boolean> = {
  messageOnSuccess?: string;
  messageOnError?: string | (<T>(e: T) => string);
  // If showDefaultToasts is true, the button will show a toast for a success or validation error.
  // Otherwise, it will only show a toast for a non-validation error.
  showDefaultToasts?: boolean;

  // TODO(juliands): remove later. This is a hack to get the linter to stop complaining.
  UNUSED?: never & Default;
};
// TODO(juliands): re-enable later
/* & (Default extends true
  ? ActionButtonPropsDefaultToasts
  : ActionButtonPropsDefaultNoToasts); */

export type ActionButtonProps<Default extends boolean> = Omit<
  ButtonProps,
  "onClick" | "onError"
> & {
  onClick: (() => Promise<unknown>) | (() => unknown);
  onAfterSuccess?: () => void;
  onError?: (message: string) => void;
  setLoading?: Dispatch<SetStateAction<boolean>>;
} & ActionButtonPropsRestricted<Default>;

const ActionButton = <Default extends boolean = true>({
  onClick,
  messageOnSuccess,
  messageOnError: generateErrorMessage,
  onAfterSuccess,
  onError,
  isLoading: controlledIsLoading,
  setLoading: controlledSetLoading,
  showDefaultToasts = true,
  ...props
}: ActionButtonProps<Default>): ReactElement => {
  const { showToast } = useToast();
  const [isLoading, setLoading] = useState(false);

  const handleError =
    onError ?? ((message: string) => showToast({ message, status: "error" }));

  const handleClick = async () => {
    setLoading(true);
    controlledSetLoading?.(true);
    try {
      await onClick();
      if (showDefaultToasts || messageOnSuccess) {
        showToast({
          message: messageOnSuccess ?? "Operation successful.",
          status: "success",
        });
      }
      onAfterSuccess?.();
    } catch (e) {
      if (
        !showDefaultToasts &&
        !generateErrorMessage &&
        e instanceof FormValidationError
      ) {
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
