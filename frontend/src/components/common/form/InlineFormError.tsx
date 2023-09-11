import React from "react";
import type { FieldError } from "react-hook-form";
import { Box, FormErrorMessage } from "@chakra-ui/react";

type InlineFormErrorProps = {
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
  showPlaceholder,
  ...props
}: InlineFormErrorProps): React.ReactElement => {
  let shouldShowPlaceholder = showPlaceholder ?? false;
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
