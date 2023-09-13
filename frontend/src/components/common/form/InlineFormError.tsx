import React from "react";
import type { FieldError } from "react-hook-form";
import { Box, FormErrorMessage } from "@chakra-ui/react";

type InlineFormErrorProps = {
  // If true, a placeholder will be shown to keep the form layout consistent.
  // This is useful for forms where the error message is hidden by default;
  // set this to true for all fields in the same visual "row" as the field
  // with a visible error message to maintain horizontal alignment.
  showPlaceholder?: boolean;
} & (
  | {
      message: string;
    }
  | {
      error?: FieldError;
    }
);

const InlineFormError = ({
  showPlaceholder = false,
  ...props
}: InlineFormErrorProps): React.ReactElement => {
  let shouldShowPlaceholder = showPlaceholder;
  let message = "";
  if ("error" in props) {
    const { error } = props;
    message = error?.message ?? "";
    shouldShowPlaceholder = !!(showPlaceholder && !error);
  } else if ("message" in props) {
    message = props.message;
  }

  return (
    <>
      {shouldShowPlaceholder && <Box height={6} mt={2} />}
      <FormErrorMessage height={6}>{message}</FormErrorMessage>
    </>
  );
};

export default InlineFormError;
